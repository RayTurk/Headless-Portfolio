'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { AnimatedText } from '@/components/ui/animated-text'
import { TypingText } from '@/components/ui/typing-text'
import { SiteSettings } from '@/types/wordpress'

interface HeroProps {
  settings?: SiteSettings
}

const GeometricShape = ({ delay, duration, position }: { delay: number; duration: number; position: string }) => (
  <motion.div
    className={`absolute w-32 h-32 border border-brand-500/20 rounded-full ${position}`}
    animate={{
      y: [0, -20, 0],
      x: [0, 10, 0],
      opacity: [0.1, 0.2, 0.1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
)

export function Hero({ settings }: HeroProps) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const defaultStats = [
    { label: 'Projects', value: '50+' },
    { label: 'Years Experience', value: '8+' },
    { label: 'Happy Clients', value: '100+' },
  ]

  const settingsStats = settings?.homepageSettings?.stats?.map((s) => ({
    label: s.statLabel,
    value: s.statNumber,
  }))
  const stats = settingsStats?.length ? settingsStats : defaultStats

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-surface-950 via-surface-900 to-surface-950 flex flex-col items-center justify-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl" />
      </div>

      {/* Floating geometric shapes */}
      <GeometricShape delay={0} duration={6} position="top-20 left-10" />
      <GeometricShape delay={1} duration={8} position="top-40 right-20" />
      <GeometricShape delay={0.5} duration={7} position="bottom-20 right-32" />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-5" />

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <AnimatedText
            text="Cleveland WordPress & Full Stack Developer"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
            staggerDelay={0.02}
          />
        </motion.div>

        {/* Subheading with typing effect */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <TypingText
            text="Web maintenance • Custom builds • Full-stack solutions"
            className="text-lg sm:text-xl text-surface-300"
            speed={30}
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button
            size="lg"
            className="bg-brand-600 hover:bg-brand-700 text-white px-8"
          >
            View My Work
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="border-brand-500/50 text-brand-400 hover:bg-brand-500/10 px-8"
          >
            Get in Touch
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="grid grid-cols-3 gap-4 sm:gap-8 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              className="text-center"
            >
              <motion.div
                className="text-2xl sm:text-3xl font-bold text-brand-400 mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 1.2 + index * 0.1,
                  type: 'spring',
                  stiffness: 100,
                }}
              >
                {stat.value}
              </motion.div>
              <p className="text-sm text-surface-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ArrowDown className="w-6 h-6 text-brand-500" />
      </motion.div>
    </div>
  )
}
