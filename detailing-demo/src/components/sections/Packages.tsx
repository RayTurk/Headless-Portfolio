import Image from 'next/image';
import { packages } from '@/lib/data';
import Link from 'next/link';
import { Check } from 'lucide-react';

// Gradient palettes for each package image header
const packageImageStyles = [
  // Express — cool silver/steel
  'from-zinc-600/20 via-zinc-800 to-zinc-950',
  // Signature — warm amber accent (most popular)
  'from-amber-800/20 via-zinc-900 to-zinc-950',
  // Elite — deep dramatic
  'from-zinc-700/15 via-zinc-800/60 to-black',
];

export default function Packages() {
  return (
    <section className="py-16 lg:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-amber-400" />
            <p className="text-amber-400 text-xs font-semibold tracking-[0.22em] uppercase">Packages</p>
            <div className="w-8 h-px bg-amber-400" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
            Choose your level
            <br />
            <span className="text-zinc-500 font-light italic">of clean.</span>
          </h2>
          <p className="text-zinc-500 max-w-lg mx-auto text-sm leading-relaxed">
            All packages include a satisfaction guarantee. Not sure which to book? Call us — we&apos;ll
            recommend based on your car&apos;s condition.
          </p>
        </div>

        {/* Package cards */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {packages.map((pkg, i) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl overflow-hidden flex flex-col ${
                pkg.highlighted
                  ? 'ring-1 ring-amber-400/50 shadow-amber-glow'
                  : 'border border-zinc-900'
              }`}
            >
              {/* Image header */}
              <div className="relative h-44 overflow-hidden flex-shrink-0">
                <Image
                  src={`/images/package-${pkg.name.toLowerCase()}.jpg`}
                  fill
                  className="object-cover"
                  alt={`${pkg.name} auto detailing`}
                />

                {/* Overlay — package name */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  {pkg.highlighted && (
                    <span className="inline-flex w-fit bg-amber-500 text-black text-[10px] font-bold px-2.5 py-1 rounded-md mb-2 uppercase tracking-widest">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-white text-2xl font-black leading-none">{pkg.name}</h3>
                  <p className="text-zinc-400 text-xs mt-0.5">{pkg.tagline}</p>
                </div>
              </div>

              {/* Pricing + features */}
              <div className={`flex flex-col flex-1 p-5 lg:p-6 ${pkg.highlighted ? 'bg-zinc-900/80' : 'bg-zinc-950'}`}>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-black text-white">${pkg.price}</span>
                  <span className="text-zinc-600 text-sm">/ detail</span>
                </div>
                <p className="text-zinc-700 text-xs mb-6">{pkg.duration} · standard vehicles</p>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          pkg.highlighted ? 'text-amber-400' : 'text-zinc-600'
                        }`}
                      />
                      <span className="text-zinc-300 text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/booking"
                  className={`w-full text-center py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                    pkg.highlighted
                      ? 'bg-amber-500 hover:bg-amber-400 text-black'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                  }`}
                >
                  {pkg.ctaLabel}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-zinc-800 text-xs mt-8">
          Prices listed for standard-size vehicles. Trucks, SUVs, and large vehicles may vary. Final pricing
          confirmed at drop-off inspection.
        </p>
      </div>
    </section>
  );
}
