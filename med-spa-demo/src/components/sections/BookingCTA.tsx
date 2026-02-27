import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Phone, Clock, MapPin } from 'lucide-react';
import { siteConfig } from '@/lib/data';

export default function BookingCTA() {
  return (
    <section className="py-20 lg:py-28 bg-parchment-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-5 shadow-card">
          {/* Left: CTA content */}
          <div className="lg:col-span-3 bg-bark p-10 lg:p-14 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-gold-400" />
              <span className="text-xs tracking-[0.25em] uppercase text-parchment-300 font-sans">Begin Your Journey</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-light text-parchment-50 leading-tight mb-6">
              Your consultation<br />
              <em className="text-blush-400 not-italic">awaits</em>
            </h2>
            <p className="text-base text-parchment-300 font-sans leading-relaxed mb-10 max-w-md">
              All new patients begin with a 30-minute consultation — complimentary, no obligation. We&rsquo;ll discuss your goals, assess your anatomy, and design a plan that&rsquo;s uniquely yours.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 bg-blush-500 hover:bg-blush-400 text-white font-sans font-medium text-sm px-7 py-4 rounded-full transition-all duration-200"
              >
                Book Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 border border-parchment-400/30 hover:border-parchment-300/60 text-parchment-200 font-sans text-sm px-7 py-4 rounded-full transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                {siteConfig.phoneDisplay}
              </a>
            </div>

            <div className="flex flex-wrap gap-6 pt-8 border-t border-parchment-400/20">
              <div className="flex items-center gap-2 text-xs text-parchment-400 font-sans">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                {siteConfig.hours}
              </div>
              <div className="flex items-center gap-2 text-xs text-parchment-400 font-sans">
                <MapPin className="w-3.5 h-3.5 text-gold-400" />
                {siteConfig.city}
              </div>
            </div>
          </div>

          {/* Right: Studio photo */}
          <div className="lg:col-span-2 relative min-h-[300px]">
            <Image
              src="/images/studio-interior.jpg"
              fill
              className="object-cover object-center"
              alt="Luminary Aesthetics reception"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
