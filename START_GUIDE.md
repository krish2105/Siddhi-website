# Quick Start & Terminal Command Guide

All project files, 3D interactive code, luxury visual renders, and master prompts are ready in this folder:
`/Users/krishnamathurm4pro/.gemini/antigravity-ide/scratch/aurelle-luxe-store`

---

## 1. Quick Terminal Commands to Run the Website

### Step 1: Open Terminal and Navigate to the Folder
```bash
cd /Users/krishnamathurm4pro/.gemini/antigravity-ide/scratch/aurelle-luxe-store
```

### Step 2: Start the Local Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
- **On Your Computer**: Open [http://localhost:5173/](http://localhost:5173/)
- **On Your Phone (Same WiFi)**: Open `http://192.168.1.3:5173/` (or the network IP shown in your terminal) to experience the responsive mobile layout and sticky buy bar!

---

## 2. How to Run the Production Build Check

To verify that the code compiles with zero TypeScript errors and ultra-fast performance:
```bash
cd /Users/krishnamathurm4pro/.gemini/antigravity-ide/scratch/aurelle-luxe-store
npm run build
```

---

## 3. How to Launch Claude Code in This Directory

If you want Claude Code to iterate or expand any part of the project:
```bash
cd /Users/krishnamathurm4pro/.gemini/antigravity-ide/scratch/aurelle-luxe-store
claude
```
Then paste the contents of `MASTER_PROMPT.md` as your initial prompt.

---

## 4. How to Deploy to Vercel in 60 Seconds

To share a live public link with the 4 partners so they can test it on their own iPhones / Androids:

```bash
cd /Users/krishnamathurm4pro/.gemini/antigravity-ide/scratch/aurelle-luxe-store
npx vercel
```
Follow the 3 quick prompts (login with GitHub/Email, select default settings), and Vercel will instantly generate a live public link (e.g. `https://aurelle-luxe-store.vercel.app`).

---

## 5. File Inventory in This Folder

- `MASTER_PROMPT.md`: Complete Master Prompt for Claude Code.
- `QUOTATION_AND_PITCH.md`: 3-Tier pricing strategy in INR & answers to pitch the 4 partners.
- `COMPETITOR_ANALYSIS.md`: Suvaam teardown, Indian DTC margins, and GoKwik RTO prevention.
- `START_GUIDE.md`: This guide.
- `src/components/WandCanvas3D.tsx`: Real-time 3D Three.js canvas (360° orbit, docked/exploded/eject modes).
- `src/components/Hero.tsx`: Luxury hero stage with real-time 3D + editorial in-bathroom travertine photograph.
- `src/components/HowItWorks.tsx`: The 3-Step touchless ritual.
- `src/components/ExplodedAnatomy.tsx`: 3D layer breakdown of the cleaning pod.
- `src/components/BundleSelector.tsx`: Interactive bundle pricing in INR (₹1,199 / ₹1,599 / ₹2,499).
- `src/components/CartDrawer.tsx`: Slide-over cart with +₹699 refill upsell, COD/UPI selector, and confetti checkout.
- `src/components/StickyMobileBar.tsx`: Sticky mobile buy bar.
- `public/assets/aeris_hero.jpg`: Photorealistic in-bathroom studio photograph.
- `public/assets/pod_exploded.jpg`: 3D exploded scientific diagram of the 3-layer pod.
