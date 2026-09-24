import React, { useState } from 'react';
import { Compass, Download, ShieldCheck, Check, Building2, Ruler, Layers, Sparkles, Send } from 'lucide-react';
import { playMechanicalClick, playSlideSound } from '../lib/sound';

export const ArchitecturalSpecStudio: React.FC = () => {
  const [activeSpecTab, setActiveSpecTab] = useState<'dimensions' | 'materials' | 'substrate' | 'downloads'>('dimensions');
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
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px auto' }}>
          <div className="pill-badge" style={{ marginBottom: '14px' }}>
            <Compass size={13} color="#C8A75A" />
            <span>ARCHITECTURAL SPECIFICATION STUDIO</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', marginBottom: '16px' }}>
            Engineering Specs for Luxury Bathrooms
          </h2>
          <p style={{ color: 'var(--color-lilac-deep)', fontSize: '16px', lineHeight: 1.6 }}>
            Designed to disappear into the finest residential and hospitality architecture. Explore technical blueprints, CAD models, and tile substrate adhesion ratings.
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
              { id: 'dimensions', label: 'Dimensions & Clearances', icon: Ruler },
              { id: 'materials', label: 'PVD Finish & Materials', icon: Layers },
              { id: 'substrate', label: 'Tile & Stone Adhesion', icon: ShieldCheck },
              { id: 'downloads', label: 'CAD & Spec Downloads', icon: Download },
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
                    {/* Caddy Outline */}
                    <rect x="70" y="80" width="100" height="150" rx="14" fill="none" stroke="#C8A75A" strokeWidth="2" strokeDasharray="4,2" />
                    {/* Dimension lines */}
                    <line x1="50" y1="80" x2="50" y2="230" stroke="#6D6A8C" strokeWidth="1" />
                    <line x1="45" y1="80" x2="55" y2="80" stroke="#6D6A8C" strokeWidth="1" />
                    <line x1="45" y1="230" x2="55" y2="230" stroke="#6D6A8C" strokeWidth="1" />
                    <text x="35" y="160" fill="#E2DFED" fontSize="10" textAnchor="middle" transform="rotate(-90 35 160)">120 mm</text>

                    {/* Width dimension */}
                    <line x1="70" y1="250" x2="170" y2="250" stroke="#6D6A8C" strokeWidth="1" />
                    <line x1="70" y1="245" x2="70" y2="255" stroke="#6D6A8C" strokeWidth="1" />
                    <line x1="170" y1="245" x2="170" y2="255" stroke="#6D6A8C" strokeWidth="1" />
                    <text x="120" y="268" fill="#E2DFED" fontSize="10" textAnchor="middle">90 mm</text>

                    {/* Wand sticking out */}
                    <rect x="110" y="20" width="20" height="80" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
                    <circle cx="120" cy="15" r="10" fill="none" stroke="#C8A75A" strokeWidth="2" />
                    <line x1="190" y1="15" x2="190" y2="230" stroke="#C8A75A" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="210" y="120" fill="#C8A75A" fontSize="9" textAnchor="middle" transform="rotate(-90 210 120)">Total 420 mm</text>

                    {/* Depth callout */}
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
                    Mount between <strong>180 mm and 250 mm</strong> above the finished floor level. This guarantees comfortable arm reach from the toilet seat while leaving ample clearance for wet floor mops.
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
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
