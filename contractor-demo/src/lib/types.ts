/**
 * Type definitions for Summit HVAC & Plumbing
 *
 * Structured to mirror WPGraphQL response shapes so the mock data
 * in data.ts can be swapped for real GraphQL queries with no component changes.
 */

// ============================================================================
// SERVICE
// ============================================================================

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ContractorService {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string; // Lucide icon name (kebab-case)
  accentColor: string; // Tailwind color class for icon bg
  features: string[];
  processSteps: ServiceProcessStep[];
  faqs: ServiceFaq[];
  startingPrice?: string;
  emergencyAvailable: boolean;
}

// ============================================================================
// TESTIMONIAL
// ============================================================================

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number; // 1–5
  quote: string;
  service: string;
  date: string;
}

// ============================================================================
// TEAM MEMBER
// ============================================================================

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  certifications: string[];
}

// ============================================================================
// STATS / TRUST SIGNALS
// ============================================================================

export interface Stat {
  value: string;
  label: string;
  description?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  icon: string;
}

// ============================================================================
// SERVICE AREA
// ============================================================================

export interface ServiceArea {
  city: string;
  county: string;
}

// ============================================================================
// SITE CONFIG
// ============================================================================

export interface SiteConfig {
  companyName: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  address: string;
  licenseNumber: string;
  yearsInBusiness: number;
  serviceRadius: string;
}
