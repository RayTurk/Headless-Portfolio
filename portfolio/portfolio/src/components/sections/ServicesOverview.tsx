'use client'

import { motion } from 'framer-motion'
import { Service } from '@/types/wordpress'
import { ServiceCard } from '@/components/ui/service-card'
import { BentoGrid } from '@/components/ui/bento-grid'

interface ServicesOverviewProps {
  services: Service[]
}

const defaultServices: Service[] = [
  {
    id: '1',
    title: 'WordPress Maintenance & Support',
    description: 'Keep your site secure, fast, and up-to-date without the headache',
    icon: 'wrench',
    features: [
      'Daily backups and monitoring',
      'Security updates and patches',
      'Performance optimization',
      'Priority support',
    ],
    price: 'Starting at $99',
  },
  {
    id: '2',
    title: 'Website Building',
    description: 'Custom WordPress and Next.js sites tailored to your needs',
    icon: 'hammer',
    features: [
      'Responsive design',
      'SEO optimized',
      'Fast performance',
      'Ongoing support',
    ],
    price: 'Custom quote',
  },
  {
    id: '3',
    title: 'Full Stack Development',
    description: 'Backend and frontend solutions for complex applications',
    icon: 'code',
    features: [
      'React and Next.js',
      'Node.js and PHP',
      'Database design',
      'API development',
    ],
    price: 'Custom quote',
  },
  {
    id: '4',
    title: 'Site Migration',
    description: 'Safely move your WordPress site with zero downtime',
    icon: 'server',
    features: [
      'Zero downtime migration',
      'Data integrity guaranteed',
      'SEO preservation',
      'Testing included',
    ],
    price: 'Starting at $299',
  },
]

export function ServicesOverview({ services = [] }: ServicesOverviewProps) {
  const displayServices = services.length > 0 ? services : defaultServices

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  // Find the maintenance service (first or by title)
  const maintenanceIndex = displayServices.findIndex(
    (s) => s.title.toLowerCase().includes('maintenance') || s.id === '1'
  )

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-900">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            How I Can Help
          </h2>
          <p className="text-lg text-surface-300">
            Specialized services to keep your WordPress site thriving
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <BentoGrid className="grid-cols-1 md:grid-cols-3 gap-6">
            {displayServices.map((service, index) => {
              const isMaintenance = index === maintenanceIndex
              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  className={isMaintenance ? 'md:col-span-2 md:row-span-2' : ''}
                >
                  <ServiceCard
                    service={service}
                    featured={isMaintenance}
                    size={isMaintenance ? 'large' : 'standard'}
                  />
                </motion.div>
              )
            })}
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  )
}
