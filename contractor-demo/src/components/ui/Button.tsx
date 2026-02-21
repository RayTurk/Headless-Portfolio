import { cn } from '@/lib/utils';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-amber-500 hover:bg-amber-400 text-white font-semibold shadow-sm hover:shadow-amber-glow',
  secondary:
    'bg-navy-950 hover:bg-navy-800 text-white font-semibold shadow-sm',
  outline:
    'border-2 border-navy-950 text-navy-950 hover:bg-navy-950 hover:text-white font-semibold',
  ghost:
    'text-navy-950 hover:bg-gray-100 font-medium',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-md',
  md: 'px-6 py-2.5 text-base rounded-lg',
  lg: 'px-8 py-3.5 text-base rounded-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  className,
  children,
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 transition-all duration-200',
    variants[variant],
    sizes[size],
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
