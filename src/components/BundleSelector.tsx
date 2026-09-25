import React, { useState } from 'react';
import { Check, Sparkles, ShieldCheck, ArrowRight, Truck } from 'lucide-react';
import { PRODUCT, type ProductBundleConfig } from '../config/product.config';
import { BRAND } from '../config/brand.config';
import { formatINR } from '../lib/format';
import { FragranceSelector } from './FragranceSelector';

interface BundleSelectorProps {
  selectedBundle: ProductBundleConfig;
  onSelectBundle: (bundle: ProductBundleConfig) => void;
  onAddToCart: (bundle: ProductBundleConfig) => void;
}

export const BundleSelector: React.FC<BundleSelectorProps> = ({
  selectedBundle,
  onSelectBundle,
  onAddToCart,
}) => {
  const [selectedFragrance, setSelectedFragrance] = useState<string>('ocean-mist');
  return (
    <section
      id="bundles"
      style={{
        padding: '80px 0',
        background: 'var(--bg-secondary)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
          <div className="pill-badge" style={{ marginBottom: '14px' }}>
            <Sparkles size={13} color="#C8A75A" />
            <span>CURATED BUNDLE PRICING</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: '16px' }}>
            Select Your {BRAND.name} System
          </h2>
          <p style={{ color: 'var(--color-lilac-deep)', fontSize: '16px', lineHeight: 1.6 }}>
            Every kit arrives with our wall-dock caddy, telescoping champagne gold wand, and self-activating foaming pods. Free Delivery &amp; Cash on Delivery across India.
          </p>
        </div>

        {/* Pricing Bundle Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '24px',
            alignItems: 'stretch',
          }}
        >
          {PRODUCT.bundles.map((bundle) => {
            const isSelected = selectedBundle.id === bundle.id;

            return (
              <div
                key={bundle.id}
                onClick={() => onSelectBundle(bundle)}
                className="glass-panel bundle-card"
                style={{
                  padding: '36px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 'var(--radius-hero)',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  background: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                  border: isSelected ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                  transform: isSelected ? 'translateY(-6px)' : 'none',
                  boxShadow: isSelected ? 'var(--shadow-gold)' : 'var(--shadow-sm)',
                }}
              >
                {/* Floating Best Value Badge */}
                {bundle.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-14px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: bundle.isPopular ? 'var(--color-champagne)' : 'var(--color-graphite)',
                      color: bundle.isPopular ? '#1C1C26' : '#FFF',
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      padding: '6px 16px',
                      borderRadius: '9999px',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {bundle.badge}
                  </div>
                )}

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '22px', fontWeight: 800, lineHeight: 1.2 }}>
                      {bundle.name}
                    </h3>
                  </div>

                  <p style={{ fontSize: '13px', color: 'var(--color-lilac-deep)', marginBottom: '20px', minHeight: '38px' }}>
                    {bundle.description}
                  </p>

                  {/* Price Box */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '10px',
                      marginBottom: '8px',
                    }}
                  >
                    <span style={{ fontSize: '36px', fontWeight: 800, color: 'var(--color-graphite)' }}>
                      {formatINR(bundle.price)}
                    </span>
                    <span style={{ fontSize: '18px', textDecoration: 'line-through', color: 'var(--color-lilac-deep)' }}>
                      {formatINR(bundle.originalPrice)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: 'var(--color-signal)',
                        background: '#EAF5F2',
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      {bundle.savings}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--color-lilac-deep)' }}>
                      (Includes GST)
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div
                    style={{
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '20px',
                      marginBottom: '28px',
                    }}
                  >
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {bundle.inclusions.map((feature, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--color-graphite)' }}>
                          <Check size={16} color="#C8A75A" style={{ flexShrink: 0 }} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(bundle);
                  }}
                  className={isSelected ? 'btn-primary' : 'btn-secondary'}
                  style={{ width: '100%', padding: '16px 20px', fontSize: '15px' }}
                >
                  Order {bundle.name}
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Fragrance Customizer for Bundles */}
        <div style={{ marginTop: '48px', maxWidth: '840px', margin: '48px auto 0 auto' }}>
          <FragranceSelector
            selectedFragrance={selectedFragrance}
            onSelectFragrance={setSelectedFragrance}
          />
        </div>

        {/* Bottom Trust Guarantee Strip */}
        <div
          style={{
            marginTop: '48px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '32px',
            flexWrap: 'wrap',
            fontSize: '14px',
            color: 'var(--color-lilac-deep)',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Truck size={18} color="#C8A75A" />
            <span>Dispatched within 24 hours via Express Air</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="#2F7D6B" />
            <span>7-Day Risk-Free Home Replacement</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="#C8A75A" />
            <span>Secure UPI (GPay/PhonePe) &amp; Cash on Delivery</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .bundle-card { padding: 26px 18px !important; }
        }
      `}</style>
    </section>
  );
};
