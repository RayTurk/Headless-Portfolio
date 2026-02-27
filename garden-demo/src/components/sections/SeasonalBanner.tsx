import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf } from 'lucide-react';

export default function SeasonalBanner() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/seasonal-spring.jpg"
        fill
        className="object-cover object-center"
        alt="Spring garden in bloom"
      />
      <div className="absolute inset-0 bg-brand-900/60" />

      {/* Decorative botanical lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">

          {/* Left: copy */}
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <Leaf className="w-4 h-4 text-brand-300" />
              <span className="text-brand-300 text-xs font-semibold tracking-[0.25em] uppercase">
                Now in Season
              </span>
            </div>

            <h2 className="font-display font-bold text-white text-4xl sm:text-5xl leading-[0.92] mb-6">
              Spring
              <br />
              <em className="font-normal text-brand-300">perennials</em>
              <br />
              have arrived.
            </h2>

            <p className="text-brand-100 text-lg leading-relaxed mb-8 max-w-md">
              Fresh from our growers — lavender, peonies, coneflowers, and over 60 varieties ready
              to plant now. Updated weekly while supplies last.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/shop?category=perennials"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-cream text-brand-800 font-semibold px-7 py-3.5 rounded-full transition-all duration-200 text-sm"
              >
                Shop Spring Arrivals
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 border border-brand-500/50 hover:border-brand-300 text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-200 text-sm"
              >
                See All Perennials
              </Link>
            </div>
          </div>

          {/* Right: feature grid */}
          <div className="hidden lg:grid grid-cols-2 gap-4 mt-10 lg:mt-0">
            {[
              { name: 'Lavender', desc: 'From $12.99', slug: 'lavender' },
              { name: 'Peonies', desc: 'From $18.99', slug: 'peonies' },
              { name: 'Coneflower', desc: 'From $10.99', slug: 'coneflower' },
              { name: 'Black-Eyed Susan', desc: 'From $9.99', slug: 'black-eyed-susan' },
            ].map((item) => (
              <div
                key={item.name}
                className="relative aspect-square rounded-xl overflow-hidden border border-white/10"
              >
                <Image src={`/images/seasonal-${item.slug}.jpg`} fill className="object-cover" alt={item.name} />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
                  <p className="text-white font-semibold text-sm">{item.name}</p>
                  <p className="text-white/60 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
