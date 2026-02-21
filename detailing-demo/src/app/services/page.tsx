import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Droplets, Sparkles, Layers, ShieldCheck, Zap, Wrench } from 'lucide-react';
import { services } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Full breakdown of Revive Auto Detailing services — exterior wash, interior deep clean, paint correction, ceramic coating, headlight restoration, and engine bay detailing.',
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  droplets: Droplets,
  sparkles: Sparkles,
  layers: Layers,
  'shield-check': ShieldCheck,
  zap: Zap,
  wrench: Wrench,
};

export default function ServicesPage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      {/* Page hero */}
      <div className="relative py-20 border-b border-zinc-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top-left,_rgba(6,182,212,0.06)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-4">
            Full Service Menu
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Every service we offer
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Each service is available as a standalone booking or as part of a package. All pricing shown is starting price for standard-size vehicles.
          </p>
        </div>
      </div>

      {/* Service detail cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-10">
        {services.map((service, idx) => {
          const Icon = iconMap[service.icon] ?? Sparkles;
          const isEven = idx % 2 === 0;

          return (
            <div
              key={service.id}
              id={service.slug}
              className="scroll-mt-24 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300"
            >
              <div className={`grid lg:grid-cols-2 ${isEven ? '' : 'lg:direction-rtl'}`}>
                {/* Info */}
                <div className="p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${service.accentColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-xl">{service.title}</h2>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-cyan-400 text-sm font-semibold">
                          From {service.startingPrice}
                        </span>
                        <span className="text-zinc-500 text-xs">&bull;</span>
                        <span className="text-zinc-500 text-xs">{service.duration}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-zinc-300 leading-relaxed mb-6">{service.fullDescription}</p>

                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200"
                  >
                    Book This Service
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Features */}
                <div className="border-t lg:border-t-0 lg:border-l border-zinc-800 bg-zinc-900/50 p-8 lg:p-10">
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
                    What&apos;s Included
                  </h3>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="text-zinc-300 text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-zinc-800 py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-white mb-3">Ready to get started?</h3>
          <p className="text-zinc-400 mb-6">
            Book online in under 2 minutes or call us to talk through which service is right for your car.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-cyan-glow"
          >
            Book an Appointment
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
