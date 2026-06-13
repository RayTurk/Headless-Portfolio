# rturk.me Rebuild — Plan 2: Experience

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Layer the "fun, interactive, cutting-edge" experience onto the functional Plan-1 site — a pointer-reactive canvas hero, motion micro-interactions, a ⌘K command palette, Shiki-highlighted code with auto TOC, an animated "Under the Hood" pipeline, View Transitions, and real About/Colophon copy — all reduced-motion-aware and within a Lighthouse-95+ budget.

**Architecture:** All motion is opt-in and gated on `prefers-reduced-motion`. The canvas and palette are client components that SSR a static fallback and only animate after hydration, so they don't block first paint or break SSG. Shiki and TOC run server-side at build/ISR time (zero client JS for highlighting). The `motion` library powers declarative micro-interactions; a hand-rolled canvas avoids a WebGL dependency.

**Tech Stack:** Next 16 (App Router, RSC), React 19, Tailwind v4 (Ion tokens), `motion` (framer-motion successor), `cmdk`, `shiki`, `node-html-parser`. Tests: Vitest + Testing Library + jsdom.

**Repo:** `/Users/raymondturk/Developer/github/rturk-me` (Plan 1 complete, pushed to github.com/RayTurk/rturk-me).
**Spec:** `/Users/raymondturk/Developer/github/Headless-Portfolio/docs/superpowers/specs/2026-06-12-portfolio-rebuild-design.md`

**Conventions (already in repo):**
- Run `source ~/.nvm/nvm.sh && nvm use 20` before every npm command.
- Ion tokens as Tailwind classes: `bg-void bg-panel border-hairline text-signal text-muted text-faint text-ion bg-ion text-drift font-display font-mono font-sans`.
- Verify each task with `npm test && npm run type-check && npm run lint && npm run build` (all must stay green).
- Data: `src/lib/api.ts` (`getFeaturedProjects()`, `getRecentPosts(n)`, `getAllProjects()`, `getPostBySlug()` …). Types: `src/types/wordpress.ts`.

---

## Out of Scope (separate plans)

- **Case-study ACF deep-dive template** (architecture/decisions/metrics sections) — blocked on the WPGraphQL-for-ACF plugin + introspection being enabled on cms.rturk.me. This becomes **Plan 2b (CMS-gated)** once Ray enables those. Do NOT build it here.
- **Plan 3 (Launch):** JSON-LD, sitemap.ts/robots.ts, RSS, next/og images, GTM + consent, Playwright, Lighthouse CI in GitHub Actions, Netlify site + domain cutover.

---

## File Structure (end state of Plan 2)

```
src/
├── hooks/
│   └── useReducedMotion.ts        # matchMedia-based, used by canvas + components
├── lib/
│   ├── animations.ts              # shared motion variants
│   ├── highlighter.ts             # shiki singleton
│   └── content.ts                 # processPostContent() + slugify() (Shiki + TOC)
├── components/
│   ├── animations/
│   │   └── RevealOnScroll.tsx     # staggered scroll-reveal wrapper
│   ├── interactive/
│   │   ├── ParticleField.tsx      # hand-rolled canvas (client)
│   │   ├── Hero.tsx               # hero: status line + canvas + gradient fallback
│   │   ├── MagneticButton.tsx     # magnetic + spring-press link/button
│   │   ├── TiltCard.tsx           # pointer-tilt + glow card
│   │   └── CommandPalette.tsx     # cmdk ⌘K palette (client)
│   ├── home/
│   │   └── Pipeline.tsx           # "Under the Hood" animated diagram
│   ├── layout/
│   │   └── CommandKHint.tsx       # client ⌘K button for the (server) Header
│   └── blog/
│       └── TableOfContents.tsx    # sticky TOC from headings
└── app/
    ├── layout.tsx                 # mounts CommandPalette; View Transitions
    ├── page.tsx                   # Hero, TiltCard, Pipeline, RevealOnScroll
    ├── work/page.tsx              # TiltCard
    ├── writing/[slug]/page.tsx    # processPostContent + TableOfContents
    ├── about/page.tsx             # real copy
    └── colophon/page.tsx          # real copy
```

---

### Task 1: Animation foundations (reduced-motion hook + variants + CSS guard)

**Files:**
- Create: `src/hooks/useReducedMotion.ts`, `src/hooks/__tests__/useReducedMotion.test.ts`, `src/lib/animations.ts`
- Modify: `src/app/globals.css`, `package.json`

- [ ] **Step 1: Install the motion library**

```bash
source ~/.nvm/nvm.sh && nvm use 20
npm i motion
```

- [ ] **Step 2: Write the failing test** — `src/hooks/__tests__/useReducedMotion.test.ts`

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useReducedMotion } from '../useReducedMotion';

function mockMatchMedia(matches: boolean) {
  vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })));
}

describe('useReducedMotion', () => {
  beforeEach(() => vi.unstubAllGlobals());

  it('returns true when the user prefers reduced motion', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it('returns false when the user has no reduced-motion preference', () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });
});
```

- [ ] **Step 3: Run it — expect failure**

Run: `npm test -- useReducedMotion`
Expected: FAIL — cannot resolve `../useReducedMotion`.

- [ ] **Step 4: Implement `src/hooks/useReducedMotion.ts`**

```ts
'use client';

import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Tracks the user's reduced-motion preference. Returns true when the user
 * has requested reduced motion — animations should be skipped or simplified.
 * SSR-safe: starts false, syncs on mount, updates on preference change.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia(QUERY);
    setReduced(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
```

- [ ] **Step 5: Run the test — expect pass**

Run: `npm test -- useReducedMotion`
Expected: PASS (2 tests).

- [ ] **Step 6: Create `src/lib/animations.ts`** (shared variants for `motion`)

```ts
import type { Variants } from 'motion/react';

/** Container that staggers its children in. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** A single item that fades and rises into place. */
export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 30 },
  },
};

/** Spring config reused by magnetic/tilt interactions. */
export const springSoft = { type: 'spring' as const, stiffness: 150, damping: 15, mass: 0.6 };
```

- [ ] **Step 7: Add a reduced-motion CSS guard to `src/app/globals.css`**

Append after the `body` rule:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
}
```

- [ ] **Step 8: Verify + commit**

Run: `npm test && npm run type-check && npm run lint && npm run build`
Expected: all green.
```bash
git add -A && git commit -m "feat: animation foundations — reduced-motion hook, variants, CSS guard"
```

---

### Task 2: RevealOnScroll wrapper + apply to homepage sections

**Files:**
- Create: `src/components/animations/RevealOnScroll.tsx`, `src/components/animations/__tests__/RevealOnScroll.test.tsx`
- Modify: `src/app/page.tsx`, possibly `vitest.config.ts` + `src/test/setup.ts`

- [ ] **Step 1: Write the failing test** — `src/components/animations/__tests__/RevealOnScroll.test.tsx`

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RevealOnScroll from '../RevealOnScroll';

describe('RevealOnScroll', () => {
  it('renders its children', () => {
    render(<RevealOnScroll><p>hello world</p></RevealOnScroll>);
    expect(screen.getByText('hello world')).toBeInTheDocument();
  });
});
```

Note: this test needs jsdom matchers. Confirm `src/test/setup.ts` imports `@testing-library/jest-dom` and is referenced by `vitest.config.ts` `test.setupFiles`. If it is NOT (Plan 1 left jest-dom unwired), do this minimal wiring first:
- Create `src/test/setup.ts` containing `import '@testing-library/jest-dom';`
- In `vitest.config.ts`, add `setupFiles: ['./src/test/setup.ts']` inside the `test` block.
Report if you had to add this.

- [ ] **Step 2: Run it — expect failure**

Run: `npm test -- RevealOnScroll`
Expected: FAIL — cannot resolve `../RevealOnScroll`.

- [ ] **Step 3: Implement `src/components/animations/RevealOnScroll.tsx`**

```tsx
'use client';

import { motion } from 'motion/react';
import { staggerContainer, fadeUpItem } from '@/lib/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  /** When true, children are wrapped individually for a stagger effect. */
  stagger?: boolean;
}

/**
 * Reveals content as it scrolls into view. Honors reduced motion by rendering
 * children statically (no transform/opacity animation).
 */
export default function RevealOnScroll({ children, className, stagger = false }: RevealOnScrollProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={stagger ? staggerContainer : fadeUpItem}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered child for use inside a `stagger` RevealOnScroll container. */
export function RevealItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUpItem}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Run the test — expect pass**

Run: `npm test -- RevealOnScroll`
Expected: PASS.

- [ ] **Step 5: Wrap the homepage sections** in `src/app/page.tsx`

Add the import at the top: `import RevealOnScroll from '@/components/animations/RevealOnScroll';`

Wrap EACH of the three lower `<section>` elements (Selected Work, Writing, Contact CTA) so they reveal on scroll. Example for the Selected Work section — change:
```tsx
      {/* Selected work */}
      <section className="border-t border-hairline py-16">
```
to:
```tsx
      {/* Selected work */}
      <RevealOnScroll>
      <section className="border-t border-hairline py-16">
```
and add the matching `</RevealOnScroll>` after that section's closing `</section>`. Do the same for the Writing and Contact CTA sections. Leave the hero section alone (Task 3 replaces it). Do NOT wrap the work-cards grid items individually yet (Task 5 handles cards).

- [ ] **Step 6: Verify + commit**

Run: `npm test && npm run type-check && npm run lint && npm run build`
Expected: all green; `/` still Static with 1h revalidate.
```bash
git add -A && git commit -m "feat: RevealOnScroll wrapper + homepage scroll reveals"
```

---

### Task 3: Canvas particle hero (with status line + reduced-motion fallback)

**Files:**
- Create: `src/components/interactive/ParticleField.tsx`, `src/components/interactive/Hero.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Implement `src/components/interactive/ParticleField.tsx`** (hand-rolled canvas, client)

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * Pointer-reactive particle field rendered on a <canvas>. Lazy by nature:
 * the RAF loop only starts after mount (client), so it never blocks first
 * paint. Renders nothing animated when reduced motion is requested.
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    const pointer = { x: -9999, y: -9999 };
    let particles: Particle[] = [];

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(70, Math.floor((width * height) / 14000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    }

    function step() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // gentle drift
        p.x += p.vx;
        p.y += p.vy;
        // pointer repulsion
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 120 * 120) {
          const dist = Math.sqrt(dist2) || 1;
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }
        // wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        // draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 211, 238, 0.7)';
        ctx.fill();
        // link nearby
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const lx = p.x - q.x;
          const ly = p.y - q.y;
          const ld2 = lx * lx + ly * ly;
          if (ld2 < 110 * 110) {
            const alpha = (1 - Math.sqrt(ld2) / 110) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(step);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    }
    function onPointerLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    resize();
    step();
    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
```

- [ ] **Step 2: Implement `src/components/interactive/Hero.tsx`** (server component: text + status line + canvas + gradient fallback)

```tsx
import ParticleField from './ParticleField';

/**
 * Homepage hero. The static gradient + text render server-side (SSG); the
 * canvas hydrates and animates on the client only. Status line uses
 * build-time metadata from Netlify's COMMIT_REF (falls back to "dev").
 */
export default function Hero() {
  const commit = (process.env.COMMIT_REF || 'dev').slice(0, 7);
  const context = process.env.CONTEXT || 'local';

  return (
    <section className="relative overflow-hidden py-24">
      {/* Static gradient — always visible, also the reduced-motion fallback */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.15), transparent 65%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.12), transparent 65%)' }}
      />
      <ParticleField />

      <div className="relative">
        <p className="font-mono text-sm text-ion">~/cleveland-oh · full-stack developer</p>
        <h1 className="mt-4 font-display text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
          Ray Turk builds fast, headless, animated web.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          WordPress as the engine, Next.js as the face — with the engineering on display.
        </p>
        <p className="mt-6 font-mono text-xs text-faint">
          <span className="text-[#4ade80]">●</span> main@{commit} · next 16 · deploy: {context}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Use the Hero in `src/app/page.tsx`** — replace the entire existing hero `<section>...</section>` block (the one with the comment `{/* Hero — static gradient version; interactive canvas lands in Plan 2 */}`) with:

```tsx
      <Hero />
```
and add the import at the top: `import Hero from '@/components/interactive/Hero';`

- [ ] **Step 4: Manual + automated verify**

Run: `npm run build && npm run type-check && npm run lint && npm test`
Expected: all green; `/` still Static.
Then `npm run dev`, curl the homepage, confirm 200 and the hero `<h1>` text + the `<canvas` element are in the SSR HTML (the canvas tag should be present even though it animates client-side). Kill dev.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: pointer-reactive canvas hero with status line + reduced-motion fallback"
```

---

### Task 4: Magnetic button + apply to CTAs

**Files:**
- Create: `src/components/interactive/MagneticButton.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Implement `src/components/interactive/MagneticButton.tsx`**

```tsx
'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { springSoft } from '@/lib/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const MotionLink = motion.create(Link);

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * A link that magnetically eases toward the pointer and springs back on
 * leave. Falls back to a plain styled Link under reduced motion. Uses
 * motion.create(Link) so internal navigation stays client-side.
 */
export default function MagneticButton({ href, children, className }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, springSoft);
  const sy = useSpring(y, springSoft);

  if (reduced) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  function onMove(e: React.PointerEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    x.set(mx * 0.3);
    y.set(my * 0.3);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <MotionLink
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </MotionLink>
  );
}
```
Note: `motion.create(Link)` is declared at MODULE scope (above the component) so it isn't re-created each render. If TypeScript complains about the `ref` type on `MotionLink`, type it as `HTMLAnchorElement` (Next's `Link` forwards its ref to the underlying `<a>`).

- [ ] **Step 2: Apply to the homepage Contact CTA** in `src/app/page.tsx`

Add import: `import MagneticButton from '@/components/interactive/MagneticButton';`
In the Contact CTA section, replace the existing "Get in touch" `<Link>` with:
```tsx
          <MagneticButton href="/contact" className="inline-block rounded-lg bg-ion px-5 py-2.5 font-semibold text-void hover:opacity-90">
            Get in touch
          </MagneticButton>
```

- [ ] **Step 3: Verify + commit**

Run: `npm test && npm run type-check && npm run lint && npm run build`
Expected: all green.
```bash
git add -A && git commit -m "feat: magnetic CTA button with spring press"
```

---

### Task 5: Tilt/glow card + apply to work cards

**Files:**
- Create: `src/components/interactive/TiltCard.tsx`
- Modify: `src/app/page.tsx`, `src/app/work/page.tsx`

- [ ] **Step 1: Implement `src/components/interactive/TiltCard.tsx`**

```tsx
'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { springSoft } from '@/lib/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const MotionLink = motion.create(Link);

interface TiltCardProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * A link card that tilts toward the pointer in 3D. Reduced motion → a plain
 * Link with the same classes (no transform).
 */
export default function TiltCard({ href, children, className }: TiltCardProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const reduced = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), springSoft);
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), springSoft);

  if (reduced) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  function onMove(e: React.PointerEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <MotionLink
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </MotionLink>
  );
}
```

- [ ] **Step 2: Apply to homepage work cards** in `src/app/page.tsx`

In the Selected Work grid, replace the `<Link ...>` project card with `<TiltCard ...>` (same href + className + children). Add import `import TiltCard from '@/components/interactive/TiltCard';`. The card markup becomes:
```tsx
            <TiltCard
              key={project.slug}
              href={`/work/${project.slug}`}
              className="block rounded-xl border border-hairline bg-panel p-6 transition-colors hover:border-ion/40"
            >
              <p className="font-mono text-xs text-ion">case-study/{project.slug}</p>
              <h3 className="mt-2 font-display text-xl font-semibold">{project.title}</h3>
            </TiltCard>
```
(Add `block` to the className since the motion link is inline by default.)

- [ ] **Step 3: Apply to `/work` index cards** in `src/app/work/page.tsx`

Same swap: replace each project `<Link>` card with `<TiltCard>` (add `block` to className, keep `<h2>`). Add the import.

- [ ] **Step 4: Verify + commit**

Run: `npm test && npm run type-check && npm run lint && npm run build`
Expected: all green; `/` and `/work` still Static/SSG.
```bash
git add -A && git commit -m "feat: pointer-tilt work cards"
```

---

### Task 6: ⌘K command palette

**Files:**
- Create: `src/components/interactive/CommandPalette.tsx`, `src/components/layout/CommandKHint.tsx`
- Modify: `src/app/layout.tsx`, `src/components/layout/Header.tsx`, `package.json`

- [ ] **Step 1: Install cmdk**

```bash
source ~/.nvm/nvm.sh && nvm use 20
npm i cmdk
```

- [ ] **Step 2: Implement `src/components/interactive/CommandPalette.tsx`**

```tsx
'use client';

import { Command } from 'cmdk';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const PAGES = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
  { label: 'Colophon', href: '/colophon' },
  { label: 'Contact', href: '/contact' },
];

const LINKS = [
  { label: 'GitHub', href: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/RayTurk' },
  { label: 'LinkedIn', href: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/raymond-turk-cle' },
];

const EMAIL = 'rturk.me@gmail.com';

/**
 * Global ⌘K / Ctrl-K command palette. Navigates pages, opens socials, and
 * copies the contact email. Mounted once in the root layout.
 */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  function go(href: string) {
    setOpen(false);
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      router.push(href);
    }
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      className="fixed inset-0 z-[100] flex items-start justify-center bg-void/70 p-4 pt-[18vh] backdrop-blur"
    >
      <div className="w-full max-w-lg overflow-hidden rounded-xl border border-hairline bg-panel shadow-2xl">
        <Command.Input
          placeholder="Type a command or search…"
          className="w-full border-b border-hairline bg-transparent px-4 py-3 font-mono text-sm text-signal outline-none placeholder:text-faint"
        />
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center font-mono text-xs text-faint">
            No results.
          </Command.Empty>
          <Command.Group heading="Pages" className="px-1 font-mono text-[10px] uppercase tracking-wider text-faint">
            {PAGES.map((p) => (
              <Command.Item
                key={p.href}
                onSelect={() => go(p.href)}
                className="cursor-pointer rounded-md px-3 py-2 font-sans text-sm text-muted data-[selected=true]:bg-void data-[selected=true]:text-ion"
              >
                {p.label}
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Links" className="mt-2 px-1 font-mono text-[10px] uppercase tracking-wider text-faint">
            {LINKS.map((l) => (
              <Command.Item
                key={l.href}
                onSelect={() => go(l.href)}
                className="cursor-pointer rounded-md px-3 py-2 font-sans text-sm text-muted data-[selected=true]:bg-void data-[selected=true]:text-ion"
              >
                {l.label} ↗
              </Command.Item>
            ))}
            <Command.Item
              onSelect={() => {
                navigator.clipboard?.writeText(EMAIL);
                setOpen(false);
              }}
              className="cursor-pointer rounded-md px-3 py-2 font-sans text-sm text-muted data-[selected=true]:bg-void data-[selected=true]:text-ion"
            >
              Copy email
            </Command.Item>
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
}
```

- [ ] **Step 3: Mount it in `src/app/layout.tsx`** — add import `import CommandPalette from '@/components/interactive/CommandPalette';` and render `<CommandPalette />` just inside `<body>`, before `<Header />`:
```tsx
      <body className="font-sans antialiased">
        <CommandPalette />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
```

- [ ] **Step 4: Create `src/components/layout/CommandKHint.tsx`** (client button; keeps Header a server component)

```tsx
'use client';

/** Small ⌘K affordance in the header that opens the global palette. */
export default function CommandKHint() {
  return (
    <button
      type="button"
      aria-label="Open command palette"
      onClick={() =>
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))
      }
      className="hidden rounded-md border border-hairline px-2 py-1 font-mono text-xs text-faint transition-colors hover:text-ion sm:inline-block"
    >
      ⌘K
    </button>
  );
}
```

- [ ] **Step 5: Render the hint in `src/components/layout/Header.tsx`** — add `import CommandKHint from './CommandKHint';` and place `<CommandKHint />` inside the `<nav>`, after the contact `<Link>`. Header stays a server component.

- [ ] **Step 6: Verify**

Run: `npm test && npm run type-check && npm run lint && npm run build`
Expected: all green.
Then `npm run dev`; in a browser press ⌘K (or Ctrl+K) → palette opens; arrow keys + enter navigate; Escape closes; the header ⌘K button also opens it. (If you cannot drive a browser, confirm the build/type-check pass and the header ⌘K button appears in SSR HTML via curl — the dialog is closed by default so it won't be in the HTML.) Kill dev.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: ⌘K command palette (pages, links, copy email) + header trigger"
```

---

### Task 7: Shiki code highlighting + auto TOC for posts

**Files:**
- Create: `src/lib/highlighter.ts`, `src/lib/content.ts`, `src/lib/__tests__/content.test.ts`, `src/components/blog/TableOfContents.tsx`
- Modify: `src/app/writing/[slug]/page.tsx`, `package.json`

- [ ] **Step 1: Install shiki + html parser**

```bash
source ~/.nvm/nvm.sh && nvm use 20
npm i shiki node-html-parser
```

- [ ] **Step 2: Implement `src/lib/highlighter.ts`** (singleton, limited language set for bundle size)

```ts
import { createHighlighter, type Highlighter } from 'shiki';

export const SUPPORTED_LANGS = [
  'ts', 'tsx', 'js', 'jsx', 'bash', 'shell', 'json', 'php', 'html', 'css', 'graphql', 'sql', 'yaml', 'md',
] as const;

export const SHIKI_THEME = 'github-dark-default';

let instance: Promise<Highlighter> | null = null;

/** Lazily-created shared Shiki highlighter (one instance per server process). */
export function getHighlighter(): Promise<Highlighter> {
  if (!instance) {
    instance = createHighlighter({
      themes: [SHIKI_THEME],
      langs: [...SUPPORTED_LANGS],
    });
  }
  return instance;
}
```

- [ ] **Step 3: Write the failing test** — `src/lib/__tests__/content.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { slugify, processPostContent } from '../content';

describe('slugify', () => {
  it('lowercases and hyphenates', () => {
    expect(slugify('Hello, World! Part 2')).toBe('hello-world-part-2');
  });
});

describe('processPostContent', () => {
  it('adds ids to headings and returns a TOC', async () => {
    const { html, toc } = await processPostContent('<h2>First Section</h2><p>text</p><h3>Sub</h3>');
    expect(toc).toEqual([
      { id: 'first-section', text: 'First Section', level: 2 },
      { id: 'sub', text: 'Sub', level: 3 },
    ]);
    expect(html).toContain('id="first-section"');
  });

  it('highlights fenced code blocks with shiki', async () => {
    const input = '<pre><code class="language-ts">const x = 1;</code></pre>';
    const { html } = await processPostContent(input);
    expect(html).toContain('class="shiki');
    expect(html).not.toContain('language-ts">const x = 1;</code>');
  });

  it('leaves plain paragraphs untouched', async () => {
    const { html, toc } = await processPostContent('<p>just text</p>');
    expect(html).toContain('just text');
    expect(toc).toEqual([]);
  });
});
```

- [ ] **Step 4: Run it — expect failure**

Run: `npm test -- content`
Expected: FAIL — cannot resolve `../content`.

- [ ] **Step 5: Implement `src/lib/content.ts`**

```ts
import { parse, HTMLElement } from 'node-html-parser';
import { getHighlighter, SHIKI_THEME, SUPPORTED_LANGS } from './highlighter';

export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

const SUPPORTED = new Set<string>(SUPPORTED_LANGS);

/** URL-safe slug from heading text. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Processes WordPress post HTML for the front-end:
 *  - assigns slug ids to h2/h3 and returns a table of contents
 *  - re-highlights <pre><code class="language-x"> blocks with Shiki
 * Server-only (Shiki + DOM parse happen at build/ISR time).
 */
export async function processPostContent(
  html: string
): Promise<{ html: string; toc: TocEntry[] }> {
  const root = parse(html, { comment: false });
  const toc: TocEntry[] = [];

  for (const el of root.querySelectorAll('h2, h3')) {
    const text = el.text.trim();
    if (!text) continue;
    const id = slugify(text);
    el.setAttribute('id', id);
    toc.push({ id, text, level: el.rawTagName.toLowerCase() === 'h2' ? 2 : 3 });
  }

  const highlighter = await getHighlighter();
  for (const pre of root.querySelectorAll('pre')) {
    const code = pre.querySelector('code');
    if (!code) continue;
    const langMatch = (code.getAttribute('class') || '').match(/language-([\w-]+)/);
    const lang = langMatch && SUPPORTED.has(langMatch[1]) ? langMatch[1] : 'text';
    const source = decodeEntities(code.text);
    const highlighted = highlighter.codeToHtml(source, { lang, theme: SHIKI_THEME });
    const replacement = parse(highlighted) as unknown as HTMLElement;
    pre.replaceWith(replacement);
  }

  return { html: root.toString(), toc };
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'");
}
```

Note: `lang: 'text'` is always valid in Shiki (built-in plaintext grammar). The SUPPORTED guard ensures only loaded languages are requested, so `codeToHtml` won't throw on an unknown grammar.

- [ ] **Step 6: Run the test — expect pass**

Run: `npm test -- content`
Expected: PASS (all cases).

- [ ] **Step 7: Implement `src/components/blog/TableOfContents.tsx`**

```tsx
import type { TocEntry } from '@/lib/content';

/** Sticky table of contents rendered beside a post. */
export default function TableOfContents({ toc }: { toc: TocEntry[] }) {
  if (toc.length === 0) return null;
  return (
    <nav aria-label="Table of contents" className="font-mono text-xs">
      <p className="mb-3 uppercase tracking-wider text-faint">On this page</p>
      <ul className="space-y-2">
        {toc.map((entry) => (
          <li key={entry.id} className={entry.level === 3 ? 'pl-3' : ''}>
            <a href={`#${entry.id}`} className="text-muted transition-colors hover:text-ion">
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

- [ ] **Step 8: Wire into `src/app/writing/[slug]/page.tsx`** — replace the whole file with:

```tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPostBySlug, getAllPostSlugs } from '@/lib/api';
import { processPostContent } from '@/lib/content';
import TableOfContents from '@/components/blog/TableOfContents';

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

  const { html, toc } = await processPostContent(post.content ?? '');

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
        <article className="min-w-0 max-w-3xl">
          <p className="font-mono text-xs text-faint">
            {post.date ? new Date(post.date).toISOString().slice(0, 10) : ''}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold">{post.title}</h1>
          <div
            className="prose prose-invert mt-10 max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
        <aside className="mt-12 hidden lg:sticky lg:top-24 lg:mt-0 lg:block lg:self-start">
          <TableOfContents toc={toc} />
        </aside>
      </div>
    </div>
  );
}
```

- [ ] **Step 9: Verify**

Run: `npm test && npm run type-check && npm run lint && npm run build`
Expected: all green; `/writing/[slug]` still SSG (now runs Shiki at build — build may be slightly slower). Confirm a post page builds without error.

- [ ] **Step 10: Commit**

```bash
git add -A && git commit -m "feat: server-side Shiki highlighting + auto table of contents for posts"
```

---

### Task 8: "Under the Hood" animated pipeline on the homepage

**Files:**
- Create: `src/components/home/Pipeline.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Implement `src/components/home/Pipeline.tsx`**

```tsx
'use client';

import { motion } from 'motion/react';
import { staggerContainer, fadeUpItem } from '@/lib/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const STAGES = [
  { name: 'WordPress', detail: 'cms.rturk.me' },
  { name: 'WPGraphQL', detail: 'typed queries' },
  { name: 'Next.js 16', detail: 'RSC · ISR' },
  { name: 'Netlify', detail: 'you are here' },
];

/**
 * "Under the Hood" — the headless data pipeline as a staggered diagram that
 * draws itself in on scroll. Doubles as the architecture pitch.
 */
export default function Pipeline() {
  const reduced = useReducedMotion();

  const stages = STAGES.map((stage, i) => (
    <div key={stage.name} className="flex items-center gap-3">
      <motion.div
        variants={reduced ? undefined : fadeUpItem}
        className="rounded-lg border border-hairline bg-panel px-4 py-3"
      >
        <p className="font-display text-sm font-semibold text-signal">{stage.name}</p>
        <p className="font-mono text-[10px] text-faint">{stage.detail}</p>
      </motion.div>
      {i < STAGES.length - 1 && (
        <span aria-hidden className="font-mono text-ion">
          →
        </span>
      )}
    </div>
  ));

  return (
    <section className="border-t border-hairline py-16">
      <h2 className="font-mono text-xs uppercase tracking-[0.15em] text-faint">02 — Under the Hood</h2>
      {reduced ? (
        <div className="mt-6 flex flex-wrap items-center gap-3">{stages}</div>
      ) : (
        <motion.div
          className="mt-6 flex flex-wrap items-center gap-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {stages}
        </motion.div>
      )}
      <p className="mt-6 max-w-xl text-sm text-muted">
        WordPress stays the editing experience Ray knows; everything a visitor
        touches is a statically-generated, incrementally-revalidated Next.js app.
        <a href="/colophon" className="ml-1 text-ion hover:underline">
          How this site is built →
        </a>
      </p>
    </section>
  );
}
```

- [ ] **Step 2: Insert into `src/app/page.tsx`** — add `import Pipeline from '@/components/home/Pipeline';`. Place `<Pipeline />` between the Selected Work section and the Writing section. Renumber the section eyebrows so they read in order: Selected Work = `01`, Under the Hood = `02` (already set in the component), Writing = `03`, Contact stays unnumbered. Update the Writing section's `<h2>` eyebrow from `02 — Writing` to `03 — Writing`.

- [ ] **Step 3: Verify + commit**

Run: `npm test && npm run type-check && npm run lint && npm run build`
Expected: all green; `/` still Static.
```bash
git add -A && git commit -m "feat: animated Under-the-Hood pipeline diagram on homepage"
```

---

### Task 9: View Transitions (progressive enhancement)

**Files:**
- Modify: `next.config.ts`, `src/app/globals.css`

- [ ] **Step 1: Add cross-fade view-transition CSS** to `src/app/globals.css` (append at the end)

```css
@view-transition {
  navigation: auto;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 220ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
```
(The reduced-motion guard added in Task 1 already disables `::view-transition-*` animations.)

- [ ] **Step 2: Try enabling the experimental Next flag** in `next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
```

- [ ] **Step 3: Verify the flag is accepted**

Run: `npm run build`
**If Next 16 rejects `experimental.viewTransition`** (unknown-key error/warning), REMOVE the `experimental` block and keep ONLY the `@view-transition` CSS from Step 1 (which works for native cross-document view transitions and is harmless where unsupported). Report which path you took.
Then `npm run type-check && npm run lint && npm test` — all green.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: progressive View Transitions for navigation"
```

---

### Task 10: Real About + Colophon copy

**Files:**
- Modify: `src/app/about/page.tsx`, `src/app/colophon/page.tsx`

- [ ] **Step 1: Rewrite `src/app/about/page.tsx`** with real copy (keep the Ion structure)

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Ray Turk — full-stack web developer in Cleveland, Ohio. Headless WordPress, Next.js, and the occasional shader.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl font-semibold">About</h1>
      <div className="prose prose-invert mt-10">
        <p>
          I&apos;m Ray Turk, a full-stack web developer based in Cleveland, Ohio. I build
          for the web at <a href="https://neongoldfish.com">Neon Goldfish</a>, a Cleveland
          marketing agency, where most of my days are spent in WordPress — custom themes,
          ACF-driven page builders, and the occasional rescue of a site that has seen
          better days.
        </p>
        <p>
          Outside the agency I run <a href="https://codetheland.com">Code The Land</a>, my
          freelance brand, and I keep this site as a place to push past client constraints:
          headless architectures, real-time interfaces, motion, and whatever the platform
          shipped this month. If client work is about reliability, this is where I get to
          be curious.
        </p>
        <h2>What I work with</h2>
        <p>
          Next.js · React · TypeScript · WordPress · WPGraphQL · PHP · Laravel · Tailwind ·
          MySQL. I care about performance budgets, accessible motion, and code that the next
          developer can actually read.
        </p>
        <h2>Beyond the editor</h2>
        <p>
          I&apos;m happiest when a gnarly integration finally clicks — a headless build that
          loads instantly, a CMS that non-technical editors genuinely enjoy, a deploy
          pipeline that just works. If you want to talk shop or have something to build,
          the <a href="/contact">contact page</a> is the fastest way to reach me.
        </p>
      </div>
    </div>
  );
}
```
Note: the external URLs (neongoldfish.com, codetheland.com) match the known brands in CLAUDE.md. Use them as written and flag in your report for Ray to confirm — do NOT leave TODO placeholders in the code.

- [ ] **Step 2: Rewrite `src/app/colophon/page.tsx`** with the accurate, detailed build story

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Colophon',
  description: 'How rturk.me is designed, built, and deployed.',
};

export default function ColophonPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl font-semibold">Colophon</h1>
      <div className="prose prose-invert mt-10">
        <p>
          This site is a headless build. WordPress at <code>cms.rturk.me</code> is the
          editing surface; its content is served over WPGraphQL to a Next.js front end that
          statically generates every page and revalidates it on a schedule (and on demand,
          via a webhook fired when content is saved). Visitors never touch WordPress — they
          get pre-rendered HTML from Netlify&apos;s edge.
        </p>

        <h2>Stack</h2>
        <ul>
          <li><strong>Framework:</strong> Next.js 16 (App Router, React Server Components, ISR)</li>
          <li><strong>UI:</strong> React 19 · TypeScript · Tailwind CSS v4</li>
          <li><strong>Data:</strong> Headless WordPress · WPGraphQL · a small typed fetch client (no Apollo)</li>
          <li><strong>Motion:</strong> a hand-rolled canvas hero · the Motion library for micro-interactions · the View Transitions API</li>
          <li><strong>Content:</strong> Shiki for server-side syntax highlighting · automatic tables of contents</li>
          <li><strong>Hosting:</strong> Netlify, with edge functions for ISR and image optimization</li>
        </ul>

        <h2>Type</h2>
        <p>
          Headlines are set in <strong>Clash Display</strong>, body copy in{' '}
          <strong>Archivo</strong>, and code and labels in <strong>JetBrains Mono</strong> —
          all self-hosted, no third-party font requests.
        </p>

        <h2>Design</h2>
        <p>
          The palette — codenamed &ldquo;Ion&rdquo; — is a near-black, blue-tinted canvas with a
          single cyan accent. Everything you can interact with respects{' '}
          <code>prefers-reduced-motion</code>: the canvas, the card tilts, and the page
          transitions all quiet down when you ask them to.
        </p>

        <h2>Source</h2>
        <p>
          The repository is public on{' '}
          <a href="https://github.com/RayTurk/rturk-me">GitHub</a> — the build is meant to be
          read, not just used.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify + commit**

Run: `npm run type-check && npm run lint && npm run build && npm test`
Expected: all green; `/about` and `/colophon` still Static.
```bash
git add -A && git commit -m "content: real About + Colophon copy"
```

---

### Task 11: Final verification + performance sanity pass

**Files:** `README.md`

- [ ] **Step 1: Full green suite**

```bash
source ~/.nvm/nvm.sh && nvm use 20
npm test && npm run type-check && npm run lint && npm run build
```
Expected: all green. Capture the route table. Confirm these are still **Static (○) or SSG (●)** — NOT Dynamic (ƒ): `/`, `/work`, `/work/[slug]`, `/writing`, `/writing/[slug]`, `/about`, `/colophon`, `/contact`, `/privacy`, `/terms`. (`/api/revalidate` remains ƒ.) If any content route flipped to ƒ, a client component or non-cached fetch leaked into a server boundary — investigate before proceeding (the canvas/palette/tilt are all `'use client'` leaves and must NOT make their parent pages dynamic).

- [ ] **Step 2: Client-bundle sanity check**

From the `npm run build` output, read the First Load JS for `/`. Target < 200 kB. `motion` + `cmdk` add weight; if `/` First Load JS is > 250 kB, note it as a concern (Plan 3 can code-split the palette behind first interaction). Report the actual number.

- [ ] **Step 3: Manual interaction check (if a browser is drivable)**

`npm run dev`, then verify: hero canvas animates and reacts to the cursor; with OS "reduce motion" on, the canvas is static and cards don't tilt; ⌘K opens the palette and navigates; a blog post shows highlighted code + a TOC; navigating between pages cross-fades (in a supporting browser). Kill dev. If no browser is available, say so and rely on build + unit tests.

- [ ] **Step 4: Update the README** — replace the Stack bullet list in `README.md` with:

```markdown
## Stack

- Next.js 16 · React 19 · TypeScript · Tailwind v4
- Typed data layer: fetch-based GraphQL client (GraphQL Codegen wired, pending CMS introspection)
- Motion: hand-rolled canvas hero · Motion library micro-interactions · View Transitions
- Content: Shiki syntax highlighting · automatic tables of contents · ⌘K command palette
- Vitest + Testing Library
- Type: Clash Display · Archivo · JetBrains Mono (self-hosted)
```

- [ ] **Step 5: Commit + push**

```bash
git add -A && git commit -m "docs: README reflects Plan 2 experience layer"
git push
```

---

## Plan 2 Handoff → Plan 2b / Plan 3

- **Plan 2b (CMS-gated):** once WPGraphQL-for-ACF + introspection are enabled, build the case-study deep-dive template (overview/context/architecture diagram/decisions/code snippets/metrics) and run codegen to replace `fetchGraphQL<any>`.
- **Plan 3 (Launch):** JSON-LD (Person/WebSite/Article/CreativeWork), `sitemap.ts` + `robots.ts`, RSS for `/writing`, `next/og` per-route images, GTM + cookie consent, Playwright smoke + Lighthouse CI in GitHub Actions, Netlify site provisioning, env vars, WP webhook path reconfig, domain cutover.
- **Perf watch:** if the homepage First Load JS is heavy, code-split `CommandPalette` (dynamic import on first ⌘K/keydown) and confirm the canvas stays off the critical path.
