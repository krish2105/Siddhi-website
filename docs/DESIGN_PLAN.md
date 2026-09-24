# DESIGN PLAN: Aurelle Luxe Store

## 1. Subject Grounding
- **Subject**: An architectural bathroom fixture: a compact wall-mountable caddy with a slim telescoping handle and disposable touchless cleaning pods.
- **Audience**: Affluent Indian urban homeowners (ages 28–50), luxury apartment renovators, design-conscious renters, and premium boutique hospitality owners.
- **Primary Job of the Site**: Transform a traditionally unpleasant, taboo bathroom chore into a calm, satisfying, touchless hardware ritual that commands genuine pride in modern bathrooms.

---

## 2. Design Tokens & Palette

| Token | Hex | Role | Usage |
|---|---|---|---|
| `Porcelain` | `#F5F5F8` | Page Background | Clean, luminous travertine alabaster tone |
| `Mist` | `#DAD9E8` | Surface & Cards | Soft lavender-grey hardware body tone |
| `Graphite` | `#1C1C26` | Deep Typography | High contrast, calm charcoal (never harsh 100% black) |
| `Champagne` | `#C8A75A` | Metallic Gold Accent | Trim, slide-latch, active focus rings, primary CTA borders |
| `Lilac Deep` | `#6D6A8C` | Muted Secondary | Subtle captions, inactive borders, secondary labels |
| `Signal` | `#2F7D6B` | In-Stock & Verified | Trust badges, pincode delivery confirmation |

---

## 3. Typography & Scale
- **Display Headings**: `Bricolage Grotesque` / `Space Grotesk` (Weight 600–700, tracking `-0.03em`, fluid `clamp()` sizing).
- **Body & UI**: `Instrument Sans` / `Plus Jakarta Sans` (Weight 400, 500, 600, line length strictly under 68 characters, sentence case).
- **Tone**: Calm, direct, confident, active voice. Zero emojis, zero fake urgency timers.

---

## 4. Radius & Spatial System
- **Hero Frame & Media**: `28px` rounded corners matching the physical 3:4 rounded-rectangle case.
- **Interactive Controls & Buttons**: `10px` rounded radius for tactile precision.
- **Pod & Latch Details**: Hexagonal geometry and pill-shaped sliders.

---

## 5. ASCII Wireframes

### 5.1 Home Hero Wireframe
```
+------------------------------------------------------------------------+
| [AURELLE]              The Ritual    Hardware    Refills    [Cart (1)] |
+------------------------------------------------------------------------+
|                                                                        |
|   THE TOUCHLESS TOILET WAND.           +---------------------------+   |
|   One handle. A fresh head             |                           |   |
|   every time.                          |      3D THREE.JS          |   |
|                                        |      INTERACTIVE CADDY    |   |
|   [Order Starter Kit - ₹1,199]         |      & EXTENDING WAND     |   |
|   [Explore 3D Mechanism ->]            |                           |   |
|                                        |  [Docked] [Extend] [Eject]|   |
|   * Free Express Shipping in India     +---------------------------+   |
|   * Cash on Delivery Available                                         |
+------------------------------------------------------------------------+
```

### 5.2 Product Page Wireframe (`/products/aurelle-kit`)
```
+------------------------------------------------------------------------+
| [Gallery Thumbnails]  |  THE AURELLE SYSTEM                            |
|                       |  ₹1,599 (Includes GST)                         |
| +-------------------+ |                                                |
| |                   | |  Select Curated Bundle:                        |
| |  Interactive 3D   | |  ( ) Starter (7 Pods) - ₹1,199                 |
| |  & AR Viewer      | |  (*) Deluxe Home (21 Pods) - ₹1,599 [Best]     |
| |                   | |  ( ) Master Set (45 Pods) - ₹2,499             |
| +-------------------+ |                                                |
| [View in Space (AR)]  |  Enter PIN Code: [ 400 001 ] [Check]           |
|                       |  ✓ Delivery in 2-3 Days to Mumbai              |
|                       |                                                |
|                       |  [ ADD TO CART - ₹1,599 ]   [ BUY VIA UPI ]    |
+------------------------------------------------------------------------+
```

### 5.3 Refills Reorder Wireframe (`/refills`)
```
+------------------------------------------------------------------------+
|                       EFFORTLESS REFILLS                               |
|   Running low? Pick a pack or scan the QR code inside your caddy.      |
|                                                                        |
|   +-------------------+  +-------------------+  +-------------------+  |
|   | 30 Pod Refill     |  | 60 Pod Refill     |  | 120 Pod Refill    |  |
|   | ₹699              |  | ₹1,199 [POPULAR]  |  | ₹2,099            |  |
|   | ₹23.30 / clean    |  | ₹19.98 / clean    |  | ₹17.49 / clean    |  |
|   | [Add to Cart]     |  | [Add to Cart]     |  | [Add to Cart]     |  |
|   +-------------------+  +-------------------+  +-------------------+  |
+------------------------------------------------------------------------+
```

---

## 6. Pass 2 Anti-Pattern Review
- **Anti-Pattern Check**:
  - No cream and terracotta or near-black with acid neon. Colors are directly sampled from the physical hardware (Mist lavender-grey and brushed Champagne gold).
  - No generic SaaS cards with identical rounded boxes. Varied editorial layouts with travertine photography and exploded technical schematics.
  - No fake discount countdown clocks, stock anxiety warnings, or fake review counts. Only verified Indian domestic reviews.
  - No blurry low-res imagery: ships with 8K ultra-realistic travertine studio photos, macro latch mechanics, and scientific exploded diagrams.
