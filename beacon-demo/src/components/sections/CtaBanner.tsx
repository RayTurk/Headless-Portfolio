import Link from 'next/link';
import { ArrowRight, Radio } from 'lucide-react';

export default function CtaBanner() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-900/60 to-amber-900/40 border border-orange-700/40 p-12 text-center shadow-glow-brand">
          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-orange-600/10 blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-orange-600/80 flex items-center justify-center shadow-glow-brand">
                <Radio className="w-7 h-7 text-white" />
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Start monitoring in 60 seconds
            </h2>
            <p className="text-slate-300 text-lg max-w-xl mx-auto mb-8">
              Add your first monitor free — no credit card required. Upgrade when your team is ready.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-base transition-colors shadow-glow-brand"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold text-base transition-colors"
              >
                Request a demo
              </Link>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              Free plan includes 5 monitors · No credit card · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
