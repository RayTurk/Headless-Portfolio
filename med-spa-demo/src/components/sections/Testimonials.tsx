import { testimonials } from '@/lib/data';

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-blush-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-white/40" />
            <span className="text-xs tracking-[0.25em] uppercase text-white/70 font-sans">Client Stories</span>
            <div className="w-8 h-px bg-white/40" />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-light text-white leading-tight">
            Real patients.<br />
            <em className="not-italic font-light opacity-80">Real results.</em>
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-7">
              {/* Quote mark */}
              <div className="font-display text-5xl font-light text-white/30 leading-none mb-4">&ldquo;</div>
              <p className="font-display text-lg font-light text-white leading-relaxed mb-6">
                {t.quote}
              </p>
              <div className="border-t border-white/20 pt-5">
                <p className="font-sans font-medium text-white text-sm">{t.name}</p>
                <p className="font-sans text-xs text-white/60 mt-0.5">{t.location} &middot; {t.treatment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
