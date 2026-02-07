/**
 * Framer Motion Animation Configuration
 * Reusable variants, transitions, and animation utilities
 */

import { Variants, Transition } from 'framer-motion';

// ============================================================================
// TRANSITIONS
// ============================================================================

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
};

export const smoothTransition: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

export const quickTransition: Transition = {
  duration: 0.3,
  ease: 'easeOut',
};

// ============================================================================
// FADE VARIANTS
// ============================================================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// ============================================================================
// SCALE VARIANTS
// ============================================================================

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

// ============================================================================
// STAGGER VARIANTS
// ============================================================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

// ============================================================================
// HOVER VARIANTS
// ============================================================================

export const cardHover = {
  rest: { scale: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  hover: { scale: 1.02, y: -5, transition: { duration: 0.3, ease: 'easeOut' } },
};

export const cardImageHover = {
  rest: { scale: 1, transition: { duration: 0.4 } },
  hover: { scale: 1.05, transition: { duration: 0.4 } },
};

export const glowHover = {
  rest: { boxShadow: '0 0 0 rgba(99, 102, 241, 0)' },
  hover: {
    boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)',
    transition: { duration: 0.3 },
  },
};

// ============================================================================
// TEXT REVEAL VARIANTS
// ============================================================================

export const textReveal: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ============================================================================
// LINE / PATH VARIANTS
// ============================================================================

export const drawLine: Variants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration: 1.5, ease: 'easeInOut' },
  },
};

// ============================================================================
// PAGE TRANSITION VARIANTS
// ============================================================================

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

// ============================================================================
// PROGRESS BAR VARIANTS
// ============================================================================

export const progressBar: Variants = {
  hidden: { width: 0 },
  visible: (percent: number) => ({
    width: `${percent}%`,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  }),
};
