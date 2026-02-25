import type { Metadata } from 'next';
import { menuSections } from '@/lib/data';
import ReservationsCTA from '@/components/sections/ReservationsCTA';

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'The Ember & Oak menu — wood-fired starters, signature mains, sides, and desserts. Seasonal and locally sourced. Cleveland, OH.',
};

export default function MenuPage() {
  return (
    <>
      {/* Page header */}
      <section className="pt-16 pb-14 bg-ember-900 border-b border-ember-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-px bg-gold-500" />
            <span className="text-xs tracking-[0.25em] uppercase text-gold-500 font-sans">Seasonally Driven</span>
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-cream mb-4">
            The <em className="font-light italic text-gold-400">Menu</em>
          </h1>
          <p className="text-sm text-stone font-sans max-w-xl leading-relaxed">
            Our menu reflects what&rsquo;s best right now — sourced from regional farms and our relationships with local producers. Menu changes seasonally.
          </p>
        </div>
      </section>

      {/* Menu sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl space-y-16">
          {menuSections.map((section) => (
            <div key={section.id}>
              <h2 className="font-display text-3xl font-medium text-gold-400 mb-8 pb-5 border-b border-ember-700/50">
                {section.label}
              </h2>
              <ul className="space-y-7">
                {section.items.map((item) => (
                  <li key={item.name} className="flex justify-between items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-sans font-semibold text-cream text-base">{item.name}</span>
                        {item.note && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full border border-gold-500/30 text-gold-500 font-sans">
                            {item.note}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-stone font-sans leading-relaxed">{item.description}</p>
                    </div>
                    <span className="font-display text-lg text-gold-400 flex-shrink-0 mt-0.5">${item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 text-xs text-ember-600 font-sans italic max-w-xl">
          Consuming raw or undercooked meats, poultry, seafood, shellfish, or eggs may increase your risk of foodborne illness. Please inform your server of any allergies or dietary restrictions.
        </p>
      </div>

      <ReservationsCTA />
    </>
  );
}
