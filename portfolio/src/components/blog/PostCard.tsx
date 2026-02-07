'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface Post {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media_url?: string;
  categories?: Array<{ id: number; name: string; slug: string }>;
  author_name?: string;
  author_avatar?: string;
  date: string;
}

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

// Calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function BlogPostCard({ post, featured = false }: PostCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const category = post.categories?.[0];
  // Estimate reading time based on excerpt length (rough estimate)
  const estimatedReadingTime = Math.max(
    2,
    Math.ceil(post.excerpt.rendered.split(' ').length / 200)
  );

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`}>
        <motion.div
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="group cursor-pointer overflow-hidden rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-colors duration-300 h-full grid grid-cols-1 md:grid-cols-2 gap-0"
        >
          {/* Image */}
          <div className="relative h-64 md:h-full overflow-hidden bg-slate-800">
            {post.featured_media_url ? (
              <motion.div
                animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                <Image
                  src={post.featured_media_url}
                  alt={post.title.rendered}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 flex items-center justify-center">
                <span className="text-slate-400">No image</span>
              </div>
            )}
            {category && (
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 bg-indigo-500 text-white text-xs font-semibold rounded-full">
                  {category.name}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors line-clamp-3">
              {post.title.rendered}
            </h2>

            <p className="text-slate-400 text-sm mb-6 line-clamp-3">
              {post.excerpt.rendered.replace(/<[^>]*>/g, '')}
            </p>

            <div className="flex items-center gap-4 text-slate-400 text-sm">
              {post.author_avatar && (
                <Image
                  src={post.author_avatar}
                  alt={post.author_name || 'Author'}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span>{post.author_name || 'Author'}</span>
              <span>•</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>{estimatedReadingTime} min read</span>
            </div>

            {/* Read More Link */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className="mt-4 text-indigo-400 text-sm font-semibold flex items-center gap-2"
            >
              Read Article
              <motion.span animate={isHovered ? { x: 4 } : { x: 0 }}>
                →
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -8 }}
        className="group cursor-pointer h-full overflow-hidden rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-colors duration-300 flex flex-col"
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-slate-800">
          {post.featured_media_url ? (
            <motion.div
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              <Image
                src={post.featured_media_url}
                alt={post.title.rendered}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 flex items-center justify-center">
              <span className="text-slate-400">No image</span>
            </div>
          )}

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40"
          />

          {/* Category Badge */}
          {category && (
            <div className="absolute top-3 right-3">
              <span className="px-3 py-1 bg-indigo-500 text-white text-xs font-semibold rounded-full">
                {category.name}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors line-clamp-2 flex-1">
            {post.title.rendered}
          </h3>

          {/* Excerpt */}
          <p className="text-slate-400 text-sm mb-4 line-clamp-2">
            {post.excerpt.rendered.replace(/<[^>]*>/g, '')}
          </p>

          {/* Meta Footer */}
          <div className="flex items-center gap-3 text-slate-400 text-xs border-t border-slate-800 pt-4">
            {post.author_avatar && (
              <Image
                src={post.author_avatar}
                alt={post.author_name || 'Author'}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span className="flex-1">{post.author_name || 'Author'}</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
