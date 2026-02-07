# Ray Turk Portfolio - Component Library

## Project Overview

A comprehensive, production-ready React component library for Ray Turk's portfolio site. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

**Location:** `/src/components/`

## What's Included

### 18 Total Components

#### Layout Components (5)
- **Header** - Sticky navigation with mobile menu
- **Footer** - Multi-column footer with CTA
- **Navigation** - Mobile navigation overlay
- **Container** - Max-width wrapper
- **Section** - Section wrapper with animations

#### UI Components (13)
- **Button** - 5 variants, multiple sizes
- **Card** - Flexible card with hover effects
- **Badge** - Tags and labels
- **GradientText** - Inline gradient text
- **AnimatedText** - Staggered text animations
- **ScrollReveal** - Scroll-triggered animations
- **LoadingSpinner** - Animated loader
- **BentoGrid/BentoItem** - Responsive grid system
- **TechStack** - Tech badge display
- **ProjectIframe** - Interactive project showcase
- **Testimonial** - Quote cards with ratings
- **ContactForm** - Full contact form
- **Breadcrumbs** - SEO breadcrumbs

## Quick Start

### 1. Installation
```bash
npm install framer-motion lucide-react
```

### 2. Create Utility
Create `/src/lib/utils.ts`:
```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 3. Update Tailwind Config
Add color system to `tailwind.config.js`

### 4. Start Building
```tsx
import { Header, Section, Button } from '@/components';

export default function Home() {
  return (
    <>
      <Header />
      <Section heading="Welcome">Your content</Section>
    </>
  );
}
```

## Documentation Files

1. **QUICK_START.md** - Quick reference guide
2. **COMPONENT_GUIDE.md** - Comprehensive documentation
3. **COMPONENT_EXAMPLES.md** - Real-world usage examples
4. **CREATED_COMPONENTS_SUMMARY.md** - What was created

## File Structure

```
src/components/
├── layout/
│   ├── Header.tsx              (226 lines)
│   ├── Footer.tsx              (156 lines)
│   ├── Navigation.tsx           (119 lines)
│   ├── Container.tsx            (24 lines)
│   └── Section.tsx              (89 lines)
├── ui/
│   ├── Button.tsx               (95 lines)
│   ├── Card.tsx                 (72 lines)
│   ├── Badge.tsx                (80 lines)
│   ├── GradientText.tsx          (27 lines)
│   ├── AnimatedText.tsx          (62 lines)
│   ├── ScrollReveal.tsx          (69 lines)
│   ├── LoadingSpinner.tsx        (42 lines)
│   ├── BentoGrid.tsx             (90 lines)
│   ├── TechStack.tsx             (88 lines)
│   ├── ProjectIframe.tsx        (229 lines)
│   ├── Testimonial.tsx          (155 lines)
│   ├── ContactForm.tsx          (276 lines)
│   └── Breadcrumbs.tsx          (125 lines)
└── index.ts                     (25 lines)

Documentation:
├── QUICK_START.md               (Quick reference)
├── COMPONENT_GUIDE.md           (Comprehensive)
├── COMPONENT_EXAMPLES.md        (Real examples)
└── CREATED_COMPONENTS_SUMMARY.md (Overview)
```

## Design System

### Colors
```
Primary Indigo:
- brand-500: #6366f1
- brand-400: #818cf8

Accent Emerald:
- accent-500: #10b981
- accent-400: #34d399

Surfaces (8 levels):
- surface-100 to surface-950
```

### Dark Theme
✅ All components dark-first
✅ Smooth gradients
✅ Glass-morphism effects
✅ Glow effects
✅ Animated borders

## Features

### Animation
- ✅ Framer Motion throughout
- ✅ Scroll reveals
- ✅ Entrance animations
- ✅ Hover effects
- ✅ Loading states

### Responsive
- ✅ Mobile-first design
- ✅ Touch-friendly
- ✅ Hamburger menu
- ✅ Responsive grids
- ✅ All breakpoints

### Accessibility
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard nav
- ✅ Focus states
- ✅ Schema.org markup

### Performance
- ✅ Optimized animations
- ✅ Lazy loading
- ✅ Minimal re-renders
- ✅ CSS Grid native
- ✅ Small bundle

### Type Safety
- ✅ 100% TypeScript
- ✅ Full interfaces
- ✅ Generic support
- ✅ IDE autocomplete

## Component Stats

- **Total Lines**: 2,300+ (components)
- **Documentation**: 750+ lines
- **TypeScript**: 100%
- **Production Ready**: Yes
- **Tests**: Ready for implementation
- **Accessibility**: WCAG 2.1

## Key Files to Read

1. Start with: **QUICK_START.md**
2. Then: **COMPONENT_EXAMPLES.md**
3. Reference: **COMPONENT_GUIDE.md**
4. Details: **CREATED_COMPONENTS_SUMMARY.md**

## Common Patterns

### Section with Grid
```tsx
<Section heading="Title | Gradient">
  <BentoGrid>
    <BentoItem variant="glass">Content</BentoItem>
  </BentoGrid>
</Section>
```

### Contact Form
```tsx
<Section heading="Contact">
  <Container size="md">
    <ContactForm />
  </Container>
</Section>
```

### Project Showcase
```tsx
<ProjectIframe
  embedUrl="https://project.com"
  title="Project Name"
/>
```

## Next Steps

1. ✅ Copy components to your project
2. ✅ Set up Tailwind colors
3. ✅ Create main layout
4. ✅ Build sections
5. ✅ Customize branding
6. ✅ Deploy!

## Support

- See COMPONENT_GUIDE.md for detailed docs
- See COMPONENT_EXAMPLES.md for examples
- Each component has JSDoc comments
- Full TypeScript interfaces included

## Tech Stack

- Next.js 14 (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

## Created For

**Ray Turk** - Cleveland-based Full Stack & WordPress Developer

Modern, sleek, dark-themed portfolio components ready for production.

---

**Last Updated:** 2024
**Version:** 1.0.0
**Status:** Production Ready ✅

