'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TestimonialCard, DisplayTestimonial } from '@/components/ui/testimonial-card'

interface TestimonialsSliderProps {
  testimonials: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
}

const defaultTestimonials: DisplayTestimonial[] = [
  {
    id: '1',
    author: 'Sarah Johnson',
    company: 'Johnson Design Studio',
    content:
      'Ray took over our WordPress maintenance and our site has never been faster or more secure. Highly recommend!',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  },
  {
    id: '2',
    author: 'Michael Chen',
    company: 'Chen Enterprises',
    content:
      'The full-stack development work was exceptional. Ray understood our needs perfectly and delivered on time.',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
  },
  {
    id: '3',
    author: 'Jessica Martinez',
    company: 'Martinez Legal',
    content:
      'Professional, responsive, and knowledgeable. Ray is the only developer I trust with our critical systems.',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
  },
]

export function TestimonialsSlider({
  testimonials = [],
}: TestimonialsSliderProps) {
  // Map WordPress Testimonial objects to DisplayTestimonial format
  const mappedTestimonials: DisplayTestimonial[] = testimonials.map((t) => ({
    id: t.id || '',
    author: t.author || t.testimonialDetails?.testimonialAuthorName || t.title || '',
    company: t.company || t.testimonialDetails?.testimonialCompany || '',
    content: t.content?.replace(/<[^>]*>/g, '') || '',
    rating: t.rating || t.testimonialDetails?.testimonialRating || 5,
    image: t.image || t.featuredImage?.node?.sourceUrl || '',
  }))
  const displayTestimonials =
    mappedTestimonials.length > 0 ? mappedTestimonials : defaultTestimonials
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % displayTestimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [displayTestimonials.length])

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  }

  const next = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % displayTestimonials.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent(
      (prev) =>
        (prev - 1 + displayTestimonials.length) % displayTestimonials.length
    )
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-900">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            What Clients Say
          </h2>
          <p className="text-lg text-surface-300">
            Real feedback from real clients
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                }}
              >
                <TestimonialCard
                  testimonial={displayTestimonials[current]}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <motion.button
            onClick={prev}
            className="absolute -left-4 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-brand-600/80 hover:bg-brand-600 text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={next}
            className="absolute -right-4 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-brand-600/80 hover:bg-brand-600 text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Dot indicators */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center gap-3 mt-8"
        >
          {displayTestimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > current ? 1 : -1)
                setCurrent(index)
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? 'bg-brand-500 w-8'
                  : 'bg-surface-600 w-2'
              }`}
              whileHover={{ scale: 1.2 }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
