import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Award, ShieldCheck, Users } from 'lucide-react';
import { siteConfig, teamMembers } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Revive Auto Detailing — our story, team, and ceramic certifications. Serving Greater Cleveland since 2016.',
};

export default function AboutPage() {
  return (
    <div className="bg-black min-h-screen">
      {/* Page hero */}
      <div className="relative py-20 border-b border-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top-right,_rgba(251,191,36,0.05)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-amber-400" />
              <p className="text-amber-400 text-xs font-semibold tracking-[0.22em] uppercase">Our Story</p>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-6">
              We do this because we love cars.
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Revive started in Marcus Webb&apos;s garage in 2016 — evenings and weekends spent detailing
              friends&apos; cars for the love of it. What started as a hobby became a calling. Eight years
              later, we&apos;ve detailed over 2,000 vehicles and built a team of technicians who share the
              same obsession with getting it right.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '2016', label: 'Founded' },
              { value: '2,000+', label: 'Cars Detailed' },
              { value: '3', label: 'Certified Technicians' },
              { value: '100%', label: 'Satisfaction Rate' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-black text-amber-400 mb-1">{stat.value}</p>
                <p className="text-zinc-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black text-white mb-5">Why Revive?</h2>
            <div className="space-y-5 text-zinc-400 leading-relaxed text-sm">
              <p>
                Drive-through car washes leave micro-scratches in your paint every single time. Automated
                equipment can&apos;t reach door jambs, intricate wheels, or the crevices that trap road
                grime. They push dirt across your paint with recirculated water. It&apos;s not a detail
                — it&apos;s damage.
              </p>
              <p>
                At Revive, every vehicle is hand-washed with fresh, clean water and proper microfiber
                technique. Every wheel is cleaned individually. Every door jamb gets attention. We treat
                every car like it&apos;s going to a show — because to the owner, it matters.
              </p>
              <p>
                Our detailers are trained and certified through the International Detailing Association and
                leading product manufacturers like CARPRO and Gyeon. We don&apos;t guess at products or
                processes — we invest in education and the right tools.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="space-y-4">
            {[
              {
                icon: ShieldCheck,
                title: 'Ceramic-Certified',
                description:
                  'Every ceramic coating installation is performed by IDA-certified technicians trained in nano-ceramic chemistry and application.',
              },
              {
                icon: Award,
                title: 'Honest Pricing',
                description:
                  'We quote before we start. If we discover additional work needed during an inspection, we call you first — always.',
              },
              {
                icon: Users,
                title: 'Relationship-Focused',
                description:
                  'Most of our customers are repeat clients. We keep detailed notes on your vehicle so every visit builds on the last.',
              },
            ].map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex gap-4 bg-zinc-950 border border-zinc-900 rounded-2xl p-5 hover:border-zinc-800 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">{title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="border-t border-zinc-900 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-amber-400" />
              <p className="text-amber-400 text-xs font-semibold tracking-[0.22em] uppercase">The Team</p>
              <div className="w-8 h-px bg-amber-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Meet the people behind the polish
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 hover:border-zinc-800 transition-all duration-300"
              >
                {/* Avatar placeholder */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-zinc-800 flex items-center justify-center mb-4 text-xl font-black text-amber-400">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>

                <h3 className="text-white font-bold text-lg mb-0.5">{member.name}</h3>
                <p className="text-amber-400 text-xs font-semibold mb-4">{member.title}</p>

                <p className="text-zinc-500 text-sm leading-relaxed mb-5">{member.bio}</p>

                <div className="flex flex-wrap gap-1.5">
                  {member.certifications.map((cert) => (
                    <div
                      key={cert}
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-full px-2.5 py-1"
                    >
                      <Award className="w-3 h-3 text-amber-400" />
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service area */}
      <div className="border-t border-zinc-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-white mb-2">We come to you</h2>
            <p className="text-zinc-500 text-sm">
              Mobile detailing available throughout Greater Cleveland. Drop-off also welcome at our
              Brooklyn, OH shop.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {siteConfig.serviceAreas.map((area) => (
              <span
                key={area}
                className="text-sm text-zinc-400 bg-zinc-950 border border-zinc-900 rounded-full px-4 py-1.5"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-zinc-900 py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h3 className="text-2xl font-black text-white mb-3">Let&apos;s detail your car.</h3>
          <p className="text-zinc-500 mb-6">
            Book online or call us. Either way, you&apos;re in good hands.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-7 py-3.5 rounded-xl transition-all duration-200"
          >
            Book an Appointment
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
