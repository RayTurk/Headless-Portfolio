# rturk.me Rebuild — Plan 3: Launch Readiness

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make rturk.me launch-ready in code — JSON-LD structured data, native sitemap/robots, an RSS feed, per-route OG images, consent-gated GTM analytics, a Playwright smoke suite, and a GitHub Actions CI pipeline with Lighthouse budgets — plus code-splitting the command palette for perf. The actual domain cutover is an ops checklist for Ray (end of this doc), not executable here.

**Architecture:** SEO/structured-data are pure server-rendered additions (JSON-LD in `<head>`, file-convention `sitemap.ts`/`robots.ts`/`opengraph-image.tsx`). The RSS feed and OG images are route/file conventions that run at build/ISR time. Analytics load only after explicit consent (no GTM before opt-in). CI runs the existing four gates plus Playwright + Lighthouse on every push.

**Tech Stack:** Next 16 (Metadata API, `next/og` `ImageResponse`, route handlers), React 19, `@playwright/test`, `@lhci/cli`, GitHub Actions. Tests: Vitest (unit, existing) + Playwright (e2e, new).

**Repo:** `/Users/raymondturk/Developer/github/rturk-me` (Plans 1+2 complete, pushed to github.com/RayTurk/rturk-me, HEAD ~`b370404`).
**Spec:** `/Users/raymondturk/Developer/github/Headless-Portfolio/docs/superpowers/specs/2026-06-12-portfolio-rebuild-design.md`

**Conventions (already in repo):**
- Run `source ~/.nvm/nvm.sh && nvm use 20` before every npm command.
- Ion tokens: `bg-void bg-panel border-hairline text-signal text-muted text-faint text-ion bg-ion font-display font-mono font-sans`.
- Verify each task: `npm test && npm run type-check && npm run lint && npm run build` (all stay green; content routes stay ○/●).
- Data: `src/lib/api.ts` (`getAllPosts`, `getRecentPosts`, `getAllProjects`, `getPostBySlug`, `getProjectBySlug`, `getAllPostSlugs`, `getAllProjectSlugs`). Types: `src/types/wordpress.ts`. Site constants: `src/lib/constants.ts` (`SITE_URL`, `SITE_NAME`, `SITE_AUTHOR`).
- Old repo (for reference/porting): `/Users/raymondturk/Developer/github/Headless-Portfolio/portfolio` — has `src/lib/schema.ts`, `src/components/seo/JsonLd.tsx`, `src/components/consent/ConsentBanner.tsx` (GTM id `GTM-WSTH9JTX`).

---

## Out of Scope — Ops Cutover (Ray's checklist, NOT executable tasks)

These require credentials/DNS/CMS access only Ray has. Documented at the END of this plan, not built here:
- Provision the Netlify site from the GitHub repo; set env vars.
- Enable WPGraphQL introspection (or app password) → run codegen → drop `fetchGraphQL<any>` (Plan 2b).
- Reconfigure the WP ISR webhook to send `/work/<slug>` + `/writing/<slug>` paths.
- Point the rturk.me domain at the new Netlify site; verify redirects.
- ACF case-study template (Plan 2b, CMS-gated).

---

## File Structure (end state of Plan 3)

```
rturk-me/
├── .github/workflows/ci.yml          # lint·type-check·test·build + e2e + lighthouse
├── lighthouserc.json                 # Lighthouse CI budgets
├── playwright.config.ts
├── e2e/
│   └── smoke.spec.ts                 # home, palette, routes, contact form
├── .env.example                      # + NEXT_PUBLIC_GTM_ID
└── src/
    ├── lib/
    │   ├── schema.ts                 # JSON-LD generators (Person/WebSite/Article/CreativeWork/Breadcrumb)
    │   ├── schema.test.ts            # unit tests for generators
    │   ├── rss.ts                    # buildRssXml() pure builder
    │   └── rss.test.ts
    ├── components/
    │   ├── seo/JsonLd.tsx            # <script type=ld+json> renderer
    │   └── consent/ConsentBanner.tsx # Ion-styled, GTM-gated
    └── app/
        ├── layout.tsx               # site-wide Person+WebSite JSON-LD; ConsentBanner; dynamic palette
        ├── sitemap.ts               # native sitemap
        ├── robots.ts                # native robots
        ├── opengraph-image.tsx      # default OG card
        ├── feed.xml/route.ts        # RSS
        ├── writing/[slug]/
        │   ├── page.tsx             # + Article JSON-LD
        │   └── opengraph-image.tsx  # per-post OG
        └── work/[slug]/
            ├── page.tsx             # + CreativeWork JSON-LD
            └── opengraph-image.tsx  # per-project OG
```

---

### Task 1: JSON-LD schema generators + JsonLd component (TDD)

**Files:**
- Create: `src/lib/schema.ts`, `src/lib/schema.test.ts`, `src/components/seo/JsonLd.tsx`

- [ ] **Step 1: Write the failing test** — `src/lib/schema.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import {
  generatePersonSchema,
  generateWebSiteSchema,
  generateArticleSchema,
  generateCreativeWorkSchema,
} from './schema';

describe('schema generators', () => {
  it('Person schema has the right identity', () => {
    const s = generatePersonSchema();
    expect(s['@type']).toBe('Person');
    expect(s.name).toBe('Ray Turk');
    expect(s.sameAs.some((u: string) => u.includes('github.com/RayTurk'))).toBe(true);
  });

  it('WebSite schema points at the site url', () => {
    const s = generateWebSiteSchema();
    expect(s['@type']).toBe('WebSite');
    expect(s.url).toContain('rturk.me');
  });

  it('Article schema carries headline + url', () => {
    const s = generateArticleSchema(
      { title: 'My Post', date: '2026-06-01T00:00:00', excerpt: 'hi' },
      'https://rturk.me/writing/my-post'
    );
    expect(s['@type']).toBe('Article');
    expect(s.headline).toBe('My Post');
    expect(s.url).toBe('https://rturk.me/writing/my-post');
    expect(s.author.name).toBe('Ray Turk');
  });

  it('CreativeWork schema carries name + url', () => {
    const s = generateCreativeWorkSchema(
      { title: 'Cool Project' },
      'https://rturk.me/work/cool-project'
    );
    expect(s['@type']).toBe('CreativeWork');
    expect(s.name).toBe('Cool Project');
    expect(s.url).toBe('https://rturk.me/work/cool-project');
  });
});
```

- [ ] **Step 2: Run it — expect FAIL** (`npm test -- schema`): cannot resolve `./schema`.

- [ ] **Step 3: Implement `src/lib/schema.ts`**

```ts
/**
 * JSON-LD structured-data generators. Pure functions returning schema.org
 * objects; rendered by <JsonLd/>. Identity URLs come from env with sane
 * fallbacks so the build works before launch env vars are set.
 */
import { SITE_URL, SITE_NAME, SITE_AUTHOR } from './constants';

const GITHUB = process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/RayTurk';
const LINKEDIN =
  process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/raymond-turk-cle';

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_AUTHOR,
    jobTitle: 'Full-Stack Web Developer',
    url: SITE_URL,
    sameAs: [GITHUB, LINKEDIN],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cleveland',
      addressRegion: 'OH',
      addressCountry: 'US',
    },
    knowsAbout: ['Next.js', 'React', 'TypeScript', 'WordPress', 'WPGraphQL', 'PHP', 'Laravel'],
    description:
      'Cleveland-based full-stack developer building fast, headless, animated web experiences.',
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    author: { '@type': 'Person', name: SITE_AUTHOR },
  };
}

interface ArticleInput {
  title: string;
  date?: string;
  excerpt?: string;
  image?: string;
}

export function generateArticleSchema(post: ArticleInput, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    url,
    datePublished: post.date,
    description: post.excerpt,
    image: post.image,
    author: { '@type': 'Person', name: SITE_AUTHOR, url: SITE_URL },
    publisher: { '@type': 'Person', name: SITE_AUTHOR },
  };
}

interface CreativeWorkInput {
  title: string;
  excerpt?: string;
  image?: string;
}

export function generateCreativeWorkSchema(project: CreativeWorkInput, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    url,
    description: project.excerpt,
    image: project.image,
    creator: { '@type': 'Person', name: SITE_AUTHOR, url: SITE_URL },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}
```
Note: confirm `src/lib/constants.ts` exports `SITE_URL`, `SITE_NAME`, `SITE_AUTHOR` (it does — ported in Plan 1). If a name differs, use the real export.

- [ ] **Step 4: Implement `src/components/seo/JsonLd.tsx`** (ported from old repo, unchanged — it's framework-agnostic)

```tsx
/** Renders one or more JSON-LD objects as <script type="application/ld+json">. */
export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
```

- [ ] **Step 5: Run the test — expect PASS** (`npm test -- schema`).

- [ ] **Step 6: Verify + commit**

Run: `npm test && npm run type-check && npm run lint && npm run build`
Expected: all green.
```bash
git add -A && git commit -m "feat: JSON-LD schema generators + JsonLd component (TDD)"
```

---

### Task 2: Render JSON-LD site-wide + on detail pages

**Files:**
- Modify: `src/app/layout.tsx`, `src/app/writing/[slug]/page.tsx`, `src/app/work/[slug]/page.tsx`

- [ ] **Step 1: Site-wide Person + WebSite in `src/app/layout.tsx`** — add imports and render `<JsonLd/>` inside `<body>` (before `<Header/>`):

```tsx
import { JsonLd } from '@/components/seo/JsonLd';
import { generatePersonSchema, generateWebSiteSchema } from '@/lib/schema';
```
Inside `<body>`, as the first children:
```tsx
        <JsonLd data={[generatePersonSchema(), generateWebSiteSchema()]} />
```
(Place it just above the existing `<CommandPalette />` / `<Header />`. JSON-LD `<script>` is valid in `<body>` for Next App Router.)

- [ ] **Step 2: Article JSON-LD on `src/app/writing/[slug]/page.tsx`** — import the helper + JsonLd, and render it inside the returned article. Add imports:
```tsx
import { JsonLd } from '@/components/seo/JsonLd';
import { generateArticleSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/constants';
```
After `const { html, toc } = await processPostContent(...)`, build the schema:
```tsx
  const articleSchema = generateArticleSchema(
    { title: post.title, date: post.date, excerpt: post.excerpt },
    `${SITE_URL}/writing/${slug}`
  );
```
Then render `<JsonLd data={articleSchema} />` as the first child inside the outer `<div className="mx-auto max-w-5xl px-6 py-16">`.
Note: confirm `BlogPost` has an `excerpt` field in `src/types/wordpress.ts`; if not, omit `excerpt` from the call (the schema field is optional).

- [ ] **Step 3: CreativeWork JSON-LD on `src/app/work/[slug]/page.tsx`** — add imports:
```tsx
import { JsonLd } from '@/components/seo/JsonLd';
import { generateCreativeWorkSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/constants';
```
After fetching `project`, build:
```tsx
  const workSchema = generateCreativeWorkSchema(
    { title: project.title, excerpt: project.excerpt },
    `${SITE_URL}/work/${slug}`
  );
```
Render `<JsonLd data={workSchema} />` as the first child of the `<article>`. (Confirm `Project` has `excerpt`; omit if absent.)

- [ ] **Step 4: Verify** — `npm run build`, then `npm run dev` and curl a post + a project page; confirm each HTML contains `application/ld+json` with the right `@type`. Also curl `/` and confirm Person + WebSite scripts present. Kill dev. `npm test && npm run type-check && npm run lint` green.

- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: render Person/WebSite/Article/CreativeWork JSON-LD"
```

---

### Task 3: Native sitemap.ts

**Files:**
- Create: `src/app/sitemap.ts`

- [ ] **Step 1: Implement `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from 'next';
import { getAllPostSlugs, getAllProjectSlugs } from '@/lib/api';
import { SITE_URL } from '@/lib/constants';

export const revalidate = 3600;

/** Static + dynamic sitemap. Slug fetches fall back to [] on CMS error, so the
 *  build never fails — static routes always ship. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/work', '/writing', '/about', '/colophon', '/contact', '/privacy', '/terms'].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.7,
    })
  );

  const [postSlugs, projectSlugs] = await Promise.all([
    getAllPostSlugs().catch(() => [] as string[]),
    getAllProjectSlugs().catch(() => [] as string[]),
  ]);

  const postRoutes = postSlugs.map((slug) => ({
    url: `${SITE_URL}/writing/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  const projectRoutes = projectSlugs.map((slug) => ({
    url: `${SITE_URL}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes, ...projectRoutes];
}
```
Note: `getAllPostSlugs`/`getAllProjectSlugs` already swallow errors internally (Plan 1), but the `.catch` is a belt-and-suspenders guard.

- [ ] **Step 2: Verify** — `npm run build`, confirm `/sitemap.xml` is generated (it appears in the route list). `npm run dev`, curl `http://localhost:3000/sitemap.xml`, confirm valid XML with `<urlset>` and the static routes. Kill dev. type-check/lint/test green.

- [ ] **Step 3: Commit**
```bash
git add -A && git commit -m "feat: native sitemap.ts (static + CMS routes)"
```

---

### Task 4: Native robots.ts

**Files:**
- Create: `src/app/robots.ts`

- [ ] **Step 1: Implement `src/app/robots.ts`**

```ts
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
```

- [ ] **Step 2: Verify** — `npm run build`; `npm run dev`, curl `http://localhost:3000/robots.txt`, confirm it lists `Sitemap: https://rturk.me/sitemap.xml` and `Disallow: /api/`. Kill dev. Suite green.

- [ ] **Step 3: Commit**
```bash
git add -A && git commit -m "feat: native robots.ts"
```

---

### Task 5: RSS feed for /writing (TDD the builder)

**Files:**
- Create: `src/lib/rss.ts`, `src/lib/rss.test.ts`, `src/app/feed.xml/route.ts`

- [ ] **Step 1: Write the failing test** — `src/lib/rss.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { buildRssXml } from './rss';

describe('buildRssXml', () => {
  const items = [
    { title: 'First & Best', slug: 'first', date: '2026-06-01T00:00:00', excerpt: 'one <b>two</b>' },
    { title: 'Second', slug: 'second', date: '2026-05-01T00:00:00', excerpt: 'plain' },
  ];

  it('produces a channel with the site title and link', () => {
    const xml = buildRssXml(items, 'https://rturk.me');
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain('<link>https://rturk.me</link>');
  });

  it('emits one item per post with an absolute /writing link', () => {
    const xml = buildRssXml(items, 'https://rturk.me');
    expect(xml).toContain('<link>https://rturk.me/writing/first</link>');
    expect(xml).toContain('<link>https://rturk.me/writing/second</link>');
    expect((xml.match(/<item>/g) || []).length).toBe(2);
  });

  it('escapes XML-special characters in titles', () => {
    const xml = buildRssXml(items, 'https://rturk.me');
    expect(xml).toContain('First &amp; Best');
    expect(xml).not.toContain('First & Best');
  });
});
```

- [ ] **Step 2: Run it — expect FAIL** (`npm test -- rss`).

- [ ] **Step 3: Implement `src/lib/rss.ts`**

```ts
import { SITE_NAME, SITE_URL } from './constants';

export interface RssItem {
  title: string;
  slug: string;
  date?: string;
  excerpt?: string;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** RSS 2.0 feed for the writing section. Pure string builder — no I/O. */
export function buildRssXml(items: RssItem[], siteUrl: string = SITE_URL): string {
  const now = new Date().toUTCString();
  const entries = items
    .map((item) => {
      const link = `${siteUrl}/writing/${item.slug}`;
      const pubDate = item.date ? new Date(item.date).toUTCString() : now;
      const description = escapeXml((item.excerpt || '').replace(/<[^>]+>/g, '').trim());
      return [
        '    <item>',
        `      <title>${escapeXml(item.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid>${link}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description>${description}</description>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '  <channel>',
    `    <title>${escapeXml(SITE_NAME)} — Writing</title>`,
    `    <link>${siteUrl}</link>`,
    '    <description>Technical writing by Ray Turk.</description>',
    `    <lastBuildDate>${now}</lastBuildDate>`,
    `    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />`,
    entries,
    '  </channel>',
    '</rss>',
  ].join('\n');
}
```

- [ ] **Step 4: Run the test — expect PASS** (`npm test -- rss`).

- [ ] **Step 5: Implement the route `src/app/feed.xml/route.ts`**

```ts
import { getAllPosts } from '@/lib/api';
import { buildRssXml, type RssItem } from '@/lib/rss';

export const revalidate = 3600;

export async function GET() {
  const { posts } = await getAllPosts(100);
  const items: RssItem[] = posts.map((p) => ({
    title: p.title,
    slug: p.slug,
    date: p.date,
    excerpt: p.excerpt,
  }));
  const xml = buildRssXml(items);
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
```
Note: confirm `getAllPosts(100)` returns `{ posts }` and `BlogPost` has `title/slug/date/excerpt`. If `excerpt` is absent on the type, drop it from the map (it's optional in RssItem).

- [ ] **Step 6: Verify** — `npm run build`; `npm run dev`, curl `http://localhost:3000/feed.xml`, confirm `Content-Type: application/rss+xml` and valid `<rss>` XML. Kill dev. Suite green.

- [ ] **Step 7: Commit**
```bash
git add -A && git commit -m "feat: RSS feed for /writing (TDD builder + route)"
```

---

### Task 6: Per-route OG images via next/og

**Files:**
- Create: `src/app/opengraph-image.tsx`, `src/app/writing/[slug]/opengraph-image.tsx`, `src/app/work/[slug]/opengraph-image.tsx`

Note on fonts: `next/og` (satori) does NOT support woff2, and our Clash/Archivo are woff2 — so these OG cards use satori's default sans font (no custom font loading). That keeps them bulletproof; a custom-font pass can come later.

- [ ] **Step 1: Default OG card `src/app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from 'next/og';

export const alt = 'Ray Turk — Full-Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0b0f',
          padding: '72px',
        }}
      >
        <div style={{ display: 'flex', color: '#22d3ee', fontSize: 28, fontFamily: 'monospace' }}>
          rturk.me
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: '#f0f2f8', fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
            Ray Turk builds fast,
          </div>
          <div style={{ color: '#f0f2f8', fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
            headless, animated web.
          </div>
        </div>
        <div style={{ display: 'flex', color: '#9aa3b5', fontSize: 24 }}>
          Full-Stack Developer · Cleveland, OH
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 8, background: '#22d3ee' }} />
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 2: Per-post OG `src/app/writing/[slug]/opengraph-image.tsx`**

```tsx
import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/api';

export const alt = 'Ray Turk — Writing';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const title = post?.title ?? 'Writing';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0b0f',
          padding: '72px',
        }}
      >
        <div style={{ display: 'flex', color: '#22d3ee', fontSize: 24, fontFamily: 'monospace' }}>
          rturk.me / writing
        </div>
        <div style={{ display: 'flex', color: '#f0f2f8', fontSize: 56, fontWeight: 700, lineHeight: 1.15 }}>
          {title}
        </div>
        <div style={{ display: 'flex', color: '#9aa3b5', fontSize: 22 }}>Ray Turk</div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 8, background: '#22d3ee' }} />
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 3: Per-project OG `src/app/work/[slug]/opengraph-image.tsx`** — same as Step 2 but using `getProjectBySlug` and the label `rturk.me / work`:

```tsx
import { ImageResponse } from 'next/og';
import { getProjectBySlug } from '@/lib/api';

export const alt = 'Ray Turk — Work';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const title = project?.title ?? 'Case Study';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0b0f',
          padding: '72px',
        }}
      >
        <div style={{ display: 'flex', color: '#22d3ee', fontSize: 24, fontFamily: 'monospace' }}>
          rturk.me / work
        </div>
        <div style={{ display: 'flex', color: '#f0f2f8', fontSize: 56, fontWeight: 700, lineHeight: 1.15 }}>
          {title}
        </div>
        <div style={{ display: 'flex', color: '#9aa3b5', fontSize: 22 }}>Case study · Ray Turk</div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 8, background: '#22d3ee' }} />
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 4: Verify** — `npm run build` (OG routes compile; Next generates them as dynamic image routes). `npm run dev`, curl `-I http://localhost:3000/opengraph-image` and a post's `/writing/<slug>/opengraph-image` → expect `200` + `content-type: image/png`. Kill dev. type-check/lint/test green. If `ImageResponse`/satori errors on the JSX `style` objects (every element with children needs `display:flex`), fix per the error — satori requires explicit `display` on divs with multiple children (already set above). Report any fix.

- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: per-route OG images via next/og (default, post, project)"
```

---

### Task 7: Consent-gated GTM analytics

**Files:**
- Create: `src/components/consent/ConsentBanner.tsx`
- Modify: `src/app/layout.tsx`, `src/components/layout/Footer.tsx`, `.env.example`

- [ ] **Step 1: Add the GTM env var to `.env.example`** — append:
```
# Analytics (loaded only after cookie consent)
NEXT_PUBLIC_GTM_ID=GTM-WSTH9JTX
```

- [ ] **Step 2: Implement `src/components/consent/ConsentBanner.tsx`** (Ion-styled, `motion/react`, GTM injected only on accept)

```tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

const CONSENT_KEY = 'cookie-consent';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

type ConsentValue = 'accepted' | 'declined' | null;

function injectGTM() {
  if (!GTM_ID || document.getElementById('gtm-script')) return;
  const script = document.createElement('script');
  script.id = 'gtm-script';
  script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;
  document.head.appendChild(script);
}

/** Cookie consent banner. GTM loads ONLY after the user accepts. The footer's
 *  "Cookie preferences" link re-opens it via the `open-consent-banner` event. */
export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentValue;
    if (stored === 'accepted') {
      injectGTM();
    } else if (stored === null) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const handler = () => setVisible(true);
    window.addEventListener('open-consent-banner', handler);
    return () => window.removeEventListener('open-consent-banner', handler);
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
    injectGTM();
  }
  function decline() {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-xl border border-hairline bg-panel px-5 py-4 shadow-2xl sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ion">
                Cookie preferences
              </p>
              <p className="text-sm leading-relaxed text-muted">
                This site uses analytics cookies to understand how visitors use it. No personal
                data is sold.{' '}
                <Link href="/privacy" className="text-ion underline underline-offset-2">
                  Privacy Policy
                </Link>
              </p>
            </div>
            <div className="flex flex-shrink-0 items-center gap-3">
              <button
                onClick={decline}
                className="rounded-lg border border-hairline px-4 py-2 text-sm font-semibold text-muted transition-colors hover:text-signal"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="rounded-lg bg-ion px-4 py-2 text-sm font-semibold text-void transition-opacity hover:opacity-90"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Mount in `src/app/layout.tsx`** — import and render `<ConsentBanner />` inside `<body>` (after `<Footer />` is fine):
```tsx
import ConsentBanner from '@/components/consent/ConsentBanner';
```
```tsx
        <Footer />
        <ConsentBanner />
```

- [ ] **Step 4: Add the footer "Cookie preferences" trigger in `src/components/layout/Footer.tsx`** — Footer is a server component; add a tiny client trigger like CommandKHint. Create `src/components/consent/CookiePrefsLink.tsx`:
```tsx
'use client';

/** Footer link that re-opens the consent banner. */
export default function CookiePrefsLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('open-consent-banner'))}
      className="hover:text-ion"
    >
      cookies
    </button>
  );
}
```
Then in `Footer.tsx`, import it and add `<CookiePrefsLink />` to the footer link row (next to github/linkedin/colophon).

- [ ] **Step 5: Verify** — `npm run build`; `npm run dev`. With a cleared localStorage, the banner appears after ~0.8s; Accept injects GTM (check `#gtm-script` in DOM and a network request to googletagmanager only after accept); Decline hides it and does NOT load GTM; the footer "cookies" link re-opens it. Confirm NO GTM network request before consent. Kill dev. Suite green.

- [ ] **Step 6: Commit**
```bash
git add -A && git commit -m "feat: consent-gated GTM analytics + Ion cookie banner"
```

---

### Task 8: Code-split the command palette (perf)

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace the static palette import with a dynamic, client-only one.** In `src/app/layout.tsx`, remove `import CommandPalette from '@/components/interactive/CommandPalette';` and add:
```tsx
import dynamic from 'next/dynamic';

const CommandPalette = dynamic(() => import('@/components/interactive/CommandPalette'), {
  ssr: false,
});
```
The `<CommandPalette />` render stays the same. This keeps cmdk out of the initial server-rendered HTML and defers its JS.

Note: in Next 16, `ssr: false` via `next/dynamic` is allowed in Client Components but NOT directly in Server Components. `layout.tsx` is a Server Component. If the build errors with "ssr: false is not allowed in Server Components", do this instead: create a thin client wrapper `src/components/interactive/CommandPaletteLoader.tsx`:
```tsx
'use client';
import dynamic from 'next/dynamic';
const CommandPalette = dynamic(() => import('./CommandPalette'), { ssr: false });
export default function CommandPaletteLoader() {
  return <CommandPalette />;
}
```
and import/render `<CommandPaletteLoader />` in layout.tsx instead. Report which path you took.

- [ ] **Step 2: Verify** — `npm run build`. Confirm build succeeds and content routes stay ○/●. The ⌘K shortcut + header button must still open the palette (the global keydown/CustomEvent listeners live inside CommandPalette, which now loads on first client render — confirm it still mounts; since it's rendered unconditionally in layout, dynamic() still mounts it on the client, just in a separate chunk). `npm run dev`, press ⌘K → palette opens. Kill dev. type-check/lint/test green.

- [ ] **Step 3: Commit**
```bash
git add -A && git commit -m "perf: code-split command palette out of the initial bundle"
```

---

### Task 9: Playwright smoke suite

**Files:**
- Create: `playwright.config.ts`, `e2e/smoke.spec.ts`
- Modify: `package.json`, `.gitignore`

- [ ] **Step 1: Install Playwright**
```bash
source ~/.nvm/nvm.sh && nvm use 20
npm i -D @playwright/test
npx playwright install chromium
```

- [ ] **Step 2: Create `playwright.config.ts`**
```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```
Note: `webServer.command` is `npm run start`, which serves the production build — so CI must `npm run build` before `npx playwright test`. Locally, run `npm run build` first too.

- [ ] **Step 3: Add scripts to `package.json`** — `"test:e2e": "playwright test"`.

- [ ] **Step 4: Create `e2e/smoke.spec.ts`**
```ts
import { test, expect } from '@playwright/test';

test('home renders the hero headline', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Ray Turk builds fast');
});

test('command palette opens with Meta+K and navigates', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Meta+k');
  const dialog = page.getByRole('dialog', { name: 'Command palette' });
  await expect(dialog).toBeVisible();
  await expect(page.getByPlaceholder('Type a command or search…')).toBeVisible();
});

test('core routes resolve', async ({ page }) => {
  for (const path of ['/work', '/writing', '/about', '/colophon', '/contact']) {
    const res = await page.goto(path);
    expect(res?.status(), `GET ${path}`).toBeLessThan(400);
  }
});

test('contact form is present with required fields', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.locator('input[name="name"]')).toBeVisible();
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('textarea[name="message"]')).toBeVisible();
});

test('sitemap, robots, and rss are served', async ({ page }) => {
  expect((await page.goto('/sitemap.xml'))?.status()).toBe(200);
  expect((await page.goto('/robots.txt'))?.status()).toBe(200);
  expect((await page.goto('/feed.xml'))?.status()).toBe(200);
});
```
Note: the palette shortcut is `Meta+k`; on Linux CI `Control+k` also works (CommandPalette checks metaKey||ctrlKey). If `Meta+k` is flaky headless, use `Control+k`. The contact field names (`name`, `email`, `message`) come from the ported ContactForm — confirm them against `src/components/contact/ContactForm.tsx`; adjust selectors to the real names if different.

- [ ] **Step 5: Gitignore Playwright artifacts** — append to `.gitignore`:
```
/test-results/
/playwright-report/
/playwright/.cache/
```

- [ ] **Step 6: Verify locally**
```bash
npm run build
npm run test:e2e
```
Expected: all 5 specs pass against the production build. (Some routes may have less content without CMS env, but they must still return < 400 and render the static shell.) If a spec fails on real selectors, fix the SELECTOR to match the app, not the app to match the test (except obvious app bugs — report those).

- [ ] **Step 7: Commit**
```bash
git add -A && git commit -m "test: Playwright smoke suite (home, palette, routes, contact, feeds)"
```

---

### Task 10: GitHub Actions CI + Lighthouse budgets

**Files:**
- Create: `.github/workflows/ci.yml`, `lighthouserc.json`
- Modify: `package.json`

- [ ] **Step 1: Create `lighthouserc.json`**
```json
{
  "ci": {
    "collect": {
      "startServerCommand": "npm run start",
      "url": ["http://localhost:3000/", "http://localhost:3000/about"],
      "numberOfRuns": 1,
      "settings": { "preset": "desktop" }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 0.95 }],
        "categories:seo": ["error", { "minScore": 0.95 }],
        "cumulative-layout-shift": ["warn", { "maxNumericValue": 0.1 }],
        "largest-contentful-paint": ["warn", { "maxNumericValue": 2500 }]
      }
    },
    "upload": { "target": "temporary-public-storage" }
  }
}
```
Note: the spec target is Lighthouse ≥95 / LCP <1.8s / CLS <0.1. CI Lighthouse is noisy, so the HARD gate is perf ≥0.90 (error) with LCP/CLS as warnings — this prevents flaky failures while still catching regressions. The 95/1.8s aspiration is documented; tighten the thresholds once real numbers are stable post-launch.

- [ ] **Step 2: Add a script to `package.json`** — `"lhci": "lhci autorun"`. (Use `npx @lhci/cli autorun` in CI rather than a dependency to keep the bundle lean; the script is a convenience.)

- [ ] **Step 3: Create `.github/workflows/ci.yml`**
```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm test
      - run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: https://rturk.me

  e2e:
    runs-on: ubuntu-latest
    needs: verify
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: https://rturk.me
      - run: npm run test:e2e

  lighthouse:
    runs-on: ubuntu-latest
    needs: verify
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: https://rturk.me
      - run: npx @lhci/cli autorun
```
Note: the build runs WITHOUT a CMS endpoint in CI — `api.ts` falls back (static projects; posts/[slug] generate 0 paths). That's fine: the static shell, home, about, etc. all build and are what Lighthouse + most smoke specs exercise. If you want CMS content in CI, add `WORDPRESS_GRAPHQL_ENDPOINT` as a repo secret and pass it in the build env — optional, not required for green CI.

- [ ] **Step 4: Validate the YAML + configs locally**
```bash
node -e "const y=require('fs').readFileSync('.github/workflows/ci.yml','utf8'); console.log('lines', y.split('\n').length)"
node -e "JSON.parse(require('fs').readFileSync('lighthouserc.json','utf8')); console.log('lighthouserc OK')"
```
Both should succeed. Then run `npm run build && npx @lhci/cli autorun` locally ONCE to confirm Lighthouse runs and to see the real scores (it will start the server, run Lighthouse, and assert). Report the actual category scores. If performance is below 0.90 locally, note it — it may need a perf fix or threshold adjustment before CI will pass. (Do not lower the threshold below 0.90 without flagging it.)

- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "ci: GitHub Actions (verify + e2e + lighthouse) with perf budgets"
```

---

### Task 11: Final verification, README, ops checklist, push

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Full green suite**
```bash
source ~/.nvm/nvm.sh && nvm use 20
npm test && npm run type-check && npm run lint && npm run build
```
All green. Capture the route table; confirm the new routes appear: `/sitemap.xml`, `/robots.txt`, `/feed.xml`, `/opengraph-image`, `/writing/[slug]/opengraph-image`, `/work/[slug]/opengraph-image`. Confirm content routes stay ○/●.

- [ ] **Step 2: Verify the launch surface with curl** (`npm run dev` then):
- `/sitemap.xml` → 200, XML urlset
- `/robots.txt` → 200, has Sitemap line + `Disallow: /api/`
- `/feed.xml` → 200, `application/rss+xml`
- `/opengraph-image` → 200, `image/png`
- `/` → contains Person + WebSite JSON-LD
Kill dev. Report results.

- [ ] **Step 3: Update `README.md`** — append a `## Launch / SEO` section:
```markdown
## SEO & analytics

- JSON-LD: Person + WebSite site-wide; Article on posts; CreativeWork on case studies
- `sitemap.xml`, `robots.txt`, and an RSS feed at `/feed.xml`
- Per-route Open Graph images via `next/og`
- Google Tag Manager loads **only** after cookie consent (`NEXT_PUBLIC_GTM_ID`)

## CI

GitHub Actions runs on every push/PR: lint · type-check · Vitest · build · Playwright smoke · Lighthouse (perf ≥ 0.90 gate).
```

- [ ] **Step 4: Append the ops cutover checklist to `README.md`** (so it's tracked in-repo):
```markdown
## Going live (ops checklist)

- [ ] Create the Netlify site from this repo; set env vars: `NEXT_PUBLIC_WORDPRESS_URL`, `NEXT_PUBLIC_WP_HOSTNAME`, `WORDPRESS_GRAPHQL_ENDPOINT` (= `https://cms.rturk.me/?graphql`), `NEXT_PUBLIC_SITE_URL` (= `https://rturk.me`), `REVALIDATION_SECRET` (32+), `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GITHUB_URL`, `NEXT_PUBLIC_LINKEDIN_URL`.
- [ ] Enable WPGraphQL introspection (or create an Application Password) → `npm run codegen` → replace `fetchGraphQL<any>` with generated types (Plan 2b).
- [ ] Reconfigure the WP ISR webhook plugin to post `/work/<slug>` and `/writing/<slug>` paths to `/api/revalidate`.
- [ ] Point the rturk.me domain at the new Netlify site; verify the `netlify.toml` 301s (`/projects`→`/work`, `/blog`→`/writing`).
- [ ] Submit `https://rturk.me/sitemap.xml` to Google Search Console.
```

- [ ] **Step 5: Commit + push**
```bash
git add -A && git commit -m "docs: launch/SEO/CI README + ops cutover checklist"
git push
```

---

## Self-Review Notes (for the orchestrator)

- The CMS dependency: in CI (no WP env), `getAllPostSlugs` returns `[]` so `/writing/[slug]` + per-post OG generate 0 paths — build still green. Sitemap/RSS gracefully include only static routes. This is intended; CI doesn't need the CMS.
- Lighthouse hard gate is 0.90 (not the 0.95 spec aspiration) to avoid CI flake — flagged in Task 10 for Ray to tighten once real numbers stabilize.
- OG images intentionally use satori's default font (woff2 unsupported) — a custom-font pass is deferred, not blocked.

## Handoff → Plan 2b (CMS-gated)

Once introspection is enabled: codegen → typed operations → ACF case-study deep-dive template (overview/context/architecture diagram/decisions/code snippets/metrics) on `/work/[slug]`, plus the per-project OG can pull a real image.
