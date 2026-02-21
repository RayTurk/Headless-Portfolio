// ============================================================================
// TYPES — Revive Auto Detailing
// ============================================================================

export interface SiteConfig {
  businessName: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  address: string;
  yearsInBusiness: number;
  serviceAreas: string[];
}

export interface DetailingService {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  accentColor: string;
  features: string[];
  startingPrice: string;
  duration: string;
}

export interface Package {
  id: string;
  name: string;
  tagline: string;
  price: number;
  duration: string;
  includes: string[];
  highlighted: boolean;
  ctaLabel: string;
}

export interface Testimonial {
  id: string;
  name: string;
  vehicle: string;
  rating: number;
  quote: string;
  serviceReceived: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  certifications: string[];
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}
