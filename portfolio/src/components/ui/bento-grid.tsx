import { cn } from '@/lib/utils'

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid gap-6 auto-rows-max',
        className
      )}
    >
      {children}
    </div>
  )
}

interface BentoGridItemProps {
  children: React.ReactNode
  className?: string
}

export function BentoGridItem({ children, className }: BentoGridItemProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-surface-700 overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  )
}
