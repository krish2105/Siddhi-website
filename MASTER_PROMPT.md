# MASTER PROMPT: Luxury 3D D2C Flagship Store (Claude Code, from scratch)

> **How to use:** 
> 1. Open a terminal in this folder (`/Users/krishnamathurm4pro/.gemini/antigravity-ide/scratch/aurelle-luxe-store`).
> 2. Run `claude` (or your Claude Code CLI).
> 3. Paste everything below this line as your first prompt.

---

## 0. ROLE AND OPERATING RULES

You are acting as a **senior creative technologist, principal website designer, and full-stack engineer** in one person. You are building a complete, production-quality D2C e-commerce website end to end for a new consumer home hygiene product brand in India. Work autonomously through the build phases. Do not stop to ask questions unless completely blocked; make a sensible decision, write it down in `DECISIONS.md`, and continue.

Rules for how you work:
1. **Design plan before code.** Define tokens, typography, radii, and layouts. Write the plan to `docs/DESIGN_PLAN.md`.
2. **No unfilled placeholders.** Ship with real, polished copy. Configurable client details live in `src/config/brand.config.ts` and `src/config/product.config.ts`.
3. **Verify, don't assume.** Run `npm run build` and typechecks after each phase. Ensure mobile responsiveness.
4. **Small, surgical, verifiable changes.** Keep the code clean and performant.

---

## 1. MISSION AND DEFINITION OF SUCCESS

Build the online store for a new physical product: a **compact wall-mountable case with a slim telescoping handle, used with disposable cleaning heads** (toilet cleaning category). The brand sells the product and its **refill heads** directly to customers across India.

The site must feel like a premium hardware brand (calm, precise, confident like Dyson, Aesop, or Apple), not a discount marketplace listing. It must beat the current category leader, Suvaam (suvaam.com), on clarity, speed, trust, and product experience.

**Success Criteria:**
- Visitor understands what the product is, how it works, and why it is superior in under 10 seconds.
- Interactive 3D product experience (rotate 360°, inspect dock, exploded pod view, click-eject trigger).
- Fast load on Indian 4G mobile devices (Lighthouse Performance 90+ on home and product pages).
- Smooth checkout with Indian payment methods: Cash on Delivery (COD), UPI (GPay/PhonePe), and Cards.
- Refills are treated as a first-class product with 2-tap reordering via an inside-case QR code flow.

---

## 2. PRODUCT SPECIFICATIONS (From Client Hardware Photo)

- **Wall Caddy Case**: Rounded-rectangle case (~3:4 face proportion, shallow depth), matte pale lavender-grey / warm alabaster body with a **champagne-gold edge trim** around the face opening.
- **Wand Handle**: Slim ergonomic telescoping handle with a **champagne-gold slide-latch switch** on the front face and a hanging loop at the top.
- **Cleaning Pod**: Disposable hexagonal sponge head with 3 distinct functional layers (outer charcoal limescale scrubber, core ocean-fresh antibacterial foaming detergent, and quick-release mechanical adapter).
- **Mechanism**: Press wand into pod to click-lock → contact with toilet water activates rich blue disinfectant lather → slide gold latch over trash bin to eject used pod with zero hand contact.

Working Configuration Defaults:

```ts
// src/config/brand.config.ts
export const BRAND = {
  name: "Aurelle", // Configurable working name; client can swap anytime
  tagline: "One handle. A fresh head every time.",
  domain: "aurelle.in",
  supportEmail: "concierge@aurelle.in",
  whatsapp: "+919876543210",
  city: "Mumbai, India",
  legalName: "Aurelle Hygiene Technologies Pvt Ltd",
  currency: "INR",
};

// src/config/product.config.ts
export const PRODUCT = {
  handle: "aurelle-kit",
  title: "The Aurelle System",
  dimensionsMm: { caseW: 90, caseH: 120, caseD: 36, handleExtendedLen: 420 },
  colours: {
    face: "#DAD9E8",
    trim: "#C8A75A",
    handle: "#D6D5E3",
    latch: "#C8A75A",
    spongeCore: "#0088DD",
    scrubLayer: "#2A2C30"
  },
  bundles: [
    { id: "starter", name: "Single Bath Starter Kit", heads: 7, price: 1199, originalPrice: 1999, savings: "Save ₹800" },
    { id: "deluxe", name: "Deluxe Clean Pack", heads: 21, price: 1599, originalPrice: 2799, savings: "Save ₹1,200", isPopular: true },
    { id: "family", name: "2-Bath Master Set", heads: 45, price: 2499, originalPrice: 4499, savings: "Save ₹2,000" }
  ],
  refills: [
    { id: "refill-20", count: 20, price: 699, perHead: "₹35/head" },
    { id: "refill-40", count: 40, price: 1199, perHead: "₹29/head", isPopular: true },
    { id: "refill-80", count: 80, price: 2099, perHead: "₹26/head" }
  ]
};
```

---

## 3. DESIGN DIRECTION & TOKENS

**Color Palette:**
- `Porcelain`: `#F5F5F8` (Warm alabaster background)
- `Mist`: `#DAD9E8` (Product lavender-grey for cards and surface highlights)
- `Graphite`: `#1C1C26` (Deep charcoal text and dark mode sections)
- `Champagne`: `#C8A75A` (Metallic gold trim and slide switch accent)
- `Lilac Deep`: `#6D6A8C` (Muted secondary text)
- `Signal`: `#2F7D6B` (Subtle green for in-stock and verified trust badges)

**Typography:**
- Display/Headings: `Bricolage Grotesque` or `Space Grotesk` (Weight 600–800, tight tracking `-0.03em`)
- Body/UI: `Instrument Sans` or `Plus Jakarta Sans` (Legible, sentence case)
- Tone: Calm, specific, active voice. Zero emojis in copy, zero fake countdown timers.

**Signature 3D Moment: "The Extend"**
- A scroll-pinned hero stage where the 3D case turns to face the user, gold trim catches specular light, latch slides, handle telescopes upward, a pod clicks on, and releases downward into the bin.

---

## 4. CORE SECTIONS TO IMPLEMENT

1. **Header**: Minimalist glassmorphic navigation with cart pill counter and quick links.
2. **Hero Stage**: Interactive 3D Canvas + In-Bathroom architectural travertine photograph.
3. **The 3-Second Ritual**: 3 sequential cards (Click & Lock, Scrub & Foaming Disinfection, Push-Slider Ejection).
4. **Capsule Engineering Breakdown**: Exploded view detailing the 3-layer pod technology.
5. **Bundle Selector (CRO Optimized)**: Interactive cards for Starter (₹1,199), Deluxe (₹1,599), and Master (₹2,499) with savings tags and COD badges.
6. **Refill Ecosystem & Inside-Box QR**: Dedicated section showing refill packs and `/qr/refill` 2-tap replenishment flow.
7. **The Comparison Matrix**: Traditional dirty bristle brush vs. Aurelle Touchless System.
8. **Indian Logistics & Trust Block**: 6-digit PIN code delivery check, WhatsApp concierge, and 7-day transit replacement.
9. **Verified Buyer Reviews**: 4.9★ rating with verified customer badges.
10. **Slide-Over Cart Drawer**: Quantity steppers, +₹699 refill upsell checkbox, COD/UPI/Card payment mode selector, and celebratory confetti checkout.
11. **Sticky Mobile Buy Bar**: Fixed bottom bar on mobile screens with quick order CTA.

---

## 5. COMMERCE ADAPTER PATTERN

Create an abstract commerce adapter (`src/lib/commerce/index.ts`):
- `mock.ts`: In-memory cart state, live bundle calculations, simulated GoKwik 1-Click checkout modal.
- `shopify.ts`: Storefront API integration.
- Controlled via `NEXT_PUBLIC_COMMERCE=mock|shopify` (defaults to `mock` so the app runs immediately).

Begin build now.
