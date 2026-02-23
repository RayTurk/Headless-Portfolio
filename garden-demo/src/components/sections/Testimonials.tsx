import { testimonials } from '@/lib/data';
import { Star } from 'lucide-react';

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [featured, ...supporting] = testimonials;

  return (
    <section className="py-16 lg:py-24 bg-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Label */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-px bg-brand-600" />
          <p className="text-brand-700 text-xs font-semibold tracking-[0.22em] uppercase">
            What Our Customers Grow
          </p>
        </div>

        {/* Featured pull quote */}
        <div className="mb-12 lg:mb-16 max-w-4xl">
          <div
            className="font-display text-[5rem] lg:text-[7rem] text-brand-300 leading-none select-none mb-2"
            aria-hidden="true"
          >
            &ldquo;
          </div>
          <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl text-stone-800 leading-snug -mt-6 lg:-mt-10 mb-8">
            {featured.quote}
          </blockquote>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="font-semibold text-stone-900">{featured.name}</p>
              <p className="text-stone-500 text-sm mt-0.5">
                {featured.location} · {featured.context}
              </p>
            </div>
            <Stars count={featured.rating} />
          </div>
        </div>

        <div className="border-t border-stone-300 mb-10" />

        {/* Supporting testimonials */}
        <div className="grid md:grid-cols-2 gap-6">
          {supporting.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <Stars count={t.rating} />
              <p className="text-stone-600 text-sm leading-relaxed my-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-stone-900 text-sm">{t.name}</p>
                <p className="text-stone-400 text-xs">{t.location} · {t.context}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Google summary */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 pt-10 border-t border-stone-300">
          <Stars count={5} />
          <p className="text-stone-500 text-sm">
            <span className="text-stone-900 font-semibold">4.9</span> out of 5 &mdash; 340+ Google reviews
          </p>
        </div>
      </div>
    </section>
  );
}
