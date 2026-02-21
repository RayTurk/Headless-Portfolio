'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Sparkles } from 'lucide-react';
import { siteConfig } from '@/lib/data';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/booking', label: 'Book Now' },
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
          ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/60 shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 group-hover:border-cyan-400/50 transition-colors">
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="font-bold text-white text-lg leading-tight">
              Revive<span className="text-cyan-400">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, -1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-2 text-zinc-400 hover:text-cyan-400 text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              {siteConfig.phoneDisplay}
            </a>
            <Link
              href="/booking"
              className="bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-cyan-glow"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950/98 border-t border-zinc-800">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'block px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  link.label === 'Book Now'
                    ? 'bg-cyan-600 hover:bg-cyan-500 text-white text-center mt-2'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-2 px-4 py-3 text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
