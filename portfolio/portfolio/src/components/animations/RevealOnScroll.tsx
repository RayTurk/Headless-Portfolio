'use client';

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, fadeIn } from '@/lib/animations';

type AnimationPreset = 'fade' | 'fade-up' | 'fade-left' | 'fade-right' | 'scale';

const presets: Record<AnimationPreset, Variants> = {
  fade: fadeIn,
  'fade-up': fadeInUp,
  'fade-left': fadeInLeft,
  'fade-right': fadeInRight,
  scale: scaleIn,
};

interface RevealOnScrollProps {
  children: ReactNode;
  preset?: AnimationPreset;
  delay?: number;
  className?: string;
  once?: boolean;
}

export default function RevealOnScroll({
  children,
  preset = 'fade-up',
  delay = 0,
  className = '',
  once = true,
}: RevealOnScrollProps) {
  const { ref, controls, inView } = useScrollAnimation({ triggerOnce: once });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const variants = presets[preset];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
