import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { siteConfig } from '@/lib/data';

export default function BookingCTA() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-zinc-950">
      {/* Glow layer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.1)_0%,_transparent_65%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-4">
          Ready to Book?
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
          Give your car the detail
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
            it actually deserves.
          </span>
        </h2>
        <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
          Online booking is open 24/7. Prefer to talk? Call us and we&apos;ll get you scheduled in minutes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/booking"
            className="inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-cyan-glow hover:shadow-cyan-glow-lg text-base"
          >
            Book Online
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center justify-center gap-2 border border-zinc-700 hover:border-cyan-500/50 text-zinc-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-base"
          >
            <Phone className="w-5 h-5" />
            {siteConfig.phoneDisplay}
          </a>
        </div>

        {/* Trust signals */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500">
          <span>✓ 100% satisfaction guarantee</span>
          <span>✓ Ceramic-certified technicians</span>
          <span>✓ Serving Greater Cleveland since 2016</span>
        </div>
      </div>
    </section>
  );
}
