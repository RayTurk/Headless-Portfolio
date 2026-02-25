'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface Project {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText?: string;
    };
  };
  techStacks?: {
    nodes: Array<{ id: string; name: string }>;
  };
  projectTypes?: {
    nodes: Array<{ id: string; name: string; slug: string }>;
  };
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const imageUrl = project.featuredImage?.node?.sourceUrl;
  const technologies = project.techStacks?.nodes || [];
  const visibleTechs = technologies.slice(0, 3);
  const hiddenTechCount = technologies.length - 3;
  const projectType = project.projectTypes?.nodes?.[0]?.name || 'Project';
  const cleanExcerpt = project.excerpt?.replace(/<[^>]*>/g, '') || '';

  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -8 }}
        className="group cursor-pointer h-full overflow-hidden rounded-xl bg-surface-900 border border-surface-700 hover:border-brand-500/30 transition-colors duration-300"
      >
        {/* Image Container */}
        <div className="relative h-48 md:h-64 overflow-hidden bg-surface-800">
          {imageUrl ? (
            <motion.div
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full h-full"
            >
              <Image
                src={imageUrl}
                alt={project.featuredImage?.node?.altText || project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-steel-900/50 to-brand-950/30 flex items-center justify-center">
              <span className="text-surface-400">No image</span>
            </div>
          )}

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Project Type Badge */}
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 bg-steel-700 text-cinder text-xs font-semibold rounded-full">
              {projectType}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-cinder mb-2 group-hover:text-brand-400 transition-colors line-clamp-2">
            {project.title}
          </h3>

          {/* Excerpt */}
          <p className="text-surface-400 text-sm mb-4 line-clamp-2">
            {cleanExcerpt}
          </p>

          {/* Tech Stack */}
          {visibleTechs.length > 0 && (
            <div className="flex flex-wrap gap-2 pb-4 border-t border-surface-700 pt-4">
              {visibleTechs.map((tech) => (
                <span
                  key={tech.id}
                  className="px-2 py-1 bg-surface-700 text-surface-300 text-xs rounded font-medium"
                >
                  {tech.name}
                </span>
              ))}
              {hiddenTechCount > 0 && (
                <span className="px-2 py-1 bg-surface-700 text-surface-400 text-xs rounded font-medium">
                  +{hiddenTechCount} more
                </span>
              )}
            </div>
          )}

          {/* View Project Link */}
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="text-brand-400 text-sm font-semibold flex items-center gap-2"
          >
            View Project
            <motion.span animate={isHovered ? { x: 4 } : { x: 0 }}>
              &rarr;
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}
