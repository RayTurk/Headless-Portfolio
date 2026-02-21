'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Menu, X, Flame } from 'lucide-react';
import { siteConfig } from '@/lib/data';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white shadow-md'
          : 'bg-navy-950 bg-opacity-95'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <span
                className={cn(
                  'font-bold text-base tracking-tight',
                  scrolled ? 'text-navy-950' : 'text-white'
                )}
              >
                Summit HVAC
              </span>
              <span
                className={cn(
                  'hidden sm:block text-xs font-medium',
                  scrolled ? 'text-gray-500' : 'text-navy-200'
                )}
              >
                & Plumbing
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-amber-500',
                  scrolled ? 'text-gray-700' : 'text-white/90'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Phone CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-2 text-sm font-semibold text-amber-500 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {siteConfig.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="bg-amber-500 hover:bg-amber-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Free Quote
            </Link>
          </div>

          {/* Mobile: phone + hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href={`tel:${siteConfig.phone}`}
              className="text-amber-500"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className={cn(
                'p-1 rounded-md transition-colors',
                scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-amber-400'
              )}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-navy-950 hover:bg-gray-50 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t border-gray-100">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2 px-3 py-2 text-base font-semibold text-amber-600"
              >
                <Phone className="w-4 h-4" />
                {siteConfig.phoneDisplay}
              </a>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 block w-full text-center bg-amber-500 hover:bg-amber-400 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors"
              >
                Get a Free Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
