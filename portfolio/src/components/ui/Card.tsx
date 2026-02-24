'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'glass' | 'gradient' | 'bordered' | 'accent';
type CardHoverEffect = 'lift' | 'glow' | 'tilt' | 'none';
type CardPadding = 'sm' | 'md' | 'lg';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  hoverEffect?: CardHoverEffect;
  padding?: CardPadding;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const variantStyles = {
  default:
    'bg-surface-900/50 border border-surface-800/50 hover:border-surface-700/50',
  glass:
    'bg-surface-950/40 border border-surface-900/30 backdrop-blur-xl hover:bg-surface-900/50 hover:border-surface-800/50',
  gradient:
    'bg-gradient-to-br from-surface-900/80 to-surface-950/80 border border-brand-500/20 hover:border-brand-500/40',
  bordered:
    'bg-surface-950/40 border border-steel-500/30 hover:border-steel-500/60',
  accent:
    'bg-gradient-to-br from-steel-500/10 to-brand-500/10 border border-steel-500/30 hover:border-steel-500/60',
};

const paddingMap = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const Card = ({
  children,
  variant = 'default',
  hoverEffect = 'lift',
  padding = 'md',
  className,
  header,
  footer,
}: CardProps) => {
  const hoverAnimations = {
    lift: { y: -8, transition: { duration: 0.3 } },
    glow: {
      boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)',
      transition: { duration: 0.3 },
    },
    tilt: { rotateX: -5, rotateY: 5, transition: { duration: 0.3 } },
    none: {},
  };

  return (
    <motion.div
      whileHover={hoverEffect !== 'none' ? hoverAnimations[hoverEffect] : {}}
      className={cn(
        'rounded-xl transition-all duration-300',
        variantStyles[variant],
        className
      )}
    >
      {header && (
        <div className={cn('border-b border-surface-800/50', paddingMap[padding])}>
          {header}
        </div>
      )}

      <div className={paddingMap[padding]}>
        {children}
      </div>

      {footer && (
        <div className={cn('border-t border-surface-800/50', paddingMap[padding])}>
          {footer}
        </div>
      )}
    </motion.div>
  );
};

export default Card;
