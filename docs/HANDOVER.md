# HANDOVER GUIDE: Aurelle Luxe Store

Welcome to the client handover documentation for **Aurelle**. This guide details how your product team can manage inventory, connect your live Shopify store, swap 3D models, and maintain commercial operations across India.

---

## 1. Connecting Your Live Shopify Store
The website currently operates with a high-fidelity **Mock Commerce Adapter** (`src/lib/commerce/mock.ts`) that simulates real cart additions, bundle discounts, and checkout flows.

To switch to your live Shopify store:
1. In your Shopify Admin, create a private app or head to **Settings > Apps and sales channels > Develop apps**.
2. Enable the **Storefront API** with read access to products, inventory, and cart mutations.
3. In your project environment file (`.env.local` or Vercel Environment Variables), set:
   ```env
   VITE_COMMERCE=shopify
   VITE_SHOPIFY_STORE_DOMAIN=your-brand.myshopify.com
   VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxx
   ```
4. Build and redeploy. The site will immediately fetch real-time inventory and route checkouts to your hosted Shopify Checkout URL with UPI, Cards, and Net Banking enabled.

---

## 2. Managing Prices, Bundles & Refills
All product metadata, INR pricing, and bundle configurations are centralized in a single file:
👉 `src/config/product.config.ts`

- **To update bundle prices**: edit the `price` and `originalPrice` fields in `PRODUCT.bundles`.
- **To add or edit refill pack sizes**: adjust `PRODUCT.refillPacks`.
- **To update product dimensions or materials**: adjust `PRODUCT.dimensionsMm` and `PRODUCT.materials`.

---

## 3. Swapping the 3D Model with CAD / GLB
The website currently renders a high-performance procedural Three.js model in `src/components/WandCanvas3D.tsx`.

When your industrial design team delivers a finalized GLB file:
1. Optimize the 3D model using gltf-transform:
   ```bash
   npx @gltf-transform/cli optimize in.glb public/models/product.glb --compress draco --texture-compress webp
   ```
2. Ensure the node names match the following structure:
   - `Case` (The wall-mounted caddy body)
   - `Trim` (The champagne-gold metallic outer rim)
   - `HandleSeg1`, `HandleSeg2`, `HandleSeg3` (The telescoping segments)
   - `Latch` (The gold sliding release switch)
   - `Head` (The disposable cleaning pod)
3. For iOS AR Quick Look, generate a corresponding `product.usdz` file and place it in `public/models/product.usdz`.

---

## 4. Indian D2C Payment Gateways & Cash on Delivery (COD)
- **UPI & Cards**: Connect **Razorpay for Shopify** or **Cashfree**. In India, Shopify Payments is not natively supported; Razorpay provides one-click UPI (GPay, PhonePe, Paytm, CRED).
- **Cash on Delivery (COD)**: To reduce Return to Origin (RTO), consider pairing COD with **GoKwik** or **Shiprocket Checkout** for automated OTP verification before dispatch.
- **GST Invoices**: Enter your 15-digit GSTIN in `src/config/brand.config.ts`. Once added, it will automatically render in the footer and order receipts.

---

## 5. What to Do If Something Breaks
- **Build Fails**: Run `npm run build` in the terminal to inspect TypeScript compiler errors.
- **Images Not Loading**: Verify that image files exist in `public/assets/` and paths are referenced with leading slashes (`/assets/...`).
- **Pincode Lookup**: The demo lookup checks Indian PIN codes in `src/components/CartDrawer.tsx` and `src/components/BundleSelector.tsx`. Replace with your Shiprocket or Delhivery API token when going live.
