# Quick Start Guide - Ray Turk Portfolio Components

## Installation

1. **Install Dependencies**
```bash
npm install framer-motion lucide-react
```

2. **Create Utility Function** at `/src/lib/utils.ts`
```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

3. **Update Tailwind Config** - `tailwind.config.js`
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
        },
        accent: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        surface: {
          100: '#f5f5f5',
          200: '#e4e4e7',
          400: '#a1a1aa',
          500: '#78716c',
          600: '#57534e',
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

## Basic Page Structure

```tsx
import { Header, Footer, Section, Container, Button } from '@/components';

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <Section
        id="hero"
        heading="Welcome | Ray Turk"
        subheading="Full-Stack & WordPress Developer"
        padding="xl"
      >
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-surface-300 mb-8">
            Building beautiful, functional websites for businesses
          </p>
          <Button variant="primary" size="lg" href="#projects">
            See My Work
          </Button>
        </div>
      </Section>

      <Footer />
    </>
  );
}
```

## Common Patterns

### 1. Section with Bento Grid
```tsx
import { Section, BentoGrid, BentoItem, Card } from '@/components';

<Section
  id="services"
  heading="Services | Offered"
  padding="lg"
>
  <BentoGrid columns={3}>
    <BentoItem variant="glass" hoverEffect="lift">
      <h3>Web Development</h3>
      <p>Custom websites and applications</p>
    </BentoItem>
    <BentoItem variant="gradient" colSpan={2} rowSpan={2}>
      <h3>Full-Stack Solutions</h3>
    </BentoItem>
    <BentoItem variant="accent">
      <h3>WordPress</h3>
    </BentoItem>
  </BentoGrid>
</Section>
```

### 2. Contact Form
```tsx
import { Section, ContactForm, Container } from '@/components';

<Section id="contact" heading="Get In | Touch" padding="lg">
  <Container size="md">
    <ContactForm />
  </Container>
</Section>
```

### 3. Project Showcase
```tsx
import { ProjectIframe, TechStack, Button } from '@/components';

<div className="space-y-6">
  <ProjectIframe
    embedUrl="https://project-url.com"
    fallbackImage={{
      src: '/projects/screenshot.png',
      alt: 'Project screenshot'
    }}
    title="Project Name"
  />

  <TechStack
    technologies={[
      { name: 'React', description: 'UI Library' },
      { name: 'TypeScript', description: 'Type Safety' },
      { name: 'Next.js', description: 'Framework' },
    ]}
  />

  <p>Project description here</p>
</div>
```

### 4. Testimonials
```tsx
import { Section, Testimonial } from '@/components';

<Section heading="Testimonials" padding="lg">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <Testimonial
      quote="Ray delivered an amazing website that exceeded expectations..."
      author="John Doe"
      role="CEO"
      company="TechCorp"
      avatar="/avatars/john.jpg"
      rating={5}
    />
    {/* More testimonials */}
  </div>
</Section>
```

## Component Cheat Sheet

### Layout
```tsx
<Header />                                  // Sticky nav
<Footer />                                  // Footer
<Navigation isOpen={true} onClose={() => {}} />  // Mobile menu
<Container size="xl">Content</Container>    // Max-width wrapper
<Section heading="Title" padding="lg">      // Section with animations
```

### Buttons
```tsx
<Button variant="primary">Primary</Button>   // Indigo gradient
<Button variant="accent">Accent</Button>     // Green gradient
<Button variant="secondary">Secondary</Button> // Outlined
<Button variant="ghost">Ghost</Button>       // Subtle
<Button variant="link">Link</Button>         // Text link
```

### Cards & Grids
```tsx
<Card variant="glass">Content</Card>         // Glassmorphism
<BentoGrid columns={4}>                      // Responsive grid
  <BentoItem colSpan={2}>Item</BentoItem>
</BentoGrid>
```

### Text & Animation
```tsx
<GradientText animated>Text</GradientText>   // Gradient text
<AnimatedText splitMode="words">Text</AnimatedText> // Staggered reveal
<ScrollReveal direction="up">Content</ScrollReveal> // Scroll animation
```

### Forms & Interactive
```tsx
<ContactForm />                              // Full contact form
<Badge variant="brand">React</Badge>         // Tech tag
<TechStack technologies={[...]} />           // Tech display
<Testimonial quote="..." author="Name" />    // Quote card
```

## Color Variables

```css
/* Use in Tailwind classes */
bg-brand-500        /* #6366f1 - Primary */
bg-accent-500       /* #10b981 - Accent */
bg-surface-900      /* #18181b - Dark backgrounds */
text-surface-200    /* #e4e4e7 - Light text */
border-surface-800  /* #27272a - Borders */
```

## Common Configurations

### Hero Section
```tsx
<Section
  id="hero"
  padding="xl"
  background="gradient"
>
  {/* Full-screen hero content */}
</Section>
```

### Feature Section
```tsx
<Section
  heading="Features | Included"
  subheading="Everything you need"
  padding="lg"
  background="dots"
>
  {/* Grid of features */}
</Section>
```

### CTA Section
```tsx
<Section padding="lg" className="bg-gradient-to-r from-brand-500/10 to-accent-500/10">
  <div className="text-center max-w-2xl mx-auto">
    <h2>Ready to Get Started?</h2>
    <Button variant="primary" size="lg" href="#contact">
      Contact Me Today
    </Button>
  </div>
</Section>
```

## API Route for Contact Form

Create `/app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, service, budget, message } = await request.json();

    // Validate
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email logic here
    // Example with nodemailer, SendGrid, or any email service

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
```

## Pro Tips

1. **Use Container for consistent widths**
   ```tsx
   <Container size="xl" className="py-16">
     Content stays centered with max-width
   </Container>
   ```

2. **Combine Section + Container**
   ```tsx
   <Section heading="Title">
     <Container>Content</Container>
   </Section>
   ```

3. **Customize colors with className**
   ```tsx
   <Button variant="primary" className="bg-accent-500">
     Custom Color
   </Button>
   ```

4. **Stack animations with delays**
   ```tsx
   <ScrollReveal direction="up" delay={0}>Item 1</ScrollReveal>
   <ScrollReveal direction="up" delay={0.1}>Item 2</ScrollReveal>
   ```

5. **Use BentoItem for spanning items**
   ```tsx
   <BentoItem colSpan={2} rowSpan={2}>
     Larger featured item
   </BentoItem>
   ```

## Responsive Breakpoints

- **Mobile**: < 640px (1 col grids, hamburger menu)
- **Tablet**: 640px - 1024px (2 col grids)
- **Desktop**: > 1024px (full 4 col grids)

## Dark Theme Features

✅ All components are dark-first
✅ Smooth gradients (indigo + emerald)
✅ Subtle glass-morphism effects
✅ Animated borders on hover
✅ Glow effects for primary actions

## Performance Tips

1. Use `Container` to avoid full-width layouts
2. Lazy load `ProjectIframe` with `loading="lazy"`
3. Optimize images before using in `fallbackImage`
4. Use `once={true}` on scroll animations for better performance
5. Limit `displayLimit` on TechStack for fewer badges

## Accessibility

✅ Semantic HTML
✅ ARIA labels
✅ Keyboard navigation
✅ Focus states
✅ Schema.org markup

## Next Steps

1. Copy all components to your project
2. Set up color system in Tailwind
3. Create main layout with Header/Footer
4. Build sections using Section + BentoGrid
5. Customize colors and spacing
6. Deploy and enjoy!

---

For detailed docs, see **COMPONENT_GUIDE.md**
