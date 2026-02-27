import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { featuredDishes } from '@/lib/data';

export default function FeaturedDishes() {
  return (
    <section className="py-20 lg:py-28 bg-ember-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-px bg-gold-500" />
              <span className="text-xs tracking-[0.25em] uppercase text-gold-500 font-sans">From the Fire</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-cream leading-tight">
              What we&rsquo;re<br />
              <em className="font-light italic text-gold-400">known for</em>
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm text-gold-500 hover:text-gold-400 font-sans tracking-wide whitespace-nowrap"
          >
            Full menu
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dish cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredDishes.map((dish) => (
            <div key={dish.id} className="group relative rounded-2xl overflow-hidden bg-ember-900 border border-ember-700/50 hover:border-gold-500/30 transition-all duration-300">
              {/* Image slot */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={dish.image}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  alt={dish.name}
                />

                {/* Tag */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-gold-500/90 text-ember-950 text-xs font-semibold font-sans">
                  {dish.tag}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-cream mb-2 group-hover:text-gold-300 transition-colors">
                  {dish.name}
                </h3>
                <p className="text-sm text-stone font-sans leading-relaxed mb-4">{dish.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-ember-700/50">
                  <span className="font-display text-lg text-gold-400">${dish.price}</span>
                  <Link href="/menu" className="text-xs text-stone hover:text-cream font-sans tracking-wider uppercase transition-colors">
                    See full menu
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
