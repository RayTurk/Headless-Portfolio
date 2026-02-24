'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  cta: string;
  popular?: boolean;
}

const tiers: PricingTier[] = [
  {
    name: 'Starter',
    price: '$50',
    period: '/mo',
    description: 'Perfect for small business sites that just need the basics covered each month.',
    features: [
      { text: '1 WordPress site', included: true },
      { text: 'Monthly core & plugin updates', included: true },
      { text: 'Security monitoring', included: true },
      { text: 'Daily backups', included: true },
      { text: 'Email support', included: true },
      { text: 'Uptime monitoring', included: true },
      { text: 'Performance monitoring', included: false },
      { text: 'Monthly reports', included: false },
      { text: 'Custom development hours', included: false },
    ],
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    price: '$120',
    period: '/mo',
    description: 'Complete care for growing businesses that depend on their web presence.',
    features: [
      { text: 'Up to 3 WordPress sites', included: true },
      { text: 'Weekly core & plugin updates', included: true },
      { text: 'Security + malware scanning', included: true },
      { text: 'Daily backups with 30-day retention', included: true },
      { text: 'Priority email & chat support', included: true },
      { text: 'Uptime monitoring (5-min intervals)', included: true },
      { text: 'Performance monitoring & optimization', included: true },
      { text: 'Monthly performance reports', included: true },
      { text: 'Custom development hours', included: false },
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$250',
    period: '/mo',
    description: 'White-glove service for businesses that need everything handled.',
    features: [
      { text: 'Unlimited WordPress sites', included: true },
      { text: 'Real-time updates & patching', included: true },
      { text: 'Advanced security suite + WAF', included: true },
      { text: 'Hourly backups with 90-day retention', included: true },
      { text: '24/7 phone & priority support', included: true },
      { text: 'Uptime monitoring (1-min intervals)', included: true },
      { text: 'Performance optimization & CDN', included: true },
      { text: 'Weekly detailed reports', included: true },
      { text: '2 hrs/mo custom development', included: true },
    ],
    cta: 'Contact Us',
  },
];

export default function PricingTiers() {
  const { ref, controls } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
    >
      {tiers.map((tier) => (
        <motion.div
          key={tier.name}
          variants={staggerItem}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          className={cn(
            'relative rounded-2xl border p-8 flex flex-col',
            tier.popular
              ? 'border-brand-500 bg-surface-800/80 shadow-glow scale-[1.02] z-10'
              : 'border-surface-700 bg-surface-900/60'
          )}
        >
          {tier.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-brand-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                Most Popular
              </span>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-surface-50 mb-2">{tier.name}</h3>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-4xl font-bold text-surface-50">{tier.price}</span>
              <span className="text-surface-400">{tier.period}</span>
            </div>
            <p className="text-surface-400 text-sm leading-relaxed">{tier.description}</p>
          </div>

          <ul className="space-y-3 mb-8 flex-1">
            {tier.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                {feature.included ? (
                  <svg className="w-5 h-5 text-steel-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-surface-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                <span className={cn('text-sm', feature.included ? 'text-surface-300' : 'text-surface-600')}>
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="/contact"
            className={cn(
              'block text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300',
              tier.popular
                ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-glow hover:shadow-glow-lg'
                : 'bg-surface-800 hover:bg-surface-700 text-surface-200 border border-surface-600 hover:border-surface-500'
            )}
          >
            {tier.cta}
          </a>
        </motion.div>
      ))}
    </motion.div>
  );
}
