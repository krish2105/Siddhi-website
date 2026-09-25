import React, { useState } from 'react';
import { Layers, Check, Sparkles, Move3d, Sliders } from 'lucide-react';
import { BRAND } from '../config/brand.config';
import { PodCanvas3D } from './PodCanvas3D';
import { playSlideSound, playMechanicalClick } from '../lib/sound';

interface AnatomyComponent {
  id: number;
  layerNumber: string;
  name: string;
  tag: string;
  material: string;
  tolerance: string;
  desc: string;
  points: string[];
  explodedOffset: number; // Y translation offset in px
  color: string;
}

const ANATOMY_COMPONENTS: AnatomyComponent[] = [
  {
    id: 0,
    layerNumber: 'LAYER 01',
    name: 'Aerospace 6063 Aluminum Chassis & Knurled Stem',
    tag: 'STRUCTURAL RIGIDITY',
    material: 'Anodized 6063-T6 Aluminum with Diamond Knurling',
    tolerance: '±0.02 mm Precision CNC Tolerances',
    desc: 'Counter-weighted ergonomic handle designed for 18-inch touchless reach. High tensile strength withstands vigorous scrubbing pressure without bending.',
    points: ['Diamond-knurled grip for non-slip wet hand control', 'Concealed stainless internal spring mechanism', 'Anti-corrosion PVD champagne gold coating'],
    explodedOffset: -120,
    color: '#C8A75A',
  },
  {
    id: 1,
    layerNumber: 'LAYER 02',
    name: 'Rare-Earth N52 Neodymium Magnetic Lock',
    tag: 'TOUCHLESS COUPLING',
    material: 'Nickel-Plated N52 Rare-Earth Magnet',
    tolerance: '2.4 kg Vertical Pull Strength',
    desc: 'Instant self-aligning magnetic snap. Clicks into the pod adapter instantly when held within 15mm. Disengages effortlessly with the gold release latch.',
    points: ['Positive mechanical & magnetic dual lock', 'Zero hand-contact pod engagement & disposal', 'Shielded against magnetic flux loss in humid air'],
    explodedOffset: -60,
    color: '#3B82F6',
  },
  {
    id: 2,
    layerNumber: 'LAYER 03',
    name: 'Ultrasonic Micro-Perforated Aerosol Matrix',
    tag: 'SCENT DIFFUSION',
    material: 'Laser-Drilled Stainless 316L Micro-Mesh',
    tolerance: '110 kHz Vibration Resonance',
    desc: 'Passively diffuses concentrated cold-pressed botanical fragrance into the bathroom air upon water activation, eliminating aerosol propellants.',
    points: ['Replaces synthetic chemical air fresheners', 'Controlled 24-hour slow release sillage', 'Pure essential botanical oils'],
    explodedOffset: 0,
    color: '#10B981',
  },
  {
    id: 3,
    layerNumber: 'LAYER 04',
    name: 'Ocean-Enzymatic Citric Descaling Tablet',
    tag: 'ACTIVE HYGIENE FOAM',
    material: 'Concentrated Plant-Derived Citric & Enzymatic Complex',
    tolerance: 'Instant 2-Second Effervescence in Water',
    desc: 'Effervesces into a dense ocean-blue lather that dissolves limescale, calcium rings, and organic grime without etching porcelain or emitting chlorine fumes.',
    points: ['Phosphate-free, septic-safe, 100% biodegradable', 'Neutralizes bathroom odor molecules on contact', 'Safe on vitreous china, marble, and glazed tiles'],
    explodedOffset: 60,
    color: '#6366F1',
  },
  {
    id: 4,
    layerNumber: 'LAYER 05',
    name: 'Bio-Cellulose Marine-Safe Scrubber Pad',
    tag: 'ZERO-PLASTIC REFILL',
    material: 'Harvested Plant Cellulose & Chitin Fibers',
    tolerance: '100% Water-Soluble & Compostable within 60 Days',
    desc: 'High-density micro-honeycomb disc that cleans stubborn water stains under the rim. Softens in water yet retains structural abrasion.',
    points: ['Zero microplastics entering municipal waterways', 'Contoured hexagonal profile reaches deep under rim', 'Disposes cleanly into household compost or waste bin'],
    explodedOffset: 120,
    color: '#EC4899',
  },
];

export const ExplodedAnatomy: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState(1);
  const [viewType, setViewType] = useState<'exploded' | '3d' | 'action'>('exploded');
  const [explosionAmount, setExplosionAmount] = useState(85); // 0% = assembled, 100% = fully exploded

  const currentComp = ANATOMY_COMPONENTS[selectedLayer];

  return (
    <section
      id="refill-tech"
      style={{
        padding: '90px 0',
        background: '#FFFFFF',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px auto' }}>
          <div className="pill-badge" style={{ marginBottom: '14px' }}>
            <Layers size={13} color="#C8A75A" />
            <span>PRECISION DISASSEMBLY &amp; POD ANATOMY</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', marginBottom: '16px', color: 'var(--color-graphite)' }}>
            The Science of the Exploded Capsule
          </h2>
          <p style={{ color: 'var(--color-lilac-deep)', fontSize: '16px', lineHeight: 1.6 }}>
            Unlike generic disposable plastic brushes that drip contaminated wastewater, {BRAND.name} is engineered as a 5-layer precision mechanical artifact.
          </p>

          {/* View Mode Toggle Switch */}
          <div
            style={{
              display: 'inline-flex',
              gap: '6px',
              background: '#F5F5F8',
              padding: '4px',
              borderRadius: '9999px',
              marginTop: '20px',
              border: '1px solid var(--border-subtle)',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={() => {
                playSlideSound();
                setViewType('exploded');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 700,
                background: viewType === 'exploded' ? 'var(--color-graphite)' : 'transparent',
                color: viewType === 'exploded' ? '#FFF' : 'var(--color-lilac-deep)',
                transition: 'all 0.2s ease',
              }}
            >
              <Sliders size={13} /> Exploded Disassembly
            </button>
            <button
              onClick={() => {
                playSlideSound();
                setViewType('3d');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 700,
                background: viewType === '3d' ? 'var(--color-graphite)' : 'transparent',
                color: viewType === '3d' ? '#FFF' : 'var(--color-lilac-deep)',
                transition: 'all 0.2s ease',
              }}
            >
              <Move3d size={13} /> Interactive 3D Model
            </button>
            <button
              onClick={() => {
                playSlideSound();
                setViewType('action');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 700,
                background: viewType === 'action' ? 'var(--color-graphite)' : 'transparent',
                color: viewType === 'action' ? '#FFF' : 'var(--color-lilac-deep)',
                transition: 'all 0.2s ease',
              }}
            >
              <Sparkles size={13} /> In-Bowl Effervescence
            </button>
          </div>
        </div>

        {/* 2-Column Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          {/* Left Media Stage */}
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-xl)',
              background: '#1A1A24',
              minHeight: '460px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '24px',
            }}
          >
            {/* 1. Exploded Disassembly Stage */}
            {viewType === 'exploded' && (
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {/* Top Blueprint Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-champagne)', letterSpacing: '0.08em' }}>
                    EXPLODED SCHEMATIC • CAD V2.4
                  </span>
                  <span style={{ fontSize: '11px', color: '#9B98B3' }}>
                    {explosionAmount}% EXPANSION
                  </span>
                </div>

                {/* Floating Stack Visualization */}
                <div
                  style={{
                    position: 'relative',
                    height: '280px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {ANATOMY_COMPONENTS.map((layer, idx) => {
                    const isSelected = selectedLayer === idx;
                    // Calculate visual offset based on slider
                    const offsetFactor = (explosionAmount / 100) * layer.explodedOffset;
                    return (
                      <div
                        key={layer.id}
                        onClick={() => {
                          playSlideSound();
                          setSelectedLayer(idx);
                        }}
                        style={{
                          position: 'absolute',
                          transform: `translateY(${offsetFactor}px) scale(${isSelected ? 1.05 : 1})`,
                          width: `${170 - idx * 10}px`,
                          height: '24px',
                          borderRadius: '12px',
                          background: isSelected
                            ? `linear-gradient(90deg, ${layer.color} 0%, #FFFFFF 100%)`
                            : 'linear-gradient(90deg, #2D2D3E 0%, #3E3E54 100%)',
                          border: isSelected ? `2px solid ${layer.color}` : '1px solid #4F4F6A',
                          boxShadow: isSelected ? `0 0 20px ${layer.color}80` : '0 4px 12px rgba(0,0,0,0.3)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0 12px',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      >
                        <span style={{ fontSize: '10px', fontWeight: 800, color: isSelected ? '#1A1A24' : '#E2DFED' }}>
                          {layer.layerNumber}
                        </span>
                        <span style={{ fontSize: '9px', fontWeight: 700, color: isSelected ? '#1A1A24' : '#9B98B3' }}>
                          {layer.tag}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Explosion Slider Control */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(8px)',
                    padding: '14px 18px',
                    borderRadius: '14px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFF' }}>
                      Drag to Disassemble Layers
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--color-champagne)', fontWeight: 800 }}>
                      {explosionAmount === 0 ? 'Fully Assembled' : explosionAmount === 100 ? 'Fully Exploded' : `${explosionAmount}% Exploded`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={explosionAmount}
                    onChange={(e) => setExplosionAmount(Number(e.target.value))}
                    style={{
                      width: '100%',
                      accentColor: 'var(--color-champagne)',
                      cursor: 'pointer',
                    }}
                  />
                </div>
              </div>
            )}

            {/* 2. Interactive 3D Model */}
            {viewType === '3d' && (
              <div style={{ width: '100%', height: '100%', minHeight: '410px' }}>
                <PodCanvas3D />
              </div>
            )}

            {/* 3. In-Bowl Action */}
            {viewType === 'action' && (
              <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '410px', borderRadius: '16px', overflow: 'hidden' }}>
                <img
                  src="/assets/aurelle_inhand_action.jpg"
                  alt="Aurelle in-hand cleaning action"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    right: '16px',
                    background: 'rgba(0,0,0,0.75)',
                    backdropFilter: 'blur(8px)',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    color: '#FFF',
                    fontSize: '12px',
                  }}
                >
                  Instant effervescent blue enzymatic foam activates within 2 seconds of contact with bowl water.
                </div>
              </div>
            )}
          </div>

          {/* Right: Selected Layer Technical Blueprint Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                background: '#FAF9FD',
                borderRadius: '20px',
                padding: '30px',
                border: `2px solid ${currentComp.color}`,
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: currentComp.color,
                    letterSpacing: '0.08em',
                  }}
                >
                  {currentComp.layerNumber} • {currentComp.tag}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    color: '#2F7D6B',
                    background: '#EAF5F2',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontWeight: 700,
                  }}
                >
                  {currentComp.tolerance}
                </span>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-graphite)', marginBottom: '8px' }}>
                {currentComp.name}
              </h3>

              <div style={{ fontSize: '12px', color: 'var(--color-champagne)', fontWeight: 700, marginBottom: '14px' }}>
                Material: {currentComp.material}
              </div>

              <p style={{ fontSize: '14px', color: 'var(--color-lilac-deep)', lineHeight: 1.6, marginBottom: '20px' }}>
                {currentComp.desc}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {currentComp.points.map((pt, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--color-graphite)' }}>
                    <Check size={15} color={currentComp.color} />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Click Component Selectors */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {ANATOMY_COMPONENTS.map((layer, idx) => (
                <button
                  key={layer.id}
                  onClick={() => {
                    playMechanicalClick();
                    setSelectedLayer(idx);
                  }}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '10px',
                    border: selectedLayer === idx ? `2px solid ${layer.color}` : '1px solid var(--border-subtle)',
                    background: selectedLayer === idx ? '#FFFFFF' : '#F5F5F8',
                    color: selectedLayer === idx ? 'var(--color-graphite)' : 'var(--color-lilac-deep)',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {layer.layerNumber}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
