import { Metadata } from 'next';
import { getAllPosts } from '@/lib/api';
import { BlogPostCard } from '@/components/blog/PostCard';
import { Suspense } from 'react';

export const revalidate = 3600 // Revalidate every hour

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
    <main className="min-h-screen bg-surface-950 pt-32 pb-20 px-4 md:px-8 lg:px-12">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto mb-16">
        <div className="text-center mb-12">
          <p className="font-mono text-xs tracking-[0.15em] uppercase text-brand-500 mb-4">
            → Insights &amp; Perspectives
          </p>
          <h1 className="font-display font-black text-6xl md:text-7xl lg:text-8xl uppercase leading-none tracking-tight text-cinder mb-3">
            THE <span className="text-brand-500">BLOG</span>
          </h1>
          <p className="font-display uppercase tracking-[0.08em] text-surface-400 text-lg mt-3">
            WordPress · Web Dev · Digital Strategy
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <a
              href="/blog"
              className="px-4 py-2 rounded-full bg-steel-700 text-cinder font-semibold text-sm transition-colors"
            >
              All Posts
            </a>
            {categories.slice(0, 5).map((cat) => (
              <a
                key={cat.slug}
                href={`/blog?category=${cat.slug}`}
                className="px-4 py-2 rounded-full bg-surface-800 hover:bg-surface-700 text-ash font-semibold text-sm transition-colors"
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
                        ? 'bg-steel-700 text-cinder'
                        : 'bg-surface-800 text-ash hover:bg-surface-700'
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
            <p className="text-surface-400 text-lg">No posts found.</p>
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
    <Suspense fallback={<div className="min-h-screen bg-surface-950" />}>
      <BlogContent page={searchParams.page} />
    </Suspense>
  );
}
