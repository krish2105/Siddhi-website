import React, { useState, useEffect, useRef } from 'react';
import { X, ShieldCheck, Sparkles, CheckCircle2, MessageSquare, ArrowRight, Zap, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRAND } from '../config/brand.config';

interface VipLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (phone: string) => void;
}

export const VipLoginModal: React.FC<VipLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [phone, setPhone] = useState('');
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(true);
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  if (!isOpen) return null;

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = phone.replace(/\D/g, '');
    if (clean.length === 10) {
      setErrorMsg('');
      setStep('otp');
      setCountdown(30);
      setTimeout(() => otpInputsRef.current[0]?.focus(), 100);
    } else {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const val = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto-advance to next input
    if (val && index < 3) {
      otpInputsRef.current[index + 1]?.focus();
    }

    // Auto-verify if all 4 digits entered
    if (newOtp.every((digit) => digit !== '')) {
      verifyOtp(newOtp.join(''));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const verifyOtp = (code: string) => {
    setIsVerifying(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsVerifying(false);
      // Accept demo code or any 4 digit OTP for rapid preview
      if (code === '1234' || code.length === 4) {
        setStep('success');
        try {
          localStorage.setItem('aurelle_vip_user', JSON.stringify({ phone, memberSince: new Date().toISOString() }));
        } catch {
          // Ignore storage restrictions
        }
        confetti({
          particleCount: 110,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C8A75A', '#1C1C26', '#2F7D6B', '#DFCA88'],
        });
        if (onLoginSuccess) {
          onLoginSuccess(phone);
        }
      } else {
        setErrorMsg('Invalid code. Please use demo code 1234');
      }
    }, 500);
  };

  const fillDemoOtp = () => {
    const demo = ['1', '2', '3', '4'];
    setOtp(demo);
    verifyOtp('1234');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(10, 10, 15, 0.78)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '740px',
          background: '#FFFFFF',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
          position: 'relative',
          border: '1px solid rgba(200, 167, 90, 0.35)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close VIP modal"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: '#F5F5F8',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            color: 'var(--color-graphite)',
          }}
        >
          <X size={16} />
        </button>

        {/* LEFT PANEL: Aurelle Privé Brand & Exclusive Perks (Dark Velvet / Forest Obsidian) */}
        <div
          style={{
            background: 'linear-gradient(145deg, #1C2421 0%, #111816 100%)',
            color: '#FFFFFF',
            padding: '40px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Top Brand Tag */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'rgba(200, 167, 90, 0.18)',
                  border: '1px solid var(--color-champagne)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-champagne)',
                  fontWeight: 900,
                  fontSize: '16px',
                }}
              >
                A
              </div>

              <div>
                <div style={{ fontSize: '15px', fontWeight: 900, letterSpacing: '0.04em', lineHeight: 1 }}>
                  {BRAND.name.toUpperCase()} PRIVÉ
                </div>
                <div style={{ fontSize: '9px', color: 'var(--color-champagne)', fontWeight: 700, letterSpacing: '0.12em' }}>
                  POWERED BY FASTPASS™
                </div>
              </div>
            </div>

            <h3
              style={{
                fontSize: '24px',
                fontWeight: 800,
                lineHeight: 1.25,
                color: '#FFFFFF',
                marginBottom: '12px',
                fontFamily: 'var(--font-serif)',
              }}
            >
              Login now to avail exclusive member offers!
            </h3>

            <p style={{ fontSize: '13px', color: '#B6B5C2', lineHeight: 1.5, marginBottom: '28px' }}>
              Join over 14,000 discerning patrons across India. Access instant cart credits, 1-click checkout, and VIP dispatch.
            </p>

            {/* Exclusive Perks List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                <div style={{ background: 'rgba(200, 167, 90, 0.2)', padding: '5px', borderRadius: '6px' }}>
                  <Sparkles size={14} color="#C8A75A" />
                </div>
                <span><strong>Instant ₹200 Welcome Gift</strong> applied to bag</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                <div style={{ background: 'rgba(47, 125, 107, 0.2)', padding: '5px', borderRadius: '6px' }}>
                  <Zap size={14} color="#2F7D6B" />
                </div>
                <span><strong>1-Click Auto-Fill Checkout</strong> across 24,000+ PINs</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                <div style={{ background: 'rgba(200, 167, 90, 0.2)', padding: '5px', borderRadius: '6px' }}>
                  <ShieldCheck size={14} color="#C8A75A" />
                </div>
                <span><strong>Priority Blue Dart Air</strong> dispatch queue</span>
              </div>
            </div>
          </div>

          {/* Bottom Security Assurance */}
          <div
            style={{
              marginTop: '32px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              color: '#8B8A99',
            }}
          >
            <ShieldCheck size={14} color="#2F7D6B" />
            <span>Bank-Grade 256-Bit SSL • No Passwords Needed</span>
          </div>
        </div>

        {/* RIGHT PANEL: Authentication Form */}
        <div
          style={{
            padding: '40px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: '#FFFFFF',
          }}
        >
          {step === 'phone' && (
            <form onSubmit={handlePhoneSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-champagne)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  1-Click Fast Verification
                </span>
                <h4 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-graphite)', marginTop: '4px' }}>
                  Enter Mobile Number
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--color-lilac-deep)', marginTop: '2px' }}>
                  We will send a 4-digit code to access your member pricing.
                </p>
              </div>

              {/* Mobile Input with India Flag */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--color-graphite)' }}>
                  Mobile Number:
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: '#FAF9FB',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      padding: '12px 14px',
                      background: '#F0EFF5',
                      borderRight: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: 'var(--color-graphite)',
                    }}
                  >
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>

                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10-digit number"
                    style={{
                      flex: 1,
                      padding: '12px 14px',
                      border: 'none',
                      background: 'transparent',
                      fontSize: '15px',
                      fontWeight: 600,
                      color: 'var(--color-graphite)',
                      outline: 'none',
                    }}
                    autoFocus
                  />
                </div>
                {errorMsg && (
                  <div style={{ fontSize: '11px', color: '#D32F2F', marginTop: '6px', fontWeight: 600 }}>
                    {errorMsg}
                  </div>
                )}
              </div>

              {/* WhatsApp Notification Opt-in */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  marginBottom: '24px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  color: 'var(--color-graphite)',
                  lineHeight: 1.4,
                }}
              >
                <input
                  type="checkbox"
                  checked={notifyWhatsapp}
                  onChange={(e) => setNotifyWhatsapp(e.target.checked)}
                  style={{ marginTop: '2px', accentColor: '#25D366' }}
                />
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MessageSquare size={13} color="#25D366" />
                  <span>Notify me with order tracking & secret VIP offers on WhatsApp</span>
                </span>
              </label>

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '14px',
                  fontWeight: 800,
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>Continue to VIP Access</span>
                <ArrowRight size={16} />
              </button>

              {/* Legal Disclaimer */}
              <div
                style={{
                  marginTop: '16px',
                  fontSize: '10px',
                  color: 'var(--color-lilac-deep)',
                  textAlign: 'center',
                  lineHeight: 1.4,
                }}
              >
                I accept that I have read & understood Aurelle's{' '}
                <a href="#privacy" style={{ color: 'var(--color-graphite)', textDecoration: 'underline' }}>Privacy Policy</a>{' '}
                and{' '}
                <a href="#terms" style={{ color: 'var(--color-graphite)', textDecoration: 'underline' }}>Terms of Service</a>.
              </div>
            </form>
          )}

          {step === 'otp' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-champagne)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Step 2 of 2
                </span>
                <h4 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-graphite)', marginTop: '4px' }}>
                  Verify Passcode
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--color-lilac-deep)', marginTop: '2px' }}>
                  Enter the 4-digit code sent to <strong>+91 {phone}</strong>
                </p>
              </div>

              {/* 4-Digit OTP Boxes */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '18px' }}>
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      otpInputsRef.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[idx]}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      border: '2px solid var(--border-subtle)',
                      textAlign: 'center',
                      fontSize: '22px',
                      fontWeight: 800,
                      color: 'var(--color-graphite)',
                      background: '#FAF9FB',
                      outline: 'none',
                    }}
                  />
                ))}
              </div>

              {errorMsg && (
                <div style={{ fontSize: '11px', color: '#D32F2F', textAlign: 'center', marginBottom: '12px', fontWeight: 600 }}>
                  {errorMsg}
                </div>
              )}

              {/* Demo Auto-Fill Assistant Button for Client Testing */}
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button
                  type="button"
                  onClick={fillDemoOtp}
                  style={{
                    background: 'rgba(200, 167, 90, 0.12)',
                    border: '1px dashed var(--color-champagne)',
                    borderRadius: '8px',
                    padding: '6px 14px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--color-graphite)',
                    cursor: 'pointer',
                  }}
                >
                  ⚡ Click to Auto-Fill Demo OTP: <strong>1234</strong>
                </button>
              </div>

              {/* Resend Timer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', marginBottom: '20px' }}>
                <button
                  onClick={() => setStep('phone')}
                  style={{ background: 'transparent', border: 'none', color: 'var(--color-lilac-deep)', cursor: 'pointer', fontSize: '12px' }}
                >
                  ← Edit Number
                </button>

                <span style={{ color: 'var(--color-lilac-deep)' }}>
                  {countdown > 0 ? (
                    `Resend in ${countdown}s`
                  ) : (
                    <button
                      onClick={() => setCountdown(30)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--color-champagne)', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Resend Code
                    </button>
                  )}
                </span>
              </div>

              <button
                type="button"
                onClick={() => verifyOtp(otp.join(''))}
                disabled={isVerifying}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '14px',
                  fontWeight: 800,
                  borderRadius: '12px',
                }}
              >
                {isVerifying ? 'Verifying...' : 'Verify & Unlock VIP Status'}
              </button>
            </div>
          )}

          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#EAF5F2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                }}
              >
                <CheckCircle2 size={36} color="#2F7D6B" />
              </div>

              <span
                style={{
                  background: '#EAF5F2',
                  color: '#2F7D6B',
                  fontSize: '10px',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '12px',
                  letterSpacing: '0.06em',
                }}
              >
                AURELLE PRIVÉ ACTIVE
              </span>

              <h4 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-graphite)', marginTop: '8px', marginBottom: '6px' }}>
                Welcome to the Privé Club!
              </h4>

              <p style={{ fontSize: '13px', color: 'var(--color-lilac-deep)', marginBottom: '20px', lineHeight: 1.5 }}>
                Your mobile <strong>+91 {phone}</strong> has been enrolled. An instant <strong>₹200 Welcome Credit</strong> is now active on your order.
              </p>

              <div
                style={{
                  background: '#FDF8EA',
                  border: '1px dashed var(--color-champagne)',
                  borderRadius: '12px',
                  padding: '12px',
                  marginBottom: '20px',
                  fontSize: '12px',
                  color: 'var(--color-graphite)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Check size={16} color="#2F7D6B" />
                <span><strong>₹200 Instant Discount</strong> auto-applied at checkout</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '14px', borderRadius: '12px' }}
              >
                Continue Shopping with ₹200 Off
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
