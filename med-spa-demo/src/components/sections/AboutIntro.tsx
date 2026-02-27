import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { teamMembers, awards } from '@/lib/data';

const dr = teamMembers[0];

export default function AboutIntro() {
  return (
    <section className="py-20 lg:py-28 bg-parchment-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/about-dr-ashford.jpg"
                fill
                className="object-cover object-top"
                alt="Dr. Claire Ashford, Medical Director"
              />
            </div>

            {/* Awards badge */}
            <div className="absolute -bottom-6 -right-6 bg-parchment-50 border border-parchment-200 rounded-2xl p-5 shadow-soft max-w-[200px]">
              <div className="w-6 h-px bg-gold-400 mb-3" />
              <p className="text-xs tracking-wider uppercase text-drift font-sans mb-2">Recognized by</p>
              <p className="font-display text-sm font-medium text-bark leading-snug">Allergan Diamond Provider</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold-400" />
              <span className="text-xs tracking-[0.25em] uppercase text-drift font-sans">Our Philosophy</span>
            </div>

            <h2 className="font-display text-4xl lg:text-5xl font-light text-bark leading-tight mb-6">
              Enhancement, not<br />
              <em className="text-blush-500 not-italic">alteration</em>
            </h2>

            <div className="space-y-4 text-base text-drift font-sans leading-relaxed mb-8">
              <p>
                Dr. Ashford founded Luminary on a simple philosophy: the best aesthetic treatments leave people looking like themselves — just rested, refreshed, and at their most confident.
              </p>
              <p>
                Every consultation begins with listening. We never propose a treatment menu. We ask about your goals, assess your unique anatomy, and build a plan that&rsquo;s genuinely yours.
              </p>
            </div>

            <ul className="space-y-3 mb-10">
              {awards.map((award) => (
                <li key={award} className="flex items-start gap-3 text-sm text-bark font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" />
                  {award}
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm text-blush-500 hover:text-blush-600 font-sans tracking-wide"
            >
              Meet the team
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
