import React, { useState } from 'react';
import { X } from 'lucide-react';
import { BRAND } from '../config/brand.config';

interface PoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'shipping' | 'returns' | 'privacy' | 'terms';
}

export const PoliciesModal: React.FC<PoliciesModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'shipping',
}) => {
  const [activeTab, setActiveTab] = useState<'shipping' | 'returns' | 'privacy' | 'terms'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-panel"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '92%',
          maxWidth: '680px',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: '36px',
          background: '#FFFFFF',
          zIndex: 1001,
          borderRadius: '24px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800 }}>{BRAND.name} Consumer Policies</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <X size={20} color="var(--color-lilac-deep)" />
          </button>
        </div>

        {/* Tab Controls */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('shipping')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: activeTab === 'shipping' ? 'var(--color-graphite)' : 'transparent',
              color: activeTab === 'shipping' ? '#FFF' : 'var(--color-lilac-deep)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            Shipping Policy
          </button>
          <button
            onClick={() => setActiveTab('returns')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: activeTab === 'returns' ? 'var(--color-graphite)' : 'transparent',
              color: activeTab === 'returns' ? '#FFF' : 'var(--color-lilac-deep)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            7-Day Guarantee
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: activeTab === 'privacy' ? 'var(--color-graphite)' : 'transparent',
              color: activeTab === 'privacy' ? '#FFF' : 'var(--color-lilac-deep)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            Privacy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: activeTab === 'terms' ? 'var(--color-graphite)' : 'transparent',
              color: activeTab === 'terms' ? '#FFF' : 'var(--color-lilac-deep)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            Terms of Service
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--color-graphite)' }}>
          {activeTab === 'shipping' && (
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>Pan-India Fulfillment &amp; Delivery</h3>
              <p style={{ marginBottom: '12px' }}>
                All {BRAND.name} orders are packed in custom molded shockproof packaging and dispatched from our primary warehouse in Bhiwandi (Mumbai Metropolitan Region).
              </p>
              <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                <li><strong>Metro Cities (Mumbai, Delhi NCR, Bangalore, Hyderabad, Chennai, Kolkata):</strong> 2 to 3 business days via Blue Dart Air Express.</li>
                <li><strong>Tier 2 &amp; Tier 3 Locations:</strong> 3 to 5 business days via Delhivery Surface Express.</li>
                <li><strong>Cash on Delivery (COD):</strong> Free COD available across India. An automated WhatsApp confirmation link is sent prior to courier handover.</li>
              </ul>
            </div>
          )}

          {activeTab === 'returns' && (
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>7-Day Replacement &amp; Hardware Guarantee</h3>
              <p style={{ marginBottom: '12px' }}>
                We stand behind the engineering of the {BRAND.name} system. If your wand, caddy, or adhesive wall bracket experiences any mechanical failure, cracking, or defect within 7 days of delivery, contact our concierge on WhatsApp at {BRAND.whatsappDisplay} or email {BRAND.supportEmail}.
              </p>
              <p style={{ marginBottom: '12px' }}>
                We will arrange a priority door-to-door exchange free of charge. For sanitary and hygiene compliance, opened cleaning pod packages cannot be restocked once seal is broken.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>Customer Data &amp; Privacy Protection</h3>
              <p style={{ marginBottom: '12px' }}>
                {BRAND.legalName} respects your privacy. We never sell, rent, or trade your contact information. Customer details (name, delivery address, phone number) are utilized strictly for courier shipping label generation and transactional WhatsApp updates.
              </p>
              <p>
                All digital transactions are encrypted via 256-bit SSL certified payment gateways (Razorpay &amp; Cashfree) compliant with RBI tokenization directives.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>Terms of Use</h3>
              <p style={{ marginBottom: '12px' }}>
                By using {BRAND.domain}, you agree to our standard terms of service. Products purchased are intended for domestic or commercial bathroom sanitation.
              </p>
              <p>
                <strong>Plumbing Safety Disclaimer:</strong> Spent pods must always be deposited into waste receptacles. {BRAND.name} accepts no liability for plumbing clogs resulting from intentional flushing of cleaning pods.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
