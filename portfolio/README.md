# Ray Turk Portfolio — Headless WordPress + Next.js

A modern, high-performance portfolio built with **WordPress as a headless CMS** and **Next.js 14** on the frontend. Deployed to **Netlify** via **GitHub**.

## Architecture

```
┌──────────────────┐     WPGraphQL     ┌──────────────────┐     CDN      ┌──────────┐
│  WordPress CMS   │ ◄──────────────── │  Next.js 14 SSG  │ ──────────► │ Visitors │
│  (Your hosting)  │   ACF fields +    │  (Netlify Edge)  │  ISR cache  │          │
│                  │   Custom Types     │                  │             │          │
└──────────────────┘                   └──────────────────┘             └──────────┘
```

## Tech Stack

**Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion
**Backend:** WordPress, ACF Pro, WPGraphQL, WPGraphQL for ACF
**Deployment:** Netlify (frontend), Your existing WP hosting (backend)
**Data Layer:** Apollo Client, GraphQL, ISR (Incremental Static Regeneration)

---

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
npm install
```

### 2. Environment Variables

Copy the example env and fill in your values:

```bash
cp .env.local.example .env.local
```

Required variables:
- `NEXT_PUBLIC_WORDPRESS_URL` — Your WordPress site URL (e.g., `https://cms.rayturk.com`)
- `WORDPRESS_GRAPHQL_ENDPOINT` — GraphQL endpoint (e.g., `https://cms.rayturk.com/graphql`)
- `NEXT_PUBLIC_SITE_URL` — Your frontend URL (e.g., `https://rayturk.com`)
- `REVALIDATION_SECRET` — A random 32+ char string for ISR webhook auth

### 3. WordPress Setup

Install these plugins on your WordPress site:

1. **Advanced Custom Fields PRO** — [advancedcustomfields.com](https://advancedcustomfields.com)
2. **WPGraphQL** — [wpgraphql.com](https://wpgraphql.com)
3. **WPGraphQL for ACF** — [acf.wpgraphql.com](https://acf.wpgraphql.com)

Then upload the custom plugins from this repo:

```
wordpress/plugins/portfolio-headless-cms/   → wp-content/plugins/
wordpress/plugins/portfolio-isr-webhook/    → wp-content/plugins/
wordpress/theme/                            → wp-content/themes/portfolio-headless/
```

Activate all plugins and the theme, then:
- Go to **Settings → Headless Settings** and set your Frontend URL and Revalidation Secret
- Go to **Custom Fields → Sync** to register all field groups
- Create sample content (a few projects, blog posts, services, testimonials)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Deploy to Netlify

Connect your GitHub repo to Netlify:

1. Push to GitHub
2. In Netlify: New Site → Import from Git → Select repo
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add all env variables from `.env.local` to Netlify's environment settings
6. Install the `@netlify/plugin-nextjs` plugin (should auto-detect)

The `netlify.toml` in this repo handles the rest.

---

## Project Structure

```
portfolio/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── page.tsx                  # Homepage (Bento grid hero)
│   │   ├── layout.tsx                # Root layout
│   │   ├── loading.tsx               # Loading state
│   │   ├── not-found.tsx             # 404 page
│   │   ├── projects/
│   │   │   ├── page.tsx              # Projects archive with filters
│   │   │   └── [slug]/page.tsx       # Single project (iframe showcase)
│   │   ├── blog/
│   │   │   ├── page.tsx              # Blog archive with pagination
│   │   │   └── [slug]/page.tsx       # Single post (TOC, share, schema)
│   │   ├── services/
│   │   │   ├── page.tsx              # Services + pricing tiers
│   │   │   └── [slug]/page.tsx       # Single service detail
│   │   ├── about/page.tsx            # About (skills, timeline)
│   │   ├── contact/page.tsx          # Contact form + info
│   │   └── api/
│   │       ├── revalidate/route.ts   # ISR webhook endpoint
│   │       └── contact/route.ts      # Contact form handler
│   ├── components/
│   │   ├── layout/                   # Header, Footer, Nav, Container
│   │   ├── ui/                       # Button, Card, Badge, BentoGrid, etc.
│   │   ├── sections/                 # Hero, Pricing, FAQ, Timeline, etc.
│   │   ├── projects/                 # ProjectCard, Filter, Gallery, Iframe
│   │   ├── blog/                     # PostCard, TOC, Share, AuthorBio
│   │   ├── animations/               # RevealOnScroll, CountUp, TextReveal, etc.
│   │   └── seo/                      # JsonLd component
│   ├── lib/
│   │   ├── api.ts                    # Data fetching functions
│   │   ├── graphql-client.ts         # Apollo Client setup
│   │   ├── seo.ts                    # Metadata generators
│   │   ├── schema.ts                 # JSON-LD schema generators
│   │   ├── animations.ts             # Framer Motion variants
│   │   ├── utils.ts                  # Utility functions
│   │   ├── constants.ts              # Site-wide constants
│   │   └── queries/                  # GraphQL query definitions
│   ├── hooks/                        # useScrollAnimation, useReducedMotion, etc.
│   ├── styles/globals.css            # Tailwind base + custom utilities
│   └── types/wordpress.ts            # TypeScript type definitions
├── wordpress/
│   ├── theme/                        # Headless WP theme
│   └── plugins/
│       ├── portfolio-headless-cms/   # CPTs, ACF fields, GraphQL config
│       └── portfolio-isr-webhook/    # Auto-revalidation on content change
├── public/                           # Static assets
├── next.config.mjs                   # Next.js configuration
├── tailwind.config.ts                # Tailwind with custom theme
├── netlify.toml                      # Netlify deployment config
├── next-sitemap.config.js            # Sitemap generation
└── package.json
```

## Key Features

### SEO
- Full metadata on every page (Open Graph, Twitter Cards)
- JSON-LD structured data: Person, LocalBusiness, WebSite, Service, BlogPosting, CreativeWork, FAQ, BreadcrumbList
- Auto-generated sitemap and robots.txt
- Canonical URLs, hreflang-ready
- Cleveland + WordPress maintenance keywords baked in

### Interactive Project Showcases
- Live iframe embeds with browser chrome mockup
- GIF/video fallback for mobile
- Featured image fallback as final safety net
- Image gallery with lightbox and keyboard navigation

### Animations
- Framer Motion scroll-triggered reveals
- Animated skill progress bars
- Count-up statistics
- Magnetic hover buttons
- Text reveal animations
- Respects `prefers-reduced-motion`

### WordPress Backend
- 3 Custom Post Types: Projects, Services, Testimonials
- 3 Custom Taxonomies: Project Type, Tech Stack, Project Status
- 70+ ACF fields across 5 field groups
- Options pages for site-wide settings
- Auto ISR revalidation on content changes

### Maintenance-Focused Content
- Prominent pricing tiers (Basic/Pro/Enterprise)
- FAQ section with schema markup
- Free site audit CTA throughout
- Service-specific landing pages

---

## ISR (Incremental Static Regeneration)

Content updates automatically without rebuilding:

1. You edit content in WordPress
2. The ISR webhook plugin fires a POST to `/api/revalidate`
3. Next.js revalidates just the affected pages
4. Visitors see fresh content within seconds

To set this up, make sure:
- The `REVALIDATION_SECRET` matches in both WordPress (Headless Settings) and your `.env.local`
- The ISR Webhook plugin is activated in WordPress
- Your Netlify deployment has the env variable set

---

## Development Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server locally
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checker
```

---

## Customization

**Brand Colors:** Edit `tailwind.config.ts` — `brand` (indigo) and `accent` (emerald) palettes.

**Pricing Tiers:** Edit `src/components/sections/PricingTiers.tsx` with your actual pricing.

**FAQ Content:** Edit `src/components/sections/FAQ.tsx` or manage via WordPress.

**Timeline:** Edit `src/components/sections/Timeline.tsx` with your actual career history.

**Social Links:** Update `SOCIAL_LINKS` in `src/lib/constants.ts` or manage via WordPress options page.

---

## License

Private project. All rights reserved.
