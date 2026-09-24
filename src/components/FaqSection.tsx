import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { BRAND } from '../config/brand.config';
import { PRODUCT } from '../config/product.config';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is in the box?',
      a: `The package includes the ${BRAND.name} wall-mountable caddy with champagne gold trim, the telescoping aluminum wand with gold slide-latch, the 3M VHB water-resistant adhesive wall bracket, and ${PRODUCT.bundles[0].heads} disposable cleaning heads.`,
    },
    {
      q: 'Do I need to drill into tiles or stone?',
      a: 'No. The mount is engineered for adhesive fixing. Simply clean and dry your tile or stone surface, press the 3M VHB bracket firmly for 30 seconds, and wait 2 hours before hanging the caddy. It holds securely in high-humidity bathrooms.',
    },
    {
      q: 'Can I reuse a cleaning head?',
      a: 'No. Heads are strictly engineered for single use. That is what keeps every clean completely fresh, sanitary, and touch-free without storing stagnant wastewater.',
    },
    {
      q: 'Will it scratch my porcelain or toilet bowl glaze?',
      a: 'No. The scrubbing layer is made of soft bio-cellulose micro-fibers formulated to strip hard water limescale without abrading vitreous china, ceramic, or delicate marble surfaces.',
    },
    {
      q: 'How do I reorder replacement heads?',
      a: `Use our website's Refills section, or simply scan the laser-etched QR code inside your wall caddy to reorder replacement packs of 30, 60, or 120 pods in two taps.`,
    },
    {
      q: 'How long does delivery take?',
      a: 'Delivery is across India via Blue Dart Air and Delhivery. Metro cities receive shipments in 2 to 3 days, and non-metro locations in 3 to 5 business days. You can check your exact PIN code on the product page.',
    },
    {
      q: 'Can I pay on delivery (COD)?',
      a: 'Yes. Cash on Delivery (COD) is available across all serviceable Indian pincodes with zero extra surcharge. We also support instant UPI (GPay, PhonePe, Paytm) and major credit/debit cards.',
    },
    {
      q: 'What if it arrives damaged or I change my mind?',
      a: `Contact our concierge within ${BRAND.guaranteeDays} days of delivery via WhatsApp at ${BRAND.whatsappDisplay} or email ${BRAND.supportEmail}, and we will arrange a priority door-to-door exchange.`,
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      style={{
        padding: '80px 0',
        background: '#FFFFFF',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
          <div className="pill-badge" style={{ marginBottom: '14px' }}>
            <HelpCircle size={13} color="#C8A75A" />
            <span>TRANSPARENCY &amp; SPECIFICATIONS</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: '16px' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: 'var(--color-lilac-deep)', fontSize: '16px', lineHeight: 1.6 }}>
            Everything you need to know about the {BRAND.name} hardware system, adhesive installation, and refills.
          </p>
        </div>

        {/* Accordion Container */}
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                style={{
                  borderRadius: '16px',
                  border: isOpen ? '1px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                  background: isOpen ? '#FFFFFF' : 'var(--color-porcelain)',
                  overflow: 'hidden',
                  transition: 'var(--transition)',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--color-graphite)',
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.25s ease',
                      flexShrink: 0,
                      marginLeft: '12px',
                      color: isOpen ? 'var(--color-champagne)' : 'var(--color-lilac-deep)',
                    }}
                  />
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 24px 20px 24px',
                      fontSize: '14px',
                      color: 'var(--color-lilac-deep)',
                      lineHeight: 1.65,
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
