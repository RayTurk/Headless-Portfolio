import type { Metadata } from 'next';
import { CheckCircle, Award, Users, Star } from 'lucide-react';
import { teamMembers, certifications, stats, siteConfig } from '@/lib/data';
import ContactCTA from '@/components/sections/ContactCTA';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Summit HVAC & Plumbing has been serving Greater Cleveland since 2002. Learn about our story, team, and commitment to honest, expert service.',
};

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-navy-950 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-2">
            Our Story
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">About Summit</h1>
          <p className="text-navy-300 text-lg max-w-2xl">
            Family-owned and operated since 2002. We built Summit on one principle: do the job right, treat people honestly, and the rest takes care of itself.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy-950 mb-6">
                22 Years Serving Northeast Ohio
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Summit HVAC & Plumbing was founded in 2002 by Mike Donovan after nearly a decade as a field technician. Mike had seen firsthand how homeowners were often overcharged, given unnecessary repairs, and left with confusing invoices they couldn't understand.
                </p>
                <p>
                  He started Summit with a simple promise: written flat-rate quotes before any work begins, honest recommendations, and technicians who take the time to explain what they're doing and why.
                </p>
                <p>
                  Twenty-two years and 14,000+ service calls later, that promise still drives everything we do. We're still locally owned, still answering our own phones, and still sending the same quality technicians we'd trust in our own homes.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-amber-500 mb-2">{stat.value}</div>
                  <div className="font-semibold text-navy-950 text-sm mb-1">{stat.label}</div>
                  {stat.description && (
                    <div className="text-gray-500 text-xs">{stat.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-amber-100 rounded-full mb-3">
              <Users className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="text-3xl font-bold text-navy-950 mb-3">Meet the Team</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              NATE-certified technicians, licensed plumbers, and a support team that genuinely cares about getting your problem solved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl p-6 shadow-card">
                {/* Avatar placeholder */}
                <div className="w-14 h-14 bg-navy-950 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <h3 className="font-bold text-navy-950 text-lg">{member.name}</h3>
                <p className="text-amber-600 font-medium text-sm mb-3">{member.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {member.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="text-xs font-medium bg-navy-50 text-navy-950 px-2.5 py-1 rounded-full border border-navy-100"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-amber-100 rounded-full mb-3">
              <Award className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="text-3xl font-bold text-navy-950 mb-3">Credentials & Certifications</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              We hold every certification required by the State of Ohio and industry best practices.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="bg-gray-50 rounded-xl p-5 text-center border border-gray-200"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 bg-amber-100 rounded-full mb-3">
                  <CheckCircle className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-semibold text-navy-950 text-sm mb-1">{cert.name}</h3>
                <p className="text-gray-500 text-xs">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust commitment */}
      <section className="py-14 lg:py-20 bg-navy-950 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500 rounded-full mb-5">
            <Star className="w-6 h-6 text-white fill-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Our Promise to You</h2>
          <p className="text-navy-300 leading-relaxed text-lg mb-8">
            We will never recommend a repair or replacement you don't need. We will never start work without a written quote you've approved. And if our work ever fails, we'll make it right — no questions asked.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-lg transition-colors text-lg"
          >
            Schedule Service
          </Link>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
