export interface SiteConfig {
  businessName: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  address: string;
  hours: { day: string; hours: string }[];
  founded: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  productCount: number;
  imageSrc: string | null;
  imageAlt: string;
  accentColor: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  unit: string;
  rating: number;
  reviewCount: number;
  badge?: 'new' | 'sale' | 'bestseller' | 'seasonal';
  imageSrc: string | null;
  imageAlt: string;
  inStock: boolean;
  stockNote?: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  context: string;
}
