import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products } from '@/lib/data';
import ProductCard from '@/components/ui/ProductCard';

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.featured);

  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-brand-700 text-xs font-semibold tracking-[0.22em] uppercase mb-2">
              Handpicked for You
            </p>
            <h2 className="font-display font-bold text-stone-900 text-3xl sm:text-4xl leading-tight">
              Staff favorites
              <br />
              <em className="font-normal text-stone-500">this season.</em>
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-brand-700 hover:text-brand-600 text-sm font-semibold transition-colors"
          >
            Shop all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 border border-stone-300 hover:border-brand-700 text-stone-700 hover:text-brand-700 font-semibold px-7 py-3.5 rounded-full transition-all duration-200 text-sm"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
