import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { siteConfig } from '@/lib/data';

export default function BookingCTA() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/cta-background.jpg"
        fill
        className="object-cover object-center"
        alt=""
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* Top amber line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-px bg-amber-400" />
          <p className="text-amber-400 text-xs font-semibold tracking-[0.22em] uppercase">Ready to Book?</p>
          <div className="w-8 h-px bg-amber-400" />
        </div>

        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.88] tracking-tight mb-6">
          Give your car
          <br />
          <span className="text-amber-400 font-light italic">the detail</span>
          <br />
          it deserves.
        </h2>

        <p className="text-zinc-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
          Online booking is open 24/7. Prefer to talk? Call us and we&apos;ll get you scheduled in
          minutes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/booking"
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-4 rounded-xl transition-all duration-200 text-sm"
          >
            Book Online
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center justify-center gap-2 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors text-sm"
          >
            <Phone className="w-5 h-5" />
            {siteConfig.phoneDisplay}
          </a>
        </div>

        {/* Trust signals */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-700">
          <span>✓ 100% satisfaction guarantee</span>
          <span>✓ Ceramic-certified technicians</span>
          <span>✓ Serving Greater Cleveland since 2016</span>
        </div>
      </div>
    </section>
  );
}
