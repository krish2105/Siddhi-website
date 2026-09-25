// Google Analytics 4 & Meta Pixel Event Dispatcher for Aurelle Luxe Store

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    fbq?: any;
    _fbq?: any;
  }
}

const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '';
const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || '';

// Initialize tracking scripts if keys exist
export function initAnalytics() {
  if (typeof window === 'undefined') return;

  // Initialize GA4
  if (GA4_MEASUREMENT_ID && !window.gtag) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer?.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA4_MEASUREMENT_ID);
    console.info(`[Analytics] GA4 initialized: ${GA4_MEASUREMENT_ID}`);
  }

  // Initialize Meta Pixel
  if (META_PIXEL_ID && !window.fbq) {
    /* eslint-disable */
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */

    window.fbq?.('init', META_PIXEL_ID);
    window.fbq?.('track', 'PageView');
    console.info(`[Analytics] Meta Pixel initialized: ${META_PIXEL_ID}`);
  }
}

// Track Page View
export function trackPageView(pageName: string) {
  if (typeof window === 'undefined') return;
  if (window.gtag && GA4_MEASUREMENT_ID) {
    window.gtag('event', 'page_view', { page_title: pageName });
  }
  if (window.fbq && META_PIXEL_ID) {
    window.fbq('track', 'PageView');
  }
  console.debug(`[Analytics] PageView: ${pageName}`);
}

// Track Add to Cart
export function trackAddToCart(bundleId: string, bundleName: string, price: number, quantity: number) {
  if (typeof window === 'undefined') return;
  const value = price * quantity;

  if (window.gtag && GA4_MEASUREMENT_ID) {
    window.gtag('event', 'add_to_cart', {
      currency: 'INR',
      value,
      items: [
        {
          item_id: bundleId,
          item_name: bundleName,
          price,
          quantity,
        },
      ],
    });
  }

  if (window.fbq && META_PIXEL_ID) {
    window.fbq('track', 'AddToCart', {
      content_name: bundleName,
      content_ids: [bundleId],
      content_type: 'product',
      value,
      currency: 'INR',
    });
  }
  console.debug(`[Analytics] AddToCart: ${bundleName} (₹${value})`);
}

// Track Initiate Checkout
export function trackInitiateCheckout(bundleName: string, amount: number, quantity: number) {
  if (typeof window === 'undefined') return;

  if (window.gtag && GA4_MEASUREMENT_ID) {
    window.gtag('event', 'begin_checkout', {
      currency: 'INR',
      value: amount,
      items: [{ item_name: bundleName, quantity, price: amount / quantity }],
    });
  }

  if (window.fbq && META_PIXEL_ID) {
    window.fbq('track', 'InitiateCheckout', {
      content_name: bundleName,
      value: amount,
      currency: 'INR',
      num_items: quantity,
    });
  }
  console.debug(`[Analytics] InitiateCheckout: ₹${amount}`);
}

// Track Completed Purchase
export function trackPurchase(orderId: string, bundleName: string, amount: number, quantity: number) {
  if (typeof window === 'undefined') return;

  if (window.gtag && GA4_MEASUREMENT_ID) {
    window.gtag('event', 'purchase', {
      transaction_id: orderId,
      currency: 'INR',
      value: amount,
      items: [{ item_name: bundleName, quantity, price: amount / quantity }],
    });
  }

  if (window.fbq && META_PIXEL_ID) {
    window.fbq('track', 'Purchase', {
      content_name: bundleName,
      value: amount,
      currency: 'INR',
      num_items: quantity,
      order_id: orderId,
    });
  }
  console.info(`[Analytics] Purchase Tracked: #${orderId} (₹${amount})`);
}
