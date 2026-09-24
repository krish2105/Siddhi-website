import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Truck, Check, QrCode, CreditCard, Banknote, Sparkles, Lock, ArrowRight } from 'lucide-react';
import { type ProductBundleConfig } from '../config/product.config';
import { BRAND } from '../config/brand.config';
import { formatINR } from '../lib/format';
import { playMechanicalClick, playSlideSound, playChime } from '../lib/sound';

interface CheckoutViewProps {
  selectedBundle: ProductBundleConfig;
  onBackToHome: () => void;
  onTrackOrder?: (orderId: string) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  selectedBundle,
  onBackToHome,
  onTrackOrder,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('cod');
  const [quantity, setQuantity] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [generatedOrderId, setGeneratedOrderId] = useState<string>('');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('400001');
  const [city, setCity] = useState('Mumbai, MH');
  const [upiId, setUpiId] = useState('');

  // Handle PIN code lookup simulation
  const handlePincodeChange = (pin: string) => {
    setPincode(pin);
    if (pin.startsWith('11') || pin.startsWith('12')) setCity('New Delhi, DL');
    else if (pin.startsWith('40') || pin.startsWith('41')) setCity('Mumbai / Pune, MH');
    else if (pin.startsWith('56') || pin.startsWith('57')) setCity('Bengaluru, KA');
    else if (pin.startsWith('50') || pin.startsWith('51')) setCity('Hyderabad, TS');
    else if (pin.startsWith('60') || pin.startsWith('61')) setCity('Chennai, TN');
    else if (pin.startsWith('70')) setCity('Kolkata, WB');
    else if (pin.length === 6) setCity('Express Hub, IN');
  };

  const totalPrice = selectedBundle.price * quantity;
  const originalTotalPrice = selectedBundle.originalPrice * quantity;
  const totalSavings = originalTotalPrice - totalPrice;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    playMechanicalClick();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `AUR-${Math.floor(10000 + Math.random() * 90000)}`;
      setGeneratedOrderId(orderId);
      setIsSubmitting(false);
      setIsSuccess(true);
      playChime();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  if (isSuccess) {
    return (
      <div style={{ padding: '60px 0', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '680px' }}>
          <div
            className="glass-panel"
            style={{
              padding: '48px 36px',
              borderRadius: '24px',
              background: '#FFFFFF',
              border: '2px solid var(--color-champagne)',
              boxShadow: 'var(--shadow-xl)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#EDF7F4',
                color: '#2F7D6B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
                border: '2px solid #2F7D6B40',
              }}
            >
              <Check size={32} />
            </div>

            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)' }}>
              ORDER CONFIRMED &amp; DISPATCHED
            </span>

            <h2 style={{ fontSize: '28px', fontWeight: 800, marginTop: '6px', marginBottom: '8px' }}>
              Thank You, {fullName || 'Valued Customer'}!
            </h2>

            <p style={{ color: 'var(--color-lilac-deep)', fontSize: '15px', marginBottom: '24px' }}>
              Your order <strong>#{generatedOrderId}</strong> has been logged into our Mumbai fulfillment center.
            </p>

            {/* Order Details Card */}
            <div
              style={{
                background: '#FAF9FD',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid var(--border-subtle)',
                textAlign: 'left',
                marginBottom: '28px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontWeight: 700, color: 'var(--color-graphite)' }}>{selectedBundle.name} (×{quantity})</span>
                <span style={{ fontWeight: 800 }}>{formatINR(totalPrice)}</span>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-lilac-deep)', marginBottom: '8px' }}>
                Delivery to: <strong>{address}, {city} - {pincode}</strong>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-lilac-deep)' }}>
                Payment Method: <strong>{paymentMethod === 'cod' ? 'Cash on Delivery (₹0 extra)' : paymentMethod === 'upi' ? 'UPI Instant Pay' : 'Credit/Debit Card'}</strong>
              </div>
            </div>

            {/* WhatsApp notification card */}
            <div
              style={{
                background: '#EDF7F4',
                borderRadius: '12px',
                padding: '14px 18px',
                border: '1px solid rgba(47, 125, 107, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left',
                marginBottom: '28px',
              }}
            >
              <Sparkles size={20} color="#2F7D6B" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '13px', color: '#1B5446' }}>
                Live dispatch updates &amp; BlueDart Air airway bill tracking sent to <strong>{phone || '+91 WhatsApp'}</strong>.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {onTrackOrder && (
                <button
                  onClick={() => onTrackOrder(generatedOrderId)}
                  className="btn-primary"
                  style={{ padding: '14px 28px', fontSize: '14px' }}
                >
                  Track Order Status
                </button>
              )}
              <button
                onClick={onBackToHome}
                className="btn-secondary"
                style={{ padding: '14px 28px', fontSize: '14px' }}
              >
                Return to Storefront
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0 80px 0', background: 'var(--color-porcelain)', minHeight: '100vh' }}>
      <div className="container">
        {/* Navigation Breadcrumb */}
        <button
          onClick={onBackToHome}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: 'var(--color-lilac-deep)',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            marginBottom: '28px',
          }}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div style={{ textAlign: 'left', marginBottom: '36px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)' }}>
            DIRECT FLAGSHIP CHECKOUT
          </span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginTop: '4px' }}>
            Complete Your {BRAND.name} Order
          </h1>
          <p style={{ color: 'var(--color-lilac-deep)', fontSize: '15px' }}>
            Free Air Express Delivery • Cash on Delivery &amp; UPI • 7-Day Replacement Guarantee
          </p>
        </div>

        {/* 2-Column Checkout Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '36px',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Customer Details & Payment Options */}
          <div
            className="glass-panel"
            style={{
              padding: '36px',
              borderRadius: '24px',
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <form onSubmit={handleSubmitOrder}>
              {/* Step 1: Customer Contact */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-graphite)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>
                    1
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Customer Contact</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--color-graphite)' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aryan Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '14px',
                        background: '#FAF9FD',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--color-graphite)' }}>
                      WhatsApp Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '14px',
                        background: '#FAF9FD',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--color-graphite)' }}>
                    Email Address (Optional for invoice)
                  </label>
                  <input
                    type="email"
                    placeholder="aryan@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '14px',
                      background: '#FAF9FD',
                    }}
                  />
                </div>
              </div>

              {/* Step 2: Delivery Address in India */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-graphite)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>
                    2
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Delivery Address in India</h3>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--color-graphite)' }}>
                    Flat / House No., Apartment &amp; Street *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Flat 1402, Tower 3, Prestige Palms, Worli"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '14px',
                      background: '#FAF9FD',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--color-graphite)' }}>
                      6-Digit PIN Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="400001"
                      value={pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '14px',
                        background: '#FAF9FD',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--color-graphite)' }}>
                      City / Region
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={city}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '14px',
                        background: '#F0EFF5',
                        color: 'var(--color-graphite)',
                        fontWeight: 600,
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '10px', fontSize: '12px', color: '#2F7D6B', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                  <Truck size={14} />
                  <span>BlueDart Air Express available • Estimated delivery in 2 business days</span>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-graphite)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>
                    3
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Choose Payment Method</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                  {/* COD */}
                  <div
                    onClick={() => {
                      playSlideSound();
                      setPaymentMethod('cod');
                    }}
                    style={{
                      padding: '16px',
                      borderRadius: '14px',
                      border: paymentMethod === 'cod' ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                      background: paymentMethod === 'cod' ? '#FAF9F6' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Banknote size={20} color="#2F7D6B" />
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '15px' }}>Cash on Delivery (COD)</div>
                        <div style={{ fontSize: '12px', color: 'var(--color-lilac-deep)' }}>Pay cash or UPI upon doorstep delivery. ₹0 surcharge.</div>
                      </div>
                    </div>
                    {paymentMethod === 'cod' && (
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--color-champagne)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={12} color="#FFF" />
                      </div>
                    )}
                  </div>

                  {/* UPI */}
                  <div
                    onClick={() => {
                      playSlideSound();
                      setPaymentMethod('upi');
                    }}
                    style={{
                      padding: '16px',
                      borderRadius: '14px',
                      border: paymentMethod === 'upi' ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                      background: paymentMethod === 'upi' ? '#FAF9F6' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <QrCode size={20} color="#C8A75A" />
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '15px' }}>Instant UPI (GPay / PhonePe / Paytm / BHIM)</div>
                        <div style={{ fontSize: '12px', color: 'var(--color-lilac-deep)' }}>Scan instant QR code or pay via your UPI ID.</div>
                      </div>
                    </div>
                    {paymentMethod === 'upi' && (
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--color-champagne)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={12} color="#FFF" />
                      </div>
                    )}
                  </div>

                  {/* Card */}
                  <div
                    onClick={() => {
                      playSlideSound();
                      setPaymentMethod('card');
                    }}
                    style={{
                      padding: '16px',
                      borderRadius: '14px',
                      border: paymentMethod === 'card' ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                      background: paymentMethod === 'card' ? '#FAF9F6' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <CreditCard size={20} color="#1C1C26" />
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '15px' }}>Credit / Debit Card</div>
                        <div style={{ fontSize: '12px', color: 'var(--color-lilac-deep)' }}>Visa, MasterCard, RuPay, and American Express.</div>
                      </div>
                    </div>
                    {paymentMethod === 'card' && (
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--color-champagne)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={12} color="#FFF" />
                      </div>
                    )}
                  </div>
                </div>

                {paymentMethod === 'upi' && (
                  <div style={{ background: '#FAF9FD', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                      Enter Your UPI ID (e.g. user@oksbi, phone@ybl)
                    </label>
                    <input
                      type="text"
                      placeholder="username@okhdfcbank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '13px',
                        background: '#FFF',
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '18px',
                  fontSize: '16px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                {isSubmitting ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <span>Place Order • {formatINR(totalPrice)}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div style={{ marginTop: '14px', textAlign: 'center', fontSize: '12px', color: 'var(--color-lilac-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Lock size={13} />
                <span>256-Bit Bank Grade SSL Encrypted Checkout • RBI Guideline Compliant</span>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary & Inclusions */}
          <div
            className="glass-panel"
            style={{
              padding: '36px',
              borderRadius: '24px',
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px' }}>
              Order Summary
            </h3>

            {/* Product Card */}
            <div style={{ display: 'flex', gap: '16px', paddingBottom: '20px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '20px' }}>
              <div
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '16px',
                  background: '#F5F5F8',
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <img
                  src="/assets/aurelle_unboxing.jpg"
                  alt={selectedBundle.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 800 }}>{selectedBundle.name}</h4>
                  <span style={{ fontSize: '16px', fontWeight: 800 }}>{formatINR(totalPrice)}</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-lilac-deep)', marginTop: '2px' }}>
                  {selectedBundle.description}
                </p>

                {/* Quantity Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-subtle)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{ padding: '4px 10px', background: '#FAF9FD', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                    >
                      -
                    </button>
                    <span style={{ padding: '4px 12px', fontSize: '13px', fontWeight: 800 }}>{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      style={{ padding: '4px 10px', background: '#FAF9FD', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                    >
                      +
                    </button>
                  </div>
                  <span style={{ fontSize: '12px', color: '#2F7D6B', fontWeight: 700 }}>
                    Save {formatINR(totalSavings)}
                  </span>
                </div>
              </div>
            </div>

            {/* Inclusions Checkmarks */}
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-champagne)' }}>
                KIT INCLUSIONS
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedBundle.inclusions.map((inc, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-graphite)' }}>
                    <Check size={14} color="#C8A75A" style={{ flexShrink: 0 }} />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subtotal Breakdown */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-lilac-deep)' }}>
                <span>Subtotal (M.R.P.)</span>
                <span style={{ textDecoration: 'line-through' }}>{formatINR(originalTotalPrice)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2F7D6B', fontWeight: 700 }}>
                <span>Promotional Discount</span>
                <span>-{formatINR(totalSavings)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-lilac-deep)' }}>
                <span>Express Delivery in India</span>
                <span style={{ color: '#2F7D6B', fontWeight: 700 }}>FREE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-lilac-deep)' }}>
                <span>COD Convenience Fee</span>
                <span style={{ color: '#2F7D6B', fontWeight: 700 }}>₹0 (FREE)</span>
              </div>

              <div style={{ borderTop: '1.5px solid var(--border-subtle)', paddingTop: '14px', marginTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '16px', fontWeight: 800 }}>Total Amount</span>
                <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-graphite)' }}>{formatINR(totalPrice)}</span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-lilac-deep)', textAlign: 'right' }}>
                Includes GST and all local taxes
              </span>
            </div>

            {/* Trust Seal Strip */}
            <div style={{ marginTop: '24px', background: '#FAF9FD', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: '#2F7D6B', marginBottom: '6px' }}>
                <ShieldCheck size={16} /> 7-Day In-Home Replacement Guarantee
              </div>
              <p style={{ fontSize: '12px', color: 'var(--color-lilac-deep)', margin: 0, lineHeight: 1.5 }}>
                Not 100% satisfied with your Aurelle system? We offer free doorstep reverse pickup and a prompt refund with zero hassles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
