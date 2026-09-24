import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Heart, MessageCircle } from 'lucide-react';
import { BRAND } from '../config/brand.config';

interface FooterProps {
  onOpenPolicy?: (tab: 'shipping' | 'returns' | 'privacy' | 'terms') => void;
  onNavigate?: (view: 'home' | 'product' | 'refills' | 'ritual' | 'science' | 'hospitality') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy, onNavigate }) => {
  return (
    <footer
      style={{
        background: 'var(--color-graphite)',
        color: '#A1A1B2',
        padding: '70px 0 30px 0',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="container">
        {/* Top 4 Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
            paddingBottom: '48px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '48px',
          }}
        >
          <div style={{ display: 'flex', gap: '14px' }}>
            <Truck size={24} color="#C8A75A" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ color: '#FFF', fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>
                Pan-India Express Air
              </h4>
              <p style={{ fontSize: '13px' }}>2 to 4 business days to all 24,000+ Indian PIN codes.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px' }}>
            <ShieldCheck size={24} color="#C8A75A" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ color: '#FFF', fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>
                Cash on Delivery (COD)
              </h4>
              <p style={{ fontSize: '13px' }}>Pay safely via Cash or UPI when the package reaches your home.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px' }}>
            <RotateCcw size={24} color="#C8A75A" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ color: '#FFF', fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>
                7-Day Replacement
              </h4>
              <p style={{ fontSize: '13px' }}>Hassle-free replacement if anything arrives damaged.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px' }}>
            <Heart size={24} color="#C8A75A" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ color: '#FFF', fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>
                Architectural Quality
              </h4>
              <p style={{ fontSize: '13px' }}>Matte alabaster composite &amp; brushed champagne gold PVD trim.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Bio */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: '#272733',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--color-champagne)',
                }}
              >
                <span style={{ color: 'var(--color-champagne)', fontWeight: 800, fontSize: '14px' }}>A</span>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#FFF' }}>
                {BRAND.name.toUpperCase()}
              </span>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.6, maxWidth: '320px', color: '#8F8EAA', marginBottom: '18px' }}>
              Transforming everyday bathroom sanitation into an effortless, touch-free luxury ritual. Designed for the modern Indian home.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href={`https://wa.me/${BRAND.whatsapp.replace(/\D/g, '')}?text=Hello%20Aurelle%20Concierge`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#FFFFFF',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <MessageCircle size={15} color="#2F7D6B" />
                WhatsApp Concierge
              </a>
            </div>
          </div>

          <div>
            <h5 style={{ color: '#FFF', fontSize: '14px', fontWeight: 700, marginBottom: '14px' }}>
              Explore
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <li>
                <button
                  onClick={() => onNavigate?.('product')}
                  style={{ background: 'transparent', border: 'none', color: '#A1A1B2', cursor: 'pointer', padding: 0, fontSize: '13px' }}
                >
                  The Aurelle System (Hardware)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('ritual')}
                  style={{ background: 'transparent', border: 'none', color: '#A1A1B2', cursor: 'pointer', padding: 0, fontSize: '13px' }}
                >
                  The 3-Step Touchless Ritual
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('refills')}
                  style={{ background: 'transparent', border: 'none', color: '#A1A1B2', cursor: 'pointer', padding: 0, fontSize: '13px' }}
                >
                  Pod Refills &amp; QR Reorder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('science')}
                  style={{ background: 'transparent', border: 'none', color: '#A1A1B2', cursor: 'pointer', padding: 0, fontSize: '13px' }}
                >
                  Hygiene Science &amp; Microbiology
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('hospitality')}
                  style={{ background: 'transparent', border: 'none', color: '#A1A1B2', cursor: 'pointer', padding: 0, fontSize: '13px' }}
                >
                  Hospitality &amp; B2B Enquiries
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 style={{ color: '#FFF', fontSize: '14px', fontWeight: 700, marginBottom: '14px' }}>
              Consumer Policies
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <li>
                <button
                  onClick={() => onOpenPolicy?.('shipping')}
                  style={{ background: 'transparent', border: 'none', color: '#A1A1B2', cursor: 'pointer', padding: 0, fontSize: '13px' }}
                >
                  Shipping &amp; Delivery Terms
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy?.('returns')}
                  style={{ background: 'transparent', border: 'none', color: '#A1A1B2', cursor: 'pointer', padding: 0, fontSize: '13px' }}
                >
                  7-Day Replacement Guarantee
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy?.('privacy')}
                  style={{ background: 'transparent', border: 'none', color: '#A1A1B2', cursor: 'pointer', padding: 0, fontSize: '13px' }}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy?.('terms')}
                  style={{ background: 'transparent', border: 'none', color: '#A1A1B2', cursor: 'pointer', padding: 0, fontSize: '13px' }}
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <a
                  href="/Aurelle_Official_Quotation_INR.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--color-champagne)',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>Commercial Proposal &amp; Quotation (PDF)</span>
                  <span style={{ fontSize: '10px', background: 'rgba(200, 167, 90, 0.2)', padding: '1px 6px', borderRadius: '4px' }}>₹ INR</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 style={{ color: '#FFF', fontSize: '14px', fontWeight: 700, marginBottom: '14px' }}>
              Direct Concierge
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#A1A1B2' }}>
              <div>Email: <a href={`mailto:${BRAND.supportEmail}`} style={{ color: '#FFF', textDecoration: 'none' }}>{BRAND.supportEmail}</a></div>
              <div>WhatsApp: <a href={`https://wa.me/${BRAND.whatsapp.replace(/\D/g, '')}`} style={{ color: '#FFF', textDecoration: 'none' }}>{BRAND.whatsappDisplay}</a></div>
              <div>Operating City: {BRAND.city}</div>
              {BRAND.gstin && <div>GSTIN: {BRAND.gstin}</div>}
              <div style={{ marginTop: '8px', fontSize: '11px', color: '#6A6985' }}>
                Mon–Sat: 9:30 AM to 7:00 PM IST
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Security */}
        <div
          style={{
            paddingTop: '28px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '12px',
            color: '#6A6985',
          }}
        >
          <div>
            © {new Date().getFullYear()} {BRAND.legalName}. All rights reserved.
          </div>

          {/* Payment Method Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: '#8F8EAA' }}>Encrypted Checkout via:</span>
            <span style={{ background: '#272733', padding: '3px 8px', borderRadius: '4px', color: '#FFF', fontSize: '11px', fontWeight: 600 }}>UPI (GPay / PhonePe)</span>
            <span style={{ background: '#272733', padding: '3px 8px', borderRadius: '4px', color: '#FFF', fontSize: '11px', fontWeight: 600 }}>Cards</span>
            <span style={{ background: '#272733', padding: '3px 8px', borderRadius: '4px', color: '#FFF', fontSize: '11px', fontWeight: 600 }}>RuPay</span>
            <span style={{ background: '#272733', padding: '3px 8px', borderRadius: '4px', color: '#FFF', fontSize: '11px', fontWeight: 600 }}>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
