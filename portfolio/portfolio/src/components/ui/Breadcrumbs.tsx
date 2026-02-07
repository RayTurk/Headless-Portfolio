'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  const breadcrumbList = [
    { label: 'Home', href: '/' },
    ...items,
  ];

  // Schema.org BreadcrumbList structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbList.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${process.env.NEXT_PUBLIC_SITE_URL || ''}${item.href}` : undefined,
    })),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <motion.nav
        aria-label="Breadcrumb"
        className={cn('flex items-center gap-1 flex-wrap', className)}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {breadcrumbList.map((item, index) => (
          <motion.div
            key={`${item.label}-${index}`}
            variants={itemVariants}
            className="flex items-center gap-1"
          >
            {index === 0 ? (
              <Link href={item.href || '/'}>
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1.5 rounded-md hover:bg-surface-900/50 transition-colors text-surface-500 hover:text-brand-400"
                >
                  <Home size={18} />
                </motion.span>
              </Link>
            ) : item.href ? (
              <>
                <motion.div
                  animate={{
                    x: [0, 2, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.1,
                  }}
                >
                  <ChevronRight size={18} className="text-surface-600" />
                </motion.div>
                <Link href={item.href}>
                  <motion.span
                    whileHover={{ scale: 1.05, x: 2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-surface-400 hover:text-brand-400 transition-colors font-medium"
                  >
                    {item.label}
                  </motion.span>
                </Link>
              </>
            ) : (
              <>
                <motion.div
                  animate={{
                    x: [0, 2, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.1,
                  }}
                >
                  <ChevronRight size={18} className="text-surface-600" />
                </motion.div>
                <motion.span
                  variants={itemVariants}
                  className="text-surface-200 font-medium"
                  aria-current="page"
                >
                  {item.label}
                </motion.span>
              </>
            )}
          </motion.div>
        ))}
      </motion.nav>
    </>
  );
};

export default Breadcrumbs;
