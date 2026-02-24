'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type BentoVariant = 'default' | 'glass' | 'gradient' | 'accent' | 'dark';
type BentoHoverEffect = 'lift' | 'glow' | 'tilt' | 'none';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: 2 | 3 | 4;
}

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2 | 3;
  variant?: BentoVariant;
  hoverEffect?: BentoHoverEffect;
  delay?: number;
}

const variantStyles = {
  default:
    'bg-surface-900/50 border border-surface-800/50 hover:border-surface-700/50',
  glass:
    'bg-surface-950/40 backdrop-blur-xl border border-surface-900/30 hover:border-surface-700/50 hover:bg-surface-900/50',
  gradient:
    'bg-gradient-to-br from-brand-500/10 to-steel-500/10 border border-brand-500/20 hover:border-brand-500/40 hover:shadow-lg hover:shadow-brand-500/20',
  accent:
    'bg-gradient-to-br from-steel-500/10 to-brand-500/5 border border-steel-500/30 hover:border-steel-500/60 hover:shadow-lg hover:shadow-steel-500/20',
  dark: 'bg-surface-950/60 border border-surface-800/30 hover:border-surface-700/50',
};

const colSpanMap = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
};

const rowSpanMap = {
  1: 'row-span-1',
  2: 'row-span-2',
  3: 'row-span-3',
};

export const BentoGrid = ({
  children,
  className,
  columns = 4,
}: BentoGridProps) => {
  const gridColsMap = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div
      className={cn(
        'grid gap-4 md:gap-6 auto-rows-auto',
        gridColsMap[columns],
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoItem = ({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  variant = 'default',
  hoverEffect = 'lift',
  delay = 0,
}: BentoItemProps) => {
  const hoverAnimations = {
    lift: { y: -8, transition: { duration: 0.3 } },
    glow: {
      boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)',
      transition: { duration: 0.3 },
    },
    tilt: {
      rotateX: -5,
      rotateY: 5,
      transition: { duration: 0.3 },
    },
    none: {},
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={hoverEffect !== 'none' ? hoverAnimations[hoverEffect] : {}}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        delay,
        duration: 0.5,
        ease: 'easeOut',
      }}
      className={cn(
        'rounded-xl p-6 md:p-8 transition-all duration-300',
        variantStyles[variant],
        colSpanMap[colSpan],
        rowSpanMap[rowSpan],
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default BentoGrid;
