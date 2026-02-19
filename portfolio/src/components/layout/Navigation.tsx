'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Linkedin, Twitter, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const Navigation = ({ isOpen, onClose }: NavigationProps) => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/rayturk',
      label: 'GitHub',
      color: 'hover:text-surface-300',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/raymondturk-625097137',
      label: 'LinkedIn',
      color: 'hover:text-brand-400',
    },
    {
      icon: Twitter,
      href: 'https://twitter.com/rayturk',
      label: 'Twitter',
      color: 'hover:text-blue-400',
    },
    {
      icon: Code2,
      href: 'https://codepen.io/rayturk',
      label: 'CodePen',
      color: 'hover:text-accent-400',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          />

          {/* Menu Overlay */}
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-surface-950 z-40 md:hidden flex flex-col"
          >
            {/* Content */}
            <div className="flex-1 pt-24 px-6 pb-8 overflow-y-auto">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-2"
              >
                {navItems.map((item) => {
                  const isActive = item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);
                  return (
                    <motion.div key={item.href} variants={itemVariants}>
                      <Link href={item.href} onClick={onClose}>
                        <motion.span
                          whileHover={{ x: 6 }}
                          whileTap={{ scale: 0.98 }}
                          className={cn(
                            'block px-4 py-3 text-lg font-medium rounded-lg transition-colors',
                            isActive
                              ? 'text-brand-400 bg-brand-500/10'
                              : 'text-surface-200 hover:text-brand-400 hover:bg-surface-900/50'
                          )}
                        >
                          {item.label}
                        </motion.span>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Social Links Footer */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="border-t border-surface-900 px-6 py-6 space-y-4"
            >
              <motion.p
                variants={itemVariants}
                className="text-xs font-semibold text-surface-500 uppercase tracking-wider"
              >
                Connect
              </motion.p>
              <motion.div
                variants={containerVariants}
                className="flex gap-4"
              >
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={itemVariants}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        'text-surface-500 transition-colors',
                        social.color
                      )}
                      aria-label={social.label}
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </motion.div>
            </motion.div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

export default Navigation;
