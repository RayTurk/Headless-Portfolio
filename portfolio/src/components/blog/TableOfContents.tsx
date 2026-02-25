'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Track scroll position
    const handleScroll = () => {
      let current = '';
      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (element && element.getBoundingClientRect().top < 100) {
          current = heading.id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full px-4 py-3 rounded-lg bg-surface-800 text-ash text-sm font-semibold mb-4 flex items-center justify-between hover:bg-surface-700 transition-colors"
      >
        Table of Contents
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </motion.button>

      {/* TOC List */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="lg:opacity-100 lg:height-auto overflow-hidden lg:overflow-visible mb-8 lg:mb-0"
      >
        <div className="rounded-lg bg-surface-800/50 border border-surface-700 p-4 lg:sticky lg:top-32">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-surface-400 mb-4">
            On this page
          </h3>
          <nav className="space-y-2">
            {headings.map((heading) => {
              const isActive = activeId === heading.id;
              const isLevel3 = heading.level === 3;

              return (
                <motion.button
                  key={heading.id}
                  onClick={() => handleClick(heading.id)}
                  className={`block w-full text-left text-sm transition-colors ${
                    isLevel3 ? 'pl-4' : ''
                  } ${
                    isActive
                      ? 'text-brand-400 font-semibold'
                      : 'text-surface-400 hover:text-ash'
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <motion.span
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      x: isActive ? -8 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="inline-block mr-2 text-brand-400"
                  >
                    ▸
                  </motion.span>
                  {heading.text}
                </motion.button>
              );
            })}
          </nav>

          {/* Indicator Line */}
          <motion.div
            layoutId="tocIndicator"
            className="absolute left-0 w-1 bg-brand-500"
            initial={false}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        </div>
      </motion.div>
    </>
  );
}
