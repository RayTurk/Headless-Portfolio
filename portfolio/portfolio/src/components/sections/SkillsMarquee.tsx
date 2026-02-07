'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const techStack = [
  'WordPress',
  'React',
  'Next.js',
  'PHP',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'MySQL',
  'GraphQL',
  'AWS',
  'Tailwind CSS',
  'Docker',
  'Git',
  'REST APIs',
  'Webpack',
  'PostgreSQL',
]

export function SkillsMarquee() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-lg font-semibold text-surface-300">
            Tech Stack & Tools
          </h3>
        </motion.div>

        {/* First marquee - scrolling right */}
        <div className="relative overflow-hidden mb-8">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface-900 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-surface-900 to-transparent z-10" />

          <motion.div
            className="flex gap-8 w-max"
            animate={{ x: [0, -1920] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
            onMouseEnter={() => setHoveredIndex(0)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Duplicate for seamless loop */}
            {[...techStack, ...techStack].map((tech, index) => (
              <motion.div
                key={index}
                className={`flex-shrink-0 px-6 py-3 rounded-lg border border-surface-700 whitespace-nowrap font-medium transition-all duration-300 ${
                  hoveredIndex === 0
                    ? 'text-surface-300 border-surface-600 bg-surface-800/30'
                    : 'text-surface-400 bg-surface-800/10'
                }`}
                whileHover={{
                  scale: 1.05,
                  borderColor: 'rgb(from var(--color-brand-500) r g b / 0.5)',
                  color: 'rgb(from var(--color-brand-400) r g b)',
                }}
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Second marquee - scrolling left */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface-900 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-surface-900 to-transparent z-10" />

          <motion.div
            className="flex gap-8 w-max"
            animate={{ x: [-1920, 0] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
            onMouseEnter={() => setHoveredIndex(1)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Duplicate for seamless loop */}
            {[...techStack, ...techStack].map((tech, index) => (
              <motion.div
                key={index}
                className={`flex-shrink-0 px-6 py-3 rounded-lg border border-surface-700 whitespace-nowrap font-medium transition-all duration-300 ${
                  hoveredIndex === 1
                    ? 'text-surface-300 border-surface-600 bg-surface-800/30'
                    : 'text-surface-400 bg-surface-800/10'
                }`}
                whileHover={{
                  scale: 1.05,
                  borderColor: 'rgb(from var(--color-brand-500) r g b / 0.5)',
                  color: 'rgb(from var(--color-brand-400) r g b)',
                }}
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
