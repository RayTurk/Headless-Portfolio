# Component Examples & Use Cases

Real-world examples for using each component in Ray Turk's portfolio.

## Layout Components Examples

### Header with Active Navigation
```tsx
// Already handles active state internally
// Just import and use
import { Header } from '@/components';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
```

### Full-Width Section with Background Pattern
```tsx
import { Section, Container, BentoGrid, BentoItem } from '@/components';

export default function Services() {
  return (
    <Section
      id="services"
      heading="My Services | Expertise"
      subheading="What I can help you with"
      padding="xl"
      background="dots"
    >
      <BentoGrid columns={3}>
        <BentoItem variant="glass" hoverEffect="lift">
          <h3 className="text-xl font-bold mb-2">WordPress Development</h3>
          <p className="text-surface-400">
            Custom WordPress themes and plugins optimized for performance
          </p>
        </BentoItem>
        <BentoItem variant="gradient" hoverEffect="glow">
          <h3 className="text-xl font-bold mb-2">Next.js Applications</h3>
          <p className="text-surface-400">
            Modern full-stack web applications with React and Next.js
          </p>
        </BentoItem>
        <BentoItem variant="accent" hoverEffect="tilt">
          <h3 className="text-xl font-bold mb-2">Full-Stack Solutions</h3>
          <p className="text-surface-400">
            End-to-end web solutions from database to frontend
          </p>
        </BentoItem>
      </BentoGrid>
    </Section>
  );
}
```

---

## UI Component Examples

### Button Variants Gallery
```tsx
import { Button } from '@/components';
import { ArrowRight, CheckCircle, Send } from 'lucide-react';

export default function ButtonShowcase() {
  return (
    <div className="space-y-8">
      {/* Primary Buttons */}
      <div className="space-y-3">
        <h3>Primary Buttons</h3>
        <div className="flex gap-3 flex-wrap">
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button
            variant="primary"
            icon={<ArrowRight />}
            iconPosition="right"
          >
            With Icon
          </Button>
          <Button variant="primary" loading>Loading</Button>
        </div>
      </div>

      {/* Accent Buttons */}
      <div className="space-y-3">
        <h3>Accent Buttons</h3>
        <div className="flex gap-3 flex-wrap">
          <Button variant="accent">Get Started</Button>
          <Button variant="accent" icon={<Send />} iconPosition="right">
            Send Message
          </Button>
        </div>
      </div>

      {/* Secondary Buttons */}
      <div className="space-y-3">
        <h3>Secondary Buttons</h3>
        <div className="flex gap-3 flex-wrap">
          <Button variant="secondary">Secondary</Button>
          <Button variant="secondary" icon={<CheckCircle />}>
            Verified
          </Button>
        </div>
      </div>

      {/* Ghost & Link */}
      <div className="space-y-3">
        <h3>Ghost & Link</h3>
        <div className="flex gap-3 flex-wrap">
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="link">Link Button</Button>
        </div>
      </div>
    </div>
  );
}
```

### Card Variants with Different Hover Effects
```tsx
import { Card } from '@/components';

export default function CardShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card variant="default" hoverEffect="lift">
        <h3 className="text-lg font-bold mb-2">Project Name</h3>
        <p className="text-surface-400 mb-4">
          Description of the project and technologies used
        </p>
        <div className="text-sm text-surface-500">2024</div>
      </Card>

      <Card variant="glass" hoverEffect="glow">
        <h3 className="text-lg font-bold mb-2">Featured Project</h3>
        <p className="text-surface-400 mb-4">
          Glassmorphism effect with glow on hover
        </p>
        <div className="text-sm text-surface-500">2024</div>
      </Card>

      <Card variant="gradient" hoverEffect="tilt">
        <h3 className="text-lg font-bold mb-2">Gradient Border</h3>
        <p className="text-surface-400 mb-4">
          Special gradient effect that glows on hover
        </p>
        <div className="text-sm text-surface-500">2024</div>
      </Card>

      <Card
        variant="accent"
        hoverEffect="none"
        header={<h3 className="font-bold">Card with Header</h3>}
        footer={<a href="#" className="text-brand-400 hover:text-brand-300">Learn more →</a>}
      >
        <p className="text-surface-400">
          This card has header and footer sections
        </p>
      </Card>
    </div>
  );
}
```

### Bento Grid with Mixed Sizes
```tsx
import { BentoGrid, BentoItem } from '@/components';

export default function ProjectBento() {
  return (
    <BentoGrid columns={4}>
      {/* Featured Project - takes 2x2 */}
      <BentoItem
        colSpan={2}
        rowSpan={2}
        variant="gradient"
        hoverEffect="lift"
      >
        <div className="h-full flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-4">E-Commerce Platform</h3>
            <p className="text-surface-400 mb-4">
              Full-featured e-commerce solution built with Next.js and WordPress
            </p>
          </div>
          <div className="text-sm text-surface-500">Laravel • Next.js • PostgreSQL</div>
        </div>
      </BentoItem>

      {/* Regular Projects */}
      <BentoItem variant="glass" hoverEffect="glow">
        <h3 className="font-bold mb-2">Blog Platform</h3>
        <p className="text-surface-400 text-sm">WordPress + Next.js</p>
      </BentoItem>

      <BentoItem variant="accent" hoverEffect="tilt">
        <h3 className="font-bold mb-2">Portfolio Site</h3>
        <p className="text-surface-400 text-sm">React + Tailwind</p>
      </BentoItem>

      {/* Tall sidebar item */}
      <BentoItem
        colSpan={1}
        rowSpan={2}
        variant="dark"
        hoverEffect="lift"
        className="bg-gradient-to-br from-brand-500/20 to-accent-500/20"
      >
        <h3 className="font-bold mb-4">Skills</h3>
        <div className="space-y-2 text-sm text-surface-400">
          <p>✓ WordPress</p>
          <p>✓ React/Next.js</p>
          <p>✓ TypeScript</p>
          <p>✓ Full-Stack</p>
        </div>
      </BentoItem>

      {/* More items */}
      <BentoItem variant="glass">
        <h3 className="font-bold mb-2">API Service</h3>
        <p className="text-surface-400 text-sm">Node.js • GraphQL</p>
      </BentoItem>

      <BentoItem variant="default">
        <h3 className="font-bold mb-2">Mobile App</h3>
        <p className="text-surface-400 text-sm">React Native</p>
      </BentoItem>
    </BentoGrid>
  );
}
```

### Animated Text with Gradient
```tsx
import { AnimatedText, GradientText } from '@/components';

export default function Hero() {
  return (
    <div className="text-center">
      <AnimatedText
        splitMode="words"
        animationType="fadeUp"
        staggerDelay={0.08}
        className="text-4xl md:text-6xl font-bold mb-6"
      >
        Building amazing web experiences
      </AnimatedText>

      <p className="text-lg text-surface-400 mb-8">
        I'm a{' '}
        <GradientText animated>full-stack developer</GradientText>
        {' '}from Cleveland, specializing in WordPress and Next.js
      </p>
    </div>
  );
}
```

### Tech Stack Display
```tsx
import { TechStack } from '@/components';

export default function ProjectCard() {
  const technologies = [
    { name: 'React', description: 'Frontend framework' },
    { name: 'TypeScript', description: 'Type safety' },
    { name: 'Next.js', description: 'Meta-framework' },
    { name: 'Tailwind CSS', description: 'Styling' },
    { name: 'PostgreSQL', description: 'Database' },
    { name: 'Framer Motion', description: 'Animations' },
    { name: 'GraphQL', description: 'Query language' },
  ];

  return (
    <div>
      <h3 className="text-sm font-semibold uppercase mb-3 text-surface-400">
        Technologies
      </h3>
      <TechStack
        technologies={technologies}
        displayLimit={4}
        layout="wrap"
      />
    </div>
  );
}
```

### Project Showcase with Interactive Iframe
```tsx
import { ProjectIframe, TechStack, Button } from '@/components';
import { ExternalLink } from 'lucide-react';

export default function ProjectDetail() {
  return (
    <article className="space-y-8">
      {/* Live Preview */}
      <ProjectIframe
        embedUrl="https://ecommerce-example.vercel.app"
        fallbackImage={{
          src: '/projects/ecommerce-screenshot.png',
          alt: 'E-commerce platform screenshot'
        }}
        title="E-Commerce Platform"
        brandColor="#6366f1"
      />

      {/* Project Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">E-Commerce Platform</h1>
          <p className="text-surface-400">
            A full-featured e-commerce solution with product catalog, shopping cart,
            and payment processing integrated with Stripe.
          </p>
        </div>

        {/* Technologies */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-3 text-surface-400">
            Tech Stack
          </h3>
          <TechStack
            technologies={[
              { name: 'React' },
              { name: 'Next.js' },
              { name: 'TypeScript' },
              { name: 'PostgreSQL' },
              { name: 'Stripe' },
            ]}
          />
        </div>

        {/* Key Features */}
        <div>
          <h3 className="font-semibold mb-3">Key Features</h3>
          <ul className="space-y-2 text-surface-400">
            <li>✓ Product catalog with search and filtering</li>
            <li>✓ Shopping cart with persistent storage</li>
            <li>✓ Secure payment processing via Stripe</li>
            <li>✓ User accounts and order history</li>
            <li>✓ Admin dashboard for inventory management</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="flex gap-3 flex-wrap">
          <Button
            href="https://ecommerce-example.vercel.app"
            target="_blank"
            variant="primary"
            icon={<ExternalLink />}
            iconPosition="right"
          >
            Visit Live Site
          </Button>
          <Button
            href="https://github.com/rayturk/ecommerce"
            target="_blank"
            variant="secondary"
          >
            View Source Code
          </Button>
        </div>
      </div>
    </article>
  );
}
```

### Testimonials Section
```tsx
import { Section, Testimonial } from '@/components';

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        'Ray transformed our outdated website into a modern, high-performing platform. The attention to detail and dedication to the project was exceptional.',
      author: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'TechVenture Inc',
      avatar: '/avatars/sarah.jpg',
      rating: 5,
    },
    {
      quote:
        'Outstanding work on our WordPress customization. Ray understood our vision and delivered beyond expectations. Highly recommended!',
      author: 'Mike Chen',
      role: 'CEO',
      company: 'Digital Solutions LLC',
      avatar: '/avatars/mike.jpg',
      rating: 5,
    },
    {
      quote:
        'The Next.js application Ray built for us is incredibly fast and scalable. Great communication throughout the project.',
      author: 'Emily Rodriguez',
      role: 'Product Manager',
      company: 'StartUp Labs',
      avatar: '/avatars/emily.jpg',
      rating: 5,
    },
  ];

  return (
    <Section
      id="testimonials"
      heading="What Clients | Say"
      subheading="Real feedback from happy clients"
      padding="lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Testimonial
            key={index}
            quote={testimonial.quote}
            author={testimonial.author}
            role={testimonial.role}
            company={testimonial.company}
            avatar={testimonial.avatar}
            rating={testimonial.rating}
            expandable
          />
        ))}
      </div>
    </Section>
  );
}
```

### Contact Form Section
```tsx
import { Section, Container, ContactForm } from '@/components';
import { Mail, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <Section
      id="contact"
      heading="Let's Work | Together"
      subheading="Have a project in mind? Let's discuss how I can help"
      padding="xl"
      background="gradient"
    >
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6">Quick Contact Info</h3>
              <div className="space-y-4">
                <a
                  href="mailto:ray@example.com"
                  className="flex items-center gap-3 text-surface-300 hover:text-brand-400 transition"
                >
                  <Mail className="text-brand-500" />
                  ray@example.com
                </a>
                <a
                  href="tel:+12165551234"
                  className="flex items-center gap-3 text-surface-300 hover:text-brand-400 transition"
                >
                  <Phone className="text-brand-500" />
                  (216) 555-1234
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Available For</h3>
              <ul className="space-y-2 text-surface-400">
                <li>✓ WordPress Development</li>
                <li>✓ Next.js Applications</li>
                <li>✓ Full-Stack Projects</li>
                <li>✓ Technical Consulting</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
```

### Breadcrumbs for Blog Post
```tsx
import { Breadcrumbs } from '@/components';

export default function BlogPost() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Blog', href: '/blog' },
          { label: 'Web Development', href: '/blog?category=web' },
          { label: 'Building a Modern Next.js Portfolio' }
        ]}
      />

      <article className="mt-8">
        <h1>Building a Modern Next.js Portfolio</h1>
        {/* Post content */}
      </article>
    </>
  );
}
```

### Badge Examples
```tsx
import { Badge } from '@/components';

export default function Tags() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Next.js']);

  return (
    <div className="space-y-6">
      {/* Simple badges */}
      <div>
        <h3 className="mb-3 font-semibold">Skills</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="brand">React</Badge>
          <Badge variant="brand">TypeScript</Badge>
          <Badge variant="accent">Next.js</Badge>
          <Badge variant="accent">WordPress</Badge>
        </div>
      </div>

      {/* Dismissible badges */}
      <div>
        <h3 className="mb-3 font-semibold">Filters (Click to remove)</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Badge
              key={tag}
              variant="outline"
              dismissible
              onDismiss={() => setTags(tags.filter(t => t !== tag))}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* With dot indicator */}
      <div>
        <h3 className="mb-3 font-semibold">Status Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="accent" dotIndicator>
            Available for Hire
          </Badge>
          <Badge variant="brand" dotIndicator>
            Open to Opportunities
          </Badge>
        </div>
      </div>
    </div>
  );
}
```

### Scroll Reveal Example
```tsx
import { Section, ScrollReveal } from '@/components';

export default function Features() {
  const features = [
    { title: 'Fast', description: 'Optimized for speed and performance' },
    { title: 'Responsive', description: 'Works perfectly on all devices' },
    { title: 'Modern', description: 'Built with latest technologies' },
  ];

  return (
    <Section heading="Why Choose | Me" padding="lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <ScrollReveal
            key={i}
            direction="up"
            delay={i * 0.15}
            className="text-center"
          >
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-surface-400">{feature.description}</p>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
```

---

## Complete Page Example

```tsx
'use client';

import {
  Header,
  Footer,
  Section,
  Container,
  Button,
  BentoGrid,
  BentoItem,
  GradientText,
  AnimatedText,
  TechStack,
  ProjectIframe,
  Testimonial,
  ContactForm,
  ScrollReveal,
} from '@/components';

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <Section id="hero" padding="xl">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <AnimatedText
              splitMode="words"
              className="text-5xl md:text-6xl lg:text-7xl font-bold"
            >
              Full-Stack & WordPress Developer
            </AnimatedText>

            <p className="text-xl text-surface-300">
              I build <GradientText animated>beautiful</GradientText> and{' '}
              <GradientText animated>functional</GradientText> websites
              for businesses in Cleveland and beyond.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <Button variant="primary" size="lg" href="#projects">
                View My Work
              </Button>
              <Button variant="secondary" size="lg" href="#contact">
                Get In Touch
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Projects Section */}
      <Section
        id="projects"
        heading="Featured | Projects"
        subheading="Recent work I'm proud of"
        padding="lg"
        background="dots"
      >
        <BentoGrid columns={4}>
          {/* Add your projects here using BentoItem */}
        </BentoGrid>
      </Section>

      {/* Testimonials Section */}
      <Section
        id="testimonials"
        heading="Client | Feedback"
        padding="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add testimonials here */}
        </div>
      </Section>

      {/* Contact Section */}
      <Section
        id="contact"
        heading="Let's Work | Together"
        padding="xl"
        background="gradient"
      >
        <Container size="lg">
          <ContactForm />
        </Container>
      </Section>

      <Footer />
    </>
  );
}
```

---

These examples should cover 90% of your use cases. Mix and match components to create your perfect portfolio!
