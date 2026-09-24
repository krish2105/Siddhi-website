import React from 'react';
import { Wind, Droplets } from 'lucide-react';
import { playSlideSound } from '../lib/sound';

export interface FragranceProfile {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  badge: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  mood: string;
}

export const FRAGRANCES: FragranceProfile[] = [
  {
    id: 'ocean-mist',
    name: 'Ocean Mist & Sea Minerals',
    subtitle: 'Signature Architectural Freshness',
    color: '#0078D7',
    badge: 'MOST POPULAR',
    topNotes: 'Crushed Sea Salt • Marine Calone • Ozone',
    heartNotes: 'Blue Lotus • Coastal Eucalyptus • Samphire',
    baseNotes: 'Driftwood • White Cedar • Ambergris',
    mood: 'Crisp, invigorating, high-clarity ocean breeze',
  },
  {
    id: 'bergamot-cedar',
    name: 'Bergamot & Italian Cedar',
    subtitle: 'Warm Five-Star Hotel Ambience',
    color: '#C8A75A',
    badge: 'LUXURY SUITE',
    topNotes: 'Calabrian Bergamot • Meyer Lemon • Petitgrain',
    heartNotes: 'Wild Sage • Italian Rosemary • Cardamom',
    baseNotes: 'Atlas Cedarwood • Golden Amber • Sandalwood',
    mood: 'Warm, bespoke Milanese hotel powder room',
  },
  {
    id: 'alpine-verbena',
    name: 'Alpine Verbena & Green Tea',
    subtitle: 'Herbal Botanical Spa Sanctuary',
    color: '#2F7D6B',
    badge: 'SERENE SPA',
    topNotes: 'Crisp Lemon Verbena • Sweet Lime Leaf',
    heartNotes: 'Sencha Green Tea • Crushed Mint • White Lily',
    baseNotes: 'Haitian Vetiver • Damp Stone • Oakmoss',
    mood: 'Calming, restorative mountain retreat',
  },
];

interface FragranceSelectorProps {
  selectedFragrance: string;
  onSelectFragrance: (id: string) => void;
}

export const FragranceSelector: React.FC<FragranceSelectorProps> = ({
  selectedFragrance,
  onSelectFragrance,
}) => {
  const current = FRAGRANCES.find((f) => f.id === selectedFragrance) || FRAGRANCES[0];

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '24px',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: current.color }}>
            AROMATHERAPEUTIC PROFILE
          </span>
          <h4 style={{ fontSize: '18px', fontWeight: 800, marginTop: '2px' }}>
            Choose Refill Fragrance
          </h4>
        </div>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 800,
            padding: '4px 10px',
            borderRadius: '9999px',
            background: `${current.color}15`,
            color: current.color,
            border: `1px solid ${current.color}40`,
          }}
        >
          {current.badge}
        </span>
      </div>

      {/* Fragrance Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '20px' }}>
        {FRAGRANCES.map((frag) => {
          const isSelected = selectedFragrance === frag.id;
          return (
            <button
              key={frag.id}
              onClick={() => {
                playSlideSound();
                onSelectFragrance(frag.id);
              }}
              style={{
                padding: '12px 8px',
                borderRadius: '12px',
                border: isSelected ? `2px solid ${frag.color}` : '1px solid var(--border-subtle)',
                background: isSelected ? `${frag.color}0D` : '#FAF9FD',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: frag.color,
                  boxShadow: isSelected ? `0 0 10px ${frag.color}80` : 'none',
                }}
              />
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: isSelected ? 800 : 600,
                  color: isSelected ? 'var(--color-graphite)' : 'var(--color-lilac-deep)',
                  lineHeight: 1.2,
                }}
              >
                {frag.name.split('&')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Olfactory Scent Notes Card */}
      <div
        style={{
          background: '#FAF9FD',
          border: '1px solid var(--border-subtle)',
          borderRadius: '14px',
          padding: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <Wind size={15} color={current.color} />
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-graphite)' }}>
            {current.mood}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '11px' }}>
          <div style={{ background: '#FFF', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontWeight: 800, color: 'var(--color-lilac-deep)', textTransform: 'uppercase', fontSize: '9px', display: 'block', marginBottom: '2px' }}>
              Top Notes
            </span>
            <span style={{ color: 'var(--color-graphite)', fontWeight: 600 }}>{current.topNotes}</span>
          </div>

          <div style={{ background: '#FFF', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontWeight: 800, color: 'var(--color-lilac-deep)', textTransform: 'uppercase', fontSize: '9px', display: 'block', marginBottom: '2px' }}>
              Heart Notes
            </span>
            <span style={{ color: 'var(--color-graphite)', fontWeight: 600 }}>{current.heartNotes}</span>
          </div>

          <div style={{ background: '#FFF', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontWeight: 800, color: 'var(--color-lilac-deep)', textTransform: 'uppercase', fontSize: '9px', display: 'block', marginBottom: '2px' }}>
              Base Notes
            </span>
            <span style={{ color: 'var(--color-graphite)', fontWeight: 600 }}>{current.baseNotes}</span>
          </div>
        </div>

        <div style={{ marginTop: '12px', fontSize: '11px', color: 'var(--color-lilac-deep)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Droplets size={12} color={current.color} />
          <span>Infused with pure cold-pressed botanical essential oils. 100% synthetic dye-free.</span>
        </div>
      </div>
    </div>
  );
};
