import React, { useState } from 'react';
import { Sparkles, Maximize2, Check, Eye } from 'lucide-react';
import { BRAND } from '../config/brand.config';
import { playSlideSound } from '../lib/sound';

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
        'Installed in boutique hotels and luxury residences across Mumbai, Delhi, and Bengaluru. Sleek flush-mounted profile integrates flawlessly with Italian bookmatched marble and wall-hung designer sanitary ware.',
      specs: ['Concealed rear ventilation channel', 'Brushed champagne PVD hardware', 'Discreet, odor-free guest bathroom touchpoint'],
    },
    {
      title: 'The Presentation Box & Unboxing',
      subtitle: 'Apple & Aesop-Grade Packaging Experience',
      image: '/assets/aurelle_unboxing.jpg',
      tag: 'UNBOXING RITUAL',
      description:
        'Crafted from 100% recycled rigid board with debossed champagne gold typography. Inside: molded pulp cradle holding the wall caddy, telescoping wand, starter pod tubes, and a gold-foil QR welcome card.',
      specs: ['Custom molded biodegradable pulp tray', 'Laser-etched inside QR reorder card', 'Zero single-use plastic wrap'],
    },
    {
      title: 'The Refill Ritual: Amber Glass & Linen',
      subtitle: 'Artisanal Countertop Display',
      image: '/assets/aurelle_refill_ritual.jpg',
      tag: 'DAILY RITUAL',
      description:
        'Refill pods arrive in raw unbleached natural linen pouches with debossed metallic logo. Transfer seamlessly into fluted amber glass apothecary canisters for an elevated countertop presence.',
      specs: ['Natural unbleached linen pouch', 'Moisture-sealed bio-film capsules', 'Zero clutter under the sink'],
    },
    {
      title: 'Effervescent Foaming Micro-Bubbles',
      subtitle: 'Water-Activated Blue Lather Macro',
      image: '/assets/aurelle_foam_macro.jpg',
      tag: 'ACTIVE SCIENCE',
      description:
        'Ultra-macro freeze-frame of the concentrated citrus-mineral capsule meeting clear water. Instant effervescence releases natural plant surfactants and odor-neutralizing botanical oils.',
      specs: ['Instant self-activating foam', 'Phosphate-free citric descaling', 'Zero harsh chlorine or hydrochloric acid fumes'],
    },
    {
      title: 'Ergonomic Cleaning in Action',
      subtitle: 'Effervescent Ocean Blue Foam Contact',
      image: '/assets/aurelle_inhand_action.jpg',
      tag: 'ACTIVE FOAMING',
      description:
        'The moment the bio-cellulose head meets water, concentrated enzymatic cleaner instantly produces rich effervescent foam that breaks down limescale while keeping hands 18 inches away.',
      specs: ['Under-rim deep contour reach', 'Zero chemical splashes on skin', 'Rigid core withstands 15kg scrub force'],
    },
    {
      title: 'Architectural Fluted Wall Mount',
      subtitle: 'Warm Concealed Perimeter Ambience',
      image: '/assets/aurelle_wallmount_detail.jpg',
      tag: 'HARDWARE INTEGRATION',
      description:
        'Slim 36mm profile mounted on vertical fluted marble. Soft ambient lighting catches the champagne-gold PVD trim, turning a traditionally hidden chore into an architectural fixture.',
      specs: ['3M VHB heavy-duty adhesive (No drilling)', 'Brushed Champagne Gold PVD trim', 'Ventilated moisture-evaporating dock'],
    },
    {
      title: 'Travertine Master Bathroom Setting',
      subtitle: 'Natural Sunlight & Stone Textures',
      image: '/assets/aurelle_hero_travertine.jpg',
      tag: 'ARCHITECTURAL DIGEST',
      description:
        'Engineered to complement limestone, travertine, and micro-cement bathrooms. Designed to disappear elegantly next to modern wall-hung sanitary ware.',
      specs: ['Coordinates with Kohler, Grohe & Axor', 'Compact 90 × 120 mm footprint', 'Floor-clearance design'],
    },
  ];

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
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 54px auto' }}>
          <div className="pill-badge" style={{ marginBottom: '14px' }}>
            <Sparkles size={13} color="#C8A75A" />
            <span>ARCHITECTURAL PHOTOGRAPHY &amp; HARDWARE CRAFT</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 48px)', marginBottom: '16px' }}>
            Crafted for the Modern Bathroom
          </h2>
          <p style={{ color: 'var(--color-lilac-deep)', fontSize: '17px', lineHeight: 1.6 }}>
            Explore the physical materials, unboxing ritual, and high-performance foaming action of {BRAND.name}.
          </p>
        </div>

        {/* Featured Big Showcase + Thumbnails */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '36px',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          {/* Big Featured Photo Display */}
          <div
            className="glass-panel"
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-hero)',
              overflow: 'hidden',
              minHeight: '440px',
              height: '480px',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-xl)',
              background: '#F5F5F8',
              cursor: 'zoom-in',
            }}
            onClick={() => setModalImage(galleryItems[activePhoto].image)}
          >
            <img
              src={galleryItems[activePhoto].image}
              alt={galleryItems[activePhoto].title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.5s ease',
              }}
            />

            {/* Floating Info Tag Pill */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: 'rgba(28, 28, 38, 0.9)',
                backdropFilter: 'blur(10px)',
                padding: '6px 14px',
                borderRadius: '9999px',
                color: '#FFF',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                border: '1px solid var(--color-champagne)',
              }}
            >
              {galleryItems[activePhoto].tag}
            </div>

            {/* Click to Enlarge Icon */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-graphite)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              <Maximize2 size={16} />
            </div>

            {/* Bottom Caption Overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px',
                background: 'linear-gradient(to top, rgba(28, 28, 38, 0.92) 0%, rgba(28, 28, 38, 0) 100%)',
                color: '#FFFFFF',
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '4px' }}>
                {galleryItems[activePhoto].title}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-mist)', opacity: 0.9 }}>
                {galleryItems[activePhoto].subtitle}
              </p>
            </div>
          </div>

          {/* Right: Technical Narrative & Photo Selector Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {galleryItems.map((item, index) => {
              const isSelected = activePhoto === index;
              return (
                <div
                  key={index}
                  onClick={() => setActivePhoto(index)}
                  style={{
                    padding: '20px 24px',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    background: isSelected ? '#FFFFFF' : 'rgba(245, 245, 248, 0.7)',
                    border: isSelected ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                    boxShadow: isSelected ? 'var(--shadow-md)' : 'none',
                    transform: isSelected ? 'translateX(6px)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        color: isSelected ? 'var(--color-champagne)' : 'var(--color-lilac-deep)',
                      }}
                    >
                      0{index + 1}. {item.tag}
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
                        Viewing
                      </span>
                    )}
                  </div>

                  <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>
                    {item.title}
                  </h4>

                  <p style={{ fontSize: '13px', color: 'var(--color-lilac-deep)', lineHeight: 1.5, marginBottom: '10px' }}>
                    {item.description}
                  </p>

                  {isSelected && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
                      {item.specs.map((spec, sIdx) => (
                        <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--color-graphite)' }}>
                          <Check size={14} color="#C8A75A" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating VisionOS Glassmorphism Dock for Gallery Photos */}
        <div
          style={{
            position: 'relative',
            marginTop: '-24px',
            zIndex: 20,
            display: 'flex',
            justifyContent: 'center',
            padding: '0 12px',
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
              background: 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(200, 167, 90, 0.4)',
              boxShadow: '0 20px 40px -10px rgba(28, 28, 38, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.6) inset',
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
                padding: '0 8px 0 4px',
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
    </section>
  );
};
