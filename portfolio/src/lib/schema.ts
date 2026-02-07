/**
 * JSON-LD Schema Generators
 * Structured data for enhanced search engine visibility
 */

import { SITE_URL, SITE_NAME } from './constants';

// ============================================================================
// PERSON / ORGANIZATION SCHEMA
// ============================================================================

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ray Turk',
    jobTitle: 'WordPress & Full Stack Developer',
    url: SITE_URL,
    sameAs: [
      'https://github.com/rayturk',
      'https://linkedin.com/in/rayturk',
      'https://twitter.com/rayturk',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cleveland',
      addressRegion: 'OH',
      addressCountry: 'US',
    },
    knowsAbout: [
      'WordPress',
      'Web Development',
      'PHP',
      'React',
      'Next.js',
      'JavaScript',
      'TypeScript',
      'Website Maintenance',
      'Web Hosting',
      'SEO',
    ],
    description:
      'Cleveland-based WordPress & Full Stack Developer specializing in web maintenance, hosting, updates, and custom website builds.',
  };
}

// ============================================================================
// LOCAL BUSINESS SCHEMA
// ============================================================================

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Ray Turk Web Development',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description:
      'Professional WordPress development, maintenance, hosting, and support services in Cleveland, Ohio.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cleveland',
      addressRegion: 'OH',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.4993,
      longitude: -81.6944,
    },
    areaServed: [
      { '@type': 'City', name: 'Cleveland' },
      { '@type': 'State', name: 'Ohio' },
      { '@type': 'Country', name: 'United States' },
    ],
    serviceType: [
      'WordPress Development',
      'WordPress Maintenance',
      'Web Hosting',
      'Website Updates',
      'Custom Web Development',
    ],
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-17:00',
    founder: {
      '@type': 'Person',
      name: 'Ray Turk',
    },
  };
}

// ============================================================================
// WEBSITE SCHEMA
// ============================================================================

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Portfolio and services of Ray Turk, Cleveland WordPress & Full Stack Developer.',
    author: {
      '@type': 'Person',
      name: 'Ray Turk',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ============================================================================
// SERVICE SCHEMA
// ============================================================================

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  price?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      '@type': 'Person',
      name: 'Ray Turk',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    ...(service.price && {
      offers: {
        '@type': 'Offer',
        price: service.price,
        priceCurrency: 'USD',
      },
    }),
  };
}

// ============================================================================
// BLOG POSTING SCHEMA
// ============================================================================

export function generateBlogPostingSchema(post: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  author?: string;
  image?: string;
  wordCount?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: post.url,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      '@type': 'Person',
      name: post.author || 'Ray Turk',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Ray Turk',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.url,
    },
    ...(post.image && {
      image: {
        '@type': 'ImageObject',
        url: post.image,
      },
    }),
    ...(post.wordCount && { wordCount: post.wordCount }),
  };
}

// ============================================================================
// CREATIVE WORK / PROJECT SCHEMA
// ============================================================================

export function generateProjectSchema(project: {
  name: string;
  description: string;
  url: string;
  image?: string;
  dateCreated?: string;
  technologies?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.description,
    url: project.url,
    creator: {
      '@type': 'Person',
      name: 'Ray Turk',
      url: SITE_URL,
    },
    ...(project.image && {
      image: {
        '@type': 'ImageObject',
        url: project.image,
      },
    }),
    ...(project.dateCreated && { dateCreated: project.dateCreated }),
    ...(project.technologies && {
      keywords: project.technologies.join(', '),
    }),
  };
}

// ============================================================================
// BREADCRUMB SCHEMA
// ============================================================================

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

// ============================================================================
// FAQ SCHEMA
// ============================================================================

export function generateFAQSchema(
  items: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

// ============================================================================
// AGGREGATE RATING SCHEMA
// ============================================================================

export function generateAggregateRatingSchema(
  rating: number,
  count: number
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: rating,
    reviewCount: count,
    bestRating: 5,
    worstRating: 1,
  };
}
