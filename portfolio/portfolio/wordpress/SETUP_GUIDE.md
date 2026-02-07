# WordPress Headless CMS Setup Guide

## Quick Start

### Step 1: Prepare WordPress Installation

```bash
# Ensure WordPress is installed and running
# WordPress 5.7+ and PHP 7.4+ required
```

### Step 2: Install Dependencies

Install these plugins via WordPress admin or WP-CLI:

```bash
# Using WP-CLI
wp plugin install advanced-custom-fields-pro
wp plugin install wp-graphql
```

Or manually download from:
- ACF Pro: https://www.advancedcustomfields.com/pro/
- WP GraphQL: https://www.wpgraphql.com/

### Step 3: Deploy Portfolio Files

Copy the files to your WordPress installation:

```bash
# Copy theme
cp -r wordpress/theme/ /path/to/wordpress/wp-content/themes/portfolio-headless/

# Copy plugins
cp -r wordpress/plugins/portfolio-headless-cms/ /path/to/wordpress/wp-content/plugins/
cp -r wordpress/plugins/portfolio-isr-webhook/ /path/to/wordpress/wp-content/plugins/
```

### Step 4: Activate Components

In WordPress admin (Appearance > Themes):
1. Activate "Portfolio Headless Theme"

In WordPress admin (Plugins):
1. Activate "Advanced Custom Fields Pro"
2. Activate "WP GraphQL"
3. Activate "Portfolio Headless CMS"
4. Activate "Portfolio ISR Webhook"

### Step 5: Configure Settings

Go to **Settings > Headless Settings** and configure:

1. **Frontend URL** - Set to your Next.js frontend URL
   - Default: `http://localhost:3000`
   - Example: `https://rayturk.dev`

2. **Revalidation Secret** - Create a secure random string
   ```bash
   # Generate a secret
   openssl rand -hex 32
   ```
   - Copy the output and paste in the "Revalidation Secret" field
   - **Keep this secret!** Store it in your Next.js `.env.local`

3. **Enable ISR Webhooks** - Check this box to enable automatic revalidation

### Step 6: Configure Next.js Frontend

In your Next.js app, create `/pages/api/revalidate.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-isr-secret');
  
  if (secret !== process.env.ISR_WEBHOOK_SECRET) {
    return NextResponse.json(
      { revalidated: false },
      { status: 401 }
    );
  }

  try {
    const { paths } = await request.json();
    
    for (const path of paths) {
      await revalidateTag(path);
    }
    
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json(
      { revalidated: false },
      { status: 500 }
    );
  }
}
```

In your `.env.local`:
```
ISR_WEBHOOK_SECRET=your_secret_from_wordpress
```

### Step 7: Test the Setup

1. **Test GraphQL Endpoint**
   - Visit: `http://localhost/graphql` (or your WordPress URL)
   - Try a simple query:
   ```graphql
   query {
     siteSettings {
       siteName
       frontendUrl
     }
   }
   ```

2. **Create Test Content**
   - Create a new Project post
   - Add project details (URLs, media, etc.)
   - Assign project type and technologies
   - Publish the post

3. **Verify Webhook**
   - Go to **Settings > Headless Settings > Webhook Logs**
   - Check that your publish action created a successful webhook entry

4. **Query Your Content**
   ```graphql
   query {
     featuredProjects(first: 5) {
       id
       title
       projectDetails {
         liveUrl
         clientName
       }
     }
   }
   ```

## File Reference

All files are located in `/sessions/beautiful-peaceful-sagan/portfolio/wordpress/`

### Theme Files
- `/theme/style.css` - Minimal theme stylesheet
- `/theme/functions.php` - Theme setup and frontend redirect
- `/theme/index.php` - Frontend redirect template

### Main Plugin Files
- `/plugins/portfolio-headless-cms/portfolio-headless-cms.php` - Plugin entry point
- `/plugins/portfolio-headless-cms/includes/class-post-types.php` - Custom post types
- `/plugins/portfolio-headless-cms/includes/class-taxonomies.php` - Custom taxonomies
- `/plugins/portfolio-headless-cms/includes/class-admin-columns.php` - Admin columns
- `/plugins/portfolio-headless-cms/includes/class-headless-settings.php` - Settings page

### ACF Field Groups
- `/plugins/portfolio-headless-cms/acf-fields/project-fields.php` - Project details
- `/plugins/portfolio-headless-cms/acf-fields/blog-fields.php` - Blog post settings
- `/plugins/portfolio-headless-cms/acf-fields/service-fields.php` - Service details
- `/plugins/portfolio-headless-cms/acf-fields/testimonial-fields.php` - Testimonial fields
- `/plugins/portfolio-headless-cms/acf-fields/global-options.php` - Site-wide settings

### GraphQL Configuration
- `/plugins/portfolio-headless-cms/graphql/class-graphql-config.php` - GraphQL setup
- `/plugins/portfolio-headless-cms/graphql/class-graphql-resolvers.php` - Custom queries

### Webhook Plugin
- `/plugins/portfolio-isr-webhook/portfolio-isr-webhook.php` - ISR webhook handler

## Common Tasks

### Create a Project

1. Go to **Projects > Add New**
2. Fill in the project title and description
3. Upload a featured image
4. Configure project details in the field groups:
   - **URLs & Links**: Add live URL, GitHub, preview URL
   - **Media**: Add project GIF/video, screenshots, brand color
   - **Details**: Client name, completion date, display order
   - **Testimonial**: Client testimonial (optional)
   - **SEO**: SEO title, meta description, keywords

5. Select **Project Type** and **Technologies** from the taxonomies
6. Set **Featured Project** toggle if you want it on the homepage
7. Click **Publish**

The ISR webhook will automatically revalidate:
- `/projects`
- `/projects/{slug}`
- `/projects/type/{type}`
- `/projects/tech/{tech}`

### Create a Service

1. Go to **Services > Add New**
2. Fill in the service title and description
3. Upload a featured image
4. In **Service Details**:
   - Add icon name (Lucide icon)
   - Add key features (repeater)
   - Set pricing text
   - Add CTA button text and URL
   - Toggle "Featured on Homepage"
   - Set display order

5. Click **Publish**

### Add a Blog Post

1. Go to **Posts > Add New**
2. Write your blog post
3. In **Blog Post Settings**:
   - Add subtitle
   - Set reading time override (optional)
   - Toggle "Show Table of Contents"
   - Select related posts (up to 3)
   - Configure CTA text and URL

4. Click **Publish**

### Configure Site-Wide Settings

1. Go to **Settings > Site Settings**
2. Configure sub-pages:
   - **Header & Navigation** - Header CTA, announcement bar
   - **Footer Settings** - Footer content, social links, CTA
   - **Homepage Settings** - Hero section, statistics, maintenance info
   - **SEO Defaults** - OG image, schema.org settings, business info

## Troubleshooting

### GraphQL endpoint returns 404

- Ensure WP GraphQL is activated
- Flush rewrite rules: **Settings > Permalinks > Save Changes**
- Clear any caching plugins

### Webhooks not firing

- Check that **Enable ISR Webhooks** is toggled ON
- Verify **Frontend URL** is correct
- Check webhook logs for error messages
- Ensure your Next.js `/api/revalidate` endpoint is working

### ACF fields not showing in GraphQL

- Verify field group has **Show in GraphQL** enabled
- Check field has **Allowed** when editing the field
- Flush rewrite rules after adding new fields

### Posts not appearing in GraphQL queries

- Ensure posts are **Published** (not draft/private)
- Check post type has **Show in GraphQL** enabled
- Use the GraphQL IDE to debug queries

## Security Notes

- Store the Revalidation Secret securely
- Use HTTPS in production for all URLs
- Limit GraphQL access if needed via additional plugins
- Regular WordPress security updates

## Next Steps

1. Customize ACF field groups for your specific needs
2. Create custom GraphQL queries as needed
3. Set up a staging environment for testing
4. Implement additional security measures
5. Optimize images and media for your frontend

## Support Resources

- ACF Pro: https://www.advancedcustomfields.com/
- WP GraphQL: https://www.wpgraphql.com/
- WordPress: https://wordpress.org/
- Next.js: https://nextjs.org/

