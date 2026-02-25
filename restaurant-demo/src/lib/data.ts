export const siteConfig = {
  name: 'Ember & Oak',
  tagline: 'Wood-fired cooking. Honest ingredients.',
  phone: '2165540182',
  phoneDisplay: '(216) 554-0182',
  email: 'reservations@emberandoak.com',
  address: '831 Prospect Ave E',
  city: 'Cleveland, OH 44115',
  openTable: '#',
  instagram: '@emberandoak',
  hours: {
    dinnerWeekday: 'Tue–Thu: 5pm – 10pm',
    dinnerWeekend: 'Fri–Sat: 5pm – 11pm',
    brunch: 'Sun: 10am – 2pm',
    closed: 'Closed Monday',
  },
};

export const menuSections = [
  {
    id: 'starters',
    label: 'To Start',
    items: [
      {
        name: 'Wood-Roasted Bone Marrow',
        description: 'Parsley gremolata, pickled shallot, grilled country bread',
        price: 22,
        note: '',
      },
      {
        name: 'Ember-Charred Beet Salad',
        description: 'Whipped goat cheese, candied walnuts, aged sherry vinegar, arugula',
        price: 16,
        note: 'Vegetarian',
      },
      {
        name: 'Charcuterie Board',
        description: 'Selection of house-cured meats, seasonal preserves, mustards, levain',
        price: 28,
        note: '',
      },
      {
        name: 'Seared Scallops',
        description: 'Cauliflower purée, caper brown butter, crispy capers, micro herbs',
        price: 26,
        note: '',
      },
    ],
  },
  {
    id: 'mains',
    label: 'From the Fire',
    items: [
      {
        name: '40-Day Dry-Aged Ribeye',
        description: '16oz prime cut, smoked bone marrow butter, roasted garlic jus, grilled asparagus',
        price: 68,
        note: '',
      },
      {
        name: 'Oak-Smoked Duck Breast',
        description: 'Sour cherry gastrique, duck fat fingerlings, pickled red cabbage',
        price: 44,
        note: '',
      },
      {
        name: 'Whole Roasted Branzino',
        description: 'Lemon-caper vinaigrette, fennel salad, crispy capers, torn herbs',
        price: 42,
        note: '',
      },
      {
        name: 'Forest Mushroom Risotto',
        description: 'Truffle oil, aged Parmigiano, lemon zest, crispy sage',
        price: 34,
        note: 'Vegetarian',
      },
    ],
  },
  {
    id: 'sides',
    label: 'Sides',
    items: [
      { name: 'Ember-Roasted Brussels', description: 'Smoked bacon, maple, apple cider vinegar', price: 12, note: '' },
      { name: 'Duck Fat Frites', description: 'House aioli, fresh herbs', price: 12, note: '' },
      { name: 'Charred Broccolini', description: 'Calabrian chili, lemon, anchovy butter', price: 11, note: '' },
      { name: 'Mac & Gruyère', description: 'Aged gruyère, white cheddar, toasted breadcrumbs', price: 13, note: 'Vegetarian' },
    ],
  },
  {
    id: 'desserts',
    label: 'To Finish',
    items: [
      { name: 'Burnt Honey Panna Cotta', description: 'Seasonal berry coulis, candied pistachios', price: 14, note: '' },
      { name: 'Dark Chocolate Torte', description: 'Salted caramel, hazelnut praline, Tahitian vanilla crème', price: 14, note: '' },
      { name: 'Cheese Selection', description: 'Three seasonal selections, house honeycomb, lavash crackers', price: 22, note: '' },
    ],
  },
];

export const featuredDishes = [
  {
    id: 1,
    name: '40-Day Dry-Aged Ribeye',
    description: 'Prime cut over oak. Bone marrow butter. The centerpiece of the Ember & Oak experience.',
    price: 68,
    image: '/images/dish-ribeye.jpg',
    tag: 'Signature',
  },
  {
    id: 2,
    name: 'Oak-Smoked Duck Breast',
    description: 'Slow-smoked over white oak, finished with sour cherry gastrique and house-pickled cabbage.',
    price: 44,
    image: '/images/dish-duck.jpg',
    tag: 'Chef\'s Choice',
  },
  {
    id: 3,
    name: 'Wood-Roasted Bone Marrow',
    description: 'Roasted in the wood oven, finished with parsley gremolata and grilled country bread.',
    price: 22,
    image: '/images/dish-bone-marrow.jpg',
    tag: 'Fan Favorite',
  },
];

export const pressQuotes = [
  {
    quote: 'The most compelling fire-driven kitchen in Cleveland. The ribeye alone is worth the drive.',
    source: 'Cleveland Magazine',
    year: '2024',
  },
  {
    quote: 'A James Beard-worthy dining room that feels both refined and genuinely alive.',
    source: 'Scene Magazine',
    year: '2023',
  },
  {
    quote: 'Ember & Oak is what happens when a chef stops chasing trends and starts trusting the fire.',
    source: 'Eater Cleveland',
    year: '2024',
  },
];
