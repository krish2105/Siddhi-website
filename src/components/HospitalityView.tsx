import React, { useState } from 'react';
import { Building2, Check, Download, Send, ShieldCheck, Calculator, Leaf, Clock, TrendingUp } from 'lucide-react';
import { BRAND } from '../config/brand.config';
import { playMechanicalClick, playSlideSound } from '../lib/sound';

interface HospitalityViewProps {
  onBackToHome: () => void;
}

export const HospitalityView: React.FC<HospitalityViewProps> = ({ onBackToHome }) => {
  const [suiteCount, setSuiteCount] = useState<number>(45);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    tier: 'Tier II (36-150 Keys)',
    notes: '',
  });

  // ROI & Environmental Telemetry formulas
  const plasticSavedKg = Math.round(suiteCount * 0.95 * 4); // 4 plastic brushes/year per room * ~240g
  const housekeepingHoursSaved = Math.round((suiteCount * 3.8 * 300) / 60); // 3.8 mins saved per turnover across 300 occupied nights
  const annualSavingsInr = Math.round(suiteCount * 2850); // Reduction in separate chemical bottles, replacement plastic brushes, labor

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playMechanicalClick();
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '60px 0 100px 0', minHeight: '80vh', background: 'var(--color-porcelain)' }}>
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '24px' }}>
          <button
            onClick={() => {
              playSlideSound();
              onBackToHome();
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-lilac-deep)',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
            }}
          >
            ← Back to Aurelle Flagship
          </button>
        </div>

        {/* Hero Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 52px auto' }}>
          <div className="pill-badge" style={{ marginBottom: '14px', background: '#FFFFFF' }}>
            <Building2 size={13} color="#C8A75A" />
            <span>COMMERCIAL &amp; HOSPITALITY ARCHITECTURE</span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5.5vw, 54px)', marginBottom: '16px', color: 'var(--color-graphite)' }}>
            Elevate Every Guest Bathroom.
          </h1>
          <p style={{ color: 'var(--color-lilac-deep)', fontSize: '18px', lineHeight: 1.6 }}>
            Boutique hotels, luxury heritage villas, and 5-star presidential suites across India. Replace unsightly dripping plastic brushes with wall-mounted {BRAND.name} architectural hardware.
          </p>
        </div>

        {/* Interactive Commercial ROI & ESG Sustainability Calculator */}
        <div
          className="glass-panel"
          style={{
            padding: '36px',
            borderRadius: '24px',
            background: '#FFFFFF',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-lg)',
            marginBottom: '64px',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 32px auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-champagne)', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              <Calculator size={14} /> Commercial Impact Telemetry
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-graphite)' }}>
              Estimate Your Property’s Annual ROI &amp; ESG Gains
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '36px',
              alignItems: 'center',
            }}
          >
            {/* Slider Column */}
            <div style={{ background: '#FAF9FD', padding: '28px', borderRadius: '18px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-graphite)' }}>
                  Number of Guest Suites / Bathrooms:
                </span>
                <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-champagne)' }}>
                  {suiteCount} Keys
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                step="5"
                value={suiteCount}
                onChange={(e) => setSuiteCount(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--color-champagne)',
                  cursor: 'pointer',
                  marginBottom: '16px',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-lilac-deep)' }}>
                <span>10 Keys (Boutique Villa)</span>
                <span>150 Keys (Resort)</span>
                <span>300 Keys (Grand Hotel)</span>
              </div>
            </div>

            {/* Live Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div style={{ background: '#F4FAF8', border: '1px solid #D4ECE4', padding: '20px', borderRadius: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2F7D6B', marginBottom: '6px' }}>
                  <Leaf size={16} />
                  <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>Plastic Diverted</span>
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#1B5446' }}>
                  {plasticSavedKg} kg / yr
                </div>
                <div style={{ fontSize: '11px', color: '#2F7D6B', marginTop: '2px' }}>
                  Zero disposable brushes in landfill
                </div>
              </div>

              <div style={{ background: '#F8F7FD', border: '1px solid #E4E0F4', padding: '20px', borderRadius: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6A56A8', marginBottom: '6px' }}>
                  <Clock size={16} />
                  <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>Turnover Time</span>
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#443673' }}>
                  {housekeepingHoursSaved} hrs / yr
                </div>
                <div style={{ fontSize: '11px', color: '#6A56A8', marginTop: '2px' }}>
                  3.8 minutes saved per room turn
                </div>
              </div>

              <div style={{ background: '#FCF9F2', border: '1px solid #F2E4C2', padding: '20px', borderRadius: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#C8A75A', marginBottom: '6px' }}>
                  <TrendingUp size={16} />
                  <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>Cost Savings</span>
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#8F712E' }}>
                  ₹{(annualSavingsInr).toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '11px', color: '#A08035', marginTop: '2px' }}>
                  Chemical &amp; brush replacement
                </div>
              </div>

              <div style={{ background: '#FAF9FD', border: '1px solid var(--border-subtle)', padding: '20px', borderRadius: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-graphite)', marginBottom: '6px' }}>
                  <ShieldCheck size={16} />
                  <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>Guest Rating</span>
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-graphite)' }}>
                  +18.4%
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-lilac-deep)', marginTop: '2px' }}>
                  Hygiene &amp; aesthetic NPS jump
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Commercial Benefits Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '64px',
          }}
        >
          <div className="glass-panel" style={{ padding: '32px', background: '#FFFFFF' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px', color: 'var(--color-graphite)' }}>
              Pristine Guest Perception
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-lilac-deep)', lineHeight: 1.6 }}>
              A yellowed, dripping plastic toilet brush destroys the illusion of a ₹25,000/night luxury suite. {BRAND.name} disappears seamlessly into marble and travertine walls alongside Kohler, Grohe, Axor, and Toto fixtures.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '32px', background: '#FFFFFF' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px', color: 'var(--color-graphite)' }}>
              Housekeeping Speed &amp; Safety
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-lilac-deep)', lineHeight: 1.6 }}>
              Staff never touch dirty bristles or carry contaminated buckets between guest suites. The 18-inch telescoping wand snaps pods on magnetically and ejects hands-free in under 30 seconds.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '32px', background: '#FFFFFF' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px', color: 'var(--color-graphite)' }}>
              GST Invoicing &amp; Scheduled Replenishment
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-lilac-deep)', lineHeight: 1.6 }}>
              Enterprise cartons of 500 and 1,000 pods dispatched on a scheduled monthly or quarterly cadence with full B2B GST credit compliance and dedicated hospitality account support.
            </p>
          </div>
        </div>

        {/* Download Commercial Spec Sheet PDF Card */}
        <div
          style={{
            background: '#1A1A24',
            borderRadius: '20px',
            padding: '32px',
            color: '#FFFFFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '64px',
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-champagne)', letterSpacing: '0.08em' }}>
              OFFICIAL COMMERCIAL QUOTATION &amp; BLUEPRINT
            </span>
            <h3 style={{ fontSize: '22px', fontWeight: 800, margin: '6px 0', color: '#FFF' }}>
              Download Complete Enterprise Specification Sheet
            </h3>
            <p style={{ fontSize: '14px', color: '#B6B4C8', maxWidth: '580px', lineHeight: 1.5 }}>
              Includes volume tiering (₹1,999 to ₹1,499 per hardware set), ASTM B117 salt-spray certificates, and 3M VHB shear load ratings.
            </p>
          </div>

          <a
            href="/Aurelle_Luxe_Store_Official_Quotation_INR.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playMechanicalClick()}
            style={{
              background: 'var(--color-champagne)',
              color: '#1A1A24',
              padding: '14px 26px',
              borderRadius: '9999px',
              fontWeight: 800,
              fontSize: '14px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 16px rgba(200, 167, 90, 0.3)',
            }}
          >
            <Download size={16} />
            <span>Download Quotation (PDF)</span>
          </a>
        </div>

        {/* Request Sample Box & Commercial Proposal Form */}
        <div
          className="glass-panel"
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            padding: '40px',
            border: '1px solid var(--color-champagne)',
            background: '#FFFFFF',
            borderRadius: '24px',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px', textAlign: 'center', color: 'var(--color-graphite)' }}>
            Request Trade Proposal &amp; Free Sample Kit
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--color-lilac-deep)', textAlign: 'center', marginBottom: '28px' }}>
            Our corporate design concierge will reach out within 4 business hours with customized volume pricing and a complimentary physical hardware evaluation kit.
          </p>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: '#EDF7F4',
                  color: '#2F7D6B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                }}
              >
                <Check size={28} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>
                Commercial Proposal Initiated
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-lilac-deep)', maxWidth: '400px', margin: '0 auto' }}>
                Thank you, {formData.contactPerson}. Our hospitality specialist will review your property details for {formData.businessName} and dispatch the evaluation kit to your studio.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Hotel / Villa / Firm Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Oberoi Villa Collection"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '14px',
                      background: '#FAF9FD',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Contact Person &amp; Designation
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Rathore (GM)"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '14px',
                      background: '#FAF9FD',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Corporate Work Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. procurement@luxuryhotel.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '14px',
                      background: '#FAF9FD',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '14px',
                      background: '#FAF9FD',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Property Scale / Estimated Bathroom Count
                </label>
                <select
                  value={formData.tier}
                  onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '14px',
                    background: '#FAF9FD',
                  }}
                >
                  <option value="Tier I (10-35 Keys)">Tier I: Boutique Villa / Luxury Residence (10-35 Keys)</option>
                  <option value="Tier II (36-150 Keys)">Tier II: 5-Star Resort / Heritage Palace (36-150 Keys)</option>
                  <option value="Tier III (151-500+ Keys)">Tier III: Enterprise Hospitality Group (151-500+ Keys)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Project Timeline &amp; Architectural Fixture Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Renovation of 60 lake-facing suites in Udaipur. Wall finish is honed Italian travertine."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '14px',
                    background: '#FAF9FD',
                    resize: 'vertical',
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{
                  padding: '14px',
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '8px',
                }}
              >
                <Send size={15} />
                <span>Submit Trade Proposal &amp; Evaluation Request</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
