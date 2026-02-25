import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ChefStory() {
  return (
    <section className="py-20 lg:py-28 bg-ember-900 border-y border-ember-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            {/*
              📸 IMAGE SLOT — Chef portrait or kitchen action shot
              Replace placeholder div with:
                <Image
                  src="/images/chef-portrait.jpg"
                  fill
                  className="object-cover object-top rounded-2xl"
                  alt="Executive Chef Marcus Webb at Ember & Oak"
                />
              Recommended: 700×900px — chef at the pass, plating, or candid kitchen shot
            */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-ember-800 flex items-center justify-center">
              <div className="text-center text-ember-600">
                <div className="text-5xl mb-2 opacity-40">📸</div>
                <p className="text-xs font-mono opacity-40">/images/chef-portrait.jpg</p>
                <p className="text-[10px] opacity-30 mt-1 font-sans">Chef portrait / kitchen action</p>
              </div>
            </div>

            {/* Floating press quote */}
            <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-ember-950 border border-ember-700/80 rounded-2xl p-5 max-w-[220px] shadow-card">
              <div className="w-6 h-px bg-gold-500 mb-3" />
              <p className="font-display text-sm italic text-stone leading-snug">
                &ldquo;The most compelling fire-driven kitchen in Cleveland.&rdquo;
              </p>
              <p className="text-[10px] text-ember-600 font-sans mt-2 tracking-wider uppercase">Cleveland Magazine, 2024</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gold-500" />
              <span className="text-xs tracking-[0.25em] uppercase text-gold-500 font-sans">The Kitchen</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-cream leading-tight mb-6">
              Built around<br />
              <em className="font-light italic text-gold-400">the fire</em>
            </h2>
            <div className="space-y-4 text-base text-stone font-sans leading-relaxed mb-8">
              <p>
                Chef Marcus Webb spent ten years cooking through kitchens in Chicago, Lyon, and San Sebastián before returning to Cleveland with one intent: open the restaurant he always wanted to eat at.
              </p>
              <p>
                Ember &amp; Oak is built around a 9-foot wood-burning hearth at the center of an open kitchen. Every protein passes through the fire. The menu changes with the seasons, the purveyor relationships, and whatever Marcus is obsessing over that week.
              </p>
              <p>
                No truffle oil unless it&rsquo;s earned. No dishes that exist to be Instagrammed. Just very good food, served honestly.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm text-gold-500 hover:text-gold-400 font-sans tracking-wide"
            >
              More about us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
