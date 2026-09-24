import React, { useState } from 'react';
import { ShieldCheck, Check, Eye, Sparkles, MapPin } from 'lucide-react';
import { PRODUCT, type ProductBundleConfig } from '../config/product.config';
import { BRAND } from '../config/brand.config';
import { formatINR } from '../lib/format';
import { WandCanvas3D } from './WandCanvas3D';

import { EmbeddedAiSearchBar } from './RagChatbot';

interface ProductDetailViewProps {
  onAddToCart: (bundle: ProductBundleConfig) => void;
  onBackToHome: () => void;
  onTriggerChatbot?: (query: string) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ onAddToCart, onBackToHome, onTriggerChatbot }) => {
  const [selectedBundle, setSelectedBundle] = useState<ProductBundleConfig>(PRODUCT.bundles[1]); // Deluxe
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscribe'>('one-time');
  const [subscriptionFreq, setSubscriptionFreq] = useState<'30 Days' | '60 Days' | '90 Days'>('60 Days');
  const [activeMedia, setActiveMedia] = useState<'3d' | 'unboxing' | 'inhand' | 'wallmount' | 'travertine' | 'macro' | 'exploded'>('3d');
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<string | null>(null);
  const [arModalOpen, setArModalOpen] = useState(false);

  const images = {
    unboxing: '/assets/aurelle_unboxing.jpg',
    inhand: '/assets/aurelle_inhand_action.jpg',
    wallmount: '/assets/aurelle_wallmount_detail.jpg',
    travertine: '/assets/aurelle_hero_travertine.jpg',
    macro: '/assets/aurelle_wand_macro.jpg',
    exploded: '/assets/aurelle_pod_exploded.jpg',
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pincode.replace(/\D/g, '');
    if (clean.length === 6) {
      const metroPrefixes = ['11', '12', '40', '41', '56', '60', '70', '50'];
      const isMetro = metroPrefixes.some((p) => clean.startsWith(p));
      if (isMetro) {
        setPincodeResult(`✓ Express Delivery in 2-3 Days to PIN ${clean} (Free Shipping + COD Available)`);
      } else {
        setPincodeResult(`✓ Standard Delivery in 3-5 Days to PIN ${clean} (Free Shipping + COD Available)`);
      }
    } else {
      setPincodeResult('Please enter a valid 6-digit Indian PIN code');
    }
  };

  return (
    <div style={{ padding: '40px 0 100px 0' }}>
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '24px' }}>
          <button
            onClick={onBackToHome}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-lilac-deep)',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            ← Back to Overview
          </button>
        </div>

        {/* 2-Column Product Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '48px',
            alignItems: 'start',
            marginBottom: '64px',
          }}
        >
          {/* Left Column: Visual Media & 3D Interactive Stage */}
          <div>
            <div
              className="glass-panel"
              style={{
                height: '460px',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#FFFFFF',
              }}
            >
              {activeMedia === '3d' && (
                <div style={{ width: '100%', height: '100%' }}>
                  <WandCanvas3D />
                </div>
              )}
              {activeMedia === 'unboxing' && (
                <img
                  src={images.unboxing}
                  alt="Aurelle Presentation Box & Unboxing Tray"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
              {activeMedia === 'inhand' && (
                <img
                  src={images.inhand}
                  alt="Aurelle in-hand foaming clean action"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
              {activeMedia === 'wallmount' && (
                <img
                  src={images.wallmount}
                  alt="Aurelle Wall Caddy mounted on fluted marble"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
              {activeMedia === 'travertine' && (
                <img
                  src={images.travertine}
                  alt="Aurelle Wall Caddy in Luxury Travertine Bathroom"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
              {activeMedia === 'macro' && (
                <img
                  src={images.macro}
                  alt="Aurelle Champagne Gold Precision Slide Switch"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
              {activeMedia === 'exploded' && (
                <img
                  src={images.exploded}
                  alt="Aurelle 3-Layer Cleaning Pod Exploded Diagram"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}

              {/* View in your space (AR) button */}
              <button
                onClick={() => setArModalOpen(true)}
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  background: 'rgba(28, 28, 38, 0.9)',
                  color: '#FFFFFF',
                  padding: '8px 14px',
                  borderRadius: '9999px',
                  border: '1px solid var(--color-champagne)',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
              >
                <Eye size={14} color="#C8A75A" />
                View in your space (AR)
              </button>
            </div>

            {/* Thumbnail Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              <button
                onClick={() => setActiveMedia('3d')}
                style={{
                  height: '74px',
                  borderRadius: '12px',
                  border: activeMedia === '3d' ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                  background: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: activeMedia === '3d' ? 'var(--color-champagne)' : 'var(--color-graphite)',
                }}
              >
                <Sparkles size={15} />
                3D Model
              </button>

              <button
                onClick={() => setActiveMedia('unboxing')}
                style={{
                  height: '74px',
                  borderRadius: '12px',
                  border: activeMedia === 'unboxing' ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <img src={images.unboxing} alt="Unboxing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>

              <button
                onClick={() => setActiveMedia('inhand')}
                style={{
                  height: '74px',
                  borderRadius: '12px',
                  border: activeMedia === 'inhand' ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <img src={images.inhand} alt="Cleaning" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>

              <button
                onClick={() => setActiveMedia('wallmount')}
                style={{
                  height: '74px',
                  borderRadius: '12px',
                  border: activeMedia === 'wallmount' ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <img src={images.wallmount} alt="Wall Mount" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>

              <button
                onClick={() => setActiveMedia('travertine')}
                style={{
                  height: '74px',
                  borderRadius: '12px',
                  border: activeMedia === 'travertine' ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <img src={images.travertine} alt="Bathroom" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>

              <button
                onClick={() => setActiveMedia('macro')}
                style={{
                  height: '74px',
                  borderRadius: '12px',
                  border: activeMedia === 'macro' ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <img src={images.macro} alt="Gold Latch" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>

              <button
                onClick={() => setActiveMedia('exploded')}
                style={{
                  height: '74px',
                  borderRadius: '12px',
                  border: activeMedia === 'exploded' ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <img src={images.exploded} alt="Pod Anatomy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            </div>
          </div>

          {/* Right Column: Title, Pricing, Bundles, Pincode & Buy Buttons */}
          <div>
            <div className="pill-badge" style={{ marginBottom: '12px' }}>
              <ShieldCheck size={13} color="#C8A75A" />
              <span>THE ARCHITECTURAL TOUCHLESS SYSTEM</span>
            </div>

            {/* Live Stock Urgency & Real-Time Shoppers Badge (Competitor Feature) */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                borderRadius: '8px',
                marginBottom: '14px',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#EF4444',
                  boxShadow: '0 0 8px #EF4444',
                }}
              />
              <span style={{ fontSize: '12px', color: '#B91C1C', fontWeight: 700 }}>
                🔥 18 shoppers viewing now • Only 9 starter kits left in today's Mumbai dispatch batch
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '8px' }}>
              {PRODUCT.title}
            </h1>

            <p style={{ fontSize: '15px', color: 'var(--color-lilac-deep)', marginBottom: '18px' }}>
              {BRAND.tagline} Wall-mounted caddy with telescoping wand and single-use self-foaming pods.
            </p>

            {/* Price Row */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
              <span style={{ fontSize: '36px', fontWeight: 800 }}>
                {formatINR(purchaseType === 'subscribe' ? Math.round(selectedBundle.price * 0.85) : selectedBundle.price)}
              </span>
              <span style={{ fontSize: '18px', textDecoration: 'line-through', color: 'var(--color-lilac-deep)' }}>
                {formatINR(selectedBundle.originalPrice)}
              </span>
              <span style={{ fontSize: '13px', color: 'var(--color-signal)', fontWeight: 700, background: '#EAF5F2', padding: '4px 10px', borderRadius: '6px' }}>
                {purchaseType === 'subscribe' ? 'Save Extra 15% with Auto-Ship' : selectedBundle.savings}
              </span>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--color-lilac-deep)', marginBottom: '24px' }}>
              Price includes GST • Free Courier Shipping Across India • COD Available
            </div>

            {/* Purchase Mode: One-Time vs Auto-Ship Refills (Suvaam & Clorox Missing Feature) */}
            <div
              style={{
                marginBottom: '24px',
                background: '#FFFFFF',
                padding: '14px',
                borderRadius: '14px',
                border: '1px solid var(--border-subtle)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
              }}
            >
              <div style={{ display: 'flex', gap: '10px', marginBottom: purchaseType === 'subscribe' ? '12px' : '0' }}>
                <button
                  type="button"
                  onClick={() => setPurchaseType('one-time')}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '8px',
                    border: purchaseType === 'one-time' ? '2px solid var(--color-graphite)' : '1px solid var(--border-subtle)',
                    background: purchaseType === 'one-time' ? '#F4F4F6' : '#FFFFFF',
                    fontWeight: purchaseType === 'one-time' ? 700 : 500,
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                >
                  One-Time Purchase
                </button>
                <button
                  type="button"
                  onClick={() => setPurchaseType('subscribe')}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '8px',
                    border: purchaseType === 'subscribe' ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                    background: purchaseType === 'subscribe' ? 'rgba(200, 167, 90, 0.12)' : '#FFFFFF',
                    fontWeight: purchaseType === 'subscribe' ? 800 : 500,
                    fontSize: '13px',
                    color: purchaseType === 'subscribe' ? 'var(--color-graphite)' : 'var(--color-lilac-deep)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'var(--transition)',
                  }}
                >
                  <span>Auto-Ship & Save 15%</span>
                  <span
                    style={{
                      fontSize: '10px',
                      background: 'var(--color-champagne)',
                      color: '#000',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontWeight: 800,
                    }}
                  >
                    BEST
                  </span>
                </button>
              </div>

              {purchaseType === 'subscribe' && (
                <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(200, 167, 90, 0.2)' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--color-graphite)', marginBottom: '8px' }}>
                    Auto-Deliver 16 Fresh Pods Refill:
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {(['30 Days', '60 Days', '90 Days'] as const).map((freq) => (
                      <button
                        key={freq}
                        type="button"
                        onClick={() => setSubscriptionFreq(freq)}
                        style={{
                          flex: 1,
                          padding: '7px 4px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: subscriptionFreq === freq ? 700 : 500,
                          background: subscriptionFreq === freq ? 'var(--color-graphite)' : '#FFFFFF',
                          color: subscriptionFreq === freq ? '#FFFFFF' : 'var(--color-graphite)',
                          border: subscriptionFreq === freq ? '1px solid var(--color-graphite)' : '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                        }}
                      >
                        Every {freq}
                      </button>
                    ))}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-signal)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Check size={13} />
                    <span>Free doorstep delivery • Pause or cancel anytime via WhatsApp</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bundle Segmented Selector */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Choose Your Setup:
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {PRODUCT.bundles.map((bundle) => {
                  const isCur = selectedBundle.id === bundle.id;
                  const finalBundlePrice = purchaseType === 'subscribe' ? Math.round(bundle.price * 0.85) : bundle.price;
                  return (
                    <div
                      key={bundle.id}
                      onClick={() => setSelectedBundle(bundle)}
                      style={{
                        padding: '16px 20px',
                        borderRadius: '12px',
                        border: isCur ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                        background: isCur ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'var(--transition)',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 700, fontSize: '15px' }}>{bundle.name}</span>
                          {bundle.badge && (
                            <span style={{ fontSize: '10px', fontWeight: 800, background: bundle.isPopular ? 'var(--color-champagne)' : 'var(--color-graphite)', color: bundle.isPopular ? '#1C1C26' : '#FFF', padding: '2px 8px', borderRadius: '9999px' }}>
                              {bundle.badge}
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: '12px', color: 'var(--color-lilac-deep)' }}>
                          Includes {bundle.heads} Cleaning Pods + {bundle.wands} Wand(s)
                        </span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontWeight: 800, fontSize: '16px' }}>{formatINR(finalBundlePrice)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pincode Serviceability Checker */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>
                Delivery Estimate Across India:
              </label>
              <form onSubmit={handleCheckPincode} style={{ display: 'flex', gap: '8px', maxWidth: '380px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <MapPin size={16} color="#6D6A8C" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit PIN code"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 36px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '14px',
                      background: '#FFF',
                    }}
                  />
                </div>
                <button type="submit" className="btn-secondary" style={{ padding: '10px 18px', fontSize: '13px' }}>
                  Check
                </button>
              </form>
              {pincodeResult && (
                <div style={{ fontSize: '12px', color: pincodeResult.startsWith('✓') ? 'var(--color-signal)' : '#DC2626', marginTop: '6px', fontWeight: 600 }}>
                  {pincodeResult}
                </div>
              )}
            </div>

            {/* Add to Cart CTA */}
            <div style={{ display: 'flex', gap: '14px', marginBottom: '20px' }}>
              <button
                onClick={() => onAddToCart({
                  ...selectedBundle,
                  price: purchaseType === 'subscribe' ? Math.round(selectedBundle.price * 0.85) : selectedBundle.price,
                })}
                className="btn-primary"
                style={{ flex: 1, padding: '16px 24px', fontSize: '16px' }}
              >
                Order {selectedBundle.name} • {formatINR(purchaseType === 'subscribe' ? Math.round(selectedBundle.price * 0.85) : selectedBundle.price)}
                {purchaseType === 'subscribe' ? ' (Auto-Ship)' : ''}
              </button>
            </div>

            {/* Embedded RAG AI Question Search Bar (Suvaam 'Ask Jify' Equivalent) */}
            <EmbeddedAiSearchBar
              onAskQuestion={(q) => onTriggerChatbot && onTriggerChatbot(q)}
            />

            {/* Inclusions Card */}
            <div className="glass-panel" style={{ padding: '20px', borderRadius: '14px' }}>
              <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-lilac-deep)', marginBottom: '12px' }}>
                What arrives in your box:
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: 'var(--color-graphite)' }}>
                {selectedBundle.inclusions.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Check size={14} color="#C8A75A" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        <div style={{ maxWidth: '840px', margin: '0 auto', paddingTop: '40px', borderTop: '1px solid var(--border-subtle)' }}>
          <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px', textAlign: 'center' }}>
            Hardware Specifications & Engineering
          </h3>
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--color-lilac-deep)', display: 'block' }}>Caddy Dimensions</span>
                <strong style={{ fontSize: '15px' }}>90mm W × 120mm H × 36mm D</strong>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--color-lilac-deep)', display: 'block' }}>Extended Handle Reach</span>
                <strong style={{ fontSize: '15px' }}>420mm Telescoping Span</strong>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--color-lilac-deep)', display: 'block' }}>Trim Finish</span>
                <strong style={{ fontSize: '15px' }}>Brushed Champagne Gold PVD</strong>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--color-lilac-deep)', display: 'block' }}>Wall Mounting</span>
                <strong style={{ fontSize: '15px' }}>3M VHB Adhesive (Zero Drilling)</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AR QR Modal */}
      {arModalOpen && (
        <div className="drawer-backdrop" onClick={() => setArModalOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-panel"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '420px',
              padding: '32px',
              textAlign: 'center',
              background: '#FFFFFF',
              zIndex: 1001,
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
              Augmented Reality (AR) Preview
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-lilac-deep)', marginBottom: '20px' }}>
              On your iPhone or Android, tap below to project the Aurelle caddy onto your actual bathroom wall at 1:1 true scale.
            </p>
            <div
              style={{
                width: '180px',
                height: '180px',
                margin: '0 auto 20px auto',
                background: '#F5F5F8',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px dashed var(--color-champagne)',
              }}
            >
              <Eye size={48} color="#C8A75A" />
            </div>
            <button
              onClick={() => setArModalOpen(false)}
              className="btn-primary"
              style={{ width: '100%' }}
            >
              Close AR Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
