# rturk.me Rebuild — Plan 1: Foundation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A new public repo at `~/Developer/github/rturk-me` running Next.js 15 + React 19 + Tailwind v4, serving every route in the spec with real WordPress data through a typed fetch-based GraphQL layer.

**Architecture:** Fresh `create-next-app` scaffold. The proven data layer from `Headless-Portfolio/portfolio/` is ported with one structural change: Apollo Client is replaced by a ~40-line `fetchGraphQL()` helper, and GraphQL Codegen generates operation types from the live WPGraphQL schema. Pages are React Server Components calling `api.ts` functions directly. Visual polish (canvas hero, motion, Shiki, cmdk) is Plan 2; SEO/CI/cutover is Plan 3 — this plan ships functional Ion-styled pages.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind v4, graphql + graphql-tag, @graphql-codegen, Vitest + Testing Library.

**Spec:** `Headless-Portfolio/docs/superpowers/specs/2026-06-12-portfolio-rebuild-design.md`

**Old repo source paths** (referenced throughout as `$OLD`):
`OLD=/Users/raymondturk/Developer/github/Headless-Portfolio/portfolio`

**Prerequisites:**
- `nvm use 20` (Node ≥ 18.18 required by Next 15)
- `cms.rturk.me/graphql` reachable (codegen introspects the live schema)
- A `REVALIDATION_SECRET` value at hand for `.env.local`

---

## File Structure (end state of Plan 1)

```
rturk-me/
├── netlify.toml
├── codegen.ts
├── vitest.config.ts
├── .env.example / .env.local
├── public/
│   ├── fonts/clash-display-{600,700}.woff2
│   └── __forms.html                  # ported (Netlify Forms detection)
└── src/
    ├── app/
    │   ├── layout.tsx                # fonts, shell
    │   ├── globals.css               # Tailwind v4 @theme — Ion tokens
    │   ├── page.tsx                  # home
    │   ├── work/page.tsx, work/[slug]/page.tsx
    │   ├── writing/page.tsx, writing/[slug]/page.tsx
    │   ├── about/page.tsx, colophon/page.tsx, contact/page.tsx
    │   ├── privacy/page.tsx, terms/page.tsx
    │   └── api/revalidate/route.ts, api/contact/route.ts
    ├── components/layout/Header.tsx, Footer.tsx
    ├── lib/
    │   ├── graphql.ts                # NEW fetch client (replaces Apollo)
    │   ├── api.ts                    # ported, mechanical transform
    │   ├── constants.ts              # ported
    │   ├── generated/graphql.ts      # codegen output
    │   ├── queries/                  # ported as-is (minus testimonials)
    │   └── data/projects.ts          # ported static fallback
    └── types/wordpress.ts            # ported as-is
```

---

### Task 1: Scaffold the repo

**Files:** entire new project at `/Users/raymondturk/Developer/github/rturk-me`

- [ ] **Step 1: Scaffold**

```bash
cd /Users/raymondturk/Developer/github
nvm use 20
npx create-next-app@latest rturk-me --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack
```

Accept defaults for anything else it asks. Verify `package.json` shows `next` 15.x, `react` 19.x, `tailwindcss` 4.x.

- [ ] **Step 2: Verify dev server boots**

```bash
cd rturk-me && npm run dev
```
Expected: compiles, default page on `localhost:3000`. Ctrl-C after confirming.

- [ ] **Step 3: Add env files**

Create `.env.example`:
```
NEXT_PUBLIC_WORDPRESS_URL=https://cms.rturk.me
NEXT_PUBLIC_WP_HOSTNAME=cms.rturk.me
WORDPRESS_GRAPHQL_ENDPOINT=https://cms.rturk.me/graphql
NEXT_PUBLIC_SITE_URL=https://rturk.me
REVALIDATION_SECRET=change-me-32-chars-minimum
```

Copy to `.env.local` and fill in the real secret (ask Ray if not in Netlify env already). Confirm `.gitignore` covers `.env*.local` (create-next-app default does).

- [ ] **Step 4: Add scripts to package.json**

In `package.json` `"scripts"`, add:
```json
"type-check": "tsc --noEmit"
```

- [ ] **Step 5: Initial commit**

```bash
git add -A && git commit -m "chore: scaffold Next 15 + Tailwind v4 app"
```

---

### Task 2: Vitest setup

**Files:**
- Create: `vitest.config.ts`, `src/lib/__tests__/smoke.test.ts`
- Modify: `package.json`

- [ ] **Step 1: Install**

```bash
npm i -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
```

- [ ] **Step 3: Add script + smoke test**

`package.json` scripts: `"test": "vitest run", "test:watch": "vitest"`

`src/lib/__tests__/smoke.test.ts`:
```ts
import { describe, it, expect } from 'vitest';

describe('vitest', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 4: Run**

Run: `npm test` — Expected: 1 passed.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: add vitest with jsdom + path aliases"
```

---

### Task 3: Ion theme tokens + fonts

**Files:**
- Create: `public/fonts/` (Clash Display woff2s)
- Modify: `src/app/globals.css`, `src/app/layout.tsx`

- [ ] **Step 1: Download Clash Display woff2 (Fontshare, free license)**

```bash
mkdir -p public/fonts
curl -s "https://api.fontshare.com/v2/css?f[]=clash-display@600,700" \
  | grep -oE 'https://[^)]+\.woff2' | sort -u
```
Download each URL printed (one per weight) into `public/fonts/` as `clash-display-600.woff2` and `clash-display-700.woff2` (the URL containing `Semibold` → 600, `Bold` → 700):
```bash
curl -so public/fonts/clash-display-600.woff2 "<semibold url>"
curl -so public/fonts/clash-display-700.woff2 "<bold url>"
```
Verify both files are >10KB: `ls -la public/fonts/`

- [ ] **Step 2: Replace `src/app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-void: #0a0b0f;
  --color-panel: #12141c;
  --color-hairline: #1e222e;
  --color-hairline-bright: #2a2f3e;
  --color-ion: #22d3ee;
  --color-drift: #a78bfa;
  --color-signal: #f0f2f8;
  --color-muted: #9aa3b5;
  --color-faint: #5b6478;

  --font-display: var(--font-clash);
  --font-sans: var(--font-archivo);
  --font-mono: var(--font-jetbrains);
}

body {
  background-color: var(--color-void);
  color: var(--color-signal);
}
```

- [ ] **Step 3: Wire fonts in `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });
const clash = localFont({
  src: [
    { path: '../../public/fonts/clash-display-600.woff2', weight: '600' },
    { path: '../../public/fonts/clash-display-700.woff2', weight: '700' },
  ],
  variable: '--font-clash',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rturk.me'),
  title: { default: 'Ray Turk — Full-Stack Developer', template: '%s · Ray Turk' },
  description:
    'Cleveland-based full-stack developer building fast, headless, animated web experiences.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrains.variable} ${clash.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Visual sanity check**

Put `<h1 className="font-display text-5xl text-ion">Ion</h1>` temporarily in `src/app/page.tsx`, run `npm run dev`, confirm dark bg + cyan Clash Display headline. Revert the temp change.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: Ion design tokens (Tailwind v4 @theme) + self-hosted fonts"
```

---

### Task 4: Port domain types, constants, static fallback data

**Files:**
- Create: `src/types/wordpress.ts`, `src/lib/constants.ts`, `src/lib/data/projects.ts`

- [ ] **Step 1: Copy files verbatim**

```bash
mkdir -p src/types src/lib/data
cp $OLD/src/types/wordpress.ts src/types/wordpress.ts
cp $OLD/src/lib/constants.ts src/lib/constants.ts
cp $OLD/src/lib/data/projects.ts src/lib/data/projects.ts
```

- [ ] **Step 2: Type-check**

Run: `npm run type-check`
Expected: PASS. If `constants.ts` references modules that don't exist yet (it shouldn't — it's self-contained), fix by deleting only the offending export and note it in the commit message.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: port WP domain types, constants, static fallback data"
```

---

### Task 5: fetchGraphQL client (TDD)

**Files:**
- Create: `src/lib/graphql.ts`, `src/lib/__tests__/graphql.test.ts`

- [ ] **Step 1: Install graphql deps**

```bash
npm i graphql graphql-tag
```

- [ ] **Step 2: Write the failing test** — `src/lib/__tests__/graphql.test.ts`

```ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import gql from 'graphql-tag';
import { fetchGraphQL, GraphQLRequestError } from '../graphql';

const QUERY = gql`query Ping { ping }`;

function mockFetchOnce(body: unknown, ok = true, status = 200) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok, status,
    json: () => Promise.resolve(body),
  }));
}

describe('fetchGraphQL', () => {
  beforeEach(() => vi.stubEnv('WORDPRESS_GRAPHQL_ENDPOINT', 'https://cms.example.com/graphql'));
  afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

  it('returns data on success', async () => {
    mockFetchOnce({ data: { ping: 'pong' } });
    const data = await fetchGraphQL<{ ping: string }>(QUERY);
    expect(data.ping).toBe('pong');
  });

  it('POSTs printed query and variables to the endpoint', async () => {
    mockFetchOnce({ data: {} });
    await fetchGraphQL(QUERY, { first: 5 });
    const [url, init] = (fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(url).toBe('https://cms.example.com/graphql');
    const body = JSON.parse(init.body);
    expect(body.query).toContain('query Ping');
    expect(body.variables).toEqual({ first: 5 });
  });

  it('throws GraphQLRequestError on GraphQL errors', async () => {
    mockFetchOnce({ errors: [{ message: 'Field "ping" not found' }] });
    await expect(fetchGraphQL(QUERY)).rejects.toThrow(GraphQLRequestError);
  });

  it('throws GraphQLRequestError on HTTP failure', async () => {
    mockFetchOnce({}, false, 500);
    await expect(fetchGraphQL(QUERY)).rejects.toThrow('500');
  });

  it('throws when endpoint env var is missing', async () => {
    vi.stubEnv('WORDPRESS_GRAPHQL_ENDPOINT', '');
    await expect(fetchGraphQL(QUERY)).rejects.toThrow('WORDPRESS_GRAPHQL_ENDPOINT');
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `../graphql`.

- [ ] **Step 4: Implement `src/lib/graphql.ts`**

```ts
/**
 * Fetch-based GraphQL client for SSG/RSC.
 * Replaces Apollo: no client cache wanted — Next's data layer owns caching.
 */
import { print } from 'graphql';
import type { DocumentNode } from 'graphql';

export class GraphQLRequestError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'GraphQLRequestError';
  }
}

export async function fetchGraphQL<TData = unknown>(
  document: DocumentNode,
  variables?: Record<string, unknown>
): Promise<TData> {
  const endpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT;
  if (!endpoint) {
    throw new GraphQLRequestError('WORDPRESS_GRAPHQL_ENDPOINT environment variable is not set');
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.WORDPRESS_AUTH_BEARER && {
        Authorization: `Bearer ${process.env.WORDPRESS_AUTH_BEARER}`,
      }),
    },
    body: JSON.stringify({ query: print(document), variables }),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new GraphQLRequestError(`GraphQL request failed: ${res.status}`, res.status);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new GraphQLRequestError(json.errors[0].message);
  }
  return json.data as TData;
}
```

- [ ] **Step 5: Run tests to verify pass**

Run: `npm test` — Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: fetch-based GraphQL client with typed errors (TDD)"
```

---

### Task 6: Port query documents

**Files:**
- Create: `src/lib/queries/{fragments,posts,projects,site-settings,index}.ts`

- [ ] **Step 1: Copy, excluding testimonials (retired per spec)**

```bash
mkdir -p src/lib/queries
cp $OLD/src/lib/queries/fragments.ts src/lib/queries/
cp $OLD/src/lib/queries/posts.ts src/lib/queries/
cp $OLD/src/lib/queries/projects.ts src/lib/queries/
cp $OLD/src/lib/queries/site-settings.ts src/lib/queries/
cp $OLD/src/lib/queries/index.ts src/lib/queries/
```

- [ ] **Step 2: Edit `src/lib/queries/index.ts`** — delete the `export ... from './testimonials'` block (and any testimonial fragment re-exports). Delete nothing else.

- [ ] **Step 3: Type-check**

Run: `npm run type-check` — Expected: PASS. If fragments.ts contains a testimonial fragment referenced only by the deleted file, remove that fragment too.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: port WPGraphQL query documents (testimonials retired)"
```

---

### Task 7: GraphQL Codegen

**Files:**
- Create: `codegen.ts`, `src/lib/generated/graphql.ts` (generated)
- Modify: `package.json`

- [ ] **Step 1: Install**

```bash
npm i -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations
```

- [ ] **Step 2: Create `codegen.ts`**

```ts
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.WORDPRESS_GRAPHQL_ENDPOINT || 'https://cms.rturk.me/graphql',
  documents: ['src/lib/queries/**/*.ts'],
  generates: {
    'src/lib/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: { skipTypename: true, avoidOptionals: false },
    },
  },
};

export default config;
```

- [ ] **Step 3: Add script and run**

`package.json` scripts: `"codegen": "graphql-codegen --config codegen.ts"`

Run: `npm run codegen`
Expected: writes `src/lib/generated/graphql.ts`.
**If it errors on a field that doesn't exist in the live schema** (e.g. ACF fields not yet exposed — see spec prerequisite), remove that field from the query document, note it in the commit body, and re-run. Do NOT stub the schema.

- [ ] **Step 4: Type-check, commit**

Run: `npm run type-check` — Expected: PASS.
```bash
git add -A && git commit -m "feat: GraphQL codegen from live WPGraphQL schema"
```

---

### Task 8: Port api.ts onto the fetch client (TDD on fallback behavior)

**Files:**
- Create: `src/lib/api.ts`, `src/lib/__tests__/api.test.ts`

- [ ] **Step 1: Copy**

```bash
cp $OLD/src/lib/api.ts src/lib/api.ts
```

- [ ] **Step 2: Apply the mechanical transformation to every function in `src/lib/api.ts`:**

1. Replace the import `import { getApolloClient } from './graphql-client';` with `import { fetchGraphQL } from './graphql';`
2. Every occurrence of this pattern:
```ts
const client = getApolloClient();
const { data } = await client.query({
  query: GET_X,
  variables: { a, b },
});

checkForErrors(data);
```
becomes:
```ts
const data = await fetchGraphQL<any>(GET_X, { a, b });
```
3. Delete the now-unused `handleError` and `checkForErrors` helpers and the `APIError` import if nothing else uses it.
4. Delete every testimonial function (`getAllTestimonials`, `getFeaturedTestimonials`) and their imports from `./queries`.
5. Everything else — static fallbacks, function signatures, return shapes — stays byte-identical.

- [ ] **Step 3: Write fallback test** — `src/lib/__tests__/api.test.ts`

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../graphql', () => ({
  fetchGraphQL: vi.fn().mockRejectedValue(new Error('CMS down')),
  GraphQLRequestError: class extends Error {},
}));

import { getAllProjects } from '../api';
import { STATIC_PROJECTS } from '../data/projects';

describe('api fallbacks', () => {
  it('returns static projects when the CMS is unreachable', async () => {
    const { projects } = await getAllProjects();
    expect(projects).toEqual(STATIC_PROJECTS);
    expect(projects.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 4: Run tests + type-check**

Run: `npm test && npm run type-check` — Expected: PASS. The most likely failure is a missed `client.query` occurrence — grep for `getApolloClient\|client.query\|checkForErrors` and fix any survivor:
```bash
grep -n "getApolloClient\|client\.query\|checkForErrors" src/lib/api.ts
```
Expected: no matches.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: port api.ts onto fetchGraphQL, drop Apollo + testimonials"
```

---

### Task 9: Layout shell — Header + Footer

**Files:**
- Create: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create `src/components/layout/Header.tsx`**

```tsx
import Link from 'next/link';

const nav = [
  { href: '/work', label: 'work' },
  { href: '/writing', label: 'writing' },
  { href: '/about', label: 'about' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-void/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg font-semibold text-signal">
          rturk.me
        </Link>
        <nav className="flex items-center gap-6 font-mono text-sm text-muted">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-ion">
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-lg bg-ion px-3 py-1.5 font-sans font-semibold text-void transition-opacity hover:opacity-90"
          >
            contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Create `src/components/layout/Footer.tsx`**

```tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8 font-mono text-xs text-faint">
        <span>© {new Date().getFullYear()} Ray Turk · Cleveland, OH</span>
        <div className="flex gap-4">
          <a href="https://github.com/RayTurk" className="hover:text-ion">github</a>
          <a href="https://www.linkedin.com/in/raymond-turk-cle" className="hover:text-ion">linkedin</a>
          <Link href="/colophon" className="hover:text-ion">colophon</Link>
        </div>
      </div>
    </footer>
  );
}
```
(Verify the two social URLs against `src/lib/constants.ts` after Task 4 — use the values defined there if they differ.)

- [ ] **Step 3: Wrap in `src/app/layout.tsx`** — change the body to:

```tsx
<body className="font-sans antialiased">
  <Header />
  <main className="min-h-screen">{children}</main>
  <Footer />
</body>
```
with `import Header from '@/components/layout/Header'; import Footer from '@/components/layout/Footer';`

- [ ] **Step 4: Verify + commit**

Run: `npm run dev` — header/footer render on the default page.
```bash
git add -A && git commit -m "feat: Ion layout shell (header, footer)"
```

---

### Task 10: Home page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace `src/app/page.tsx`**

```tsx
import Link from 'next/link';
import { getFeaturedProjects, getRecentPosts } from '@/lib/api';

export const revalidate = 3600;

export default async function HomePage() {
  const [projects, posts] = await Promise.all([getFeaturedProjects(4), getRecentPosts(3)]);

  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero — static gradient version; interactive canvas lands in Plan 2 */}
      <section className="relative overflow-hidden py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.15), transparent 65%)' }}
        />
        <p className="font-mono text-sm text-ion">~/cleveland-oh · full-stack developer</p>
        <h1 className="mt-4 font-display text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
          Ray Turk builds fast, headless, animated web.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          WordPress as the engine, Next.js as the face — with the engineering on display.
        </p>
      </section>

      {/* Selected work */}
      <section className="border-t border-hairline py-16">
        <h2 className="font-mono text-xs uppercase tracking-[0.15em] text-faint">01 — Selected Work</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="rounded-xl border border-hairline bg-panel p-6 transition-colors hover:border-ion/40"
            >
              <p className="font-mono text-xs text-ion">case-study/{project.slug}</p>
              <h3 className="mt-2 font-display text-xl font-semibold">{project.title}</h3>
            </Link>
          ))}
        </div>
        <Link href="/work" className="mt-6 inline-block font-mono text-sm text-muted hover:text-ion">
          all work →
        </Link>
      </section>

      {/* Writing */}
      <section className="border-t border-hairline py-16">
        <h2 className="font-mono text-xs uppercase tracking-[0.15em] text-faint">02 — Writing</h2>
        <ul className="mt-6 divide-y divide-hairline">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/writing/${post.slug}`} className="flex items-baseline justify-between gap-4 py-4 hover:text-ion">
                <span>{post.title}</span>
                <span className="shrink-0 font-mono text-xs text-faint">
                  {new Date(post.date).toISOString().slice(0, 10)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-hairline py-16">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-md text-muted">
            Full-stack developer at Neon Goldfish, building headless WordPress and Next.js sites.
            <Link href="/about" className="ml-2 text-ion">more →</Link>
          </p>
          <Link href="/contact" className="rounded-lg bg-ion px-5 py-2.5 font-semibold text-void hover:opacity-90">
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}
```
**Note:** check the actual signatures in the ported `src/lib/api.ts` — `getFeaturedProjects`/`getRecentPosts` may return `Project[]` directly or a wrapper object. Destructure to match what the file actually returns; do not change `api.ts` to fit the page.

- [ ] **Step 2: Verify with real data**

Run: `npm run dev` — homepage renders project cards + posts from cms.rturk.me (or static fallbacks if CMS is down — verify which by checking the dev console for fetch errors).

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: home page with live CMS data (hero, work, writing, CTA)"
```

---

### Task 11: /work index + detail

**Files:**
- Create: `src/app/work/page.tsx`, `src/app/work/[slug]/page.tsx`

- [ ] **Step 1: Create `src/app/work/page.tsx`**

```tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/api';

export const revalidate = 3600;
export const metadata: Metadata = { title: 'Work', description: 'Case studies and selected projects by Ray Turk.' };

export default async function WorkPage() {
  const { projects } = await getAllProjects();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-display text-4xl font-semibold">Work</h1>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="rounded-xl border border-hairline bg-panel p-6 transition-colors hover:border-ion/40"
          >
            <p className="font-mono text-xs text-ion">case-study/{project.slug}</p>
            <h2 className="mt-2 font-display text-xl font-semibold">{project.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/app/work/[slug]/page.tsx`**

```tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/api';

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs text-ion">case-study/{project.slug}</p>
      <h1 className="mt-3 font-display text-4xl font-semibold">{project.title}</h1>
      {project.content && (
        <div
          className="prose prose-invert mt-10 max-w-none"
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
      )}
    </article>
  );
}
```
**Notes:** (a) Next 15 `params` is a Promise — the `await params` above is required. (b) Check the ported `api.ts` for the exact return shapes of `getProjectBySlug` / `getAllProjectSlugs` and adapt the destructuring here, not the lib. (c) `prose` classes require `npm i -D @tailwindcss/typography` and `@plugin "@tailwindcss/typography";` added to `globals.css` after the `@import` line — do that in this step. (d) The full case-study template (architecture/decisions/metrics ACF sections) is Plan 2.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds; `/work` and `/work/[slug]` pages generated statically.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: /work index and case study detail routes"
```

---

### Task 12: /writing index + detail

**Files:**
- Create: `src/app/writing/page.tsx`, `src/app/writing/[slug]/page.tsx`

- [ ] **Step 1: Create `src/app/writing/page.tsx`**

```tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/api';

export const revalidate = 3600;
export const metadata: Metadata = { title: 'Writing', description: 'Technical writing by Ray Turk.' };

export default async function WritingPage() {
  const { posts } = await getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl font-semibold">Writing</h1>
      <ul className="mt-10 divide-y divide-hairline">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/writing/${post.slug}`} className="flex items-baseline justify-between gap-4 py-4 hover:text-ion">
              <span>{post.title}</span>
              <span className="shrink-0 font-mono text-xs text-faint">
                {new Date(post.date).toISOString().slice(0, 10)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/app/writing/[slug]/page.tsx`**

```tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPostBySlug, getAllPostSlugs } from '@/lib/api';

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs text-faint">{new Date(post.date).toISOString().slice(0, 10)}</p>
      <h1 className="mt-3 font-display text-4xl font-semibold">{post.title}</h1>
      <div
        className="prose prose-invert mt-10 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
      />
    </article>
  );
}
```
Same caveat as Task 11: match the ported `api.ts` return shapes (`getAllPosts` may return `{ posts, pageInfo }`).

- [ ] **Step 3: Verify build + commit**

Run: `npm run build` — Expected: succeeds with `/writing` routes.
```bash
git add -A && git commit -m "feat: /writing index and post detail routes"
```

---

### Task 13: Static pages — /about, /colophon, /privacy, /terms

**Files:**
- Create: `src/app/about/page.tsx`, `src/app/colophon/page.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`

- [ ] **Step 1: Port privacy + terms**

```bash
mkdir -p src/app/privacy src/app/terms
cp $OLD/src/app/privacy/page.tsx src/app/privacy/page.tsx
cp $OLD/src/app/terms/page.tsx src/app/terms/page.tsx
```
Fix any imports that don't exist in the new repo (these pages should be self-contained prose; if they import old UI components, replace the wrappers with `<div className="prose prose-invert mx-auto max-w-3xl px-6 py-16">`).

- [ ] **Step 2: Create `src/app/about/page.tsx`** (placeholder copy — Ray supplies final copy in Plan 2)

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About', description: 'About Ray Turk — full-stack developer in Cleveland, OH.' };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl font-semibold">About</h1>
      <div className="prose prose-invert mt-10">
        <p>
          I&apos;m Ray Turk, a full-stack developer in Cleveland, Ohio. By day I build client
          sites at Neon Goldfish; the rest of the time I&apos;m deep in headless WordPress,
          Next.js, and whatever the platform shipped this month.
        </p>
        <h2>Stack</h2>
        <p>Next.js · React · TypeScript · WordPress · WPGraphQL · PHP · Laravel · Tailwind</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `src/app/colophon/page.tsx`** (v1 — expanded in Plan 2)

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Colophon', description: 'How rturk.me is built.' };

export default function ColophonPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl font-semibold">Colophon</h1>
      <div className="prose prose-invert mt-10">
        <p>
          This site is a headless build: WordPress at cms.rturk.me serves content over
          WPGraphQL to a Next.js 15 App Router front-end, statically generated with ISR
          and deployed to Netlify.
        </p>
        <ul>
          <li>Next.js 15 · React 19 · TypeScript · Tailwind v4</li>
          <li>Typed data layer via GraphQL Codegen — no client-side fetching for content</li>
          <li>Type: Clash Display, Archivo, JetBrains Mono — all self-hosted</li>
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify build + commit**

Run: `npm run build` — Expected: all four routes build.
```bash
git add -A && git commit -m "feat: about, colophon, privacy, terms pages"
```

---

### Task 14: Contact page + API route

**Files:**
- Create: `src/app/api/contact/route.ts`, `src/app/contact/page.tsx`, `public/__forms.html`

- [ ] **Step 1: Port the API route + Netlify Forms detection file**

```bash
mkdir -p src/app/api/contact
cp $OLD/src/app/api/contact/route.ts src/app/api/contact/route.ts
cp $OLD/public/__forms.html public/__forms.html
```
Run `npm run type-check`. Fix only broken imports (the route is self-contained — rate limiting and honeypot logic must remain untouched).

- [ ] **Step 2: Port the contact page**

Look at `$OLD/src/app/contact/page.tsx` and its form component under `$OLD/src/components/`. Port the form component into `src/components/contact/ContactForm.tsx`, restyling classes to Ion tokens (`bg-panel`, `border-hairline`, `text-signal`, focus ring `ring-ion`) but keeping all field names, the honeypot field, and the POST behavior identical. Create `src/app/contact/page.tsx`:

```tsx
import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = { title: 'Contact', description: 'Get in touch with Ray Turk.' };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="font-display text-4xl font-semibold">Contact</h1>
      <p className="mt-4 text-muted">Have a project or a role in mind? Send a note.</p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Manual test**

Run `npm run dev`, submit the form with the honeypot empty → expect success path (or a clean error if no email provider env vars are set — that's correct behavior). Submit 6 times rapidly → expect a 429 on the 6th.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: contact page + ported rate-limited contact API"
```

---

### Task 15: Revalidate webhook (updated route map)

**Files:**
- Create: `src/app/api/revalidate/route.ts`, `src/app/api/revalidate/__tests__` is skipped (route handlers tested in Plan 3 via Playwright)

- [ ] **Step 1: Port and update**

```bash
mkdir -p src/app/api/revalidate
cp $OLD/src/app/api/revalidate/route.ts src/app/api/revalidate/route.ts
```
Then in the `switch (type)` block: change `/projects` paths to `/work`, `/blog` paths to `/writing`, and delete the `case 'service':` and `case 'testimonial':` blocks entirely (a payload with those types now falls through to the default `Invalid type` 400 — correct, those CPTs are retired). The result:

```ts
switch (type) {
  case 'project':
    revalidatePath(`/work/${slug}`);
    revalidatePath('/work');
    revalidatedPaths.push(`/work/${slug}`, '/work');
    break;
  case 'post':
    revalidatePath(`/writing/${slug}`);
    revalidatePath('/writing');
    revalidatedPaths.push(`/writing/${slug}`, '/writing');
    break;
  default:
    return NextResponse.json({ error: `Invalid type: ${type}` }, { status: 400 });
}
```
Leave the `paths` array branch, secret validation, and GET health check untouched. **Note for cutover (Plan 3):** the WP webhook plugin sends literal paths — its config must be updated to the new prefixes when the domain swaps.

- [ ] **Step 2: Verify + commit**

Run: `npm run type-check` — Expected: PASS.
```bash
git add -A && git commit -m "feat: ISR revalidate webhook with /work + /writing route map"
```

---

### Task 16: netlify.toml + redirect map

**Files:**
- Create: `netlify.toml`

- [ ] **Step 1: Create `netlify.toml`** — based on the old one, with the new 301 map:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

[[plugins]]
  package = "@netlify/plugin-nextjs"

# www → apex
[[redirects]]
  from = "https://www.rturk.me/*"
  to = "https://rturk.me/:splat"
  status = 301
  force = true

# New URL structure (spec: /projects→/work, /blog→/writing)
[[redirects]]
  from = "/projects/*"
  to = "/work/:splat"
  status = 301

[[redirects]]
  from = "/projects"
  to = "/work"
  status = 301

[[redirects]]
  from = "/blog/*"
  to = "/writing/:splat"
  status = 301

[[redirects]]
  from = "/blog"
  to = "/writing"
  status = 301

# Retired sections
[[redirects]]
  from = "/services/*"
  to = "/"
  status = 301

[[redirects]]
  from = "/services"
  to = "/"
  status = 301

[[redirects]]
  from = "/audit"
  to = "/"
  status = 301

# Legacy WordPress paths (carried from old config, retargeted)
[[redirects]]
  from = "/feed"
  to = "/writing"
  status = 301

[[redirects]]
  from = "/feed/"
  to = "/writing"
  status = 301

[[redirects]]
  from = "/category/*"
  to = "/writing"
  status = 301

[[redirects]]
  from = "/tag/*"
  to = "/writing"
  status = 301

[[redirects]]
  from = "/author/*"
  to = "/about"
  status = 301

[[redirects]]
  from = "/wp-json/*"
  to = "/"
  status = 410

[[redirects]]
  from = "/xmlrpc.php"
  to = "/"
  status = 410

# Security headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"

# Immutable static assets
[[headers]]
  for = "/fonts/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

- [ ] **Step 2: Install the Netlify plugin as a dev dependency**

```bash
npm i -D @netlify/plugin-nextjs
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: netlify config with 301 redirect map for new URL structure"
```

---

### Task 17: README + final verification

**Files:**
- Create/Modify: `README.md`

- [ ] **Step 1: Write `README.md`**

```markdown
# rturk.me

Personal site of Ray Turk — full-stack developer, Cleveland OH.

Headless WordPress (cms.rturk.me, WPGraphQL) → Next.js 15 (App Router, RSC, ISR) → Netlify.

## Stack

- Next.js 15 · React 19 · TypeScript · Tailwind v4
- Typed data layer: fetch-based GraphQL client + GraphQL Codegen
- Vitest + Testing Library
- Type: Clash Display · Archivo · JetBrains Mono (self-hosted)

## Develop

​```bash
nvm use 20
cp .env.example .env.local   # fill in values
npm install
npm run codegen              # types from live WPGraphQL schema
npm run dev
​```

`npm test` · `npm run type-check` · `npm run build`
```
(Remove the zero-width escapes around the backticks when writing the actual file.)

- [ ] **Step 2: Full verification suite**

```bash
npm test && npm run type-check && npm run lint && npm run build
```
Expected: all green, build lists every route: `/`, `/work`, `/work/[slug]`, `/writing`, `/writing/[slug]`, `/about`, `/colophon`, `/contact`, `/privacy`, `/terms`, `/api/revalidate`, `/api/contact`.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "docs: README"
```

- [ ] **Step 4: Create the GitHub repo (public) and push** — confirm with Ray before pushing:

```bash
gh repo create rturk-me --public --source . --push
```

---

## Out of Scope for Plan 1 (deliberately)

- Canvas hero, motion micro-interactions, cmdk palette, Shiki, View Transitions → **Plan 2: Experience**
- Case-study ACF deep-dive template (blocked on WPGraphQL for ACF plugin install — coordinate with Ray) → **Plan 2**
- JSON-LD, sitemap/robots, RSS, OG images, GTM/consent, Playwright, Lighthouse CI, GitHub Actions, Netlify site + cutover → **Plan 3: Launch**
