import { useState, useEffect } from 'react';
import { AnnouncementMarquee } from './components/AnnouncementMarquee';
import { Navbar } from './components/Navbar';
import { LuxuryPreloader } from './components/LuxuryPreloader';
import { Hero } from './components/Hero';
import { HygieneBenefitsRibbon } from './components/HygieneBenefitsRibbon';
import { HowItWorks } from './components/HowItWorks';
import { ExplodedAnatomy } from './components/ExplodedAnatomy';
import { LuxuryGallery } from './components/LuxuryGallery';
import { VisualStoriesSection } from './components/VisualStoriesSection';
import { HouseholdCalculator } from './components/HouseholdCalculator';
import { BundleSelector } from './components/BundleSelector';
import { ComparisonTable } from './components/ComparisonTable';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { ProductDetailView } from './components/ProductDetailView';
import { RefillsView } from './components/RefillsView';
import { HospitalityView } from './components/HospitalityView';
import { HygieneScienceView } from './components/HygieneScienceView';
import { TrackOrderModal } from './components/TrackOrderModal';
import { PoliciesModal } from './components/PoliciesModal';
import { ArPreviewModal } from './components/ArPreviewModal';
import { ArchitecturalSpecStudio } from './components/ArchitecturalSpecStudio';
import { CheckoutView } from './components/CheckoutView';
import { VipLoginModal } from './components/VipLoginModal';
import { PRODUCT, type ProductBundleConfig } from './config/product.config';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'product' | 'refills' | 'ritual' | 'science' | 'hospitality' | 'checkout'>('home');
  const [selectedBundle, setSelectedBundle] = useState<ProductBundleConfig>(PRODUCT.bundles[1]); // Deluxe
  const [cartCount, setCartCount] = useState<number>(1);
  const [cartQuantity, setCartQuantity] = useState<number>(1);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isTrackOpen, setIsTrackOpen] = useState<boolean>(false);
  const [isArOpen, setIsArOpen] = useState<boolean>(false);
  const [isVipOpen, setIsVipOpen] = useState<boolean>(false);
  const [vipUserPhone, setVipUserPhone] = useState<string | null>(null);
  const [policyModalTab, setPolicyModalTab] = useState<'shipping' | 'returns' | 'privacy' | 'terms' | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('aurelle_vip_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.phone) setVipUserPhone(parsed.phone);
      } else {
        // Auto-show VIP offer after 5s once per session
        const shown = sessionStorage.getItem('aurelle_vip_prompt_shown');
        if (!shown) {
          const timer = setTimeout(() => {
            setIsVipOpen(true);
            sessionStorage.setItem('aurelle_vip_prompt_shown', 'true');
          }, 5000);
          return () => clearTimeout(timer);
        }
      }
    } catch {
      // Ignore storage restrictions
    }
  }, []);

  const handleSelectBundle = (bundle: ProductBundleConfig) => {
    setSelectedBundle(bundle);
  };

  const handleSelectBundleById = (bundleId: string) => {
    const found = PRODUCT.bundles.find((b) => b.id === bundleId);
    if (found) {
      setSelectedBundle(found);
      const el = document.getElementById('bundles');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCart = (bundle: ProductBundleConfig) => {
    setSelectedBundle(bundle);
    setIsCartOpen(true);
  };

  const handleProceedToCheckout = () => {
    setCurrentView('checkout');
    setIsCartOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddRefillPack = (_item: { id: string; name: string; price: number; heads: number }) => {
    // When adding a refill pack, simulate adding to cart
    setCartCount(prev => prev + 1);
    setIsCartOpen(true);
  };

  const scrollToBundles = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('bundles');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.getElementById('bundles');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToRitual = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('how-it-works');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.getElementById('how-it-works');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-zinc-900" style={{ background: 'var(--color-porcelain)' }}>
      {/* Award-Winning Boutique Entry Reveal / Refresh Preloader */}
      <LuxuryPreloader />

      {/* Top Running Announcement Marquee ("The Running Things" from Suvaam Reference) */}
      <AnnouncementMarquee />

      {/* Global Navigation Header */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenVip={() => setIsVipOpen(true)}
        vipUserPhone={vipUserPhone}
        onNavigate={(view) => {
          if (view === 'ritual') {
            scrollToRitual();
          } else {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onOpenTrack={() => setIsTrackOpen(true)}
        currentView={currentView}
      />

      {/* Main View Router */}
      <main style={{ flex: 1 }}>
        {currentView === 'home' && (
          <>
            {/* 1. Hero with Real-Time 3D WebGL Canvas & Editorial Photo */}
            <Hero
              onOrderNow={scrollToBundles}
              onExplore3D={scrollToRitual}
              onViewProduct={() => setCurrentView('product')}
              onOpenAr={() => setIsArOpen(true)}
            />

            {/* 1b. Architectural Hygiene Specification 4-Pillar Ribbon */}
            <HygieneBenefitsRibbon />

            {/* 2. The 3-Step Interactive Touchless Ritual */}
            <HowItWorks />

            {/* 3. The Exploded Anatomy of the 3-Layer Cleaning Pod */}
            <ExplodedAnatomy />

            {/* 4. Architectural Photography & Editorial Unboxing Gallery */}
            <LuxuryGallery />

            {/* 4b. Visual Stories Unfold: Vertical UGC Video Reels (Suvaam Reference) */}
            <VisualStoriesSection onOpenCart={() => setIsCartOpen(true)} />

            {/* 5. Household Bathrooms & Refill Savings Calculator */}
            <HouseholdCalculator onSelectBundle={handleSelectBundleById} />

            {/* 6. High-Converting Bundle & Pricing Selector in INR */}
            <BundleSelector
              selectedBundle={selectedBundle}
              onSelectBundle={handleSelectBundle}
              onAddToCart={handleAddToCart}
            />

            {/* 7. Traditional Dirty Brush vs Aurelle Comparison */}
            <ComparisonTable />

            {/* 8. Architectural Specification Studio & CAD Blueprints */}
            <ArchitecturalSpecStudio />

            {/* 9. Verified Customer Reviews from India */}
            <ReviewsSection />

            {/* 10. Comprehensive FAQ Section */}
            <FaqSection />
          </>
        )}

        {currentView === 'product' && (
          <ProductDetailView
            onAddToCart={handleAddToCart}
            onBackToHome={() => setCurrentView('home')}
          />
        )}

        {currentView === 'refills' && (
          <RefillsView
            onAddToCart={handleAddRefillPack}
            onBackToHome={() => setCurrentView('home')}
          />
        )}

        {currentView === 'science' && (
          <HygieneScienceView
            onBackToHome={() => setCurrentView('home')}
            onExploreHardware={() => setCurrentView('product')}
          />
        )}

        {currentView === 'hospitality' && (
          <HospitalityView
            onBackToHome={() => setCurrentView('home')}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutView
            selectedBundle={selectedBundle}
            vipUserPhone={vipUserPhone}
            onBackToHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onTrackOrder={(_orderId) => {
              setIsTrackOpen(true);
            }}
          />
        )}
      </main>

      {/* Luxury Footer */}
      <Footer
        onOpenPolicy={(tab) => setPolicyModalTab(tab)}
        onNavigate={(view) => {
          if (view === 'ritual') {
            scrollToRitual();
          } else {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />

      {/* Slide-in Cart Drawer with 1-Click Upsell & Simulated Checkout */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        selectedBundle={selectedBundle}
        quantity={cartQuantity}
        isVipMember={!!vipUserPhone}
        onOpenVip={() => setIsVipOpen(true)}
        onUpdateQuantity={(newQty) => {
          setCartQuantity(newQty);
          setCartCount(newQty);
        }}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Sticky Mobile Buy Now Bar */}
      <StickyMobileBar
        selectedBundle={selectedBundle}
        onOpenCart={() => setIsCartOpen(true)}
        onCheckout={handleProceedToCheckout}
      />

      {/* Order Tracking Modal */}
      <TrackOrderModal
        isOpen={isTrackOpen}
        onClose={() => setIsTrackOpen(false)}
      />

      {/* Legal & Consumer Policies Modal */}
      <PoliciesModal
        isOpen={policyModalTab !== null}
        initialTab={policyModalTab || 'shipping'}
        onClose={() => setPolicyModalTab(null)}
      />

      {/* Augmented Reality (AR) 3D Room Viewer Modal */}
      <ArPreviewModal
        isOpen={isArOpen}
        onClose={() => setIsArOpen(false)}
      />

      {/* 1-Click Aurelle Privé VIP FastPass Login & Member Offers Modal */}
      <VipLoginModal
        isOpen={isVipOpen}
        onClose={() => setIsVipOpen(false)}
        onLoginSuccess={(phone) => {
          setVipUserPhone(phone);
        }}
      />
    </div>
  );
}

export default App;
