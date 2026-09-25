// Dual WhatsApp Notification Pipeline: 1-Click Customer Concierge Chat + Cloud API Webhook

export interface WhatsAppOrderDetails {
  orderId: string;
  customerName: string;
  customerPhone: string;
  bundleName: string;
  quantity: number;
  totalINR: number;
  paymentMethod: string;
  address: string;
  city: string;
  pincode: string;
}

const DEFAULT_CONCIERGE_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919820012345';
const CLOUD_WEBHOOK_URL = import.meta.env.VITE_WHATSAPP_WEBHOOK_URL || '';

// 1. Generate 1-Click Customer WhatsApp Verification Link
export function generateWhatsAppOrderUrl(order: WhatsAppOrderDetails): string {
  const message = [
    `✨ *Aurelle Luxury Hygiene • Order Confirmation*`,
    ``,
    `Hello Aurelle Concierge,`,
    `I have just placed an order for the *${order.bundleName}*.`,
    ``,
    `📋 *Order ID:* #${order.orderId}`,
    `📦 *Items:* ${order.bundleName} (×${order.quantity})`,
    `💳 *Amount:* ₹${order.totalINR.toLocaleString('en-IN')} (${order.paymentMethod})`,
    `📍 *Delivery Address:* ${order.address}, ${order.city} - ${order.pincode}`,
    `📞 *Client Phone:* ${order.customerPhone}`,
    ``,
    `Please confirm the order and dispatch via Blue Dart Express. Thank you!`,
  ].join('\n');

  const cleanPhone = DEFAULT_CONCIERGE_NUMBER.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

// 2. Trigger Asynchronous Cloud Webhook (Wati / Interakt / Gupshup / Make / Zapier)
export async function triggerWhatsAppWebhook(order: WhatsAppOrderDetails): Promise<{ triggered: boolean; error?: string }> {
  if (!CLOUD_WEBHOOK_URL) {
    console.debug('[WhatsApp Pipeline] No VITE_WHATSAPP_WEBHOOK_URL configured. Skipping cloud trigger.');
    return { triggered: false };
  }

  try {
    const response = await fetch(CLOUD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'order.created',
        timestamp: new Date().toISOString(),
        orderId: order.orderId,
        customer: {
          name: order.customerName,
          phone: order.customerPhone,
          address: order.address,
          city: order.city,
          pincode: order.pincode,
        },
        items: [
          {
            name: order.bundleName,
            quantity: order.quantity,
            amount: order.totalINR,
          },
        ],
        payment: {
          method: order.paymentMethod,
          totalINR: order.totalINR,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Webhook returned status ${response.status}`);
    }

    console.info(`[WhatsApp Pipeline] Cloud webhook triggered successfully for #${order.orderId}`);
    return { triggered: true };
  } catch (err: any) {
    console.warn('[WhatsApp Pipeline] Webhook failed:', err.message);
    return { triggered: false, error: err.message };
  }
}
