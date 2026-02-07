# Portfolio Component Library Guide

A comprehensive guide to using the Ray Turk portfolio site component library.

## Installation & Setup

### Prerequisites
- Next.js 14 (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

### Installation

```bash
npm install framer-motion lucide-react
```

### Utility Function
Ensure you have `@/lib/utils` with the `cn` function (shadcn/ui style class merging):

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## Layout Components

### Header Component
Sticky navigation header with mobile menu support and scroll detection.

**Location:** `src/components/layout/Header.tsx`

**Features:**
- Sticky positioning with blur backdrop on scroll
- Responsive navigation with mobile hamburger menu
- Gradient logo animation
- Active link indicator
- CTA button with glow effect

**Usage:**

```tsx
import { Header } from '@/components';

export default function Layout() {
  return (
    <>
      <Header />
      {/* Page content */}
    </>
  );
}
```

**Customization:**
- Edit `navItems` array to modify navigation links
- Modify logo text in the gradient span
- Update social links in Navigation component

---

### Footer Component
Multi-column footer with CTA section, social links, and copyright.

**Location:** `src/components/layout/Footer.tsx`

**Features:**
- Large CTA section at top
- 4-column grid layout (responsive)
- Social media links
- "Back to top" smooth scroll button
- Animated year in copyright

**Usage:**

```tsx
import { Footer } from '@/components';

export default function Layout() {
  return (
    <>
      {/* Page content */}
      <Footer />
    </>
  );
}
```

**Customization:**
- Edit `footerColumns` array to add/remove footer sections
- Modify social links in `socialLinks` array
- Update CTA text and button destination

---

### Navigation Component
Full-screen mobile navigation overlay with staggered animations.

**Location:** `src/components/layout/Navigation.tsx`

**Props:**
```typescript
interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**Usage:**

```tsx
import { Navigation } from '@/components';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Navigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
```

---

### Container Component
Reusable max-width container with responsive padding.

**Location:** `src/components/layout/Container.tsx`

**Props:**
```typescript
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}
```

**Size Mappings:**
- `sm`: max-w-2xl (640px)
- `md`: max-w-3xl (768px)
- `lg`: max-w-5xl (1024px)
- `xl`: max-w-7xl (1280px)
- `full`: max-w-none (100%)

**Usage:**

```tsx
import { Container } from '@/components';

export default function Page() {
  return (
    <Container size="xl">
      <h1>Page content centered</h1>
    </Container>
  );
}
```

---

### Section Component
Wrapper with built-in scroll animation, heading support, and background patterns.

**Location:** `src/components/layout/Section.tsx`

**Props:**
```typescript
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  heading?: string;
  subheading?: string;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'none' | 'dots' | 'gradient';
  container?: boolean;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  animate?: boolean;
}
```

**Usage:**

```tsx
import { Section } from '@/components';

export default function Home() {
  return (
    <Section
      id="projects"
      heading="Featured | Projects"
      subheading="Showcase of recent work"
      padding="lg"
      background="dots"
    >
      {/* Section content */}
    </Section>
  );
}
```

**Heading Format:**
Use `|` to create gradient text on second part:
```tsx
heading="Featured | Projects"
// Renders: "Featured" (normal) + "Projects" (gradient)
```

---

## UI Components

### Button Component
Versatile button with multiple variants, sizes, and states.

**Location:** `src/components/ui/Button.tsx`

**Props:**
```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}
```

**Variants:**
- `primary`: Gradient indigo button (default)
- `secondary`: Outlined with border
- `accent`: Gradient emerald button
- `ghost`: Subtle background
- `link`: Underline text link

**Usage:**

```tsx
import { Button } from '@/components';
import { Send } from 'lucide-react';

export default function Demo() {
  return (
    <>
      <Button variant="primary" size="md">
        Click Me
      </Button>

      <Button
        href="/contact"
        variant="accent"
        icon={<Send />}
        iconPosition="right"
      >
        Get Started
      </Button>

      <Button
        variant="secondary"
        onClick={() => console.log('Clicked')}
      >
        Secondary
      </Button>

      <Button variant="ghost" disabled>
        Disabled
      </Button>
    </>
  );
}
```

---

### Card Component
Base card component for content containers with hover effects.

**Location:** `src/components/ui/Card.tsx`

**Props:**
```typescript
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'gradient' | 'bordered' | 'accent';
  hoverEffect?: 'lift' | 'glow' | 'tilt' | 'none';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}
```

**Variants:**
- `default`: Simple dark background
- `glass`: Glassmorphism effect
- `gradient`: Gradient border with glow
- `bordered`: Emerald accent border
- `accent`: Green tinted background

**Hover Effects:**
- `lift`: Elevates the card slightly
- `glow`: Adds shadow glow
- `tilt`: 3D perspective tilt
- `none`: No hover animation

**Usage:**

```tsx
import { Card } from '@/components';

export default function Demo() {
  return (
    <Card
      variant="glass"
      hoverEffect="lift"
      header={<h3>Card Title</h3>}
      footer={<p>Footer content</p>}
    >
      <p>Main card content goes here</p>
    </Card>
  );
}
```

---

### GradientText Component
Inline gradient text with optional animation.

**Location:** `src/components/ui/GradientText.tsx`

**Props:**
```typescript
interface GradientTextProps {
  children: React.ReactNode;
  animated?: boolean;
  className?: string;
}
```

**Usage:**

```tsx
import { GradientText } from '@/components';

export default function Demo() {
  return (
    <h1>
      Build something <GradientText animated>amazing</GradientText>
    </h1>
  );
}
```

---

### AnimatedText Component
Text with staggered reveal animation, word/character split.

**Location:** `src/components/ui/AnimatedText.tsx`

**Props:**
```typescript
interface AnimatedTextProps {
  children: string | number;
  className?: string;
  splitMode?: 'words' | 'characters';
  animationType?: 'fadeUp' | 'fadeIn' | 'typing';
  staggerDelay?: number;
  duration?: number;
  delay?: number;
  gradient?: boolean;
}
```

**Usage:**

```tsx
import { AnimatedText } from '@/components';

export default function Demo() {
  return (
    <AnimatedText
      splitMode="words"
      animationType="fadeUp"
      staggerDelay={0.08}
      gradient
    >
      Welcome to my portfolio
    </AnimatedText>
  );
}
```

---

### ScrollReveal Component
Scroll-triggered entrance animation wrapper.

**Location:** `src/components/ui/ScrollReveal.tsx`

**Props:**
```typescript
interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}
```

**Usage:**

```tsx
import { ScrollReveal } from '@/components';

export default function Demo() {
  return (
    <ScrollReveal direction="up" delay={0.2}>
      <p>This animates when scrolled into view</p>
    </ScrollReveal>
  );
}
```

---

### BentoGrid & BentoItem Components
CSS Grid-based Bento layout system with responsive columns and hover effects.

**Location:** `src/components/ui/BentoGrid.tsx`

**Props:**
```typescript
interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: 2 | 3 | 4;
}

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2 | 3;
  variant?: 'default' | 'glass' | 'gradient' | 'accent' | 'dark';
  hoverEffect?: 'lift' | 'glow' | 'tilt' | 'none';
  delay?: number;
}
```

**Responsive Behavior:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: Full specified columns (default 4)

**Usage:**

```tsx
import { BentoGrid, BentoItem } from '@/components';

export default function ProjectGrid() {
  return (
    <BentoGrid columns={4}>
      <BentoItem colSpan={2} variant="glass" hoverEffect="lift">
        <h3>Featured Project</h3>
      </BentoItem>

      <BentoItem variant="gradient">
        <p>Project card</p>
      </BentoItem>

      <BentoItem rowSpan={2} variant="accent">
        <p>Tall card</p>
      </BentoItem>
    </BentoGrid>
  );
}
```

---

### Badge Component
Tag component for tech stacks, categories, and labels.

**Location:** `src/components/ui/Badge.tsx`

**Props:**
```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'brand' | 'accent' | 'outline';
  size?: 'sm' | 'md';
  dotIndicator?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}
```

**Usage:**

```tsx
import { Badge } from '@/components';

export default function Demo() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Next.js']);

  return (
    <div className="flex gap-2">
      {tags.map(tag => (
        <Badge
          key={tag}
          variant="brand"
          dotIndicator
          dismissible
          onDismiss={() => setTags(tags.filter(t => t !== tag))}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
```

---

### TechStack Component
Specialized component for displaying project technology stacks.

**Location:** `src/components/ui/TechStack.tsx`

**Props:**
```typescript
interface TechItem {
  name: string;
  description?: string;
  color?: string;
}

interface TechStackProps {
  technologies: TechItem[];
  className?: string;
  displayLimit?: number;
  layout?: 'row' | 'wrap';
}
```

**Usage:**

```tsx
import { TechStack } from '@/components';

export default function ProjectCard() {
  const techs = [
    { name: 'React', description: 'UI Library' },
    { name: 'TypeScript', description: 'Type Safety' },
    { name: 'Tailwind CSS', description: 'Styling' },
    { name: 'Next.js', description: 'Framework' },
  ];

  return (
    <TechStack
      technologies={techs}
      displayLimit={3}
      layout="wrap"
    />
  );
}
```

---

### ProjectIframe Component
Interactive project showcase with device frame mockup and fallbacks.

**Location:** `src/components/ui/ProjectIframe.tsx`

**Props:**
```typescript
interface ProjectIframeProps {
  embedUrl?: string;
  fallbackGif?: string;
  fallbackImage?: WPImage;
  title: string;
  brandColor?: string;
  className?: string;
}

interface WPImage {
  src: string;
  alt: string;
}
```

**Features:**
- Device frame mockup (laptop/desktop)
- Interactive mode toggle (ESC to exit)
- Automatic fallback to GIF or image
- Loading skeleton
- "View Full Site" CTA button
- 3D hover perspective tilt

**Usage:**

```tsx
import { ProjectIframe } from '@/components';

export default function ProjectShowcase() {
  return (
    <ProjectIframe
      embedUrl="https://example-project.com"
      fallbackImage={{
        src: '/projects/project-screenshot.png',
        alt: 'Project screenshot'
      }}
      title="E-Commerce Platform"
      brandColor="#6366f1"
    />
  );
}
```

---

### Testimonial Component
Testimonial card with expandable quote, rating, and author info.

**Location:** `src/components/ui/Testimonial.tsx`

**Props:**
```typescript
interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating?: number;
  className?: string;
  expandable?: boolean;
}
```

**Usage:**

```tsx
import { Testimonial } from '@/components';

export default function TestimonialSection() {
  return (
    <Testimonial
      quote="Ray delivered an outstanding WordPress site that exceeded all expectations..."
      author="John Doe"
      role="CEO"
      company="TechCorp"
      avatar="/avatars/john.jpg"
      rating={5}
      expandable
    />
  );
}
```

---

### ContactForm Component
Full-featured contact form with validation and honeypot spam protection.

**Location:** `src/components/ui/ContactForm.tsx`

**Features:**
- Name, email, service, budget, and message fields
- Real-time validation with error display
- Honeypot field for spam prevention
- API integration (`/api/contact`)
- Loading, success, and error states
- Animated field focus states

**Usage:**

```tsx
import { ContactForm } from '@/components';

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto">
      <ContactForm />
    </div>
  );
}
```

**Required API Route:**
Create `/app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate and send email
  // Implementation details...

  return NextResponse.json({ success: true });
}
```

---

### Breadcrumbs Component
SEO-friendly breadcrumbs with Schema.org markup.

**Location:** `src/components/ui/Breadcrumbs.tsx`

**Props:**
```typescript
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}
```

**Features:**
- Automatic home link
- Schema.org BreadcrumbList structured data
- Animated separators
- Current page highlight

**Usage:**

```tsx
import { Breadcrumbs } from '@/components';

export default function BlogPost() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Blog', href: '/blog' },
          { label: 'My Amazing Article' }
        ]}
      />
      <article>
        {/* Post content */}
      </article>
    </>
  );
}
```

---

### LoadingSpinner Component
Minimal animated loading spinner.

**Location:** `src/components/ui/LoadingSpinner.tsx`

**Props:**
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'brand' | 'accent';
}
```

**Usage:**

```tsx
import { LoadingSpinner } from '@/components';

export default function Demo() {
  return (
    <div className="flex gap-4">
      <LoadingSpinner size="sm" variant="brand" />
      <LoadingSpinner size="md" variant="accent" />
      <LoadingSpinner size="lg" />
    </div>
  );
}
```

---

## Color System

The portfolio uses a modern dark color system:

### Primary Indigo
- `brand-500`: `#6366f1` (Primary action color)
- `brand-400`: `#818cf8` (Hover state)

### Secondary Emerald
- `accent-500`: `#10b981` (Secondary action/accent)
- `accent-400`: `#34d399` (Hover state)

### Surface Colors
- `surface-900`: `#18181b` (Cards, backgrounds)
- `surface-950`: `#09090b` (Deep backgrounds)
- `surface-800`: `#27272a` (Borders)
- `surface-700`: `#3f3f46` (Hover states)
- `surface-400`: `#a1a1aa` (Secondary text)
- `surface-200`: `#e4e4e7` (Primary text)
- `surface-100`: `#f5f5f5` (Highlighted text)

---

## Animation & Motion

All components use Framer Motion for smooth animations:

- **Entrance Animations**: Staggered, fade-up, scale effects
- **Scroll Triggers**: Components animate when scrolled into view
- **Hover Effects**: Interactive feedback on interactive elements
- **Loading States**: Smooth transitions between states
- **Page Transitions**: Built-in via Framer Motion

---

## Responsive Design

All components are mobile-first and responsive:

### Breakpoints
- Mobile: `< 640px`
- Tablet: `640px - 1024px`
- Desktop: `> 1024px`

### Mobile Menu
- Header automatically shows hamburger menu on mobile
- Navigation overlay slides in from right
- Touch-friendly spacing and sizes

---

## Best Practices

### 1. Import Pattern
```tsx
// Preferred
import { Button, Card, Section } from '@/components';

// Or individual imports
import Button from '@/components/ui/Button';
```

### 2. TypeScript
All components are fully typed with TypeScript interfaces.

### 3. Accessibility
- Semantic HTML (`<button>`, `<nav>`, etc.)
- ARIA labels where needed
- Keyboard navigation support
- Focus states for keyboard users

### 4. Performance
- Components use `'use client'` only where needed
- Lazy loading for iframes and images
- Optimized animations with `will-change`
- No unnecessary re-renders

### 5. SEO
- Semantic HTML structure
- Schema.org markup (Breadcrumbs, etc.)
- Proper heading hierarchy
- Meta tags support

---

## Customization

### Tailwind Configuration
Add to your `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#6366f1',
          400: '#818cf8',
        },
        accent: {
          500: '#10b981',
          400: '#34d399',
        },
        surface: {
          100: '#f5f5f5',
          200: '#e4e4e7',
          400: '#a1a1aa',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
      },
    },
  },
};
```

### Global Styles
Remove scrollbar styling with:

```css
/* Hide scrollbar but keep scrolling */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

---

## Troubleshooting

### Components Not Animating
- Ensure Framer Motion is installed
- Check that components are wrapped in client context (`'use client'`)
- Verify viewport settings for scroll animations

### Styling Issues
- Import `cn` utility from `@/lib/utils`
- Check Tailwind CSS configuration
- Ensure color variables are defined

### Mobile Issues
- Test with device emulation in Chrome DevTools
- Check viewport meta tag in layout
- Verify touch event handlers

---

## File Structure

```
src/components/
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   ├── Container.tsx
│   └── Section.tsx
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── GradientText.tsx
│   ├── AnimatedText.tsx
│   ├── ScrollReveal.tsx
│   ├── LoadingSpinner.tsx
│   ├── BentoGrid.tsx
│   ├── TechStack.tsx
│   ├── ProjectIframe.tsx
│   ├── Testimonial.tsx
│   ├── ContactForm.tsx
│   ├── Breadcrumbs.tsx
│   └── index.ts
└── index.ts
```

---

## Support & Updates

For issues, bugs, or feature requests, refer to the component implementation files for detailed comments and usage examples.

Happy building! 🚀
