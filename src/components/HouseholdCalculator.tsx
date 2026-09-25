import React, { useState } from 'react';
import { Calculator, Sparkles, ShieldCheck, ArrowRight, Check, Droplets, Trash2 } from 'lucide-react';
import { PRODUCT } from '../config/product.config';
import { playMechanicalClick } from '../lib/sound';

interface HouseholdCalculatorProps {
  onSelectBundle: (bundleId: string) => void;
}

export const HouseholdCalculator: React.FC<HouseholdCalculatorProps> = ({ onSelectBundle }) => {
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly' | 'daily'>('biweekly');

  // Calculations
  const cleansPerBathPerYear = frequency === 'weekly' ? 52 : frequency === 'biweekly' ? 120 : 300;
  const annualPods = bathrooms * cleansPerBathPerYear;
  const monthlyCostEstimate = Math.round((annualPods * 15.5) / 12);
  const plasticBottlesSaved = Math.round(annualPods / 12); // Average bottle lasts 12 cleans
  const acidLitersEliminated = (plasticBottlesSaved * 0.75).toFixed(1);

  // Recommended Bundle
  let recommendedBundle = PRODUCT.bundles[1]; // Deluxe Clean Pack (default)
  if (bathrooms === 1 && frequency === 'weekly') {
    recommendedBundle = PRODUCT.bundles[0]; // Starter Set
  } else if (bathrooms >= 3 || frequency === 'daily') {
    recommendedBundle = PRODUCT.bundles[2]; // Master Residence Set
  }

  return (
    <section
      id="household-calculator"
      style={{
        padding: '80px 0',
        background: 'var(--color-porcelain)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px auto' }}>
          <div className="pill-badge" style={{ marginBottom: '14px' }}>
            <Calculator size={13} color="#C8A75A" />
            <span>HOUSEHOLD HYGIENE &amp; SAVINGS ESTIMATOR</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', marginBottom: '16px' }}>
            Calculate Your Home's Clean Footprint
          </h2>
          <p style={{ color: 'var(--color-lilac-deep)', fontSize: '16px', lineHeight: 1.6 }}>
            Tell us about your home. We'll calculate your exact annual pod requirement, monthly cost, and how many plastic chemical jugs you eliminate.
          </p>
        </div>

        {/* Interactive Calculator Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '32px',
            alignItems: 'stretch',
          }}
        >
          {/* Controls Panel */}
          <div
            className="glass-panel calc-card"
            style={{
              padding: '36px',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-hero)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px' }}>
                1. Select Household Bathrooms
              </h3>

              {/* Bathroom Number Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '32px' }}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      playMechanicalClick();
                      setBathrooms(num);
                    }}
                    style={{
                      padding: '16px 0',
                      borderRadius: '14px',
                      border: bathrooms === num ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                      background: bathrooms === num ? 'var(--color-graphite)' : '#FFFFFF',
                      color: bathrooms === num ? '#FFFFFF' : 'var(--color-graphite)',
                      fontSize: '18px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: bathrooms === num ? '0 4px 14px rgba(0,0,0,0.12)' : 'none',
                    }}
                  >
                    {num}{num === 5 ? '+' : ''}
                  </button>
                ))}
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '18px' }}>
                2. Cleaning Frequency
              </h3>

              {/* Frequency Selector Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                {[
                  { id: 'weekly', label: '1x per week', desc: 'Light maintenance for guest or secondary bathrooms' },
                  { id: 'biweekly', label: '2–3x per week', desc: 'Standard Indian household hygiene routine (Recommended)' },
                  { id: 'daily', label: 'Daily deep freshening', desc: 'High-traffic families, pets, and children' },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      playMechanicalClick();
                      setFrequency(item.id as typeof frequency);
                    }}
                    style={{
                      padding: '14px 18px',
                      borderRadius: '12px',
                      border: frequency === item.id ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                      background: frequency === item.id ? '#FAF9FD' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '15px' }}>{item.label}</div>
                      <div style={{ fontSize: '12px', color: 'var(--color-lilac-deep)', marginTop: '2px' }}>{item.desc}</div>
                    </div>
                    {frequency === item.id && (
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--color-champagne)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={14} color="#FFF" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ fontSize: '13px', color: 'var(--color-lilac-deep)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="#2F7D6B" />
              <span>Bio-cellulose heads dissolve natural limescale without toxic chlorine fumes.</span>
            </div>
          </div>

          {/* Results & Recommendation Panel */}
          <div
            className="glass-panel calc-card"
            style={{
              padding: '36px',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-hero)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)' }}>
                ANNUAL IMPACT &amp; COST BREAKDOWN
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '4px', marginBottom: '24px' }}>
                Your Custom Household Plan
              </h3>

              {/* 3 Metric Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '24px' }}>
                <div style={{ background: '#F5F5F8', padding: '18px', borderRadius: '16px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--color-lilac-deep)', fontWeight: 600 }}>Estimated Pods / Year</div>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-graphite)', marginTop: '4px' }}>
                    {annualPods} <span style={{ fontSize: '14px', fontWeight: 600 }}>capsules</span>
                  </div>
                </div>

                <div style={{ background: '#F5F5F8', padding: '18px', borderRadius: '16px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--color-lilac-deep)', fontWeight: 600 }}>Est. Monthly Cost</div>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: '#2F7D6B', marginTop: '4px' }}>
                    ₹{monthlyCostEstimate} <span style={{ fontSize: '14px', fontWeight: 600 }}>/ mo</span>
                  </div>
                </div>
              </div>

              {/* Environmental Eco Savings Badges */}
              <div
                style={{
                  background: '#EDF7F4',
                  border: '1px solid rgba(47, 125, 107, 0.25)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  marginBottom: '28px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1B5446', fontWeight: 700, fontSize: '14px', marginBottom: '8px' }}>
                  <Sparkles size={16} color="#2F7D6B" /> Environmental Plastic Elimination
                </div>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '13px', color: '#2A6657' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Trash2 size={14} /> <strong>{plasticBottlesSaved} plastic jugs</strong> diverted
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Droplets size={14} /> <strong>{acidLitersEliminated}L acid cleaners</strong> eliminated
                  </span>
                </div>
              </div>

              {/* Matching Recommended Bundle Card */}
              <div
                style={{
                  border: '1.5px solid var(--color-champagne)',
                  borderRadius: '18px',
                  padding: '20px',
                  background: '#FAF9F6',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-11px',
                    left: '20px',
                    background: 'var(--color-champagne)',
                    color: '#FFF',
                    fontSize: '10px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                  }}
                >
                  RECOMMENDED BUNDLE FOR YOUR HOME
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <div>
                    <h4 style={{ fontSize: '17px', fontWeight: 800 }}>{recommendedBundle.name}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--color-lilac-deep)', marginTop: '2px' }}>
                      {recommendedBundle.description}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '20px', fontWeight: 800 }}>₹{recommendedBundle.price}</div>
                    <div style={{ fontSize: '12px', textDecoration: 'line-through', color: 'var(--color-lilac-deep)' }}>
                      ₹{recommendedBundle.originalPrice}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    playMechanicalClick();
                    onSelectBundle(recommendedBundle.id);
                  }}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    marginTop: '16px',
                    padding: '12px',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  Select This Set ({recommendedBundle.name}) <ArrowRight size={15} />
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: 'var(--color-lilac-deep)' }}>
              100% Risk-Free: 7-Day Replacement Guarantee • Free Delivery across India
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .calc-card { padding: 22px 16px !important; }
        }
      `}</style>
    </section>
  );
};
