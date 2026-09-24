export interface Bundle {
  id: string;
  name: string;
  badge?: string;
  spongeCount: number;
  wandsCount: number;
  price: number;
  originalPrice: number;
  savings: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export const PRODUCT_BUNDLES: Bundle[] = [
  {
    id: 'starter',
    name: 'Single Bath Starter Kit',
    spongeCount: 7,
    wandsCount: 1,
    price: 1199,
    originalPrice: 1999,
    savings: 'Save ₹800 (40% OFF)',
    description: '1x Ergonomic Gold Wand + 1x Wall-Mount Caddy + 7x Ocean Fresh Pods',
    features: [
      '1x AERIS Luxe Wand with Gold Slider',
      '1x Wall Caddy (No-Drilling Adhesive Mount)',
      '7x Self-Activating Antibacterial Pods',
      'Free Shipping Across India',
      'Cash on Delivery Available',
    ],
  },
  {
    id: 'deluxe',
    name: 'Deluxe Clean Pack',
    badge: 'MOST POPULAR • BEST VALUE',
    spongeCount: 21,
    wandsCount: 1,
    price: 1599,
    originalPrice: 2799,
    savings: 'Save ₹1,200 (43% OFF)',
    description: '1x Ergonomic Gold Wand + 1x Wall-Mount Caddy + 21x Multi-Scent Pods (3 Months Supply)',
    features: [
      '1x AERIS Luxe Wand with Gold Slider',
      '1x Wall Caddy (No-Drilling Adhesive Mount)',
      '21x Multi-Scent Pods (Ocean & Lemon)',
      'Free Express Delivery (2-3 Days)',
      'Cash on Delivery Available',
      '1 Year Product Warranty',
    ],
    isPopular: true,
  },
  {
    id: 'family',
    name: 'Complete 2-Bath Family Kit',
    badge: 'LUXURY HOME PACK',
    spongeCount: 45,
    wandsCount: 2,
    price: 2499,
    originalPrice: 4499,
    savings: 'Save ₹2,000 (45% OFF)',
    description: '2x Ergonomic Gold Wands + 2x Wall Caddies + 45x Antibacterial Pods (Full Home Setup)',
    features: [
      '2x AERIS Luxe Wands with Gold Slider',
      '2x Wall Caddies with Champagne Gold Trim',
      '45x Super Foaming Germicidal Pods',
      'Covers Master & Guest Bathrooms',
      'Free Priority Courier + Free Scent Pod Samples',
      'Cash on Delivery Available',
    ],
  },
];

export const REFILL_ADDONS = [
  {
    id: 'refill-20',
    name: 'Extra 20 Refill Pods (Ocean Mist)',
    price: 699,
    originalPrice: 999,
    image: '/assets/pod_exploded.jpg',
  },
  {
    id: 'refill-40',
    name: 'Extra 40 Refill Pods (Multi-Fragrance Pack)',
    price: 1199,
    originalPrice: 1799,
    image: '/assets/pod_exploded.jpg',
  },
];

export const COMPARISON_FEATURES = [
  {
    feature: 'Hygiene & Germ Contact',
    traditional: 'Harbors over 10M bacteria; dirty drippings accumulate in container',
    aeris: '100% Touch-free click & eject; clean dry wand stored in aerated pod',
  },
  {
    feature: 'Aesthetic & Modern Decor',
    traditional: 'Ugly plastic brush hidden in dark bathroom corner',
    aeris: 'Alabaster white & champagne-gold trim; looks like luxury hotel hardware',
  },
  {
    feature: 'Cleaning Detergent Requirement',
    traditional: 'Must pour harsh acid/chemical bottles separately',
    aeris: 'Built-in active foaming germicide inside every single dissolvable pad',
  },
  {
    feature: 'Under-the-Rim Reach',
    traditional: 'Stiff bristled head scratches ceramic and misses tight corners',
    aeris: 'Hexagonal flexible sponge contours 360° under the rim effortlessly',
  },
  {
    feature: 'Mounting & Floor Clutter',
    traditional: 'Must sit on wet bathroom floor where water pools',
    aeris: 'Float-mounted with zero-drill strong acrylic adhesive',
  },
];

export const REVIEWS = [
  {
    id: 1,
    name: 'Ananya Sharma',
    city: 'South Delhi, DL',
    rating: 5,
    title: 'Looks like it belongs in a 5-star hotel bathroom',
    comment: 'I hated the traditional dirty plastic brushes so much. The AERIS wand with the gold accents looks gorgeous on our Italian marble wall. The click-eject slider works smoothly and cleans so fast without touching anything!',
    verified: true,
    date: '3 days ago',
  },
  {
    id: 2,
    name: 'Vikramaditya Singhania',
    city: 'Bandra West, Mumbai',
    rating: 5,
    title: 'Zero drips, ocean scent is amazing',
    comment: 'Best home purchase this year. The foaming detergent in the blue sponge head activated instantly with water. No need for separate Harpic bottles. The 21-pack is great value.',
    verified: true,
    date: '1 week ago',
  },
  {
    id: 3,
    name: 'Dr. Radhika Menon',
    city: 'Indiranagar, Bengaluru',
    rating: 5,
    title: 'Medical grade hygiene with stunning design',
    comment: 'As a physician, standard toilet brushes are a microbiological nightmare. This disposable touchless system solves the cross-contamination completely. Highly recommended for every family.',
    verified: true,
    date: '2 weeks ago',
  },
];

export const FAQS = [
  {
    q: 'How does the touchless click-and-eject mechanism work?',
    a: 'Simply press the wand tip onto a fresh sponge pod inside the caddy until you hear a secure "click". Clean your bowl, then hold the wand over the waste bin and push the champagne-gold slider button forward. The used head drops directly into the bin without you ever touching it.',
  },
  {
    q: 'Does it require separate toilet cleaner liquid like Harpic?',
    a: 'No! Each sponge pod contains concentrated germicidal and limescale-dissolving cleaner that activates upon contact with water, creating a rich blue ocean-fresh disinfecting foam.',
  },
  {
    q: 'Will the wall-mount adhesive damage my bathroom tiles?',
    a: 'Not at all. The caddy uses advanced waterproof nano-acrylic adhesive that firmly adheres to ceramic, marble, glass, and tiles without any drilling or wall damage. It can also be removed cleanly without residue.',
  },
  {
    q: 'Where do I purchase refill sponges once I run out?',
    a: 'You can order refill packs (20 or 40 pods) anytime on this website with free express delivery, or subscribe to receive fresh refills automatically every 60 days.',
  },
  {
    q: 'Is Cash on Delivery (COD) available?',
    a: 'Yes! We offer Cash on Delivery across 24,000+ PIN codes in India, along with instant UPI (Google Pay, PhonePe, Paytm) and credit/debit card payments.',
  },
];
