import {
  Timer,
  Bell,
  Globe,
  LayoutDashboard,
  ShieldCheck,
  FileChartLine,
  Code2,
  CalendarClock,
  TrendingUp,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Feature } from '@/lib/types';

const iconMap: Record<string, LucideIcon> = {
  timer: Timer,
  bell: Bell,
  globe: Globe,
  'layout-dashboard': LayoutDashboard,
  'shield-check': ShieldCheck,
  'file-chart-line': FileChartLine,
  'code-2': Code2,
  'calendar-clock': CalendarClock,
  'trending-up': TrendingUp,
};

const categoryColors: Record<string, string> = {
  monitoring: 'text-orange-400 bg-orange-950/60',
  alerting: 'text-amber-400 bg-amber-950/60',
  reporting: 'text-emerald-400 bg-emerald-950/40',
  infrastructure: 'text-sky-400 bg-sky-950/40',
};

interface FeatureCardProps {
  feature: Feature;
  className?: string;
}

export default function FeatureCard({ feature, className }: FeatureCardProps) {
  const Icon = iconMap[feature.icon] ?? ShieldCheck;
  const colorClasses = categoryColors[feature.category] ?? 'text-orange-400 bg-orange-950/60';

  return (
    <div
      className={cn(
        'group p-6 rounded-2xl bg-slate-900 border border-slate-800',
        'hover:border-slate-700 hover:shadow-card-dark-hover transition-all duration-300',
        className
      )}
    >
      <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center mb-4', colorClasses)}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="font-semibold text-white mb-2 group-hover:text-orange-300 transition-colors">
        {feature.title}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
    </div>
  );
}
