import React, { useState } from 'react';
import { MousePointerClick, Droplets, Trash2, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Click to Attach',
      subtitle: 'Zero Hand Contact',
      icon: <MousePointerClick size={28} color="#C8A75A" />,
      description: 'Press the telescoping wand into the pod slot in your wall caddy. The internal mechanical clip firmly engages with a distinct, satisfying click.',
      highlight: 'Mechanical auto-lock',
    },
    {
      number: '02',
      title: 'Clean & Foam',
      subtitle: 'Activated on Water Contact',
      icon: <Droplets size={28} color="#0088dd" />,
      description: 'As the head touches toilet water, concentrated enzymatic detergent immediately releases into rich effervescent foam, breaking down hard water limescale.',
      highlight: 'Charcoal limescale scrubber',
    },
    {
      number: '03',
      title: 'Slide-Latch Release',
      subtitle: 'Never Touch, Never Reuse',
      icon: <Trash2 size={28} color="#C8A75A" />,
      description: 'Position the wand head directly over your bathroom waste bin and slide the champagne gold latch. The spent pod releases straight into the bin.',
      highlight: 'Never flush into plumbing',
    },
  ];

  return (
    <section
      id="how-it-works"
      style={{
        padding: '80px 0',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 50px auto' }}>
          <div className="pill-badge" style={{ marginBottom: '14px' }}>
            <span>THE 3-STEP TOUCHLESS RITUAL</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: '16px' }}>
            Click. Clean. Release.
          </h2>
          <p style={{ color: 'var(--color-lilac-deep)', fontSize: '16px', lineHeight: 1.6 }}>
            Designed so your hands never come within reach of dirty toilet water. The handle retracts. The case closes. The bathroom stays calm and tidy.
          </p>
        </div>

        {/* Steps Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {steps.map((step, idx) => (
            <div
              key={idx}
              onClick={() => setActiveStep(idx)}
              className="glass-panel"
              style={{
                padding: '36px 28px',
                cursor: 'pointer',
                transition: 'var(--transition)',
                position: 'relative',
                overflow: 'hidden',
                background: '#FFFFFF',
                border: activeStep === idx ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                transform: activeStep === idx ? 'translateY(-4px)' : 'none',
                boxShadow: activeStep === idx ? 'var(--shadow-gold)' : 'var(--shadow-sm)',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '20px',
                  fontSize: '64px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  color: 'rgba(28, 28, 38, 0.04)',
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                {step.number}
              </span>

              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  background: 'rgba(200, 167, 90, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                }}
              >
                {step.icon}
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>
                {step.title}
              </h3>
              <div style={{ fontSize: '13px', color: 'var(--color-champagne)', fontWeight: 600, marginBottom: '14px' }}>
                {step.subtitle}
              </div>

              <p style={{ color: 'var(--color-lilac-deep)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
                {step.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--color-graphite)' }}>
                <CheckCircle2 size={16} color="#2F7D6B" />
                <span>{step.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
