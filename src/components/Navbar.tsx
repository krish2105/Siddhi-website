import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, VolumeX } from 'lucide-react';
import { BRAND } from '../config/brand.config';
import { playMechanicalClick, toggleAmbientSoundscape, isAmbientSoundscapeActive } from '../lib/sound';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (view: 'home' | 'product' | 'refills' | 'ritual' | 'science' | 'hospitality') => void;
  onOpenTrack: () => void;
  currentView: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigate,
  onOpenTrack,
  currentView,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    setSoundActive(isAmbientSoundscapeActive());
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItem = (label: string, view: 'home' | 'product' | 'refills' | 'ritual' | 'science' | 'hospitality') => (
    <button
      onClick={() => {
        onNavigate(view);
        setMobileMenuOpen(false);
      }}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: currentView === view ? 700 : 500,
        color: currentView === view ? 'var(--color-champagne)' : 'var(--color-graphite)',
        padding: '6px 12px',
        borderRadius: '6px',
        transition: 'var(--transition)',
        textDecoration: 'none',
      }}
    >
      {label}
    </button>
  );

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(245, 245, 248, 0.94)' : 'rgba(245, 245, 248, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(28, 28, 38, 0.06)',
      }}
    >
      <div
        className="container"
        style={{
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Wordmark */}
        <div
          onClick={() => onNavigate('home')}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--color-graphite)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--color-champagne)',
            }}
          >
            <span style={{ color: 'var(--color-champagne)', fontWeight: 800, fontSize: '15px' }}>A</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1,
                color: 'var(--color-graphite)',
              }}
            >
              {BRAND.name.toUpperCase()}
            </span>
            <span style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-lilac-deep)' }}>
              HYGIENE HARDWARE
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '8px',
          }}
          className="desktop-nav"
        >
          {navItem('The System', 'product')}
          {navItem('The Ritual', 'ritual')}
          {navItem('Refills', 'refills')}
          {navItem('Science', 'science')}
          {navItem('Hospitality', 'hospitality')}
        </nav>

        {/* Header Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Spatial Soundscape Toggle */}
          <button
            onClick={() => {
              const active = toggleAmbientSoundscape();
              setSoundActive(active);
              playMechanicalClick();
            }}
            title={soundActive ? "Mute Spatial Soundscape" : "Enable Spatial Soundscape (432Hz)"}
            style={{
              background: soundActive ? 'rgba(200, 167, 90, 0.12)' : 'rgba(28, 28, 38, 0.04)',
              border: `1px solid ${soundActive ? 'var(--color-champagne)' : 'var(--border-subtle)'}`,
              borderRadius: '9999px',
              padding: '6px 12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              color: soundActive ? 'var(--color-champagne)' : 'var(--color-graphite)',
              fontSize: '12px',
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
          >
            {soundActive ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '12px' }}>
                <span className="eq-bar eq-bar-1" />
                <span className="eq-bar eq-bar-2" />
                <span className="eq-bar eq-bar-3" />
              </span>
            ) : (
              <VolumeX size={14} />
            )}
            <span style={{ fontSize: '11px', letterSpacing: '0.04em' }}>
              {soundActive ? 'Sound ON' : 'Sound'}
            </span>
          </button>

          <button
            onClick={() => {
              playMechanicalClick();
              onOpenTrack();
            }}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              color: 'var(--color-lilac-deep)',
              display: 'none',
              alignItems: 'center',
              gap: '4px',
            }}
            className="track-btn"
          >
            Track Order
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => {
              playMechanicalClick();
              onOpenCart();
            }}
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-control)',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              color: 'var(--color-graphite)',
              fontSize: '14px',
              fontWeight: 600,
              boxShadow: 'var(--shadow-sm)',
              transition: 'var(--transition)',
            }}
          >
            <ShoppingBag size={17} color="#C8A75A" />
            <span>Bag</span>
            <span
              style={{
                background: 'var(--color-graphite)',
                color: '#FFFFFF',
                borderRadius: '9999px',
                padding: '2px 8px',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              playMechanicalClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-graphite)',
            }}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            background: '#FFFFFF',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {navItem('Overview & Home', 'home')}
          {navItem('The Aurelle System (Product Page)', 'product')}
          {navItem('The 3-Step Touchless Ritual', 'ritual')}
          {navItem('Pod Refills & Packs', 'refills')}
          {navItem('Hygiene Science & Plumbing Safety', 'science')}
          {navItem('Hospitality & Commercial', 'hospitality')}
          <div style={{ paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => {
                onOpenTrack();
                setMobileMenuOpen(false);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                color: 'var(--color-lilac-deep)',
                fontWeight: 600,
              }}
            >
              Track Existing Order →
            </button>
          </div>
        </div>
      )}

      {/* Responsive Inline CSS for Navbar */}
      <style>{`
        @keyframes eqBounce1 {
          0%, 100% { height: 3px; }
          50% { height: 12px; }
        }
        @keyframes eqBounce2 {
          0%, 100% { height: 11px; }
          50% { height: 4px; }
        }
        @keyframes eqBounce3 {
          0%, 100% { height: 5px; }
          50% { height: 10px; }
        }
        .eq-bar {
          display: inline-block;
          width: 2px;
          background: var(--color-champagne);
          border-radius: 1px;
        }
        .eq-bar-1 { animation: eqBounce1 0.7s ease-in-out infinite; }
        .eq-bar-2 { animation: eqBounce2 0.85s ease-in-out infinite 0.15s; }
        .eq-bar-3 { animation: eqBounce3 0.65s ease-in-out infinite 0.3s; }

        @media (min-width: 820px) {
          .desktop-nav { display: flex !important; }
          .track-btn { display: inline-flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
};
