import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PricingTier } from '@/lib/types';
import Button from './Button';

interface PricingCardProps {
  tier: PricingTier;
  annual: boolean;
  className?: string;
}

export default function PricingCard({ tier, annual, className }: PricingCardProps) {
  const price = annual ? tier.annualPrice : tier.monthlyPrice;
  const isFree = price === null;

  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border transition-all duration-300',
        tier.highlighted
          ? 'bg-indigo-950/40 border-indigo-500/60 shadow-glow-brand'
          : 'bg-slate-900 border-slate-800 hover:border-slate-700',
        className
      )}
    >
      {tier.highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold bg-indigo-600 text-white shadow">
            Most popular
          </span>
        </div>
      )}

      <div className="p-6 border-b border-slate-800">
        <h3 className="text-lg font-bold text-white mb-1">{tier.name}</h3>
        <p className="text-sm text-slate-400 mb-5">{tier.tagline}</p>

        <div className="flex items-end gap-1 mb-1">
          {isFree ? (
            <span className="text-4xl font-bold text-white">Free</span>
          ) : (
            <>
              <span className="text-4xl font-bold text-white">${price}</span>
              <span className="text-slate-400 mb-1.5">/mo</span>
            </>
          )}
        </div>

        {!isFree && annual && (
          <p className="text-xs text-emerald-400 mb-5">
            Billed annually — save ~20%
          </p>
        )}
        {!isFree && !annual && (
          <p className="text-xs text-slate-500 mb-5">
            or ${tier.annualPrice}/mo billed annually
          </p>
        )}
        {isFree && <p className="text-xs text-slate-500 mb-5">No credit card required</p>}

        <Button
          variant={tier.highlighted ? 'primary' : 'secondary'}
          href={tier.ctaHref}
          className="w-full justify-center"
          size="md"
        >
          {tier.ctaLabel}
        </Button>
      </div>

      <div className="p-6 flex-1">
        <ul className="space-y-3">
          {tier.features.map((feature) => (
            <li key={feature.label} className="flex items-start gap-3">
              {feature.included ? (
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              ) : (
                <X className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
              )}
              <span
                className={cn(
                  'text-sm',
                  feature.included ? 'text-slate-300' : 'text-slate-600'
                )}
              >
                {feature.label}
                {feature.note && (
                  <span className="text-slate-500 text-xs ml-1">({feature.note})</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
