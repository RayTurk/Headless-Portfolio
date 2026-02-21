import { CheckCircle } from 'lucide-react';
import { stats } from '@/lib/data';

const differentiators = [
  {
    title: 'Flat-Rate Pricing',
    description:
      'You get a written quote before we start — the price never changes once you approve it. No overtime charges, no hidden fees.',
  },
  {
    title: 'NATE-Certified Technicians',
    description:
      "Our techs hold the industry's highest certification. They diagnose problems correctly the first time, saving you money.",
  },
  {
    title: 'Same-Day Service',
    description:
      'Most calls are serviced the same day. Emergency calls are prioritized — we aim for 90-minute response for urgent issues.',
  },
  {
    title: '1-Year Labor Warranty',
    description:
      'All repair work is backed by a full 1-year parts and labor warranty. If it breaks again, we fix it free.',
  },
];

export default function WhyUs() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Stats */}
          <div>
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-wider mb-2">
              By the Numbers
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-950 mb-8">
              22 Years Building Trust in Northeast Ohio
            </h2>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-gray-50 rounded-xl p-5">
                  <div className="text-3xl font-bold text-amber-500 mb-1">{stat.value}</div>
                  <div className="font-semibold text-navy-950 text-sm mb-1">{stat.label}</div>
                  {stat.description && (
                    <div className="text-gray-500 text-xs">{stat.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Differentiators */}
          <div>
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-wider mb-2">
              Why Choose Summit
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-950 mb-8">
              The Summit Difference
            </h2>

            <ul className="space-y-6">
              {differentiators.map((item) => (
                <li key={item.title} className="flex gap-4">
                  <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-navy-950 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
