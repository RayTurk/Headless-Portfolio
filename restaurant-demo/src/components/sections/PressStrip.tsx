import { pressQuotes } from '@/lib/data';

export default function PressStrip() {
  return (
    <section className="py-16 bg-ember-900 border-y border-ember-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="w-10 h-px bg-gold-500" />
          <span className="text-xs tracking-[0.25em] uppercase text-gold-500 font-sans">As Seen In</span>
          <div className="w-10 h-px bg-gold-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pressQuotes.map((q) => (
            <div key={q.source} className="rounded-xl bg-ember-950/60 border border-ember-700/50 p-6">
              <div className="font-display text-3xl text-gold-500/30 leading-none mb-3">&ldquo;</div>
              <p className="font-display text-base italic font-light text-stone leading-relaxed mb-5">{q.quote}</p>
              <div className="h-px bg-ember-700/50 mb-4" />
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-wider uppercase text-gold-500 font-sans">{q.source}</span>
                <span className="text-xs text-ember-600 font-sans">{q.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
