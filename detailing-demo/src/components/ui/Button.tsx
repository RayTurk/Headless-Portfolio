import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-glow hover:shadow-cyan-glow-lg':
              variant === 'primary',
            'border border-zinc-700 hover:border-cyan-500/50 text-zinc-300 hover:text-white hover:bg-zinc-800/50':
              variant === 'outline',
            'text-zinc-400 hover:text-white hover:bg-zinc-800/50': variant === 'ghost',
          },
          {
            'text-sm px-4 py-2': size === 'sm',
            'text-sm px-6 py-3': size === 'md',
            'text-base px-8 py-4': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
