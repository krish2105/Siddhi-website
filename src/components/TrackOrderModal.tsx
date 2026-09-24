import React, { useState } from 'react';
import { X, Search, CheckCircle2 } from 'lucide-react';
import { BRAND } from '../config/brand.config';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({ isOpen, onClose }) => {
  const [orderQuery, setOrderQuery] = useState('');
  const [trackResult, setTrackResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      setTrackResult({
        orderId: orderQuery.toUpperCase().startsWith('AUR-') ? orderQuery.toUpperCase() : `AUR-${orderQuery.trim()}`,
        status: 'In Transit with Blue Dart Air',
        destination: 'Mumbai, Maharashtra',
        estimatedDelivery: 'Tomorrow by 4:00 PM',
        steps: [
          { title: 'Order Confirmed & Quality Checked', time: 'Yesterday 3:15 PM', done: true },
          { title: 'Handed to Air Express Courier', time: 'Yesterday 8:40 PM', done: true },
          { title: 'Arrived at Local Sorting Hub', time: 'Today 6:20 AM', done: true },
          { title: 'Out for Delivery', time: 'Pending Dispatch', done: false },
        ],
      });
    }
  };

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
          width: '90%',
          maxWidth: '520px',
          padding: '32px',
          background: '#FFFFFF',
          zIndex: 1001,
          borderRadius: '24px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700 }}>Track Your {BRAND.name} Order</h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <X size={20} color="var(--color-lilac-deep)" />
          </button>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--color-lilac-deep)', marginBottom: '20px' }}>
          Enter your 6-digit Order ID (e.g. AUR-98241) or registered 10-digit mobile number to view live shipment milestones.
        </p>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <input
            type="text"
            required
            placeholder="Order ID or Mobile Number"
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            style={{
              flex: 1,
              padding: '12px 14px',
              borderRadius: '10px',
              border: '1px solid var(--border-subtle)',
              fontSize: '14px',
            }}
          />
          <button type="submit" className="btn-primary" style={{ padding: '12px 20px', fontSize: '14px' }}>
            <Search size={16} /> Track
          </button>
        </form>

        {trackResult && (
          <div style={{ background: '#F5F5F8', borderRadius: '16px', padding: '20px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--color-lilac-deep)' }}>Shipment Identifier</span>
                <strong style={{ fontSize: '15px', display: 'block' }}>{trackResult.orderId}</strong>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--color-signal)', fontWeight: 700, background: '#EAF5F2', padding: '4px 10px', borderRadius: '6px' }}>
                {trackResult.status}
              </span>
            </div>

            <div style={{ fontSize: '13px', marginBottom: '16px' }}>
              <strong>Expected Delivery:</strong> {trackResult.estimatedDelivery}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {trackResult.steps.map((st: any, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                  <CheckCircle2 size={16} color={st.done ? '#2F7D6B' : '#C8A75A'} />
                  <span style={{ flex: 1, color: st.done ? 'var(--color-graphite)' : 'var(--color-lilac-deep)' }}>{st.title}</span>
                  <span style={{ fontSize: '11px', color: 'var(--color-lilac-deep)' }}>{st.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
