import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { type ProductBundleConfig } from '../config/product.config';
import { formatINR } from '../lib/format';

interface StickyMobileBarProps {
  selectedBundle: ProductBundleConfig;
  onOpenCart: () => void;
  onCheckout: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  selectedBundle,
  onOpenCart,
  onCheckout,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="sticky-mobile-bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(200, 167, 90, 0.35)',
        boxShadow: '0 -8px 25px rgba(0,0,0,0.08)',
        padding: '10px 16px',
        paddingBottom: 'calc(10px + env(safe-area-inset-bottom, 12px))',
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
      }}
    >
      <div
        onClick={onOpenCart}
        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        title="View Bag"
      >
        <img
          src="/assets/aurelle_hero_travertine.jpg"
          alt={selectedBundle.name}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '8px',
            objectFit: 'cover',
            border: '1px solid var(--border-subtle)',
          }}
        />
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-graphite)', lineHeight: 1.2 }}>
            {selectedBundle.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-graphite)' }}>
              {formatINR(selectedBundle.price)}
            </span>
            <span style={{ fontSize: '11px', textDecoration: 'line-through', color: 'var(--color-lilac-deep)' }}>
              {formatINR(selectedBundle.originalPrice)}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="btn-primary"
        style={{
          padding: '12px 18px',
          fontSize: '13px',
          gap: '6px',
          flexShrink: 0,
          background: 'var(--color-graphite)',
        }}
      >
        <span>Order Now (COD)</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
};
