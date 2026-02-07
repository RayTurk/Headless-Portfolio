import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getPostBySlug,
  getAllPostSlugs,
  getRelatedPosts,
} from '@/lib/api';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { AuthorBio } from '@/components/blog/AuthorBio';
import { BlogPostCard } from '@/components/blog/PostCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import Image from 'next/image';
import { SITE_URL } from '@/lib/constants';

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug: string) => ({
    slug,
  }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

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
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
      authors: post.author?.node?.name ? [post.author.node.name] : [],
    },
    keywords: [
      post.title,
      ...(post.categories?.nodes?.map((cat) => cat.name) || []),
      ...(post.tags?.nodes?.map((tag) => tag.name) || []),
    ],
  };
}

// Calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export default async function BlogPostPage(
  { params }: { params: { slug: string } }
) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const categoryId = post.categories?.nodes?.[0]?.id;
  const relatedPostsResponse = await getRelatedPosts(
    categoryId ? [categoryId] : [],
    post.id,
    2
  );
  const relatedPosts = relatedPostsResponse || [];
  const readingTime = post.blogFields?.readingTimeOverride || calculateReadingTime(post.content || '');

  const authorName = post.author?.node?.name || 'Ray Turk';
  const authorAvatar = post.author?.node?.avatar?.url;
  const authorBio = post.author?.node?.description;
  const imageUrl = post.featuredImage?.node?.sourceUrl;

  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: post.title },
  ];

  // Extract headings for TOC
  const headingRegex = /<h([2-3])[^>]*>(.*?)<\/h\1>/g;
  const headings: Array<{ level: number; text: string; id: string }> = [];
  let match;

  while ((match = headingRegex.exec(post.content || '')) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, '');
    const id = text.toLowerCase().replace(/\s+/g, '-');
    headings.push({ level, text, id });
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="pt-32 pb-20 px-4 md:px-8 lg:px-12">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Article Layout with Sidebar */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          {/* Main Content */}
          <article className="lg:col-span-3">
            {/* Category Badges */}
            {post.categories?.nodes && post.categories.nodes.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.categories.nodes.map((category) => (
                  <span
                    key={category.id}
                    className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold uppercase tracking-wide border border-indigo-500/30"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              {post.title}
            </h1>

            {/* Subtitle */}
            {post.blogFields?.postSubtitle && (
              <p className="text-xl text-slate-300 mb-8 italic">
                {post.blogFields.postSubtitle}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm mb-8 pb-8 border-b border-slate-800">
              <div className="flex items-center gap-3">
                {authorAvatar && (
                  <Image
                    src={authorAvatar}
                    alt={authorName}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <span>{authorName}</span>
              </div>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>{readingTime} min read</span>
            </div>

            {/* Featured Image */}
            {imageUrl && (
              <div className="relative aspect-video mb-12 rounded-xl overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={post.featuredImage?.node?.altText || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div
              className="prose prose-invert prose-lg max-w-none text-slate-300 mb-12 [&_h2]:text-white [&_h3]:text-white [&_a]:text-indigo-400 hover:[&_a]:text-indigo-300 [&_strong]:text-white [&_code]:bg-slate-800 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_pre]:bg-slate-800 [&_pre]:border [&_pre]:border-slate-700"
            >
              <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
            </div>

            {/* CTA Block */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 border border-indigo-500/20 mb-12">
              <h3 className="text-xl font-bold text-white mb-2">
                {post.blogFields?.ctaText || 'Need help with your website?'}
              </h3>
              <p className="text-slate-300 mb-4">
                Let&apos;s discuss your project and how we can help maintain and improve your WordPress site.
              </p>
              <a
                href={post.blogFields?.ctaUrl || '/contact'}
                className="inline-block px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors"
              >
                Schedule a Consultation
              </a>
            </div>

            {/* Tags */}
            {post.tags?.nodes && post.tags.nodes.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-12 pb-12 border-b border-slate-800">
                {post.tags.nodes.map((tag) => (
                  <a
                    key={tag.id}
                    href={`/blog?tag=${tag.slug}`}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors"
                  >
                    #{tag.name}
                  </a>
                ))}
              </div>
            )}

            {/* Author Bio */}
            {(authorBio || authorAvatar || authorName) && (
              <div className="mb-12">
                <AuthorBio
                  name={authorName}
                  bio={authorBio}
                  avatar={authorAvatar}
                />
              </div>
            )}

            {/* Share Buttons */}
            <div className="mb-12">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">
                Share this post
              </h3>
              <ShareButtons
                title={post.title}
                url={`${SITE_URL}/blog/${params.slug}`}
              />
            </div>

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
              <section className="mt-16">
                <h2 className="text-3xl font-bold mb-8 text-white">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.slice(0, 2).map((relatedPost) => (
                    <div key={relatedPost.id}>
                      <BlogPostCard post={relatedPost} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Table of Contents */}
            {headings.length > 0 && post.blogFields?.showToc && (
              <div className="sticky top-32">
                <TableOfContents headings={headings} />
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* JSON-LD Schema */}
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
            author: {
              '@type': 'Person',
              name: authorName,
            },
          }),
        }}
      />
    </main>
  );
}
