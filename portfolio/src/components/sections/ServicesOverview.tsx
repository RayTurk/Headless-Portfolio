'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Wrench, Hammer, Code2, Server } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    id: '1',
    number: '01',
    icon: Wrench,
    title: 'WordPress Maintenance & Support',
    description: 'Keep your site secure, fast, and up-to-date without the headache. I handle everything so you can focus on your business.',
    features: ['Daily backups & monitoring', 'Security updates & patches', 'Performance optimization', 'Priority support'],
    price: 'Starting at $50/mo',
    accent: 'from-violet-500 to-indigo-500',
    accentBg: 'from-violet-500/10 to-indigo-500/5',
    accentBorder: 'border-violet-500/20 hover:border-violet-500/50',
    accentText: 'text-violet-400',
    accentIcon: 'bg-violet-500/15 text-violet-400',
  },
  {
    id: '2',
    number: '02',
    icon: Hammer,
    title: 'Website Building',
    description: 'Custom WordPress and Next.js sites built for speed, SEO, and conversion. Your brand, done right.',
    features: ['Responsive design', 'SEO optimized', 'Fast performance', 'Ongoing support'],
    price: 'Custom quote',
    accent: 'from-emerald-500 to-teal-500',
    accentBg: 'from-emerald-500/10 to-teal-500/5',
    accentBorder: 'border-emerald-500/20 hover:border-emerald-500/50',
    accentText: 'text-emerald-400',
    accentIcon: 'bg-emerald-500/15 text-emerald-400',
  },
  {
    id: '3',
    number: '03',
    icon: Code2,
    title: 'Full Stack Development',
    description: 'From REST APIs to React frontends — I build robust, scalable applications that grow with your business.',
    features: ['React & Next.js', 'Node.js & PHP', 'Database design', 'API development'],
    price: 'Custom quote',
    accent: 'from-orange-500 to-amber-500',
    accentBg: 'from-orange-500/10 to-amber-500/5',
    accentBorder: 'border-orange-500/20 hover:border-orange-500/50',
    accentText: 'text-orange-400',
    accentIcon: 'bg-orange-500/15 text-orange-400',
  },
  {
    id: '4',
    number: '04',
    icon: Server,
    title: 'Site Migration',
    description: 'Move your WordPress site to a new host or domain with zero downtime and no data loss.',
    features: ['Zero downtime migration', 'Data integrity guaranteed', 'SEO preservation', 'Full testing included'],
    price: 'Starting at $149',
    accent: 'from-sky-500 to-blue-500',
    accentBg: 'from-sky-500/10 to-blue-500/5',
    accentBorder: 'border-sky-500/20 hover:border-sky-500/50',
    accentText: 'text-sky-400',
    accentIcon: 'bg-sky-500/15 text-sky-400',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export function ServicesOverview() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-900 relative overflow-hidden">
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-400 mb-4 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/5">
            Services
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            How I Can Help
          </h2>
          <p className="text-lg text-surface-400 max-w-2xl mx-auto">
            From keeping your site secure to building something new — I&apos;ve got you covered.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className={`group relative rounded-2xl border bg-gradient-to-br ${service.accentBg} ${service.accentBorder} p-7 transition-all duration-300 overflow-hidden cursor-default`}
              >
                {/* Gradient top line */}
                <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${service.accent} opacity-60 group-hover:opacity-100 transition-opacity`} />

                {/* Number badge */}
                <div className="absolute top-5 right-6 text-5xl font-black text-white/[0.04] select-none pointer-events-none leading-none">
                  {service.number}
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${service.accentIcon} mb-5`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 pr-8">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-surface-400 mb-5 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-1.5 mb-6">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-surface-300">
                      <span className={`w-1 h-1 rounded-full bg-gradient-to-r ${service.accent} flex-shrink-0`} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="flex items-center justify-between pt-5 border-t border-white/5">
                  <span className={`text-sm font-semibold ${service.accentText}`}>
                    {service.price}
                  </span>
                  <Link
                    href="/contact"
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold ${service.accentText} opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200`}
                  >
                    Get started
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
