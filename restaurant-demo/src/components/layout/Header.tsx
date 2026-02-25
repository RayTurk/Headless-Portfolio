'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/lib/data';

const navLinks = [
  { label: 'Menu', href: '/menu' },
  { label: 'About', href: '/about' },
  { label: 'Reservations', href: '/reservations' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ember-950/95 backdrop-blur-sm border-b border-ember-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-display text-xl font-medium tracking-[0.06em] text-cream">
              Ember <span className="text-gold-500">&amp;</span> Oak
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-stone font-sans">
              Cleveland, Ohio
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-widest text-stone hover:text-cream transition-colors uppercase font-sans"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Reserve CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/reservations"
              className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full border border-gold-500/40 hover:border-gold-500 text-gold-400 hover:text-gold-300 text-sm font-sans tracking-wide transition-all duration-200"
            >
              Reserve a Table
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-stone hover:text-cream transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-ember-700/50 bg-ember-900 px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm tracking-widest uppercase text-stone hover:text-cream py-2 transition-colors font-sans"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/reservations"
            className="block text-center px-5 py-3 rounded-full border border-gold-500/40 text-gold-400 text-sm font-sans mt-4"
          >
            Reserve a Table
          </Link>
        </div>
      )}
    </header>
  );
}
