import type { Metadata } from 'next';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { products, categories } from '@/lib/data';
import ProductCard from '@/components/ui/ProductCard';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse annuals, perennials, trees, houseplants, garden supplies, and more at Clover Garden Centre.',
};

const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest', 'Best Selling'];

export default function ShopPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Page header */}
      <div className="bg-white border-b border-stone-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-700 text-xs font-semibold tracking-[0.22em] uppercase mb-2">
            Full Collection
          </p>
          <h1 className="font-display font-bold text-stone-900 text-4xl sm:text-5xl">
            All Plants & Supplies
          </h1>
          <p className="text-stone-500 mt-2 text-sm">
            {products.length} products shown · Updated weekly with new arrivals
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">

          {/* Sidebar filters */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">

              {/* Category filter */}
              <div>
                <h3 className="font-semibold text-stone-900 text-sm mb-3 uppercase tracking-wider">Category</h3>
                <ul className="space-y-1">
                  <li>
                    <button className="w-full text-left text-sm px-3 py-2 rounded-lg bg-brand-700 text-white font-medium">
                      All Categories
                    </button>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <button className="w-full text-left text-sm px-3 py-2 rounded-lg text-stone-600 hover:text-brand-700 hover:bg-stone-50 transition-colors flex justify-between items-center">
                        {cat.name}
                        <span className="text-stone-400 text-xs">{cat.productCount}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price range */}
              <div>
                <h3 className="font-semibold text-stone-900 text-sm mb-3 uppercase tracking-wider">Price</h3>
                <ul className="space-y-1">
                  {['Under $15', '$15 – $30', '$30 – $75', '$75 & Up'].map((range) => (
                    <li key={range}>
                      <label className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-stone-50 cursor-pointer">
                        <input type="checkbox" className="rounded border-stone-300 text-brand-600 focus:ring-brand-500" />
                        <span className="text-stone-600 text-sm">{range}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* In stock */}
              <div>
                <h3 className="font-semibold text-stone-900 text-sm mb-3 uppercase tracking-wider">Availability</h3>
                <label className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-stone-50 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-stone-300 text-brand-600 focus:ring-brand-500" />
                  <span className="text-stone-600 text-sm">In Stock Only</span>
                </label>
              </div>

              {/* Sun requirements */}
              <div>
                <h3 className="font-semibold text-stone-900 text-sm mb-3 uppercase tracking-wider">Sun</h3>
                <ul className="space-y-1">
                  {['Full Sun', 'Part Shade', 'Full Shade'].map((s) => (
                    <li key={s}>
                      <label className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-stone-50 cursor-pointer">
                        <input type="checkbox" className="rounded border-stone-300 text-brand-600 focus:ring-brand-500" />
                        <span className="text-stone-600 text-sm">{s}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div>
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <button className="lg:hidden flex items-center gap-2 border border-stone-300 text-stone-700 text-sm font-medium px-4 py-2.5 rounded-full hover:border-brand-600 transition-colors">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>

              <p className="hidden lg:block text-stone-500 text-sm">
                Showing <span className="font-semibold text-stone-900">{products.length}</span> products
              </p>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-stone-500 text-sm hidden sm:inline">Sort:</span>
                <button className="flex items-center gap-2 border border-stone-300 text-stone-700 text-sm font-medium px-4 py-2.5 rounded-full hover:border-brand-600 transition-colors">
                  Featured
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active filters (visual only) */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 bg-brand-50 border border-brand-200 text-brand-700 text-xs font-medium px-3 py-1.5 rounded-full">
                In Stock
                <button className="hover:text-brand-900 ml-0.5">×</button>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-stone-100 border border-stone-200 text-stone-600 text-xs font-medium px-3 py-1.5 rounded-full">
                Clear all
              </span>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination (visual) */}
            <div className="mt-12 flex items-center justify-center gap-2">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 rounded-full text-sm font-semibold transition-colors ${
                    page === 1
                      ? 'bg-brand-700 text-white'
                      : 'text-stone-500 hover:text-brand-700 hover:bg-stone-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="w-10 h-10 rounded-full text-sm font-semibold text-stone-500 hover:text-brand-700 hover:bg-stone-100 transition-colors">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
