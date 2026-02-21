import type {
  Feature,
  PricingTier,
  Testimonial,
  Integration,
  TeamMember,
  HowItWorksStep,
  SiteConfig,
} from './types';

// ============================================================================
// SITE CONFIG
// ============================================================================

export const siteConfig: SiteConfig = {
  productName: 'Beacon',
  tagline: 'Know before your customers do',
  email: 'hello@beacon.app',
  twitterHandle: '@beaconapp',
  githubOrg: 'beacon-app',
  statusPageUrl: 'https://status.beacon.app',
  locations: [
    'US East',
    'US West',
    'EU West',
    'EU Central',
    'Asia Pacific',
    'South America',
    'Canada',
    'Australia',
  ],
};

// ============================================================================
// FEATURES
// ============================================================================

export const features: Feature[] = [
  {
    id: '1',
    title: '30-Second Checks',
    description:
      'Monitor your endpoints every 30 seconds from 8 global locations. Catch issues before they snowball into outages.',
    icon: 'timer',
    category: 'monitoring',
  },
  {
    id: '2',
    title: 'Instant Alerts',
    description:
      'Get notified via Slack, PagerDuty, OpsGenie, email, or SMS the moment a monitor fails. No alert fatigue.',
    icon: 'bell',
    category: 'alerting',
  },
  {
    id: '3',
    title: '8 Global Locations',
    description:
      'Verify uptime from US, EU, APAC, and more. Know whether an outage is global or regional instantly.',
    icon: 'globe',
    category: 'monitoring',
  },
  {
    id: '4',
    title: 'Public Status Pages',
    description:
      'Build trust with your users. Host a branded status page that updates automatically as incidents occur.',
    icon: 'layout-dashboard',
    category: 'reporting',
  },
  {
    id: '5',
    title: 'SSL & Domain Monitoring',
    description:
      'Get alerts before your SSL certificate expires or your domain lapses. Never let a renewal slip through.',
    icon: 'shield-check',
    category: 'monitoring',
  },
  {
    id: '6',
    title: 'Incident History & Reports',
    description:
      'Full audit trail of every incident with RCA export. Share uptime SLA reports with stakeholders in one click.',
    icon: 'file-chart-line',
    category: 'reporting',
  },
  {
    id: '7',
    title: 'API Endpoint Monitoring',
    description:
      'POST, PUT, DELETE — monitor any HTTP method with custom headers and request bodies. Assert on response JSON.',
    icon: 'code-2',
    category: 'monitoring',
  },
  {
    id: '8',
    title: 'On-Call Scheduling',
    description:
      'Built-in rotation scheduling with escalation policies. Silence alerts outside business hours or auto-escalate.',
    icon: 'calendar-clock',
    category: 'alerting',
  },
  {
    id: '9',
    title: 'Uptime SLA Tracking',
    description:
      'Define SLA targets per monitor. Real-time dashboards show you exactly where you stand against your commitments.',
    icon: 'trending-up',
    category: 'reporting',
  },
];

// ============================================================================
// HOW IT WORKS
// ============================================================================

export const howItWorksSteps: HowItWorksStep[] = [
  {
    step: 1,
    title: 'Add a monitor',
    description:
      'Enter your URL, API endpoint, or domain. Choose check frequency (30s to 5 min) and which regions to check from.',
    icon: 'plus-circle',
  },
  {
    step: 2,
    title: 'Connect your team',
    description:
      'Integrate with Slack, PagerDuty, or email in 60 seconds. Set up on-call rotations and escalation policies.',
    icon: 'users',
  },
  {
    step: 3,
    title: 'Sleep soundly',
    description:
      'Beacon watches 24/7. When something breaks, the right person gets paged immediately — before customers notice.',
    icon: 'shield-check',
  },
];

// ============================================================================
// PRICING
// ============================================================================

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For side projects and small teams',
    monthlyPrice: null,
    annualPrice: null,
    monitors: '5 monitors',
    checkInterval: '5-minute checks',
    highlighted: false,
    ctaLabel: 'Start for free',
    ctaHref: '/contact',
    features: [
      { label: '5 monitors', included: true },
      { label: '5-minute check interval', included: true },
      { label: 'Email alerts', included: true },
      { label: '2 team members', included: true },
      { label: '30-day uptime history', included: true },
      { label: 'Public status page', included: true },
      { label: 'Slack & PagerDuty', included: false },
      { label: 'API monitoring', included: false },
      { label: 'On-call scheduling', included: false },
      { label: 'SLA reports', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For growing startups and DevOps teams',
    monthlyPrice: 29,
    annualPrice: 23,
    monitors: '50 monitors',
    checkInterval: '1-minute checks',
    highlighted: true,
    ctaLabel: 'Start free trial',
    ctaHref: '/contact',
    features: [
      { label: '50 monitors', included: true },
      { label: '1-minute check interval', included: true },
      { label: 'Email, Slack & PagerDuty', included: true },
      { label: 'Unlimited team members', included: true },
      { label: '1-year uptime history', included: true },
      { label: 'Public status page', included: true },
      { label: 'API monitoring', included: true },
      { label: 'On-call scheduling', included: true },
      { label: 'SSL & domain monitoring', included: true },
      { label: 'SLA reports', included: false },
    ],
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'For scale-ups with SLA commitments',
    monthlyPrice: 99,
    annualPrice: 79,
    monitors: 'Unlimited monitors',
    checkInterval: '30-second checks',
    highlighted: false,
    ctaLabel: 'Request demo',
    ctaHref: '/contact',
    features: [
      { label: 'Unlimited monitors', included: true },
      { label: '30-second check interval', included: true },
      { label: 'All alert channels + OpsGenie', included: true },
      { label: 'Unlimited team members', included: true },
      { label: 'Unlimited uptime history', included: true },
      { label: 'Custom-branded status page', included: true },
      { label: 'API monitoring', included: true },
      { label: 'On-call scheduling', included: true },
      { label: 'SSL & domain monitoring', included: true },
      { label: 'SLA reports & export', included: true },
    ],
  },
];

// ============================================================================
// TESTIMONIALS
// ============================================================================

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Mehta',
    title: 'CTO',
    company: 'Loopfuse',
    quote:
      "We switched from our old monitoring tool after our third missed outage in a year. Beacon caught our next API failure in 34 seconds. That's the difference between a minor blip and an SLA breach.",
  },
  {
    id: '2',
    name: 'Marcus Chen',
    title: 'Head of Infrastructure',
    company: 'Stackr',
    quote:
      "The PagerDuty integration took literally two minutes. Within an hour we had on-call rotations configured for a 12-person team across three time zones. Our mean time to acknowledge dropped by 60%.",
  },
  {
    id: '3',
    name: 'Alyssa Torres',
    title: 'Founder',
    company: 'Draftly',
    quote:
      "I'm a solo founder. Beacon's free tier monitors my five core endpoints and pages me on Slack. I've caught two incidents before a single user reported them. It's my most trusted tool.",
  },
];

// ============================================================================
// INTEGRATIONS
// ============================================================================

export const integrations: Integration[] = [
  { id: '1', name: 'Slack', category: 'Alerting', description: 'Real-time incident notifications in your channels' },
  { id: '2', name: 'PagerDuty', category: 'Alerting', description: 'On-call escalation with full incident lifecycle' },
  { id: '3', name: 'OpsGenie', category: 'Alerting', description: 'Team-based alerting with smart routing rules' },
  { id: '4', name: 'GitHub', category: 'DevOps', description: 'Link incidents to commits and deploy events' },
  { id: '5', name: 'AWS CloudWatch', category: 'Infrastructure', description: 'Correlate uptime with AWS metric data' },
  { id: '6', name: 'Datadog', category: 'Observability', description: 'Send uptime events to your Datadog dashboard' },
  { id: '7', name: 'Jira', category: 'Issue Tracking', description: 'Auto-create tickets on incident detection' },
  { id: '8', name: 'Zapier', category: 'Automation', description: 'Connect Beacon to 5,000+ apps with no code' },
];

// ============================================================================
// TEAM
// ============================================================================

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Jordan Wells',
    title: 'CEO & Co-founder',
    bio: 'Former SRE at Stripe. Built and sold two developer tools startups. Obsessed with reliability engineering and P99 latency.',
  },
  {
    id: '2',
    name: 'Sam Nakamura',
    title: 'CTO & Co-founder',
    bio: 'Ex-infrastructure lead at Cloudflare. Designed global monitoring infrastructure that processes 50M+ checks per day.',
  },
  {
    id: '3',
    name: 'Anika Osei',
    title: 'Head of Product',
    bio: 'Previously product manager at PagerDuty. Passionate about turning complex DevOps workflows into simple, delightful UX.',
  },
  {
    id: '4',
    name: 'Dmitri Volkov',
    title: 'Head of Engineering',
    bio: 'Backend architect with a background in distributed systems. Maintainer of several open-source observability libraries.',
  },
];

// ============================================================================
// TRUSTED BY (logo strip text)
// ============================================================================

export const trustedBy: string[] = [
  'Vercel',
  'Linear',
  'Loom',
  'Retool',
  'Brex',
  'Figma',
];
