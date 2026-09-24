import React from 'react';
import { XCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { BRAND } from '../config/brand.config';

export const ComparisonTable: React.FC = () => {
  const comparisonItems = [
    {
      feature: 'Germ Contact & Storage',
      traditional: 'Dirty standing water collects in bottom cup; harbors millions of bacteria',
      generic: 'Thin plastic holder; wand often sits damp',
      aurelle: 'Zero touch: spent head drops straight into trash; wand stores completely dry in wall caddy',
    },
    {
      feature: 'Bathroom Aesthetic',
      traditional: 'Unsightly plastic brush hidden behind the bowl',
      generic: 'Flimsy white plastic with garish sticker logos',
      aurelle: 'Alabaster matte finish with brushed champagne gold PVD trim; architectural luxury hardware',
    },
    {
      feature: 'Wand Reach & Mechanism',
      traditional: 'Fixed short handle; splashes hands when scrubbing near water line',
      generic: 'Thin plastic pole that warps under vigorous scrubbing pressure',
      aurelle: '420mm aircraft-grade aluminum telescoping shaft with precision gold slide-latch',
    },
    {
      feature: 'Refill Reordering',
      traditional: 'Buy whole new plastic brush every 3 months; creates landfill waste',
      generic: 'Uncertain refill availability; confusing marketplace clone sizes',
      aurelle: 'Guaranteed refill packs in 30, 60, 120 counts with instant 2-tap QR code reordering',
    },
    {
      feature: 'Cleaning Agent',
      traditional: 'Requires separate caustic blue acid or bleach bottles',
      generic: 'Weak detergent coating that dissolves in 5 seconds',
      aurelle: 'Dense tri-layer enzymatic ocean tablet + activated charcoal limescale scouring pad',
    },
  ];

  return (
    <section
      style={{
        padding: '80px 0',
        background: '#FFFFFF',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
          <div className="pill-badge" style={{ marginBottom: '14px' }}>
            <span>THE ARCHITECTURAL COMPARISON</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: '16px' }}>
            Traditional Brushes vs. {BRAND.name}
          </h2>
          <p style={{ color: 'var(--color-lilac-deep)', fontSize: '16px', lineHeight: 1.6 }}>
            Why luxury homeowners and hospitality designers are replacing traditional nylon bristles with {BRAND.name} touchless hygiene hardware.
          </p>
        </div>

        {/* Table Container */}
        <div
          style={{
            overflowX: 'auto',
            borderRadius: 'var(--radius-hero)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              minWidth: '700px',
            }}
          >
            <thead>
              <tr style={{ background: 'var(--color-porcelain)', borderBottom: '1px solid var(--border-subtle)' }}>
                <th style={{ padding: '20px 24px', fontSize: '14px', fontWeight: 700, width: '25%' }}>
                  Hardware Criterion
                </th>
                <th style={{ padding: '20px 24px', fontSize: '13px', fontWeight: 700, width: '25%', color: '#DC2626' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <XCircle size={16} /> Traditional Floor Brush
                  </div>
                </th>
                <th style={{ padding: '20px 24px', fontSize: '13px', fontWeight: 700, width: '25%', color: '#D97706' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlertTriangle size={16} /> Generic Market Clones
                  </div>
                </th>
                <th style={{ padding: '20px 24px', fontSize: '15px', fontWeight: 800, width: '25%', color: 'var(--color-champagne)', background: 'rgba(200, 167, 90, 0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={18} color="#C8A75A" /> {BRAND.name} System
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonItems.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: index === comparisonItems.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                    background: index % 2 === 0 ? '#FFFFFF' : 'rgba(245, 245, 248, 0.5)',
                  }}
                >
                  <td style={{ padding: '20px 24px', fontSize: '14px', fontWeight: 700 }}>
                    {item.feature}
                  </td>
                  <td style={{ padding: '20px 24px', fontSize: '13px', color: 'var(--color-lilac-deep)' }}>
                    {item.traditional}
                  </td>
                  <td style={{ padding: '20px 24px', fontSize: '13px', color: 'var(--color-lilac-deep)' }}>
                    {item.generic}
                  </td>
                  <td style={{ padding: '20px 24px', fontSize: '14px', fontWeight: 600, color: 'var(--color-graphite)', background: 'rgba(200, 167, 90, 0.08)' }}>
                    {item.aurelle}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
