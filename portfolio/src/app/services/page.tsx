import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import { generateFAQSchema, generateServiceSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import PricingTiers from '@/components/sections/PricingTiers';
import FAQ from '@/components/sections/FAQ';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = generatePageMetadata({
  title: 'WordPress Maintenance & Development Services',
  description:
    'Professional WordPress maintenance, hosting, updates, security, and custom development services. Keep your site secure, fast, and up-to-date with ongoing care plans starting at $149/mo.',
  path: '/services',
});

const additionalServices = [
  {
    title: 'Custom WordPress Development',
    description: 'Bespoke themes, plugins, and functionality tailored to your exact needs. From simple customizations to complex web applications.',
    icon: '🔧',
  },
  {
    title: 'Headless WordPress & Next.js',
    description: 'Modern, blazing-fast websites using WordPress as a headless CMS paired with React and Next.js frontends.',
    icon: '⚡',
  },
  {
    title: 'E-Commerce Solutions',
    description: 'WooCommerce setup, customization, and ongoing management to help you sell online effectively.',
    icon: '🛒',
  },
  {
    title: 'Site Migration',
    description: 'Seamless migration from any platform to WordPress, or between hosting providers, with zero downtime.',
    icon: '🚀',
  },
  {
    title: 'SEO & Performance',
    description: 'Technical SEO audits, Core Web Vitals optimization, and speed improvements to help you rank higher.',
    icon: '📈',
  },
  {
    title: 'Security Hardening',
    description: 'Comprehensive security audits, malware removal, firewall configuration, and ongoing protection.',
    icon: '🛡️',
  },
];

const faqItems = [
  {
    question: 'What does WordPress maintenance include?',
    answer:
      'Our WordPress maintenance covers core updates, plugin and theme updates, daily backups, security monitoring, uptime monitoring, and performance checks. We proactively keep your site running smoothly so you can focus on your business.',
  },
  {
    question: 'How often will my site be updated?',
    answer:
      'Update frequency depends on your plan. Basic plans receive monthly updates, Pro plans get weekly updates, and Enterprise plans receive real-time patching. All updates are tested before going live.',
  },
  {
    question: 'What happens if my site goes down?',
    answer:
      'We monitor your site around the clock. If it goes down, we are alerted immediately and begin diagnosing the issue. Pro and Enterprise plans include priority response times. We maintain daily backups for quick restoration.',
  },
  {
    question: 'Can you migrate my existing site?',
    answer:
      'Absolutely. We handle full WordPress migrations including content, databases, themes, plugins, and DNS. Everything is tested in staging before switching, ensuring zero downtime.',
  },
  {
    question: 'Do you offer one-time services?',
    answer:
      'Yes, we offer one-time site audits, performance optimization, security hardening, and custom development. We also recommend ongoing plans for continuous protection and updates.',
  },
  {
    question: 'What is your typical response time?',
    answer:
      'Basic plans: 24 business hours. Pro plans: 4-hour priority response. Enterprise: 24/7 phone support with 1-hour response for critical issues.',
  },
];

export default function ServicesPage() {
  const schemas = [
    generateServiceSchema({
      name: 'WordPress Maintenance Plans',
      description: 'Ongoing WordPress maintenance, security, and support plans starting at $149/month.',
      url: `${SITE_URL}/services`,
      price: '149',
    }),
    generateFAQSchema(faqItems),
  ];

  return (
    <>
      <JsonLd data={schemas} />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <RevealOnScroll preset="fade-up">
            <span className="inline-block text-brand-400 font-semibold tracking-wider uppercase text-sm mb-4">
              Services
            </span>
          </RevealOnScroll>
          <RevealOnScroll preset="fade-up" delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold text-surface-50 mb-6">
              Keeping the Web Running,{' '}
              <span className="gradient-text">One Site at a Time</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll preset="fade-up" delay={0.2}>
            <p className="text-lg md:text-xl text-surface-400 max-w-2xl mx-auto leading-relaxed">
              From ongoing maintenance to custom builds, I provide the reliable WordPress
              services your business needs to thrive online.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll preset="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-50 mb-4">
              WordPress Maintenance Plans
            </h2>
            <p className="text-surface-400 max-w-2xl mx-auto">
              Your website is a living asset. Keep it secure, fast, and up-to-date with a maintenance plan that fits your needs.
            </p>
          </RevealOnScroll>
          <PricingTiers />
          <p className="text-center text-surface-500 text-sm mt-8">
            All plans include a free initial site audit. Custom plans available for unique requirements.
          </p>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 px-6 bg-surface-900/40">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll preset="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-50 mb-4">
              Additional Services
            </h2>
            <p className="text-surface-400 max-w-2xl mx-auto">
              Beyond maintenance, I offer a full range of WordPress and web development services.
            </p>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <RevealOnScroll key={service.title} preset="fade-up" delay={index * 0.1}>
                <div className="rounded-xl border border-surface-700 bg-surface-800/50 p-6 h-full hover:border-brand-500/30 transition-colors duration-300">
                  <span className="text-3xl mb-4 block">{service.icon}</span>
                  <h3 className="text-xl font-semibold text-surface-50 mb-3">{service.title}</h3>
                  <p className="text-surface-400 text-sm leading-relaxed">{service.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll preset="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-50 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-surface-400">
              Everything you need to know about our WordPress services.
            </p>
          </RevealOnScroll>
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <RevealOnScroll preset="scale">
            <div className="rounded-2xl border border-brand-500/30 bg-gradient-to-br from-brand-950/50 to-surface-900 p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-surface-50 mb-4">
                Get Your Free Site Audit
              </h2>
              <p className="text-surface-400 mb-8 max-w-xl mx-auto">
                Not sure what your site needs? I will run a comprehensive audit covering security,
                performance, SEO, and more — completely free, no strings attached.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-glow hover:shadow-glow-lg"
              >
                Request Free Audit
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
