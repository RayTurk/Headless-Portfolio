import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/data';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-end pb-16 lg:pb-24 overflow-hidden">
      {/*
        📸 IMAGE SLOT — Hero (full-screen)
        Replace placeholder div with:
          <Image
            src="/images/hero-dining.jpg"
            fill
            className="object-cover object-center"
            alt="Ember & Oak dining room"
            priority
          />
        Recommended: 1920×1080px or 2:1 ratio
        Subject: dim-lit dining room, fire/hearth, or atmospheric plated dish on dark table
      */}
      <div className="absolute inset-0 bg-ember-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_rgba(201,168,76,0.06)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-ember-700">
            <div className="text-8xl mb-4 opacity-30">📸</div>
            <p className="text-sm font-mono opacity-40">/images/hero-dining.jpg</p>
            <p className="text-xs opacity-30 mt-1 font-sans">Full-screen dining room or hearth</p>
          </div>
        </div>
      </div>

      {/* Gradient overlay — bottom heavy for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-ember-950 via-ember-950/70 to-ember-950/20 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-px bg-gold-500" />
            <span className="text-xs tracking-[0.3em] uppercase text-gold-500 font-sans">
              {siteConfig.city}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display leading-none mb-6">
            <span className="block text-[clamp(3.5rem,8vw,7rem)] font-bold text-cream tracking-tight leading-[0.9]">
              Wood-fired.
            </span>
            <em className="block text-[clamp(3.5rem,8vw,7rem)] font-light italic text-gold-400 tracking-tight leading-[0.9]">
              Honest.
            </em>
          </h1>

          <p className="text-base lg:text-lg text-stone font-sans leading-relaxed mb-10 max-w-md">
            Ember &amp; Oak is built around the fire — dry-aged beef, wood-smoked duck, hand-cut pasta. No foam, no theater. Just exceptional ingredients treated with respect.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/reservations"
              className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-ember-950 font-sans font-semibold text-sm px-7 py-4 rounded-full transition-all duration-200"
            >
              Reserve a Table
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 border border-ember-600 hover:border-cream/30 text-stone hover:text-cream font-sans text-sm px-7 py-4 rounded-full transition-all duration-200"
            >
              View the Menu
            </Link>
          </div>
        </div>
      </div>

      {/* Hours strip */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-ember-700/50 bg-ember-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <span className="text-xs tracking-wider uppercase text-stone font-sans">Dinner: Tue–Sat 5pm</span>
          <span className="text-ember-700 hidden sm:block">·</span>
          <span className="text-xs tracking-wider uppercase text-stone font-sans">Brunch: Sun 10am</span>
          <span className="text-ember-700 hidden sm:block">·</span>
          <a href={`tel:${siteConfig.phone}`} className="text-xs tracking-wider uppercase text-gold-500 hover:text-gold-400 transition-colors font-sans">
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
