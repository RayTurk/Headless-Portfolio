'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Project } from '@/types/wordpress'
import { ProjectCard } from '@/components/ui/project-card'
import { BentoGrid } from '@/components/ui/bento-grid'

interface FeaturedProjectsProps {
  projects: Project[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (!projects || projects.length === 0) {
    return null
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const featuredProject = projects[0]
  const otherProjects = projects.slice(1, 4)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-950">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Featured</span>{' '}
            <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="text-lg text-surface-300">
            A selection of recent projects showcasing full-stack development and WordPress expertise
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <BentoGrid className="grid-cols-1 md:grid-cols-4 gap-6">
            {/* Featured large project */}
            {featuredProject && (
              <motion.div
                variants={itemVariants}
                className="md:col-span-2 md:row-span-2"
              >
                <ProjectCard
                  project={featuredProject}
                  size="large"
                  featured
                />
              </motion.div>
            )}

            {/* Other projects */}
            {otherProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="md:col-span-2"
              >
                <ProjectCard project={project} size="standard" />
              </motion.div>
            ))}
          </BentoGrid>
        </motion.div>

        {/* View all projects link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-semibold group"
          >
            View All Projects
            <motion.span
              className="inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
