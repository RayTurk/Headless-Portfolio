'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const timelineData: TimelineItem[] = [
  {
    year: '2018',
    title: 'Started WordPress Development',
    description:
      'Dove headfirst into the WordPress ecosystem, building themes and plugins while learning the ins and outs of PHP and MySQL.',
  },
  {
    year: '2019',
    title: 'First Agency Role',
    description:
      'Joined a digital agency, managing dozens of client sites and learning the value of systematic maintenance and proactive care.',
  },
  {
    year: '2020',
    title: 'Went Freelance',
    description:
      'Launched my own practice, focusing on what I loved most: keeping websites healthy and building custom solutions for small businesses.',
  },
  {
    year: '2021',
    title: '100+ Sites Maintained',
    description:
      'Hit a milestone of over 100 WordPress sites under active maintenance, proving that reliability and consistency build trust.',
  },
  {
    year: '2022',
    title: 'Full Stack Expansion',
    description:
      'Expanded into React, Next.js, and modern JavaScript frameworks to offer clients the best of both worlds: WordPress CMS power with cutting-edge frontends.',
  },
  {
    year: '2023',
    title: 'Headless WordPress Pioneer',
    description:
      'Built some of the first headless WordPress + Next.js sites in the Cleveland area, combining CMS flexibility with blazing-fast performance.',
  },
  {
    year: '2024',
    title: 'Growing the Practice',
    description:
      'Focused on scaling maintenance operations and building lasting client relationships. Every site deserves someone who genuinely cares about keeping it running.',
  },
];

export default function Timeline() {
  const { ref, controls } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
      className="relative"
    >
      {/* Center line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-surface-700 md:-translate-x-px" />

      <div className="space-y-12">
        {timelineData.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={item.year}
              variants={staggerItem}
              className="relative flex items-start md:items-center"
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-brand-500 rounded-full -translate-x-1.5 mt-2 md:mt-0 z-10 shadow-glow" />

              {/* Content */}
              <div
                className={`ml-12 md:ml-0 md:w-1/2 ${
                  isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'
                }`}
              >
                <span className="text-brand-400 font-mono text-sm font-semibold">
                  {item.year}
                </span>
                <h3 className="text-lg font-semibold text-surface-50 mt-1 mb-2">
                  {item.title}
                </h3>
                <p className="text-surface-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
