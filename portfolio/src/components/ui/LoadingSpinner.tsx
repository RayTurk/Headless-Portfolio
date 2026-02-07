'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'brand' | 'accent';
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

const variantMap = {
  brand: 'from-brand-500 to-brand-400',
  accent: 'from-accent-500 to-accent-400',
};

const LoadingSpinner = ({
  size = 'md',
  className,
  variant = 'brand',
}: LoadingSpinnerProps) => {
  return (
    <div className={cn('relative inline-flex', sizeMap[size], className)}>
      <motion.div
        className={cn(
          'w-full h-full rounded-full border-2 border-transparent',
          `border-t-${variant}-500 border-r-${variant}-500`
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          borderImage: `linear-gradient(to right, var(--tw-gradient-stops)) 1`,
          '--tw-gradient-from': variant === 'brand' ? '#6366f1' : '#10b981',
          '--tw-gradient-to': variant === 'brand' ? '#818cf8' : '#34d399',
        } as React.CSSProperties}
      />
    </div>
  );
};

export default LoadingSpinner;
