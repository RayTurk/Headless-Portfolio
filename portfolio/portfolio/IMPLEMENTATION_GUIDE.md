# Implementation Guide - Portfolio Projects & Blog

## Quick Start

### 1. Verify Installation
All files have been created in `/src/`. Verify with:
```bash
cd portfolio && npm run build
```

### 2. Configure WordPress

#### Create Custom Post Type (Projects)
In your WordPress theme or plugin:
```php
register_post_type('project', [
  'public' => true,
  'show_in_graphql' => true,
  'graphql_single_name' => 'project',
  'graphql_plural_name' => 'projects',
]);
```

#### Create Custom Fields for Projects
Using Advanced Custom Fields (ACF) or Code:
- `client_name` (Text)
- `completion_date` (Date Picker)
- `project_duration` (Text, e.g., "3 months")
- `live_url` (URL)
- `github_url` (URL)
- `iframe_url` (URL - for embedded demo)
- `demo_gif_url` (Image - fallback if no iframe)
- `gallery_images` (Repeater - array of image objects)
- `client_testimonial` (Text Area)

#### Create Taxonomies
For Projects CPT:
- `project_type` (Web Design, WordPress, E-Commerce, Custom Development, etc.)
- `technologies` (React, Next.js, Tailwind, WordPress, PHP, etc.)

For Posts (built-in):
- `category` (already exists - use for blog categories)
- `post_tag` (already exists - use for blog tags)

#### Blog Post Meta Fields (Optional)
- `subtitle` (Text)
- `author_bio` (Text Area)
- `author_avatar` (Image - 64x64 minimum)
- `show_toc` (Checkbox - show table of contents)

### 3. Environment Variables

Create `.env.local` in portfolio root:
```env
# Required
NEXT_PUBLIC_WORDPRESS_URL=https://your-site.com
NEXT_PUBLIC_SITE_URL=https://your-portfolio.com

# Revalidation
REVALIDATE_SECRET=your-very-secure-random-string-here

# Contact Form - Choose at least ONE
FORMSPREE_ID=your_formspree_id

# OR for WordPress
WORDPRESS_API_URL=https://your-site.com/wp-json
WORDPRESS_API_TOKEN=your_jwt_token

# OR for SendGrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
SENDGRID_TO_EMAIL=contact@yourdomain.com
```

### 4. Test Data Fetching

In your Next.js project, test the API:
```bash
npm run dev
# Visit http://localhost:3000/projects
# Visit http://localhost:3000/blog
```

Check browser console for errors. If projects don't appear:
1. Verify WordPress GraphQL endpoint works
2. Check if projects exist in WordPress
3. Verify featured images are set
4. Check GraphQL queries in `/src/lib/queries/`

### 5. Customize Theme Colors

Edit `tailwind.config.js`:
```js
colors: {
  brand: '#6366f1',      // Indigo
  accent: '#10b981',     // Emerald
  // ... rest of palette
}
```

Or use CSS variables in your layout:
```css
:root {
  --color-brand: #6366f1;
  --color-accent: #10b981;
}
```

### 6. Create WordPress Webhook for Revalidation

#### Option A: Using a WordPress Plugin (e.g., WP Webhooks)
1. Install "WP Webhooks" plugin
2. Set up webhook on Post/Project Update
3. Send POST to: `https://your-portfolio.com/api/revalidate`
4. Body:
```json
{
  "secret": "your-REVALIDATE_SECRET",
  "slug": "{post_slug}",
  "type": "post"
}
```

#### Option B: Manual Setup in WordPress
Add to `functions.php`:
```php
add_action('save_post_project', function($post_id) {
  $secret = get_option('revalidate_secret');
  wp_remote_post('https://your-portfolio.com/api/revalidate', [
    'body' => json_encode([
      'secret' => $secret,
      'slug' => get_post_field('post_name', $post_id),
      'type' => 'project'
    ])
  ]);
});
```

### 7. Contact Form Setup

#### Option A: Formspree (Recommended for Static)
1. Go to https://formspree.io
2. Create new form
3. Copy form ID
4. Add to `.env.local`: `FORMSPREE_ID=xxxx`
5. Test form at `/contact`

#### Option B: WordPress REST API
1. Generate JWT token from WordPress
2. Add endpoints to `.env.local`
3. Create custom endpoint in WordPress for contact form handling

#### Option C: SendGrid
1. Create SendGrid account
2. Generate API key
3. Add to `.env.local`
4. Test form submission

### 8. SEO Optimization

#### Meta Tags
All pages export `generateMetadata()`:
- Projects page: Website type
- Project detail: Creative work with schema
- Blog page: Website type
- Post detail: Article with author, date, content

#### Structured Data (JSON-LD)
Included in:
- Project pages (CreativeWork)
- Blog posts (BlogPosting)
- Breadcrumbs (BreadcrumbList)

#### Sitemap
Next.js auto-generates at `/sitemap.xml`

#### Robots.txt
Next.js auto-generates at `/robots.txt`

### 9. Image Optimization

All images use Next.js `Image` component:
```typescript
<Image
  src={url}
  alt={title}
  width={1200}
  height={630}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

For best results:
- Optimize images in WordPress (use Smush or similar)
- Keep featured images under 2MB
- Use WebP format when possible
- Set featured images for all projects and posts

### 10. Performance Monitoring

#### Build Time
```bash
npm run build
# Watch for "Prerendered X routes in Xs"
```

#### Runtime Metrics
1. Check Vercel Analytics (if deployed)
2. Monitor Core Web Vitals
3. Check Lighthouse scores

### 11. Deployment Checklist

- [ ] Environment variables configured
- [ ] WordPress GraphQL endpoint accessible
- [ ] All custom fields created in WordPress
- [ ] Sample projects and posts created
- [ ] Featured images uploaded
- [ ] Contact form backend configured
- [ ] Revalidation webhook set up
- [ ] Tailwind CSS colors customized
- [ ] Logo/branding updated
- [ ] Navigation links updated
- [ ] Footer information correct
- [ ] Build succeeds: `npm run build`
- [ ] No console errors in browser
- [ ] Test all pages and filters
- [ ] Test contact form submission
- [ ] Test share buttons (Twitter, LinkedIn)
- [ ] Test gallery lightbox
- [ ] Test responsive design on mobile

## File Structure Reference

```
portfolio/
├── src/
│   ├── app/
│   │   ├── projects/
│   │   │   ├── page.tsx                 # Projects archive
│   │   │   └── [slug]/
│   │   │       └── page.tsx             # Single project
│   │   ├── blog/
│   │   │   ├── page.tsx                 # Blog archive
│   │   │   └── [slug]/
│   │   │       └── page.tsx             # Single blog post
│   │   └── api/
│   │       ├── revalidate/
│   │       │   └── route.ts             # ISR revalidation
│   │       └── contact/
│   │           └── route.ts             # Contact form handler
│   ├── components/
│   │   ├── projects/
│   │   │   ├── ProjectCard.tsx          # Reusable card
│   │   │   ├── ProjectFilter.tsx        # Type filter
│   │   │   ├── ProjectIframe.tsx        # Interactive preview
│   │   │   ├── ProjectGallery.tsx       # Image lightbox
│   │   │   └── RelatedProjects.tsx      # Related section
│   │   ├── blog/
│   │   │   ├── PostCard.tsx             # Reusable card
│   │   │   ├── TableOfContents.tsx      # Sticky TOC
│   │   │   ├── ShareButtons.tsx         # Social share
│   │   │   └── AuthorBio.tsx            # Author section
│   │   └── ui/
│   │       ├── Breadcrumbs.tsx
│   │       ├── bento-grid.tsx
│   │       └── ... (other UI components)
│   ├── lib/
│   │   ├── api.ts                       # API functions
│   │   ├── utils.ts                     # Utilities (cn function)
│   │   ├── constants.ts
│   │   ├── graphql-client.ts
│   │   └── queries/
│   │       ├── projects.ts
│   │       ├── posts.ts
│   │       └── ...
│   └── types/
│       └── wordpress.ts                 # TypeScript types
├── .env.local                           # Environment variables
└── PROJECT_STRUCTURE.md                 # This file
```

## Common Issues & Solutions

### Issue: Projects not showing
**Solution:**
1. Check WordPress has projects created
2. Verify featured image is set
3. Test GraphQL query: `http://localhost:3000/api/graphql`
4. Check browser console for errors

### Issue: Images not loading
**Solution:**
1. Verify `NEXT_PUBLIC_WORDPRESS_URL` is correct
2. Check featured images are publicly accessible
3. Ensure CORS is enabled if needed
4. Try accessing image URL directly in browser

### Issue: Filter not working
**Solution:**
1. Verify `project_type` taxonomy exists
2. Check projects are assigned to taxonomy terms
3. Inspect network tab for filtering requests
4. Check console for JavaScript errors

### Issue: Contact form not submitting
**Solution:**
1. Verify email service is configured (FORMSPREE_ID, etc.)
2. Check form fields in browser inspector
3. Look for 429 rate limit error (reset after 1 hour)
4. Verify honeypot field is not in actual form
5. Check API endpoint responds: `curl https://yourdomain.com/api/contact`

### Issue: Revalidation not working
**Solution:**
1. Verify `REVALIDATE_SECRET` is set
2. Check WordPress webhook payload includes correct secret
3. Try manual revalidation: POST to `/api/revalidate`
4. Check Next.js build logs for errors

## Performance Tips

1. **Image Optimization**
   - Use WebP format in WordPress
   - Compress images < 500KB
   - Set featured images with good aspect ratio

2. **Caching Strategy**
   - Projects cache: 1 hour (ISR)
   - Blog posts cache: 1 hour (ISR)
   - Images: Browser cache + CDN

3. **Database Queries**
   - Use GraphQL to fetch only needed fields
   - Limit projects per page (12 recommended)
   - Paginate blog posts (12 recommended)

4. **Bundle Size**
   - Lazy load components with `dynamic()` if needed
   - Code split at route level automatically
   - Monitor with: `npm run analyze`

## Monitoring & Analytics

### Vercel Analytics
If deployed on Vercel, analytics are automatic.

### Custom Events (Optional)
Add in components:
```typescript
import { track } from '@/lib/analytics';

<button onClick={() => {
  track('project_clicked', { slug });
}}>
  View Project
</button>
```

## Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/
- **GraphQL**: https://graphql.org/learn/
- **TypeScript**: https://www.typescriptlang.org/docs/

## Next Steps After Implementation

1. Add analytics (Vercel, Plausible, or custom)
2. Set up error tracking (Sentry)
3. Configure CDN for images
4. Set up monitoring alerts
5. Create CI/CD pipeline
6. Add form spam detection (reCAPTCHA)
7. Implement search (Algolia or similar)
8. Add newsletter signup
9. Create admin dashboard for stats
10. Plan regular content updates

---

**Questions?** Check PROJECT_STRUCTURE.md for detailed file descriptions.
