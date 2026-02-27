import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[620px] max-h-[900px] overflow-hidden -mt-16 lg:-mt-20">
      <Image
        src="/images/hero-garden.jpg"
        fill
        className="object-cover object-center"
        alt="Clover Garden Centre in full bloom"
        priority
      />

      {/* Cream gradient fade — bottom 55% for text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-cream via-cream/85 to-transparent" />
      {/* Left fade for wider screens */}
      <div className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-cream/80 to-transparent hidden lg:block" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end pb-14 lg:pb-20 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="max-w-xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-6">
            <Leaf className="w-3.5 h-3.5 text-brand-700" />
            <span className="text-brand-700 text-xs font-semibold tracking-[0.25em] uppercase">
              Hudson, Ohio · Est. 1987
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-stone-900 leading-[0.92] tracking-tight mb-6">
            <span className="block text-[clamp(3.2rem,8vw,6rem)]">Grow something</span>
            <em className="block text-[clamp(3.2rem,8vw,6rem)] text-brand-700 not-italic font-normal">
              beautiful.
            </em>
          </h1>

          <p className="text-stone-600 text-lg leading-relaxed mb-8 max-w-md">
            Hudson&apos;s full-service nursery for seasonal plants, garden supplies, and the expert
            advice that makes everything grow.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-brand-700 hover:bg-brand-600 text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-200 text-sm"
            >
              Shop All Plants
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 border border-stone-400 hover:border-brand-700 text-stone-700 hover:text-brand-700 font-semibold px-7 py-3.5 rounded-full transition-all duration-200 text-sm bg-white/40 backdrop-blur-sm"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-brand-700/90 backdrop-blur-sm text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium">
          <span className="flex items-center gap-1.5"><Leaf className="w-3 h-3" /> Expert Staff On-Site Daily</span>
          <span className="flex items-center gap-1.5"><Leaf className="w-3 h-3" /> Free Local Delivery Over $75</span>
          <span className="flex items-center gap-1.5"><Leaf className="w-3 h-3" /> Satisfaction Guaranteed</span>
          <span className="flex items-center gap-1.5"><Leaf className="w-3 h-3" /> New Arrivals Every Week</span>
        </div>
      </div>
    </section>
  );
}
