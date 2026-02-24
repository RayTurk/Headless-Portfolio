'use client';

import { useState } from 'react';
import { Leaf, ArrowRight } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section id="newsletter" className="py-16 lg:py-20 bg-brand-50 border-y border-brand-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <div className="flex items-center justify-center gap-2 mb-5">
          <Leaf className="w-4 h-4 text-brand-600" />
          <span className="text-brand-700 text-xs font-semibold tracking-[0.22em] uppercase">
            The Garden Club
          </span>
        </div>

        <h2 className="font-display font-bold text-stone-900 text-3xl sm:text-4xl leading-tight mb-4">
          Stay in season.
        </h2>

        <p className="text-stone-600 leading-relaxed mb-8 max-w-md mx-auto">
          Monthly planting guides, new arrival alerts, and exclusive discounts for subscribers.
          No fluff — just what&apos;s growing.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-3 bg-brand-700 text-white px-8 py-4 rounded-full">
            <Leaf className="w-5 h-5" />
            <span className="font-semibold">You&apos;re in! Welcome to the club.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-3.5 rounded-full border border-stone-300 bg-white text-stone-800 placeholder:text-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-brand-700 hover:bg-brand-600 text-white font-semibold px-6 py-3.5 rounded-full transition-all duration-200 text-sm flex-shrink-0"
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-stone-400 text-xs mt-4">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
