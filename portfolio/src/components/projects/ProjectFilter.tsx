'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from './ProjectCard';

interface ProjectType {
  name: string;
  slug: string;
}

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

interface ProjectFilterProps {
  projectTypes: ProjectType[];
  projects: Project[];
}

export function ProjectFilter({ projectTypes, projects }: ProjectFilterProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.projectTypes?.nodes?.some((pt) => pt.slug === activeFilter);
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* Filter Pills */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap gap-3 mb-12 justify-center md:justify-start"
      >
        {projectTypes.map((type) => {
          const isActive = activeFilter === type.slug;
          return (
            <motion.button
              key={type.slug}
              onClick={() => setActiveFilter(type.slug)}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors relative ${
                isActive
                  ? 'text-cinder'
                  : 'text-surface-400 hover:text-ash'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.span
                  layoutId="activePill"
                  className="absolute inset-0 bg-steel-700 rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {type.name}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Projects Grid */}
      <div className="mb-4 text-surface-400">
        {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-surface-400 text-lg">
            No projects found in this category.
          </p>
        </motion.div>
      )}
    </div>
  );
}
