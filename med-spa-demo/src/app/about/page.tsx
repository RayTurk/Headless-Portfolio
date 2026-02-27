import type { Metadata } from 'next';
import Image from 'next/image';
import { teamMembers, awards } from '@/lib/data';
import BookingCTA from '@/components/sections/BookingCTA';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet the team at Luminary Aesthetics — board-certified practitioners committed to natural, refined results in Chagrin Falls, OH.',
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-16 pb-14 bg-parchment-100 border-b border-parchment-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold-400" />
            <span className="text-xs tracking-[0.25em] uppercase text-drift font-sans">Our Practice</span>
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-light text-bark mb-4">
            The people behind<br />
            <em className="text-blush-500 not-italic">your results</em>
          </h1>
          <p className="text-base text-drift font-sans max-w-xl leading-relaxed">
            Luminary was founded in 2017 with a belief that aesthetic medicine should feel personal, unhurried, and artful. Our small, tight-knit team reflects that.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28 bg-parchment-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {teamMembers.map((member, i) => (
              <div
                key={member.id}
                className={`grid grid-cols-1 lg:grid-cols-5 gap-10 items-center ${i % 2 === 1 ? 'lg:direction-rtl' : ''}`}
              >
                {/* Photo */}
                <div className={`lg:col-span-2 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-parchment-200">
                    <Image
                      src={member.image}
                      fill
                      className="object-cover object-top"
                      alt={member.name}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-3 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="w-8 h-px bg-gold-400 mb-5" />
                  <h2 className="font-display text-3xl lg:text-4xl font-light text-bark mb-1">{member.name}</h2>
                  <p className="text-sm text-blush-500 font-sans tracking-wider mb-1">{member.title}</p>
                  <p className="text-xs text-drift font-sans tracking-wider uppercase mb-6">{member.credentials}</p>
                  <p className="text-base text-drift font-sans leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards + recognition */}
      <section className="py-14 bg-parchment-100 border-y border-parchment-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-light text-bark mb-8">Recognition &amp; Credentials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {awards.map((award) => (
              <div key={award} className="bg-parchment-50 rounded-xl border border-parchment-200 p-5">
                <div className="w-6 h-px bg-gold-400 mb-4" />
                <p className="text-sm text-bark font-sans leading-snug">{award}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
