import type { Metadata } from 'next';
import { features, integrations } from '@/lib/data';
import FeatureCard from '@/components/ui/FeatureCard';
import CtaBanner from '@/components/sections/CtaBanner';
import type { Feature } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Every feature you need to monitor uptime, track SLAs, alert your team, and keep customers happy.',
};

const categories: { key: Feature['category']; label: string; description: string }[] = [
  {
    key: 'monitoring',
    label: 'Monitoring',
    description: 'Comprehensive checks for every layer of your stack',
  },
  {
    key: 'alerting',
    label: 'Alerting',
    description: 'Get the right person paged at the right time',
  },
  {
    key: 'reporting',
    label: 'Reporting',
    description: 'Visibility and accountability for engineering and stakeholders',
  },
];

export default function FeaturesPage() {
  return (
    <>
      {/* Page header */}
      <section className="pt-32 pb-16 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate opacity-100" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-orange-900/15 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-400 mb-3">
            Full feature breakdown
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Everything your team needs to stay on top of uptime
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            From 30-second HTTP checks to branded status pages and SLA reports — Beacon gives your team the full picture.
          </p>
        </div>
      </section>

      {/* Categorized features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((cat) => {
            const catFeatures = features.filter((f) => f.category === cat.key);
            if (catFeatures.length === 0) return null;

            return (
              <div key={cat.key} className="mb-20 last:mb-0">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">{cat.label}</h2>
                  <p className="text-slate-400">{cat.description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {catFeatures.map((feature) => (
                    <FeatureCard key={feature.id} feature={feature} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="py-20 bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-400 mb-3">
              Integrations
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">Plugs into your existing stack</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Connect Beacon to the tools your team already uses — in minutes, not days.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {integrations.map((integration) => (
              <div
                key={integration.id}
                className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-white">{integration.name}</span>
                  <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">
                    {integration.category}
                  </span>
                </div>
                <p className="text-sm text-slate-400">{integration.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
