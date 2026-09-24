import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { BRAND } from '../config/brand.config';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (view: 'home' | 'product' | 'refills' | 'ritual' | 'science' | 'hospitality') => void;
  onOpenTrack: () => void;
  onOpenVip?: () => void;
  vipUserPhone?: string | null;
  currentView: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigate,
  onOpenTrack,
  onOpenVip,
  vipUserPhone,
  currentView,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
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
          <button
            onClick={onOpenTrack}
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

          {/* VIP Privé FastPass Trigger */}
          <button
            onClick={onOpenVip}
            style={{
              background: vipUserPhone ? 'rgba(47, 125, 107, 0.1)' : 'rgba(200, 167, 90, 0.12)',
              border: vipUserPhone ? '1px solid #2F7D6B' : '1px solid rgba(200, 167, 90, 0.4)',
              borderRadius: 'var(--radius-control)',
              padding: '7px 12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              color: 'var(--color-graphite)',
              fontSize: '13px',
              fontWeight: 700,
              transition: 'var(--transition)',
            }}
          >
            <Sparkles size={14} color={vipUserPhone ? '#2F7D6B' : '#C8A75A'} />
            <span>{vipUserPhone ? 'Privé Active' : 'VIP Privé'}</span>
            {!vipUserPhone && (
              <span
                style={{
                  fontSize: '10px',
                  background: 'var(--color-champagne)',
                  color: '#000',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  fontWeight: 800,
                }}
              >
                ₹200 Off
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
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
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
        @media (min-width: 820px) {
          .desktop-nav { display: flex !important; }
          .track-btn { display: inline-flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
};
