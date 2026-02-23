'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, ShoppingBag, Leaf, Phone } from 'lucide-react';
import { siteConfig } from '@/lib/data';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/shop?category=annuals', label: 'Annuals' },
  { href: '/shop?category=perennials', label: 'Perennials' },
  { href: '/shop?category=houseplants', label: 'Houseplants' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-cream/95 backdrop-blur-md border-b border-stone-200 shadow-sm'
          : 'bg-transparent'
      )}
    >
      {/* Top bar */}
      <div className="hidden lg:block bg-brand-700 text-white text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <span>Free local delivery on orders over $75 · Hudson, OH</span>
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-1.5 hover:text-cream-200 transition-colors"
          >
            <Phone className="w-3 h-3" />
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-brand-700 flex items-center justify-center group-hover:bg-brand-600 transition-colors">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <div className="leading-tight">
              <span className="font-display font-bold text-stone-900 text-lg">Clover</span>
              <span className="block text-[9px] font-semibold tracking-[0.18em] text-brand-700 uppercase -mt-0.5">
                Garden Centre
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-stone-600 hover:text-brand-700 text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right side */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              aria-label="Search"
              className="p-2 text-stone-500 hover:text-brand-700 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              aria-label="Cart"
              className="relative p-2 text-stone-500 hover:text-brand-700 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-brand-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                2
              </span>
            </button>
            <Link
              href="/shop"
              className="bg-brand-700 hover:bg-brand-600 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
            >
              Shop Now
            </Link>
          </div>

          {/* Mobile right */}
          <div className="flex lg:hidden items-center gap-2">
            <button aria-label="Cart" className="relative p-2 text-stone-600">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-brand-700 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                2
              </span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-cream/98 border-t border-stone-200">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-stone-700 hover:text-brand-700 hover:bg-stone-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-stone-200">
              <Link
                href="/shop"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-brand-700 hover:bg-brand-600 text-white font-semibold py-3 rounded-full transition-colors text-sm"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
