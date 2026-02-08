'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/types/wordpress'
import { ExternalLink } from 'lucide-react'

interface ProjectCardProps {
  project: Project
  size?: 'small' | 'standard' | 'large'
  featured?: boolean
}

export function ProjectCard({
  project,
  size = 'standard',
  featured = false,
}: ProjectCardProps) {
  const heightClass =
    size === 'large' ? 'h-96' : size === 'standard' ? 'h-72' : 'h-56'
  const imageUrl = project.featuredImage?.node?.sourceUrl
  const projectType = project.projectTypes?.nodes?.[0]?.name
  const technologies = project.techStacks?.nodes?.map((n) => n.name) || []
  const cleanExcerpt = project.excerpt?.replace(/<[^>]*>/g, '') || project.projectInfo?.projectExcerpt || ''

  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        className={`relative overflow-hidden rounded-lg group cursor-pointer ${heightClass} bg-surface-800 border border-surface-700`}
        whileHover={{ borderColor: 'rgb(59, 130, 246)' }}
        transition={{ duration: 0.3 }}
      >
        {/* Featured badge */}
        {featured && (
          <motion.div
            className="absolute top-4 right-4 z-20 bg-brand-600 text-white px-3 py-1 rounded-full text-sm font-semibold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            Featured
          </motion.div>
        )}

        {/* Background image */}
        {imageUrl && (
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={imageUrl}
              alt={project.featuredImage?.node?.altText || project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/50 to-transparent group-hover:from-brand-950/80 group-hover:via-surface-950/60 transition-all duration-300" />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          {/* Type badge */}
          {projectType && (
            <motion.div
              className="inline-flex items-center gap-2 mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-xs font-semibold text-brand-400 bg-brand-500/20 px-2 py-1 rounded-full">
                {projectType}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h3
            className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-brand-300 transition-colors"
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {project.title}
          </motion.h3>

          {/* Description */}
          {cleanExcerpt && (
            <motion.p
              className="text-sm text-surface-200 mb-3 line-clamp-2"
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {cleanExcerpt}
            </motion.p>
          )}

          {/* Tech stack */}
          {technologies.length > 0 && (
            <motion.div
              className="flex gap-2 flex-wrap mb-3"
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              {technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="text-xs text-surface-300 bg-surface-900/50 px-2 py-1 rounded border border-surface-700"
                >
                  {tech}
                </span>
              ))}
              {technologies.length > 3 && (
                <span className="text-xs text-surface-400">
                  +{technologies.length - 3}
                </span>
              )}
            </motion.div>
          )}

          {/* Link indicator */}
          <motion.div
            className="flex items-center gap-2 text-brand-400 group-hover:gap-3 transition-all"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-sm font-semibold">View Project</span>
            <ExternalLink className="w-4 h-4" />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  )
}
