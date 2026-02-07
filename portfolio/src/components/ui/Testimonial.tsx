'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating?: number;
  className?: string;
  expandable?: boolean;
}

const Testimonial = ({
  quote,
  author,
  role,
  company,
  avatar,
  rating = 5,
  className,
  expandable = false,
}: TestimonialProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 280;
  const isLong = quote.length > maxLength;
  const displayedQuote = isExpanded || !isLong ? quote : quote.substring(0, maxLength) + '...';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'group relative rounded-xl bg-gradient-to-br from-surface-900/50 to-surface-950/50 border border-surface-800/50 hover:border-brand-500/30 p-6 md:p-8 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/10',
        className
      )}
    >
      {/* Gradient border animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-brand-500/0 via-brand-500/10 to-accent-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        animate={{
          backgroundPosition: ['0%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <div className="relative z-10 space-y-4">
        {/* Quote Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl text-brand-500/30"
        >
          "
        </motion.div>

        {/* Quote Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-surface-200 text-lg leading-relaxed"
        >
          {displayedQuote}
        </motion.p>

        {/* Expand Button */}
        <AnimatePresence>
          {expandable && isLong && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-brand-400 hover:text-brand-300 text-sm font-medium flex items-center gap-1 transition-colors"
            >
              {isExpanded ? 'Show less' : 'Read more'}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Rating */}
        {rating && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex gap-1"
          >
            {Array.from({ length: rating }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + i * 0.05 }}
              >
                <Star
                  size={16}
                  className="fill-accent-500 text-accent-500"
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Author Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4 pt-4 border-t border-surface-800/50"
        >
          {avatar && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 }}
              className="relative w-12 h-12 rounded-full overflow-hidden border border-surface-700"
            >
              <Image
                src={avatar}
                alt={author}
                fill
                className="object-cover"
              />
            </motion.div>
          )}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="font-semibold text-surface-100"
            >
              {author}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-surface-400"
            >
              {role} at {company}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Testimonial;
