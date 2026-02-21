import type { Metadata } from 'next';
import { teamMembers } from '@/lib/data';
import CtaBanner from '@/components/sections/CtaBanner';
import { Radio, Zap, Globe, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Beacon was built by engineers who got paged one too many times after a customer found the outage first.',
};

const values = [
  {
    icon: Zap,
    title: 'Speed over everything',
    description:
      "Every second an outage goes undetected is a second your users are frustrated. We obsess over detection latency so you don't have to.",
  },
  {
    icon: Globe,
    title: 'Global by default',
    description:
      'Regional outages are real. Multi-location checking isn\'t a "Pro" feature — it\'s the baseline. Every plan checks from multiple locations.',
  },
  {
    icon: Heart,
    title: 'Calm alerting',
    description:
      'Alert fatigue is an epidemic. Beacon is designed to page you only when something actually needs your attention — and to stop when it\'s resolved.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-grid-slate opacity-100" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-orange-900/15 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-orange-600/80 flex items-center justify-center shadow-glow-brand">
              <Radio className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            We got paged after the customer did.{' '}
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              Never again.
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Beacon was built out of frustration. Our founders were infrastructure engineers at high-growth startups who kept experiencing the same nightmare: finding out about outages from support tickets, not monitors. We built the tool we wished existed.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-white mb-6">Our story</h2>
            <div className="space-y-5 text-slate-400 leading-relaxed">
              <p>
                In 2021, Jordan and Sam were running infrastructure at a Series B fintech. Their monitoring setup was a patchwork of scripts, cron jobs, and a legacy SaaS product that hadn&rsquo;t been meaningfully updated since 2016. One Friday afternoon, their payments API went down for 23 minutes. They found out because a customer emailed.
              </p>
              <p>
                They evaluated every uptime monitoring tool on the market. Most were either too simple (ping a URL, send an email) or too expensive and complex for a lean engineering team. None of them solved the real problem: knowing immediately, with confidence, from multiple locations, with the right people paged.
              </p>
              <p>
                Beacon launched in 2022. Today, it monitors over 2 million endpoints for 8,000+ engineering teams ranging from solo founders to infrastructure leads at Series C startups.
              </p>
              <p>
                We&rsquo;re a fully remote team of 18 people across 7 countries. We&rsquo;re backed by Sequoia and YC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What we believe</h2>
            <p className="text-slate-400">The principles that guide how we build Beacon.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-orange-950/60 border border-orange-800/40 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">The team</h2>
            <p className="text-slate-400">Engineers building for engineers.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => {
              const initials = member.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase();

              return (
                <div key={member.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center text-white font-bold text-lg mb-4 flex-shrink-0">
                    {initials}
                  </div>
                  <h3 className="font-semibold text-white mb-0.5">{member.name}</h3>
                  <p className="text-sm text-orange-400 mb-3">{member.title}</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{member.bio}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
