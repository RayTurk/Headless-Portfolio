'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

const variantStyles = {
  primary:
    'bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-white shadow-lg hover:shadow-brand-500/50 border border-brand-500/50',
  secondary:
    'bg-transparent border border-surface-700 text-surface-200 hover:border-brand-500 hover:text-brand-400 hover:bg-surface-900/50',
  accent:
    'bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 text-white shadow-lg hover:shadow-accent-500/50 border border-accent-500/50',
  ghost:
    'bg-surface-900/50 hover:bg-surface-800 text-surface-200 hover:text-surface-100 border border-transparent',
  link: 'bg-transparent text-brand-400 hover:text-brand-300 underline-offset-4 hover:underline',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm font-medium rounded-md',
  md: 'px-5 py-2.5 text-base font-medium rounded-lg',
  lg: 'px-6 py-3 text-lg font-semibold rounded-lg',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  href,
  onClick,
  type = 'button',
  ariaLabel,
  target,
  rel,
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  const baseStyles = cn(
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 relative group',
    variantStyles[variant],
    sizeStyles[size],
    isDisabled && 'opacity-50 cursor-not-allowed',
    className
  );

  const content = (
    <>
      {loading && <LoadingSpinner size="sm" />}
      {!loading && icon && iconPosition === 'left' && icon}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && icon}
    </>
  );

  if (href) {
    return (
      <Link href={href} target={target} rel={rel}>
        <motion.button
          whileHover={!isDisabled ? { scale: 1.02 } : {}}
          whileTap={!isDisabled ? { scale: 0.98 } : {}}
          disabled={isDisabled}
          className={baseStyles}
          aria-label={ariaLabel}
        >
          {content}
          {variant === 'primary' && !isDisabled && (
            <motion.div
              className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity pointer-events-none"
              animate={{
                boxShadow: [
                  '0 0 0px rgba(255,255,255,0)',
                  '0 0 10px rgba(255,255,255,0.3)',
                  '0 0 0px rgba(255,255,255,0)',
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.button>
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={isDisabled}
      type={type}
      className={baseStyles}
      aria-label={ariaLabel}
    >
      {content}
      {variant === 'primary' && !isDisabled && (
        <motion.div
          className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity pointer-events-none"
          animate={{
            boxShadow: [
              '0 0 0px rgba(255,255,255,0)',
              '0 0 10px rgba(255,255,255,0.3)',
              '0 0 0px rgba(255,255,255,0)',
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
};

export default Button;
