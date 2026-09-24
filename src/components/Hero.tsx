import React from 'react';
import { Sparkles, ArrowRight, Check, Smartphone } from 'lucide-react';
import { WandCanvas3D } from './WandCanvas3D';
import { BRAND } from '../config/brand.config';

interface HeroProps {
  onOrderNow: () => void;
  onExplore3D: () => void;
  onViewProduct?: () => void;
  onOpenAr?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow, onExplore3D, onViewProduct, onOpenAr }) => {

  return (
    <section
      style={{
        position: 'relative',
        padding: '48px 0 64px 0',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Title & Value Proposition */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          <div className="pill-badge" style={{ marginBottom: '16px' }}>
            <Sparkles size={13} color="#C8A75A" />
            <span>ARCHITECTURAL TOUCHLESS HARDWARE</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(34px, 5.5vw, 64px)',
              lineHeight: 1.1,
              maxWidth: '920px',
              marginBottom: '16px',
            }}
          >
            One handle.{' '}
            <span className="text-gold">A fresh head every time.</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(16px, 2vw, 19px)',
              color: 'var(--color-lilac-deep)',
              maxWidth: '680px',
              lineHeight: 1.6,
              marginBottom: '28px',
            }}
          >
            A wall-mounted cleaning kit with heads you never touch and never reuse. Alabaster mist casing, brushed champagne gold slide-latch, and self-activating foaming pods.
          </p>

          {/* Primary Action Buttons */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '24px' }}>
            <button onClick={onOrderNow} className="btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>
              Buy the Kit • From ₹1,199 <ArrowRight size={16} />
            </button>
            <button onClick={onExplore3D} className="btn-secondary" style={{ padding: '16px 28px', fontSize: '15px' }}>
              See How It Works
            </button>
            {onOpenAr && (
              <button
                onClick={onOpenAr}
                className="btn-secondary"
                style={{
                  padding: '16px 24px',
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1.5px solid var(--color-champagne)',
                  background: '#FFFFFF',
                }}
              >
                <Smartphone size={16} color="#C8A75A" />
                <span>View in AR (3D)</span>
              </button>
            )}
          </div>

          {/* Trust Guarantees */}
          <div
            style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              fontSize: '13px',
              color: 'var(--color-lilac-deep)',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Check size={14} color="#2F7D6B" /> Free Express Delivery in India
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Check size={14} color="#2F7D6B" /> Cash on Delivery (COD) Available
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Check size={14} color="#2F7D6B" /> 7-Day Replacement Guarantee
            </span>
          </div>
        </div>

        {/* Dual Stage Grid: Interactive 3D Canvas on Left + Editorial Travertine Photo on Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            alignItems: 'stretch',
            marginBottom: '64px',
          }}
        >
          {/* Card 1: 3D Three.js Interactive Viewer */}
          <div
            className="glass-panel"
            style={{
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)' }}>
                  REAL-TIME 3D STAGE
                </span>
                <h3 style={{ fontSize: '19px', fontWeight: 700 }}>Inspect {BRAND.name} Hardware</h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {onOpenAr && (
                  <button
                    onClick={onOpenAr}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      background: 'rgba(200, 167, 90, 0.12)',
                      border: '1px solid var(--color-champagne)',
                      color: 'var(--color-graphite)',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Smartphone size={12} color="#C8A75A" /> AR Room View
                  </button>
                )}
                <span className="stock-badge">
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2F7D6B' }} />
                  Interactive 360°
                </span>
              </div>
            </div>

            {/* 3D Canvas Container */}
            <div style={{ flex: 1, minHeight: '380px', position: 'relative' }}>
              <WandCanvas3D />
            </div>

            <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--color-lilac-deep)', textAlign: 'center' }}>
              Drag to orbit 360° • Click "Action" to test the champagne gold slide-eject
            </div>
          </div>

          {/* Card 2: Ultra-Realistic Editorial Travertine Studio Photograph */}
          <div
            className="glass-panel"
            style={{
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-lilac-deep)' }}>
                  ARCHITECTURAL SETTING
                </span>
                <h3 style={{ fontSize: '19px', fontWeight: 700 }}>Travertine Stone Integration</h3>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--color-lilac-deep)' }}>
                Wall-Mounted • No Drilling
              </span>
            </div>

            {/* Editorial Photo */}
            <div
              style={{
                flex: 1,
                minHeight: '380px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <img
                src="/assets/aurelle_hero_travertine.jpg"
                alt="Aurelle luxury toilet wand mounted in travertine master bathroom"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Floating Feature Tags */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  background: 'rgba(28, 28, 38, 0.85)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  padding: '12px 18px',
                  borderRadius: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>Compact Alabaster Caddy</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-mist)' }}>90 × 120 × 36 mm • Champagne Gold PVD Trim</div>
                </div>
                {onViewProduct && (
                  <button
                    onClick={onViewProduct}
                    style={{
                      background: 'var(--color-champagne)',
                      border: 'none',
                      color: '#1C1C26',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    View Specs
                  </button>
                )}
              </div>
            </div>

            <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--color-lilac-deep)', textAlign: 'center' }}>
              Coordinates seamlessly with Kohler, Grohe, and Axor bathroom suites
            </div>
          </div>
        </div>

        {/* Section 6.1: The Kit at a Glance (Three plain facts, varied layout) */}
        <div style={{ paddingTop: '20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-champagne)' }}>
              ESSENTIAL PRINCIPLES
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 800 }}>The Kit at a Glance</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            <div className="glass-panel" style={{ padding: '32px 28px', background: '#FFFFFF' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-champagne)', marginBottom: '8px' }}>
                01.
              </div>
              <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '8px' }}>
                Mounts on the wall.
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-lilac-deep)', lineHeight: 1.6 }}>
                A slim 36mm case that stays out of the way and off the floor. 3M VHB water-resistant bracket mounts in seconds without drilling tile or stone.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '32px 28px', background: '#FFFFFF' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-champagne)', marginBottom: '8px' }}>
                02.
              </div>
              <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '8px' }}>
                One handle, many heads.
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-lilac-deep)', lineHeight: 1.6 }}>
                Heads are strictly single-use, so nothing dirty is ever stored or reused. Contact with toilet water activates dense foaming disinfectant.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '32px 28px', background: '#FFFFFF' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-champagne)', marginBottom: '8px' }}>
                03.
              </div>
              <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '8px' }}>
                Refills, without the hunt.
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-lilac-deep)', lineHeight: 1.6 }}>
                Scan the laser-etched QR code inside the caddy to reorder replacement heads in two taps. Delivered to your doorstep across India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
