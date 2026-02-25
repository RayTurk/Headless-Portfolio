'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Menu, X } from 'lucide-react';
import { siteConfig } from '@/lib/data';

const navLinks = [
  { label: 'Treatments', href: '/treatments' },
  { label: 'About', href: '/about' },
  { label: 'Book', href: '/booking' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-parchment-50/95 backdrop-blur-sm border-b border-parchment-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-display text-xl font-medium tracking-[0.12em] text-bark uppercase">
              Luminary
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-drift font-sans">
              Aesthetics
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wider text-drift hover:text-bark transition-colors uppercase font-sans"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="hidden sm:inline-flex items-center gap-2 text-sm text-drift hover:text-bark transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {siteConfig.phoneDisplay}
            </a>
            <Link
              href="/booking"
              className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full bg-blush-500 hover:bg-blush-600 text-white text-sm font-medium tracking-wide transition-colors"
            >
              Book a Consultation
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-bark"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-parchment-200 bg-parchment-50 px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm tracking-wider uppercase text-drift hover:text-bark py-2"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className="block text-center px-5 py-3 rounded-full bg-blush-500 hover:bg-blush-600 text-white text-sm font-medium mt-4"
          >
            Book a Consultation
          </Link>
        </div>
      )}
    </header>
  );
}
