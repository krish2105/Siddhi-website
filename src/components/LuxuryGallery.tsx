import React, { useState } from 'react';
import { Sparkles, Maximize2, Check, Eye, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { BRAND } from '../config/brand.config';
import { playSlideSound, playMechanicalClick } from '../lib/sound';

export const LuxuryGallery: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<number>(0);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const galleryItems = [
    {
      title: 'Presidential Suite Hospitality Standard',
      subtitle: 'Italian Calacatta Marble & Bronze Accents',
      image: '/assets/aurelle_hotel_suite.jpg',
      tag: '5-STAR HOSPITALITY',
      description:
        'Installed in boutique hotels and luxury residences across Mumbai, Delhi, and Bengaluru. The sleek flush-mounted profile integrates flawlessly with Italian bookmatched marble and wall-hung designer sanitary ware.',
      specs: [
        'Concealed rear ventilation channel for rapid passive evaporation',
        'Brushed champagne gold PVD hardware immune to humidity',
        'Discreet, odor-free guest bathroom architectural touchpoint',
      ],
      architecturalSetting: 'Bookmatched Calacatta Gold & Axor Fixtures',
    },
    {
      title: 'The Presentation Box & Unboxing',
      subtitle: 'Apple & Aesop-Grade Packaging Experience',
      image: '/images/aurelle_unboxing_presentation.jpg',
      tag: 'UNBOXING RITUAL',
      description:
        'Crafted from rigid charcoal-black linen with deep emerald crushed velvet. Inside: molded cradle cradling the knurled champagne gold wand, amber scent pods, and a solid brass authenticity certificate.',
      specs: [
        'Emerald velvet cradle with laser-engraved solid brass certificate',
        'Amber glass essence vials with gold-capped airtight seals',
        'Zero single-use plastic wrap or non-recyclable foams',
      ],
      architecturalSetting: 'Rigid Linen Presentation Gift Box & Crushed Velvet',
    },
    {
      title: 'Haute Olfactory Botanical Formulation',
      subtitle: 'Cold-Pressed Essential Perfumery Notes',
      image: '/images/aurelle_olfactory_ingredients.jpg',
      tag: 'AESOP-GRADE PERFUMERY',
      description:
        'Raw Italian bergamot slices, Japanese hinoki cypress wood, wild French lavender, and grey sea salt crystals on Nero Marquina marble. Eliminates artificial chemical bleach smells forever.',
      specs: [
        'Pure cold-pressed citrus and coniferous essential extracts',
        'Active water-dissolving micro-bubbles with zero chlorine fumes',
        'Replaces synthetic aerosol sprays with quiet luxury botanicals',
      ],
      architecturalSetting: 'Nero Marquina Marble & Raw Botanicals',
    },
    {
      title: 'Effervescent Foaming Micro-Bubbles',
      subtitle: 'Water-Activated Blue Lather Macro',
      image: '/assets/aurelle_foam_macro.jpg',
      tag: 'ACTIVE SCIENCE',
      description:
        'Ultra-macro freeze-frame of the concentrated citrus-mineral capsule meeting clear water. Instant effervescence releases natural plant surfactants and odor-neutralizing botanical oils.',
      specs: [
        'Instant self-activating oceanic enzymatic foam',
        'Phosphate-free citric descaling of hard water minerals',
        'Zero harsh chlorine or hydrochloric acid fumes',
      ],
      architecturalSetting: 'High-Speed Fluid Dynamic Macro Photography',
    },
    {
      title: 'Ergonomic Cleaning in Action',
      subtitle: 'Effervescent Ocean Blue Foam Contact',
      image: '/assets/aurelle_inhand_action.jpg',
      tag: 'ACTIVE FOAMING',
      description:
        'The moment the bio-cellulose head meets water, concentrated enzymatic cleaner instantly produces rich effervescent foam that breaks down limescale while keeping hands 18 inches away.',
      specs: [
        'Under-rim deep contour reach with zero skin contact',
        'Zero chemical splashes or back-drips',
        'Rigid core structure withstands up to 15kg scrub force',
      ],
      architecturalSetting: 'Hands-Free 18-Inch Telescoping Clearance',
    },
    {
      title: 'Architectural Fluted Wall Mount',
      subtitle: 'Warm Concealed Perimeter Ambience',
      image: '/assets/aurelle_wallmount_detail.jpg',
      tag: 'HARDWARE INTEGRATION',
      description:
        'Slim 36mm profile mounted on vertical fluted marble. Soft ambient lighting catches the champagne-gold PVD trim, turning a traditionally hidden chore into an architectural fixture.',
      specs: [
        '3M VHB heavy-duty adhesive mounting (zero drilling)',
        'Brushed Champagne Gold perimeter bezel and latch',
        'Ventilated moisture-evaporating architectural dock',
      ],
      architecturalSetting: 'Vertical Fluted Marble & Warm LED Cove',
    },
    {
      title: 'Travertine Master Bathroom Suite',
      subtitle: 'Natural Sunrise & Monolithic Stone Textures',
      image: '/images/aurelle_master_bathroom_editorial.jpg',
      tag: 'ARCHITECTURAL DIGEST',
      description:
        'Sunlight pouring through fluted glass screens onto honed Italian travertine and a freestanding stone bath. Aurelle rests on a floating stone vanity with a gentle warm halo charging dock.',
      specs: [
        'Coordinates seamlessly with Kohler, Grohe, Axor & Toto',
        'Compact 90 × 120 mm footprint with floating vanity clearance',
        'Engineered for honed travertine, slate, and bookmatched marble',
      ],
      architecturalSetting: 'Honed Roman Travertine & Fluted Glass Screen',
    },
  ];

  const handlePrev = () => {
    playSlideSound();
    setActivePhoto((prev) => (prev > 0 ? prev - 1 : galleryItems.length - 1));
  };

  const handleNext = () => {
    playSlideSound();
    setActivePhoto((prev) => (prev < galleryItems.length - 1 ? prev + 1 : 0));
  };

  const currentItem = galleryItems[activePhoto];

  return (
    <section
      id="gallery"
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
            <Sparkles size={13} color="#C8A75A" />
            <span>ARCHITECTURAL PHOTOGRAPHY &amp; HARDWARE CRAFT</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', marginBottom: '14px' }}>
            Crafted for the Modern Bathroom
          </h2>
          <p style={{ color: 'var(--color-lilac-deep)', fontSize: '16px', lineHeight: 1.6 }}>
            Explore the physical materials, unboxing ritual, and high-performance foaming action of {BRAND.name}.
          </p>
        </div>

        {/* Symmetrical Master Showcase: Perfectly Aligned 2-Column Grid */}
        <div
          className="gallery-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '32px',
            alignItems: 'stretch',
            marginBottom: '36px',
          }}
        >
          {/* Left Column: Full-Height Photo Display with Controls */}
          <div
            className="glass-panel"
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              minHeight: '480px',
              height: '100%',
              maxHeight: '540px',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-xl)',
              background: '#F5F5F8',
            }}
          >
            <img
              src={currentItem.image}
              alt={currentItem.title}
              key={currentItem.image}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'opacity 0.4s ease, transform 0.6s ease',
              }}
            />

            {/* Floating Top Left Tag Pill */}
            <div
              style={{
                position: 'absolute',
                top: '18px',
                left: '18px',
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(10px)',
                padding: '6px 14px',
                borderRadius: '9999px',
                color: 'var(--color-graphite)',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.06em',
                border: '1px solid var(--color-champagne)',
                boxShadow: '0 4px 12px rgba(28, 28, 38, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C8A75A' }} />
              <span>{currentItem.tag}</span>
            </div>

            {/* Top Right: Enlarge Lightbox Button */}
            <button
              onClick={() => {
                playMechanicalClick();
                setModalImage(currentItem.image);
              }}
              title="Click to view high-resolution photo"
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-graphite)',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                transition: 'transform 0.2s ease',
              }}
            >
              <Maximize2 size={16} />
            </button>

            {/* Bottom Caption Overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px',
                background: 'linear-gradient(to top, rgba(20, 20, 28, 0.92) 0%, rgba(20, 20, 28, 0.5) 60%, transparent 100%)',
                color: '#FFFFFF',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '4px', textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>
                    {currentItem.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#E4E2ED', opacity: 0.95 }}>
                    {currentItem.subtitle}
                  </p>
                </div>

                {/* Left/Right Step Controls on image */}
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <button
                    onClick={handlePrev}
                    aria-label="Previous image"
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      color: '#FFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next image"
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      color: '#FFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Focus & Craftsmanship Breakdown */}
          <div
            className="glass-panel"
            style={{
              borderRadius: '24px',
              padding: '36px',
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '480px',
              height: '100%',
              maxHeight: '540px',
            }}
          >
            <div>
              {/* Counter & Category Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      background: 'rgba(200, 167, 90, 0.12)',
                      color: 'var(--color-champagne)',
                      border: '1px solid rgba(200, 167, 90, 0.3)',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                    }}
                  >
                    0{activePhoto + 1} / 0{galleryItems.length}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-lilac-deep)' }}>
                    ARCHITECTURAL SETTING
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '4px' }}>
                  {galleryItems.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        playSlideSound();
                        setActivePhoto(idx);
                      }}
                      aria-label={`Go to slide ${idx + 1}`}
                      style={{
                        width: activePhoto === idx ? '22px' : '7px',
                        height: '6px',
                        borderRadius: '3px',
                        background: activePhoto === idx ? 'var(--color-champagne)' : '#E2DFED',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'all 0.25s ease',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Title & Setting */}
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-graphite)', marginBottom: '8px', lineHeight: 1.25 }}>
                {currentItem.title}
              </h3>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--color-champagne)',
                  fontSize: '13px',
                  fontWeight: 700,
                  marginBottom: '16px',
                }}
              >
                <Compass size={14} />
                <span>{currentItem.architecturalSetting}</span>
              </div>

              {/* Narrative */}
              <p style={{ color: 'var(--color-lilac-deep)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
                {currentItem.description}
              </p>

              {/* Specifications List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentItem.specs.map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      background: 'rgba(245, 245, 248, 0.65)',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '1px solid rgba(28, 28, 38, 0.04)',
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'rgba(200, 167, 90, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '1px',
                      }}
                    >
                      <Check size={12} color="#C8A75A" />
                    </div>
                    <span style={{ fontSize: '13px', color: 'var(--color-graphite)', fontWeight: 500, lineHeight: 1.4 }}>
                      {spec}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action / View Switcher */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-subtle)',
                marginTop: '20px',
              }}
            >
              <span style={{ fontSize: '12px', color: 'var(--color-lilac-deep)' }}>
                Click below to inspect another setting
              </span>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handlePrev}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: '#F5F5F8',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    color: 'var(--color-graphite)',
                  }}
                >
                  ← Prev
                </button>
                <button
                  onClick={handleNext}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: 'var(--color-graphite)',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    color: '#FFFFFF',
                  }}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating VisionOS Glassmorphism Dock for Gallery Photos */}
        <div
          style={{
            position: 'relative',
            zIndex: 20,
            display: 'flex',
            justifyContent: 'center',
            padding: '0 8px',
          }}
        >
          <div
            className="glass-panel"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 16px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(200, 167, 90, 0.4)',
              boxShadow: '0 20px 40px -10px rgba(28, 28, 38, 0.16), 0 0 0 1px rgba(255, 255, 255, 0.8) inset',
              overflowX: 'auto',
              maxWidth: '100%',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0 10px 0 4px',
                borderRight: '1px solid var(--border-subtle)',
                fontSize: '11px',
                fontWeight: 800,
                color: 'var(--color-champagne)',
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap',
              }}
            >
              <Eye size={13} />
              <span>VIEWS ({activePhoto + 1}/{galleryItems.length})</span>
            </div>

            {galleryItems.map((item, idx) => {
              const isActive = activePhoto === idx;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    playSlideSound();
                    setActivePhoto(idx);
                  }}
                  title={item.title}
                  style={{
                    position: 'relative',
                    width: '80px',
                    height: '52px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    flexShrink: 0,
                    border: isActive ? '2.5px solid var(--color-champagne)' : '1px solid rgba(0,0,0,0.1)',
                    boxShadow: isActive ? '0 0 14px rgba(200, 167, 90, 0.55), 0 4px 10px rgba(0,0,0,0.15)' : 'none',
                    transform: isActive ? 'scale(1.08)' : 'scale(1)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: isActive ? 'transparent' : 'rgba(0,0,0,0.18)',
                      transition: 'background 0.2s ease',
                    }}
                  />
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: '#C8A75A',
                        boxShadow: '0 0 6px #C8A75A',
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {modalImage && (
        <div className="drawer-backdrop" onClick={() => setModalImage(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '94%',
              maxWidth: '1000px',
              maxHeight: '90vh',
              borderRadius: '24px',
              overflow: 'hidden',
              background: '#000',
              zIndex: 1001,
              boxShadow: '0 25px 70px rgba(0,0,0,0.5)',
            }}
          >
            <img src={modalImage} alt="Fullscreen View" style={{ width: '100%', height: 'auto', maxHeight: '85vh', objectFit: 'contain', display: 'block' }} />
            <button
              onClick={() => setModalImage(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(28, 28, 38, 0.85)',
                color: '#FFF',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '9999px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 700,
              }}
            >
              Close ✕
            </button>
          </div>
        </div>
      )}

      {/* Responsive Inline CSS */}
      <style>{`
        @media (max-width: 860px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
          }
          .gallery-grid > div {
            max-height: none !important;
            min-height: auto !important;
          }
        }
      `}</style>
    </section>
  );
};
