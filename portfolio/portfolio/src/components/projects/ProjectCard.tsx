'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface Project {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media_url?: string;
  technologies?: Array<{ id: number; name: string }>;
  project_type?: Array<{ id: number; name: string; slug: string }>;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Show max 3 technologies, hide others
  const visibleTechs = project.technologies?.slice(0, 3) || [];
  const hiddenTechCount = (project.technologies?.length || 0) - 3;

  // Get first project type for badge
  const projectType = project.project_type?.[0]?.name || 'Project';

  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -8 }}
        className="group cursor-pointer h-full overflow-hidden rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-colors duration-300"
      >
        {/* Image Container */}
        <div className="relative h-48 md:h-64 overflow-hidden bg-slate-800">
          {project.featured_media_url ? (
            <motion.div
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full h-full"
            >
              <Image
                src={project.featured_media_url}
                alt={project.title.rendered}
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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Project Type Badge */}
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 bg-indigo-500 text-white text-xs font-semibold rounded-full">
              {projectType}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors line-clamp-2">
            {project.title.rendered}
          </h3>

          {/* Excerpt */}
          <p className="text-slate-400 text-sm mb-4 line-clamp-2">
            {project.excerpt.rendered.replace(/<[^>]*>/g, '')}
          </p>

          {/* Tech Stack */}
          {visibleTechs.length > 0 && (
            <div className="flex flex-wrap gap-2 pb-4 border-t border-slate-800 pt-4">
              {visibleTechs.map((tech) => (
                <span
                  key={tech.id}
                  className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded font-medium"
                >
                  {tech.name}
                </span>
              ))}
              {hiddenTechCount > 0 && (
                <span className="px-2 py-1 bg-slate-800 text-slate-400 text-xs rounded font-medium">
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
            className="text-indigo-400 text-sm font-semibold flex items-center gap-2"
          >
            View Project
            <motion.span animate={isHovered ? { x: 4 } : { x: 0 }}>
              →
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}
