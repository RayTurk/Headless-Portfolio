import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getPostBySlug,
  getAllPostSlugs,
  getRelatedPosts,
} from '@/lib/api';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { TableOfContents } from '@/components/blog/TableOfContents';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_URL } from '@/lib/constants';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };

  const description = post.blogFields?.seoDescription ||
    post.excerpt?.replace(/<[^>]*>/g, '') || '';
  const imageUrl = post.featuredImage?.node?.sourceUrl;

  return {
    title: post.blogFields?.seoTitle || `${post.title} | Blog`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: post.title }] : [],
      authors: post.author?.node?.name ? [post.author.node.name] : [],
    },
    keywords: [
      post.title,
      ...(post.categories?.nodes?.map((cat) => cat.name) || []),
      ...(post.tags?.nodes?.map((tag) => tag.name) || []),
    ],
  };
}

function calculateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, '');
  return Math.ceil(text.split(/\s+/).length / 200);
}

export default async function BlogPostPage(
  { params }: { params: { slug: string } }
) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const categoryId = post.categories?.nodes?.[0]?.id;
  const relatedPosts = (await getRelatedPosts(
    categoryId ? [categoryId] : [],
    post.id,
    3
  )) || [];

  const readingTime = post.blogFields?.readingTimeOverride || calculateReadingTime(post.content || '');
  const authorName = post.author?.node?.name || 'Ray Turk';
  const authorAvatar = post.author?.node?.avatar?.url;
  const authorBio = post.author?.node?.description || 'Full Stack Developer specializing in WordPress and modern web technologies. Building creative solutions for the digital world.';
  const imageUrl = post.featuredImage?.node?.sourceUrl;

  // Extract headings for TOC
  const headingRegex = /<h([2-3])[^>]*>(.*?)<\/h\1>/g;
  const headings: Array<{ level: number; text: string; id: string }> = [];
  let match;
  while ((match = headingRegex.exec(post.content || '')) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, '');
    headings.push({ level, text, id: text.toLowerCase().replace(/\s+/g, '-') });
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="pt-28 pb-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Blog
          </Link>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">

            {/* ── Main Article ── */}
            <article>
              {/* Category badges */}
              {post.categories?.nodes && post.categories.nodes.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {post.categories.nodes.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/blog?category=${cat.slug}`}
                      className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 hover:border-indigo-400/50 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                {post.title}
              </h1>

              {/* Subtitle */}
              {post.blogFields?.postSubtitle && (
                <p className="text-xl text-slate-400 mb-6 leading-relaxed">
                  {post.blogFields.postSubtitle}
                </p>
              )}

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-800">
                <span className="flex items-center gap-2">
                  {authorAvatar ? (
                    <Image src={authorAvatar} alt={authorName} width={28} height={28} className="rounded-full" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  {authorName}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </time>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {readingTime} min read
                </span>
              </div>

              {/* Featured image */}
              {imageUrl && (
                <div className="relative aspect-[16/9] mb-10 rounded-xl overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={post.featuredImage?.node?.altText || post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* TOC (mobile only) */}
              {headings.length > 0 && post.blogFields?.showToc && (
                <div className="lg:hidden mb-8">
                  <TableOfContents headings={headings} />
                </div>
              )}

              {/* Article body */}
              <div className="prose prose-invert prose-lg max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-slate-300 prose-p:leading-relaxed
                prose-a:text-indigo-400 hover:prose-a:text-indigo-300
                prose-strong:text-white
                prose-li:text-slate-300
                prose-ul:my-4 prose-ol:my-4
                prose-code:bg-slate-800 prose-code:text-emerald-300 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700 prose-pre:rounded-xl
                prose-blockquote:border-l-indigo-500 prose-blockquote:text-slate-400
                prose-img:rounded-xl mb-10"
              >
                <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
              </div>

              {/* Tags */}
              {post.tags?.nodes && post.tags.nodes.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-10 pt-6 border-t border-slate-800">
                  <Tag className="w-4 h-4 text-slate-500" />
                  {post.tags.nodes.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/blog?tag=${tag.slug}`}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded-lg text-sm transition-colors"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Share */}
              <div className="flex items-center gap-4 mb-12">
                <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Share</span>
                <ShareButtons title={post.title} url={`${SITE_URL}/blog/${params.slug}`} />
              </div>

              {/* Author bio */}
              <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 mb-12">
                <div className="flex gap-4 items-start">
                  {authorAvatar ? (
                    <Image src={authorAvatar} alt={authorName} width={56} height={56} className="rounded-full flex-shrink-0" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-indigo-400" />
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Written by</p>
                    <h3 className="text-lg font-bold text-white mb-2">{authorName}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-3">{authorBio}</p>
                    <Link
                      href="/about"
                      className="text-sm text-indigo-400 hover:text-indigo-300 font-semibold transition-colors inline-flex items-center gap-1"
                    >
                      View Profile →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Related posts (bottom, mobile) */}
              {relatedPosts.length > 0 && (
                <section className="lg:hidden">
                  <h2 className="text-xl font-bold text-white mb-5">Related Articles</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedPosts.slice(0, 2).map((rp) => (
                      <Link key={rp.id} href={`/blog/${rp.slug}`} className="group rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-600 overflow-hidden transition-colors">
                        {rp.featuredImage?.node?.sourceUrl && (
                          <div className="relative h-36 overflow-hidden">
                            <Image src={rp.featuredImage.node.sourceUrl} alt={rp.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                        )}
                        <div className="p-4">
                          <p className="text-sm font-semibold text-white line-clamp-2 group-hover:text-indigo-300 transition-colors">{rp.title}</p>
                          <p className="text-xs text-slate-500 mt-1">{new Date(rp.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* ── Sidebar ── */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-6">

                {/* Author card */}
                <div className="rounded-xl bg-slate-900 border border-slate-800 p-5">
                  <div className="flex flex-col items-center text-center">
                    {authorAvatar ? (
                      <Image src={authorAvatar} alt={authorName} width={64} height={64} className="rounded-full mb-3" />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-3">
                        <User className="w-7 h-7 text-indigo-400" />
                      </div>
                    )}
                    <h3 className="font-bold text-white text-sm">{authorName}</h3>
                    <p className="text-xs text-slate-500 mb-3">Full Stack Developer</p>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{authorBio}</p>
                    <Link
                      href="/about"
                      className="w-full text-center text-xs font-semibold px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>

                {/* TOC */}
                {headings.length > 0 && post.blogFields?.showToc && (
                  <TableOfContents headings={headings} />
                )}

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                  <div className="rounded-xl bg-slate-900 border border-slate-800 p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((rp) => (
                        <Link
                          key={rp.id}
                          href={`/blog/${rp.slug}`}
                          className="flex gap-3 group"
                        >
                          {rp.featuredImage?.node?.sourceUrl ? (
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={rp.featuredImage.node.sourceUrl}
                                alt={rp.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-16 rounded-lg bg-slate-800 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-slate-300 group-hover:text-white line-clamp-2 leading-snug transition-colors">
                              {rp.title}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {new Date(rp.date).toLocaleDateString('en-US', {
                                month: 'short', day: 'numeric', year: 'numeric',
                              })}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categories */}
                {post.categories?.nodes && post.categories.nodes.length > 0 && (
                  <div className="rounded-xl bg-slate-900 border border-slate-800 p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.categories.nodes.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/blog?category=${cat.slug}`}
                          className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA widget */}
                <div className="rounded-xl bg-gradient-to-br from-indigo-500/15 to-emerald-500/10 border border-indigo-500/25 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">Ready to build?</p>
                  <h3 className="text-sm font-bold text-white mb-2">
                    {post.blogFields?.ctaText || "Let's build a website that works for you."}
                  </h3>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    Let&apos;s collaborate to create a web solution that perfectly aligns with your business goals.
                  </p>
                  <Link
                    href={post.blogFields?.ctaUrl || '/contact'}
                    className="block w-full text-center text-xs font-semibold px-4 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-500 hover:opacity-90 text-white transition-opacity"
                  >
                    Let&apos;s Talk →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt?.replace(/<[^>]*>/g, '') || '',
            image: imageUrl,
            datePublished: post.date,
            dateModified: post.modified,
            author: { '@type': 'Person', name: authorName },
          }),
        }}
      />
    </main>
  );
}
