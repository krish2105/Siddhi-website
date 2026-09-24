import React from 'react';
import { Layers, Droplets, Sparkles, ShieldCheck } from 'lucide-react';

interface BenefitItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  highlight: string;
}

export const HygieneBenefitsRibbon: React.FC = () => {
  const benefits: BenefitItem[] = [
    {
      icon: <Layers size={28} color="#C8A75A" />,
      title: "Disposable Sponge Pods",
      subtitle: "Single-use ocean foam capsules",
      highlight: "Zero Bacterial Retention",
    },
    {
      icon: <Droplets size={28} color="#C8A75A" />,
      title: "Deep Cleaning Formula",
      subtitle: "Water-activated triple surfactant",
      highlight: "Removes 99.9% Limescale",
    },
    {
      icon: <Sparkles size={28} color="#C8A75A" />,
      title: "Mediterranean Fragrance",
      subtitle: "Bergamot & fresh ocean mist",
      highlight: "Subtle Luxury Aroma",
    },
    {
      icon: <ShieldCheck size={28} color="#C8A75A" />,
      title: "100% Touchless Architecture",
      subtitle: "1-Click snap and slide ejection",
      highlight: "Hands Stay Pristine",
    },
  ];

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #1C1C26 0%, #15151D 100%)',
        color: '#FFFFFF',
        borderTop: '1px solid rgba(200, 167, 90, 0.35)',
        borderBottom: '1px solid rgba(200, 167, 90, 0.35)',
        padding: '36px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Background Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(200, 167, 90, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        {/* Editorial Subheader */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-champagne)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            ARCHITECTURAL HYGIENE SPECIFICATION
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(20px, 3vw, 28px)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#F4F2EC',
              marginTop: '4px',
              letterSpacing: '-0.01em',
            }}
          >
            Every Clean Feels Fresh. Every Touch Is Contactless.
          </h3>
        </div>

        {/* 4 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            alignItems: 'stretch',
          }}
        >
          {benefits.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '22px 20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                transition: 'all 0.3s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(200, 167, 90, 0.07)';
                e.currentTarget.style.borderColor = 'rgba(200, 167, 90, 0.35)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: 'rgba(200, 167, 90, 0.12)',
                  border: '1px solid rgba(200, 167, 90, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: 'var(--color-champagne)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    marginBottom: '2px',
                  }}
                >
                  {item.highlight}
                </div>
                <h4
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: 1.3,
                    marginBottom: '4px',
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontSize: '12px',
                    color: '#A09FB1',
                    lineHeight: 1.4,
                    margin: 0,
                  }}
                >
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
