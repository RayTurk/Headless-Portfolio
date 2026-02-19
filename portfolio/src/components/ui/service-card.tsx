'use client'

import { motion } from 'framer-motion'
import { getLucideIcon } from '@/lib/utils'
import { Button } from './Button'
import { ArrowRight } from 'lucide-react'

export interface DisplayService {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  features?: string[];
  price?: string;
  slug?: string;
}

interface ServiceCardProps {
  service: DisplayService
  featured?: boolean
  size?: 'small' | 'standard' | 'large'
}

export function ServiceCard({
  service,
  featured = false,
  size = 'standard',
}: ServiceCardProps) {
  const Icon = getLucideIcon(service.icon)

  const borderClass = featured
    ? 'border-brand-500/50 bg-gradient-to-br from-brand-950/30 to-surface-900/30'
    : 'border-surface-700 hover:border-brand-500/30'

  const shadowClass = featured
    ? 'shadow-lg shadow-brand-600/20'
    : 'hover:shadow-lg hover:shadow-brand-600/10'

  return (
    <motion.div
      className={`relative group h-full flex flex-col rounded-lg border p-6 sm:p-8 transition-all duration-300 ${borderClass} ${shadowClass}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Accent glow for featured */}
      {featured && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-600/20 to-brand-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}

      <div className="relative z-10 flex flex-col flex-1">
        {/* Icon */}
        <motion.div
          className={`inline-flex items-center justify-center rounded-lg mb-4 ${
            featured
              ? 'w-14 h-14 bg-brand-600/20'
              : 'w-12 h-12 bg-surface-800/50 group-hover:bg-brand-600/20'
          } transition-all duration-300`}
          whileHover={{ rotate: 10 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          {Icon && <Icon className="w-6 h-6 text-brand-400" />}
        </motion.div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
          {service.title}
        </h3>

        {/* Description */}
        {service.description && (
          <p className="text-sm text-surface-300 mb-4">{service.description}</p>
        )}

        {/* Features list */}
        {service.features && service.features.length > 0 && (
          <ul className="space-y-2 mb-6 flex-1">
            {service.features.map((feature, index) => (
              <motion.li
                key={feature}
                className="flex items-start gap-2 text-sm text-surface-300"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <span className="text-brand-400 font-bold">&bull;</span>
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        )}

        {/* Price */}
        {service.price && (
          <div className="mb-6 pb-6 border-t border-surface-700">
            <p className="text-sm text-surface-400 mt-4">
              <span className="text-brand-400 font-semibold">
                {service.price}
              </span>
            </p>
          </div>
        )}

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant={featured ? 'primary' : 'secondary'}
            className={`w-full group/btn ${
              featured
                ? 'bg-brand-600 hover:bg-brand-700'
                : 'border-brand-500/30 text-brand-400 hover:bg-brand-500/10'
            }`}
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
