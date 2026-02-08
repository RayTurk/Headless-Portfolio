/**
 * SEO Utilities
 * Generates metadata and JSON-LD schemas for all page types
 */

import { Metadata } from 'next';
import { Project, BlogPost } from '@/types/wordpress';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, DEFAULT_OG_IMAGE } from './constants';
import { stripHtml, truncateText, absoluteUrl } from './utils';

// ============================================================================
// BASE METADATA
// ============================================================================

export function getBaseMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: 'Ray Turk | Cleveland WordPress & Full Stack Developer',
      template: '%s | Ray Turk - WordPress Developer',
    },
    description:
      'Cleveland-based WordPress & Full Stack Developer specializing in web maintenance, hosting, updates, and custom website builds. Keep your site secure, fast, and up-to-date.',
    keywords: [
      'WordPress developer Cleveland',
      'WordPress maintenance',
      'WordPress support',
      'website maintenance services',
      'WordPress hosting',
      'WordPress updates',
      'full stack developer Cleveland',
      'web developer Ohio',
      'WordPress security',
      'website maintenance plans',
      'WordPress developer near me',
      'headless WordPress',
      'Next.js developer',
      'React developer Cleveland',
      'web maintenance Cleveland',
      'WordPress care plans',
    ],
    authors: [{ name: 'Ray Turk', url: SITE_URL }],
    creator: 'Ray Turk',
    publisher: 'Ray Turk',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: SITE_URL,
      siteName: 'Ray Turk - WordPress Developer',
      title: 'Ray Turk | Cleveland WordPress & Full Stack Developer',
      description:
        'Cleveland-based WordPress & Full Stack Developer specializing in web maintenance, hosting, updates, and custom website builds.',
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: 'Ray Turk - Cleveland WordPress Developer',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Ray Turk | Cleveland WordPress & Full Stack Developer',
      description:
        'WordPress maintenance, hosting, updates, and custom builds in Cleveland, OH.',
      creator: '@rayturk',
    },
    alternates: {
      canonical: SITE_URL,
    },
  };
}

// ============================================================================
// PAGE-SPECIFIC METADATA
// ============================================================================

export function generatePageMetadata(options: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(options.path);
  const image = options.image || DEFAULT_OG_IMAGE;

  return {
    title: options.title,
    description: options.description,
    ...(options.noIndex && {
      robots: { index: false, follow: false },
    }),
    openGraph: {
      type: (options.type as any) || 'website',
      url,
      title: options.title,
      description: options.description,
      images: [{ url: image, width: 1200, height: 630, alt: options.title }],
      ...(options.publishedTime && { publishedTime: options.publishedTime }),
      ...(options.modifiedTime && { modifiedTime: options.modifiedTime }),
      ...(options.author && { authors: [options.author] }),
      ...(options.tags && { tags: options.tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title: options.title,
      description: options.description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateProjectMetadata(project: Project): Metadata {
  const description =
    project.projectInfo?.projectExcerpt ||
    truncateText(stripHtml(project.excerpt || project.content), 160);
  const title = `${project.title} - Project`;
  const image = project.featuredImage?.node?.sourceUrl || DEFAULT_OG_IMAGE;
  const techs =
    project.techStacks?.nodes?.map((t) => t.name) || [];

  return generatePageMetadata({
    title,
    description,
    path: `/projects/${project.slug}`,
    image,
    tags: techs,
  });
}

export function generatePostMetadata(post: BlogPost): Metadata {
  const description =
    post.blogFields?.seoDescription ||
    truncateText(stripHtml(post.excerpt || post.content), 160);
  const title = post.blogFields?.seoTitle || post.title;
  const image = post.featuredImage?.node?.sourceUrl || DEFAULT_OG_IMAGE;
  const tags = post.tags?.nodes?.map((t) => t.name) || [];

  return generatePageMetadata({
    title,
    description,
    path: `/blog/${post.slug}`,
    image,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.modified,
    author: post.author?.node?.name || 'Ray Turk',
    tags,
  });
}

