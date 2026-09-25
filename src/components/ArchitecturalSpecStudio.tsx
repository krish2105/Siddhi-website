import React, { useState } from 'react';
import { Compass, Download, ShieldCheck, Check, Building2, Ruler, Layers, Sparkles, Send, Palette, Sun, Moon, ArrowRight } from 'lucide-react';
import { playMechanicalClick, playSlideSound } from '../lib/sound';

export interface WallSubstrate {
  id: string;
  name: string;
  origin: string;
  textureBg: string;
  textColor: string;
  tag: string;
  adhesionScore: string;
  shearStrength: string;
  vibe: string;
}

export interface HardwareFinish {
  id: string;
  name: string;
  pvdCode: string;
  metallicColor: string;
  glowColor: string;
  accentBorder: string;
  desc: string;
}

const WALL_SUBSTRATES: WallSubstrate[] = [
  {
    id: 'travertine',
    name: 'Honed Italian Travertine',
    origin: 'Tivoli, Italy',
    textureBg: 'linear-gradient(135deg, #E6DDD0 0%, #D4C6B3 50%, #C8B8A2 100%)',
    textColor: '#3A332C',
    tag: 'MINIMALIST WARMTH',
    adhesionScore: '99.4%',
    shearStrength: '8.2 kg/cm²',
    vibe: 'Warm, porous, organic Mediterranean sanctuary',
  },
  {
    id: 'calacatta',
    name: 'Fluted Calacatta Marble',
    origin: 'Carrara, Italy',
    textureBg: 'repeating-linear-gradient(90deg, #F8F8FA 0px, #EBEBED 14px, #DCDCE2 15px, #F8F8FA 20px)',
    textColor: '#1F1E24',
    tag: 'HAUTE LUXURY',
    adhesionScore: '100%',
    shearStrength: '9.4 kg/cm²',
    vibe: 'Sculptural vertical fluting with grey & gold veining',
  },
  {
    id: 'slate',
    name: 'Charcoal Noir Belgian Slate',
    origin: 'Ardennes, Belgium',
    textureBg: 'linear-gradient(135deg, #24242C 0%, #1A1A22 60%, #121217 100%)',
    textColor: '#E8E7F0',
    tag: 'DRAMATIC MONOLITH',
    adhesionScore: '98.9%',
    shearStrength: '8.7 kg/cm²',
    vibe: 'Deep tactile volcanic stone with satin moisture sheen',
  },
  {
    id: 'terrazzo',
    name: 'Venetian Terrazzo & Quartz',
    origin: 'Venice, Italy',
    textureBg: 'radial-gradient(circle at 30% 40%, #E8E2D8 0%, #DFD7C9 70%, #D3C9B8 100%)',
    textColor: '#2E2B26',
    tag: 'CONTEMPORARY CRAFT',
    adhesionScore: '99.1%',
    shearStrength: '8.9 kg/cm²',
    vibe: 'Artisanal mineral chips suspended in micro-terrazzo lime',
  },
];

const HARDWARE_FINISHES: HardwareFinish[] = [
  {
    id: 'champagne-gold',
    name: 'Brushed Champagne Gold (PVD)',
    pvdCode: 'PVD-TiN-24K',
    metallicColor: '#C8A75A',
    glowColor: 'rgba(200, 167, 90, 0.45)',
    accentBorder: '#C8A75A',
    desc: 'Signature warm metallic luster. 10x harder than electroplating, zero corrosion.',
  },
  {
    id: 'obsidian-black',
    name: 'Matte Obsidian Black (PVD)',
    pvdCode: 'PVD-DLC-NOIR',
    metallicColor: '#2B2B33',
    glowColor: 'rgba(50, 50, 60, 0.4)',
    accentBorder: '#4A4A58',
    desc: 'Deep stealth diamond-like carbon coat with anti-fingerprint nanolayer.',
  },
  {
    id: 'rose-gold',
    name: 'Satin Rose Gold (PVD)',
    pvdCode: 'PVD-CuTi-ROSE',
    metallicColor: '#C58C7E',
    glowColor: 'rgba(197, 140, 126, 0.4)',
    accentBorder: '#C58C7E',
    desc: 'Subtle coppery blush. Complements blush marble, brass, and warm timber.',
  },
  {
    id: 'mirror-chrome',
    name: 'Polished Mirror Chrome',
    pvdCode: 'PVD-Cr-MIRROR',
    metallicColor: '#D8DEE4',
    glowColor: 'rgba(216, 222, 228, 0.5)',
    accentBorder: '#AAB2BD',
    desc: 'Brilliant mirror chrome reflecting ambient lighting with jewel-like clarity.',
  },
];

export const ArchitecturalSpecStudio: React.FC = () => {
  const [activeSpecTab, setActiveSpecTab] = useState<'configurator' | 'dimensions' | 'materials' | 'substrate' | 'downloads'>('configurator');
  const [selectedSubstrate, setSelectedSubstrate] = useState<WallSubstrate>(WALL_SUBSTRATES[0]);
  const [selectedFinish, setSelectedFinish] = useState<HardwareFinish>(HARDWARE_FINISHES[0]);
  const [lightingAmbiance, setLightingAmbiance] = useState<'morning' | 'noon' | 'evening'>('morning');
  const [sampleRequested, setSampleRequested] = useState(false);
  const [designerFirm, setDesignerFirm] = useState('');
  const [designerEmail, setDesignerEmail] = useState('');
  const [designerCity, setDesignerCity] = useState('');

  const handleRequestSample = (e: React.FormEvent) => {
    e.preventDefault();
    playMechanicalClick();
    if (designerEmail) {
      setSampleRequested(true);
    }
  };

  const getLightingOverlay = () => {
    switch (lightingAmbiance) {
      case 'morning':
        return 'linear-gradient(105deg, rgba(255, 238, 204, 0.35) 0%, rgba(255, 218, 168, 0.12) 50%, rgba(0,0,0,0.05) 100%)';
      case 'noon':
        return 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(240, 245, 255, 0.05) 100%)';
      case 'evening':
        return 'linear-gradient(135deg, rgba(255, 179, 107, 0.25) 0%, rgba(40, 25, 50, 0.45) 100%)';
    }
  };

  return (
    <section
      id="architectural-studio"
      style={{
        padding: '90px 0',
        background: '#FFFFFF',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px auto' }}>
          <div className="pill-badge" style={{ marginBottom: '14px' }}>
            <Compass size={13} color="#C8A75A" />
            <span>ARCHITECTURAL MATERIAL CONFIGURATOR &amp; STUDIO</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 46px)', marginBottom: '16px', color: 'var(--color-graphite)' }}>
            Match Your Bathroom Architecture
          </h2>
          <p style={{ color: 'var(--color-lilac-deep)', fontSize: '16px', lineHeight: 1.6 }}>
            Crafted to coordinate with natural stone, fluted travertine, and bookmatched marble. Test finishes against your master bath materials before specifying.
          </p>

          {/* Navigation Sub-Tabs */}
          <div
            style={{
              display: 'inline-flex',
              gap: '6px',
              background: '#F5F5F8',
              padding: '4px',
              borderRadius: '9999px',
              marginTop: '24px',
              border: '1px solid var(--border-subtle)',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {[
              { id: 'configurator', label: 'Material Configurator', icon: Palette },
              { id: 'dimensions', label: 'Dimensions & Clearances', icon: Ruler },
              { id: 'materials', label: 'PVD Finish & Materials', icon: Layers },
              { id: 'substrate', label: 'Tile & Stone Adhesion', icon: ShieldCheck },
              { id: 'downloads', label: 'CAD & Swatch Box', icon: Download },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSpecTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    playSlideSound();
                    setActiveSpecTab(tab.id as typeof activeSpecTab);
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
                    background: isActive ? 'var(--color-graphite)' : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--color-lilac-deep)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 0: The Interactive Architectural Material Configurator */}
        {activeSpecTab === 'configurator' && (
          <div
            className="glass-panel"
            style={{
              padding: '36px',
              borderRadius: '24px',
              border: '1px solid var(--border-subtle)',
              background: '#FAF9FD',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                gap: '40px',
                alignItems: 'center',
              }}
            >
              {/* Left Column: Real-Time Architectural Wall Stage */}
              <div
                style={{
                  position: 'relative',
                  height: '460px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: selectedSubstrate.textureBg,
                  boxShadow: 'var(--shadow-xl)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '24px',
                  transition: 'all 0.4s ease',
                }}
              >
                {/* Dynamic Lighting Ambiance Filter */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: getLightingOverlay(),
                    pointerEvents: 'none',
                    transition: 'background 0.5s ease',
                  }}
                />

                {/* Top Stage Badges */}
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      background: 'rgba(255,255,255,0.85)',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      color: 'var(--color-graphite)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {selectedSubstrate.name.toUpperCase()}
                  </span>

                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      background: 'rgba(0,0,0,0.65)',
                      color: '#FFF',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {lightingAmbiance === 'morning' ? <Sun size={12} color="#F5A623" /> : lightingAmbiance === 'noon' ? <Sun size={12} color="#FFF" /> : <Moon size={12} color="#C8A75A" />}
                    <span>{lightingAmbiance === 'morning' ? 'Sunrise 2700K' : lightingAmbiance === 'noon' ? 'Natural 4000K' : 'Evening 2200K'}</span>
                  </span>
                </div>

                {/* Central Mounted Hardware Visual Representation */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 'auto 0',
                  }}
                >
                  {/* Wall Dock Ring */}
                  <div
                    style={{
                      width: '130px',
                      height: '130px',
                      borderRadius: '50%',
                      background: 'linear-gradient(145deg, #FFFFFF, #EBEBED)',
                      border: `4px solid ${selectedFinish.metallicColor}`,
                      boxShadow: `0 12px 28px rgba(0,0,0,0.18), 0 0 30px ${selectedFinish.glowColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    {/* Wand Stem */}
                    <div
                      style={{
                        width: '24px',
                        height: '240px',
                        background: `linear-gradient(90deg, #F0F0F2 0%, ${selectedFinish.metallicColor} 50%, #B89345 100%)`,
                        borderRadius: '12px',
                        boxShadow: `0 8px 24px rgba(0,0,0,0.22), 0 0 16px ${selectedFinish.glowColor}`,
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 0',
                      }}
                    >
                      {/* Knurled Grip Texture */}
                      <div
                        style={{
                          width: '100%',
                          height: '50px',
                          background: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 2px, transparent 2px, transparent 4px)',
                          borderRadius: '4px',
                        }}
                      />
                      {/* Gold Latch Button */}
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: '#FFF',
                          boxShadow: '0 0 8px rgba(255,255,255,0.8)',
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: '24px',
                      background: 'rgba(255,255,255,0.92)',
                      backdropFilter: 'blur(8px)',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      fontSize: '11px',
                      fontWeight: 800,
                      color: 'var(--color-graphite)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    }}
                  >
                    {selectedFinish.name} • {selectedFinish.pvdCode}
                  </div>
                </div>

                {/* Bottom Stage Adhesion Card */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    background: 'rgba(255,255,255,0.94)',
                    backdropFilter: 'blur(10px)',
                    padding: '14px 18px',
                    borderRadius: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-lilac-deep)', textTransform: 'uppercase' }}>
                      3M VHB SHEAR RATING
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#2F7D6B' }}>
                      {selectedSubstrate.adhesionScore} Adhesion ({selectedSubstrate.shearStrength})
                    </div>
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#C8A75A' }}>
                    100% Zero-Drill Safe
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Configuration Selectors */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* 1. Substrate Selector */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-graphite)' }}>
                      1. Select Bathroom Wall Substrate
                    </label>
                    <span style={{ fontSize: '12px', color: 'var(--color-champagne)', fontWeight: 700 }}>
                      {selectedSubstrate.origin}
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    {WALL_SUBSTRATES.map((sub) => {
                      const isSelected = selectedSubstrate.id === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => {
                            playSlideSound();
                            setSelectedSubstrate(sub);
                          }}
                          style={{
                            padding: '12px 14px',
                            borderRadius: '12px',
                            border: isSelected ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                            background: isSelected ? '#FFFFFF' : '#F7F6FA',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-graphite)' }}>
                            {sub.name}
                          </div>
                          <div style={{ fontSize: '10px', color: 'var(--color-lilac-deep)', marginTop: '2px' }}>
                            {sub.tag}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Hardware Finish Selector */}
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-graphite)', display: 'block', marginBottom: '10px' }}>
                    2. Select Hardware Finish (PVD Titanium)
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    {HARDWARE_FINISHES.map((fin) => {
                      const isSelected = selectedFinish.id === fin.id;
                      return (
                        <button
                          key={fin.id}
                          onClick={() => {
                            playSlideSound();
                            setSelectedFinish(fin);
                          }}
                          style={{
                            padding: '12px 14px',
                            borderRadius: '12px',
                            border: isSelected ? `2px solid ${fin.metallicColor}` : '1px solid var(--border-subtle)',
                            background: isSelected ? '#FFFFFF' : '#F7F6FA',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                          }}
                        >
                          <div
                            style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              background: fin.metallicColor,
                              border: '1px solid rgba(0,0,0,0.1)',
                              boxShadow: isSelected ? `0 0 10px ${fin.glowColor}` : 'none',
                              flexShrink: 0,
                            }}
                          />
                          <div>
                            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-graphite)', lineHeight: 1.2 }}>
                              {fin.name.split('(')[0]}
                            </div>
                            <div style={{ fontSize: '9px', color: 'var(--color-lilac-deep)', marginTop: '2px' }}>
                              {fin.pvdCode}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Ambiance Lighting Toggle */}
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-graphite)', display: 'block', marginBottom: '10px' }}>
                    3. Lighting Temperature Simulation
                  </label>
                  <div style={{ display: 'flex', gap: '8px', background: '#FFFFFF', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                    {[
                      { id: 'morning', label: 'Sunrise (2700K)', icon: Sun },
                      { id: 'noon', label: 'Noon Gallery (4000K)', icon: Sun },
                      { id: 'evening', label: 'Evening Soak (2200K)', icon: Moon },
                    ].map((light) => {
                      const Icon = light.icon;
                      const isSel = lightingAmbiance === light.id;
                      return (
                        <button
                          key={light.id}
                          onClick={() => {
                            playSlideSound();
                            setLightingAmbiance(light.id as typeof lightingAmbiance);
                          }}
                          style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            padding: '8px 10px',
                            borderRadius: '8px',
                            border: 'none',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            background: isSel ? 'var(--color-graphite)' : 'transparent',
                            color: isSel ? '#FFFFFF' : 'var(--color-lilac-deep)',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <Icon size={13} />
                          <span>{light.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Compatibility Checklist & CTA */}
                <div
                  style={{
                    background: '#FFFFFF',
                    padding: '20px',
                    borderRadius: '16px',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-graphite)', marginBottom: '8px' }}>
                    {selectedFinish.desc}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-lilac-deep)', lineHeight: 1.5 }}>
                    Coordinates seamlessly with Grohe, Axor, Kohler, and Toto fixtures. Delivered in bespoke presentation box with complimentary starter botanical pods.
                  </div>

                  <a
                    href="#bundles"
                    onClick={() => playMechanicalClick()}
                    className="btn-primary"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px',
                      fontSize: '14px',
                      textDecoration: 'none',
                      marginTop: '16px',
                    }}
                  >
                    <span>Order Configured Hardware Set</span>
                    <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: Dimensions & MEP Clearances */}
        {activeSpecTab === 'dimensions' && (
          <div
            className="glass-panel"
            style={{
              padding: '36px',
              borderRadius: '24px',
              border: '1px solid var(--border-subtle)',
              background: '#FAF9FD',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '36px',
                alignItems: 'center',
              }}
            >
              {/* Technical Blueprint Vector Diagram */}
              <div
                style={{
                  background: '#1C1C26',
                  borderRadius: '18px',
                  padding: '32px',
                  color: '#FFF',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', color: 'var(--color-champagne)' }}>
                    TECHNICAL BLUEPRINT • DWG SPEC
                  </span>
                  <span style={{ fontSize: '11px', color: '#9B98B3' }}>SCALE 1:1 METRIC</span>
                </div>

                {/* SVG Blueprint Wireframe */}
                <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
                  <svg viewBox="0 0 240 280" width="220" height="250">
                    <rect x="70" y="80" width="100" height="150" rx="14" fill="none" stroke="#C8A75A" strokeWidth="2" strokeDasharray="4,2" />
                    <line x1="50" y1="80" x2="50" y2="230" stroke="#6D6A8C" strokeWidth="1" />
                    <line x1="45" y1="80" x2="55" y2="80" stroke="#6D6A8C" strokeWidth="1" />
                    <line x1="45" y1="230" x2="55" y2="230" stroke="#6D6A8C" strokeWidth="1" />
                    <text x="35" y="160" fill="#E2DFED" fontSize="10" textAnchor="middle" transform="rotate(-90 35 160)">120 mm</text>

                    <line x1="70" y1="250" x2="170" y2="250" stroke="#6D6A8C" strokeWidth="1" />
                    <line x1="70" y1="245" x2="70" y2="255" stroke="#6D6A8C" strokeWidth="1" />
                    <line x1="170" y1="245" x2="170" y2="255" stroke="#6D6A8C" strokeWidth="1" />
                    <text x="120" y="268" fill="#E2DFED" fontSize="10" textAnchor="middle">90 mm</text>

                    <rect x="110" y="20" width="20" height="80" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
                    <circle cx="120" cy="15" r="10" fill="none" stroke="#C8A75A" strokeWidth="2" />
                    <line x1="190" y1="15" x2="190" y2="230" stroke="#C8A75A" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="210" y="120" fill="#C8A75A" fontSize="9" textAnchor="middle" transform="rotate(-90 210 120)">Total 420 mm</text>

                    <text x="120" y="155" fill="#C8A75A" fontSize="11" fontWeight="bold" textAnchor="middle">Depth: 36 mm</text>
                  </svg>
                </div>

                <div style={{ fontSize: '11px', color: '#9B98B3', textAlign: 'center', marginTop: '12px' }}>
                  Ultra-slim 36mm profile allows seamless placement behind or beside wall-hung commodes.
                </div>
              </div>

              {/* Clearance Specifications */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 800 }}>Spatial &amp; Mounting Guidelines</h3>

                <div style={{ background: '#FFF', padding: '18px 22px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--color-graphite)', marginBottom: '4px' }}>
                    1. Recommended Finished Floor Clearance (AFFL)
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--color-lilac-deep)', lineHeight: 1.5 }}>
                    Mount between <strong>180 mm and 250 mm</strong> above finished floor level. This guarantees comfortable reach from the toilet seat while leaving ample clearance for wet floor mops.
                  </div>
                </div>

                <div style={{ background: '#FFF', padding: '18px 22px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--color-graphite)', marginBottom: '4px' }}>
                    2. Lateral Commode Offset
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--color-lilac-deep)', lineHeight: 1.5 }}>
                    Position <strong>120 mm to 180 mm</strong> horizontally from the porcelain commode edge. Compatible with wall-hung actuators from Geberit, Grohe, Kohler, and Toto.
                  </div>
                </div>

                <div style={{ background: '#FFF', padding: '18px 22px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--color-graphite)', marginBottom: '4px' }}>
                    3. No-Drill Adhesive Installation
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--color-lilac-deep)', lineHeight: 1.5 }}>
                    Uses commercial-grade <strong>3M VHB closed-cell acrylic foam adhesive</strong>. Zero drilling required into delicate marble, travertine, or porcelain tiles.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: PVD Materials & Luxury Finishes */}
        {activeSpecTab === 'materials' && (
          <div
            className="glass-panel"
            style={{
              padding: '36px',
              borderRadius: '24px',
              border: '1px solid var(--border-subtle)',
              background: '#FAF9FD',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              <div style={{ background: '#FFF', padding: '24px', borderRadius: '18px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-champagne)', textTransform: 'uppercase' }}>
                  HARDWARE TRIM
                </span>
                <h4 style={{ fontSize: '18px', fontWeight: 800, marginTop: '4px', marginBottom: '12px' }}>
                  Brushed Champagne Gold PVD
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-lilac-deep)', lineHeight: 1.6 }}>
                  Physical Vapor Deposition (PVD) titanium nitride coating over precision aluminum. 10x more wear-resistant than electroplating. 100% impervious to humidity and bathroom condensation.
                </p>
                <div style={{ marginTop: '16px', display: 'flex', gap: '8px', fontSize: '11px', color: '#2F7D6B', fontWeight: 700 }}>
                  <Check size={14} /> 500-Hour Neutral Salt Spray Tested (ASTM B117)
                </div>
              </div>

              <div style={{ background: '#FFF', padding: '24px', borderRadius: '18px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-champagne)', textTransform: 'uppercase' }}>
                  CADDY SHELL
                </span>
                <h4 style={{ fontSize: '18px', fontWeight: 800, marginTop: '4px', marginBottom: '12px' }}>
                  Alabaster Mist Matte Composite
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-lilac-deep)', lineHeight: 1.6 }}>
                  Anti-microbial silver-ion impregnated ABS polymer with a tactile soft-touch matte ceramic coat. Non-porous surface resists water spotting, limescale adhesion, and yellowing from UV light.
                </p>
                <div style={{ marginTop: '16px', display: 'flex', gap: '8px', fontSize: '11px', color: '#2F7D6B', fontWeight: 700 }}>
                  <Check size={14} /> ISO 22196 Certified 99.9% Microbial Resistance
                </div>
              </div>

              <div style={{ background: '#FFF', padding: '24px', borderRadius: '18px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-champagne)', textTransform: 'uppercase' }}>
                  CLEANING MATRIX
                </span>
                <h4 style={{ fontSize: '18px', fontWeight: 800, marginTop: '4px', marginBottom: '12px' }}>
                  Bio-Cellulose &amp; Citric Foam
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-lilac-deep)', lineHeight: 1.6 }}>
                  Plant-derived cellulose sponge disc paired with cold-pressed botanical essential oils. Descales hard water minerals naturally without emitting chlorine fumes or stripping porcelain glaze.
                </p>
                <div style={{ marginTop: '16px', display: 'flex', gap: '8px', fontSize: '11px', color: '#2F7D6B', fontWeight: 700 }}>
                  <Check size={14} /> Non-Toxic, Phosphate-Free &amp; Septic-Safe
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Tile & Stone Substrate Compatibility */}
        {activeSpecTab === 'substrate' && (
          <div
            className="glass-panel"
            style={{
              padding: '36px',
              borderRadius: '24px',
              border: '1px solid var(--border-subtle)',
              background: '#FAF9FD',
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px' }}>
              Substrate Adhesion Pull-Force Matrix
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              {[
                { name: 'Natural Travertine', score: '99.4%', status: 'Fully Certified', note: 'Closed-cell VHB foam fills porous fissures with 8.2 kg shear load resistance.' },
                { name: 'Calacatta / Statuario Marble', score: '100%', status: 'Optimal Pairing', note: 'Perfect contact adhesion on honed and polished natural stone.' },
                { name: 'Fluted 3D Textured Ceramic', score: '98.2%', status: 'Tested & Approved', note: 'Adheres securely across ribbed surface peaks with zero peel.' },
                { name: 'Polished Micro-Cement', score: '97.8%', status: 'Primer Pad Included', note: 'Surface bonding primer included in box for lime-plaster and micro-cement.' },
              ].map((sub, i) => (
                <div key={i} style={{ background: '#FFF', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 800, fontSize: '15px' }}>{sub.name}</span>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#2F7D6B' }}>{sub.score}</span>
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-champagne)', marginBottom: '8px' }}>
                    {sub.status}
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--color-lilac-deep)', lineHeight: 1.5 }}>
                    {sub.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: CAD & Spec Downloads + Architect Sample Box */}
        {activeSpecTab === 'downloads' && (
          <div
            className="glass-panel"
            style={{
              padding: '36px',
              borderRadius: '24px',
              border: '1px solid var(--border-subtle)',
              background: '#FAF9FD',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '36px',
                alignItems: 'start',
              }}
            >
              {/* Left: Download Links */}
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '18px' }}>
                  Download Architectural BIM &amp; CAD Files
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { title: 'Aurelle 3D CAD Bundle (.STEP / .OBJ / .FBX)', size: '24.8 MB', desc: 'Ready for 3ds Max, Rhino, SketchUp, and Revit' },
                    { title: 'Architectural Spec Sheet & MEP Blueprint (.PDF)', size: '4.2 MB', desc: 'Dimensions, plumbing clearances, and installation protocols' },
                    { title: 'ASTM B117 & ISO 22196 Lab Test Reports', size: '2.8 MB', desc: 'Corrosion resistance, antimicrobial efficacy, and VHB shear ratings' },
                  ].map((file, idx) => (
                    <div
                      key={idx}
                      onClick={() => playMechanicalClick()}
                      style={{
                        padding: '16px 20px',
                        borderRadius: '14px',
                        background: '#FFF',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-graphite)' }}>{file.title}</div>
                        <div style={{ fontSize: '11px', color: 'var(--color-lilac-deep)', marginTop: '2px' }}>{file.desc}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-champagne)', fontWeight: 700, fontSize: '12px' }}>
                        <Download size={15} />
                        <span>{file.size}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Request Free Architect Swatch Kit */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '18px',
                  padding: '28px',
                  border: '1.5px solid var(--color-champagne)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <div className="pill-badge" style={{ marginBottom: '12px' }}>
                  <Building2 size={12} color="#C8A75A" />
                  <span>FOR DESIGNERS &amp; ARCHITECTS</span>
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>
                  Request Free Material Swatch Box
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-lilac-deep)', lineHeight: 1.5, marginBottom: '20px' }}>
                  We ship a complimentary designer sample box containing a physical brushed champagne gold PVD disc, alabaster composite swatch, and a 3-scent botanical fragrance sampler to architecture studios in India.
                </p>

                {sampleRequested ? (
                  <div style={{ background: '#EDF7F4', border: '1px solid #2F7D6B40', padding: '18px', borderRadius: '12px', textAlign: 'center' }}>
                    <Sparkles size={24} color="#2F7D6B" style={{ margin: '0 auto 8px auto' }} />
                    <div style={{ fontWeight: 800, color: '#1B5446', fontSize: '15px' }}>Sample Request Dispatched!</div>
                    <div style={{ fontSize: '12px', color: '#2A6657', marginTop: '4px' }}>
                      Our design concierge will reach out at {designerEmail} with trackable courier dispatch details.
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleRequestSample} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <input
                      type="text"
                      placeholder="Architecture / Interior Design Firm Name"
                      value={designerFirm}
                      onChange={(e) => setDesignerFirm(e.target.value)}
                      required
                      style={{
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '13px',
                        background: '#FAF9FD',
                      }}
                    />
                    <input
                      type="email"
                      placeholder="Work Email (e.g. design@studio.in)"
                      value={designerEmail}
                      onChange={(e) => setDesignerEmail(e.target.value)}
                      required
                      style={{
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '13px',
                        background: '#FAF9FD',
                      }}
                    />
                    <input
                      type="text"
                      placeholder="City (e.g. Mumbai, Delhi, Bengaluru)"
                      value={designerCity}
                      onChange={(e) => setDesignerCity(e.target.value)}
                      required
                      style={{
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '13px',
                        background: '#FAF9FD',
                      }}
                    />
                    <button
                      type="submit"
                      className="btn-primary"
                      style={{
                        padding: '12px',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        marginTop: '4px',
                      }}
                    >
                      <Send size={14} /> Request Free Swatch Kit
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
