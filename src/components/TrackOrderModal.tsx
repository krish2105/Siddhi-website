import React, { useState } from 'react';
import { X, Search, CheckCircle2, Truck, Plane, MapPin, MessageCircle, ExternalLink } from 'lucide-react';
import { BRAND } from '../config/brand.config';
import { getOrderTrackingData, type TrackingResult } from '../lib/commerce/logistics';
import { playMechanicalClick, playSlideSound } from '../lib/sound';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({ isOpen, onClose, initialOrderId }) => {
  const [orderQuery, setOrderQuery] = useState(initialOrderId || '');
  const [trackResult, setTrackResult] = useState<TrackingResult | null>(
    initialOrderId ? getOrderTrackingData(initialOrderId) : null
  );

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    playMechanicalClick();
    if (orderQuery.trim()) {
      const data = getOrderTrackingData(orderQuery.trim());
      setTrackResult(data);
    }
  };

  const whatsappConciergeUrl = `https://wa.me/919820012345?text=${encodeURIComponent(
    `Hello Aurelle Concierge, I am inquiring about tracking status for order #${trackResult?.orderId || orderQuery || 'AUR-GENERAL'}`
  )}`;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-panel track-modal-card"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '92%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '32px',
          background: '#FFFFFF',
          zIndex: 1001,
          borderRadius: '24px',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-champagne)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              BLUE DART AIR CARGO TRACKING
            </span>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-graphite)', marginTop: '2px' }}>
              Track Your {BRAND.name} Order
            </h3>
          </div>
          <button
            onClick={() => {
              playSlideSound();
              onClose();
            }}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px' }}
          >
            <X size={20} color="var(--color-lilac-deep)" />
          </button>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--color-lilac-deep)', marginBottom: '20px', lineHeight: 1.5 }}>
          Enter your Order ID (e.g. <strong>AUR-98241</strong>) or 10-digit mobile number to view real-time Blue Dart Air Waybill milestones.
        </p>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <input
            type="text"
            required
            placeholder="e.g. AUR-98241 or 9820012345"
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
              fontSize: '14px',
              background: '#FAF9FD',
            }}
          />
          <button
            type="submit"
            className="btn-primary"
            style={{ padding: '12px 22px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Search size={15} /> Track
          </button>
        </form>

        {trackResult && (
          <div style={{ background: '#FAF9FD', borderRadius: '18px', padding: '24px', border: '1px solid var(--border-subtle)' }}>
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--color-lilac-deep)', fontWeight: 700 }}>
                  AIR WAYBILL (AWB) NUMBER
                </span>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-graphite)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Plane size={15} color="#C8A75A" />
                  <span>{trackResult.awbNumber}</span>
                </div>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  color: '#2F7D6B',
                  fontWeight: 800,
                  background: '#EDF7F4',
                  border: '1px solid rgba(47, 125, 107, 0.3)',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                }}
              >
                {trackResult.status.toUpperCase()}
              </span>
            </div>

            <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-subtle)', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '13px' }}>
                <span style={{ color: 'var(--color-lilac-deep)' }}>Carrier:</span> <strong>{trackResult.carrier}</strong>
              </div>
              <div style={{ fontSize: '13px' }}>
                <span style={{ color: 'var(--color-lilac-deep)' }}>Delivery:</span> <strong style={{ color: '#2F7D6B' }}>{trackResult.estimatedDeliveryDate}</strong>
              </div>
            </div>

            {/* Milestones timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', position: 'relative' }}>
              {trackResult.milestones.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ marginTop: '2px', flexShrink: 0 }}>
                    {step.completed ? (
                      <CheckCircle2 size={18} color="#2F7D6B" />
                    ) : step.active ? (
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: 'var(--color-champagne)',
                          boxShadow: '0 0 10px rgba(200, 167, 90, 0.6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Truck size={10} color="#FFF" />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          border: '2px solid #D2D0DF',
                          background: '#FFF',
                        }}
                      />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                      <strong style={{ fontSize: '13px', color: step.completed || step.active ? 'var(--color-graphite)' : 'var(--color-lilac-deep)' }}>
                        {step.title}
                      </strong>
                      <span style={{ fontSize: '11px', color: 'var(--color-lilac-deep)' }}>
                        {step.timestamp}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#8E8B9F', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                      <MapPin size={11} /> {step.location}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-lilac-deep)', lineHeight: 1.4 }}>
                      {step.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp Live Concierge Support Link */}
            <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
              <a
                href={whatsappConciergeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMechanicalClick()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#25D366',
                  textDecoration: 'none',
                }}
              >
                <MessageCircle size={16} />
                <span>Need expedited delivery assistance? Chat on WhatsApp</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
