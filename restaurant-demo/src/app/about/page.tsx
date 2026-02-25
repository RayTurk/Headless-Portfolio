import type { Metadata } from 'next';
import Image from 'next/image';
import { pressQuotes } from '@/lib/data';
import ReservationsCTA from '@/components/sections/ReservationsCTA';

export const metadata: Metadata = {
  title: 'About',
  description:
    'The story of Ember & Oak — a wood-fired restaurant in Cleveland, Ohio built by Chef Marcus Webb after a decade cooking in Chicago, Lyon, and San Sebastián.',
};

const team = [
  { name: 'Marcus Webb', title: 'Executive Chef & Owner', image: '/images/team-marcus.jpg', bio: 'After stages in Lyon and San Sebastián, Marcus returned to Cleveland to open the restaurant he always wanted to eat at. The menu is his obsession.' },
  { name: 'Dana Reyes', title: 'General Manager', image: '/images/team-dana.jpg', bio: 'Dana leads front-of-house with a hospitality philosophy built on presence, not performance. She knows every regular\'s name.' },
  { name: 'Kai Hollister', title: 'Pastry Chef', image: '/images/team-kai.jpg', bio: 'Kai\'s desserts are restrained but unforgettable — burnt honey, bittersweet chocolate, just enough sweetness to make you order one more.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-16 pb-14 bg-ember-900 border-b border-ember-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-px bg-gold-500" />
            <span className="text-xs tracking-[0.25em] uppercase text-gold-500 font-sans">Our Story</span>
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-cream mb-4">
            The <em className="font-light italic text-gold-400">kitchen</em>
          </h1>
          <p className="text-sm text-stone font-sans max-w-xl leading-relaxed">
            Ember &amp; Oak opened in 2019. It was built around a single idea: cook over fire, source honestly, let the ingredients be the point.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28 bg-ember-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-cream mb-6 leading-tight">
                Cooking with fire<br />
                <em className="font-light italic text-gold-400">isn&rsquo;t a trend</em>
              </h2>
              <div className="space-y-4 text-base text-stone font-sans leading-relaxed">
                <p>
                  Marcus Webb grew up in Cleveland. He spent a decade away — cooking at a Michelin-starred brasserie in Lyon, staging at Arzak, running a section at a beloved Chicago steakhouse — before returning with a clear picture of what he wanted to build.
                </p>
                <p>
                  The hearth at Ember &amp; Oak is the kitchen. Every protein, most vegetables, a lot of the bread — it all passes through fire at some point. The menu is structured simply because the cooking is complex. There&rsquo;s no reason to hide behind elaborate descriptions.
                </p>
                <p>
                  We&rsquo;re committed to sourcing within 200 miles when possible. Our beef comes from a farm 45 minutes south of Cleveland. The produce changes with what&rsquo;s best each week.
                </p>
              </div>
            </div>

            {/* Story image */}
            <div className="relative">
              {/*
                📸 IMAGE SLOT — Restaurant interior / hearth
                Replace placeholder div with:
                  <Image
                    src="/images/about-hearth.jpg"
                    fill
                    className="object-cover rounded-2xl"
                    alt="The Ember & Oak open kitchen and hearth"
                  />
                Recommended: 700×880px — the wood-burning hearth, open kitchen, or dining room
              */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-ember-900 flex items-center justify-center">
                <div className="text-center text-ember-600">
                  <div className="text-5xl mb-2 opacity-40">📸</div>
                  <p className="text-xs font-mono opacity-40">/images/about-hearth.jpg</p>
                  <p className="text-[10px] opacity-30 mt-1 font-sans">Hearth or kitchen interior</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-ember-900 border-y border-ember-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-px bg-gold-500" />
            <span className="text-xs tracking-[0.25em] uppercase text-gold-500 font-sans">The People</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name}>
                {/*
                  📸 IMAGE SLOT — Team member photo
                  Path: {member.image} (e.g. /images/team-marcus.jpg)
                  Replace placeholder div with:
                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-5">
                      <Image
                        src={member.image}
                        fill
                        className="object-cover object-top"
                        alt={member.name}
                      />
                    </div>
                  Recommended: 500×500px — candid or portrait, moody lighting
                */}
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-5 bg-ember-800 flex items-center justify-center">
                  <div className="text-center text-ember-600">
                    <div className="text-4xl mb-1 opacity-40">📸</div>
                    <p className="text-[10px] font-mono opacity-40">{member.image}</p>
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold text-cream">{member.name}</h3>
                <p className="text-xs tracking-wider uppercase text-gold-500 font-sans mb-3">{member.title}</p>
                <p className="text-sm text-stone font-sans leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="py-16 bg-ember-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-px bg-gold-500" />
            <span className="text-xs tracking-[0.25em] uppercase text-gold-500 font-sans">Press</span>
          </div>
          <div className="space-y-5 max-w-2xl">
            {pressQuotes.map((q) => (
              <div key={q.source} className="flex gap-5 border-b border-ember-700/50 pb-5 last:border-0">
                <div className="font-display text-2xl text-gold-500/30 leading-none flex-shrink-0 mt-1">&ldquo;</div>
                <div>
                  <p className="font-display text-base italic font-light text-stone leading-relaxed mb-2">{q.quote}</p>
                  <span className="text-xs tracking-wider uppercase text-gold-500 font-sans">{q.source} · {q.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReservationsCTA />
    </>
  );
}
