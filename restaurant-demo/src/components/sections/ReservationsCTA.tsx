import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Phone, Clock, MapPin } from 'lucide-react';
import { siteConfig } from '@/lib/data';

export default function ReservationsCTA() {
  return (
    <section className="py-20 lg:py-28 bg-ember-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-5 border border-ember-700/50">
          {/* Left: ambient photo */}
          <div className="relative lg:col-span-2 min-h-[280px]">
            {/*
              📸 IMAGE SLOT — Reservations ambient
              Replace placeholder div with:
                <Image
                  src="/images/dining-ambient.jpg"
                  fill
                  className="object-cover object-center"
                  alt="Ember & Oak dining atmosphere"
                />
              Recommended: 600×700px — candle-lit table, bar, or intimate corner setting
            */}
            <div className="absolute inset-0 bg-ember-800 flex items-center justify-center">
              <div className="text-center text-ember-600">
                <div className="text-4xl mb-2 opacity-40">📸</div>
                <p className="text-xs font-mono opacity-40">/images/dining-ambient.jpg</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ember-900/40 lg:block hidden" />
          </div>

          {/* Right: content */}
          <div className="lg:col-span-3 bg-ember-900 p-10 lg:p-14 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-px bg-gold-500" />
              <span className="text-xs tracking-[0.25em] uppercase text-gold-500 font-sans">Reservations</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-cream leading-tight mb-5">
              Join us for<br />
              <em className="font-light italic text-gold-400">dinner</em>
            </h2>
            <p className="text-base text-stone font-sans leading-relaxed mb-8 max-w-md">
              We recommend reservations, especially for weekends. Walk-ins welcome at the bar. Private dining available for groups of 10 or more.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/reservations"
                className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-ember-950 font-sans font-semibold text-sm px-7 py-4 rounded-full transition-all duration-200"
              >
                Reserve Online
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 border border-ember-600 hover:border-cream/30 text-stone hover:text-cream font-sans text-sm px-7 py-4 rounded-full transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                {siteConfig.phoneDisplay}
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-ember-700/50">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-3.5 h-3.5 text-gold-500" />
                  <span className="text-xs tracking-wider uppercase text-gold-500 font-sans">Hours</span>
                </div>
                <p className="text-xs text-stone font-sans">{siteConfig.hours.dinnerWeekday}</p>
                <p className="text-xs text-stone font-sans">{siteConfig.hours.dinnerWeekend}</p>
                <p className="text-xs text-stone font-sans">{siteConfig.hours.brunch}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-gold-500" />
                  <span className="text-xs tracking-wider uppercase text-gold-500 font-sans">Location</span>
                </div>
                <p className="text-xs text-stone font-sans">{siteConfig.address}</p>
                <p className="text-xs text-stone font-sans">{siteConfig.city}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
