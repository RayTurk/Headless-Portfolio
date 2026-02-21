'use client';

import { useState } from 'react';
import { pricingTiers } from '@/lib/data';
import PricingCard from '@/components/ui/PricingCard';
import CtaBanner from '@/components/sections/CtaBanner';
import { cn } from '@/lib/utils';
import { HelpCircle, ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Do I need a credit card to start?',
    a: "No. The Starter plan is free forever with no credit card required. You only need payment info when you upgrade to Pro or Business.",
  },
  {
    q: 'What happens if I exceed my monitor limit?',
    a: "We'll notify you before you hit your limit. You can upgrade at any time, or archive old monitors to stay within your plan.",
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel from your account settings at any time. Annual plans are refunded pro-rata for unused months.',
  },
  {
    q: 'What does the 30-second check interval mean?',
    a: "Beacon pings your endpoint from multiple global locations every 30 seconds. You're alerted the moment two consecutive checks fail — keeping false positives to a minimum.",
  },
  {
    q: 'Do you offer a trial of Pro or Business?',
    a: "Yes — both paid plans come with a 14-day free trial. No credit card required to start.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-800 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        aria-expanded={open}
      >
        <span className="font-medium text-white">{q}</span>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-slate-400 flex-shrink-0 transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-sm text-slate-400 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      {/* Page header */}
      <section className="pt-32 pb-16 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate opacity-100" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-orange-900/15 blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-400 mb-3">
            Pricing
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-slate-400 mb-8">
            Start free. Upgrade as you scale. No per-seat pricing, no surprise bills.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-4">
            <span className={cn('text-sm font-medium', !annual ? 'text-white' : 'text-slate-400')}>
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className={cn(
                'relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-950',
                annual ? 'bg-orange-600' : 'bg-slate-700'
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
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-16">
            {pricingTiers.map((tier) => (
              <PricingCard key={tier.id} tier={tier} annual={annual} />
            ))}
          </div>

          {/* Feature comparison note */}
          <div className="text-center">
            <p className="text-sm text-slate-500">
              All plans include SSL monitoring, public status pages, and 24/7 email support.
              <br />
              Need a custom plan?{' '}
              <a href="/contact" className="text-orange-400 hover:text-orange-300 transition-colors">
                Talk to us
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <HelpCircle className="w-5 h-5 text-orange-400" />
            <h2 className="text-2xl font-bold text-white">Frequently asked questions</h2>
          </div>

          <div>
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
