import React, { useState } from 'react';
import { Check, QrCode, RefreshCw, Bell } from 'lucide-react';
import { PRODUCT, type RefillPackConfig } from '../config/product.config';
import { BRAND } from '../config/brand.config';
import { formatINR } from '../lib/format';

interface RefillsViewProps {
  onAddToCart: (item: { id: string; name: string; price: number; heads: number }) => void;
  onBackToHome: () => void;
}

export const RefillsView: React.FC<RefillsViewProps> = ({ onAddToCart, onBackToHome }) => {
  const [selectedPack, setSelectedPack] = useState<RefillPackConfig>(PRODUCT.refillPacks[1]); // Default 60-pack
  const [qrScanned, setQrScanned] = useState(false);
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handleSimulateQr = () => {
    setQrScanned(true);
    setTimeout(() => {
      setSelectedPack(PRODUCT.refillPacks[1]);
    }, 400);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      setEmailSubscribed(true);
    }
  };

  return (
    <div style={{ padding: '60px 0 100px 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '32px' }}>
          <button
            onClick={onBackToHome}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-lilac-deep)',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            ← Back to Hardware
          </button>
        </div>

        {/* Hero Banner */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px auto' }}>
          <div className="pill-badge" style={{ marginBottom: '14px' }}>
            <RefreshCw size={13} color="#C8A75A" />
            <span>GENUINE REPLACEMENT PODS</span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', marginBottom: '16px' }}>
            Effortless Refills. Fresh Heads On Demand.
          </h1>
          <p style={{ color: 'var(--color-lilac-deep)', fontSize: '18px', lineHeight: 1.6 }}>
            Single-use bio-cellulose pods pre-loaded with ocean disinfectant and limescale active foam. Keep your {BRAND.name} wand working for years.
          </p>
        </div>

        {/* 2-Tap QR Reorder Callout */}
        <div
          className="glass-panel"
          style={{
            padding: '24px 32px',
            marginBottom: '54px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            border: '1px solid var(--color-champagne)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(218, 217, 232, 0.4) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'var(--color-graphite)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <QrCode size={24} color="#C8A75A" />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700 }}>
                Inside-Caddy QR Code Reorder
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-lilac-deep)' }}>
                Running low? Scan the laser-etched code inside your wall caddy to reorder in two taps.
              </p>
            </div>
          </div>

          <button
            onClick={handleSimulateQr}
            className="btn-secondary"
            style={{ fontSize: '13px', padding: '10px 18px' }}
          >
            {qrScanned ? '✓ QR Code Verified (Last Pack Loaded)' : 'Simulate QR Scan'}
          </button>
        </div>

        {/* Packs Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '64px',
          }}
        >
          {PRODUCT.refillPacks.map((pack) => {
            const isSelected = selectedPack.id === pack.id;

            return (
              <div
                key={pack.id}
                onClick={() => setSelectedPack(pack)}
                className="glass-panel"
                style={{
                  padding: '36px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                  background: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                  transform: isSelected ? 'translateY(-4px)' : 'none',
                }}
              >
                {pack.isPopular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--color-champagne)',
                      color: '#1C1C26',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '4px 14px',
                      borderRadius: '9999px',
                      letterSpacing: '0.05em',
                    }}
                  >
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: 800 }}>
                      {pack.heads} Refill Pods
                    </h3>
                  </div>

                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '12px',
                      color: 'var(--color-signal)',
                      fontWeight: 700,
                      background: '#EAF5F2',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      marginBottom: '16px',
                    }}
                  >
                    {pack.perHeadPrice}
                  </span>

                  <p style={{ fontSize: '13px', color: 'var(--color-lilac-deep)', marginBottom: '24px' }}>
                    Vacuum-sealed waterproof cylindrical sleeves. Fits all {BRAND.name} wall-mounted hardware.
                  </p>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '24px' }}>
                    <span style={{ fontSize: '32px', fontWeight: 800 }}>
                      {formatINR(pack.price)}
                    </span>
                    <span style={{ fontSize: '16px', textDecoration: 'line-through', color: 'var(--color-lilac-deep)' }}>
                      {formatINR(pack.originalPrice)}
                    </span>
                    <span style={{ fontSize: '12px', color: '#B45309', fontWeight: 700 }}>
                      {pack.savings}
                    </span>
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', fontSize: '13px', color: 'var(--color-graphite)' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Check size={14} color="#C8A75A" /> Ocean Breeze Antibacterial Detergent
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Check size={14} color="#C8A75A" /> Non-scratch biodegradable scrubber
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Check size={14} color="#C8A75A" /> Quick-release clip adapter
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={14} color="#C8A75A" /> Free Express Shipping
                    </li>
                  </ul>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart({
                      id: pack.id,
                      name: `${pack.heads} Refill Pods Pack`,
                      price: pack.price,
                      heads: pack.heads,
                    });
                  }}
                  className={isSelected ? 'btn-primary' : 'btn-secondary'}
                  style={{ width: '100%' }}
                >
                  Add {pack.heads} Pods • {formatINR(pack.price)}
                </button>
              </div>
            );
          })}
        </div>

        {/* Subscribe & Remind Me Feature */}
        <div
          className="glass-panel"
          style={{
            padding: '40px',
            textAlign: 'center',
            maxWidth: '680px',
            margin: '0 auto',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <Bell size={28} color="#C8A75A" style={{ marginBottom: '14px' }} />
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
            Never Run Out of Clean
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--color-lilac-deep)', marginBottom: '20px' }}>
            Set a gentle WhatsApp or email replenishment reminder every 60 or 90 days. No recurring auto-debit surprises.
          </p>

          {emailSubscribed ? (
            <div style={{ color: 'var(--color-signal)', fontWeight: 600, fontSize: '14px' }}>
              ✓ Reminder configured! We’ll send a friendly check-in when it’s time to restock.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px', maxWidth: '420px', margin: '0 auto' }}>
              <input
                type="email"
                required
                placeholder="Enter email or WhatsApp number"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)',
                  background: '#FFF',
                  fontSize: '14px',
                }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '12px 20px', fontSize: '14px' }}>
                Remind Me
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
