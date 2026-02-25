import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { treatments } from '@/lib/data';
import BookingCTA from '@/components/sections/BookingCTA';

export const metadata: Metadata = {
  title: 'Treatments',
  description:
    'Browse all med spa treatments at Luminary Aesthetics — injectables, laser, microneedling, facials, and more. Chagrin Falls, OH.',
};

const categories = ['Injectables', 'Skin Resurfacing', 'Laser Treatments', 'Facials'] as const;

export default function TreatmentsPage() {
  return (
    <>
      {/* Page header */}
      <section className="pt-16 pb-14 bg-parchment-100 border-b border-parchment-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold-400" />
            <span className="text-xs tracking-[0.25em] uppercase text-drift font-sans">Menu</span>
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-light text-bark mb-4">
            Our <em className="text-blush-500 not-italic">Treatments</em>
          </h1>
          <p className="text-base text-drift font-sans max-w-xl leading-relaxed">
            Every treatment at Luminary begins with a consultation. Below is our full menu — pricing shown is starting rate and varies by treatment plan.
          </p>
        </div>
      </section>

      {/* Treatments by category */}
      {categories.map((cat) => {
        const catTreatments = treatments.filter((t) => t.category === cat);
        if (catTreatments.length === 0) return null;
        return (
          <section key={cat} className="py-14 lg:py-20 border-b border-parchment-200 last:border-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-3xl font-light text-bark mb-8">{cat}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {catTreatments.map((t) => (
                  <div key={t.id} className="group flex flex-col rounded-2xl overflow-hidden border border-parchment-200 bg-parchment-50 hover:shadow-card transition-all duration-300">
                    {/* Image slot */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      {/*
                        📸 IMAGE SLOT — Treatment detail photo
                        Path: {t.image} (e.g. /images/treatment-botox.jpg)
                        Replace placeholder div with:
                          <Image
                            src={t.image}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            alt={t.name}
                          />
                        Recommended: 800×450px — treatment process or result
                      */}
                      <div className="absolute inset-0 bg-parchment-200 flex items-center justify-center">
                        <div className="text-center text-parchment-400">
                          <div className="text-3xl mb-1 opacity-50">📸</div>
                          <p className="text-[10px] font-mono opacity-50">{t.image}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-display text-xl font-medium text-bark mb-1">{t.name}</h3>
                      <p className="text-sm text-blush-500 font-sans mb-3 italic font-light">{t.tagline}</p>
                      <p className="text-sm text-drift font-sans leading-relaxed mb-5 flex-1">{t.description}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-parchment-200">
                        <span className="flex items-center gap-1.5 text-xs text-drift font-sans">
                          <Clock className="w-3.5 h-3.5" /> {t.duration}
                        </span>
                        <span className="text-sm font-medium text-bark font-sans">from ${t.startingAt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <BookingCTA />
    </>
  );
}
