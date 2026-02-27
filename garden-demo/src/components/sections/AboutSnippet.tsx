import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf } from 'lucide-react';

const values = [
  { label: 'Expert Advice', desc: 'Every staff member is a trained horticulturist or lifelong gardener.' },
  { label: 'Locally Grown', desc: 'We grow a third of our stock on-site. The rest comes from growers within 100 miles.' },
  { label: 'Since 1987', desc: "Three generations of the Clover family, rooted in this community." },
];

export default function AboutSnippet() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 items-center">

          {/* Left: Image */}
          <div className="relative mb-10 lg:mb-0">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-stone-100">
              <Image src="/images/about-nursery.jpg" fill className="object-cover" alt="Clover Garden Centre greenhouse" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-4 -right-4 lg:-right-8 bg-brand-700 text-white rounded-2xl px-6 py-5 shadow-lg">
              <p className="text-3xl font-display font-bold leading-none">37 yrs</p>
              <p className="text-brand-200 text-xs mt-1 font-medium">In Hudson</p>
            </div>
          </div>

          {/* Right: Copy */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <Leaf className="w-3.5 h-3.5 text-brand-700" />
              <span className="text-brand-700 text-xs font-semibold tracking-[0.22em] uppercase">Our Story</span>
            </div>

            <h2 className="font-display font-bold text-stone-900 text-3xl sm:text-4xl leading-tight mb-5">
              Not just a garden center.
              <br />
              <em className="font-normal text-brand-700">A community.</em>
            </h2>

            <p className="text-stone-600 leading-relaxed mb-6">
              Clover Garden Centre started with a single greenhouse and a family obsessed with plants.
              Today, we cover five acres in Hudson and carry thousands of varieties — but we still know
              most of our customers by name.
            </p>

            {/* Values list */}
            <ul className="space-y-4 mb-8">
              {values.map((v) => (
                <li key={v.label} className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-stone-900 font-semibold text-sm">{v.label}</p>
                    <p className="text-stone-500 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-600 text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-200 text-sm"
            >
              Read Our Story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
