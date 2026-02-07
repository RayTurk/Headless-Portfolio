'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/types/wordpress'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const readingTime = post.readingTime || Math.ceil(post.content?.length / 200) || 5

  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.article
        className="group h-full rounded-lg overflow-hidden border border-surface-700 hover:border-brand-500/30 bg-surface-800 transition-colors duration-300 flex flex-col"
        whileHover={{ borderColor: 'rgb(59, 130, 246)' }}
        transition={{ duration: 0.3 }}
      >
        {/* Featured image */}
        {post.featuredImage && (
          <motion.div
            className="relative h-48 overflow-hidden bg-surface-900"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-950 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        )}

        {/* Content */}
        <div className="flex flex-col flex-grow p-6">
          {/* Category badge */}
          {post.category && (
            <motion.div
              className="inline-flex items-center gap-1 mb-3 w-fit"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-xs font-semibold text-brand-400 bg-brand-500/20 px-2 py-1 rounded-full">
                {post.category}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h3
            className="text-lg font-bold text-white mb-2 group-hover:text-brand-300 transition-colors line-clamp-2 flex-grow"
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {post.title}
          </motion.h3>

          {/* Excerpt */}
          {post.excerpt && (
            <motion.p
              className="text-sm text-surface-300 mb-4 line-clamp-2"
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {post.excerpt}
            </motion.p>
          )}

          {/* Meta info */}
          <motion.div
            className="flex items-center gap-4 text-xs text-surface-400 mb-4 pt-4 border-t border-surface-700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            {post.publishedDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <time dateTime={post.publishedDate}>
                  {new Date(post.publishedDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{readingTime} min read</span>
            </div>
          </motion.div>

          {/* Read more link */}
          <motion.div
            className="flex items-center gap-2 text-brand-400 group-hover:gap-3 transition-all mt-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-sm font-semibold">Read Article</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </motion.article>
    </Link>
  )
}
