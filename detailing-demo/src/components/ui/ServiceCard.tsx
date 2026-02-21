import Link from 'next/link';
import { ArrowRight, Droplets, Sparkles, Layers, ShieldCheck, Zap, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DetailingService } from '@/lib/types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  droplets: Droplets,
  sparkles: Sparkles,
  layers: Layers,
  'shield-check': ShieldCheck,
  zap: Zap,
  wrench: Wrench,
};

interface ServiceCardProps {
  service: DetailingService;
  className?: string;
}

export default function ServiceCard({ service, className }: ServiceCardProps) {
  const Icon = iconMap[service.icon] ?? Sparkles;

  return (
    <div
      className={cn(
        'group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all duration-300 hover:shadow-card-hover flex flex-col',
        className
      )}
    >
      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-4', service.accentColor)}>
        <Icon className="w-5 h-5" />
      </div>

      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
        {service.title}
      </h3>

      <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-1">
        {service.shortDescription}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800">
        <span className="text-sm font-semibold text-cyan-400">
          From {service.startingPrice}
        </span>
        <Link
          href={`/services#${service.slug}`}
          className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors group/link"
        >
          Details
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
