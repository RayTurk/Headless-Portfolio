import Link from 'next/link';
import { ArrowRight, Phone, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/lib/data';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-zinc-950">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(6,182,212,0.08)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom-right,_rgba(6,182,212,0.05)_0%,_transparent_50%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 mb-8">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-xs font-semibold tracking-wide">
                Ceramic-Certified Technicians
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
              <span className="text-white">Your car</span>
              <br />
              <span className="text-white">deserves</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                better.
              </span>
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-lg">
              Premium auto detailing in Brooklyn, OH. Ceramic coatings, paint correction, interior restoration — done by certified technicians who care as much about your car as you do.
            </p>

            {/* Trust stats */}
            <div className="flex flex-wrap gap-6 mb-10">
              {[
                { value: '2,000+', label: 'Cars Detailed' },
                { value: '8 Yrs', label: 'Experience' },
                { value: '100%', label: 'Satisfaction Guaranteed' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-zinc-500 text-xs">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-7 py-4 rounded-xl transition-all duration-200 shadow-cyan-glow hover:shadow-cyan-glow-lg"
              >
                Book Online
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 border border-zinc-700 hover:border-cyan-500/50 text-zinc-300 hover:text-white font-semibold px-7 py-4 rounded-xl transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Right: Before/After CSS card */}
          <div className="flex justify-center lg:justify-end">
            <BeforeAfterCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfterCard() {
  return (
    <div className="relative w-full max-w-md">
      {/* Outer glow */}
      <div className="absolute -inset-4 bg-cyan-500/10 rounded-3xl blur-2xl" />

      {/* Card */}
      <div className="relative rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl">
        <div className="flex h-72 sm:h-80">
          {/* BEFORE panel */}
          <div className="relative flex-1 bg-zinc-800 flex flex-col items-center justify-end pb-6 overflow-hidden">
            {/* Noise/grain overlay */}
            <div className="absolute inset-0 opacity-20 bg-noise" />
            {/* Muted scratchy lines */}
            <div className="absolute inset-0">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute h-px bg-zinc-600/40"
                  style={{
                    width: `${40 + Math.random() * 40}%`,
                    top: `${15 + i * 12}%`,
                    left: `${Math.random() * 20}%`,
                    transform: `rotate(${-2 + Math.random() * 4}deg)`,
                  }}
                />
              ))}
            </div>
            {/* Desaturated car silhouette hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <div className="w-32 h-10 bg-zinc-500 rounded-full" />
              <div className="absolute bottom-8 w-40 h-5 bg-zinc-600 rounded-full" />
            </div>
            <span className="relative z-10 text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
              Before
            </span>
          </div>

          {/* Center divider */}
          <div className="relative w-px bg-zinc-600 flex items-center justify-center z-20">
            <div className="absolute w-8 h-8 rounded-full bg-zinc-900 border border-zinc-600 flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 16 16" className="w-4 h-4 text-zinc-400 fill-current">
                <path d="M5 4l-3 4 3 4M11 4l3 4-3 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* AFTER panel */}
          <div className="relative flex-1 bg-cyan-950/40 flex flex-col items-center justify-end pb-6 overflow-hidden">
            {/* Cyan glow gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/5 to-cyan-400/10" />
            {/* Shine effect */}
            <div className="absolute top-4 left-4 right-10 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            <div className="absolute top-8 left-8 right-6 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
            {/* Glowing car hint */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-10 bg-cyan-400/10 rounded-full blur-sm" />
              <div className="absolute bottom-8 w-40 h-5 bg-cyan-400/15 rounded-full blur-sm" />
            </div>
            <span className="relative z-10 text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase">
              After
            </span>
          </div>
        </div>

        {/* Bottom info bar */}
        <div className="bg-zinc-900/90 border-t border-zinc-700/50 px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-white text-sm font-semibold">Paint Correction + Ceramic</p>
            <p className="text-zinc-500 text-xs">Elite Package — 8 hrs</p>
          </div>
          <span className="text-cyan-400 text-sm font-bold">$699</span>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -bottom-4 -right-4 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-white text-xs font-bold">100% Satisfaction</p>
        <p className="text-zinc-500 text-xs">Guaranteed</p>
      </div>
    </div>
  );
}
