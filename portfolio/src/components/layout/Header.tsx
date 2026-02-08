'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Navigation from '@/components/layout/Navigation';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/', id: 'home' },
    { label: 'Projects', href: '/projects', id: 'projects' },
    { label: 'Blog', href: '/blog', id: 'blog' },
    { label: 'Services', href: '/services', id: 'services' },
    { label: 'About', href: '/about', id: 'about' },
    { label: 'Contact', href: '/contact', id: 'contact' },
  ];

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-surface-950/80 backdrop-blur-xl border-b border-surface-900/50'
            : 'bg-transparent'
        )}
        initial={false}
        animate={{
          backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent group-hover:from-brand-400 group-hover:to-accent-400 transition-all duration-300">
                  RT
                </div>
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-brand-500/20 to-accent-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  layoutId="logo-glow"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.div key={item.id} whileHover="hover" whileTap="tap">
                  <Link href={item.href}>
                    <motion.span
                      onClick={() => setActiveLink(item.id)}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative',
                        activeLink === item.id
                          ? 'text-brand-400'
                          : 'text-surface-400 hover:text-surface-200'
                      )}
                      variants={{
                        hover: { y: -2 },
                        tap: { scale: 0.95 },
                      }}
                    >
                      {item.label}
                      {activeLink === item.id && (
                        <motion.div
                          layoutId="active-nav"
                          className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-brand-500 to-accent-500"
                          transition={{
                            type: 'spring',
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Desktop CTA + Mobile Menu Button */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden sm:block">
                <Button
                  href="/contact"
                  variant="primary"
                  size="md"
                  className="relative group"
                >
                  <span className="relative z-10">Let's Talk</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-brand-500 to-accent-500 rounded-lg opacity-0 group-hover:opacity-20 blur transition-opacity"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(99, 102, 241, 0)',
                        '0 0 20px rgba(99, 102, 241, 0.5)',
                        '0 0 20px rgba(99, 102, 241, 0)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-surface-400 hover:text-surface-200 transition-colors"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <Navigation isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Spacer */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export { Header };
export default Header;
