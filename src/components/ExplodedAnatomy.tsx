import React, { useState } from 'react';
import { Layers, Check, Sparkles, Move3d, Image } from 'lucide-react';
import { BRAND } from '../config/brand.config';
import { PodCanvas3D } from './PodCanvas3D';

export const ExplodedAnatomy: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState(1);
  const [viewType, setViewType] = useState<'3d' | 'schematic' | 'action'>('3d');

  const layerDetails = [
    {
      id: 0,
      title: 'Layer 1: Charcoal Micro-Honeycomb Scrubber',
      tag: 'LIMESCALE DISSOLUTION',
      desc: 'Infused with fine activated charcoal micro-fibers that strip tough Indian hard-water scaling, rust marks, and yellow stains without abrading porcelain glaze.',
      points: ['Safe on glazed ceramic, vitreous china & marble', 'Hexagonal contouring reaches deep under rim', 'Resilient bio-cellulose structure'],
    },
    {
      id: 1,
      title: 'Layer 2: Ocean-Mist Antibacterial Core',
      tag: 'ACTIVE HYGIENE FOAM',
      desc: 'A dense concentrated enzymatic tablet that effervesces instantly into a rich ocean-blue lather upon contact with water, sanitizing without caustic chemical fumes.',
      points: ['Neutralizes bathroom odor compounds', 'Eliminates separate liquid bleach and acid bottles', 'Active micro-bubble penetration'],
    },
    {
      id: 2,
      title: 'Layer 3: Precision Gold Mechanical Clip',
      tag: 'TOUCHLESS LOCK & EJECT',
      desc: 'Ergonomic quick-release locking adapter that clicks onto the telescoping wand head. Disengages with zero resistance when the gold slide latch is engaged.',
      points: ['Positive mechanical lock during vigorous scrubbing', '100% hands-free release over waste bin', 'Rigid polymer structure'],
    },
  ];

  return (
    <section
      id="refill-tech"
      style={{
        padding: '80px 0',
        background: '#FFFFFF',
      }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 48px auto' }}>
          <div className="pill-badge" style={{ marginBottom: '14px' }}>
            <Layers size={13} color="#C8A75A" />
            <span>TRI-LAYER CAPSULE ENGINEERING</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: '16px' }}>
            The Science Behind Every Pod
          </h2>
          <p style={{ color: 'var(--color-lilac-deep)', fontSize: '16px', lineHeight: 1.6 }}>
            Unlike generic sponges that disintegrate and drip dirty water, the {BRAND.name} multi-stage capsule is engineered for maximum foaming contact with zero mess.
          </p>

          {/* View Mode Toggle Switch */}
          <div
            style={{
              display: 'inline-flex',
              gap: '6px',
              background: '#F5F5F8',
              padding: '4px',
              borderRadius: '9999px',
              marginTop: '16px',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <button
              onClick={() => setViewType('3d')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 700,
                background: viewType === '3d' ? 'var(--color-graphite)' : 'transparent',
                color: viewType === '3d' ? '#FFF' : 'var(--color-lilac-deep)',
                transition: 'var(--transition)',
              }}
            >
              <Move3d size={13} /> Interactive 3D Model
            </button>
            <button
              onClick={() => setViewType('schematic')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 700,
                background: viewType === 'schematic' ? 'var(--color-graphite)' : 'transparent',
                color: viewType === 'schematic' ? '#FFF' : 'var(--color-lilac-deep)',
                transition: 'var(--transition)',
              }}
            >
              <Image size={13} /> Exploded Schematic
            </button>
            <button
              onClick={() => setViewType('action')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 700,
                background: viewType === 'action' ? 'var(--color-graphite)' : 'transparent',
                color: viewType === 'action' ? '#FFF' : 'var(--color-lilac-deep)',
                transition: 'var(--transition)',
              }}
            >
              <Sparkles size={13} /> In-Bowl Foaming
            </button>
          </div>
        </div>

        {/* 2-Column Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'center',
          }}
        >
          {/* Left Media Stage */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-hero)',
              overflow: 'hidden',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-xl)',
              background: '#F5F5F8',
              minHeight: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {viewType === '3d' && (
              <div style={{ width: '100%', height: '100%', minHeight: '380px' }}>
                <PodCanvas3D />
              </div>
            )}

            {viewType === 'schematic' && (
              <img
                src="/assets/aurelle_pod_exploded.jpg"
                alt="Scientific 3D Exploded Diagram of Aurelle Cleaning Pod"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            )}

            {viewType === 'action' && (
              <img
                src="/assets/aurelle_inhand_action.jpg"
                alt="Aurelle in-hand cleaning action"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '380px' }}
              />
            )}

            {/* Overlay Hotspot Pill */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(28, 28, 38, 0.88)',
                backdropFilter: 'blur(10px)',
                padding: '6px 14px',
                borderRadius: '9999px',
                color: '#FFF',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                border: '1px solid var(--color-champagne)',
                zIndex: 2,
              }}
            >
              {viewType === '3d' ? 'REAL-TIME 3D WEBGL' : viewType === 'schematic' ? 'EXPLODED SCHEMATIC' : 'IN-BOWL ACTIVATION'}
            </div>
          </div>

          {/* Right: Interactive Layer Breakdown Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {layerDetails.map((layer) => {
              const isSelected = selectedLayer === layer.id;
              return (
                <div
                  key={layer.id}
                  onClick={() => setSelectedLayer(layer.id)}
                  style={{
                    padding: '24px',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    background: isSelected ? '#FFFFFF' : 'rgba(245, 245, 248, 0.7)',
                    border: isSelected ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                    boxShadow: isSelected ? 'var(--shadow-md)' : 'none',
                    transform: isSelected ? 'translateX(6px)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        color: isSelected ? 'var(--color-champagne)' : 'var(--color-lilac-deep)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {layer.tag}
                    </span>
                    {isSelected && (
                      <span
                        style={{
                          fontSize: '11px',
                          color: '#2F7D6B',
                          background: '#EAF5F2',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontWeight: 700,
                        }}
                      >
                        Active Layer
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>
                    {layer.title}
                  </h3>

                  <p style={{ fontSize: '13px', color: 'var(--color-lilac-deep)', lineHeight: 1.6, marginBottom: '14px' }}>
                    {layer.desc}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {layer.points.map((pt, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--color-graphite)' }}>
                        <Check size={14} color="#C8A75A" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
