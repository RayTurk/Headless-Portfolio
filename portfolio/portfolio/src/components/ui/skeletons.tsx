'use client'

import { motion } from 'framer-motion'

const pulse = {
  opacity: [0.5, 1, 0.5],
  transition: { duration: 1.5, repeat: Infinity },
}

export function HeroSkeleton() {
  return (
    <div className="min-h-screen bg-surface-950 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-5xl mx-auto w-full text-center">
        <motion.div
          className="h-16 bg-surface-800 rounded mb-6"
          animate={pulse}
        />
        <motion.div
          className="h-8 bg-surface-800 rounded mb-8 max-w-2xl mx-auto"
          animate={pulse}
        />
        <div className="flex gap-4 justify-center mb-12">
          <motion.div className="h-12 w-32 bg-surface-800 rounded" animate={pulse} />
          <motion.div className="h-12 w-32 bg-surface-800 rounded" animate={pulse} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="h-20 bg-surface-800 rounded"
              animate={pulse}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProjectsSkeleton() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="h-12 bg-surface-800 rounded mb-12 max-w-xs mx-auto"
          animate={pulse}
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div className="md:col-span-2 md:row-span-2 h-96 bg-surface-800 rounded" animate={pulse} />
          {[...Array(3)].map((_, i) => (
            <motion.div key={i} className="h-72 bg-surface-800 rounded" animate={pulse} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function TestimonialsSkeleton() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="h-12 bg-surface-800 rounded mb-12 max-w-xs mx-auto"
          animate={pulse}
        />
        <motion.div className="h-80 bg-surface-800 rounded" animate={pulse} />
      </div>
    </section>
  )
}

export function BlogSkeleton() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="h-12 bg-surface-800 rounded mb-12 max-w-xs mx-auto"
          animate={pulse}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <motion.div key={i} className="space-y-4" animate={pulse}>
              <div className="h-48 bg-surface-800 rounded" />
              <div className="h-6 bg-surface-800 rounded" />
              <div className="h-4 bg-surface-800 rounded w-2/3" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
