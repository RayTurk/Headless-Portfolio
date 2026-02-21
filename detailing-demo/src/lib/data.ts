/**
 * Mock data for Revive Auto Detailing
 *
 * Data is structured to mirror what a CMS/GraphQL API would return.
 * TODO: Replace each export with real API calls when connecting a CMS.
 */

import type {
  SiteConfig,
  DetailingService,
  Package,
  Testimonial,
  TeamMember,
  ProcessStep,
} from './types';

// ============================================================================
// SITE CONFIG
// ============================================================================

export const siteConfig: SiteConfig = {
  businessName: 'Revive Auto Detailing',
  tagline: 'Your car deserves better than a car wash',
  phone: '2165550192',
  phoneDisplay: '(216) 555-0192',
  email: 'book@revivedetail.com',
  address: '4217 Tiedeman Rd, Brooklyn, OH 44144',
  yearsInBusiness: 8,
  serviceAreas: [
    'Brooklyn',
    'Parma',
    'Middleburg Heights',
    'Strongsville',
    'Berea',
    'Lakewood',
    'Rocky River',
    'Westlake',
    'North Olmsted',
    'Cleveland',
    'Broadview Heights',
    'Seven Hills',
  ],
};

// ============================================================================
// SERVICES
// ============================================================================

export const services: DetailingService[] = [
  {
    id: '1',
    slug: 'exterior-hand-wash',
    title: 'Exterior Hand Wash',
    shortDescription:
      'A thorough two-bucket hand wash that removes road grime, brake dust, and contaminants without swirling paint.',
    fullDescription:
      'Our exterior hand wash is the foundation of every detail. We use pH-neutral soap, a two-bucket wash method with grit guards, and microfiber mitts to safely lift dirt without scratching your clear coat. Every vehicle is pre-rinsed, hand washed panel by panel, rinsed again, and dried with plush waffle-weave towels. Wheels, wheel wells, and door jambs are cleaned separately. This is how detailing should be done — not how the drive-through does it.',
    icon: 'droplets',
    accentColor: 'bg-cyan-500/15 text-cyan-400',
    features: [
      'Two-bucket wash with grit guards',
      'pH-neutral foam pre-wash',
      'Wheel, tire, and wheel well cleaning',
      'Door jamb cleaning',
      'Streak-free hand dry',
      'Spray wax dressing',
    ],
    startingPrice: '$49',
    duration: '45–60 min',
  },
  {
    id: '2',
    slug: 'interior-deep-clean',
    title: 'Interior Deep Clean',
    shortDescription:
      'Full interior vacuum, steam clean, and detail — seats, carpet, dash, vents, and door panels.',
    fullDescription:
      "Life happens inside your car. Pet hair, coffee spills, kids, sports gear — it all takes a toll. Our interior deep clean starts with a full vacuum of every surface including under seats and in crevices. We steam clean and extract carpets and upholstery, wipe down all hard surfaces with appropriate cleaners, detail the vents and center console, dress and protect plastic and vinyl, and clean all glass inside. You'll step into a car that smells and feels new.",
    icon: 'sparkles',
    accentColor: 'bg-violet-500/15 text-violet-400',
    features: [
      'Full vacuum (seats, carpet, trunk, vents)',
      'Hot water extraction for carpet & upholstery',
      'Steam cleaning for tough stains',
      'Dash, door panel, and console wipe-down',
      'Plastic and vinyl dressing',
      'Interior glass cleaning',
    ],
    startingPrice: '$79',
    duration: '2–3 hrs',
  },
  {
    id: '3',
    slug: 'paint-correction',
    title: 'Paint Correction',
    shortDescription:
      'Machine polishing to remove swirl marks, light scratches, and oxidation — restoring true paint depth.',
    fullDescription:
      "Paint correction is the art of removing imperfections from your vehicle's clear coat using machine polishing. Swirl marks from automatic car washes, fine scratches from improper washing, water spot etching, and oxidation dullness are all correctable. We use a dual-action polisher with the appropriate compound and pad combination to safely cut and refine the clear coat, revealing the deep, glossy finish underneath. Before we start, we inspect your paint under LED lighting to map every defect and determine the correction needed.",
    icon: 'layers',
    accentColor: 'bg-emerald-500/15 text-emerald-400',
    features: [
      'Pre-correction paint thickness measurement',
      'LED defect inspection',
      'Single or multi-stage machine polish',
      'Swirl mark and scratch removal',
      'Water spot and oxidation correction',
      'IPA wipe-down before coating or wax',
    ],
    startingPrice: '$249',
    duration: '4–8 hrs',
  },
  {
    id: '4',
    slug: 'ceramic-coating',
    title: 'Ceramic Coating',
    shortDescription:
      'Professional-grade nano-ceramic protection that bonds to your paint for years of hydrophobic defense.',
    fullDescription:
      "A ceramic coating is a liquid polymer that chemically bonds to your vehicle's factory paint, creating a protective layer that lasts years — not weeks. Unlike waxes and sealants that sit on top of the clear coat, ceramic coatings bond at the molecular level, providing 9H hardness, extreme hydrophobicity (water beads and rolls off), UV protection, and resistance to bird droppings, tree sap, and industrial fallout. Every ceramic coating installation at Revive includes a full paint correction to ensure you're sealing perfection, not defects.",
    icon: 'shield-check',
    accentColor: 'bg-blue-500/15 text-blue-400',
    features: [
      'Paint correction included',
      '9H nano-ceramic formula',
      'Extreme hydrophobic surface',
      'UV and oxidation protection',
      'Resistance to bird droppings and tree sap',
      '2-year warranty with annual inspection',
    ],
    startingPrice: '$699',
    duration: '1–2 days',
  },
  {
    id: '5',
    slug: 'headlight-restoration',
    title: 'Headlight Restoration',
    shortDescription:
      'Restore hazy, yellowed headlights to crystal clarity — improving safety and curb appeal.',
    fullDescription:
      'Yellowed headlights reduce your light output by up to 80% — a safety issue as much as an aesthetic one. Our headlight restoration process sands through the oxidized outer layer of the polycarbonate lens using a wet-sand progression, then machine polishes to restore optical clarity. We finish with a UV-resistant sealant to protect the lens from re-yellowing. Results last 2–3 years with proper care.',
    icon: 'zap',
    accentColor: 'bg-yellow-500/15 text-yellow-400',
    features: [
      'Wet sand with 5-step grit progression',
      'Machine polish to optical clarity',
      'UV-resistant sealant application',
      'Before & after photos',
      '2–3 year protection',
      'Both lenses included',
    ],
    startingPrice: '$89',
    duration: '1–2 hrs',
  },
  {
    id: '6',
    slug: 'engine-bay-cleaning',
    title: 'Engine Bay Cleaning',
    shortDescription:
      'Safe degreasing and detailing of your engine compartment — looks factory-fresh, helps catch leaks.',
    fullDescription:
      'A clean engine bay makes it easier to spot leaks, looks impressive when the hood goes up, and can even run slightly cooler by removing built-up grime that traps heat. We protect all sensitive electronics before any moisture is applied, apply an appropriate degreaser, agitate with brushes, rinse carefully, dry thoroughly, and dress all rubber and plastic components to prevent cracking. We never use high-pressure steam directly on electronics — safety is the priority.',
    icon: 'wrench',
    accentColor: 'bg-orange-500/15 text-orange-400',
    features: [
      'Electronics masking and protection',
      'Degreaser application and agitation',
      'Careful low-pressure rinse',
      'Complete hand dry',
      'Plastic and rubber dressing',
      'Inspection for fluid leaks',
    ],
    startingPrice: '$69',
    duration: '1–1.5 hrs',
  },
];

// ============================================================================
// PACKAGES
// ============================================================================

export const packages: Package[] = [
  {
    id: '1',
    name: 'Express',
    tagline: 'The essentials, done right',
    price: 89,
    duration: '1–2 hrs',
    includes: [
      'Exterior hand wash & dry',
      'Wheel & tire cleaning',
      'Interior vacuum',
      'Dash & console wipe-down',
      'Interior glass cleaning',
      'Tire dressing',
    ],
    highlighted: false,
    ctaLabel: 'Book Express',
  },
  {
    id: '2',
    name: 'Signature',
    tagline: 'Our most popular — the complete detail',
    price: 189,
    duration: '3–4 hrs',
    includes: [
      'Everything in Express',
      'Interior deep clean & extraction',
      'Door jamb cleaning',
      'Engine bay wipe-down',
      'Clay bar decontamination',
      'One-step polish & gloss enhance',
      'Carnauba wax protection',
      'Leather/vinyl conditioning',
    ],
    highlighted: true,
    ctaLabel: 'Book Signature',
  },
  {
    id: '3',
    name: 'Elite',
    tagline: 'Show-ready finish, certified results',
    price: 349,
    duration: '6–8 hrs',
    includes: [
      'Everything in Signature',
      'Full paint decontamination',
      'Single-stage paint correction',
      'Paint sealant (12-month protection)',
      'Headlight restoration',
      'Full engine bay detail',
      'Odor elimination treatment',
      'Before & after documentation',
    ],
    highlighted: false,
    ctaLabel: 'Book Elite',
  },
];

// ============================================================================
// PROCESS STEPS
// ============================================================================

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Inspect',
    description: 'We photograph and document your vehicle condition before touching anything. Paint thickness measured, all defects mapped.',
    icon: 'search',
  },
  {
    step: 2,
    title: 'Pre-Rinse',
    description: 'Foam cannon covers the entire car, dwell time loosens road grime and brake dust before any contact is made.',
    icon: 'cloud-rain',
  },
  {
    step: 3,
    title: 'Hand Wash',
    description: 'Two-bucket method with grit guards and clean microfiber mitts. Each panel washed and rinsed individually.',
    icon: 'droplets',
  },
  {
    step: 4,
    title: 'Clay & Polish',
    description: "Clay bar removes embedded contaminants from the paint surface. Machine polish corrects imperfections and restores depth.",
    icon: 'layers',
  },
  {
    step: 5,
    title: 'Protect',
    description: 'Wax, sealant, or ceramic coating applied per your package. Every surface sealed and protected.',
    icon: 'shield-check',
  },
  {
    step: 6,
    title: 'Quality Check',
    description: 'Final inspection under LED lighting. We walk you through the results and answer every question before you drive away.',
    icon: 'check-circle',
  },
];

// ============================================================================
// TESTIMONIALS
// ============================================================================

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Derek M.',
    vehicle: '2021 BMW M4 Competition',
    rating: 5,
    quote:
      "Had the Elite package done before a car show. The paint correction was flawless — the M4 looked better than it did the day I picked it up from the dealer. The before and after photos were jaw-dropping. Worth every penny.",
    serviceReceived: 'Elite Package + Ceramic Coating',
  },
  {
    id: '2',
    name: 'Alicia T.',
    vehicle: '2019 Honda CR-V',
    rating: 5,
    quote:
      "I let the interior go for way too long — two kids and a dog will do that. The Signature package brought it back completely. The carpet extraction pulled out stains I'd given up on. My CR-V smells and looks brand new. I'm booked for quarterly maintenance now.",
    serviceReceived: 'Signature Package',
  },
  {
    id: '3',
    name: 'James K.',
    vehicle: '2018 Chevy Silverado 1500',
    rating: 5,
    quote:
      "The truck sees a lot of job sites. Revive did the headlight restoration and full exterior detail. Headlights are crystal clear — I didn't realize how bad my night vision had gotten until now. Highly professional operation from start to finish.",
    serviceReceived: 'Express Detail + Headlight Restoration',
  },
];

// ============================================================================
// TEAM MEMBERS
// ============================================================================

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Marcus Webb',
    title: 'Owner & Lead Detailer',
    bio: "Marcus founded Revive in 2016 after years of detailing cars as a hobby turned obsession. Ceramic-certified through IDA and CARPRO, he's personally detailed over 2,000 vehicles ranging from daily drivers to concours-level collector cars.",
    certifications: ['IDA Certified Detailer', 'CARPRO Certified Applicator', 'Rupes Trained Polisher'],
  },
  {
    id: '2',
    name: 'Jordan Reyes',
    title: 'Senior Detailer',
    bio: "Jordan specializes in paint correction and ceramic coating installs. His eye for defects under LED lighting is unmatched — clients routinely say he caught scratches they didn't even know existed.",
    certifications: ['IDA Certified Detailer', 'Gyeon Certified Installer'],
  },
  {
    id: '3',
    name: 'Priya Nair',
    title: 'Interior Specialist',
    bio: "Priya handles every interior restoration from basic vacuum-and-wipe to full leather restoration on vintage vehicles. She brings a surgeon's patience to every job — nothing is overlooked.",
    certifications: ['Leather Restoration Certified', 'Odor Elimination Specialist'],
  },
];
