import { features } from '@/lib/data';
import FeatureCard from '@/components/ui/FeatureCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Features() {
  // Show first 6 on homepage
  const displayFeatures = features.slice(0, 6);

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-400 mb-3">
            Everything you need
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Built for engineers, loved by ops teams
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            From a solo founder monitoring five endpoints to a DevOps team with an SLA dashboard — Beacon scales with your stack.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {displayFeatures.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/features"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            See all features
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
