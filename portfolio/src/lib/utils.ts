/**
 * Utility Functions
 * Reusable helpers across the application
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as LucideIcons from 'lucide-react';

// ============================================================================
// TAILWIND CLASS UTILITIES
// ============================================================================

/**
 * Merges Tailwind CSS classes with proper precedence
 * Uses clsx for conditional classes and tailwind-merge to handle conflicts
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ============================================================================
// TEXT FORMATTING UTILITIES
// ============================================================================

/**
 * Format a date string from WordPress
 * @param dateString - ISO date string from WordPress
 * @param format - 'short' | 'long' | 'full' (default: 'long')
 */
export function formatDate(
  dateString: string,
  format: 'short' | 'long' | 'full' = 'long'
): string {
  const date = new Date(dateString);

  const formatMap: Record<string, Intl.DateTimeFormatOptions> = {
    short: { month: '2-digit', day: '2-digit', year: '2-digit' },
    long: { month: 'long', day: 'numeric', year: 'numeric' },
    full: {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    },
  };
  const options = formatMap[format] || formatMap.long;

  return date.toLocaleDateString('en-US', options);
}

/**
 * Format a date string relative to now (e.g., "2 days ago")
 */
export function formatDateRelative(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)}w ago`;

  return formatDate(dateString, 'short');
}

/**
 * Truncate text to a maximum length and add ellipsis
 */
export function truncateText(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Strip HTML tags from a string
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .trim();
}

/**
 * Get excerpt from HTML content
 * Strips HTML tags and truncates to specified length
 */
export function getExcerpt(content: string, length: number = 160): string {
  const plain = stripHtml(content);
  return truncateText(plain, length);
}

/**
 * Convert text to a URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '') // Remove special characters
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Capitalize first letter of a string
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert camelCase to title case
 */
export function camelCaseToTitle(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
}

// ============================================================================
// READING TIME UTILITIES
// ============================================================================

/**
 * Calculate reading time for content
 * Based on average reading speed of 200 words per minute
 */
export function getReadingTime(content: string): number {
  const plainText = stripHtml(content);
  const words = plainText.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return Math.max(1, minutes);
}

/**
 * Get reading time as formatted string
 */
export function getReadingTimeString(content: string): string {
  const minutes = getReadingTime(content);
  if (minutes === 1) return '1 min read';
  return `${minutes} min read`;
}

// ============================================================================
// URL UTILITIES
// ============================================================================

/**
 * Create an absolute URL from a relative path
 */
export function absoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  if (path.startsWith('http')) return path;
  return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
}

/**
 * Check if a URL is external
 */
export function isExternalUrl(url: string): boolean {
  if (!url) return false;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    const urlHost = new URL(url).hostname;
    const currentHost = new URL(
      process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    ).hostname;
    return urlHost !== currentHost;
  }
  return false;
}

/**
 * Get domain from URL
 */
export function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return '';
  }
}

// ============================================================================
// BREADCRUMB UTILITIES
// ============================================================================

export interface Breadcrumb {
  label: string;
  href: string;
}

/**
 * Generate breadcrumbs from a path
 */
export function generateBreadcrumbs(path: string): Breadcrumb[] {
  const breadcrumbs: Breadcrumb[] = [
    {
      label: 'Home',
      href: '/',
    },
  ];

  const segments = path.split('/').filter(Boolean);

  segments.forEach((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = capitalize(segment.replace(/-/g, ' '));

    breadcrumbs.push({
      label,
      href,
    });
  });

  return breadcrumbs;
}

// ============================================================================
// OBJECT/ARRAY UTILITIES
// ============================================================================

/**
 * Deep merge two objects
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T {
  const result = { ...target };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = result[key];

      if (
        sourceValue &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue)
      ) {
        result[key] = deepMerge(
          targetValue && typeof targetValue === 'object'
            ? targetValue
            : ({} as any),
          sourceValue
        );
      } else {
        result[key] = sourceValue as any;
      }
    }
  }

  return result;
}

/**
 * Remove falsy values from an object
 */
export function removeEmpty<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null && v !== '')
  ) as Partial<T>;
}

/**
 * Group array items by a key
 */
export function groupBy<T, K extends PropertyKey>(
  items: T[],
  key: (item: T) => K
): Record<K, T[]> {
  return items.reduce(
    (groups, item) => {
      const groupKey = key(item);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    },
    {} as Record<K, T[]>
  );
}

/**
 * Flatten an array of arrays
 */
export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((flat, item) => flat.concat(item), []);
}

/**
 * Unique items from array
 */
export function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

/**
 * Chunk an array into smaller arrays
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Check if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if URL is valid
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// ============================================================================
// DELAY UTILITIES
// ============================================================================

/**
 * Delay execution for specified milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Create a debounced version of a function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Create a throttled version of a function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ============================================================================
// ICON UTILITIES
// ============================================================================

/**
 * Get a Lucide React icon component by name
 * Converts kebab-case names to PascalCase
 */
export function getLucideIcon(iconName?: string): React.ComponentType<any> | null {
  if (!iconName) return null;

  // Convert kebab-case to PascalCase
  const pascalCase = iconName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  const icon = (LucideIcons as any)[pascalCase];
  return icon || null;
}
