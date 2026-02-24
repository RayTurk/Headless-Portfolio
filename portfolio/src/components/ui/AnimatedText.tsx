'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type SplitMode = 'words' | 'characters';
type AnimationType = 'fadeUp' | 'fadeIn' | 'typing';

interface AnimatedTextProps {
  children: string | number;
  className?: string;
  splitMode?: SplitMode;
  animationType?: AnimationType;
  staggerDelay?: number;
  duration?: number;
  delay?: number;
  gradient?: boolean;
}

const AnimatedText = ({
  children,
  className,
  splitMode = 'words',
  animationType = 'fadeUp',
  staggerDelay = 0.05,
  duration = 0.5,
  delay = 0,
  gradient = false,
}: AnimatedTextProps) => {
  const text = String(children);
  const items = splitMode === 'words' ? text.split(' ') : text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden:
      animationType === 'fadeUp'
        ? { opacity: 0, y: 10 }
        : { opacity: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className={cn('inline', className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, i) => (
        <motion.span
          key={`${item}-${i}`}
          variants={itemVariants}
          className={cn(
            gradient && 'bg-gradient-to-r from-brand-400 to-steel-400 bg-clip-text text-transparent'
          )}
        >
          {item}
          {splitMode === 'words' && i < items.length - 1 && ' '}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
