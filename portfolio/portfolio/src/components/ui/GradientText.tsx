'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  animated?: boolean;
  className?: string;
}

const GradientText = ({
  children,
  animated = false,
  className,
}: GradientTextProps) => {
  return (
    <motion.span
      className={cn(
        'bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent',
        className
      )}
      animate={
        animated ? {
          backgroundPosition: ['0%', '100%'],
        } : {}
      }
      transition={
        animated ? {
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
        } : {}
      }
      style={
        animated ? {
          backgroundSize: '200% 200%',
        } : {}
      }
    >
      {children}
    </motion.span>
  );
};

export default GradientText;
