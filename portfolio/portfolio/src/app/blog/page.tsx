import { Metadata } from 'next';
import { getAllPosts } from '@/lib/api';
import { BlogPostCard } from '@/components/blog/PostCard';
import { motion } from 'framer-motion';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Blog | Portfolio',
  description: 'Insights on WordPress, web development, and digital strategy. Tips and best practices for building modern websites.',
  openGraph: {
    title: 'Blog',
    description: 'Insights on WordPress, web development, and digital strategy.',
    type: 'website',
  },
};

interface SearchParams {
  page?: string;
}

async function BlogContent({ page }: { page?: string }) {
  const pageNum = parseInt(page || '1', 10);
  const postsPerPage = 12;

  const response = await getAllPosts(100);
  const allPosts = response.posts;
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  const startIdx = (pageNum - 1) * postsPerPage;
  const paginatedPosts = allPosts.slice(startIdx, startIdx + postsPerPage);

  // Extract unique categories
  const categoryMap = new Map<string, { name: string; slug: string; count: number }>();
  allPosts.forEach((post) => {
    post.categories?.forEach((cat: any) => {
      if (!categoryMap.has(cat.slug)) {
        categoryMap.set(cat.slug, { name: cat.name, slug: cat.slug, count: 0 });
      }
      const existing = categoryMap.get(cat.slug)!;
      existing.count += 1;
    });
  });

  const categories = Array.from(categoryMap.values()).sort((a, b) =>
    b.count - a.count
  );

  return (
    <main className="min-h-screen bg-slate-950 pt-32 pb-20 px-4 md:px-8 lg:px-12">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Insights on WordPress, web development, and digital strategy
          </p>
        </motion.div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2 justify-center mb-12"
          >
            <a
              href="/blog"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-semibold text-sm"
            >
              All Posts
            </a>
            {categories.slice(0, 5).map((cat) => (
              <a
                key={cat.slug}
                href={`/blog?category=${cat.slug}`}
                className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-colors"
              >
                {cat.name} ({cat.count})
              </a>
            ))}
          </motion.div>
        )}
      </section>

      {/* Posts Grid */}
      <section className="max-w-5xl mx-auto">
        {paginatedPosts.length > 0 ? (
          <>
            {/* Featured Post (First One) */}
            {paginatedPosts[0] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-12 md:col-span-2"
              >
                <BlogPostCard post={paginatedPosts[0]} featured />
              </motion.div>
            )}

            {/* Rest of Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {paginatedPosts.slice(1).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (index + 1) * 0.05 }}
                >
                  <BlogPostCard post={post} />
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex justify-center gap-2 flex-wrap"
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <a
                    key={p}
                    href={`/blog?page=${p}`}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      p === pageNum
                        ? 'bg-gradient-to-r from-indigo-500 to-emerald-500 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {p}
                  </a>
                ))}
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-slate-400 text-lg">No posts found.</p>
          </motion.div>
        )}
      </section>
    </main>
  );
}

export default function BlogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <BlogContent page={searchParams.page} />
    </Suspense>
  );
}
