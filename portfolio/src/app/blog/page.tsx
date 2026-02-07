import { Metadata } from 'next';
import { getAllPosts } from '@/lib/api';
import { BlogPostCard } from '@/components/blog/PostCard';
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
    post.categories?.nodes?.forEach((cat) => {
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
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Insights on WordPress, web development, and digital strategy
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-12">
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
          </div>
        )}
      </section>

      {/* Posts Grid */}
      <section className="max-w-5xl mx-auto">
        {paginatedPosts.length > 0 ? (
          <>
            {/* Featured Post (First One) */}
            {paginatedPosts[0] && (
              <div className="mb-12 md:col-span-2">
                <BlogPostCard post={paginatedPosts[0]} featured />
              </div>
            )}

            {/* Rest of Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {paginatedPosts.slice(1).map((post) => (
                <div key={post.id}>
                  <BlogPostCard post={post} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 flex-wrap">
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
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No posts found.</p>
          </div>
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
