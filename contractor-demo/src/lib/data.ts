/**
 * Mock data for Summit HVAC & Plumbing
 *
 * Data is structured identically to what WPGraphQL would return so that
 * replacing this file with real API calls is a drop-in swap.
 *
 * TODO: Replace each export with a call to the GraphQL API:
 *   import { getServices } from '@/lib/api'
 *   export const services = await getServices()
 */

import type {
  ContractorService,
  Testimonial,
  TeamMember,
  Stat,
  ServiceArea,
  SiteConfig,
  Certification,
} from './types';

// ============================================================================
// SITE CONFIG
// ============================================================================

export const siteConfig: SiteConfig = {
  companyName: 'Summit HVAC & Plumbing',
  tagline: "Northeast Ohio's Trusted Home Service Experts",
  phone: '4405550192',
  phoneDisplay: '(440) 555-0192',
  email: 'service@summithvac.com',
  address: '1842 Mentor Ave, Painesville, OH 44077',
  licenseNumber: 'OH-HV-048291',
  yearsInBusiness: 22,
  serviceRadius: '50-mile radius of Greater Cleveland',
};

// ============================================================================
// SERVICES
// ============================================================================

export const services: ContractorService[] = [
  {
    id: '1',
    slug: 'heating',
    title: 'Heating',
    shortDescription:
      'Furnace installation, repair, and tune-ups. Stay warm all winter with our certified heating technicians.',
    fullDescription:
      "When temperatures drop in Northeast Ohio, your heating system is critical. Our certified technicians install, repair, and maintain all major furnace brands including Carrier, Trane, Lennox, and Rheem. Whether you need an emergency repair on a freezing night or a planned system replacement, Summit HVAC responds fast and gets it right the first time. We offer transparent pricing with no hidden fees — you'll know the cost before we start any work.",
    icon: 'flame',
    accentColor: 'bg-orange-100 text-orange-600',
    features: [
      'Furnace installation & replacement',
      'Emergency heating repair (24/7)',
      'Annual tune-ups & maintenance plans',
      'Heat pump systems',
      'Boiler repair & replacement',
      'Carbon monoxide testing',
    ],
    processSteps: [
      {
        step: 1,
        title: 'Schedule & Diagnose',
        description:
          'Call or book online. A certified tech arrives, performs a full system diagnostic, and explains exactly what needs to be done.',
      },
      {
        step: 2,
        title: 'Upfront Quote',
        description:
          'We provide a written, flat-rate quote before touching anything. No surprises on your invoice.',
      },
      {
        step: 3,
        title: 'Expert Repair or Install',
        description:
          'Our licensed technicians complete the work efficiently using quality parts backed by manufacturer warranties.',
      },
      {
        step: 4,
        title: 'Quality Check',
        description:
          'We test the system thoroughly and walk you through everything before we leave.',
      },
    ],
    faqs: [
      {
        question: 'How do I know if I need a repair or a full replacement?',
        answer:
          "If your furnace is under 15 years old and the repair cost is less than 50% of a new unit, repair usually makes sense. We give honest recommendations — we won't push unnecessary replacements.",
      },
      {
        question: 'Do you offer financing for new furnaces?',
        answer:
          'Yes! We partner with GreenSky to offer 0% financing for 12 months on qualifying equipment purchases.',
      },
      {
        question: 'How often should I get a furnace tune-up?',
        answer:
          'Once a year, ideally in fall before heating season. Annual tune-ups improve efficiency and catch small issues before they become expensive breakdowns.',
      },
    ],
    startingPrice: '$89',
    emergencyAvailable: true,
  },
  {
    id: '2',
    slug: 'cooling',
    title: 'Cooling & AC',
    shortDescription:
      'Central AC installation, repair, and seasonal maintenance to keep you cool through Cleveland summers.',
    fullDescription:
      "Ohio summers can be brutal, and a failing air conditioner is more than an inconvenience — it can be a health risk for elderly family members and young children. Summit HVAC provides same-day AC repair for most issues, plus expert installation of energy-efficient central air systems, ductless mini-splits, and whole-home ventilation. Our NATE-certified technicians diagnose problems correctly the first time.",
    icon: 'wind',
    accentColor: 'bg-sky-100 text-sky-600',
    features: [
      'Central AC installation & replacement',
      'Same-day AC repair',
      'Ductless mini-split systems',
      'AC tune-ups & seasonal maintenance',
      'Refrigerant recharge (R-410A)',
      'Indoor air quality solutions',
    ],
    processSteps: [
      {
        step: 1,
        title: 'Same-Day Diagnosis',
        description: 'Most AC calls are serviced same-day. We diagnose the root cause, not just the symptom.',
      },
      {
        step: 2,
        title: 'Written Estimate',
        description:
          'Flat-rate pricing means the quote you get is the price you pay. No overtime charges.',
      },
      {
        step: 3,
        title: 'Repair or Replace',
        description:
          'We carry common parts on the truck for fast repairs. New system installs are typically completed in one day.',
      },
      {
        step: 4,
        title: 'Comfort Guarantee',
        description:
          '1-year parts and labor warranty on all repairs. 10-year extended warranty available on new equipment.',
      },
    ],
    faqs: [
      {
        question: "My AC is running but not cooling — what's wrong?",
        answer:
          "Most likely causes are low refrigerant, a dirty condenser coil, or a failing compressor. We'll diagnose it exactly and give you options.",
      },
      {
        question: 'What SEER rating should I look for in a new AC?',
        answer:
          "We recommend 16–18 SEER for most Ohio homes. Higher SEER means lower electric bills, and units over 15 SEER qualify for federal tax credits.",
      },
      {
        question: 'Is a tune-up worth it if my AC seems fine?',
        answer:
          'Absolutely. Tune-ups improve efficiency (lower bills), extend equipment life, and catch refrigerant leaks and worn parts early.',
      },
    ],
    startingPrice: '$79',
    emergencyAvailable: true,
  },
  {
    id: '3',
    slug: 'plumbing',
    title: 'Plumbing',
    shortDescription:
      'From dripping faucets to burst pipes — licensed plumbers serving Greater Cleveland around the clock.',
    fullDescription:
      "Water damage is one of the most expensive home repairs you can face. Summit's licensed plumbers respond fast to leaks, clogs, and plumbing emergencies to minimize damage and get your home back to normal. We handle everything from routine drain cleaning and water heater installation to whole-house repiping. All work is permitted and code-compliant.",
    icon: 'droplets',
    accentColor: 'bg-blue-100 text-blue-600',
    features: [
      'Emergency leak detection & repair',
      'Drain cleaning & hydro-jetting',
      'Water heater installation & repair',
      'Sump pump service',
      'Whole-house repiping',
      'Fixture installation (faucets, toilets, etc.)',
    ],
    processSteps: [
      {
        step: 1,
        title: 'Fast Response',
        description:
          "For plumbing emergencies, we aim to arrive within 90 minutes. Tell us what you need and we'll dispatch the nearest tech.",
      },
      {
        step: 2,
        title: 'Camera Inspection',
        description:
          'We use video camera inspection on drain and sewer issues to find the exact problem location — no guessing.',
      },
      {
        step: 3,
        title: 'Upfront Pricing',
        description:
          'Written estimate before any work begins. We pull permits when required and document everything.',
      },
      {
        step: 4,
        title: 'Clean Up & Inspect',
        description:
          'We clean our work area completely and do a final pressure test to confirm the repair is solid.',
      },
    ],
    faqs: [
      {
        question: 'My water heater is leaking — is it an emergency?',
        answer:
          "Yes, treat it as one. A leaking water heater can cause floor and structural damage quickly. Call us right away and we'll get a tech out fast.",
      },
      {
        question: 'How do I know if I have a slab leak?',
        answer:
          'Signs include unexplained high water bills, warm spots on floors, or the sound of running water when everything is off. We offer non-invasive leak detection.',
      },
      {
        question: 'Do you offer tankless water heater installation?',
        answer:
          'Yes. Tankless units provide endless hot water and last 20+ years. We install Navien, Rinnai, and Rheem tankless systems.',
      },
    ],
    startingPrice: '$99',
    emergencyAvailable: true,
  },
  {
    id: '4',
    slug: 'water-heaters',
    title: 'Water Heaters',
    shortDescription:
      'Tank and tankless water heater installation, repair, and replacement by licensed plumbers.',
    fullDescription:
      "A failing water heater disrupts your entire household. Summit installs and services all types — traditional tank, tankless (on-demand), heat pump, and solar-assisted. We carry top brands in stock and can often complete same-day installations. Our licensed plumbers properly size every system to match your household's hot water demand so you never run cold again.",
    icon: 'thermometer',
    accentColor: 'bg-amber-100 text-amber-600',
    features: [
      'Tank & tankless installation',
      'Same-day replacement in most cases',
      'All major brands: Navien, Rheem, Bradford White',
      'Expansion tank installation',
      'Water heater repair & flushing',
      '6-year & 12-year warranty options',
    ],
    processSteps: [
      {
        step: 1,
        title: 'Assess Your Needs',
        description:
          'We evaluate your household size, current usage, and gas/electric setup to recommend the right system and size.',
      },
      {
        step: 2,
        title: 'Same-Day Install',
        description:
          'Most standard replacements are completed in 2–3 hours. We handle the old unit removal and disposal.',
      },
      {
        step: 3,
        title: 'Code Compliance',
        description:
          'All installations are permitted and inspected per Ohio code. Expansion tanks are included where required.',
      },
      {
        step: 4,
        title: 'Rebate Assistance',
        description:
          'We help you claim available utility rebates and federal tax credits for energy-efficient models.',
      },
    ],
    faqs: [
      {
        question: 'How long does a water heater last?',
        answer:
          'Tank water heaters typically last 8–12 years. Tankless units last 20+ years with proper maintenance. If yours is over 10 years old and having issues, replacement often makes more financial sense than repair.',
      },
      {
        question: 'Tankless vs. tank — which is better?',
        answer:
          'Tankless wins on efficiency (20–30% less energy), space savings, and lifespan. Tank wins on lower upfront cost. We help you run the numbers for your specific situation.',
      },
      {
        question: 'Can you install a water heater in a tight space?',
        answer:
          'Yes. We install in basements, closets, attics, and crawl spaces. Tankless units are great for tight spaces since they mount on the wall.',
      },
    ],
    startingPrice: '$850',
    emergencyAvailable: true,
  },
  {
    id: '5',
    slug: 'indoor-air-quality',
    title: 'Indoor Air Quality',
    shortDescription:
      'Whole-home air filtration, humidifiers, UV purifiers, and duct cleaning for healthier indoor air.',
    fullDescription:
      "The EPA estimates indoor air can be 2–5x more polluted than outdoor air. Summit offers a full range of indoor air quality solutions to reduce allergens, eliminate odors, control humidity, and kill airborne pathogens. Our solutions integrate directly into your existing HVAC system for whole-home coverage — no portable units or constant filter replacements.",
    icon: 'shield',
    accentColor: 'bg-emerald-100 text-emerald-600',
    features: [
      'Whole-home HEPA air filtration',
      'UV germicidal light installation',
      'Whole-home humidifiers & dehumidifiers',
      'Professional duct cleaning',
      'MERV 16 media filter upgrades',
      'Air quality testing & assessment',
    ],
    processSteps: [
      {
        step: 1,
        title: 'Air Quality Assessment',
        description:
          'We test your indoor air for common pollutants including VOCs, particulate matter, mold spores, and humidity levels.',
      },
      {
        step: 2,
        title: 'Customized Plan',
        description:
          'Based on results, we recommend the right combination of filtration, purification, and humidity control for your home.',
      },
      {
        step: 3,
        title: 'Professional Installation',
        description:
          'All equipment integrates with your existing HVAC system — no standalone units that take up floor space.',
      },
      {
        step: 4,
        title: 'Ongoing Maintenance',
        description:
          'Annual filter replacements and UV lamp checks keep your system performing at peak efficiency.',
      },
    ],
    faqs: [
      {
        question: 'Who benefits most from improved indoor air quality?',
        answer:
          "Anyone with allergies, asthma, pets, or young children sees the biggest improvement. But better air quality benefits everyone — it reduces sick days and improves sleep quality.",
      },
      {
        question: "Do UV lights really kill viruses?",
        answer:
          'Yes. UV-C germicidal lights are proven to neutralize bacteria, viruses, and mold spores as air passes through your HVAC system. They\'ve been used in hospitals for decades.',
      },
      {
        question: "What's the right humidity level for a home?",
        answer:
          "30–50% relative humidity is ideal. Below 30% causes dry skin and static electricity. Above 50% promotes mold growth. Ohio winters often push indoor humidity well below 30% — a whole-home humidifier solves this.",
      },
    ],
    emergencyAvailable: false,
  },
  {
    id: '6',
    slug: 'maintenance-plans',
    title: 'Maintenance Plans',
    shortDescription:
      'Annual service agreements that cover tune-ups, priority scheduling, and exclusive member discounts.',
    fullDescription:
      "Summit's Comfort Club maintenance plan gives you peace of mind that your systems are always ready for whatever Ohio weather throws at them. Members receive annual HVAC and plumbing inspections, priority scheduling (jump the line in emergencies), and significant discounts on repairs and equipment. Plans pay for themselves with just one tune-up included.",
    icon: 'wrench',
    accentColor: 'bg-purple-100 text-purple-600',
    features: [
      '2 HVAC tune-ups per year (spring + fall)',
      'Annual plumbing inspection',
      'Priority emergency scheduling',
      '15% discount on all repairs',
      '10% discount on equipment',
      'No overtime charges for members',
    ],
    processSteps: [
      {
        step: 1,
        title: 'Choose Your Plan',
          description:
          'Select from Basic (HVAC only), Plus (HVAC + Plumbing), or Premium (all services + water heater flush).',
      },
      {
        step: 2,
        title: 'Schedule Tune-Ups',
        description:
          'We reach out each spring and fall to schedule your included tune-ups at a time that works for you.',
      },
      {
        step: 3,
        title: 'Enjoy Priority Service',
        description:
          'Members go to the front of the line. In peak season when everyone else waits, you get same-day service.',
      },
      {
        step: 4,
        title: 'Save on Every Visit',
        description:
          'Your 15% repair discount and no overtime fees add up to real savings over the life of your membership.',
      },
    ],
    faqs: [
      {
        question: 'Can I cancel my plan anytime?',
        answer:
          'Yes. Plans are month-to-month with no long-term contracts. Cancel anytime with 30 days notice.',
      },
      {
        question: 'What does a tune-up include?',
        answer:
          'A full 21-point inspection: check refrigerant levels, clean coils, test capacitors, inspect heat exchanger, check electrical connections, lubricate moving parts, and verify system efficiency.',
      },
      {
        question: 'Do plans cover parts and repairs?',
        answer:
          'Plans cover the tune-up labor. If we find a repair needed, members get 15% off parts and labor for that repair.',
      },
    ],
    startingPrice: '$19/mo',
    emergencyAvailable: false,
  },
];

// ============================================================================
// TESTIMONIALS
// ============================================================================

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Karen M.',
    location: 'Mentor, OH',
    rating: 5,
    quote:
      "Furnace went out at 11 PM on the coldest night of the year. Summit had a tech at my house by midnight and the heat was back on by 1:30 AM. The technician was professional, explained everything, and the bill was exactly what they quoted over the phone. I won't use anyone else.",
    service: 'Emergency Heating Repair',
    date: '2024-01-15',
  },
  {
    id: '2',
    name: 'Dave & Linda T.',
    location: 'Willoughby, OH',
    rating: 5,
    quote:
      "Replaced our 20-year-old AC and furnace. Summit gave us three options at different price points without any pressure. The install crew was on time, clean, and done in one day. The new system cut our energy bills by almost 30%. Highly recommend their maintenance plan too.",
    service: 'HVAC System Replacement',
    date: '2024-06-22',
  },
  {
    id: '3',
    name: 'Marcus J.',
    location: 'Painesville, OH',
    rating: 5,
    quote:
      "Had a water heater that was leaking into my finished basement. Called Summit at 8 AM and they had a plumber there by 10. New tankless unit installed by 2 PM. Clean, professional, and they even helped me file for the utility rebate. Outstanding service.",
    service: 'Tankless Water Heater Installation',
    date: '2024-09-08',
  },
  {
    id: '4',
    name: 'Susan R.',
    location: 'Euclid, OH',
    rating: 5,
    quote:
      "Signed up for their Comfort Club plan after Summit diagnosed a refrigerant leak that another company missed twice. Night and day difference in professionalism. The annual tune-ups alone are worth the plan price, and the 15% discount on repairs has already saved me way more than the membership cost.",
    service: 'Maintenance Plan & AC Repair',
    date: '2024-07-30',
  },
  {
    id: '5',
    name: 'Bob K.',
    location: 'Concord Township, OH',
    rating: 5,
    quote:
      "Summit installed a whole-home humidifier and UV air purifier. My wife has severe allergies and we've both noticed a huge difference in air quality. The tech took time to explain exactly how everything works. First HVAC company I've dealt with that felt like they genuinely cared about solving our problem.",
    service: 'Indoor Air Quality',
    date: '2024-11-12',
  },
];

// ============================================================================
// TEAM MEMBERS
// ============================================================================

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Mike Donovan',
    title: 'Owner & Master HVAC Technician',
    bio: "Mike founded Summit HVAC & Plumbing in 2002 after 8 years as a field tech for a regional HVAC contractor. His goal was simple: build a company he'd trust in his own home. Twenty-two years later, Summit has completed over 14,000 service calls across Lake and Geauga counties.",
    certifications: ['NATE Certified', 'EPA 608 Universal', 'Ohio HVAC License #OH-HV-048291'],
  },
  {
    id: '2',
    name: 'Jason Kowalski',
    title: 'Lead Plumber',
    bio: "Jason joined Summit in 2010 after completing his journeyman plumbing apprenticeship. He specializes in whole-house repiping and water heater systems. Cleveland native, Painesville resident.",
    certifications: ['Ohio Licensed Plumber #PL-072944', 'Navien Certified Installer', 'OSHA 10'],
  },
  {
    id: '3',
    name: 'Tanya Williams',
    title: 'HVAC Technician',
    bio: "Tanya is one of Summit's most requested technicians. Known for her thorough diagnostics and clear communication, she specializes in heat pump and mini-split systems. NATE certified in both heating and cooling.",
    certifications: ['NATE Certified – Heating & Cooling', 'EPA 608 Universal', 'Mitsubishi Diamond Contractor'],
  },
  {
    id: '4',
    name: 'Chris Petrov',
    title: 'Comfort Advisor',
    bio: "Chris handles equipment quotes and helps homeowners navigate system options and financing. He's committed to honest, pressure-free consultations that focus on what's right for your home and budget.",
    certifications: ['ACCA Manual J Certified', 'GreenSky Finance Certified'],
  },
];

// ============================================================================
// STATS
// ============================================================================

export const stats: Stat[] = [
  { value: '22+', label: 'Years in Business', description: 'Serving Greater Cleveland since 2002' },
  { value: '14,000+', label: 'Service Calls', description: 'Jobs completed across Lake & Geauga counties' },
  { value: '4.9★', label: 'Google Rating', description: 'Based on 800+ verified reviews' },
  { value: '24/7', label: 'Emergency Service', description: 'Always available, no holiday surcharge' },
];

// ============================================================================
// CERTIFICATIONS
// ============================================================================

export const certifications: Certification[] = [
  { name: 'NATE Certified', issuer: 'North American Technician Excellence', icon: 'award' },
  { name: 'EPA 608 Universal', issuer: 'Environmental Protection Agency', icon: 'shield-check' },
  { name: 'BBB A+ Rated', issuer: 'Better Business Bureau', icon: 'star' },
  { name: 'Licensed & Insured', issuer: 'State of Ohio', icon: 'file-check' },
];

// ============================================================================
// SERVICE AREAS
// ============================================================================

export const serviceAreas: ServiceArea[] = [
  { city: 'Mentor', county: 'Lake' },
  { city: 'Willoughby', county: 'Lake' },
  { city: 'Painesville', county: 'Lake' },
  { city: 'Euclid', county: 'Cuyahoga' },
  { city: 'Eastlake', county: 'Lake' },
  { city: 'Wickliffe', county: 'Lake' },
  { city: 'Madison', county: 'Lake' },
  { city: 'Kirtland', county: 'Lake' },
  { city: 'Chardon', county: 'Geauga' },
  { city: 'Chesterland', county: 'Geauga' },
  { city: 'Concord Township', county: 'Lake' },
  { city: 'Waite Hill', county: 'Lake' },
  { city: 'Highland Heights', county: 'Cuyahoga' },
  { city: 'South Euclid', county: 'Cuyahoga' },
  { city: 'Lyndhurst', county: 'Cuyahoga' },
  { city: 'Cleveland Heights', county: 'Cuyahoga' },
];
