# rturk.me Rebuild — Design Spec

**Date:** 2026-06-12
**Status:** Approved by Ray (brainstorming session)
**Supersedes:** the "forge" brand portfolio in `Headless-Portfolio/portfolio/`

## Purpose & Audience

rturk.me shifts from freelance lead-gen (now owned by codetheland.com) to a
**personal technical credibility site**. Three audiences, in rough priority order:

1. Hiring managers / recruiters evaluating Ray for senior roles
2. Fellow developers arriving from posts, GitHub, or socials
3. Technical clients who need to see engineering depth

The site itself is the proof: cutting-edge stack, visible architecture, public
repo, enforced performance budgets, and interactive moments that demonstrate
craft without sacrificing SEO.

## Visual Identity — "Ion"

Dark Lab atmosphere with Design Engineer discipline.

**Palette:**

| Token | Hex | Use |
|---|---|---|
| void | `#0a0b0f` | page background (blue-tinted near-black) |
| panel | `#12141c` | cards, raised surfaces |
| hairline | `#1e222e` | borders (1px only, never fills) |
| ion | `#22d3ee` | THE accent — links, CTAs, highlights |
| drift | `#a78bfa` | hero canvas glow ONLY, nowhere else |
| signal | `#f0f2f8` | primary text |
| muted | `#9aa3b5` | secondary text |
| faint | `#5b6478` | metadata, labels |

Restraint rule: outside the hero canvas, the site is monochrome + ion cyan.

**Typography:**

- **Clash Display** (600/700) — headlines, hero. Self-hosted woff2 (Fontshare license).
- **Archivo** — body copy.
- **JetBrains Mono** — labels, eyebrows, code, metadata ("the engineering voice").

All fonts self-hosted via `next/font`.

**Motion language:** showpiece moments on a lean core.

- Hero: pointer-reactive particle field, hand-rolled canvas (~200 lines, no
  three.js). Dynamically imported after first paint. Static gradient fallback;
  honors `prefers-reduced-motion`.
- Everywhere else: micro-interactions — magnetic buttons, spring presses,
  staggered scroll reveals, card tilt/glow on hover.
- "Under the Hood" pipeline diagram draws itself on scroll.
- Page transitions via View Transitions API (progressive enhancement).

## Site Structure

| Route | Content |
|---|---|
| `/` | Hero (canvas, status line) → Selected Work grid → Under the Hood pipeline → Writing list → About teaser + contact CTA |
| `/work` | Case study index |
| `/work/[slug]` | Deep-dive template: hero · context · architecture diagram · decisions · code snippets (Shiki) · metrics strip · live link |
| `/writing` | Blog index (list rows, not cards) |
| `/writing/[slug]` | Post with auto-generated TOC, Shiki-highlighted code |
| `/about` | Story, stack, /uses content folded in |
| `/colophon` | How this site is built: stack, repo link, CI, perf budget |
| `/contact` | Form (ported: rate-limited 5/hr/IP, honeypot) |
| `/privacy`, `/terms` | Ported static pages |

**Homepage hero status line:** build-time metadata in mono (e.g.
`● last commit: 2h ago · lighthouse: 100 · main@netlify`). Sourced at build:
commit ref/time from Netlify's `COMMIT_REF` env, Lighthouse score from the last
CI run's stored result. No client-side API calls.

**Navigation:** minimal top nav (work · writing · about) + `cmdk` command palette
(⌘K) covering pages, posts, projects, socials, "copy email".

**Redirects (301, netlify.toml):**

- `/projects/*` → `/work/*`
- `/blog/*` → `/writing/*`
- `/services`, `/audit` → `/` (home)

**Dropped from front-end:** Services pages, audit tool, testimonials slider.
CPTs may remain in WP, unconsumed.

## Architecture & Stack

**New dedicated public repo** (e.g. `rturk.me`). The existing Headless-Portfolio
repo stays as-is for demo sites. The repo is part of the showcase: clean
history, conventional commits, CI badges, "view source ↗" link in the footer.

**Core:** Next.js 15 (App Router, RSC) · React 19 · TypeScript · Tailwind v4.
PPR off initially (experimental on Netlify); candidate for a future colophon
entry.

**Data layer:** Apollo Client is dropped. Replaced with:

- Thin `fetch`-based GraphQL client (Next data cache–friendly)
- **GraphQL Codegen** generating types from the WPGraphQL schema
- Ported from old repo with minimal change: query documents, `api.ts` function
  signatures, ISR revalidate webhook (`POST /api/revalidate`, `X-ISR-Secret`),
  contact route (rate limiting + honeypot), schema.ts JSON-LD helpers
- Static fallback content pattern when CMS is unreachable (carried over)

**Front-end engineering:**

- `motion` (Framer Motion successor) for micro-interactions
- Hand-rolled canvas particle hero (no WebGL library dependency)
- `cmdk` command palette
- Shiki server-side syntax highlighting (case studies, blog code blocks —
  including re-highlighting `<pre><code>` blocks inside WP post HTML)
- `next/og` per-page OG image generation

**CMS (WordPress at cms.rturk.me):** unchanged host/plumbing.
**Prerequisite:** WPGraphQL for ACF plugin must be installed and active
(commit `4a3b0e2` removed `blogFields` because it was missing — this blocks
the content model below).

## Content Model (ACF)

**Projects CPT — new "Case Study" field group**, exposed via WPGraphQL:

- Overview: role, timeline, stack list, live URL
- Context: problem/brief (wysiwyg)
- Architecture: diagram image + explanation copy
- Decisions: repeater (decision + rationale)
- Code snippets: repeater (language + code + caption)
- Metrics: repeater (label + value)

**Posts:** existing ACF fields unchanged. TOC generated from headings at
render time; code blocks re-highlighted server-side.

## SEO

- Native `app/sitemap.ts` + `robots.ts` (drop `next-sitemap`)
- Metadata API per route; canonical `https://rturk.me`
- JSON-LD ported: Person, WebSite, Article (posts), CreativeWork (case studies)
- RSS feed for `/writing`
- 301 redirect map (above) preserves existing rankings
- GTM + cookie consent banner (GTM gated on consent) carried over

## Performance — enforced via CI

Lighthouse CI budgets in the pipeline (fail the build, not aspirations):

- Performance ≥ 95
- LCP < 1.8s
- CLS < 0.1

Tactics: canvas deferred post-paint, self-hosted subset fonts, `next/image`
everywhere, no Apollo/three.js weight, lean client JS (RSC-first).

## Dev Workflow (repo-as-showcase pillar)

- GitHub Actions on PR: lint · type-check · Vitest unit tests · Playwright
  smoke test · Lighthouse CI
- Conventional commits
- Typed GraphQL via codegen in the build
- Public repo linked from `/colophon` and footer

## Error Handling

- CMS unreachable at build/revalidate → static fallback content (ported pattern)
- Canvas unsupported / reduced-motion → static gradient hero
- View Transitions unsupported → normal navigation (progressive enhancement)
- Contact form failures → inline error states; rate limiting returns 429

## Testing

- Vitest + Testing Library: lib functions (TOC generation, GraphQL client,
  schema helpers), interactive components
- Playwright smoke: home renders, palette opens, work/writing routes resolve,
  contact form validates
- Lighthouse CI: perf budgets per key route

## Cutover Plan

1. Build in new repo → deploy to a fresh Netlify site (preview subdomain)
2. Polish against preview; verify redirects, webhook, env vars
3. Re-point WordPress ISR webhook to new site; set env vars
   (`NEXT_PUBLIC_WORDPRESS_URL`, `WORDPRESS_GRAPHQL_ENDPOINT`,
   `NEXT_PUBLIC_SITE_URL`, `REVALIDATION_SECRET`, GTM ID)
4. Swap rturk.me domain to the new Netlify site
5. Old site/repo untouched for instant rollback

## Out of Scope

- Any changes to codetheland.com or demo sites
- WP hosting/server changes beyond installing WPGraphQL for ACF
- Services/audit functionality (retired from rturk.me)
