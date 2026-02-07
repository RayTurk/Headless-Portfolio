# File Manifest - WordPress Headless CMS Backend

## Complete Directory Structure

```
/sessions/beautiful-peaceful-sagan/portfolio/wordpress/
├── README.md                                      [10 KB] - Full technical documentation
├── SETUP_GUIDE.md                                [7.8 KB] - Installation and configuration guide
├── FILE_MANIFEST.md                               (this file)
├── theme/
│   ├── style.css                                  [~1 KB] - Theme stylesheet with minimal styling
│   ├── functions.php                              [~3 KB] - Theme setup, CORS headers, redirects
│   └── index.php                                  [~2 KB] - Frontend redirect to Next.js
└── plugins/
    ├── portfolio-headless-cms/
    │   ├── portfolio-headless-cms.php             [~4 KB] - Main plugin file with autoloader
    │   ├── includes/
    │   │   ├── class-post-types.php               [~8 KB] - Project, Service, Testimonial CPTs
    │   │   ├── class-taxonomies.php               [~7 KB] - project_type, tech_stack, project_status
    │   │   ├── class-admin-columns.php            [~4 KB] - Custom admin columns
    │   │   └── class-headless-settings.php        [~4 KB] - Settings page in WordPress admin
    │   ├── acf-fields/
    │   │   ├── project-fields.php                 [~15 KB] - 40+ fields in 6 tabs
    │   │   ├── blog-fields.php                    [~5 KB] - Blog post enhancements
    │   │   ├── service-fields.php                 [~8 KB] - Service metadata
    │   │   ├── testimonial-fields.php             [~5 KB] - Testimonial fields
    │   │   └── global-options.php                 [~18 KB] - 4 option pages with 30+ fields
    │   └── graphql/
    │       ├── class-graphql-config.php           [~5 KB] - GraphQL setup and custom fields
    │       └── class-graphql-resolvers.php        [~10 KB] - 6 custom GraphQL queries
    └── portfolio-isr-webhook/
        └── portfolio-isr-webhook.php              [~12 KB] - ISR webhook handler and logging
```

## File Descriptions

### Documentation Files

#### README.md
- **Purpose:** Complete technical reference
- **Contents:**
  - Architecture overview
  - Component descriptions
  - Custom post types and taxonomies
  - ACF field groups
  - GraphQL configuration
  - API endpoints
  - Example GraphQL queries
  - Troubleshooting guide
- **Read When:** Understanding the overall system

#### SETUP_GUIDE.md
- **Purpose:** Installation and configuration instructions
- **Contents:**
  - Step-by-step setup process
  - Dependency installation
  - Settings configuration
  - Next.js integration example
  - Testing procedures
  - Common tasks (creating projects, services, blog posts)
  - Troubleshooting tips
- **Read When:** Setting up the system or adding new content

#### FILE_MANIFEST.md
- **Purpose:** This file - navigation guide
- **Contents:** File structure and descriptions
- **Read When:** Looking for specific files or understanding organization

### Theme Files

#### theme/style.css
- **Purpose:** Minimal theme styling
- **Contains:**
  - Theme header metadata (name, version, license, etc.)
  - Minimal CSS for theme compliance
- **Key Info:** This is a headless theme - minimal styling is intentional
- **Edit For:** Theme name, author, description, license

#### theme/functions.php
- **Purpose:** Theme initialization and setup
- **Contains:**
  - Navigation menu registration
  - Theme support configuration
  - Custom image size registration
  - Frontend redirect to Next.js
  - CORS headers for GraphQL
  - Login redirect handling
- **Key Info:** Main hook for theme functionality
- **Edit For:** Changing registered image sizes, menus, or frontend URL

#### theme/index.php
- **Purpose:** Main theme template (frontend redirect)
- **Contains:**
  - Redirect logic to Next.js frontend
  - Meta refresh and JavaScript redirect fallback
  - Safe sanitization of request URIs
- **Key Info:** All frontend requests redirect here
- **Edit For:** Custom redirect logic if needed

### Main Plugin Files

#### plugins/portfolio-headless-cms/portfolio-headless-cms.php
- **Purpose:** Plugin initialization and bootstrap
- **Contains:**
  - Plugin header information
  - Autoloader implementation
  - Dependency checking (ACF Pro, WP GraphQL)
  - Activation/deactivation hooks
  - ACF field loading
  - Admin notices
- **Key Info:** Entry point for the entire plugin system
- **Edit For:** Version bumps, adding new includes, dependency changes

#### plugins/portfolio-headless-cms/includes/class-post-types.php
- **Purpose:** Register custom post types
- **Contains:**
  - **Project CPT**: title, editor, thumbnail, excerpt, revisions
  - **Service CPT**: title, editor, thumbnail, excerpt
  - **Testimonial CPT**: title, editor, thumbnail
- **Key Info:** All three CPTs use proper WordPress labels and capabilities
- **Edit For:** Adding new post types or modifying existing ones

#### plugins/portfolio-headless-cms/includes/class-taxonomies.php
- **Purpose:** Register custom taxonomies
- **Contains:**
  - **project_type**: Hierarchical (like categories)
  - **tech_stack**: Non-hierarchical (like tags)
  - **project_status**: Hierarchical status tracking
- **Key Info:** Taxonomies are set to show in GraphQL
- **Edit For:** Adding new taxonomy terms or taxonomies

#### plugins/portfolio-headless-cms/includes/class-admin-columns.php
- **Purpose:** Customize WordPress admin columns
- **Contains:**
  - Custom columns for project admin list
  - Thumbnail display
  - Taxonomy terms display
  - Project URL links
  - Sortable columns
- **Key Info:** Makes project management easier in WordPress admin
- **Edit For:** Customizing what appears in admin columns

#### plugins/portfolio-headless-cms/includes/class-headless-settings.php
- **Purpose:** Create and manage plugin settings page
- **Contains:**
  - Settings page under Settings menu
  - Frontend URL configuration
  - Revalidation Secret field
  - Enable ISR Webhooks toggle
  - Webhook endpoint display
- **Key Info:** All settings stored in WordPress options table
- **Edit For:** Adding new configuration options

### ACF Field Group Files

All ACF field files use `acf_add_local_field_group()` for easy version control.

#### plugins/portfolio-headless-cms/acf-fields/project-fields.php
- **Purpose:** Project custom field groups
- **Field Tabs:**
  1. **URLs & Links**: Live Site, GitHub, Preview URLs
  2. **Media**: GIF/Video, Screenshots Gallery, Brand Color
  3. **Details**: Client, Date, Duration, Featured, Order
  4. **Testimonial**: Quote, Author, Role
  5. **SEO**: Title Override, Meta Description, Keywords
- **Total Fields:** 15+ across all tabs
- **Key Info:** All fields shown in GraphQL
- **Edit For:** Adding new project-specific fields

#### plugins/portfolio-headless-cms/acf-fields/blog-fields.php
- **Purpose:** Blog post enhancements
- **Fields:**
  - Post Subtitle
  - Reading Time Override (auto-calculated otherwise)
  - Show Table of Contents toggle
  - Related Posts (up to 3)
  - CTA Text & URL
- **Total Fields:** 5
- **Key Info:** Applies to standard WordPress posts
- **Edit For:** Enhancing blog post functionality

#### plugins/portfolio-headless-cms/acf-fields/service-fields.php
- **Purpose:** Service custom fields
- **Fields:**
  - Icon Name (Lucide icon)
  - Key Features (repeater)
  - Starting Price Text
  - CTA Button Text & URL
  - Featured on Homepage toggle
  - Display Order
- **Total Fields:** 7 (plus repeater items)
- **Key Info:** For Services post type
- **Edit For:** Service-specific metadata

#### plugins/portfolio-headless-cms/acf-fields/testimonial-fields.php
- **Purpose:** Testimonial metadata fields
- **Fields:**
  - Author Name (required)
  - Author Role
  - Company
  - Company URL
  - Rating (1-5 stars)
  - Featured toggle
- **Total Fields:** 6
- **Key Info:** For Testimonial post type
- **Edit For:** Testimonial-specific information

#### plugins/portfolio-headless-cms/acf-fields/global-options.php
- **Purpose:** Site-wide configuration and content
- **Option Pages Created:**
  1. **Site Settings** (main page)
  2. **Header & Navigation** (sub-page)
  3. **Footer Settings** (sub-page)
  4. **Homepage Settings** (sub-page)
  5. **SEO Defaults** (sub-page)
- **Field Groups:**
  1. **Header Settings**: CTA text/URL, announcement bar
  2. **Footer Settings**: Tagline, social links, CTA
  3. **Homepage Settings**: Hero, statistics, maintenance section
  4. **SEO Defaults**: OG image, schema.org, business info
- **Total Fields:** 30+
- **Key Info:** All queryable via GraphQL
- **Edit For:** Adding global site configuration options

### GraphQL Configuration Files

#### plugins/portfolio-headless-cms/graphql/class-graphql-config.php
- **Purpose:** Configure GraphQL types and fields
- **Contains:**
  - Custom computed fields (reading time, image URLs, etc.)
  - GraphQL type registration
  - Options page type definitions
  - Custom field registrations
- **Key Info:** Bridges ACF fields to GraphQL
- **Edit For:** Adding new computed fields or types

#### plugins/portfolio-headless-cms/graphql/class-graphql-resolvers.php
- **Purpose:** Custom GraphQL query resolvers
- **Queries Provided:**
  1. `featuredProjects(first: Int)` - Featured projects by order
  2. `featuredServices(first: Int)` - Featured services
  3. `featuredTestimonials(first: Int)` - Featured testimonials
  4. `projectsByTechnology(technology: String!, first: Int)` - Filter by tech
  5. `projectsByType(type: String!, first: Int)` - Filter by type
  6. `recentBlogPosts(first: Int)` - Recent blog posts
- **Key Info:** All queries return proper WordPress post objects
- **Edit For:** Adding new custom queries or modifying resolvers

### ISR Webhook Plugin

#### plugins/portfolio-isr-webhook/portfolio-isr-webhook.php
- **Purpose:** Automatic Next.js revalidation on content changes
- **Triggered Events:**
  - Post save (all types)
  - Post deletion
  - Taxonomy term edits
- **Features:**
  - Selective path revalidation
  - Webhook logging to database
  - Admin notices showing status
  - Secret-based authentication
  - Non-blocking async requests
  - Logs page in WordPress admin
- **Webhook Payload:**
  ```json
  {
    "type": "update|delete",
    "post_id": 123,
    "post_type": "project|service|post|testimonial",
    "paths": ["/projects", "/projects/my-project"],
    "timestamp": 1234567890
  }
  ```
- **Key Info:** Requires `/api/revalidate` endpoint on Next.js frontend
- **Edit For:** Customizing revalidation logic or adding new post types

## File Access Patterns

### When You Need To...

**Add a new post type:**
1. Edit `class-post-types.php`
2. Register the post type in the appropriate method
3. Update plugin-headless-cms.php if needed

**Add a new taxonomy:**
1. Edit `class-taxonomies.php`
2. Register the taxonomy in the appropriate method
3. Assign to post types

**Add fields to a post type:**
1. Create/edit corresponding ACF field file
2. Set `show_in_graphql` to true
3. Fields auto-expose to GraphQL

**Customize admin interface:**
1. Edit `class-admin-columns.php` for columns
2. Update post type supports in `class-post-types.php`
3. Modify `class-admin-columns.php` for custom rendering

**Add GraphQL queries:**
1. Edit `class-graphql-resolvers.php`
2. Use `register_graphql_field()` on RootQuery
3. Implement resolver function

**Configure frontend connection:**
1. Edit `theme/functions.php` for frontend URL
2. Configure settings in WordPress admin
3. Update Next.js `.env.local` with webhook secret

## Code Locations by Functionality

### Post Type Definition
- `plugins/portfolio-headless-cms/includes/class-post-types.php`

### Taxonomy Definition
- `plugins/portfolio-headless-cms/includes/class-taxonomies.php`

### Custom Field Groups
- `plugins/portfolio-headless-cms/acf-fields/` (all files)

### Admin Interface Customization
- `plugins/portfolio-headless-cms/includes/class-admin-columns.php`
- `plugins/portfolio-headless-cms/includes/class-headless-settings.php`

### GraphQL API
- `plugins/portfolio-headless-cms/graphql/class-graphql-config.php`
- `plugins/portfolio-headless-cms/graphql/class-graphql-resolvers.php`

### Frontend Integration
- `theme/functions.php`
- `theme/index.php`
- `plugins/portfolio-headless-cms/includes/class-headless-settings.php`

### Next.js Revalidation
- `plugins/portfolio-isr-webhook/portfolio-isr-webhook.php`

## File Sizes & Statistics

- **Total Files:** 18 (16 PHP, 2 Markdown)
- **Total Code Lines:** 3,000+
- **Plugin Files:** 13
- **Documentation Files:** 3
- **Theme Files:** 2

## Dependencies

### External
- WordPress 5.7+
- PHP 7.4+
- ACF Pro (Advanced Custom Fields)
- WP GraphQL

### Internal
- None - all files are self-contained with proper dependencies defined in plugin headers

## Security Considerations

All files include:
- Input sanitization
- Output escaping
- Capability checks
- Nonce verification (where applicable)
- Safe database queries
- Proper error handling

## Extension Points

### Easy to Extend
1. Add new post types in `class-post-types.php`
2. Add new taxonomies in `class-taxonomies.php`
3. Add new ACF field groups in `acf-fields/`
4. Add new GraphQL queries in `class-graphql-resolvers.php`
5. Add new settings in `class-headless-settings.php`

### Requires Modification
1. Changing post type capabilities
2. Modifying webhook behavior
3. Adding new theme support
4. Changing admin interface

