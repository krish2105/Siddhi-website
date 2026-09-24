import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface LuxuryPreloaderProps {
  onComplete?: () => void;
}

export const LuxuryPreloader: React.FC<LuxuryPreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('CALIBRATING 3D ENVIRONMENT');
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 12 + 6);
        if (next > 35 && next < 70) {
          setStatusText('INITIALIZING ARCHITECTURAL HARDWARE');
        } else if (next >= 70 && next < 95) {
          setStatusText('PREPARING 8K TOUCHLESS RITUAL');
        } else if (next >= 95) {
          setStatusText('ENTER AURELLE LUXE');
        }
        return next > 100 ? 100 : next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const exitTimeout = setTimeout(() => {
        setIsExiting(true);
        const finishTimeout = setTimeout(() => {
          setIsFinished(true);
          onComplete?.();
        }, 750);
        return () => clearTimeout(finishTimeout);
      }, 250);
      return () => clearTimeout(exitTimeout);
    }
  }, [progress, onComplete]);

  if (isFinished) return null;

  return (
    <aside
      role="status"
      aria-live="polite"
      aria-label="Loading Aurelle Luxe Experience"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#F5F5F8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
    >
      {/* Background Soft Studio Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200, 167, 90, 0.15) 0%, rgba(245, 245, 248, 0) 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: '460px',
        }}
      >
        {/* Brand Monogram Badge */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '18px',
            background: 'var(--color-graphite)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid var(--color-champagne)',
            boxShadow: '0 12px 30px rgba(28, 28, 38, 0.18)',
            marginBottom: '24px',
            animation: 'preloaderPulse 2s ease-in-out infinite',
          }}
        >
          <span
            style={{
              color: 'var(--color-champagne)',
              fontWeight: 800,
              fontSize: '28px',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
            }}
          >
            A
          </span>
        </div>

        {/* Wordmark */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '26px',
            fontWeight: 800,
            letterSpacing: '0.18em',
            color: 'var(--color-graphite)',
            textTransform: 'uppercase',
            marginBottom: '6px',
          }}
        >
          AURELLE
        </h1>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11px',
            letterSpacing: '0.22em',
            color: 'var(--color-lilac-deep)',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '36px',
          }}
        >
          <Sparkles size={11} color="#C8A75A" />
          <span>HYGIENE HARDWARE • ARCHITECTURAL COLLECTION</span>
        </div>

        {/* Minimalist Hairline Progress Bar */}
        <div
          style={{
            width: '260px',
            height: '2px',
            background: 'rgba(28, 28, 38, 0.08)',
            borderRadius: '9999px',
            overflow: 'hidden',
            marginBottom: '16px',
            position: 'relative',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #DFCA88 0%, #C8A75A 60%, #9E7D32 100%)',
              transition: 'width 0.15s ease-out',
              borderRadius: '9999px',
            }}
          />
        </div>

        {/* Live Loading Telemetry & Counter */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '260px',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: 'var(--color-lilac-deep)',
          }}
        >
          <span>{statusText}</span>
          <span style={{ color: 'var(--color-champagne)', fontVariantNumeric: 'tabular-nums' }}>
            {progress}%
          </span>
        </div>
      </div>

      <style>{`
        @keyframes preloaderPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 12px 30px rgba(28, 28, 38, 0.18);
          }
          50% {
            transform: scale(1.04);
            box-shadow: 0 16px 40px rgba(200, 167, 90, 0.35);
          }
        }
      `}</style>
    </aside>
  );
};
