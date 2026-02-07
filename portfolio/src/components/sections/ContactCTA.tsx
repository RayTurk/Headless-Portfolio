'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function ContactCTA() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-surface-950 to-brand-950" />

      {/* Animated gradient orbs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-brand-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
        >
          Let's Build Something{' '}
          <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
            Great Together
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl text-surface-200 max-w-2xl mx-auto mb-12"
        >
          Based in Cleveland, OH • Remote-friendly • Ready to help your project succeed
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="bg-brand-600 hover:bg-brand-700 text-white px-10 py-3 text-lg"
          >
            Start a Project
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-brand-500/50 text-brand-400 hover:bg-brand-500/10 px-10 py-3 text-lg"
          >
            Schedule a Call
          </Button>
        </motion.div>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-surface-400 text-sm mt-8"
        >
          Questions? Email me at{' '}
          <a href="mailto:ray@example.com" className="text-brand-400 hover:text-brand-300">
            ray@example.com
          </a>
        </motion.p>
      </div>
    </section>
  )
}
