import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/data';

export default function Hero() {
  return (
    <section className="relative min-h-[640px] lg:min-h-screen max-h-[900px] lg:grid lg:grid-cols-2 overflow-hidden">
      {/* ── Left: Content ── */}
      <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24 py-20 lg:py-0 bg-parchment-50 relative z-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-gold-400" />
          <span className="text-xs tracking-[0.25em] uppercase text-drift font-sans">
            {siteConfig.city}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display leading-[1.0] tracking-tight mb-6">
          <span className="block text-[clamp(3rem,6vw,5.5rem)] font-light text-bark">
            Refined results.
          </span>
          <em className="block text-[clamp(3rem,6vw,5.5rem)] font-light text-blush-500 not-italic">
            Radiant you.
          </em>
        </h1>

        <p className="text-base lg:text-lg text-drift leading-relaxed mb-10 max-w-md font-sans">
          Board-certified practitioners delivering medical-grade injectables, advanced laser treatments, and transformative skincare — in a serene Chagrin Falls studio.
        </p>

        {/* Trust line */}
        <div className="flex flex-wrap gap-5 mb-10">
          {['Board-Certified MD', 'Allergan Diamond Provider', 'Natural Results'].map((badge) => (
            <span key={badge} className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-drift font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0" />
              {badge}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/booking"
            className="inline-flex items-center justify-center gap-2 bg-blush-500 hover:bg-blush-600 text-white font-sans font-medium text-sm px-7 py-4 rounded-full transition-all duration-200 tracking-wide"
          >
            Book a Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/treatments"
            className="inline-flex items-center justify-center gap-2 border border-parchment-300 hover:border-blush-400 text-bark hover:text-blush-500 font-sans text-sm px-7 py-4 rounded-full transition-all duration-200"
          >
            View Treatments
          </Link>
        </div>
      </div>

      {/* ── Right: Photo panel ── */}
      <div className="relative hidden lg:block">
        <Image
          src="/images/hero-studio.jpg"
          fill
          className="object-cover object-center"
          alt="Luminary Aesthetics treatment suite"
          priority
        />

        {/* Subtle gradient bleed into left panel */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-parchment-50 to-transparent z-10" />

        {/* Floating stat card */}
        <div className="absolute bottom-12 left-8 z-20 bg-parchment-50/95 backdrop-blur-sm border border-parchment-200 rounded-2xl px-5 py-4 shadow-card max-w-[220px]">
          <p className="font-display text-3xl font-light text-bark mb-0.5">7+</p>
          <p className="text-xs tracking-wider uppercase text-drift font-sans">Years of practice</p>
          <div className="mt-2 h-px w-10 bg-gold-400" />
          <p className="text-xs text-drift mt-2 font-sans">Board-certified dermatologist &amp; team</p>
        </div>
      </div>
    </section>
  );
}
