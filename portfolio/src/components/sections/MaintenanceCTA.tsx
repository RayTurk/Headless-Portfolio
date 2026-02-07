'use client'

import { motion } from 'framer-motion'
import { Check, ShieldAlert, Zap, RotateCw, Activity, Lock } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const maintenanceFeatures = [
  {
    icon: ShieldAlert,
    title: 'Security Updates & Monitoring',
    description: 'Stay ahead of vulnerabilities with automatic security patches',
  },
  {
    icon: Lock,
    title: 'Daily Backups & Recovery',
    description: 'Your data is always safe with automated backup systems',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Keep your site lightning-fast and responsive',
  },
  {
    icon: RotateCw,
    title: 'Plugin & Theme Updates',
    description: 'All components kept current and compatible',
  },
  {
    icon: Activity,
    title: 'Uptime Monitoring',
    description: '24/7 monitoring to catch issues before they impact visitors',
  },
  {
    icon: Check,
    title: 'Priority Support',
    description: 'Fast response times when you need help',
  },
]

export function MaintenanceCTA() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-950 to-surface-950" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-brand-400/30 rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: 0,
            }}
            animate={{
              y: ['0%', '100%'],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            WordPress Maintenance & Support
          </h2>
          <p className="text-lg sm:text-xl text-surface-200 max-w-2xl mx-auto">
            Keep your site secure, fast, and up-to-date without the headache
          </p>
          <p className="text-brand-300 text-lg mt-4 font-semibold">
            Plans starting at $99/month
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {maintenanceFeatures.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 to-brand-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6 rounded-lg border border-brand-500/20 group-hover:border-brand-400/40 transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="flex-shrink-0"
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <Icon className="w-6 h-6 text-brand-400" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-surface-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  {/* Animated check mark */}
                  <motion.div
                    className="absolute -top-2 -right-2"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3,
                      type: 'spring',
                      stiffness: 100,
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-brand-500 rounded-full p-1">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-brand-600 hover:bg-brand-700 text-white px-10 py-3 text-lg"
          >
            Get Your Free Site Audit
          </Button>
          <p className="text-surface-400 text-sm mt-4">
            No credit card required • Takes 15 minutes
          </p>
        </motion.div>
      </div>
    </section>
  )
}
