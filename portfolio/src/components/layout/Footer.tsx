'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Twitter, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const footerColumns = [
    {
      title: 'About',
      links: [
        { label: 'About Me', href: '/about' },
        { label: 'Projects', href: '/projects' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'All Services', href: '/services' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', href: '/blog' },
        { label: 'Projects', href: '/projects' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { label: 'Get in Touch', href: '/contact' },
        { label: 'LinkedIn', href: 'https://linkedin.com/in/rayturk' },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/rayturk',
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/rayturk',
      label: 'LinkedIn',
    },
    {
      icon: Twitter,
      href: 'https://twitter.com/rayturk',
      label: 'Twitter',
    },
    {
      icon: Code2,
      href: 'https://codepen.io/rayturk',
      label: 'CodePen',
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-surface-900 to-surface-950 border-t border-surface-900/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        >
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-surface-100 mb-4"
            >
              Ready to level up your web presence?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-surface-400 text-lg max-w-2xl mx-auto mb-8"
            >
              Let's build something amazing together. Whether you need a custom WordPress site, Next.js application, or
              full-stack solution, I'm here to help.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Button href="/contact" variant="primary" size="lg">
                Get Started Today
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Footer Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-surface-900/50">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16"
          >
            {footerColumns.map((column, i) => (
              <motion.div
                key={column.title}
                custom={i}
                variants={columnVariants}
              >
                <h3 className="text-sm font-semibold text-surface-100 uppercase tracking-wider mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined}>
                        <motion.span
                          whileHover={{ x: 2 }}
                          className="text-surface-400 hover:text-brand-400 transition-colors inline-block"
                        >
                          {link.label}
                        </motion.span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
            className="border-t border-surface-900/50 pt-8 mb-8"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-surface-500 hover:text-brand-400 transition-colors"
                      aria-label={social.label}
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>

              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTop}
                className="p-2 text-surface-500 hover:text-brand-400 transition-colors"
                aria-label="Back to top"
              >
                <ArrowUp size={20} />
              </motion.button>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
            className="border-t border-surface-900/50 pt-8 text-center text-sm text-surface-500"
          >
            <p className="mb-2">
              &copy; {currentYear} Ray Turk. All rights reserved.
            </p>
            <p>
              Built with{' '}
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block"
              >
                ❤️
              </motion.span>{' '}
              using WordPress, Next.js, React, TypeScript, and Tailwind CSS.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
export default Footer;
