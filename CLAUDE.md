# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Root

All active source code is in `portfolio/`. The nested `portfolio/portfolio/` directory is an older copy — **do not edit it**.

## Commands

Run from the `portfolio/` directory:

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build + sitemap generation
npm run lint       # ESLint via Next.js
npm run type-check # TypeScript check without emitting
```

## Architecture

**Next.js 14 App Router + Headless WordPress**

- WordPress at `cms.rturk.me` serves content via WPGraphQL
- Next.js fetches data at build time (SSG) with ISR for updates
- Deployed to Netlify with `@netlify/plugin-nextjs` for edge functions

**Data Flow:**
1. GraphQL queries in `src/lib/queries/` define what data to fetch
2. `src/lib/graphql-client.ts` holds the Apollo Client singleton (no-cache for SSG freshness)
3. `src/lib/api.ts` wraps queries in typed async functions (`getFeaturedProjects()`, `getPostBySlug()`, etc.)
4. Page components call these functions directly (no client-side fetching for content)

**ISR Webhook:** WordPress triggers `POST /api/revalidate` on content save. The route validates `X-ISR-Secret` header and calls `revalidatePath()` for the affected route.

## Path Aliases

```
@/*                → src/*
@/components/*     → src/components/*
@/lib/*            → src/lib/*
@/hooks/*          → src/hooks/*
@/types/*          → src/types/*
```

## Key Conventions

**Tailwind Theme (Forge Brand):**
- Brand color: forge orange (`brand-500` = `#f97316`), hover: `brand-600` = `#ea6811`
- Secondary color: industrial steel (`steel-700` = `#334e68`) — depth, nav active, badge fills
- Surface/dark: warm slag (`surface-950` = `#0f0d0b` page bg, `surface-900` = `#1a1714` cards)
- Text: `text-cinder` (`#fdf6ee`) primary, `text-ash` (`#e8dfd4`) secondary — not `text-surface-50`
- Custom shadows: `shadow-glow`, `shadow-glow-lg`, `shadow-glow-brand`, `shadow-glow-steel`, `shadow-forge`, `shadow-bento`, `shadow-bento-hover`
- Custom grid: `grid-cols-bento` (4-col), `grid-cols-bento-sm` (2-col)
- **Never use `md:row-span-2` on bento grid items** — causes empty space stretching
- Use `steel-*` for what used to be `accent-*` (emerald replaced by industrial steel)

**Fonts:**
- `font-sans` → Barlow (`--font-sans`)
- `font-display` → Barlow Condensed (`--font-display`) — H1s, hero, section titles
- `font-mono` → IBM Plex Mono (`--font-mono`) — eyebrows, labels, tech tags, code

**Animations:**
- Use `src/hooks/useReducedMotion.ts` when adding motion
- Framer Motion variants centralized in `src/lib/animations.ts`
- Scroll reveals via `src/components/animations/RevealOnScroll.tsx`

**Contact Form:**
- Rate-limited (5 req/hr/IP) in `src/app/api/contact/route.ts`
- Honeypot spam field present — don't remove it
- Netlify Forms static detection at `public/__forms.html`; form POSTs to `/` with hidden `form-name` input

## Required Environment Variables

```
NEXT_PUBLIC_WORDPRESS_URL=https://cms.rturk.me
NEXT_PUBLIC_WP_HOSTNAME=cms.rturk.me
WORDPRESS_GRAPHQL_ENDPOINT=https://cms.rturk.me/graphql
NEXT_PUBLIC_SITE_URL=https://rturk.me
REVALIDATION_SECRET=<32+ char secret>
```

Optional: `FORMSPREE_ID`, `SENDGRID_API_KEY`, `NEXT_PUBLIC_GA_ID`

## Content Types

WordPress custom post types consumed via GraphQL:
- **Projects** — portfolio items with iframe showcase on detail pages
- **Services** — service descriptions (referenced in ServicesOverview + PricingTiers)
- **Testimonials** — reviews shown in slider on homepage
- **Posts** — blog content with ACF fields for featured image, category, reading time

## SEO & Schema

Every page renders JSON-LD via `src/components/seo/JsonLd.tsx`. Schema helpers are in `src/lib/schema.ts`. Sitemap auto-generates on build via `next-sitemap`. Don't remove schema components when editing pages.
