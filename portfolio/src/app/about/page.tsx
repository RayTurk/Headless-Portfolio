import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import { generatePersonSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_URL } from '@/lib/constants';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import CountUp from '@/components/animations/CountUp';
import SkillsVisualization from '@/components/sections/SkillsVisualization';
import Timeline from '@/components/sections/Timeline';

export const metadata: Metadata = generatePageMetadata({
  title: 'About Ray Turk',
  description:
    'Cleveland-based WordPress & Full Stack Developer with years of experience in web maintenance, hosting, custom development, and keeping the web running smoothly.',
  path: '/about',
});

const stats = [
  { number: 4, suffix: '+', label: 'Years in Web Dev' },
  { number: 3, suffix: '', label: 'Agencies & Studios' },
  { number: 10, suffix: '+', label: 'Years in Tech' },
  { number: 50, suffix: '+', label: 'Happy Clients' },
];

const values = [
  {
    title: 'Reliability',
    description: 'Your site is your business. I treat it with the same urgency and care as if it were my own.',
    icon: '🔒',
  },
  {
    title: 'Transparency',
    description: 'No jargon, no hidden fees, no surprises. Clear communication and honest pricing, always.',
    icon: '💎',
  },
  {
    title: 'Prevention First',
    description: 'An ounce of prevention is worth a pound of cure. Proactive maintenance beats reactive firefighting every time.',
    icon: '🛡️',
  },
  {
    title: 'Continuous Learning',
    description: 'The web never stops evolving, and neither do I. Always staying current with the latest tools and best practices.',
    icon: '📚',
  },
];

export default function AboutPage() {
  const schemas = [
    generatePersonSchema(),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'About', url: '/about' },
    ]),
  ];

  return (
    <>
      <JsonLd data={schemas} />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <RevealOnScroll preset="fade-right">
            <div className="aspect-square max-w-md mx-auto md:mx-0 rounded-2xl bg-gradient-to-br from-brand-500/20 to-steel-500/20 border border-surface-700 flex items-center justify-center overflow-hidden">
              {/* Placeholder for photo — replace with next/image */}
              <div className="w-full h-full bg-surface-800 flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll preset="fade-left">
            <span className="inline-block text-brand-400 font-semibold tracking-wider uppercase text-sm mb-4">
              About Me
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-surface-50 mb-6">
              Hey, I&apos;m <span className="gradient-text">Ray Turk</span>
            </h1>
            <div className="space-y-4 text-surface-300 leading-relaxed">
              <p>
                I&apos;m a Greater Cleveland-area WordPress and Full Stack Developer currently working at
                Neon Goldfish Marketing Solutions. I started my tech career in customer service —
                six years as a Service Coordinator at Classic BMW — before making a full leap into
                web development in 2021.
              </p>
              <p>
                That background isn&apos;t a detour; it&apos;s a superpower.{' '}
                <strong className="text-surface-100">I understand clients, not just code.</strong>{' '}
                Since 2021 I&apos;ve worked at three agencies — Company 119, Full Spectrum Marketing,
                and now Neon Goldfish — growing from WordPress theme work into full-stack React and
                Next.js development.
              </p>
              <p>
                I&apos;m a perpetual learner with a degree in Web Design from Lakeland Community College
                and a genuine curiosity that keeps me chasing the next thing: headless CMS, modern
                JavaScript tooling, and websites that are fast, accessible, and built to last.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-surface-900/40 border-y border-surface-800">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <RevealOnScroll key={stat.label} preset="fade-up" delay={i * 0.1}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-surface-50">
                  <CountUp end={stat.number} suffix={stat.suffix} duration={2000} />
                </div>
                <div className="text-surface-400 text-sm mt-1">{stat.label}</div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll preset="fade-up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-50 mb-4">
              Skills & Expertise
            </h2>
            <p className="text-surface-400 max-w-2xl mx-auto">
              From Help Desk to BMW Service Desk to Web Dev — each role added something to the toolkit.
            </p>
          </RevealOnScroll>
          <SkillsVisualization />
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 bg-surface-900/40">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll preset="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-50 mb-4">
              The Journey
            </h2>
            <p className="text-surface-400">
              How I got here and where I&apos;m headed.
            </p>
          </RevealOnScroll>
          <Timeline />
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll preset="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-50 mb-4">
              What I Believe In
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <RevealOnScroll key={value.title} preset="fade-up" delay={i * 0.1}>
                <div className="rounded-xl border border-surface-700 bg-surface-800/50 p-6 h-full hover:border-brand-500/30 transition-colors duration-300">
                  <span className="text-3xl mb-4 block">{value.icon}</span>
                  <h3 className="text-xl font-semibold text-surface-50 mb-2">{value.title}</h3>
                  <p className="text-surface-400 text-sm leading-relaxed">{value.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <RevealOnScroll preset="scale">
            <div className="rounded-2xl border border-brand-500/30 bg-gradient-to-br from-brand-950/50 to-surface-900 p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-surface-50 mb-4">
                Let&apos;s Work Together
              </h2>
              <p className="text-surface-400 mb-8 max-w-xl mx-auto">
                Whether you need someone to keep your site running smoothly or want to build something new,
                I&apos;d love to hear from you.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-glow hover:shadow-glow-lg"
              >
                Get in Touch
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
