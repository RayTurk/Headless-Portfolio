import Image from 'next/image';
import { services } from '@/lib/data';
import { Droplets, Sparkles, Layers, ShieldCheck, Zap, Wrench } from 'lucide-react';
import Link from 'next/link';
import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

type LucideIcon = ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;

const iconMap: Record<string, LucideIcon> = {
  droplets: Droplets,
  sparkles: Sparkles,
  layers: Layers,
  'shield-check': ShieldCheck,
  zap: Zap,
  wrench: Wrench,
};

export default function ServicesStrip() {
  // Ceramic (id:4) and Paint Correction (id:3) are the two premium featured services
  const featured = [
    services.find((s) => s.id === '4')!, // Ceramic Coating
    services.find((s) => s.id === '3')!, // Paint Correction
  ];
  const supporting = services.filter((s) => s.id !== '4' && s.id !== '3');

  return (
    <section className="py-16 lg:py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header — left-aligned, editorial */}
        <div className="lg:flex lg:items-end lg:justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-amber-400" />
              <p className="text-amber-400 text-xs font-semibold tracking-[0.22em] uppercase">What We Do</p>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              Every service,
              <br />
              <span className="text-zinc-500 font-light italic">done obsessively well.</span>
            </h2>
          </div>
          <p className="hidden lg:block text-zinc-500 text-sm leading-relaxed max-w-xs mt-4 lg:mt-0">
            From a weekly maintenance wash to a full ceramic coating install — the same precision, every time.
          </p>
        </div>

        {/* Featured services — large image cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {featured.map((service, i) => {
            const Icon = iconMap[service.icon] ?? ShieldCheck;
            return (
              <Link
                key={service.id}
                href="/services"
                className="group relative overflow-hidden rounded-2xl h-72 sm:h-80 flex flex-col justify-end p-6 lg:p-8"
              >
                <Image
                  src={`/images/service-${service.slug}.jpg`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={service.title}
                />
                {/* Text readability overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

                {/* Hover: top accent line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Content */}
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 ${service.accentColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-zinc-500 text-xs tracking-wider uppercase mb-1">Featured</p>
                      <h3 className="text-white text-xl font-bold leading-tight">{service.title}</h3>
                      <p className="text-zinc-400 text-sm mt-1 line-clamp-2 max-w-xs">
                        {service.shortDescription}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-amber-400 font-bold text-xl">{service.startingPrice}</p>
                      <p className="text-zinc-600 text-xs">starting at</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Supporting services — compact tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {supporting.map((service) => {
            const Icon = iconMap[service.icon] ?? Droplets;
            return (
              <div
                key={service.id}
                className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700 transition-colors group"
              >
                <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg mb-4 ${service.accentColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-amber-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-zinc-600 text-xs leading-relaxed line-clamp-2">
                  {service.shortDescription}
                </p>
                <p className="text-amber-400/80 text-xs font-semibold mt-3">{service.startingPrice}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
