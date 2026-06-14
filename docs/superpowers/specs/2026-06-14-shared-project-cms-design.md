# Shared Project CMS — Design Spec

**Date:** 2026-06-14
**Status:** Approved by Ray (brainstorming session)
**Goal:** Make cms.rturk.me the single source of truth for project data, tagged by audience, so Code The Land pulls its subset via filtered WPGraphQL while rturk.me keeps showing everything.

## Problem

The same projects (Summit HVAC, Revive Detailing, Clover Garden, Luminary Aesthetics, Ember & Oak, …) are maintained in two places: rturk.me reads them from cms.rturk.me (WPGraphQL), and Code The Land hardcodes them in `data/work.ts`. Editing a project means editing it twice; the two inevitably drift. Centralize in the CMS, tag by audience, and have each site pull what it needs.

## Audiences & filtering model

- **rturk.me** is the personal "everything I've built" site — shows **all** projects, no audience filter. Essentially unchanged.
- **Code The Land** shows only the subset tagged for it.
- Therefore the audience taxonomy needs **one meaningful term: `codetheland`**. Tagging a project with it surfaces it on CTL; leaving it untagged keeps it rturk-only. Minimal tagging burden.

## CMS changes (cms.rturk.me, existing `Project` CPT)

**1. New `Audience` taxonomy**
- Registered against the `project` post type.
- `show_in_graphql: true`; GraphQL single name `audience`, plural `audiences`.
- One meaningful term to start: **`codetheland`** (slug `codetheland`).
- Chosen over an ACF boolean because WPGraphQL filters CPT connections by taxonomy natively; a boolean would require meta-query filtering (extra plugin/awkward).

**2. Two new ACF fields** (CTL marketing framing; added to the existing `projectInfo` ACF group so the GraphQL path is `projectInfo { marketingBlurb industry }`, matching the query below):
- `marketingBlurb` (textarea) — Code The Land–voice description. rturk.me continues to use the core `excerpt` (technical voice). This realizes the "two blurbs per project" decision.
- `industry` (text) — CTL's industry label (e.g. "Auto Service", "Med Spa").

**Reused existing fields (no new work):**
- `title` → CTL title
- `featuredImage.node.sourceUrl` → CTL `screenshot`
- `projectInfo.projectUrl` → CTL `url`
- `techStacks` (or `projectTypes`) term names → CTL `tags`

Net-new CMS work: register one taxonomy, add two fields, then tag the CTL projects and fill `marketingBlurb` + `industry` on them.

## Queries & filtering

**Code The Land** fetches only its subset at build/ISR time:
```graphql
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
```
- The exact `where` argument WPGraphQL generates for the custom taxonomy (`audienceIn` vs. a generic `taxQuery`) is verified during implementation. If a simple filter arg isn't auto-generated, fall back to traversing the term's project connection:
  `audiences(where: { slug: "codetheland" }) { nodes { projects { nodes { ... } } } }`.
- Either form filters at build time; no client-side filtering.

**rturk.me** is unchanged. Its existing queries keep working when the new ACF fields are added (extra fields don't break existing queries). It may *optionally* surface `marketingBlurb`/`industry` later, but needs no change for this feature. Net effect: the "end-to-end" scope is really **CMS + Code The Land**, with rturk.me untouched.

## Code The Land — new data layer

CTL is Next.js 16 (root structure: `app/`, `data/`, `lib/`), currently no GraphQL. It gains a thin, ported version of rturk-me's proven pattern:

- **`lib/graphql.ts`** — the `fetchGraphQL` fetch client ported from rturk-me: reads `WORDPRESS_GRAPHQL_ENDPOINT`, POSTs the printed query, defaults to ISR caching (`next: { revalidate: 3600 }`), throws typed `GraphQLRequestError`. Same opt-in caching semantics.
- **`lib/projects.ts`** — `getDemoSites(): Promise<DemoSite[]>`:
  - runs the CTL query,
  - **maps CMS → the existing `DemoSite` shape**: `title`←title, `industry`←projectInfo.industry, `description`←projectInfo.marketingBlurb, `url`←projectInfo.projectUrl, `tags`←techStacks node names, `screenshot`←featuredImage.node.sourceUrl,
  - **falls back to the current `data/work.ts` array** on any CMS error or empty result.
- **`app/work/page.tsx`** — swap `import { demoSites } from '@/data/work'` for `const demoSites = await getDemoSites()`. The page JSX is unchanged because the shape matches the existing `DemoSite` interface.
- **`data/work.ts`** — kept: the `DemoSite` interface + the current array, now serving as the static fallback.
- **Env (CTL Netlify):** `WORDPRESS_GRAPHQL_ENDPOINT=https://cms.rturk.me/?graphql`, `NEXT_PUBLIC_WORDPRESS_URL=https://cms.rturk.me`, `NEXT_PUBLIC_WP_HOSTNAME=cms.rturk.me`.

## Data flow

```
WP admin (cms.rturk.me)
  └─ Project CPT (+ Audience taxonomy, marketingBlurb, industry)
        │  WPGraphQL
        ├──────────────► rturk.me     getAllProjects() → all projects (unchanged)
        └── where audience=codetheland ► Code The Land  getDemoSites() → mapped DemoSite[] (+ data/work.ts fallback)
```

## Error handling & resilience

- `getDemoSites()` returns the `data/work.ts` fallback array on any CMS error or empty result — Code The Land's work page can never break from a CMS outage.
- CTL builds statically (SSG + ISR), so the work page is pre-rendered; ISR refreshes it on the revalidate window.
- `fetchGraphQL` throws typed errors; the mapper's try/catch converts them to the fallback path.

## Testing

- **Unit (Vitest, ported into CTL):**
  - the CMS→`DemoSite` mapper — field mapping correctness + `techStacks` → `tags` flattening (pure function, TDD).
  - the fallback path — `fetchGraphQL` rejects → `getDemoSites()` returns `data/work.ts` (mock the client, assert fallback).
- **Build verification:** `npm run build` in CTL succeeds against the live CMS and the work page renders the CTL-tagged subset; with no CMS env it falls back and still builds green.

## Rollout order

1. **CMS first** (Ray, WP admin): register the `Audience` taxonomy + `marketingBlurb`/`industry` fields; tag the CTL projects; fill the two fields. Until CTL code ships, nothing changes for either site.
2. **Then CTL code:** build the data layer, swap the import, deploy. CTL keeps using `data/work.ts` until deployed, so it's never broken mid-flight.

## Out of scope

- The rich rturk.me case-study deep-dive fields (architecture/decisions/metrics) — still the separate Plan-2b ACF work, gated on the WPGraphQL-for-ACF schema bug.
- Any rturk.me UI/query changes — rturk.me is untouched by this feature.
- A second audience term for rturk (not needed; rturk shows all).
