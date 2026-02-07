'use client';

import { motion } from 'framer-motion';
import { X, Dot } from 'lucide-react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'brand' | 'accent' | 'outline';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dotIndicator?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const variantStyles = {
  default:
    'bg-surface-900/50 border border-surface-800/50 text-surface-300 hover:border-surface-700',
  brand:
    'bg-brand-500/15 border border-brand-500/30 text-brand-300 hover:border-brand-500/60 hover:bg-brand-500/25',
  accent:
    'bg-accent-500/15 border border-accent-500/30 text-accent-300 hover:border-accent-500/60 hover:bg-accent-500/25',
  outline:
    'bg-transparent border border-surface-600/50 text-surface-300 hover:border-surface-500 hover:bg-surface-900/30',
};

const sizeStyles = {
  sm: 'px-2.5 py-1 text-xs font-medium rounded-full',
  md: 'px-3.5 py-1.5 text-sm font-medium rounded-full',
};

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  dotIndicator = false,
  dismissible = false,
  onDismiss,
  className,
}: BadgeProps) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        'inline-flex items-center gap-1 transition-all duration-200 border backdrop-blur-sm',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dotIndicator && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Dot size={size === 'sm' ? 12 : 16} className="fill-current" />
        </motion.div>
      )}
      <span>{children}</span>
      {dismissible && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onDismiss}
          className="ml-1 hover:opacity-70 transition-opacity"
          aria-label="Dismiss"
        >
          <X size={size === 'sm' ? 12 : 14} />
        </motion.button>
      )}
    </motion.span>
  );
};

export default Badge;
