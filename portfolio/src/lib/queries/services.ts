/**
 * GraphQL Queries for Services
 */

import { gql } from '@apollo/client';
import {
  SERVICE_FRAGMENT,
  SERVICE_FRAGMENT_MINIMAL,
} from './fragments';

// ============================================================================
// GET ALL SERVICES
// ============================================================================

export const GET_ALL_SERVICES = gql`
  query GetAllServices($first: Int = 100) {
    services(
      first: $first
      where: { status: PUBLISH, orderby: { field: MENU_ORDER, order: ASC } }
    ) {
      nodes {
        ...ServiceFragment
      }
    }
  }
  ${SERVICE_FRAGMENT}
`;

// ============================================================================
// GET SERVICE BY SLUG
// ============================================================================

export const GET_SERVICE_BY_SLUG = gql`
  query GetServiceBySlug($slug: String!) {
    service(id: $slug, idType: SLUG) {
      ...ServiceFragment
    }
  }
  ${SERVICE_FRAGMENT}
`;

// ============================================================================
// GET FEATURED SERVICES
// ============================================================================

export const GET_FEATURED_SERVICES = gql`
  query GetFeaturedServices($first: Int = 3) {
    services(
      first: $first
      where: {
        status: PUBLISH
        metaKey: "serviceFields_isFeaturedService"
        metaValue: "1"
        orderby: [{ field: META, key: "serviceFields_serviceOrder", order: ASC }]
      }
    ) {
      nodes {
        ...ServiceFragmentMinimal
      }
    }
  }
  ${SERVICE_FRAGMENT_MINIMAL}
`;

// ============================================================================
// GET ALL SERVICE SLUGS (for generateStaticParams)
// ============================================================================

export const GET_ALL_SERVICE_SLUGS = gql`
  query GetAllServiceSlugs {
    services(first: 100, where: { status: PUBLISH }) {
      nodes {
        slug
      }
    }
  }
`;

// ============================================================================
// GET SERVICES COUNT
// ============================================================================

export const GET_SERVICES_COUNT = gql`
  query GetServicesCount {
    services(where: { status: PUBLISH }) {
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
`;

// ============================================================================
// SEARCH SERVICES
// ============================================================================

export const SEARCH_SERVICES = gql`
  query SearchServices($search: String!, $first: Int = 10) {
    services(first: $first, where: { search: $search, status: PUBLISH }) {
      nodes {
        id
        databaseId
        title
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        serviceFields {
          serviceIcon
          isFeaturedService
        }
      }
    }
  }
`;
