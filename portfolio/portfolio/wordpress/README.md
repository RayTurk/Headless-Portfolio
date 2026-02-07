# Portfolio Headless CMS Backend

Complete WordPress headless CMS setup for a portfolio site with Next.js frontend integration.

## Directory Structure

```
wordpress/
├── theme/
│   ├── style.css
│   ├── functions.php
│   └── index.php
├── plugins/
│   ├── portfolio-headless-cms/
│   │   ├── portfolio-headless-cms.php (main plugin)
│   │   ├── includes/
│   │   │   ├── class-post-types.php
│   │   │   ├── class-taxonomies.php
│   │   │   ├── class-admin-columns.php
│   │   │   └── class-headless-settings.php
│   │   ├── acf-fields/
│   │   │   ├── project-fields.php
│   │   │   ├── blog-fields.php
│   │   │   ├── service-fields.php
│   │   │   ├── testimonial-fields.php
│   │   │   └── global-options.php
│   │   └── graphql/
│   │       ├── class-graphql-config.php
│   │       └── class-graphql-resolvers.php
│   └── portfolio-isr-webhook/
│       └── portfolio-isr-webhook.php
```

## Installation

### Prerequisites

1. WordPress 5.7+
2. PHP 7.4+
3. ACF Pro (Advanced Custom Fields)
4. WP GraphQL

### Setup Steps

1. Copy the `theme` directory to `/wp-content/themes/portfolio-headless/`
2. Copy the `plugins/portfolio-headless-cms/` directory to `/wp-content/plugins/`
3. Copy the `plugins/portfolio-isr-webhook/` directory to `/wp-content/plugins/`
4. Activate the theme and plugins from WordPress admin

## Components

### 1. Portfolio Headless Theme

**File:** `theme/`

A minimal theme that disables traditional WordPress frontend rendering.

**Features:**
- Redirects all requests to Next.js frontend
- Adds CORS headers for GraphQL access
- Registers navigation menus
- Supports custom image sizes
- Handles theme options

**Configuration:**
- Edit `theme/functions.php` to change the Next.js frontend URL

### 2. Portfolio Headless CMS Plugin

**File:** `plugins/portfolio-headless-cms/portfolio-headless-cms.php`

Main plugin that provides all CMS functionality.

#### Custom Post Types

- **Project** - Portfolio projects with rich metadata
  - Supports: title, editor, thumbnail, excerpt, revisions
  - Archive enabled
  - Rewrite slug: `/projects`
  
- **Service** - Services offered
  - Supports: title, editor, thumbnail, excerpt
  - Archive enabled
  - Rewrite slug: `/services`
  
- **Testimonial** - Client testimonials
  - Supports: title, editor, thumbnail
  - No archive
  - Not publicly queryable

#### Custom Taxonomies

- **project_type** - Hierarchical (like categories)
  - Rewrite slug: `/project-type`
  
- **tech_stack** - Non-hierarchical (like tags)
  - Rewrite slug: `/tech`
  
- **project_status** - Hierarchical status tracking
  - Rewrite slug: `/status`

#### Admin Features

- Custom admin columns for projects showing image, type, technologies, status, and URL
- Sortable columns
- Settings page under Settings > Headless Settings

#### Settings

Configure these in WordPress admin:
- **Frontend URL** - Next.js frontend URL (default: http://localhost:3000)
- **Revalidation Secret** - Secret for ISR webhooks
- **Enable ISR Webhooks** - Toggle webhook functionality

### 3. ACF Field Groups

#### Project Details (`acf-fields/project-fields.php`)

Tabs:
- **URLs & Links**
  - Live Site URL
  - GitHub Repository URL
  - Interactive Preview URL (iframe)
  
- **Media**
  - Project Walkthrough GIF/Video
  - Project Screenshots Gallery
  - Project Brand Color
  
- **Details**
  - Client Name
  - Completion Date
  - Project Duration
  - Featured Project (toggle)
  - Display Order
  
- **Testimonial**
  - Client Testimonial
  - Testimonial Author
  - Author Role/Title
  
- **SEO**
  - SEO Title Override
  - Meta Description (160 chars max)
  - Focus Keywords

#### Blog Post Settings (`acf-fields/blog-fields.php`)

- Post Subtitle
- Reading Time Override
- Show Table of Contents
- Related Posts (up to 3)
- CTA Text & URL

#### Service Details (`acf-fields/service-fields.php`)

- Icon Name (Lucide)
- Key Features (repeater)
- Starting Price Text
- CTA Button Text & URL
- Featured on Homepage
- Display Order

#### Testimonial Details (`acf-fields/testimonial-fields.php`)

- Author Name
- Author Role
- Company
- Company URL
- Rating (1-5 stars)
- Featured

#### Global Options (`acf-fields/global-options.php`)

**Header & Navigation Settings**
- Header CTA Text & URL
- Announcement Bar Text
- Show Announcement Toggle

**Footer Settings**
- Footer Tagline
- Social Links (repeater with platforms)
- Footer CTA Heading & Button Text & URL

**Homepage Settings**
- Hero Heading & Subheading
- Primary/Secondary CTA Text & URLs
- Statistics (repeater)
- Maintenance Section
- Features (repeater)

**SEO Defaults**
- Default OG Image
- Google Site Verification
- Schema.org Type (Person/Organization)
- Social Profile URLs
- Local Business Details

### 4. GraphQL Configuration

#### GraphQL Config (`graphql/class-graphql-config.php`)

Registers:
- ACF fields for GraphQL exposure
- Custom computed fields (reading time, featured image URLs, etc.)
- Options pages as GraphQL types
- Site settings object

#### GraphQL Resolvers (`graphql/class-graphql-resolvers.php`)

Custom queries:
- `featuredProjects(first: Int)` - Get featured projects sorted by display order
- `featuredServices(first: Int)` - Get featured services
- `featuredTestimonials(first: Int)` - Get featured testimonials
- `projectsByTechnology(technology: String!, first: Int)` - Filter projects by tech
- `projectsByType(type: String!, first: Int)` - Filter projects by type
- `recentBlogPosts(first: Int)` - Get recent blog posts

Custom fields on Post:
- `readingTime: Int` - Calculated reading time in minutes
- `featuredImageUrl: String` - Full featured image URL
- `authorName: String` - Author display name
- `categoryList: [String]` - Array of category names

### 5. ISR Webhook Plugin

**File:** `plugins/portfolio-isr-webhook/portfolio-isr-webhook.php`

Automatically triggers Next.js ISR revalidation when content changes.

**Triggered Events:**
- Post save (projects, services, testimonials, blog posts)
- Post deletion
- Taxonomy term edits (project types, tech stack, status)

**Revalidated Paths:**

For Projects:
- `/projects`
- `/projects/{slug}`
- `/projects/type/{type-slug}`
- `/projects/tech/{tech-slug}`

For Services:
- `/services`
- `/services/{slug}`

For Blog Posts:
- `/blog`
- `/blog/{slug}`
- `/blog/category/{category-slug}`

For Testimonials:
- `/` (homepage only)

**Features:**
- Webhook logging to database table
- Admin notice showing last webhook status
- Webhook logs page in admin
- Configurable secret for webhook authentication
- Non-blocking async requests

**Webhook Payload Format:**
```json
{
  "type": "update|delete",
  "post_id": 123,
  "post_type": "project|service|post|testimonial",
  "paths": ["/projects", "/projects/my-project"],
  "timestamp": 1234567890
}
```

**Headers:**
- `Content-Type: application/json`
- `X-ISR-Secret: {configured_secret}` (if configured)

## GraphQL Queries

### Basic Examples

```graphql
# Get all projects
query {
  projects(first: 10) {
    nodes {
      id
      title
      content
      slug
      projectDetails {
        liveUrl
        gitHubUrl
        iframeEmbedUrl
        projectGif
        projectGallery {
          id
          sourceUrl
        }
        clientName
        projectDate
        isFeatured
      }
      projectTypes {
        nodes {
          name
          slug
        }
      }
      techStacks {
        nodes {
          name
          slug
        }
      }
    }
  }
}

# Get featured projects
query {
  featuredProjects(first: 6) {
    id
    title
    featuredImage {
      sourceUrl
    }
    projectDetails {
      liveUrl
      clientName
    }
  }
}

# Get blog posts with reading time
query {
  posts(first: 10) {
    nodes {
      id
      title
      readingTime
      blogPostSettings {
        postSubtitle
        showToc
      }
    }
  }
}

# Get site settings
query {
  siteSettings {
    siteName
    siteDescription
    frontendUrl
  }
  headerSettings {
    headerCtaText
    headerCtaUrl
    announcementBarText
  }
  homepageSettings {
    heroHeading
    heroSubheading
    stats {
      statNumber
      statLabel
    }
  }
}
```

## API Endpoints

- **GraphQL:** `/graphql` - GraphQL endpoint
- **REST API:** `/wp-json/wp/v2/*` - WordPress REST API
- **ISR Webhook:** `/api/revalidate` - Next.js ISR endpoint (configured via settings)

## Security Features

- CORS headers configured for GraphQL
- Nonce verification on admin forms
- Input sanitization and output escaping
- Webhook secret authentication
- Proper capability checks on all admin functions

## Development Notes

### Adding New Custom Fields

1. Create a new field group in ACF
2. Set `show_in_graphql` to true
3. Custom fields will automatically be exposed in GraphQL

### Adding New Taxonomies

1. Register in `class-taxonomies.php`
2. Set `show_in_graphql` to true
3. Add to appropriate post type

### Extending GraphQL Queries

1. Edit `class-graphql-resolvers.php`
2. Add custom resolver using `register_graphql_field()`
3. Follow the existing pattern for consistency

## Troubleshooting

### Webhooks Not Firing

1. Check if "Enable ISR Webhooks" is toggled ON in settings
2. Verify Frontend URL is correct
3. Check webhook logs page for error responses
4. Ensure the Next.js frontend has the `/api/revalidate` endpoint

### GraphQL Queries Returning Empty

1. Verify posts are published (not draft)
2. Check ACF field group location is correct
3. Verify `show_in_graphql` is enabled on field groups
4. Test with WPGraphQL IDE plugin

### Custom Post Types Not Showing

1. Verify `portfolio-headless-cms` plugin is activated
2. Check posts are published
3. Check post type `show_in_graphql` is true
4. Flush rewrite rules: Settings > Permalinks > Save Changes

## Support

For issues or questions, refer to:
- ACF Pro Documentation: https://www.advancedcustomfields.com/
- WP GraphQL: https://www.wpgraphql.com/
- WordPress Codex: https://developer.wordpress.org/

## License

GPL v2 or later
