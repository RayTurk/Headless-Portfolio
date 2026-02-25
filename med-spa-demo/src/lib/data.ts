export const siteConfig = {
  name: 'Luminary Aesthetics',
  tagline: 'Refined results. Radiant you.',
  phone: '4408821900',
  phoneDisplay: '(440) 882-1900',
  email: 'hello@luminaryaesthetics.com',
  address: '14 Chagrin Falls Blvd, Suite 200',
  city: 'Chagrin Falls, OH 44022',
  hours: 'Tue–Sat, 9am–6pm',
  instagramHandle: '@luminaryaesthetics',
};

export const treatments = [
  {
    id: 'botox',
    name: 'Botox & Dysport',
    category: 'Injectables',
    tagline: 'Smooth lines. Natural movement.',
    description:
      'Precisely placed neuromodulators soften crow\'s feet, forehead lines, and frown lines — delivering a refreshed look that still moves naturally.',
    duration: '30 min',
    startingAt: 280,
    image: '/images/treatment-botox.jpg',
  },
  {
    id: 'filler',
    name: 'Dermal Fillers',
    category: 'Injectables',
    tagline: 'Restore volume. Define contours.',
    description:
      'Hyaluronic acid fillers restore lost volume, lift cheeks, define the jawline, and enhance lips — with results lasting 12–18 months.',
    duration: '45 min',
    startingAt: 650,
    image: '/images/treatment-filler.jpg',
  },
  {
    id: 'microneedling',
    name: 'RF Microneedling',
    category: 'Skin Resurfacing',
    tagline: 'Tighter skin. Smaller pores.',
    description:
      'Radiofrequency energy delivered through fine needles stimulates deep collagen production — improving texture, tone, and firmness with minimal downtime.',
    duration: '60 min',
    startingAt: 450,
    image: '/images/treatment-microneedling.jpg',
  },
  {
    id: 'chemical-peel',
    name: 'Medical-Grade Peels',
    category: 'Skin Resurfacing',
    tagline: 'Reveal clearer, brighter skin.',
    description:
      'Customized chemical exfoliation treatments targeting hyperpigmentation, acne scarring, and uneven texture — tailored to your skin type.',
    duration: '45 min',
    startingAt: 175,
    image: '/images/treatment-peel.jpg',
  },
  {
    id: 'laser',
    name: 'Laser Skin Rejuvenation',
    category: 'Laser Treatments',
    tagline: 'Clarity. Evenness. Glow.',
    description:
      'IPL and fractional laser treatments address sun damage, redness, and fine lines — with a series of 3 treatments for optimal results.',
    duration: '45 min',
    startingAt: 395,
    image: '/images/treatment-laser.jpg',
  },
  {
    id: 'hydrafacial',
    name: 'HydraFacial MD',
    category: 'Facials',
    tagline: 'Instant glow. Zero downtime.',
    description:
      'The gold-standard deep cleanse: extraction, exfoliation, and targeted serum infusion — visibly radiant skin in under an hour.',
    duration: '50 min',
    startingAt: 225,
    image: '/images/treatment-hydrafacial.jpg',
  },
];

export const teamMembers = [
  {
    id: 1,
    name: 'Dr. Claire Ashford',
    title: 'Medical Director & Injector',
    credentials: 'MD, Board Certified Dermatologist',
    bio: 'Dr. Ashford trained at Cleveland Clinic before founding Luminary in 2017. Her approach centers on facial harmony — enhancing what\'s uniquely yours, never erasing it.',
    image: '/images/team-claire.jpg',
  },
  {
    id: 2,
    name: 'Jessica Vance',
    title: 'Lead Aesthetic Nurse Practitioner',
    credentials: 'FNP-BC, 8 Years Experience',
    bio: 'Jessica specializes in subtle, natural-looking injectables and laser treatments. Her loyal clientele return not just for the results, but for her calming, consultative approach.',
    image: '/images/team-jessica.jpg',
  },
  {
    id: 3,
    name: 'Mara Ellis',
    title: 'Licensed Medical Aesthetician',
    credentials: 'LMA, HydraFacial Certified',
    bio: 'With a background in clinical skincare, Mara designs result-driven facial protocols and works closely with our injectors to optimize skin health alongside treatments.',
    image: '/images/team-mara.jpg',
  },
];

export const testimonials = [
  {
    id: 1,
    quote:
      'Dr. Ashford is the only injector I trust. My results look completely natural — my friends keep asking if I\'ve just been on vacation. Worth every penny.',
    name: 'Katharine R.',
    location: 'Chagrin Falls',
    treatment: 'Botox & Lip Filler',
  },
  {
    id: 2,
    quote:
      'I was nervous about my first Botox appointment, but the consultation alone made me so comfortable. The space is gorgeous, the staff is warm, and the results speak for themselves.',
    name: 'Michelle T.',
    location: 'Solon',
    treatment: 'First Botox Visit',
  },
  {
    id: 3,
    quote:
      'Three microneedling sessions in and my skin has never looked this good — even my dermatologist commented on the improvement in my pore texture.',
    name: 'Diane S.',
    location: 'Pepper Pike',
    treatment: 'RF Microneedling Series',
  },
];

export const awards = [
  'Best Medical Spa — Crain\'s Cleveland Business, 2023',
  'Top Rated Injector — RealSelf, 2022–2024',
  'Allergan Diamond Provider',
  'HydraFacial Platinum Practice',
];
