'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { staggerContainer, staggerItem, progressBar } from '@/lib/animations';

interface Skill {
  name: string;
  level: string;
  percent: number;
}

const skills: Skill[] = [
  { name: 'WordPress', level: 'Expert', percent: 95 },
  { name: 'PHP', level: 'Expert', percent: 90 },
  { name: 'JavaScript / TypeScript', level: 'Advanced', percent: 85 },
  { name: 'React / Next.js', level: 'Advanced', percent: 82 },
  { name: 'MySQL / Databases', level: 'Advanced', percent: 80 },
  { name: 'DevOps / Hosting', level: 'Advanced', percent: 78 },
  { name: 'UI / UX Design', level: 'Intermediate', percent: 70 },
  { name: 'SEO & Analytics', level: 'Advanced', percent: 80 },
];

function getBarColor(percent: number): string {
  if (percent >= 90) return 'from-brand-400 to-brand-600';
  if (percent >= 80) return 'from-brand-500 to-steel-500';
  return 'from-steel-400 to-steel-600';
}

export default function SkillsVisualization() {
  const { ref, controls } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
      className="space-y-6"
    >
      {skills.map((skill) => (
        <motion.div key={skill.name} variants={staggerItem}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-surface-200 font-medium">{skill.name}</span>
            <span className={cn(
              'text-xs font-semibold px-2 py-0.5 rounded-full',
              skill.percent >= 90
                ? 'bg-brand-500/20 text-brand-300'
                : skill.percent >= 80
                  ? 'bg-steel-500/20 text-steel-300'
                  : 'bg-surface-700 text-surface-400'
            )}>
              {skill.level}
            </span>
          </div>
          <div className="h-3 bg-surface-800 rounded-full overflow-hidden">
            <motion.div
              variants={progressBar}
              custom={skill.percent}
              className={cn(
                'h-full rounded-full bg-gradient-to-r',
                getBarColor(skill.percent)
              )}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
