/**
 * Apollo Client Configuration
 * Singleton instance for GraphQL operations in SSG/SSR
 */

import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from '@apollo/client';

// Singleton pattern for SSG
let client: ApolloClient<NormalizedCacheObject> | null = null;

/**
 * Creates a new Apollo Client instance
 */
function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  if (!process.env.WORDPRESS_GRAPHQL_ENDPOINT) {
    throw new Error('WORDPRESS_GRAPHQL_ENDPOINT environment variable is not set');
  }

  const httpLink = new HttpLink({
    uri: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
    credentials: 'same-origin',
    headers: {
      // Add authorization header if using preview mode
      ...(process.env.WORDPRESS_AUTH_BEARER && {
        Authorization: `Bearer ${process.env.WORDPRESS_AUTH_BEARER}`,
      }),
    },
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              keyArgs: ['first', 'after', 'where'],
              merge(existing, incoming, { args }) {
                if (!existing) return incoming;

                // Handle pagination
                if (args?.after) {
                  return {
                    ...incoming,
                    nodes: [...(existing.nodes || []), ...(incoming.nodes || [])],
                  };
                }

                return incoming;
              },
            },
            projects: {
              keyArgs: ['first', 'after', 'where'],
              merge(existing, incoming, { args }) {
                if (!existing) return incoming;

                if (args?.after) {
                  return {
                    ...incoming,
                    nodes: [...(existing.nodes || []), ...(incoming.nodes || [])],
                  };
                }

                return incoming;
              },
            },
          },
        },
      },
    }),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache', // Always fresh data for SSG
      },
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
    },
  });
}

/**
 * Gets or creates the Apollo Client singleton
 */
export function getApolloClient(): ApolloClient<NormalizedCacheObject> {
  if (!client) {
    client = createApolloClient();
  }
  return client;
}

/**
 * Reset the client (useful for testing)
 */
export function resetApolloClient(): void {
  client = null;
}
