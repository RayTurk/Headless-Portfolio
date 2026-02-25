'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, Wrench, Radio, Sparkles, Leaf, Flower2, UtensilsCrossed } from 'lucide-react'

interface DemoProject {
  name: string
  slug: string
  industry: string
  description: string
  theme: 'light' | 'dark'
  primaryCta: string
  techStack: string[]
  accentFrom: string
  accentTo: string
  badgeBg: string
  badgeText: string
  icon: React.ReactNode
  demoUrl: string
}

const demos: DemoProject[] = [
  {
    name: 'Summit HVAC & Plumbing',
    slug: 'summit-hvac',
    industry: 'Local Service Business',
    description:
      'Full marketing site for a local HVAC and plumbing contractor. Light theme, service pages, trust signals, emergency CTA, and "Get a Free Quote" conversion flow.',
    theme: 'light',
    primaryCta: 'Phone / Get a Quote',
    techStack: ['Next.js 14', 'Tailwind CSS', 'TypeScript', 'Netlify'],
    accentFrom: 'from-navy-800',
    accentTo: 'to-amber-600',
    badgeBg: 'bg-amber-500/20',
    badgeText: 'text-amber-400',
    icon: <Wrench className="w-5 h-5" />,
    demoUrl: 'https://summit-hvac-demo.netlify.app',
  },
  {
    name: 'Beacon',
    slug: 'beacon',
    industry: 'SaaS / DevOps',
    description:
      'Uptime monitoring SaaS for engineering teams. Dark theme, pricing toggle with monthly/annual billing, CSS dashboard mockup, and product-led "Start Free Trial" growth model.',
    theme: 'dark',
    primaryCta: 'Free Trial / Request Demo',
    techStack: ['Next.js 14', 'Tailwind CSS', 'TypeScript', 'Netlify'],
    accentFrom: 'from-orange-700',
    accentTo: 'to-amber-600',
    badgeBg: 'bg-orange-500/20',
    badgeText: 'text-orange-400',
    icon: <Radio className="w-5 h-5" />,
    demoUrl: 'https://rturk-beacon-demo.netlify.app',
  },
  {
    name: 'Revive Auto Detailing',
    slug: 'revive-detailing',
    industry: 'Auto Detailing',
    description:
      'Cinematic dark-themed site for a premium auto detailing shop. Package-based pricing with dollar amounts shown, CSS before/after showcase, and an online booking form.',
    theme: 'dark',
    primaryCta: 'Book Online',
    techStack: ['Next.js 14', 'Tailwind CSS', 'TypeScript', 'Netlify'],
    accentFrom: 'from-zinc-700',
    accentTo: 'to-cyan-600',
    badgeBg: 'bg-cyan-500/20',
    badgeText: 'text-cyan-400',
    icon: <Sparkles className="w-5 h-5" />,
    demoUrl: 'https://revive-detailing-demo.netlify.app',
  },
  {
    name: 'Clover Garden Centre',
    slug: 'clover-garden',
    industry: 'Ecommerce / Retail',
    description:
      'Editorial ecommerce site for a family-owned garden center. Cream warm palette, product grid with filters, category browsing, seasonal banners, and a newsletter CTA.',
    theme: 'light',
    primaryCta: 'Shop / Add to Cart',
    techStack: ['Next.js 14', 'Tailwind CSS', 'TypeScript', 'Netlify'],
    accentFrom: 'from-green-800',
    accentTo: 'to-emerald-500',
    badgeBg: 'bg-emerald-500/20',
    badgeText: 'text-emerald-400',
    icon: <Leaf className="w-5 h-5" />,
    demoUrl: 'https://clover-garden-demo.netlify.app',
  },
  {
    name: 'Luminary Aesthetics',
    slug: 'luminary-aesthetics',
    industry: 'Med Spa / Wellness',
    description:
      'Luxury med spa site in a warm cream and blush palette. Treatment menu with pricing, before/after results gallery, team profiles, and a multi-step booking consultation form.',
    theme: 'light',
    primaryCta: 'Book a Consultation',
    techStack: ['Next.js 14', 'Tailwind CSS', 'TypeScript', 'Netlify'],
    accentFrom: 'from-rose-700',
    accentTo: 'to-amber-400',
    badgeBg: 'bg-rose-500/20',
    badgeText: 'text-rose-300',
    icon: <Flower2 className="w-5 h-5" />,
    demoUrl: 'https://luminary-aesthetics-demo.netlify.app',
  },
  {
    name: 'Ember & Oak',
    slug: 'ember-oak',
    industry: 'Restaurant / Hospitality',
    description:
      'Dark editorial site for a wood-fired upscale restaurant. Deep charcoal and aged gold palette, full dinner menu, chef story, press features, and OpenTable-style reservation form.',
    theme: 'dark',
    primaryCta: 'Reserve a Table',
    techStack: ['Next.js 14', 'Tailwind CSS', 'TypeScript', 'Netlify'],
    accentFrom: 'from-yellow-900',
    accentTo: 'to-amber-500',
    badgeBg: 'bg-amber-500/20',
    badgeText: 'text-amber-400',
    icon: <UtensilsCrossed className="w-5 h-5" />,
    demoUrl: 'https://ember-and-oak-demo.netlify.app',
  },
]

export function DemoProjects() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-950">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Client</span>{' '}
            <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
              Demo Sites
            </span>
          </h2>
          <p className="text-lg text-surface-300 max-w-2xl mx-auto">
            Six fully built Next.js demo sites spanning local services, SaaS, automotive, retail, wellness, and hospitality — each designed from the ground up for its audience.
          </p>
        </motion.div>

        {/* Demo cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo, i) => (
            <motion.div
              key={demo.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col rounded-2xl overflow-hidden border border-surface-700 hover:border-brand-500/50 bg-surface-900 transition-all duration-300 hover:shadow-bento-hover"
            >
              {/* Color preview bar */}
              <div
                className={`h-2 w-full bg-gradient-to-r ${demo.accentFrom} ${demo.accentTo}`}
              />

              <div className="p-6 flex flex-col flex-1">
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${demo.badgeBg} ${demo.badgeText}`}>
                      {demo.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg leading-tight group-hover:text-brand-300 transition-colors">
                        {demo.name}
                      </h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${demo.badgeBg} ${demo.badgeText}`}>
                        {demo.industry}
                      </span>
                    </div>
                  </div>
                  <span className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full border ${
                    demo.theme === 'dark'
                      ? 'border-surface-600 text-surface-400'
                      : 'border-surface-600 text-surface-400'
                  }`}>
                    {demo.theme === 'dark' ? '🌑 Dark theme' : '☀️ Light theme'}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-surface-300 leading-relaxed mb-4 flex-1">
                  {demo.description}
                </p>

                {/* CTA style */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-surface-500 uppercase tracking-wider">Primary CTA:</span>
                  <span className="text-xs font-medium text-surface-300">{demo.primaryCta}</span>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {demo.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-surface-300 bg-surface-800 px-2 py-1 rounded border border-surface-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <Link
                  href={demo.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors group/link mt-auto"
                >
                  View Live Demo
                  <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
