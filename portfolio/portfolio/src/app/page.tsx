import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Hero } from '@/components/sections/Hero'
import { SkillsMarquee } from '@/components/sections/SkillsMarquee'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { ServicesOverview } from '@/components/sections/ServicesOverview'
import { MaintenanceCTA } from '@/components/sections/MaintenanceCTA'
import { TestimonialsSlider } from '@/components/sections/TestimonialsSlider'
import { BlogPreview } from '@/components/sections/BlogPreview'
import { ContactCTA } from '@/components/sections/ContactCTA'
import {
  getFeaturedProjects,
  getFeaturedServices,
  getFeaturedTestimonials,
  getRecentPosts,
  getSiteSettings,
} from '@/lib/api'
import { HeroSkeleton, ProjectsSkeleton, TestimonialsSkeleton, BlogSkeleton } from '@/components/ui/skeletons'

export const metadata: Metadata = {
  title: 'Ray Turk | Cleveland WordPress & Full Stack Developer',
  description:
    'Cleveland-based WordPress and full-stack developer specializing in web maintenance, hosting, updates, and custom website builds. Serving businesses across Ohio and remote.',
  openGraph: {
    title: 'Ray Turk | Cleveland WordPress & Full Stack Developer',
    description:
      'Cleveland-based WordPress and full-stack developer specializing in web maintenance, hosting, updates, and custom website builds.',
    url: 'https://rayturk.dev',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ray Turk - Cleveland WordPress & Full Stack Developer',
      },
    ],
  },
  alternates: {
    canonical: 'https://rayturk.dev',
  },
}

export const revalidate = 3600 // Revalidate every hour

// JSON-LD Schema
function jsonLdSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://rayturk.dev/#person',
        name: 'Ray Turk',
        url: 'https://rayturk.dev',
        sameAs: [
          'https://linkedin.com/in/rayturk',
          'https://twitter.com/rayturk',
          'https://github.com/rayturk',
        ],
        jobTitle: 'WordPress & Full Stack Developer',
        worksFor: {
          '@type': 'Organization',
          name: 'Ray Turk Development',
        },
        knowsAbout: [
          'WordPress Development',
          'Web Development',
          'Full Stack Development',
          'PHP',
          'React',
          'Next.js',
          'JavaScript',
          'TypeScript',
          'Node.js',
          'Web Maintenance',
          'Web Hosting',
        ],
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://rayturk.dev/#business',
        name: 'Ray Turk Development',
        description:
          'Cleveland-based WordPress and full-stack developer specializing in web maintenance, hosting, updates, and custom website builds.',
        url: 'https://rayturk.dev',
        logo: 'https://rayturk.dev/logo.png',
        image: 'https://rayturk.dev/og-image.jpg',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Cleveland',
          addressRegion: 'OH',
          addressCountry: 'US',
        },
        areaServed: [
          'Cleveland',
          'Ohio',
          'United States',
        ],
        telephone: '+1-216-xxx-xxxx',
        email: 'ray@example.com',
        priceRange: '$$',
        serviceType: [
          'WordPress Development',
          'Website Maintenance',
          'Web Design',
          'Full Stack Development',
        ],
        sameAs: [
          'https://linkedin.com/in/rayturk',
          'https://twitter.com/rayturk',
          'https://github.com/rayturk',
        ],
      },
    ],
  }
}

export default async function HomePage() {
  // Fetch data in parallel
  const [
    featuredProjects,
    featuredServices,
    featuredTestimonials,
    recentPosts,
    siteSettings,
  ] = await Promise.all([
    getFeaturedProjects().catch(() => []),
    getFeaturedServices().catch(() => []),
    getFeaturedTestimonials().catch(() => []),
    getRecentPosts().catch(() => []),
    getSiteSettings().catch(() => null),
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSchema()),
        }}
      />

      <Suspense fallback={<HeroSkeleton />}>
        <Hero settings={siteSettings} />
      </Suspense>

      <SkillsMarquee />

      <Suspense fallback={<ProjectsSkeleton />}>
        <FeaturedProjects projects={featuredProjects} />
      </Suspense>

      <ServicesOverview services={featuredServices} />

      <MaintenanceCTA />

      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsSlider testimonials={featuredTestimonials} />
      </Suspense>

      <Suspense fallback={<BlogSkeleton />}>
        <BlogPreview posts={recentPosts} />
      </Suspense>

      <ContactCTA />
    </>
  )
}
