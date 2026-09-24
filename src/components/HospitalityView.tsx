import React, { useState } from 'react';
import { Building2, Check } from 'lucide-react';
import { BRAND } from '../config/brand.config';

interface HospitalityViewProps {
  onBackToHome: () => void;
}

export const HospitalityView: React.FC<HospitalityViewProps> = ({ onBackToHome }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    bathroomCount: '10-25',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '60px 0 100px 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '24px' }}>
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

        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px auto' }}>
          <div className="pill-badge" style={{ marginBottom: '14px' }}>
            <Building2 size={13} color="#C8A75A" />
            <span>COMMERCIAL &amp; HOSPITALITY PARTNERSHIPS</span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', marginBottom: '16px' }}>
            Elevate Every Guest Bathroom.
          </h1>
          <p style={{ color: 'var(--color-lilac-deep)', fontSize: '18px', lineHeight: 1.6 }}>
            Boutique hotels, luxury villas, executive suites, and corporate headquarters. Eliminate unsightly plastic brushes with wall-mounted {BRAND.name} hardware and high-volume commercial pod supply.
          </p>
        </div>

        {/* Benefits Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '64px',
          }}
        >
          <div className="glass-panel" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
              Pristine Guest Perception
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-lilac-deep)', lineHeight: 1.6 }}>
              A dripping plastic brush instantly ruins a ₹15,000/night hotel suite. {BRAND.name}’s alabaster and champagne gold aesthetic coordinates seamlessly with Kohler, Grohe, and Axor bathroom suites.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
              Housekeeping Speed &amp; Safety
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-lilac-deep)', lineHeight: 1.6 }}>
              Housekeeping staff never touch dirty toilet bristles or carry contaminated caddies between guest rooms. Click on, clean, eject into waste bin in 30 seconds.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
              Tiered Bulk Refill Pricing
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-lilac-deep)', lineHeight: 1.6 }}>
              Commercial packs of 500 and 1,000 pods with scheduled monthly replenishment and dedicated GST input invoicing.
            </p>
          </div>
        </div>

        {/* Enquiry Form */}
        <div
          className="glass-panel"
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            padding: '40px',
            border: '1px solid var(--color-champagne)',
            background: '#FFFFFF',
          }}
        >
          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px', textAlign: 'center' }}>
            Request Commercial Proposal &amp; Sample Kit
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--color-lilac-deep)', textAlign: 'center', marginBottom: '28px' }}>
            Our corporate concierge will reach out within 4 business hours with custom hardware pricing and bulk pod rates.
          </p>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: '#EAF5F2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                }}
              >
                <Check size={28} color="#2F7D6B" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>Enquiry Received</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-lilac-deep)' }}>
                Thank you. We have dispatched our commercial specification deck to <strong>{formData.email}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Property / Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Oberoi Grand"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Contact Person</label>
                  <input
                    type="text"
                    required
                    placeholder="General Manager / Architect"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@property.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>WhatsApp / Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98000 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Number of Guest Bathrooms</label>
                <select
                  value={formData.bathroomCount}
                  onChange={(e) => setFormData({ ...formData, bathroomCount: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '14px', background: '#FFF' }}
                >
                  <option value="5-10">5 – 10 Suites (Boutique Villa / Airbnb)</option>
                  <option value="10-25">10 – 25 Suites (Luxury Hotel / Retreat)</option>
                  <option value="25-100">25 – 100 Suites (Full Commercial Property)</option>
                  <option value="100+">100+ Suites (Hotel Chain / Corporate)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Special Project Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Need custom PVD trim finish, sample unit, or expedited delivery timeline?"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '14px' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '15px' }}>
                Submit B2B Enquiry • Receive Spec Sheet
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
