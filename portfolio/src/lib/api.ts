/**
 * High-level API Functions
 * Wraps Apollo queries and provides typed data
 */

import { getApolloClient } from './graphql-client';
import {
  GET_ALL_PROJECTS,
  GET_PROJECT_BY_SLUG,
  GET_FEATURED_PROJECTS,
  GET_ALL_PROJECT_SLUGS,
  GET_PROJECTS_BY_TYPE,
  GET_PROJECTS_BY_TECH_STACK,
  GET_ALL_POSTS,
  GET_POST_BY_SLUG,
  GET_RECENT_POSTS,
  GET_ALL_POST_SLUGS,
  GET_POSTS_BY_CATEGORY,
  GET_POSTS_BY_TAG,
  GET_RELATED_POSTS,
  GET_ALL_SERVICES,
  GET_SERVICE_BY_SLUG,
  GET_FEATURED_SERVICES,
  GET_ALL_SERVICE_SLUGS,
  GET_ALL_TESTIMONIALS,
  GET_FEATURED_TESTIMONIALS,
  GET_SITE_SETTINGS,
  GET_PRIMARY_MENU,
  GET_FOOTER_MENU,
  GET_MENU_BY_LOCATION,
  GET_SITE_INFO,
} from './queries';

import {
  Project,
  BlogPost,
  Service,
  Testimonial,
  MenuItem,
  SiteSettings,
  TaxonomyTerm,
  PageInfo,
  APIError,
} from '@/types/wordpress';
import { FEATURED_PROJECTS_COUNT, RECENT_POSTS_COUNT } from './constants';

// ============================================================================
// ERROR HANDLING
// ============================================================================

/**
 * Handle GraphQL errors
 */
function handleError(error: any): APIError {
  if (error.networkError) {
    return {
      message: 'Network error. Please try again later.',
      status: 500,
      code: 'NETWORK_ERROR',
    };
  }

  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    return {
      message: error.graphQLErrors[0].message,
      status: 400,
      code: 'GRAPHQL_ERROR',
    };
  }

  return {
    message: 'An unexpected error occurred',
    status: 500,
    code: 'UNKNOWN_ERROR',
  };
}

/**
 * Check for errors in GraphQL response
 */
function checkForErrors(data: any): void {
  if (data.errors && data.errors.length > 0) {
    throw handleError(data);
  }
}

// ============================================================================
// PROJECT API FUNCTIONS
// ============================================================================

/**
 * Get all projects with pagination
 */
export async function getAllProjects(
  first: number = 100,
  after?: string
): Promise<{ projects: Project[]; pageInfo: PageInfo }> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_ALL_PROJECTS,
      variables: { first, after },
    });

    checkForErrors(data);

    return {
      projects: data.projects?.nodes || [],
      pageInfo: data.projects?.pageInfo || {
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  } catch (error) {
    console.error('Error fetching all projects:', error);
    return {
      projects: [],
      pageInfo: { hasNextPage: false, hasPreviousPage: false },
    };
  }
}

/**
 * Get a single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_PROJECT_BY_SLUG,
      variables: { slug },
    });

    checkForErrors(data);

    return data.project || null;
  } catch (error) {
    console.error(`Error fetching project with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Get featured projects
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_FEATURED_PROJECTS,
      variables: { first: FEATURED_PROJECTS_COUNT },
    });

    checkForErrors(data);

    return data.projects?.nodes || [];
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}

/**
 * Get all project slugs for static generation
 */
export async function getAllProjectSlugs(): Promise<string[]> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_ALL_PROJECT_SLUGS,
    });

    checkForErrors(data);

    return data.projects?.nodes?.map((p: Project) => p.slug) || [];
  } catch (error) {
    console.error('Error fetching project slugs:', error);
    return [];
  }
}

/**
 * Get projects by type (taxonomy)
 */
export async function getProjectsByType(
  typeSlug: string,
  first: number = 12
): Promise<{ projects: Project[]; pageInfo: PageInfo }> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_PROJECTS_BY_TYPE,
      variables: { typeSlug, first },
    });

    checkForErrors(data);

    return {
      projects: data.projects?.nodes || [],
      pageInfo: data.projects?.pageInfo || {
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  } catch (error) {
    console.error(`Error fetching projects by type ${typeSlug}:`, error);
    return {
      projects: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
}

/**
 * Get projects by tech stack
 */
export async function getProjectsByTechStack(
  techSlug: string,
  first: number = 12
): Promise<{ projects: Project[]; pageInfo: PageInfo }> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_PROJECTS_BY_TECH_STACK,
      variables: { techSlug, first },
    });

    checkForErrors(data);

    return {
      projects: data.projects?.nodes || [],
      pageInfo: data.projects?.pageInfo || {
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  } catch (error) {
    console.error(`Error fetching projects by tech stack ${techSlug}:`, error);
    return {
      projects: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
}

/**
 * Get related projects by taxonomy
 */
export async function getRelatedProjects(
  projectId: string | number,
  typeId?: string | number,
  first: number = 3
): Promise<Project[]> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_ALL_PROJECTS,
      variables: { first: first + 1 },
    });

    checkForErrors(data);

    const projects = data.projects?.nodes || [];
    // Filter out current project and limit to first N
    return projects
      .filter((p: Project) => p.id !== projectId)
      .slice(0, first);
  } catch (error) {
    console.error(`Error fetching related projects:`, error);
    return [];
  }
}

// ============================================================================
// BLOG POST API FUNCTIONS
// ============================================================================

/**
 * Get all posts with pagination
 */
export async function getAllPosts(
  first: number = 10,
  after?: string
): Promise<{ posts: BlogPost[]; pageInfo: PageInfo }> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_ALL_POSTS,
      variables: { first, after },
    });

    checkForErrors(data);

    return {
      posts: data.posts?.nodes || [],
      pageInfo: data.posts?.pageInfo || {
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return {
      posts: [],
      pageInfo: { hasNextPage: false, hasPreviousPage: false },
    };
  }
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_POST_BY_SLUG,
      variables: { slug },
    });

    checkForErrors(data);

    return data.post || null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Get recent posts
 */
export async function getRecentPosts(count: number = RECENT_POSTS_COUNT): Promise<BlogPost[]> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_RECENT_POSTS,
      variables: { count },
    });

    checkForErrors(data);

    return data.posts?.nodes || [];
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return [];
  }
}

/**
 * Get all post slugs for static generation
 */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_ALL_POST_SLUGS,
    });

    checkForErrors(data);

    return data.posts?.nodes?.map((p: BlogPost) => p.slug) || [];
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(
  categorySlug: string,
  first: number = 10
): Promise<{ posts: BlogPost[]; pageInfo: PageInfo }> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_POSTS_BY_CATEGORY,
      variables: { categorySlug, first },
    });

    checkForErrors(data);

    return {
      posts: data.posts?.nodes || [],
      pageInfo: data.posts?.pageInfo || {
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  } catch (error) {
    console.error(`Error fetching posts by category ${categorySlug}:`, error);
    return {
      posts: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(
  tagSlug: string,
  first: number = 10
): Promise<{ posts: BlogPost[]; pageInfo: PageInfo }> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_POSTS_BY_TAG,
      variables: { tagSlug, first },
    });

    checkForErrors(data);

    return {
      posts: data.posts?.nodes || [],
      pageInfo: data.posts?.pageInfo || {
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  } catch (error) {
    console.error(`Error fetching posts by tag ${tagSlug}:`, error);
    return {
      posts: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
}

/**
 * Get related posts
 */
export async function getRelatedPosts(
  categoryIds: string[],
  currentPostId: string,
  first: number = 3
): Promise<BlogPost[]> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_RELATED_POSTS,
      variables: { categoryIds, currentPostId, first },
    });

    checkForErrors(data);

    return data.posts?.nodes || [];
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

// ============================================================================
// SERVICE API FUNCTIONS
// ============================================================================

/**
 * Get all services
 */
export async function getAllServices(): Promise<Service[]> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_ALL_SERVICES,
      variables: { first: 100 },
    });

    checkForErrors(data);

    return data.services?.nodes || [];
  } catch (error) {
    console.error('Error fetching all services:', error);
    return [];
  }
}

/**
 * Get a single service by slug
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_SERVICE_BY_SLUG,
      variables: { slug },
    });

    checkForErrors(data);

    return data.service || null;
  } catch (error) {
    console.error(`Error fetching service with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Get featured services
 */
export async function getFeaturedServices(): Promise<Service[]> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_FEATURED_SERVICES,
      variables: { first: 3 },
    });

    checkForErrors(data);

    return data.services?.nodes || [];
  } catch (error) {
    console.error('Error fetching featured services:', error);
    return [];
  }
}

/**
 * Get all service slugs for static generation
 */
export async function getAllServiceSlugs(): Promise<string[]> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_ALL_SERVICE_SLUGS,
    });

    checkForErrors(data);

    return data.services?.nodes?.map((s: Service) => s.slug) || [];
  } catch (error) {
    console.error('Error fetching service slugs:', error);
    return [];
  }
}

// ============================================================================
// TESTIMONIAL API FUNCTIONS
// ============================================================================

/**
 * Get all testimonials
 */
export async function getAllTestimonials(): Promise<Testimonial[]> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_ALL_TESTIMONIALS,
      variables: { first: 100 },
    });

    checkForErrors(data);

    return data.testimonials?.nodes || [];
  } catch (error) {
    console.error('Error fetching all testimonials:', error);
    return [];
  }
}

/**
 * Get featured testimonials
 */
export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_FEATURED_TESTIMONIALS,
      variables: { first: 6 },
    });

    checkForErrors(data);

    return data.testimonials?.nodes || [];
  } catch (error) {
    console.error('Error fetching featured testimonials:', error);
    return [];
  }
}

// ============================================================================
// SITE SETTINGS & MENU API FUNCTIONS
// ============================================================================

/**
 * Get all site settings
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_SITE_SETTINGS,
    });

    checkForErrors(data);

    return data.siteSettings || null;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

/**
 * Get primary menu
 */
export async function getPrimaryMenu(): Promise<MenuItem[]> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_PRIMARY_MENU,
    });

    checkForErrors(data);

    return data.menu?.menuItems?.nodes || [];
  } catch (error) {
    console.error('Error fetching primary menu:', error);
    return [];
  }
}

/**
 * Get footer menu
 */
export async function getFooterMenu(): Promise<MenuItem[]> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_FOOTER_MENU,
    });

    checkForErrors(data);

    return data.menu?.menuItems?.nodes || [];
  } catch (error) {
    console.error('Error fetching footer menu:', error);
    return [];
  }
}

/**
 * Get menu by location
 */
export async function getMenuByLocation(location: string): Promise<MenuItem[]> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_MENU_BY_LOCATION,
      variables: { location: location.toUpperCase() },
    });

    checkForErrors(data);

    return data.menu?.menuItems?.nodes || [];
  } catch (error) {
    console.error(`Error fetching menu at location ${location}:`, error);
    return [];
  }
}

/**
 * Get site info (for SEO and headers)
 */
export async function getSiteInfo(): Promise<{
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  siteSettings: SiteSettings | null;
} | null> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: GET_SITE_INFO,
    });

    checkForErrors(data);

    return {
      siteName: data.generalSettings?.title || '',
      siteDescription: data.generalSettings?.description || '',
      siteUrl: data.generalSettings?.url || '',
      siteSettings: data.siteSettings || null,
    };
  } catch (error) {
    console.error('Error fetching site info:', error);
    return null;
  }
}

// ============================================================================
// EXPORT ALL FUNCTIONS
// ============================================================================

export const api = {
  // Projects
  getAllProjects,
  getProjectBySlug,
  getFeaturedProjects,
  getAllProjectSlugs,
  getProjectsByType,
  getProjectsByTechStack,

  // Posts
  getAllPosts,
  getPostBySlug,
  getRecentPosts,
  getAllPostSlugs,
  getPostsByCategory,
  getPostsByTag,
  getRelatedPosts,

  // Services
  getAllServices,
  getServiceBySlug,
  getFeaturedServices,
  getAllServiceSlugs,

  // Testimonials
  getAllTestimonials,
  getFeaturedTestimonials,

  // Settings & Menus
  getSiteSettings,
  getPrimaryMenu,
  getFooterMenu,
  getMenuByLocation,
  getSiteInfo,
};
