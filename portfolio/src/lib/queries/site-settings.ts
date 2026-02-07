/**
 * GraphQL Queries for Site Settings and Menus
 */

import { gql } from '@apollo/client';
import { IMAGE_FRAGMENT, MENU_ITEM_FRAGMENT } from './fragments';

// ============================================================================
// GET SITE SETTINGS (ACF Options Pages)
// ============================================================================

export const GET_SITE_SETTINGS = gql`
  query GetSiteSettings {
    siteSettings: settingsOptions {
      headerSettings: headerSettings {
        headerCtaText
        headerCtaUrl
        announcementBarText
        announcementBarActive
      }
      footerSettings: footerSettings {
        footerTagline
        socialLinks {
          platform
          url
        }
        footerCtaHeading
        footerCtaText
        footerCtaUrl
      }
      homepageSettings: homepageSettings {
        heroHeading
        heroSubheading
        heroCtaPrimaryText
        heroCtaPrimaryUrl
        heroCtaSecondaryText
        heroCtaSecondaryUrl
        stats {
          statNumber
          statLabel
        }
        maintenanceSectionHeading
        maintenanceSectionText
        maintenanceFeatures {
          featureIcon
          featureTitle
          featureDescription
        }
      }
      seoDefaults: seoDefaults {
        defaultOgImage {
          ...ImageFragment
        }
        googleSiteVerification
        schemaOrgType
        schemaSameAs {
          profileUrl
        }
        localBusinessName
        localBusinessCity
        localBusinessState
        localBusinessPhone
        localBusinessEmail
      }
    }
  }
  ${IMAGE_FRAGMENT}
`;

// ============================================================================
// GET GENERAL SETTINGS
// ============================================================================

export const GET_GENERAL_SETTINGS = gql`
  query GetGeneralSettings {
    generalSettings {
      title
      description
      url
      language
      timezone
    }
  }
`;

// ============================================================================
// GET READING SETTINGS
// ============================================================================

export const GET_READING_SETTINGS = gql`
  query GetReadingSettings {
    readingSettings {
      postsPerPage
    }
  }
`;

// ============================================================================
// GET PRIMARY MENU
// ============================================================================

export const GET_PRIMARY_MENU = gql`
  query GetPrimaryMenu {
    menu(id: "PRIMARY", idType: LOCATION) {
      menuItems(first: 100) {
        nodes {
          ...MenuItemFragment
        }
      }
    }
  }
  ${MENU_ITEM_FRAGMENT}
`;

// ============================================================================
// GET FOOTER MENU
// ============================================================================

export const GET_FOOTER_MENU = gql`
  query GetFooterMenu {
    menu(id: "FOOTER", idType: LOCATION) {
      menuItems(first: 100) {
        nodes {
          ...MenuItemFragment
        }
      }
    }
  }
  ${MENU_ITEM_FRAGMENT}
`;

// ============================================================================
// GET MENU BY LOCATION
// ============================================================================

export const GET_MENU_BY_LOCATION = gql`
  query GetMenuByLocation($location: MenuLocationEnum!) {
    menu(id: $location, idType: LOCATION) {
      menuItems(first: 100) {
        nodes {
          ...MenuItemFragment
        }
      }
    }
  }
  ${MENU_ITEM_FRAGMENT}
`;

// ============================================================================
// GET ALL MENUS
// ============================================================================

export const GET_ALL_MENUS = gql`
  query GetAllMenus {
    primary: menu(id: "PRIMARY", idType: LOCATION) {
      menuItems(first: 100) {
        nodes {
          ...MenuItemFragment
        }
      }
    }
    footer: menu(id: "FOOTER", idType: LOCATION) {
      menuItems(first: 100) {
        nodes {
          ...MenuItemFragment
        }
      }
    }
    secondary: menu(id: "SECONDARY", idType: LOCATION) {
      menuItems(first: 100) {
        nodes {
          ...MenuItemFragment
        }
      }
    }
  }
  ${MENU_ITEM_FRAGMENT}
`;

// ============================================================================
// GET SITE INFO (for SEO/Headers)
// ============================================================================

export const GET_SITE_INFO = gql`
  query GetSiteInfo {
    generalSettings {
      title
      description
      url
    }
    siteSettings: settingsOptions {
      seoDefaults: seoDefaults {
        defaultOgImage {
          ...ImageFragment
        }
        googleSiteVerification
        schemaOrgType
        schemaSameAs {
          profileUrl
        }
        localBusinessName
        localBusinessCity
        localBusinessState
        localBusinessPhone
        localBusinessEmail
      }
    }
  }
  ${IMAGE_FRAGMENT}
`;

// ============================================================================
// GET HEADER SETTINGS
// ============================================================================

export const GET_HEADER_SETTINGS = gql`
  query GetHeaderSettings {
    headerSettings: settingsOptions {
      headerSettings: headerSettings {
        headerCtaText
        headerCtaUrl
        announcementBarText
        announcementBarActive
      }
    }
    primaryMenu: menu(id: "PRIMARY", idType: LOCATION) {
      menuItems(first: 100) {
        nodes {
          ...MenuItemFragment
        }
      }
    }
  }
  ${MENU_ITEM_FRAGMENT}
`;

// ============================================================================
// GET FOOTER SETTINGS
// ============================================================================

export const GET_FOOTER_SETTINGS = gql`
  query GetFooterSettings {
    footerSettings: settingsOptions {
      footerSettings: footerSettings {
        footerTagline
        socialLinks {
          platform
          url
        }
        footerCtaHeading
        footerCtaText
        footerCtaUrl
      }
    }
    footerMenu: menu(id: "FOOTER", idType: LOCATION) {
      menuItems(first: 100) {
        nodes {
          ...MenuItemFragment
        }
      }
    }
  }
  ${MENU_ITEM_FRAGMENT}
`;
