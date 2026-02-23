import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import type { Product } from '@/lib/types';

const badgeStyles: Record<string, string> = {
  new: 'bg-brand-700 text-white',
  sale: 'bg-red-600 text-white',
  bestseller: 'bg-amber-700 text-white',
  seasonal: 'bg-emerald-700 text-white',
};

const badgeLabels: Record<string, string> = {
  new: 'New',
  sale: 'Sale',
  bestseller: 'Best Seller',
  seasonal: 'In Season',
};

// Warm gradient placeholders per category
const categoryGradients: Record<string, string> = {
  annuals: 'from-rose-100 to-pink-50',
  perennials: 'from-purple-100 to-violet-50',
  'trees-shrubs': 'from-green-100 to-emerald-50',
  houseplants: 'from-teal-100 to-green-50',
  'garden-supplies': 'from-amber-100 to-stone-100',
  'pots-planters': 'from-orange-100 to-amber-50',
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const gradient = categoryGradients[product.categorySlug] ?? 'from-stone-100 to-stone-50';

  return (
    <div className="card-product group flex flex-col">
      {/* Image area */}
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
        {product.imageSrc ? (
          <Image
            src={product.imageSrc}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            alt={product.imageAlt}
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-transform duration-500 group-hover:scale-105`} />
        )}

        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${badgeStyles[product.badge]}`}>
            {badgeLabels[product.badge]}
          </div>
        )}

        {/* Stock warning */}
        {product.stockNote && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-stone-700 text-[10px] font-semibold px-2 py-1 rounded-full">
            {product.stockNote}
          </div>
        )}

        {/* Quick add — appears on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full bg-brand-700 hover:bg-brand-600 text-white text-sm font-semibold py-3 flex items-center justify-center gap-2 transition-colors">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-brand-700 text-xs font-semibold uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="font-display font-semibold text-stone-900 text-base leading-snug mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-stone-500 text-xs leading-relaxed mb-3 flex-1 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < product.rating ? 'text-amber-500 fill-amber-500' : 'text-stone-200 fill-stone-200'}`}
              />
            ))}
          </div>
          <span className="text-stone-400 text-xs">({product.reviewCount})</span>
        </div>

        {/* Price + unit */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-stone-900 font-bold text-lg">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-stone-400 text-sm line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-stone-400 text-xs">{product.unit}</span>
          </div>
          <button
            aria-label={`Add ${product.name} to cart`}
            className="w-9 h-9 rounded-full bg-cream-200 hover:bg-brand-700 text-brand-700 hover:text-white flex items-center justify-center transition-all duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
