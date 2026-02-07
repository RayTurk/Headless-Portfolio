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
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { motion } from 'framer-motion';
import Image from 'next/image';

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

  return {
    title: `${post.title.rendered} | Blog`,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, ''),
    openGraph: {
      title: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]*>/g, ''),
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: post.featured_media_url
        ? [
            {
              url: post.featured_media_url,
              width: 1200,
              height: 630,
              alt: post.title.rendered,
            },
          ]
        : [],
      authors: post.author_name ? [post.author_name] : [],
    },
    keywords: [
      post.title.rendered,
      ...(post.categories?.map((cat: any) => cat.name) || []),
      ...(post.tags?.map((tag: any) => tag.name) || []),
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

  const relatedPostsResponse = await getRelatedPosts(
    [post.categories?.[0]?.id.toString() || ''],
    post.id.toString(),
    2
  );
  const relatedPosts = relatedPostsResponse || [];
  const readingTime = calculateReadingTime(post.content.rendered);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    {
      label: post.title.rendered,
      href: `/blog/${params.slug}`,
      current: true,
    },
  ];

  // Extract headings for TOC
  const headingRegex = /<h([2-3])[^>]*>(.*?)<\/h\1>/g;
  const headings: Array<{ level: number; text: string; id: string }> = [];
  let match;

  while ((match = headingRegex.exec(post.content.rendered)) !== null) {
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
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            {/* Category Badges */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.categories.map((category: any) => (
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
              {post.title.rendered}
            </h1>

            {/* Subtitle */}
            {post.subtitle && (
              <p className="text-xl text-slate-300 mb-8 italic">
                {post.subtitle}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm mb-8 pb-8 border-b border-slate-800">
              <div className="flex items-center gap-3">
                {post.author_avatar && (
                  <Image
                    src={post.author_avatar}
                    alt={post.author_name || 'Author'}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <span>{post.author_name || 'Unknown Author'}</span>
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
            {post.featured_media_url && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative aspect-video mb-12 rounded-xl overflow-hidden"
              >
                <Image
                  src={post.featured_media_url}
                  alt={post.title.rendered}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-invert prose-lg max-w-none text-slate-300 mb-12 [&_h2]:text-white [&_h3]:text-white [&_a]:text-indigo-400 hover:[&_a]:text-indigo-300 [&_strong]:text-white [&_code]:bg-slate-800 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_pre]:bg-slate-800 [&_pre]:border [&_pre]:border-slate-700"
            >
              <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
            </motion.div>

            {/* CTA Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 border border-indigo-500/20 mb-12"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                Need help with your website?
              </h3>
              <p className="text-slate-300 mb-4">
                Let's discuss your project and how we can help maintain and improve your WordPress site.
              </p>
              <a
                href="/contact"
                className="inline-block px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors"
              >
                Schedule a Consultation
              </a>
            </motion.div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-wrap gap-3 mb-12 pb-12 border-b border-slate-800"
              >
                {post.tags.map((tag: any) => (
                  <a
                    key={tag.id}
                    href={`/blog?tag=${tag.slug}`}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors"
                  >
                    #{tag.name}
                  </a>
                ))}
              </motion.div>
            )}

            {/* Author Bio */}
            {post.author_bio || post.author_avatar || post.author_name && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <AuthorBio
                  name={post.author_name}
                  bio={post.author_bio}
                  avatar={post.author_avatar}
                />
              </motion.div>
            )}

            {/* Share Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">
                Share this post
              </h3>
              <ShareButtons
                title={post.title.rendered}
                url={`https://yourdomain.com/blog/${params.slug}`}
              />
            </motion.div>

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mt-16"
              >
                <h2 className="text-3xl font-bold mb-8 text-white">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.slice(0, 2).map((relatedPost, index) => (
                    <motion.div
                      key={relatedPost.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <BlogPostCard post={relatedPost} />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </motion.article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Table of Contents */}
            {headings.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="sticky top-32"
              >
                <TableOfContents headings={headings} />
              </motion.div>
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
            headline: post.title.rendered,
            description: post.excerpt.rendered.replace(/<[^>]*>/g, ''),
            image: post.featured_media_url,
            datePublished: post.date,
            dateModified: post.modified,
            author: {
              '@type': 'Person',
              name: post.author_name || 'Author',
            },
            articleBody: post.content.rendered.replace(/<[^>]*>/g, ''),
          }),
        }}
      />
    </main>
  );
}
