import Image from 'next/image';
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
    <section className="relative bg-navy-950 text-white overflow-hidden min-h-[560px] lg:min-h-0">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative lg:grid lg:grid-cols-2 min-h-[560px] lg:min-h-screen max-h-[860px]">
        {/* ── Left: Content ── */}
        <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24 py-20 lg:py-0 relative z-10">
          {/* Amber accent blob (left side only) */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none lg:hidden" />

          {/* Emergency badge */}
          <div className="inline-flex items-center gap-2 bg-red-600 text-white text-sm font-semibold px-3 py-1.5 rounded-full mb-6 animate-pulse-slow w-fit">
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
          <p className="text-lg text-navy-200 leading-relaxed mb-8 max-w-lg">
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

        {/* ── Right: Photo panel ── */}
        <div className="relative hidden lg:block">
          <Image
            src="/images/hero-team.jpg"
            fill
            className="object-cover object-center"
            alt="Summit HVAC & Plumbing technician"
            priority
          />

          {/* Bleed gradient into left column */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-navy-950 to-transparent z-10" />

          {/* Amber accent stripe */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent z-10" />
        </div>
      </div>
    </section>
  );
}
