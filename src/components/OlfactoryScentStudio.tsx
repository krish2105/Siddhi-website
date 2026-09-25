import React, { useState, useEffect, useRef } from 'react';
import { Wind, Droplets, Sparkles, Plus, Check } from 'lucide-react';
import { playSlideSound, playMechanicalClick } from '../lib/sound';

export interface FragranceNoteDetail {
  id: string;
  number: string;
  name: string;
  mood: string;
  color: string;
  accentBg: string;
  accentBorder: string;
  description: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  botanicalOrigin: string;
  idealFor: string;
}

export const SCENT_COLLECTION: FragranceNoteDetail[] = [
  {
    id: 'bergamot-sel',
    number: 'NO. 01',
    name: 'Mediterranean Bergamot & Fleur de Sel',
    mood: 'Luminous, crisp, high-saline sea air',
    color: '#C8A75A',
    accentBg: 'rgba(200, 167, 90, 0.08)',
    accentBorder: 'rgba(200, 167, 90, 0.28)',
    description:
      'Inspired by the rocky sun-drenched cliffs of the Amalfi Coast. Cold-pressed green bergamot rinds blended with hand-harvested Guérande sea salt and wild samphire.',
    topNotes: ['Calabrian Bergamot', 'Crushed Fleur de Sel', 'Crisp Coastal Ozone'],
    heartNotes: ['Neroli Petals', 'Wild Italian Rosemary', 'Sweet Orange Blossom'],
    baseNotes: ['Solar Ambergris', 'Sun-Bleached Driftwood', 'White Cypress'],
    botanicalOrigin: 'Calabria, Southern Italy & Brittany, France',
    idealFor: 'Morning rituals & high-traffic powder rooms',
  },
  {
    id: 'kyoto-hinoki',
    number: 'NO. 02',
    name: 'Kyoto Hinoki & Smoked Vetiver',
    mood: 'Meditative, earthy, ancient forest warmth',
    color: '#2F7D6B',
    accentBg: 'rgba(47, 125, 107, 0.08)',
    accentBorder: 'rgba(47, 125, 107, 0.28)',
    description:
      'A serene olfactory ode to traditional Japanese onsen hot spring baths. Resinous hinoki cypress heartwood balanced by earthy smoked Haitian vetiver and white ceremonial incense.',
    topNotes: ['Japanese Yuzu Rind', 'Hinoki Pine Needles', 'Mountain Mist'],
    heartNotes: ['Aged Cedar Bark', 'White Kyoto Incense', 'Smoked Black Tea'],
    baseNotes: ['Haitian Vetiver Root', 'Damp River Moss', 'Golden Labdanum'],
    botanicalOrigin: 'Kiso Valley, Japan & Les Cayes, Haiti',
    idealFor: 'Evening soaking rituals & master en-suite sanctuaries',
  },
  {
    id: 'provence-lavender',
    number: 'NO. 03',
    name: 'Provence Lavender & Cashmere Woods',
    mood: 'Restorative, powdery, tranquil velvet',
    color: '#7D6A9B',
    accentBg: 'rgba(125, 106, 155, 0.08)',
    accentBorder: 'rgba(125, 106, 155, 0.28)',
    description:
      'Harvested at twilight in the high-altitude plateau of Valensole. Wild organic lavender inflorescences combined with creamy Mysore sandalwood and tonka bean.',
    topNotes: ['Highland French Lavender', 'Wild Mountain Thyme', 'Bergamot Leaf'],
    heartNotes: ['Clary Sage Blossom', 'Crushed Chamomile', 'Violet Leaf'],
    baseNotes: ['Mysore Sandalwood', 'Warm Tonka Bean', 'Cashmere Amber'],
    botanicalOrigin: 'Plateau de Valensole, Haute-Provence',
    idealFor: 'Calming architectural guest baths & bedtime wind-downs',
  },
];

interface OlfactoryScentStudioProps {
  onAddScentToCart?: (scent: FragranceNoteDetail) => void;
}

export const OlfactoryScentStudio: React.FC<OlfactoryScentStudioProps> = ({ onAddScentToCart }) => {
  const [activeScentIndex, setActiveScentIndex] = useState(0);
  const [diffusionIntensity, setDiffusionIntensity] = useState(3);
  const [activeAccordTab, setActiveAccordTab] = useState<'all' | 'top' | 'heart' | 'base'>('all');
  const [isAdded, setIsAdded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentScent = SCENT_COLLECTION[activeScentIndex];

  // Micro particle mist simulation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Array<{ x: number; y: number; size: number; speedY: number; speedX: number; opacity: number }> = [];

    // Initialize particles based on intensity
    const particleCount = diffusionIntensity * 8;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedY: -(Math.random() * 0.6 + 0.2),
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = currentScent.color;

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentScent, diffusionIntensity]);

  const handleSelectScent = (idx: number) => {
    playSlideSound();
    setActiveScentIndex(idx);
    setIsAdded(false);
  };

  const handleAddToCart = () => {
    playMechanicalClick();
    setIsAdded(true);
    if (onAddScentToCart) {
      onAddScentToCart(currentScent);
    }
    setTimeout(() => setIsAdded(false), 3000);
  };

  return (
    <section
      id="olfactory-studio"
      style={{
        padding: '100px 0',
        background: '#FAF9F6',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 56px auto' }}>
          <div className="pill-badge" style={{ marginBottom: '16px', background: '#FFFFFF' }}>
            <Droplets size={13} color="#C8A75A" />
            <span>AESOP-INSPIRED SENSORY ARCHITECTURE</span>
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '18px', color: 'var(--color-graphite)' }}>
            The Olfactory Scent Studio
          </h2>
          <p style={{ color: 'var(--color-lilac-deep)', fontSize: '17px', lineHeight: 1.65 }}>
            Traditional toilet cleaning relies on harsh petrochemical bleach fumes that assault the senses. Aurelle transforms every sanitizing contact into a bespoke haute perfumery ritual.
          </p>

          {/* Scent Flacon Selector Tabs */}
          <div
            style={{
              display: 'inline-flex',
              gap: '10px',
              background: '#FFFFFF',
              padding: '6px',
              borderRadius: '9999px',
              marginTop: '32px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              border: '1px solid var(--border-subtle)',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {SCENT_COLLECTION.map((scent, i) => {
              const isSelected = activeScentIndex === i;
              return (
                <button
                  key={scent.id}
                  onClick={() => handleSelectScent(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 22px',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: 'pointer',
                    background: isSelected ? 'var(--color-graphite)' : 'transparent',
                    color: isSelected ? '#FFFFFF' : 'var(--color-lilac-deep)',
                    fontWeight: 700,
                    fontSize: '13px',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: scent.color,
                      boxShadow: isSelected ? `0 0 10px ${scent.color}` : 'none',
                    }}
                  />
                  <span>{scent.number} • {scent.name.split('&')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Studio Main Stage */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '40px',
            alignItems: 'stretch',
          }}
        >
          {/* Left Column: Visual Flacon & Ingredients Editorial */}
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              background: '#1A1A22',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              minHeight: '480px',
            }}
          >
            {/* Background Editorial Image */}
            <img
              src="/images/aurelle_olfactory_ingredients.jpg"
              alt="Aurelle raw perfumery botanical ingredients on wet Nero Marquina marble"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.82,
                transition: 'opacity 0.4s ease',
              }}
            />

            {/* Particle Canvas Overlay */}
            <canvas
              ref={canvasRef}
              width={400}
              height={500}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />

            {/* Gradient Scrim */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(16, 16, 22, 0.94) 0%, rgba(16, 16, 22, 0.4) 50%, rgba(16,16,22,0.15) 100%)',
                zIndex: 1,
              }}
            />

            {/* Editorial Glass Overlay Card */}
            <div
              style={{
                position: 'relative',
                zIndex: 3,
                padding: '32px',
                color: '#FFFFFF',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    color: currentScent.color,
                    background: 'rgba(255,255,255,0.1)',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  BOTANICAL ORIGIN: {currentScent.botanicalOrigin}
                </span>
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, margin: '6px 0 10px 0', color: '#FFF' }}>
                {currentScent.name}
              </h3>
              <p style={{ fontSize: '14px', color: '#D4D2E2', lineHeight: 1.6, marginBottom: '20px' }}>
                {currentScent.description}
              </p>

              {/* Diffusion Rhythm / Intensity Control */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#FFF' }}>
                    <Wind size={14} color={currentScent.color} />
                    <span>Diffusion Intensity & Ambient Bloom</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: currentScent.color }}>
                    Level {diffusionIntensity} / 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={diffusionIntensity}
                  onChange={(e) => setDiffusionIntensity(Number(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: currentScent.color,
                    cursor: 'pointer',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#A09DB8', marginTop: '6px' }}>
                  <span>Subtle Whisper (Powder Rooms)</span>
                  <span>Full Bloom (Grand Master Baths)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Olfactory Note Pyramid & Subscription Curation */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '36px',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {/* Accord Filter Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', color: currentScent.color, textTransform: 'uppercase' }}>
                    THE FRAGRANCE PYRAMID
                  </span>
                  <h4 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-graphite)', marginTop: '2px' }}>
                    Artisanal Note Architecture
                  </h4>
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '4px',
                    background: '#F5F5F8',
                    padding: '3px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                  }}
                >
                  {(['all', 'top', 'heart', 'base'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveAccordTab(tab)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        border: 'none',
                        cursor: 'pointer',
                        background: activeAccordTab === tab ? 'var(--color-graphite)' : 'transparent',
                        color: activeAccordTab === tab ? '#FFF' : 'var(--color-lilac-deep)',
                        fontWeight: 700,
                        textTransform: 'capitalize',
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fragrance Accord Tiers */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* 1. Top Notes Tier */}
                {(activeAccordTab === 'all' || activeAccordTab === 'top') && (
                  <div
                    style={{
                      background: '#FAF9FD',
                      borderRadius: '16px',
                      padding: '18px 22px',
                      border: '1px solid var(--border-subtle)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-graphite)', letterSpacing: '0.06em' }}>
                        TOP NOTES (FIRST 15 MINUTES)
                      </span>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: currentScent.color }}>
                        Instant Effervescent Lift
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {currentScent.topNotes.map((note, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: '#FFFFFF',
                            border: `1px solid ${currentScent.accentBorder}`,
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: 'var(--color-graphite)',
                          }}
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Heart Notes Tier */}
                {(activeAccordTab === 'all' || activeAccordTab === 'heart') && (
                  <div
                    style={{
                      background: '#FAF9FD',
                      borderRadius: '16px',
                      padding: '18px 22px',
                      border: '1px solid var(--border-subtle)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-graphite)', letterSpacing: '0.06em' }}>
                        HEART NOTES (HOURS 1 TO 6)
                      </span>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: currentScent.color }}>
                        Botanical Ambiance
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {currentScent.heartNotes.map((note, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: '#FFFFFF',
                            border: `1px solid ${currentScent.accentBorder}`,
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: 'var(--color-graphite)',
                          }}
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Base Notes Tier */}
                {(activeAccordTab === 'all' || activeAccordTab === 'base') && (
                  <div
                    style={{
                      background: '#FAF9FD',
                      borderRadius: '16px',
                      padding: '18px 22px',
                      border: '1px solid var(--border-subtle)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-graphite)', letterSpacing: '0.06em' }}>
                        BASE NOTES (PERSISTENT 24-HOUR TRAIL)
                      </span>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: currentScent.color }}>
                        Quiet Luxury Sillage
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {currentScent.baseNotes.map((note, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: '#FFFFFF',
                            border: `1px solid ${currentScent.accentBorder}`,
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: 'var(--color-graphite)',
                          }}
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Ideal Space Fit Callout */}
              <div
                style={{
                  marginTop: '20px',
                  background: currentScent.accentBg,
                  border: `1px solid ${currentScent.accentBorder}`,
                  padding: '14px 18px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <Sparkles size={16} color={currentScent.color} />
                <div style={{ fontSize: '13px', color: 'var(--color-graphite)', lineHeight: 1.4 }}>
                  <strong>Curator’s Recommendation:</strong> {currentScent.idealFor}. Infused with 100% steam-distilled pure botanical essences; zero synthetic phthalates or artificial aerosols.
                </div>
              </div>
            </div>

            {/* Bottom Add-To-Ritual CTA */}
            <div
              style={{
                marginTop: '32px',
                paddingTop: '24px',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div>
                <div style={{ fontSize: '12px', color: 'var(--color-lilac-deep)', fontWeight: 600 }}>
                  90-Day Refill Ritual (36 Pods)
                </div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-graphite)' }}>
                  ₹799 <span style={{ fontSize: '13px', color: 'var(--color-lilac-deep)', fontWeight: 500 }}>/ ₹22 per pod</span>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-primary"
                style={{
                  padding: '14px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  background: isAdded ? '#2F7D6B' : 'var(--color-graphite)',
                }}
              >
                {isAdded ? (
                  <>
                    <Check size={16} /> Added to Cart
                  </>
                ) : (
                  <>
                    <Plus size={16} /> Select {currentScent.number} Refill
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
