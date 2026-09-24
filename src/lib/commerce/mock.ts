import type { Commerce, CommerceProduct, Cart } from "./index";
import { PRODUCT } from "../../config/product.config";

// In-memory mock storage
const mockProducts: CommerceProduct[] = [
  {
    id: "prod-aurelle-kit",
    handle: PRODUCT.handle,
    title: PRODUCT.title,
    description: "The wall-mounted touchless toilet cleaning system. Single-use biodegradable foaming pods with zero hand contact.",
    category: PRODUCT.category,
    images: [
      "/assets/aurelle_hero_travertine.jpg",
      "/assets/aurelle_wand_macro.jpg",
      "/assets/aurelle_pod_exploded.jpg",
    ],
    variants: PRODUCT.bundles.map((b) => ({
      id: `var-${b.id}`,
      title: b.name,
      price: b.price,
      originalPrice: b.originalPrice,
      availableForSale: true,
      headsCount: b.heads,
    })),
  },
  {
    id: "prod-refills",
    handle: "aurelle-refills",
    title: "Aurelle Pod Refills",
    description: "Pre-loaded ocean antibacterial foaming pods. Click on, clean, release directly into waste bin.",
    category: "Refill Packs",
    images: [
      "/assets/aurelle_pod_exploded.jpg",
      "/assets/aurelle_wand_macro.jpg",
    ],
    variants: PRODUCT.refillPacks.map((r) => ({
      id: `var-${r.id}`,
      title: `${r.heads} Pack Refill (${r.perHeadPrice})`,
      price: r.price,
      originalPrice: r.originalPrice,
      availableForSale: true,
      headsCount: r.heads,
    })),
  },
];

let globalCart: Cart = {
  id: "cart-mock-session",
  checkoutUrl: "/checkout",
  lines: [
    {
      id: "line-deluxe",
      variantId: "var-deluxe",
      title: "Deluxe Clean Pack (21 Pods)",
      price: 1599,
      quantity: 1,
      headsCount: 21,
      image: "/assets/aurelle_hero_travertine.jpg",
    },
  ],
  subtotal: 1599,
  taxIncluded: true,
  currency: "INR",
};

export const MockCommerce: Commerce = {
  async getProduct(handle: string): Promise<CommerceProduct | null> {
    const product = mockProducts.find((p) => p.handle === handle);
    return product || null;
  },

  async getProducts(): Promise<CommerceProduct[]> {
    return mockProducts;
  },

  async createCart(): Promise<Cart> {
    globalCart = {
      id: `cart-${Date.now()}`,
      checkoutUrl: "/checkout",
      lines: [],
      subtotal: 0,
      taxIncluded: true,
      currency: "INR",
    };
    return { ...globalCart };
  },

  async addToCart(
    _cartId: string,
    lines: { variantId: string; quantity: number }[]
  ): Promise<Cart> {
    for (const item of lines) {
      let matchedTitle = "Aurelle Product";
      let matchedPrice = 1199;
      let matchedHeads = 7;
      let matchedImg = "/assets/aurelle_hero_travertine.jpg";

      for (const prod of mockProducts) {
        const v = prod.variants.find((v) => v.id === item.variantId);
        if (v) {
          matchedTitle = v.title;
          matchedPrice = v.price;
          matchedHeads = v.headsCount || 7;
          matchedImg = prod.images[0] || "/assets/aurelle_hero_travertine.jpg";
          break;
        }
      }

      const existingIndex = globalCart.lines.findIndex(
        (l) => l.variantId === item.variantId
      );
      if (existingIndex > -1) {
        globalCart.lines[existingIndex].quantity += item.quantity;
      } else {
        globalCart.lines.push({
          id: `line-${Date.now()}-${Math.random().toString(36).substring(7)}`,
          variantId: item.variantId,
          title: matchedTitle,
          price: matchedPrice,
          quantity: item.quantity,
          headsCount: matchedHeads,
          image: matchedImg,
        });
      }
    }

    globalCart.subtotal = globalCart.lines.reduce(
      (sum, l) => sum + l.price * l.quantity,
      0
    );
    return { ...globalCart };
  },

  async updateCart(
    _cartId: string,
    lines: { id: string; quantity: number }[]
  ): Promise<Cart> {
    for (const update of lines) {
      if (update.quantity <= 0) {
        globalCart.lines = globalCart.lines.filter((l) => l.id !== update.id);
      } else {
        const line = globalCart.lines.find((l) => l.id === update.id);
        if (line) {
          line.quantity = update.quantity;
        }
      }
    }
    globalCart.subtotal = globalCart.lines.reduce(
      (sum, l) => sum + l.price * l.quantity,
      0
    );
    return { ...globalCart };
  },

  async getCart(_cartId: string): Promise<Cart | null> {
    return { ...globalCart };
  },
};
