import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { treatments } from '@/lib/data';

const featured = treatments.slice(0, 4);

export default function TreatmentsStrip() {
  return (
    <section className="py-20 lg:py-28 bg-parchment-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-gold-400" />
              <span className="text-xs tracking-[0.25em] uppercase text-drift font-sans">Our Services</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-light text-bark leading-tight">
              Treatments crafted<br />
              <em className="text-blush-500 not-italic">for your goals</em>
            </h2>
          </div>
          <Link
            href="/treatments"
            className="inline-flex items-center gap-2 text-sm text-blush-500 hover:text-blush-600 font-sans tracking-wide whitespace-nowrap"
          >
            View all treatments
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Treatment cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((t) => (
            <Link
              key={t.id}
              href="/treatments"
              className="group flex flex-col rounded-2xl overflow-hidden bg-parchment-100 hover:shadow-card-hover border border-parchment-200 hover:border-blush-300 transition-all duration-300"
            >
              {/* Image slot */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={t.image}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={t.name}
                />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <span className="text-[10px] tracking-[0.2em] uppercase text-blush-500 font-sans mb-1">{t.category}</span>
                <h3 className="font-display text-xl font-medium text-bark mb-1 group-hover:text-blush-500 transition-colors">
                  {t.name}
                </h3>
                <p className="text-sm text-drift leading-relaxed mb-4 flex-1 font-sans">{t.tagline}</p>
                <div className="flex items-center justify-between pt-4 border-t border-parchment-200">
                  <span className="text-xs font-sans text-drift">{t.duration}</span>
                  <span className="text-sm font-medium text-bark font-sans">from ${t.startingAt}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
