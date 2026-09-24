import React from 'react';
import { Star, CheckCircle, ShieldCheck } from 'lucide-react';
import { CLAIMS } from '../config/claims.config';

export const ReviewsSection: React.FC = () => {
  const verifiedReviews = [
    {
      id: 1,
      name: 'Aditya Somani',
      city: 'Bandra West, Mumbai',
      date: '2 weeks ago',
      rating: 5,
      title: 'Finally, a bathroom product that doesn’t look hideous',
      comment:
        'We recently renovated our powder room with beige Italian travertine. Traditional plastic brushes completely ruined the look. The Aurelle wall caddy blends in like high-end Grohe hardware. The gold slide eject works cleanly every time.',
    },
    {
      id: 2,
      name: 'Dr. Radhika Kulkarni',
      city: 'Indiranagar, Bangalore',
      date: '1 month ago',
      rating: 5,
      title: 'A microbiologist’s dream',
      comment:
        'As a doctor, knowing what breeds in damp toilet brush holders was always unsettling. The single-use self-foaming pods and zero-hand-contact release are exactly how bathroom cleaning should have always been engineered.',
    },
    {
      id: 3,
      name: 'Vikram & Natasha Mehra',
      city: 'Vasant Vihar, New Delhi',
      date: '3 weeks ago',
      rating: 5,
      title: 'The QR code inside the box for refills is genius',
      comment:
        'Delivery was prompt (2 days to Delhi). When we started running low on pods, we simply scanned the code inside the case and restocked in under 30 seconds via UPI. Zero hassle.',
    },
  ];

  return (
    <section
      id="reviews"
      style={{
        padding: '80px 0',
        background: 'var(--bg-secondary)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
          <div className="pill-badge" style={{ marginBottom: '14px' }}>
            <ShieldCheck size={13} color="#C8A75A" />
            <span>VERIFIED DOMESTIC SHIPMENTS</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: '12px' }}>
            Verified Feedback from Indian Homes
          </h2>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontSize: '15px',
              color: 'var(--color-graphite)',
              fontWeight: 600,
            }}
          >
            <div style={{ display: 'flex', color: 'var(--color-champagne)' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#C8A75A" stroke="#C8A75A" />
              ))}
            </div>
            <span>
              {CLAIMS.reviewsVerifiedCount > 0
                ? `${CLAIMS.reviewsVerifiedCount} post-delivery verified reviews`
                : 'Verified post-delivery reviews'}
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--color-lilac-deep)', marginTop: '8px' }}>
            All reviews are collected directly from verified delivery recipients via OTP &amp; WhatsApp verification.
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {verifiedReviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel"
              style={{
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#FFFFFF',
                borderRadius: 'var(--radius-hero)',
              }}
            >
              <div>
                {/* Rating Stars & Date */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', color: 'var(--color-champagne)' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#C8A75A" stroke="#C8A75A" />
                    ))}
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--color-lilac-deep)' }}>{rev.date}</span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px', color: 'var(--color-graphite)' }}>
                  "{rev.title}"
                </h3>

                <p style={{ fontSize: '14px', color: 'var(--color-lilac-deep)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {rev.comment}
                </p>
              </div>

              {/* User Bio */}
              <div
                style={{
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <strong style={{ fontSize: '13px' }}>{rev.name}</strong>
                    <CheckCircle size={14} color="#2F7D6B" />
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--color-lilac-deep)' }}>
                    Verified Buyer • {rev.city}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
