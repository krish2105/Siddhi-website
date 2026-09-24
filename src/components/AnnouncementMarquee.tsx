import React from 'react';
import { Sparkles, Truck, ShieldCheck, Heart, Zap, Gift } from 'lucide-react';

export const AnnouncementMarquee: React.FC = () => {
  const announcements = [
    { icon: <Truck size={12} color="#C8A75A" />, text: "Free Air Express Delivery Across 24,000+ Indian PIN Codes" },
    { icon: <Zap size={12} color="#C8A75A" />, text: "Save ₹100 Extra on Prepaid UPI / GPay Orders" },
    { icon: <ShieldCheck size={12} color="#C8A75A" />, text: "Cash on Delivery (COD) Available Nationwide" },
    { icon: <Sparkles size={12} color="#C8A75A" />, text: "100% Touchless Architecture • Hands Never Touch Dirty Water" },
    { icon: <Heart size={12} color="#C8A75A" />, text: "Trusted by 14,000+ Luxury Homeowners & 5-Star Suites Across India" },
    { icon: <Gift size={12} color="#C8A75A" />, text: "Complimentary Starter Pod Pack Included with Every Hardware Kit" },
  ];

  return (
    <div
      style={{
        background: 'var(--color-graphite)',
        color: '#FFFFFF',
        borderBottom: '1px solid rgba(200, 167, 90, 0.35)',
        padding: '8px 0',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 101,
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        userSelect: 'none',
      }}
    >
      <div className="marquee-track">
        {/* Double array for seamless loop */}
        {[...announcements, ...announcements].map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0 24px',
              whiteSpace: 'nowrap',
              color: '#F0EFF5',
            }}
          >
            {item.icon}
            <span>{item.text}</span>
            <span style={{ color: 'var(--color-champagne)', margin: '0 8px', fontSize: '10px' }}>✦</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeScroll 32s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
