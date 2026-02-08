/**
 * GraphQL Queries for Testimonials
 */

import { gql } from '@apollo/client';
import { TESTIMONIAL_FRAGMENT } from './fragments';

// ============================================================================
// GET ALL TESTIMONIALS
// ============================================================================

export const GET_ALL_TESTIMONIALS = gql`
  query GetAllTestimonials($first: Int = 100) {
    testimonials(first: $first, where: { status: PUBLISH }) {
      nodes {
        ...TestimonialFragment
      }
    }
  }
  ${TESTIMONIAL_FRAGMENT}
`;

// ============================================================================
// GET FEATURED TESTIMONIALS
// ============================================================================

export const GET_FEATURED_TESTIMONIALS = gql`
  query GetFeaturedTestimonials($first: Int = 100) {
    testimonials(
      first: $first
      where: {
        status: PUBLISH
      }
    ) {
      nodes {
        ...TestimonialFragment
      }
    }
  }
  ${TESTIMONIAL_FRAGMENT}
`;

// ============================================================================
// GET TESTIMONIAL BY ID
// ============================================================================

export const GET_TESTIMONIAL_BY_ID = gql`
  query GetTestimonialById($id: ID!) {
    testimonial(id: $id, idType: DATABASE_ID) {
      ...TestimonialFragment
    }
  }
  ${TESTIMONIAL_FRAGMENT}
`;

// ============================================================================
// GET TESTIMONIALS COUNT
// ============================================================================

export const GET_TESTIMONIALS_COUNT = gql`
  query GetTestimonialsCount {
    testimonials(where: { status: PUBLISH }) {
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
`;

// ============================================================================
// GET FEATURED TESTIMONIALS (with high ratings first)
// ============================================================================

export const GET_TOP_RATED_TESTIMONIALS = gql`
  query GetTopRatedTestimonials($first: Int = 100) {
    testimonials(
      first: $first
      where: {
        status: PUBLISH
      }
    ) {
      nodes {
        ...TestimonialFragment
      }
    }
  }
  ${TESTIMONIAL_FRAGMENT}
`;
