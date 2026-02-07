'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-950 to-surface-900 flex items-center justify-center">
      <div className="relative w-24 h-24">
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-500 border-r-brand-500/50"
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Middle rotating ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-transparent border-b-brand-400 border-l-brand-400/50"
          animate={{ rotate: -360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Inner pulsing circle */}
        <motion.div
          className="absolute inset-4 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 flex items-center justify-center"
          animate={{
            boxShadow: [
              '0 0 20px rgba(59, 130, 246, 0.5)',
              '0 0 40px rgba(59, 130, 246, 0.8)',
              '0 0 20px rgba(59, 130, 246, 0.5)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          {/* RT Logo */}
          <span className="text-white font-bold text-lg">RT</span>
        </motion.div>
      </div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <p className="text-surface-400 text-sm font-medium">Loading...</p>
      </motion.div>
    </div>
  )
}
