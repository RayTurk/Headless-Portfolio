# Portfolio Site Structure - Projects & Blog

## Overview
Complete headless WordPress + Next.js 14 App Router portfolio implementation with Projects and Blog pages, full dark theme with Indigo/Emerald branding, Tailwind CSS, Framer Motion animations, and TypeScript.

## Files Created

### PAGE ROUTES

#### 1. **Projects Archive**
📄 `/src/app/projects/page.tsx` (Server Component)
- Hero section with animated gradient title
- Fetches all projects via `getAllProjects()`
- Displays unique project types extracted from CPT taxonomy
- Integrates `ProjectFilter` component for client-side filtering
- Grid layout using `BentoGrid` wrapper
- Maps projects to `ProjectCard` components
- SEO metadata export with OpenGraph tags

#### 2. **Single Project Page**
📄 `/src/app/projects/[slug]/page.tsx` (Server Component)
- `generateStaticParams()` for SSG from `getAllProjectSlugs()`
- Fetches individual project via `getProjectBySlug(slug)`
- Hero section: title (gradient), client name, completion date, duration
- Tech stack badges display
- Action buttons: "View Live Site" & "View on GitHub"
- **ProjectIframe** component - interactive preview with fallback support:
  - Prioritizes: Live iframe > Animated GIF > Featured image
  - Browser chrome mockup styling
  - Loading indicator
- Full WordPress content rendered with prose styling
- `ProjectGallery` component with lightbox modal
- Client testimonial section (if available)
- `RelatedProjects` component showing 3 similar projects
- Breadcrumbs navigation
- JSON-LD Schema (CreativeWork type)
- Full metadata export

#### 3. **Blog Archive**
📄 `/src/app/blog/page.tsx` (Server Component)
- Hero section with animated gradient title
- Fetches posts via `getAllPosts(100)`
- Category filter pills (top 5 categories)
- Featured post layout (first post: 2-column, full-width)
- Standard grid for remaining posts
- Pagination (numbered buttons, current page highlight)
- Post count display
- SEO metadata with blog-specific OpenGraph type
- Suspense boundary for streaming

#### 4. **Single Blog Post**
📄 `/src/app/blog/[slug]/page.tsx` (Server Component)
- `generateStaticParams()` for SSG from `getAllPostSlugs()`
- Fetches post via `getPostBySlug(slug)`
- Category badges at top
- Large title with subtitle support
- Author info: avatar, name, publish date, reading time (calculated)
- Featured image (full-width, rounded)
- 2-column layout with sticky Table of Contents (responsive)
- Main content rendered with Tailwind Typography (prose-invert)
- Inline CTA block (maintenance services plug)
- Tags section (clickable category links)
- Author bio section with avatar & social link
- Share buttons: Twitter, LinkedIn, Copy link
- Breadcrumbs navigation
- Related posts section (2 posts displayed)
- JSON-LD Schema (BlogPosting with author, datePublished)
- Full article-type metadata export

---

## COMPONENT FILES

### Projects Components

#### 5. **ProjectCard**
📄 `/src/components/projects/ProjectCard.tsx` (Client Component)
- `'use client'` directive
- Reusable project card with hover animations
- Featured image with lazy loading and zoom effect
- Overlay on hover with project info
- Tech stack badges (max 3 shown, "+X more" indicator)
- Project type label/badge
- Framer Motion: card lift on hover, image scale
- Full card is clickable link to project detail page
- Props: `{ project: Project }`

#### 6. **ProjectFilter**
📄 `/src/components/projects/ProjectFilter.tsx` (Client Component)
- `'use client'` directive
- Horizontal pill buttons for project type filtering
- "All" filter selected by default
- Animated active pill indicator with smooth transition
- Client-side filtering logic
- Uses `AnimatePresence` for exit animations
- Shows count: "X projects found"
- Empty state message
- Re-filters and animates when filter changes

#### 7. **ProjectIframe**
📄 `/src/components/projects/ProjectIframe.tsx` (Client Component)
- `'use client'` directive
- Device frame mockup with browser chrome (traffic lights, URL bar)
- Priority logic: iframe > GIF > featured image
- Interactive iframe embed with loading state
- Fallback to GIF or featured image
- Caption showing content type
- Full-width, prominent presentation
- Props: `{ project: Project }`

#### 8. **ProjectGallery**
📄 `/src/components/projects/ProjectGallery.tsx` (Client Component)
- `'use client'` directive
- Masonry-style grid layout (3-column responsive)
- Click to open fullscreen lightbox modal
- Blur backdrop for focus
- Image navigation arrows (left/right)
- Keyboard navigation: Escape to close, Arrow keys to navigate
- Image counter: "3/8"
- Thumbnail strip at bottom with scrolling
- Thumbnail selection capability
- Smooth transitions with Framer Motion
- Props: `{ images: GalleryImage[] }`

#### 9. **RelatedProjects**
📄 `/src/components/projects/RelatedProjects.tsx` (Client Component)
- Heading: "More Projects" with gradient text
- 3-column grid of ProjectCards
- Takes first 3 from related projects array
- Scroll-reveal animation with Framer Motion
- Props: `{ projects: Project[] }`

### Blog Components

#### 10. **PostCard**
📄 `/src/components/blog/PostCard.tsx` (Client Component)
- `'use client'` directive
- Two layout modes: `featured` (2-col with large text) and standard
- Featured image with aspect ratio
- Category badge overlay on image
- Title with hover color change
- Excerpt (2 lines max)
- Footer: avatar, author name, publish date, reading time
- Entire card is clickable link
- Hover animations and image zoom
- Props: `{ post: Post; featured?: boolean }`

#### 11. **TableOfContents**
📄 `/src/components/blog/TableOfContents.tsx` (Client Component)
- `'use client'` directive
- Sticky sidebar (top: 32)
- Parses h2/h3 headings from post content
- Smooth scroll navigation with offset
- Active heading highlight based on scroll position
- Animated indicator line
- Collapsible on mobile with toggle button
- Nested structure for h3 under h2
- Keyboard escape to close mobile version
- Props: `{ headings: Array<{level, text, id}> }`

#### 12. **ShareButtons**
📄 `/src/components/blog/ShareButtons.tsx` (Client Component)
- `'use client'` directive
- Row of share buttons: Twitter/X, LinkedIn, Copy Link
- Opens share dialogs in new windows
- Copy to clipboard with "Copied!" feedback (2s timeout)
- Icon buttons with hover states
- Framer Motion scale animations
- Props: `{ title: string; url: string }`

#### 13. **AuthorBio**
📄 `/src/components/blog/AuthorBio.tsx` (Client Component)
- `'use client'` directive
- Avatar image (64x64)
- Author name heading
- Bio text
- "More posts by author" link
- Gradient background with border
- Props: `{ name?: string; bio?: string; avatar?: string }`

---

## API ROUTES

#### 14. **Revalidation Endpoint**
📄 `/src/app/api/revalidate/route.ts`
- `POST /api/revalidate` - ISR revalidation
- Validates `REVALIDATE_SECRET` from environment
- Accepts JSON: `{ secret, slug, type }`
- Types: "project" or "post"
- Calls `revalidatePath()` on appropriate routes
- Returns: `{ success: true, message, timestamp }`
- Error handling for invalid secret/type
- Optional GET handler for health check
- Rate limit: None (should add in production)

#### 15. **Contact Form Handler**
📄 `/src/app/api/contact/route.ts`
- `POST /api/contact` - Form submission
- Validates required fields: name, email, message
- Honeypot field check for spam prevention
- Email format validation
- In-memory rate limiting (5 per hour per IP)
- Supports multiple backends:
  1. **Formspree** (if `FORMSPREE_ID` env var)
  2. **WordPress REST API** (if `WORDPRESS_API_URL` & `WORDPRESS_API_TOKEN`)
  3. **SendGrid** (if `SENDGRID_API_KEY` & `SENDGRID_TO_EMAIL`)
  4. Fallback: Console logging only
- Returns: `{ success: true, message }`
- HTTP 429 for rate limit exceeded
- Optional GET handler for health check

---

## SUPPORTING FILES

### UI Components (Pre-existing)
- `/src/components/ui/bento-grid.tsx` - Grid wrapper
- `/src/components/ui/Breadcrumbs.tsx` - Navigation breadcrumbs with schema
- `/src/components/ui/button.tsx` - Button variants

### API Functions (Updated)
📄 `/src/lib/api.ts` - Enhanced with:
- `getAllProjects(first, after)` → `{ projects, pageInfo }`
- `getProjectBySlug(slug)` → `Project | null`
- `getFeaturedProjects()` → `Project[]`
- `getAllProjectSlugs()` → `string[]`
- `getProjectsByType(typeSlug, first)` → `{ projects, pageInfo }`
- `getProjectsByTechStack(techSlug, first)` → `{ projects, pageInfo }`
- **NEW:** `getRelatedProjects(projectId, typeId, first)` → `Project[]`
- `getAllPosts(first, after)` → `{ posts, pageInfo }`
- `getPostBySlug(slug)` → `BlogPost | null`
- `getRecentPosts(count)` → `BlogPost[]`
- `getAllPostSlugs()` → `string[]`
- `getPostsByCategory(categorySlug, first)` → `{ posts, pageInfo }`
- `getPostsByTag(tagSlug, first)` → `{ posts, pageInfo }`
- `getRelatedPosts(categoryIds, currentPostId, first)` → `BlogPost[]`

### Types
📄 `/src/types/wordpress.ts` - Full TypeScript types for:
- `Project` - CPT with featured image, tech stack, client info, URLs
- `BlogPost` - Post with content, categories, tags, author
- `Service`, `Testimonial`, `MenuItem`, `SiteSettings`, `TaxonomyTerm`
- `PageInfo` - Pagination metadata
- `APIError` - Error structure

### Utilities
📄 `/src/lib/utils.ts`
- `cn()` - classname merge utility (clsx + tailwind-merge)
- Other utility functions for formatting, slugs, etc.

---

## THEME & STYLING

### Color Palette
- **Brand**: `#6366f1` (Indigo-500)
- **Accent**: `#10b981` (Emerald-500)
- **Background**: `bg-slate-950` (Dark theme)
- **Text Primary**: `text-white`
- **Text Secondary**: `text-slate-300`
- **Borders**: `border-slate-800`

### Responsive Breakpoints
- Mobile: `max-width: 768px`
- Tablet: `max-width: 1024px`
- Desktop: `max-width: 1280px`

### Animations
- Framer Motion for all interactive animations
- `motion.div`, `motion.button`, etc.
- Variants for entrance, hover, tap states
- Scroll-triggered animations with `whileInView`
- Staggered children animations
- Layout animations with `layoutId`

---

## KEY FEATURES IMPLEMENTED

✅ **Projects Pages**
- Archive with filter by project type
- Single project showcase with interactive preview
- Tech stack and client information
- Project gallery with lightbox
- Related projects section
- Full SEO optimization

✅ **Blog Pages**
- Archive with pagination and category filter
- Featured post highlighting
- Single post with table of contents
- Author bio section
- Share buttons (Twitter, LinkedIn, Copy)
- Related posts section
- Reading time calculation
- Full article-level SEO

✅ **Components**
- Reusable, composable card components
- Responsive grid layouts
- Animated interactions
- Keyboard navigation support
- Accessible ARIA labels

✅ **API Routes**
- On-demand revalidation for ISR
- Contact form with multiple backends
- Rate limiting
- Error handling

✅ **Performance**
- Server-side rendering for SEO
- Static generation with dynamic routes
- Image optimization with Next.js Image
- Lazy loading for images
- Code splitting with client components

✅ **Accessibility**
- Semantic HTML
- Breadcrumb navigation
- Keyboard shortcuts (ESC, arrows)
- ARIA labels on interactive elements
- Schema.org structured data (JSON-LD)
- Alt text for images

---

## CONFIGURATION REQUIRED

### Environment Variables
```env
# WordPress GraphQL Endpoint
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress.com

# Revalidation
REVALIDATE_SECRET=your-secret-key

# Contact Form (choose one or more)
FORMSPREE_ID=your_formspree_id
# OR
WORDPRESS_API_URL=https://your-wordpress.com/wp-json
WORDPRESS_API_TOKEN=your_jwt_token
# OR
SENDGRID_API_KEY=your_sendgrid_key
SENDGRID_TO_EMAIL=contact@yourdomain.com

# Site Info
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### WordPress Custom Fields Required
Projects CPT:
- `client_name` (text)
- `completion_date` (date)
- `project_duration` (text)
- `live_url` (URL)
- `github_url` (URL)
- `iframe_url` (URL)
- `demo_gif_url` (URL)
- `gallery_images` (repeater/array)
- `client_testimonial` (text)

Blog Posts:
- `subtitle` (text)
- `author_bio` (text)
- `author_avatar` (image)
- `show_toc` (boolean)

Taxonomies:
- `project_type` - Projects CPT
- `technologies` - Projects CPT
- `category` - Posts
- `post_tag` - Posts (built-in)

---

## DEVELOPMENT NOTES

### Import Paths
```typescript
import { getAllProjects } from '@/lib/api'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { cn } from '@/lib/utils'
import { Project } from '@/types/wordpress'
```

### Creating New Pages
1. Create page.tsx or [slug]/page.tsx in `/src/app`
2. Use `'use client'` only if needed for interactivity
3. Export `generateMetadata()` for SEO
4. Use `generateStaticParams()` for dynamic routes
5. Import components from `/src/components`

### Performance Tips
- Images use Next.js `Image` component with `sizes` prop
- Lazy loading for images not in viewport
- Suspense boundaries for streaming content
- Framer Motion `initial={false}` for controlled components
- `whileInView` for scroll-triggered animations

---

## TROUBLESHOOTING

**Issue**: Images not loading
- Check `NEXT_PUBLIC_WORDPRESS_URL` is set
- Verify WordPress featured image is set on CPT
- Ensure images are publicly accessible

**Issue**: Filters not working
- Verify taxonomy terms exist in WordPress
- Check CPT has taxonomy association

**Issue**: Revalidation not working
- Verify `REVALIDATE_SECRET` matches
- Check POST request includes correct slug & type
- Look for errors in Next.js build logs

**Issue**: Contact form not submitting
- Verify at least one email service is configured
- Check honeypot field name doesn't appear in form
- Monitor rate limiting (5 requests per hour per IP)

---

## Files Summary

### Server Components (14)
- `projects/page.tsx`
- `projects/[slug]/page.tsx`
- `blog/page.tsx`
- `blog/[slug]/page.tsx`

### Client Components (9)
- `projects/ProjectCard.tsx`
- `projects/ProjectFilter.tsx`
- `projects/ProjectIframe.tsx`
- `projects/ProjectGallery.tsx`
- `projects/RelatedProjects.tsx`
- `blog/PostCard.tsx`
- `blog/TableOfContents.tsx`
- `blog/ShareButtons.tsx`
- `blog/AuthorBio.tsx`

### API Routes (2)
- `api/revalidate/route.ts`
- `api/contact/route.ts`

### Total: 25 files created/modified

---

## Next Steps

1. Set up WordPress custom fields & taxonomies
2. Configure environment variables
3. Test data fetching with `getAllProjects()` and `getAllPosts()`
4. Customize colors in Tailwind config if needed
5. Update contact form email destinations
6. Set up revalidation webhooks in WordPress
7. Deploy and monitor performance
