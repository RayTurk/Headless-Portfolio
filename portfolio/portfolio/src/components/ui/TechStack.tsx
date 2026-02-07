'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface TechItem {
  name: string;
  description?: string;
  color?: string;
}

interface TechStackProps {
  technologies: TechItem[];
  className?: string;
  displayLimit?: number;
  layout?: 'row' | 'wrap';
}

const techColorMap: Record<string, string> = {
  'Next.js': 'brand',
  'React': 'brand',
  'TypeScript': 'brand',
  'Tailwind CSS': 'accent',
  'WordPress': 'accent',
  'PHP': 'accent',
  'JavaScript': 'brand',
  'Node.js': 'brand',
  'MongoDB': 'accent',
  'PostgreSQL': 'accent',
  'GraphQL': 'brand',
  'REST API': 'brand',
  'Framer Motion': 'brand',
  'Jest': 'accent',
  'Vercel': 'brand',
  'AWS': 'accent',
  'Docker': 'brand',
  'Git': 'accent',
};

const TechStack = ({
  technologies,
  className,
  displayLimit,
  layout = 'wrap',
}: TechStackProps) => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const displayedTechs = displayLimit
    ? technologies.slice(0, displayLimit)
    : technologies;
  const remainingCount = Math.max(0, technologies.length - (displayLimit || technologies.length));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div
      className={cn(
        layout === 'row'
          ? 'flex overflow-x-auto scrollbar-hide gap-2 pb-2'
          : 'flex flex-wrap gap-2',
        className
      )}
    >
      <motion.div
        className="flex flex-wrap gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {displayedTechs.map((tech) => (
          <motion.div
            key={tech.name}
            variants={itemVariants}
            onMouseEnter={() => setHoveredTech(tech.name)}
            onMouseLeave={() => setHoveredTech(null)}
            className="relative"
          >
            <Badge
              variant={
                (tech.color as any) ||
                (techColorMap[tech.name] as any) ||
                'default'
              }
              size="sm"
            >
              {tech.name}
            </Badge>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredTech === tech.name && tech.description && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-surface-950 border border-surface-800 text-surface-200 text-xs px-2 py-1 rounded-md z-50"
                >
                  {tech.description}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {remainingCount > 0 && (
          <motion.div variants={itemVariants}>
            <Badge variant="outline" size="sm">
              +{remainingCount} more
            </Badge>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TechStack;
