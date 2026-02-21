import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ContractorService } from '@/lib/types';

interface ServiceCardProps {
  service: ContractorService;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block bg-white border border-gray-200 rounded-xl p-6 hover:border-navy-950/20 hover:shadow-card-hover transition-all duration-300"
    >
      {/* Icon */}
      <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center mb-4', service.accentColor)}>
        <ServiceIcon name={service.icon} className="w-6 h-6" />
      </div>

      {/* Title */}
      <h3 className="font-bold text-navy-950 text-lg mb-2 group-hover:text-amber-600 transition-colors">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {service.shortDescription}
      </p>

      {/* Emergency badge */}
      {service.emergencyAvailable && (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full mb-4">
          <Zap className="w-3 h-3" />
          24/7 Emergency
        </span>
      )}

      {/* CTA */}
      <div className="flex items-center gap-1 text-sm font-semibold text-navy-950 group-hover:text-amber-600 transition-colors">
        Learn more
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const iconMap: Record<string, React.FC<{ className?: string }>> = {
    flame: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3z" />
      </svg>
    ),
    wind: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M17.7 7.7a2.5 2.5 0 111.8 4.3H2" />
        <path d="M9.6 4.6A2 2 0 1111 8H2" />
        <path d="M12.6 19.4A2 2 0 1114 16H2" />
      </svg>
    ),
    droplets: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
        <path d="M12.56 6.6A10.97 10.97 0 0014 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 01-11.91 4.97" />
      </svg>
    ),
    thermometer: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" />
      </svg>
    ),
    shield: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    wrench: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  };

  const Icon = iconMap[name];
  return Icon ? <Icon className={className} /> : null;
}
