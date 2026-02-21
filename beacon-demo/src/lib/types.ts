/**
 * Type definitions for Beacon uptime monitoring SaaS
 *
 * Structured to mirror WPGraphQL response shapes so mock data
 * in data.ts can be swapped for real GraphQL queries with no component changes.
 */

// ============================================================================
// FEATURE
// ============================================================================

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name (kebab-case)
  category: 'monitoring' | 'alerting' | 'reporting' | 'infrastructure';
}

// ============================================================================
// PRICING TIER
// ============================================================================

export interface PricingFeature {
  label: string;
  included: boolean;
  note?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number | null; // null = free
  annualPrice: number | null;  // null = free
  monitors: string;
  checkInterval: string;
  features: PricingFeature[];
  highlighted: boolean;
  ctaLabel: string;
  ctaHref: string;
}

// ============================================================================
// TESTIMONIAL
// ============================================================================

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  quote: string;
  avatar?: string;
}

// ============================================================================
// INTEGRATION
// ============================================================================

export interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
}

// ============================================================================
// TEAM MEMBER
// ============================================================================

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
}

// ============================================================================
// HOW IT WORKS STEP
// ============================================================================

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

// ============================================================================
// SITE CONFIG
// ============================================================================

export interface SiteConfig {
  productName: string;
  tagline: string;
  email: string;
  twitterHandle: string;
  githubOrg: string;
  statusPageUrl: string;
  locations: string[];
}
