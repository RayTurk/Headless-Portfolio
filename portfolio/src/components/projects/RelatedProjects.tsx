'use client';

import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';

interface RelatedProject {
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

interface RelatedProjectsProps {
  projects: RelatedProject[];
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  // Take first 3 related projects
  const relatedProjects = projects.slice(0, 3);

  return (
    <section className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
            More Projects
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
