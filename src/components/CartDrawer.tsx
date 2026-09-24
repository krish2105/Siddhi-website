import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2, Truck, Sparkles, ShieldCheck } from 'lucide-react';
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

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  selectedBundle,
  quantity,
  onUpdateQuantity,
  onProceedToCheckout,
}) => {
  const [includeAddon, setIncludeAddon] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card'>('upi');
  const [orderId, setOrderId] = useState('AUR-98412');

  if (!isOpen) return null;

  const addonPrice = 699;
  const subtotal = selectedBundle.price * quantity + (includeAddon ? addonPrice : 0);
  const regularTotal = selectedBundle.originalPrice * quantity + (includeAddon ? 999 : 0);
  const totalSavings = regularTotal - subtotal;

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
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Your {BRAND.name} Order</h3>
            <span style={{ fontSize: '12px', color: 'var(--color-lilac-deep)' }}>
              {quantity} hardware kit(s) in bag
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-lilac-deep)',
              padding: '4px',
            }}
          >
            <X size={20} />
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
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Payment Mode:</span>
                <strong style={{ textTransform: 'uppercase' }}>{paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod.toUpperCase()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Total Amount:</span>
                <strong>{formatINR(subtotal)} (GST Included)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Delivery:</span>
                <span style={{ color: '#2F7D6B', fontWeight: 600 }}>2 to 4 Days (Blue Dart Air)</span>
              </div>
            </div>

            {/* Shopify Live Connection Note */}
            <div
              style={{
                fontSize: '11px',
                color: 'var(--color-lilac-deep)',
                background: 'rgba(200, 167, 90, 0.12)',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px dashed var(--color-champagne)',
              }}
            >
              <strong>Interactive Demo Flow:</strong> Connect your Shopify Storefront Token in <code>.env.local</code> to route checkouts directly to Shopify Hosted Checkout.
            </div>

            <button onClick={resetOrder} className="btn-primary" style={{ width: '100%', marginTop: '12px' }}>
              Return to Store
            </button>
          </div>
        ) : (
          /* Normal Cart Drawer Items View */
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
            <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
              {/* Free Express Shipping Notification Banner */}
              <div
                style={{
                  background: '#EAF5F2',
                  border: '1px solid #C4E5DC',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '20px',
                }}
              >
                <Truck size={18} color="#2F7D6B" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '12px', color: '#1B5E4B', fontWeight: 600 }}>
                  You have qualified for Free Express Delivery across India.
                </span>
              </div>

              {/* Main Cart Item Card */}
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid var(--border-subtle)',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    width: '76px',
                    height: '76px',
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

                  <p style={{ fontSize: '12px', color: 'var(--color-lilac-deep)', marginTop: '2px', marginBottom: '12px' }}>
                    Includes {selectedBundle.heads} Cleaning Pods + {selectedBundle.wands} Wand
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
                        padding: '4px 10px',
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
                        padding: '4px 10px',
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

              {/* High-Converting 1-Click Upsell: Extra Refill Pods */}
              <div
                style={{
                  background: includeAddon ? '#FDF8EA' : '#F5F5F8',
                  border: includeAddon ? '1px solid var(--color-champagne)' : '1px dashed var(--border-subtle)',
                  borderRadius: '16px',
                  padding: '16px',
                  marginBottom: '24px',
                  transition: 'var(--transition)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={14} color="#C8A75A" />
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-graphite)' }}>
                      RECOMMENDED COMPANION
                    </span>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--color-signal)', fontWeight: 700 }}>
                    Save ₹300 on bundle
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      background: '#FFF',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src="/assets/aurelle_pod_exploded.jpg"
                      alt="Refill Pods"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>
                      +30 Extra Refill Pods Pack
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-lilac-deep)' }}>
                      Ocean Mist antibacterial formula
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: 800 }}>+{formatINR(addonPrice)}</div>
                    <button
                      onClick={() => setIncludeAddon(!includeAddon)}
                      style={{
                        marginTop: '4px',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: 'none',
                        background: includeAddon ? '#1C1C26' : 'var(--color-champagne)',
                        color: includeAddon ? '#FFFFFF' : '#1C1C26',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {includeAddon ? '✓ Added' : '+ Add'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector (India D2C) */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Payment Preference:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    style={{
                      padding: '10px 8px',
                      borderRadius: '8px',
                      border: paymentMethod === 'upi' ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                      background: paymentMethod === 'upi' ? '#FFFFFF' : '#F5F5F8',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: paymentMethod === 'upi' ? 'var(--color-graphite)' : 'var(--color-lilac-deep)',
                    }}
                  >
                    UPI / GPay
                  </button>
                  <button
                    onClick={() => setPaymentMethod('cod')}
                    style={{
                      padding: '10px 8px',
                      borderRadius: '8px',
                      border: paymentMethod === 'cod' ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                      background: paymentMethod === 'cod' ? '#FFFFFF' : '#F5F5F8',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: paymentMethod === 'cod' ? 'var(--color-graphite)' : 'var(--color-lilac-deep)',
                    }}
                  >
                    Cash on Delivery
                  </button>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    style={{
                      padding: '10px 8px',
                      borderRadius: '8px',
                      border: paymentMethod === 'card' ? '2px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                      background: paymentMethod === 'card' ? '#FFFFFF' : '#F5F5F8',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: paymentMethod === 'card' ? 'var(--color-graphite)' : 'var(--color-lilac-deep)',
                    }}
                  >
                    Credit / Debit
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Checkout Actions & Order Summary */}
            <div
              style={{
                padding: '24px',
                borderTop: '1px solid var(--border-subtle)',
                background: '#FFFFFF',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                <span style={{ color: 'var(--color-lilac-deep)' }}>Total Value:</span>
                <span style={{ textDecoration: 'line-through', color: 'var(--color-lilac-deep)' }}>
                  {formatINR(regularTotal)}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                <span style={{ color: 'var(--color-signal)', fontWeight: 600 }}>Bundle Discount Savings:</span>
                <span style={{ color: 'var(--color-signal)', fontWeight: 700 }}>
                  -{formatINR(totalSavings)}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '16px' }}>
                <span style={{ color: 'var(--color-lilac-deep)' }}>Pan-India Express Shipping:</span>
                <span style={{ color: 'var(--color-signal)', fontWeight: 700 }}>FREE</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '18px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 800 }}>Total Payable</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-lilac-deep)' }}>Includes GST</div>
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
                  padding: '16px',
                  fontSize: '16px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                Proceed to Checkout • {formatINR(subtotal)}
                <ArrowRight size={16} />
              </button>

              <div
                style={{
                  marginTop: '12px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  color: 'var(--color-lilac-deep)',
                }}
              >
                <ShieldCheck size={14} color="#2F7D6B" />
                <span>256-Bit SSL Encrypted • 7-Day Guarantee</span>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
