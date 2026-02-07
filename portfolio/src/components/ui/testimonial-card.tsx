'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star } from 'lucide-react'

export interface DisplayTestimonial {
  id: string;
  author: string;
  company?: string;
  content: string;
  rating?: number;
  image?: string;
}

interface TestimonialCardProps {
  testimonial: DisplayTestimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.div
      className="bg-surface-800 rounded-lg border border-surface-700 p-8 sm:p-12 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Stars */}
      {testimonial.rating && (
        <motion.div
          className="flex justify-center gap-1 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Star className="w-5 h-5 fill-brand-400 text-brand-400" />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Quote */}
      <motion.blockquote
        className="text-lg sm:text-xl text-surface-100 mb-8 italic"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        &ldquo;{testimonial.content}&rdquo;
      </motion.blockquote>

      {/* Author info */}
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* Avatar */}
        {testimonial.image && (
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-brand-500/30">
            <Image
              src={testimonial.image}
              alt={testimonial.author}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Name */}
        <div>
          <p className="font-semibold text-white">{testimonial.author}</p>
          {testimonial.company && (
            <p className="text-sm text-surface-400">{testimonial.company}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
