'use client';

import { useState } from 'react';
import { pricingTiers } from '@/lib/data';
import PricingCard from '@/components/ui/PricingCard';
import { cn } from '@/lib/utils';

interface PricingSectionProps {
  showToggle?: boolean;
}

export default function PricingSection({ showToggle = true }: PricingSectionProps) {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400 mb-3">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8">
            Start free, upgrade as you grow. No hidden fees, no per-seat pricing nightmares.
          </p>

          {/* Billing toggle */}
          {showToggle && (
            <div className="inline-flex items-center gap-4">
              <span className={cn('text-sm font-medium', !annual ? 'text-white' : 'text-slate-400')}>
                Monthly
              </span>
              <button
                onClick={() => setAnnual(!annual)}
                className={cn(
                  'relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950',
                  annual ? 'bg-indigo-600' : 'bg-slate-700'
                )}
                role="switch"
                aria-checked={annual}
                aria-label="Toggle annual billing"
              >
                <span
                  className={cn(
                    'inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform',
                    annual ? 'translate-x-6' : 'translate-x-1'
                  )}
                />
              </button>
              <span className={cn('text-sm font-medium', annual ? 'text-white' : 'text-slate-400')}>
                Annual
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                  Save 20%
                </span>
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} annual={annual} />
          ))}
        </div>
      </div>
    </section>
  );
}
