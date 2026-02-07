/**
 * WordPress GraphQL TypeScript Types
 * Comprehensive type definitions for all WordPress content types
 */

// ============================================================================
// MEDIA TYPES
// ============================================================================

export interface WPImage {
  sourceUrl: string;
  altText: string;
  mediaDetails: {
    width: number;
    height: number;
  };
  sizes?: string;
  srcSet?: string;
}

// ============================================================================
// SEO TYPES
// ============================================================================

export interface SEOFields {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

// ============================================================================
// TAXONOMY TYPES
// ============================================================================

export interface TaxonomyTerm {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  count?: number;
  description?: string;
}

// ============================================================================
// AUTHOR TYPES
// ============================================================================

export interface Author {
  name: string;
  slug: string;
  avatar?: { url: string };
  description?: string;
}

// ============================================================================
// PROJECT TYPES
// ============================================================================

export interface Project {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  featuredImage?: { node: WPImage };
  projectFields: {
    liveUrl?: string;
    githubUrl?: string;
    iframeEmbedUrl?: string;
    projectGif?: { url: string; mimeType: string };
    projectGallery?: WPImage[];
    projectColor?: string;
    clientName?: string;
    projectDate?: string;
    projectDuration?: string;
    isFeatured: boolean;
    projectOrder: number;
    projectTestimonial?: string;
    testimonialAuthor?: string;
    testimonialRole?: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
  };
  projectTypes?: { nodes: TaxonomyTerm[] };
  techStacks?: { nodes: TaxonomyTerm[] };
  projectStatuses?: { nodes: TaxonomyTerm[] };
}

export type ProjectConnection = Connection<Project>;

// ============================================================================
// BLOG POST TYPES
// ============================================================================

export interface BlogPost {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  author: { node: Author };
  featuredImage?: { node: WPImage };
  categories?: { nodes: TaxonomyTerm[] };
  tags?: { nodes: TaxonomyTerm[] };
  blogFields: {
    readingTimeOverride?: number;
    postSubtitle?: string;
    showToc: boolean;
    relatedPosts?: BlogPost[];
    ctaText?: string;
    ctaUrl?: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
  };
  readingTime?: number;
}

export type BlogPostConnection = Connection<BlogPost>;

// ============================================================================
// SERVICE TYPES
// ============================================================================

export interface Service {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: { node: WPImage };
  serviceFields: {
    serviceIcon?: string;
    serviceFeatures?: { featureText: string }[];
    servicePricingText?: string;
    serviceCtaText?: string;
    serviceCtaUrl?: string;
    isFeaturedService: boolean;
    serviceOrder: number;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
  };
}

export type ServiceConnection = Connection<Service>;

// ============================================================================
// TESTIMONIAL TYPES
// ============================================================================

export interface Testimonial {
  id: string;
  databaseId: number;
  title: string;
  content: string;
  testimonialFields: {
    testimonialAuthorName?: string;
    testimonialAuthorRole?: string;
    testimonialCompany?: string;
    testimonialCompanyUrl?: string;
    testimonialRating?: number;
    isFeaturedTestimonial: boolean;
  };
  featuredImage?: { node: WPImage };
}

export type TestimonialConnection = Connection<Testimonial>;

// ============================================================================
// MENU TYPES
// ============================================================================

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  path: string;
  target?: string;
  parentId?: string;
  childItems?: { nodes: MenuItem[] };
  cssClasses?: string[];
}

// ============================================================================
// SITE SETTINGS TYPES
// ============================================================================

export interface SiteSettings {
  headerSettings: {
    headerCtaText: string;
    headerCtaUrl: string;
    announcementBarText?: string;
    announcementBarActive: boolean;
  };
  footerSettings: {
    footerTagline?: string;
    socialLinks?: { platform: string; url: string }[];
    footerCtaHeading: string;
    footerCtaText: string;
    footerCtaUrl: string;
  };
  homepageSettings: {
    heroHeading: string;
    heroSubheading?: string;
    heroCtaPrimaryText: string;
    heroCtaPrimaryUrl: string;
    heroCtaSecondaryText: string;
    heroCtaSecondaryUrl: string;
    stats?: { statNumber: string; statLabel: string }[];
    maintenanceSectionHeading: string;
    maintenanceSectionText?: string;
    maintenanceFeatures?: {
      featureIcon: string;
      featureTitle: string;
      featureDescription: string;
    }[];
  };
  seoDefaults: {
    defaultOgImage?: WPImage;
    googleSiteVerification?: string;
    schemaOrgType: 'Person' | 'Organization';
    schemaSameAs?: { profileUrl: string }[];
    localBusinessName: string;
    localBusinessCity: string;
    localBusinessState: string;
    localBusinessPhone?: string;
    localBusinessEmail?: string;
  };
}

// ============================================================================
// PAGINATION TYPES
// ============================================================================

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface Connection<T> {
  nodes: T[];
  pageInfo: PageInfo;
}

// ============================================================================
// SEARCH & FILTER TYPES
// ============================================================================

export interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  type: 'project' | 'post' | 'service' | 'page';
}

export interface FilterOptions {
  projectTypes?: string[];
  techStacks?: string[];
  categories?: string[];
  tags?: string[];
  dateRange?: {
    from?: string;
    to?: string;
  };
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface APIResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    extensions?: Record<string, any>;
  }>;
}

export interface APIError {
  message: string;
  status: number;
  code?: string;
}
