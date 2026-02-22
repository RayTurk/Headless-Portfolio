import { testimonials } from '@/lib/data';

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [featured, ...supporting] = testimonials;

  return (
    <section className="py-16 lg:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-px bg-amber-400" />
          <p className="text-amber-400 text-xs font-semibold tracking-[0.22em] uppercase">Reviews</p>
        </div>

        {/* ── Featured pull-quote ───────────────────────────────── */}
        <div className="mb-16 lg:mb-20">
          {/*
            📸 IMAGE SLOT — Testimonial background (optional)
            Wrap this section in a relative div with a background image for a
            dramatic quote-over-image effect:
              <div className="relative rounded-3xl overflow-hidden p-10 lg:p-16">
                <Image src="/images/testimonial-bg.jpg" fill className="object-cover opacity-20" alt="" />
                ...
              </div>
          */}
          <div className="max-w-4xl">
            {/* Giant amber opening quote mark */}
            <div
              className="text-[7rem] lg:text-[9rem] font-black leading-none mb-2 select-none"
              style={{ color: 'rgba(251,191,36,0.25)' }}
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-snug -mt-8 lg:-mt-12 mb-10">
              {featured.quote}
            </blockquote>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-white font-bold">{featured.name}</p>
                <p className="text-zinc-500 text-sm mt-0.5">
                  {featured.vehicle} · {featured.serviceReceived}
                </p>
              </div>
              <StarRow count={featured.rating} />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-900 mb-12" />

        {/* ── Supporting testimonials ───────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-5">
          {supporting.map((t) => (
            <div
              key={t.id}
              className="flex gap-5 p-5 lg:p-6 bg-zinc-950 rounded-xl border border-zinc-900 hover:border-zinc-800 transition-colors"
            >
              {/* Amber left bar */}
              <div className="flex-shrink-0 w-0.5 bg-amber-400/25 rounded-full" />

              <div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-zinc-600 text-xs mt-0.5">{t.vehicle}</p>
                  </div>
                  <StarRow count={t.rating} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google rating bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 pt-10 border-t border-zinc-900">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-zinc-500 text-sm">
            <span className="text-white font-semibold">4.9</span> out of 5 &mdash; 200+ verified Google reviews
          </p>
        </div>

      </div>
    </section>
  );
}
