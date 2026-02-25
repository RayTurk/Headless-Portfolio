import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { menuSections } from '@/lib/data';

const preview = menuSections.slice(0, 2); // Starters + Mains only

export default function MenuPreview() {
  return (
    <section className="py-20 lg:py-28 bg-ember-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-px bg-gold-500" />
              <span className="text-xs tracking-[0.25em] uppercase text-gold-500 font-sans">Seasonally Driven</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-cream leading-tight">
              A taste of<br />
              <em className="font-light italic text-gold-400">the menu</em>
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold-500/40 hover:border-gold-500 text-gold-400 hover:text-gold-300 text-sm font-sans tracking-wide transition-all whitespace-nowrap"
          >
            Full menu
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Two-column sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {preview.map((section) => (
            <div key={section.id}>
              <h3 className="font-display text-2xl font-medium text-gold-400 mb-6 pb-4 border-b border-ember-700/50">
                {section.label}
              </h3>
              <ul className="space-y-5">
                {section.items.map((item) => (
                  <li key={item.name} className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-sans font-medium text-cream">{item.name}</span>
                        {item.note && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full border border-gold-500/30 text-gold-500 font-sans">
                            {item.note}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone font-sans mt-1 leading-relaxed">{item.description}</p>
                    </div>
                    <span className="font-display text-base text-gold-400 flex-shrink-0 mt-0.5">${item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs text-ember-600 font-sans italic">
          Menu changes seasonally. Dietary accommodations available — please inform your server of any allergies.
        </p>
      </div>
    </section>
  );
}
