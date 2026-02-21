import Link from 'next/link';
import { Check, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Package } from '@/lib/types';

interface PackageCardProps {
  pkg: Package;
  className?: string;
}

export default function PackageCard({ pkg, className }: PackageCardProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border transition-all duration-300',
        pkg.highlighted
          ? 'bg-zinc-900 border-cyan-500/50 shadow-cyan-glow'
          : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700',
        className
      )}
    >
      {/* Popular badge */}
      {pkg.highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            <Star className="w-3 h-3 fill-current" />
            Most Popular
          </span>
        </div>
      )}

      <div className="p-8 flex flex-col flex-1">
        {/* Package name */}
        <div className="mb-6">
          <h3 className={cn('text-xl font-bold mb-1', pkg.highlighted ? 'text-cyan-400' : 'text-white')}>
            {pkg.name}
          </h3>
          <p className="text-zinc-400 text-sm">{pkg.tagline}</p>
        </div>

        {/* Price */}
        <div className="flex items-end gap-2 mb-2">
          <span className="text-4xl font-bold text-white">${pkg.price}</span>
          <span className="text-zinc-400 text-sm mb-1.5">/ vehicle</span>
        </div>
        <p className="text-zinc-500 text-xs mb-6">{pkg.duration} estimated time</p>

        {/* Divider */}
        <div className="border-t border-zinc-800 mb-6" />

        {/* Features */}
        <ul className="space-y-3 mb-8 flex-1">
          {pkg.includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check
                className={cn('w-4 h-4 flex-shrink-0 mt-0.5', pkg.highlighted ? 'text-cyan-400' : 'text-zinc-400')}
              />
              <span className="text-sm text-zinc-300">{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/booking"
          className={cn(
            'w-full text-center font-semibold py-3 rounded-xl transition-all duration-200 text-sm',
            pkg.highlighted
              ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-glow hover:shadow-cyan-glow-lg'
              : 'border border-zinc-700 hover:border-cyan-500/50 text-zinc-300 hover:text-white hover:bg-zinc-800/50'
          )}
        >
          {pkg.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
