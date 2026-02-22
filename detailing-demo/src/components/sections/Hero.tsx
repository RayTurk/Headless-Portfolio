import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Star } from "lucide-react";
import { siteConfig } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      <div className="min-h-screen lg:grid lg:grid-cols-2">
        {/* ── Left: Editorial content ─────────────────────────────── */}
        <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24 pt-28 pb-16 lg:py-0 relative z-10">
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_60%,_rgba(251,191,36,0.04)_0%,_transparent_60%)] pointer-events-none" />

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-10 relative">
            <div className="w-10 h-px bg-amber-400 flex-shrink-0" />
            <span className="text-amber-400 text-xs font-semibold tracking-[0.25em] uppercase">
              Brooklyn, OH · Since 2016
            </span>
          </div>

          {/* Headline — editorial scale */}
          <h1 className="relative mb-8 leading-none">
            <span className="block text-[clamp(3.5rem,9vw,7rem)] font-black text-white tracking-tight leading-[0.88]">
              Your car
            </span>
            <span className="block text-[clamp(3.5rem,9vw,7rem)] font-black text-white tracking-tight leading-[0.88]">
              deserves
            </span>
            <span className="block text-[clamp(3rem,7.5vw,6rem)] font-light italic text-amber-400 tracking-tight leading-[0.95] mt-1">
              better.
            </span>
          </h1>

          {/* Description */}
          <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-md relative">
            Ceramic coatings, paint correction, and interior restoration — by
            certified technicians who care about your car as much as you do.
          </p>

          {/* Stats row */}
          <div className="flex gap-8 pt-8 mb-12 border-t border-zinc-900 relative">
            {[
              { value: "2,000+", label: "Cars Detailed" },
              { value: "8 yrs", label: "In Business" },
              { value: "100%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-zinc-600 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 relative">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-7 py-4 rounded-xl transition-all duration-200 text-sm"
            >
              Book a Detail
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-2 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-semibold px-7 py-4 rounded-xl transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>

        {/* ── Right: Image panel ───────────────────────────────────── */}
        <div className="relative hidden lg:block">
          <Image
            src="/images/hero-car.jpg"
            fill
            className="object-cover object-center"
            alt="Freshly ceramic-coated car"
            priority
          />

          {/* Bleed gradient into left column */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />

          {/* Floating review card */}
          <div className="absolute bottom-12 left-10 z-20 bg-black/85 backdrop-blur-md border border-zinc-800/80 rounded-2xl px-5 py-4 max-w-[260px]">
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3 text-amber-400 fill-amber-400"
                />
              ))}
              <span className="text-zinc-600 text-xs ml-1">5.0</span>
            </div>
            <p className="text-white text-sm font-semibold leading-snug mb-2">
              "Looks better than the day I picked it up from the dealer."
            </p>
            <p className="text-zinc-500 text-xs">Derek M. — 2021 BMW M4</p>
          </div>

          {/* Amber accent stripe at base */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent z-20" />
        </div>
      </div>
    </section>
  );
}
