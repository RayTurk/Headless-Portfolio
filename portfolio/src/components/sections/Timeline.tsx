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
    year: '2014–2020',
    title: 'Lakeland Community College',
    description:
      'Earned an Associate\'s degree in Web Page, Digital/Multimedia and Information Resources Design — where the passion for building on the web first took root.',
  },
  {
    year: '2015–2021',
    title: 'Service Coordinator · Classic BMW',
    description:
      'Six years at a high-volume BMW dealership mastering scheduling, customer communication, and database management. Built the people skills and detail-orientation that now shape every client relationship.',
  },
  {
    year: '2021–2024',
    title: 'Web Developer · Company 119',
    description:
      'Made the full leap into professional web development. Built and maintained WordPress sites for a range of clients out of Chardon, Ohio — learning the full lifecycle of a client project from kickoff to launch to long-term care.',
  },
  {
    year: '2024–2025',
    title: 'WordPress Developer · Full Spectrum Marketing',
    description:
      'Joined FSM in Akron to deepen WordPress expertise in an agency environment — custom themes, plugins, and ongoing client site management across diverse industries.',
  },
  {
    year: '2025–Present',
    title: 'Full-stack Developer · Neon Goldfish',
    description:
      'Currently building full-spectrum web solutions at Neon Goldfish Marketing Solutions in Toledo. Expanding into React, Next.js, and headless architectures to deliver modern, performant web experiences.',
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
