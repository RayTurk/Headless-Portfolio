import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/lib/data';

export default function CategoryGrid() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-brand-700 text-xs font-semibold tracking-[0.22em] uppercase mb-2">
              Browse by Category
            </p>
            <h2 className="font-display font-bold text-stone-900 text-3xl sm:text-4xl leading-tight">
              What are you<br />
              <em className="font-normal text-brand-700">growing?</em>
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-brand-700 hover:text-brand-600 text-sm font-semibold transition-colors"
          >
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category grid — 3 cols desktop, 2 mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className={`group relative rounded-2xl overflow-hidden ${i === 0 ? 'lg:col-span-2' : ''}`}
            >
              {/* Image area */}
              <div className={`relative ${i === 0 ? 'aspect-[16/9]' : 'aspect-square'} overflow-hidden bg-stone-200`}>
                {cat.imageSrc ? (
                  <Image
                    src={cat.imageSrc}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={cat.imageAlt}
                  />
                ) : (
                  /*
                    📸 IMAGE SLOT — {cat.name}
                    Replace with:
                      <Image src="/images/category-{cat.slug}.jpg" fill className="object-cover ..." alt={cat.imageAlt} />
                  */
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.accentColor} to-stone-300 transition-transform duration-700 group-hover:scale-105`} />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/20 transition-colors duration-300" />
              </div>

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                <p className="text-white font-display font-semibold text-lg leading-tight">
                  {cat.name}
                </p>
                <p className="text-white/70 text-xs mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {cat.productCount} varieties →
                </p>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/shop"
          className="sm:hidden flex items-center justify-center gap-1.5 mt-6 text-brand-700 text-sm font-semibold"
        >
          Browse all categories <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
