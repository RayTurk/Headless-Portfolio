import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, MapPin, Clock } from 'lucide-react';
import { siteConfig } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About',
  description: 'Our story — Clover Garden Centre has been rooted in Hudson, Ohio since 1987. Learn about our family, our plants, and our commitment to the community.',
};

const team = [
  {
    name: 'Ellen Clover-Walsh',
    title: 'Owner & Head Horticulturist',
    bio: 'Third-generation owner and trained horticulturist. Ellen grew up between the greenhouses and has an encyclopedic knowledge of what thrives in Northeast Ohio clay.',
    initials: 'EC',
  },
  {
    name: 'Brendan Walsh',
    title: 'Operations & Trees',
    bio: "Manages tree and shrub inventory, delivery, and nursery operations. If it's larger than a 5-gallon pot, Brendan's the one who moved it.",
    initials: 'BW',
  },
  {
    name: 'Rosa Medina',
    title: 'Houseplant & Indoor Specialist',
    bio: 'Rosa turned our houseplant section into a destination. She curates the collection and leads our monthly indoor plant workshops.',
    initials: 'RM',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen">

      {/* Page hero */}
      <div className="relative py-20 lg:py-28 overflow-hidden bg-white border-b border-stone-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top-right,_rgba(74,122,67,0.06)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-6">
              <Leaf className="w-3.5 h-3.5 text-brand-700" />
              <span className="text-brand-700 text-xs font-semibold tracking-[0.22em] uppercase">Est. 1987</span>
            </div>
            <h1 className="font-display font-bold text-stone-900 text-4xl sm:text-5xl leading-tight mb-5">
              Rooted in what
              <br />
              <em className="text-brand-700 font-normal">we love.</em>
            </h1>
            <p className="text-stone-600 text-lg leading-relaxed">
              Clover Garden Centre has been part of Hudson, Ohio for over 37 years. We started small —
              a single greenhouse, a family, and a genuine love of plants. Today we cover five acres,
              but the spirit hasn&apos;t changed.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-brand-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '1987', label: 'Founded' },
              { value: '5 acres', label: 'Nursery & Greenhouse' },
              { value: '2,000+', label: 'Plant Varieties' },
              { value: '3rd gen', label: 'Family Business' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display font-bold text-3xl text-white mb-1">{stat.value}</p>
                <p className="text-brand-200 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
          <div>
            <h2 className="font-display font-bold text-stone-900 text-3xl mb-5">
              How it started
            </h2>
            <div className="space-y-4 text-stone-600 leading-relaxed text-sm">
              <p>
                In the spring of 1987, Harold and Jean Clover converted a corner of their Hudson property
                into a small plant stand. Harold had spent thirty years growing vegetables; Jean&apos;s
                perennial beds were the talk of the neighborhood. Neighbors kept asking to buy plants.
                So they let them.
              </p>
              <p>
                By 1992, the plant stand had become a proper nursery with two greenhouses and a delivery
                van. Their daughter Ellen grew up pruning, potting, and learning the Latin names of
                everything that came through the door. She took over in 2008, earned her horticulture
                certification, and began expanding the houseplant and perennial collections.
              </p>
              <p>
                Today, Clover covers five acres, employs twelve full-time staff (eight of them trained
                horticulturists), and serves tens of thousands of customers each year. We still grow
                a third of our stock on-site. We still know most of our regulars by name.
              </p>
            </div>
          </div>

          {/* Story image */}
          <div className="mt-10 lg:mt-0">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-stone-200">
              <Image src="/images/about-story.jpg" fill className="object-cover" alt="Clover Garden Centre history" />
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div id="team" className="border-t border-stone-200 py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-600" />
              <p className="text-brand-700 text-xs font-semibold tracking-[0.22em] uppercase">The People</p>
              <div className="w-8 h-px bg-brand-600" />
            </div>
            <h2 className="font-display font-bold text-stone-900 text-3xl sm:text-4xl">
              Meet our team
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-cream rounded-2xl p-6 border border-stone-200">
                <div className="w-14 h-14 rounded-full bg-brand-700 flex items-center justify-center mb-4 text-white font-display font-bold text-lg">
                  {member.initials}
                </div>
                <h3 className="font-display font-semibold text-stone-900 text-lg mb-0.5">{member.name}</h3>
                <p className="text-brand-700 text-xs font-semibold uppercase tracking-wider mb-3">{member.title}</p>
                <p className="text-stone-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visit */}
      <div className="border-t border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h2 className="font-display font-bold text-stone-900 text-3xl mb-5">
                Come visit us
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-brand-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 text-sm">Location</p>
                    <p className="text-stone-500 text-sm">{siteConfig.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-brand-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 text-sm">Hours</p>
                    {siteConfig.hours.map(({ day, hours }) => (
                      <p key={day} className="text-stone-500 text-sm">{day}: {hours}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 text-center lg:text-left">
              <p className="text-stone-600 leading-relaxed mb-6">
                Free parking on-site. We offer local delivery for orders over $75 within 15 miles of Hudson.
                Call or email us to arrange a landscape consultation.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-600 text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-200 text-sm"
              >
                Shop Online
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
