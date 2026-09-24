import React from 'react';
import { AlertCircle, Droplets, ArrowRight } from 'lucide-react';
import { BRAND } from '../config/brand.config';

interface HygieneScienceViewProps {
  onBackToHome: () => void;
  onExploreHardware: () => void;
}

export const HygieneScienceView: React.FC<HygieneScienceViewProps> = ({ onBackToHome, onExploreHardware }) => {
  return (
    <div style={{ padding: '60px 0 100px 0', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '880px' }}>
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

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="pill-badge" style={{ marginBottom: '14px' }}>
            <Droplets size={13} color="#C8A75A" />
            <span>HYGIENE SCIENCE &amp; ENGINEERING</span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 50px)', marginBottom: '16px' }}>
            Why Single-Use Pods Are Objectively Superior.
          </h1>
          <p style={{ color: 'var(--color-lilac-deep)', fontSize: '18px', lineHeight: 1.6 }}>
            A calm, scientific examination of bathroom hygiene. Why standing toilet brushes fail modern sanitation standards, and how touchless pod mechanics solve it.
          </p>
        </div>

        {/* Science Breakdown Card 1: The Dripping Problem */}
        <div className="glass-panel" style={{ padding: '36px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#DC2626' }}>01.</span> The Standing Water Reservoir
          </h2>
          <p style={{ color: 'var(--color-graphite)', fontSize: '15px', lineHeight: 1.7, marginBottom: '16px' }}>
            When a traditional nylon bristle brush is returned to its floor holder, it carries microscopic toilet water. In humid Indian climates, that closed caddy turns into a warm, stagnant pool of bacteria and mold spores within 48 hours.
          </p>
          <div style={{ background: '#F5F5F8', padding: '16px 20px', borderRadius: '12px', borderLeft: '3px solid var(--color-champagne)' }}>
            <strong style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>The {BRAND.name} Solution:</strong>
            <span style={{ fontSize: '13px', color: 'var(--color-lilac-deep)' }}>
              The used head is released straight into your waste bin before you step away. The {BRAND.name} wand returns to its ventilated wall caddy completely dry, clean, and uncontaminated.
            </span>
          </div>
        </div>

        {/* Science Breakdown Card 2: Contactless Mechanical Ejection */}
        <div className="glass-panel" style={{ padding: '36px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'var(--color-champagne)' }}>02.</span> Contactless Mechanical Precision
          </h2>
          <p style={{ color: 'var(--color-graphite)', fontSize: '15px', lineHeight: 1.7, marginBottom: '16px' }}>
            Cheap imitation wands rely on flimsy plastic pushers that warp, bind, or release prematurely while you clean. {BRAND.name} engineered a balanced internal pushrod housed inside an aviation-grade aluminum telescoping shaft.
          </p>
          <p style={{ color: 'var(--color-graphite)', fontSize: '15px', lineHeight: 1.7 }}>
            Sliding the brushed champagne-gold thumb latch extends a 4mm mechanical jaw that drops the spent pod directly over the trash bin with zero hand contact.
          </p>
        </div>

        {/* Safety Warning Callout: Never Flush */}
        <div
          style={{
            background: '#FEF3C7',
            border: '1px solid #FCD34D',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '48px',
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start',
          }}
        >
          <AlertCircle size={24} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#92400E', marginBottom: '4px' }}>
              Hygiene Safety Standard: Never Flush Used Heads
            </h3>
            <p style={{ fontSize: '13px', color: '#B45309', lineHeight: 1.6 }}>
              Unlike paper, our bio-cellulose honeycomb fibers are built to scrub mineral limescale and withstand vigorous scrubbing. Flushing them will obstruct Indian plumbing bends and septic traps. Always release spent pods directly into a lined bathroom waste bin.
            </p>
          </div>
        </div>

        {/* Closing CTA */}
        <div style={{ textAlign: 'center' }}>
          <button onClick={onExploreHardware} className="btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>
            Explore {BRAND.name} Hardware System <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
