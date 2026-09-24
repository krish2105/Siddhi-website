/**
 * Product Specification & Bundle Architecture for Aurelle
 */
export interface ProductBundleConfig {
  id: string;
  name: string;
  badge?: string;
  heads: number;
  wands: number;
  caddies: number;
  price: number;
  originalPrice: number;
  savings: string;
  isPopular?: boolean;
  description: string;
  inclusions: string[];
}

export interface RefillPackConfig {
  id: string;
  heads: number;
  price: number;
  originalPrice: number;
  perHeadPrice: string;
  isPopular?: boolean;
  savings: string;
}

export const PRODUCT = {
  handle: "aurelle-kit",
  title: "The Aurelle System",
  category: "Architectural Bath Hardware & Touchless Hygiene",
  dimensionsMm: {
    caseW: 90,
    caseH: 120,
    caseD: 36,
    handleExtendedLen: 420,
  },
  colours: {
    porcelain: "#F5F5F8",
    mist: "#DAD9E8",
    graphite: "#1C1C26",
    champagne: "#C8A75A",
    lilacDeep: "#6D6A8C",
    signal: "#2F7D6B",
  },
  materials: {
    caddy: "Alabaster matte ABS composite with brushed champagne-gold PVD trim",
    wand: "Aviation-grade aluminum telescoping core with tactile gold slide-latch",
    pods: "Tri-layer biodegradable bio-cellulose sponge with ocean-mist disinfectant core",
    mount: "Heavy-duty 3M VHB water-resistant adhesive wall bracket (no drilling)",
  },
  bundles: [
    {
      id: "starter",
      name: "Single Bath Starter Kit",
      badge: "ESSENTIAL",
      heads: 7,
      wands: 1,
      caddies: 1,
      price: 1199,
      originalPrice: 1999,
      savings: "Save ₹800",
      description: "1x Ergonomic Gold Wand + 1x Wall Caddy + 7x Ocean Pods",
      inclusions: [
        "1x Aurelle Telescoping Wand with Champagne Gold Slider",
        "1x Wall Caddy (3M VHB No-Drill Wall Mount)",
        "7x Pre-loaded Antibacterial Foaming Pods",
        "Free Express Delivery Across India",
        "Cash on Delivery & UPI Enabled",
      ],
    },
    {
      id: "deluxe",
      name: "Deluxe Clean Pack",
      badge: "MOST POPULAR • BEST VALUE",
      heads: 21,
      wands: 1,
      caddies: 1,
      price: 1599,
      originalPrice: 2799,
      savings: "Save ₹1,200",
      isPopular: true,
      description: "1x Ergonomic Wand + 1x Wall Caddy + 21x Multi-Scent Pods (3 Months Supply)",
      inclusions: [
        "1x Aurelle Telescoping Wand with Champagne Gold Slider",
        "1x Wall Caddy with Champagne Gold Trim",
        "21x Antibacterial Pods (Ocean Breeze & Alpine Citrus)",
        "Free Priority Courier (2-3 Days)",
        "1-Year Hardware Warranty Included",
        "Cash on Delivery & UPI Enabled",
      ],
    },
    {
      id: "family",
      name: "Complete 2-Bath Master Set",
      badge: "LUXURY RESIDENCE",
      heads: 45,
      wands: 2,
      caddies: 2,
      price: 2499,
      originalPrice: 4499,
      savings: "Save ₹2,000",
      description: "2x Complete Wands + 2x Wall Caddies + 45x Antibacterial Pods",
      inclusions: [
        "2x Aurelle Telescoping Wands with Champagne Gold Slider",
        "2x Wall Caddies (For Master & Powder Bathrooms)",
        "45x Long-Life Deep Cleaning Pods (6+ Months)",
        "Free Express Air Shipping Across India",
        "Priority Concierge Support on WhatsApp",
        "1-Year Full Replacement Guarantee",
      ],
    },
  ] as ProductBundleConfig[],
  refillPacks: [
    {
      id: "refill-30",
      heads: 30,
      price: 699,
      originalPrice: 999,
      perHeadPrice: "₹23.30 / clean",
      savings: "Save ₹300",
    },
    {
      id: "refill-60",
      heads: 60,
      price: 1199,
      originalPrice: 1899,
      perHeadPrice: "₹19.98 / clean",
      isPopular: true,
      savings: "Save ₹700 (Best Value)",
    },
    {
      id: "refill-120",
      heads: 120,
      price: 2099,
      originalPrice: 3599,
      perHeadPrice: "₹17.49 / clean",
      savings: "Save ₹1,500 (Annual Supply)",
    },
  ] as RefillPackConfig[],
};
