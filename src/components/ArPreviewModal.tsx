import React, { useState } from 'react';
import { X, QrCode, Smartphone, Sparkles, Check, Move, Eye, ShieldCheck, ArrowRight } from 'lucide-react';
import { BRAND } from '../config/brand.config';
import { playMechanicalClick, playSlideSound } from '../lib/sound';

interface ArPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArPreviewModal: React.FC<ArPreviewModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'qr' | 'simulate'>('simulate');
  const [wallStyle, setWallStyle] = useState<'travertine' | 'fluted' | 'slate'>('travertine');
  const [caddyOffset, setCaddyOffset] = useState<number>(0);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(15, 15, 22, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '820px',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid var(--border-subtle)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.4)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 32px',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'var(--color-champagne)15',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-champagne)',
              }}
            >
              <Smartphone size={20} />
            </div>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)' }}>
                AUGMENTED REALITY (AR)
              </span>
              <h3 style={{ fontSize: '20px', fontWeight: 800 }}>View {BRAND.name} on Your Wall</h3>
            </div>
          </div>

          <button
            onClick={() => {
              playMechanicalClick();
              onClose();
            }}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid var(--border-subtle)',
              background: '#FAF9FD',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--color-graphite)',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Controls */}
        <div style={{ padding: '20px 32px 0 32px' }}>
          <div
            style={{
              display: 'inline-flex',
              gap: '6px',
              background: '#F5F5F8',
              padding: '4px',
              borderRadius: '9999px',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <button
              onClick={() => {
                playSlideSound();
                setActiveTab('simulate');
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
                background: activeTab === 'simulate' ? 'var(--color-graphite)' : 'transparent',
                color: activeTab === 'simulate' ? '#FFFFFF' : 'var(--color-lilac-deep)',
                transition: 'all 0.2s ease',
              }}
            >
              <Eye size={14} /> Interactive AR Simulator
            </button>
            <button
              onClick={() => {
                playSlideSound();
                setActiveTab('qr');
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
                background: activeTab === 'qr' ? 'var(--color-graphite)' : 'transparent',
                color: activeTab === 'qr' ? '#FFFFFF' : 'var(--color-lilac-deep)',
                transition: 'all 0.2s ease',
              }}
            >
              <QrCode size={14} /> Scan Mobile Phone QR
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div style={{ padding: '24px 32px 32px 32px' }}>
          {activeTab === 'simulate' ? (
            <div>
              {/* Wall Texture Controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-graphite)' }}>
                  Simulated Bathroom Wall Finish:
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[
                    { id: 'travertine', label: 'Travertine Stone' },
                    { id: 'fluted', label: 'Fluted Marble' },
                    { id: 'slate', label: 'Matte Slate' },
                  ].map((w) => (
                    <button
                      key={w.id}
                      onClick={() => {
                        playMechanicalClick();
                        setWallStyle(w.id as typeof wallStyle);
                      }}
                      style={{
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: wallStyle === w.id ? 800 : 600,
                        background: wallStyle === w.id ? 'var(--color-champagne)' : '#F5F5F8',
                        color: wallStyle === w.id ? '#FFFFFF' : 'var(--color-lilac-deep)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'var(--transition)',
                      }}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Viewport Box */}
              <div
                style={{
                  position: 'relative',
                  height: '380px',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-subtle)',
                  background:
                    wallStyle === 'travertine'
                      ? 'linear-gradient(135deg, #EAE4D7 0%, #D8CEBC 50%, #C8BC9F 100%)'
                      : wallStyle === 'fluted'
                      ? 'repeating-linear-gradient(90deg, #E6E4EE, #E6E4EE 18px, #D4D1DF 18px, #D4D1DF 24px)'
                      : 'linear-gradient(135deg, #2D3038 0%, #1F2128 100%)',
                  boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'ns-resize',
                }}
                onMouseMove={(e) => {
                  if (e.buttons === 1) {
                    setCaddyOffset((prev) => Math.max(-80, Math.min(80, prev + e.movementY * 0.8)));
                  }
                }}
              >
                {/* Floating AR Reticle Guidelines */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    background: 'rgba(28, 28, 38, 0.85)',
                    color: '#FFF',
                    backdropFilter: 'blur(8px)',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Sparkles size={12} color="#C8A75A" />
                  <span>Real-Scale 1:1 Wall Clearance Simulation</span>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(255, 255, 255, 0.92)',
                    color: 'var(--color-graphite)',
                    backdropFilter: 'blur(8px)',
                    padding: '6px 16px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                >
                  <Move size={14} color="#C8A75A" />
                  <span>Drag vertically to test wall mounting height (15–25 cm above floor recommended)</span>
                </div>

                {/* Simulated Caddy Hardware with Champagne Gold Accents */}
                <div
                  style={{
                    transform: `translateY(${caddyOffset}px)`,
                    transition: 'transform 0.05s ease-out',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {/* Wand Handle sticking out */}
                  <div
                    style={{
                      width: '18px',
                      height: '110px',
                      background: 'linear-gradient(90deg, #E2DFED, #CAC6D8)',
                      borderRadius: '8px',
                      position: 'relative',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    }}
                  >
                    {/* Top Ring */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '-16px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        border: '4px solid #C8A75A',
                        boxShadow: '0 2px 8px rgba(200, 167, 90, 0.4)',
                      }}
                    />
                    {/* Gold Slide Latch Button */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '12px',
                        height: '22px',
                        borderRadius: '4px',
                        background: '#C8A75A',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                      }}
                    />
                  </div>

                  {/* Wall-Mounted Caddy Dock */}
                  <div
                    style={{
                      width: '84px',
                      height: '130px',
                      borderRadius: '16px',
                      background: '#EAE8F2',
                      border: '2px solid #C8A75A',
                      boxShadow: '0 12px 28px rgba(0,0,0,0.25)',
                      marginTop: '-15px',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div style={{ width: '40px', height: '3px', background: '#C8A75A', borderRadius: '9999px', marginBottom: '8px' }} />
                    <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.08em', color: 'var(--color-graphite)' }}>
                      AURELLE
                    </span>
                    <span style={{ fontSize: '8px', color: 'var(--color-lilac-deep)', marginTop: '2px' }}>
                      3M VHB MOUNT
                    </span>
                  </div>

                  {/* Under-Glow Reflection */}
                  <div
                    style={{
                      width: '60px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'rgba(255, 180, 50, 0.45)',
                      filter: 'blur(6px)',
                      marginTop: '8px',
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '32px',
                alignItems: 'center',
              }}
            >
              {/* QR Code Graphic */}
              <div
                style={{
                  background: '#FAF9FD',
                  borderRadius: '20px',
                  padding: '32px',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                {/* SVG High-Tech QR Mockup */}
                <div
                  style={{
                    width: '180px',
                    height: '180px',
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    border: '2px solid var(--color-champagne)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <svg viewBox="0 0 100 100" width="100%" height="100%">
                    <rect x="0" y="0" width="30" height="30" fill="#1C1C26" rx="4" />
                    <rect x="6" y="6" width="18" height="18" fill="#FFF" rx="2" />
                    <rect x="10" y="10" width="10" height="10" fill="#C8A75A" />
                    <rect x="70" y="0" width="30" height="30" fill="#1C1C26" rx="4" />
                    <rect x="76" y="6" width="18" height="18" fill="#FFF" rx="2" />
                    <rect x="80" y="10" width="10" height="10" fill="#C8A75A" />
                    <rect x="0" y="70" width="30" height="30" fill="#1C1C26" rx="4" />
                    <rect x="6" y="76" width="18" height="18" fill="#FFF" rx="2" />
                    <rect x="10" y="80" width="10" height="10" fill="#C8A75A" />
                    <circle cx="50" cy="50" r="14" fill="#C8A75A" />
                    <text x="50" y="55" fontSize="12" fontWeight="bold" fill="#FFF" textAnchor="middle">A</text>
                    <rect x="40" y="10" width="8" height="8" fill="#1C1C26" />
                    <rect x="52" y="22" width="8" height="8" fill="#1C1C26" />
                    <rect x="36" y="74" width="8" height="8" fill="#1C1C26" />
                    <rect x="52" y="80" width="8" height="8" fill="#1C1C26" />
                    <rect x="74" y="44" width="8" height="8" fill="#1C1C26" />
                    <rect x="84" y="56" width="8" height="8" fill="#1C1C26" />
                  </svg>
                </div>

                <div style={{ marginTop: '16px', fontSize: '13px', fontWeight: 700, color: 'var(--color-graphite)' }}>
                  Scan with iPhone or Android Camera
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-lilac-deep)', marginTop: '4px' }}>
                  No app download required • Apple QuickLook &amp; Google Scene Viewer
                </div>
              </div>

              {/* Instructions List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: 800 }}>How AR Mounting Works:</h4>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-champagne)20', color: 'var(--color-champagne)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                    1
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>Point your camera at your bathroom wall</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-lilac-deep)', marginTop: '2px' }}>
                      The sensor detects wall planes, tiles, and distance accurately.
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-champagne)20', color: 'var(--color-champagne)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                    2
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>Tap anywhere to dock the 3D Caddy</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-lilac-deep)', marginTop: '2px' }}>
                      Locks securely to the wall with realistic drop shadows and champagne gold reflections.
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-champagne)20', color: 'var(--color-champagne)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                    3
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>Inspect clearances next to your toilet</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-lilac-deep)', marginTop: '2px' }}>
                      Ensure comfortable reach while seated without bending or straining.
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#2F7D6B', fontWeight: 600, marginTop: '8px' }}>
                  <ShieldCheck size={16} />
                  <span>3M VHB Industrial Adhesive holds up to 8kg on wet bathroom tiles.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '18px 32px',
            background: '#FAF9FD',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ fontSize: '13px', color: 'var(--color-lilac-deep)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Check size={14} color="#2F7D6B" /> 100% Scale Guarantee: 90 × 120 × 36 mm footprint
          </div>

          <button
            onClick={() => {
              playMechanicalClick();
              onClose();
            }}
            className="btn-primary"
            style={{ padding: '10px 22px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            Ready to Order <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
