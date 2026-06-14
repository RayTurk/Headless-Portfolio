# Shared Project CMS — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Code The Land's `/work` page pull its projects from cms.rturk.me (filtered to `audience=codetheland`) instead of the hardcoded `data/work.ts`, with `data/work.ts` retained as a static fallback — so the same projects are maintained once in the CMS.

**Architecture:** A thin fetch-based WPGraphQL data layer is added to the codetheland Next.js app (mirroring rturk-me's proven pattern). `getDemoSites()` runs a filtered query, maps the CMS shape to the existing `DemoSite` interface, and falls back to `data/work.ts` on any error/empty result. The `/work` page becomes async and awaits it. rturk.me is untouched.

**Tech Stack:** Next.js 16 (App Router, RSC, ISR), React 19, TypeScript, Vitest (new to this repo). String-based GraphQL queries (no Apollo, no graphql-tag dependency).

**Repo:** `/Users/raymondturk/Developer/github/codetheland` (Next 16.2.4, root-level structure: `app/`, `data/`, `lib/`, `components/`; alias `@/*` → `./*`).
**Spec:** `/Users/raymondturk/Developer/github/Headless-Portfolio/docs/superpowers/specs/2026-06-14-shared-project-cms-design.md`

**Conventions:**
- Run `source ~/.nvm/nvm.sh && nvm use 20` before npm commands.
- Verify each code task with `npm test && npm run lint && npm run build` (all green).
- Reference implementation for the GraphQL client: `/Users/raymondturk/Developer/github/rturk-me/src/lib/graphql.ts`.

---

## Prerequisite — CMS ops (Ray, in WP admin; NOT an executable task)

The code tasks below are written so they build and unit-test **without** the CMS being ready (the mapper is mocked; live calls fall back to `data/work.ts`). But for real data to flow, Ray completes this first:

1. **Register the `Audience` taxonomy** on the `project` post type (via the theme's `functions.php`, a small mu-plugin, or a CPT/taxonomy plugin):
   - `show_in_graphql: true`, `graphql_single_name: "audience"`, `graphql_plural_name: "audiences"`, hierarchical false.
   - Add one term: **`codetheland`** (slug `codetheland`).
2. **Add two ACF fields to the existing `projectInfo` field group** (so GraphQL path is `projectInfo { marketingBlurb industry }`), both with "Show in GraphQL" enabled:
   - `marketingBlurb` — Textarea.
   - `industry` — Text.
3. **Tag + fill** each project that should appear on Code The Land: assign the `codetheland` audience term, write its `marketingBlurb` and `industry`.
4. Confirm via a quick query at `https://cms.rturk.me/?graphql` that `projects(where: {...})` returns the tagged subset (the implementer will pin the exact `where` arg in Task 3).

Until this is done, `/work` keeps rendering `data/work.ts` (the fallback) — never broken.

---

## File Structure (end state)

```
codetheland/
├── vitest.config.ts            # NEW — node env, @ alias
├── .env.example                # NEW — WP endpoint vars
├── lib/
│   ├── graphql.ts              # NEW — fetchGraphQL (string queries, ISR caching)
│   ├── projects.ts             # NEW — getDemoSites(): query + map + fallback
│   └── __tests__/
│       ├── graphql.test.ts     # NEW — client tests (TDD)
│       └── projects.test.ts    # NEW — mapper + fallback tests (TDD)
├── data/work.ts                # KEPT — DemoSite interface + array (now the fallback)
├── app/work/page.tsx           # MODIFIED — async, await getDemoSites()
└── package.json                # MODIFIED — vitest devdeps + test scripts
```

---

### Task 1: Vitest test infrastructure + env example

**Files:**
- Create: `vitest.config.ts`, `lib/__tests__/smoke.test.ts`, `.env.example`
- Modify: `package.json`

- [ ] **Step 1: Install Vitest**

```bash
cd /Users/raymondturk/Developer/github/codetheland
source ~/.nvm/nvm.sh && nvm use 20
npm i -D vitest
```

- [ ] **Step 2: Create `vitest.config.ts`** (node environment — only pure functions are tested; `@` alias matches tsconfig `@/*` → `./*`)

```ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['lib/**/*.test.ts'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './') },
  },
});
```

- [ ] **Step 3: Add scripts to `package.json`** — add to `"scripts"`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Create the smoke test** — `lib/__tests__/smoke.test.ts`

```ts
import { describe, it, expect } from 'vitest';

describe('vitest', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 5: Create `.env.example`**

```
# Headless WordPress (shared content hub at cms.rturk.me)
WORDPRESS_GRAPHQL_ENDPOINT=https://cms.rturk.me/?graphql
NEXT_PUBLIC_WORDPRESS_URL=https://cms.rturk.me
NEXT_PUBLIC_WP_HOSTNAME=cms.rturk.me
```

- [ ] **Step 6: Run + commit**

Run: `npm test`
Expected: 1 passed.
```bash
git add -A && git commit -m "chore: add vitest + WP endpoint env example"
```

---

### Task 2: fetchGraphQL client (TDD)

**Files:**
- Create: `lib/graphql.ts`, `lib/__tests__/graphql.test.ts`

- [ ] **Step 1: Write the failing test** — `lib/__tests__/graphql.test.ts`

```ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchGraphQL, GraphQLRequestError } from '../graphql';

const QUERY = `query Ping { ping }`;

function mockFetchOnce(body: unknown, ok = true, status = 200) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok, status,
    json: () => Promise.resolve(body),
  }));
}

describe('fetchGraphQL', () => {
  beforeEach(() => vi.stubEnv('WORDPRESS_GRAPHQL_ENDPOINT', 'https://cms.example.com/?graphql'));
  afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

  it('returns data on success', async () => {
    mockFetchOnce({ data: { ping: 'pong' } });
    const data = await fetchGraphQL<{ ping: string }>(QUERY);
    expect(data.ping).toBe('pong');
  });

  it('POSTs the query + variables to the endpoint with ISR caching', async () => {
    mockFetchOnce({ data: {} });
    await fetchGraphQL(QUERY, { first: 5 });
    const [url, init] = (fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(url).toBe('https://cms.example.com/?graphql');
    const body = JSON.parse(init.body);
    expect(body.query).toContain('query Ping');
    expect(body.variables).toEqual({ first: 5 });
    expect(init.next).toEqual({ revalidate: 3600 });
  });

  it('throws GraphQLRequestError on GraphQL errors', async () => {
    mockFetchOnce({ errors: [{ message: 'boom' }] });
    await expect(fetchGraphQL(QUERY)).rejects.toThrow(GraphQLRequestError);
  });

  it('throws on HTTP failure', async () => {
    mockFetchOnce({}, false, 500);
    await expect(fetchGraphQL(QUERY)).rejects.toThrow('500');
  });

  it('throws when the endpoint env var is missing', async () => {
    vi.stubEnv('WORDPRESS_GRAPHQL_ENDPOINT', '');
    await expect(fetchGraphQL(QUERY)).rejects.toThrow('WORDPRESS_GRAPHQL_ENDPOINT');
  });
});
```

- [ ] **Step 2: Run it — expect FAIL** (`npm test -- graphql`): cannot resolve `../graphql`.

- [ ] **Step 3: Implement `lib/graphql.ts`** (string-query variant — no graphql/graphql-tag dependency)

```ts
/**
 * Fetch-based WPGraphQL client for SSG/RSC. Mirrors rturk-me's client but takes
 * a plain string query (Code The Land has no Apollo/graphql-tag dependency).
 * Defaults to ISR caching so pages stay static and revalidate.
 */
export class GraphQLRequestError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'GraphQLRequestError';
    this.status = status;
  }
}

export interface FetchGraphQLOptions {
  /** ISR window in seconds (default 3600). Pass false to opt out of caching. */
  revalidate?: number | false;
}

export async function fetchGraphQL<TData = unknown>(
  query: string,
  variables?: Record<string, unknown>,
  options?: FetchGraphQLOptions
): Promise<TData> {
  const endpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT;
  if (!endpoint) {
    throw new GraphQLRequestError('WORDPRESS_GRAPHQL_ENDPOINT environment variable is not set');
  }

  const revalidate = options?.revalidate ?? 3600;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    ...(revalidate === false ? { cache: 'no-store' as const } : { next: { revalidate } }),
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

- [ ] **Step 4: Run — expect PASS** (`npm test -- graphql`, 5 tests).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: fetch-based WPGraphQL client (TDD)"
```

---

### Task 3: getDemoSites() — query, map, fallback (TDD)

**Files:**
- Create: `lib/projects.ts`, `lib/__tests__/projects.test.ts`
- Reference (do not modify): `data/work.ts` (exports `DemoSite` interface + `demoSites: DemoSite[]`)

- [ ] **Step 1: Confirm the `DemoSite` shape** — read `data/work.ts`. The interface is:
```ts
export interface DemoSite {
  title: string;
  industry: string;
  description: string;
  url: string;
  tags: string[];
  screenshot: string;
}
```
`getDemoSites()` must return `DemoSite[]` so `app/work/page.tsx` renders unchanged.

- [ ] **Step 2: Write the failing test** — `lib/__tests__/projects.test.ts`

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the GraphQL client so these tests never hit the network.
vi.mock('../graphql', () => ({
  fetchGraphQL: vi.fn(),
  GraphQLRequestError: class extends Error {},
}));

import { fetchGraphQL } from '../graphql';
import { getDemoSites, mapProjectToDemoSite } from '../projects';
import { demoSites as fallbackDemoSites } from '../../data/work';

const cmsNode = {
  title: 'Summit HVAC & Plumbing',
  slug: 'summit-hvac',
  featuredImage: { node: { sourceUrl: 'https://cms.rturk.me/img/summit.jpg', altText: 'Summit' } },
  projectInfo: {
    projectUrl: 'https://summit-hvac-demo.netlify.app',
    marketingBlurb: 'Service-area focused site with seasonal offers that converts.',
    industry: 'HVAC & Plumbing',
  },
  techStacks: { nodes: [{ name: 'HVAC' }, { name: 'Service Area' }] },
};

describe('mapProjectToDemoSite', () => {
  it('maps a CMS project node to the DemoSite shape', () => {
    expect(mapProjectToDemoSite(cmsNode)).toEqual({
      title: 'Summit HVAC & Plumbing',
      industry: 'HVAC & Plumbing',
      description: 'Service-area focused site with seasonal offers that converts.',
      url: 'https://summit-hvac-demo.netlify.app',
      tags: ['HVAC', 'Service Area'],
      screenshot: 'https://cms.rturk.me/img/summit.jpg',
    });
  });

  it('tolerates missing optional fields with safe defaults', () => {
    const sparse = { title: 'Bare', slug: 'bare', featuredImage: null, projectInfo: null, techStacks: null };
    const result = mapProjectToDemoSite(sparse);
    expect(result.title).toBe('Bare');
    expect(result.industry).toBe('');
    expect(result.description).toBe('');
    expect(result.url).toBe('');
    expect(result.tags).toEqual([]);
    expect(result.screenshot).toBe('');
  });
});

describe('getDemoSites', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns mapped CMS projects when the query succeeds', async () => {
    vi.mocked(fetchGraphQL).mockResolvedValue({ projects: { nodes: [cmsNode] } });
    const result = await getDemoSites();
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Summit HVAC & Plumbing');
  });

  it('falls back to data/work.ts when the CMS errors', async () => {
    vi.mocked(fetchGraphQL).mockRejectedValue(new Error('CMS down'));
    const result = await getDemoSites();
    expect(result).toEqual(fallbackDemoSites);
  });

  it('falls back to data/work.ts when the CMS returns no projects', async () => {
    vi.mocked(fetchGraphQL).mockResolvedValue({ projects: { nodes: [] } });
    const result = await getDemoSites();
    expect(result).toEqual(fallbackDemoSites);
  });
});
```

- [ ] **Step 3: Run it — expect FAIL** (`npm test -- projects`): cannot resolve `../projects`.

- [ ] **Step 4: Implement `lib/projects.ts`**

```ts
import { fetchGraphQL } from './graphql';
import { demoSites, type DemoSite } from '../data/work';

/**
 * Projects tagged for Code The Land, pulled from the shared CMS (cms.rturk.me).
 * Filters by the `codetheland` audience term. The exact `where` arg is verified
 * against the live schema (see plan Task 3, Step 6); the term-traversal form is
 * the documented fallback if `audienceIn` isn't auto-generated.
 */
const CTL_PROJECTS_QUERY = `
  query CtlProjects {
    projects(first: 100, where: { audienceIn: ["codetheland"] }) {
      nodes {
        title
        slug
        featuredImage { node { sourceUrl altText } }
        projectInfo { projectUrl marketingBlurb industry }
        techStacks { nodes { name } }
      }
    }
  }
`;

interface CmsProjectNode {
  title?: string | null;
  slug?: string | null;
  featuredImage?: { node?: { sourceUrl?: string | null } | null } | null;
  projectInfo?: {
    projectUrl?: string | null;
    marketingBlurb?: string | null;
    industry?: string | null;
  } | null;
  techStacks?: { nodes?: Array<{ name?: string | null }> | null } | null;
}

interface CtlProjectsResult {
  projects?: { nodes?: CmsProjectNode[] | null } | null;
}

/** Pure mapping from a CMS project node to the front-end DemoSite shape. */
export function mapProjectToDemoSite(node: CmsProjectNode): DemoSite {
  return {
    title: node.title ?? '',
    industry: node.projectInfo?.industry ?? '',
    description: node.projectInfo?.marketingBlurb ?? '',
    url: node.projectInfo?.projectUrl ?? '',
    tags: (node.techStacks?.nodes ?? []).map((t) => t.name ?? '').filter(Boolean),
    screenshot: node.featuredImage?.node?.sourceUrl ?? '',
  };
}

/**
 * Code The Land's demo sites. Pulls the `codetheland`-tagged projects from the
 * CMS and maps them; falls back to the bundled `data/work.ts` array on any error
 * or empty result, so the work page can never break from a CMS outage.
 */
export async function getDemoSites(): Promise<DemoSite[]> {
  try {
    const data = await fetchGraphQL<CtlProjectsResult>(CTL_PROJECTS_QUERY);
    const nodes = data.projects?.nodes ?? [];
    if (nodes.length === 0) return demoSites;
    return nodes.map(mapProjectToDemoSite);
  } catch (error) {
    console.error('getDemoSites: CMS unreachable, using data/work.ts fallback:', error);
    return demoSites;
  }
}
```

- [ ] **Step 5: Run — expect PASS** (`npm test -- projects`, 5 tests). Then `npm test` (all, incl. smoke + graphql) green.

- [ ] **Step 6: Verify the live query shape** (only meaningful AFTER Ray's CMS prerequisite is done; otherwise note and skip):

```bash
curl -s -X POST "https://cms.rturk.me/?graphql" -H "Content-Type: application/json" \
  -d '{"query":"{ projects(first: 2, where: { audienceIn: [\"codetheland\"] }) { nodes { title projectInfo { marketingBlurb industry } } } }"}'
```
- If this returns the tagged projects → the query in `lib/projects.ts` is correct, leave it.
- If WPGraphQL responds that `audienceIn` is an unknown field on the `where` input, switch `CTL_PROJECTS_QUERY` to the term-traversal form and update `getDemoSites` to read `data.audiences.nodes[0].projects.nodes`:
  ```graphql
  query CtlProjects {
    audiences(where: { slug: ["codetheland"] }) {
      nodes { projects(first: 100) { nodes { title slug featuredImage { node { sourceUrl altText } } projectInfo { projectUrl marketingBlurb industry } techStacks { nodes { name } } } } }
    }
  }
  ```
  (Adjust the `CtlProjectsResult` type + the `nodes` extraction accordingly; the `mapProjectToDemoSite` mapper is unchanged. Re-run `npm test` — the mapper/fallback tests still pass since they mock `fetchGraphQL`.)
- If the CMS prerequisite isn't done yet, leave the primary query as written and note in the commit that the live shape is unverified pending CMS setup (the fallback keeps the page working).

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: getDemoSites() — CMS-backed demo sites with data/work.ts fallback (TDD)"
```

---

### Task 4: Wire the work page to the CMS

**Files:**
- Modify: `app/work/page.tsx`

- [ ] **Step 1: Make the page async and source data from `getDemoSites()`** — in `app/work/page.tsx`:
  - Replace the import `import { demoSites } from '@/data/work'` with `import { getDemoSites } from '@/lib/projects'`.
  - Change the component signature from `export default function WorkPage() {` to `export default async function WorkPage() {`.
  - As the first line inside the component body, add: `const demoSites = await getDemoSites()`.
  - Add `export const revalidate = 3600` near the top (enables ISR for the work page).
  - Leave ALL JSX unchanged — it already iterates `demoSites` and the shape is identical.

- [ ] **Step 2: Verify build**

Run: `npm run build && npm run lint && npm test`
Expected: all green. The `/work` route builds (statically with ISR). With no CMS env locally, `getDemoSites()` falls back to `data/work.ts`, so the page renders the same as before — confirm the build succeeds and `/work` is in the route list.

- [ ] **Step 3: Local visual check (optional)** — `npm run dev`, open `/work`, confirm the demo cards render (from fallback locally, or from CMS if `.env.local` has the endpoint). Kill dev.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: /work page sources demo sites from the CMS (ISR + fallback)"
```

---

### Task 5: Final verification + handoff

**Files:** none (verification only)

- [ ] **Step 1: Full green suite**

```bash
source ~/.nvm/nvm.sh && nvm use 20
npm test && npm run lint && npm run build
```
Expected: all green; `/work` in the route list as static/ISR. Report the route line.

- [ ] **Step 2: Confirm no regressions to other pages** — the build should still generate the existing routes (home, how-it-works, blog, etc.) unchanged. `data/work.ts` is still present and exported (now as fallback).

- [ ] **Step 3: Commit any final cleanup, then report the ops handoff** — surface to Ray:
  - Set CTL Netlify env vars: `WORDPRESS_GRAPHQL_ENDPOINT=https://cms.rturk.me/?graphql`, `NEXT_PUBLIC_WORDPRESS_URL=https://cms.rturk.me`, `NEXT_PUBLIC_WP_HOSTNAME=cms.rturk.me`.
  - If CTL renders CMS `featuredImage` via `next/image` anywhere, confirm `cms.rturk.me` is in `next.config` `images.remotePatterns` (the current `/work` page uses `next/image` with local `screenshot` paths from `data/work.ts`; CMS screenshots are absolute cms.rturk.me URLs — **this needs the remote pattern**, see Task 4 note below).

- [ ] **Step 4: Handle the `next/image` remote host** (REQUIRED if the work page uses `next/image` for screenshots) — the `/work` page imports `next/image`. CMS `screenshot` URLs are `https://cms.rturk.me/...`, which `next/image` blocks unless allowlisted. In `next.config` (`.ts`/`.mjs` — check which the repo uses), add under `images`:

```ts
images: {
  remotePatterns: [{ protocol: 'https', hostname: 'cms.rturk.me' }],
},
```
Merge into any existing `images` config rather than replacing it. Run `npm run build` again to confirm green. Commit:
```bash
git add -A && git commit -m "feat: allow cms.rturk.me images for CMS-sourced work screenshots"
```

---

## Self-Review Notes (for the orchestrator)

- The code is fully buildable + unit-testable **before** Ray's CMS prerequisite (mapper mocked; live calls fall back). Only Task 3 Step 6 (live query-shape verification) and real data depend on the CMS being set up.
- The `where: { audienceIn: [...] }` arg is the primary guess; Task 3 Step 6 verifies/swaps to term-traversal against the live schema. Both forms feed the same mapper.
- `next/image` remote host (Task 5 Step 4) is the one easy-to-miss gotcha — CMS screenshots will 404 through the image optimizer without the `remotePatterns` entry.

## Out of scope

- rturk.me changes (untouched).
- The rich case-study ACF fields (separate Plan-2b work, gated on the WPGraphQL-for-ACF schema bug).
- Migrating CTL's blog/MDX content (only `/work` projects are centralized here).
