import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2, Truck, Sparkles, ShieldCheck, Gift, Check, MessageCircle, MapPin, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { type ProductBundleConfig } from '../config/product.config';
import { BRAND } from '../config/brand.config';
import { formatINR } from '../lib/format';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBundle: ProductBundleConfig;
  quantity: number;
  onUpdateQuantity: (newQty: number) => void;
  onProceedToCheckout?: () => void;
}

interface CartAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  selectedBundle,
  quantity,
  onUpdateQuantity,
  onProceedToCheckout,
}) => {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card'>('upi');
  const [orderId, setOrderId] = useState('AUR-98412');
  const [pincode, setPincode] = useState('110001');
  const [pinChecked, setPinChecked] = useState(true);
  const [pinMessage, setPinMessage] = useState('Express delivery to New Delhi (110001) by Tomorrow, 2:00 PM via Blue Dart Air');

  if (!isOpen) return null;

  const availableAddons: CartAddon[] = [
    {
      id: 'refill-30',
      name: '+30 Extra Refill Pods Pack',
      description: 'Ocean Mist antibacterial formula',
      price: 699,
      originalPrice: 999,
      image: '/assets/aurelle_pod_exploded.jpg',
    },
    {
      id: 'bracket-3m',
      name: '3M Heavy-Duty No-Drill Mount',
      description: 'Anodized brass gold finish with dual tape',
      price: 199,
      originalPrice: 299,
      image: '/assets/aurelle_wallmount_detail.jpg',
    },
    {
      id: 'jar-apothecary',
      name: 'Fluted Amber Glass Pod Jar',
      description: 'Apothecary bathroom organizer (Holds 35 pods)',
      price: 499,
      originalPrice: 699,
      image: '/assets/aurelle_refill_ritual.jpg',
    },
  ];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = availableAddons.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const addonsOriginalTotal = selectedAddons.reduce((sum, id) => {
    const addon = availableAddons.find((a) => a.id === id);
    return sum + (addon ? addon.originalPrice : 0);
  }, 0);

  // ₹100 instant prepaid UPI discount like Suvaam reference
  const upiDiscount = paymentMethod === 'upi' ? 100 : 0;

  const subtotal = Math.max(0, selectedBundle.price * quantity + addonsTotal - upiDiscount);
  const regularTotal = selectedBundle.originalPrice * quantity + addonsOriginalTotal;
  const totalSavings = regularTotal - subtotal;

  // Milestone rewards threshold (Tier 1: ₹999 free ship, Tier 2: ₹2199 free gift jar)
  const milestoneTarget = 2199;
  const currentTotal = selectedBundle.price * quantity + addonsTotal;
  const milestoneProgress = Math.min(100, Math.round((currentTotal / milestoneTarget) * 100));
  const remainingForGift = Math.max(0, milestoneTarget - currentTotal);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pincode.replace(/\D/g, '');
    if (clean.length === 6) {
      setPinChecked(true);
      if (clean.startsWith('11') || clean.startsWith('40') || clean.startsWith('56')) {
        setPinMessage(`⚡ Express delivery to PIN ${clean} by Tomorrow via Blue Dart Air • Cash on Delivery Active`);
      } else {
        setPinMessage(`✓ Standard delivery in 2-4 days to PIN ${clean} via Express Courier • Cash on Delivery Active`);
      }
    } else {
      setPinChecked(false);
      setPinMessage('Please enter a valid 6-digit Indian PIN code');
    }
  };

  const handleCheckout = () => {
    if (onProceedToCheckout) {
      onClose();
      onProceedToCheckout();
      return;
    }
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C8A75A', '#1C1C26', '#2F7D6B', '#DFCA88'],
    });
    setOrderId(`AUR-${Math.floor(10000 + Math.random() * 90000)}`);
    setOrderPlaced(true);
  };

  const resetOrder = () => {
    setOrderPlaced(false);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="drawer-backdrop" onClick={onClose} />

      {/* Slide-over Drawer Panel */}
      <aside className="cart-drawer" style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}>
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#FFFFFF',
          }}
        >
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-graphite)' }}>
              Your {BRAND.name} Order
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--color-lilac-deep)' }}>
              {quantity} hardware kit(s) {selectedAddons.length > 0 ? `+ ${selectedAddons.length} companion item(s)` : ''} in bag
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Bag"
            style={{
              background: '#F5F5F8',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-graphite)',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {orderPlaced ? (
          /* Order Confirmation View */
          <div
            style={{
              padding: '40px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '16px',
              margin: 'auto 0',
            }}
          >
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                background: '#EAF5F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircle2 size={38} color="#2F7D6B" />
            </div>

            <span className="pill-badge" style={{ background: '#EAF5F2', color: '#2F7D6B', borderColor: '#2F7D6B' }}>
              ORDER DISPATCH QUEUED
            </span>

            <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Order Confirmed!</h2>
            <div style={{ fontSize: '14px', color: 'var(--color-lilac-deep)' }}>
              Order Reference: <strong style={{ color: 'var(--color-graphite)' }}>{orderId}</strong>
            </div>

            <div
              style={{
                background: '#F5F5F8',
                borderRadius: '16px',
                padding: '18px',
                width: '100%',
                textAlign: 'left',
                fontSize: '13px',
                lineHeight: 1.6,
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Selected System:</span>
                <strong>{selectedBundle.name} (×{quantity})</strong>
              </div>
              {selectedAddons.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span>Companions:</span>
                  <strong>{selectedAddons.length} pack(s)</strong>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Payment Mode:</span>
                <strong style={{ textTransform: 'uppercase' }}>
                  {paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod.toUpperCase()}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Total Amount:</span>
                <strong>{formatINR(subtotal)} (GST Included)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Delivery:</span>
                <span style={{ color: '#2F7D6B', fontWeight: 600 }}>2 to 3 Days (Blue Dart Air)</span>
              </div>
            </div>

            <button onClick={resetOrder} className="btn-primary" style={{ width: '100%', marginTop: '12px' }}>
              Return to Store
            </button>
          </div>
        ) : (
          /* Normal Cart Drawer Items View (Dense, high-converting, ZERO empty space) */
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
              {/* 1. Milestone Rewards Bar */}
              <div
                style={{
                  background: '#FDF8EA',
                  border: '1px solid rgba(200, 167, 90, 0.4)',
                  borderRadius: '14px',
                  padding: '12px 14px',
                  marginBottom: '18px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: 'var(--color-graphite)' }}>
                    <Gift size={14} color="#C8A75A" />
                    <span>
                      {remainingForGift === 0
                        ? '🎉 Complimentary Luxury Glass Jar Unlocked!'
                        : `Add ${formatINR(remainingForGift)} more for Free Apothecary Jar`}
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-champagne)' }}>
                    {milestoneProgress}%
                  </span>
                </div>

                {/* Progress track */}
                <div
                  style={{
                    height: '6px',
                    background: 'rgba(0,0,0,0.06)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${milestoneProgress}%`,
                      background: 'linear-gradient(90deg, #C8A75A, #DFCA88)',
                      borderRadius: '4px',
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '10px', color: 'var(--color-lilac-deep)' }}>
                  <span style={{ color: '#2F7D6B', fontWeight: 700 }}>✓ Free Express Shipping</span>
                  <span>{remainingForGift === 0 ? '✓ Free Gift Unlocked' : 'Free Gift at ₹2,199'}</span>
                </div>
              </div>

              {/* 2. Main Cart Item Card */}
              <div
                style={{
                  display: 'flex',
                  gap: '14px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid var(--border-subtle)',
                  marginBottom: '18px',
                }}
              >
                <div
                  style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: '#F5F5F8',
                    flexShrink: 0,
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <img
                    src="/assets/aurelle_hero_travertine.jpg"
                    alt={selectedBundle.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1.3 }}>
                      {selectedBundle.name}
                    </h4>
                    <span style={{ fontSize: '15px', fontWeight: 800 }}>
                      {formatINR(selectedBundle.price * quantity)}
                    </span>
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--color-lilac-deep)', marginTop: '2px', marginBottom: '10px' }}>
                    Includes {selectedBundle.heads} Cleaning Pods + {selectedBundle.wands} Wand Dock
                  </p>

                  {/* Quantity Stepper */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      background: '#FFF',
                    }}
                  >
                    <button
                      onClick={() => onUpdateQuantity(Math.max(1, quantity - 1))}
                      style={{
                        padding: '3px 8px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 600,
                      }}
                    >
                      -
                    </button>
                    <span style={{ padding: '0 8px', fontSize: '13px', fontWeight: 700 }}>
                      {quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(quantity + 1)}
                      style={{
                        padding: '3px 8px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 600,
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. Recommended Companions (3 High-Converting Add-ons) */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={13} color="#C8A75A" />
                    <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-graphite)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Recommended Companions
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--color-signal)', fontWeight: 700 }}>
                    Save up to ₹400
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {availableAddons.map((addon) => {
                    const isAdded = selectedAddons.includes(addon.id);

                    return (
                      <div
                        key={addon.id}
                        style={{
                          background: isAdded ? '#FDF8EA' : '#F9F9FB',
                          border: isAdded ? '1px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                          borderRadius: '12px',
                          padding: '10px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <img
                          src={addon.image}
                          alt={addon.name}
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '8px',
                            objectFit: 'cover',
                            flexShrink: 0,
                          }}
                        />

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-graphite)' }}>
                            {addon.name}
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--color-lilac-deep)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {addon.description}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 800 }}>+{formatINR(addon.price)}</span>
                            <span style={{ fontSize: '10px', textDecoration: 'line-through', color: 'var(--color-lilac-deep)' }}>
                              {formatINR(addon.originalPrice)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleAddon(addon.id)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: 'none',
                            background: isAdded ? '#1C1C26' : 'var(--color-champagne)',
                            color: isAdded ? '#FFFFFF' : '#1C1C26',
                            fontSize: '11px',
                            fontWeight: 800,
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {isAdded ? '✓ Added' : '+ Add'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4. Payment Preference (India D2C) */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-graphite)' }}>
                    Payment Preference:
                  </label>
                  {paymentMethod === 'upi' && (
                    <span style={{ fontSize: '10px', fontWeight: 800, color: '#2F7D6B', background: '#EAF5F2', padding: '2px 6px', borderRadius: '4px' }}>
                      ₹100 Instant Discount Applied
                    </span>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    style={{
                      padding: '10px 6px',
                      borderRadius: '8px',
                      border: paymentMethod === 'upi' ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                      background: paymentMethod === 'upi' ? '#FFF' : '#F5F5F8',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: paymentMethod === 'upi' ? 'var(--color-graphite)' : 'var(--color-lilac-deep)',
                    }}
                  >
                    UPI / GPay
                  </button>
                  <button
                    onClick={() => setPaymentMethod('cod')}
                    style={{
                      padding: '10px 6px',
                      borderRadius: '8px',
                      border: paymentMethod === 'cod' ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                      background: paymentMethod === 'cod' ? '#FFF' : '#F5F5F8',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: paymentMethod === 'cod' ? 'var(--color-graphite)' : 'var(--color-lilac-deep)',
                    }}
                  >
                    Cash on Delivery
                  </button>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    style={{
                      padding: '10px 6px',
                      borderRadius: '8px',
                      border: paymentMethod === 'card' ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                      background: paymentMethod === 'card' ? '#FFF' : '#F5F5F8',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: paymentMethod === 'card' ? 'var(--color-graphite)' : 'var(--color-lilac-deep)',
                    }}
                  >
                    Card / NetBanking
                  </button>
                </div>
              </div>

              {/* 5. 6-Digit PIN Code Delivery Estimator */}
              <div
                style={{
                  background: '#F9F9FB',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '12px',
                  marginBottom: '18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 800, color: 'var(--color-graphite)' }}>
                    <MapPin size={13} color="#C8A75A" />
                    <span>PIN CODE ESTIMATOR</span>
                  </div>
                  <span style={{ fontSize: '10px', color: '#2F7D6B', fontWeight: 700 }}>24,000+ PIN Codes</span>
                </div>

                <form onSubmit={handlePincodeCheck} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit PIN"
                    style={{
                      flex: 1,
                      padding: '7px 10px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '12px',
                      fontWeight: 600,
                      background: '#FFF',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '7px 14px',
                      borderRadius: '6px',
                      border: 'none',
                      background: 'var(--color-graphite)',
                      color: '#FFF',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Check
                  </button>
                </form>

                {pinMessage && (
                  <div style={{ fontSize: '11px', color: pinChecked ? '#1B5E4B' : '#E65100', fontWeight: 500, lineHeight: 1.3 }}>
                    {pinMessage}
                  </div>
                )}
              </div>

              {/* 6. Pan-India Trust Badges Grid (4 Pillars) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '8px',
                  padding: '12px',
                  background: '#F5F5F8',
                  borderRadius: '12px',
                  marginBottom: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={16} color="#2F7D6B" />
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-graphite)' }}>
                    7-Day Replacement
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Truck size={16} color="#2F7D6B" />
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-graphite)' }}>
                    Blue Dart Air
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#2F7D6B" />
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-graphite)' }}>
                    Non-Scratch Enamel
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={16} color="#2F7D6B" />
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-graphite)' }}>
                    COD Available
                  </span>
                </div>
              </div>

              {/* 7. WhatsApp Concierge Help Link */}
              <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                <a
                  href="https://wa.me/919820098412?text=Hi%20Aurelle%2C%20I%20have%20a%20question%20regarding%20my%20order"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    color: 'var(--color-lilac-deep)',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  <MessageCircle size={13} color="#25D366" />
                  <span>Questions? Chat with Aurelle Concierge on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Bottom Checkout Actions & Order Summary */}
            <div
              style={{
                padding: '20px 24px',
                borderTop: '1px solid var(--border-subtle)',
                background: '#FFFFFF',
                boxShadow: '0 -4px 16px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--color-lilac-deep)' }}>Total Value:</span>
                <span style={{ textDecoration: 'line-through', color: 'var(--color-lilac-deep)' }}>
                  {formatINR(regularTotal)}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--color-signal)', fontWeight: 600 }}>Bundle & Offer Savings:</span>
                <span style={{ color: 'var(--color-signal)', fontWeight: 700 }}>
                  -{formatINR(totalSavings)}
                </span>
              </div>

              {paymentMethod === 'upi' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                  <span style={{ color: '#2F7D6B', fontWeight: 600 }}>Prepaid UPI Instant Discount:</span>
                  <span style={{ color: '#2F7D6B', fontWeight: 700 }}>-₹100</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '14px' }}>
                <span style={{ color: 'var(--color-lilac-deep)' }}>Pan-India Express Shipping:</span>
                <span style={{ color: '#2F7D6B', fontWeight: 700 }}>FREE</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '16px',
                  paddingTop: '10px',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 800 }}>Total Payable</div>
                  <div style={{ fontSize: '10px', color: 'var(--color-lilac-deep)' }}>Includes 18% GST • Delivery Included</div>
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-graphite)' }}>
                  {formatINR(subtotal)}
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '15px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '10px',
                }}
              >
                Proceed to Checkout • {formatINR(subtotal)}
                <ArrowRight size={16} />
              </button>

              <div
                style={{
                  marginTop: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  color: 'var(--color-lilac-deep)',
                }}
              >
                <ShieldCheck size={14} color="#2F7D6B" />
                <span>256-Bit SSL Encrypted • 7-Day Replacement Guarantee</span>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
