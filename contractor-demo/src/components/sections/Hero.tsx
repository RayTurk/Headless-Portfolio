import Link from 'next/link';
import { Phone, Zap, ShieldCheck, Star, Clock } from 'lucide-react';
import { siteConfig } from '@/lib/data';

const trustBadges = [
  { icon: ShieldCheck, text: 'Licensed & Insured' },
  { icon: Star, text: '4.9★ Google Rated' },
  { icon: Clock, text: '22 Years in Business' },
];

export default function Hero() {
  return (
    <section className="relative bg-navy-950 text-white overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Amber accent blob */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-2xl">
          {/* Emergency badge */}
          <div className="inline-flex items-center gap-2 bg-red-600 text-white text-sm font-semibold px-3 py-1.5 rounded-full mb-6 animate-pulse-slow">
            <Zap className="w-3.5 h-3.5" />
            24/7 Emergency Service Available
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
            Greater Cleveland's{' '}
            <span className="text-amber-400">Trusted HVAC</span>
            {' & Plumbing '}
            <span className="text-amber-400">Experts</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-navy-200 leading-relaxed mb-8">
            Heating, cooling, plumbing, and water heaters — we fix it right the first time. Serving Lake and Geauga counties for over 22 years. Licensed, insured, and available around the clock.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold text-lg px-8 py-4 rounded-lg transition-colors shadow-amber-glow"
            >
              <Phone className="w-5 h-5" />
              {siteConfig.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-base px-8 py-4 rounded-lg transition-colors backdrop-blur-sm"
            >
              Request Free Quote
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-5">
            {trustBadges.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-navy-200 text-sm">
                <Icon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
