// Shiprocket / Blue Dart / Delhivery Multi-Carrier Logistics Integration

export interface ServiceabilityResult {
  pincode: string;
  city: string;
  state: string;
  serviceable: boolean;
  carrier: 'Blue Dart Air Express' | 'Delhivery Surface Express' | 'DTDC Premium';
  estimatedDays: string;
  codAvailable: boolean;
  hubLocation: string;
}

export interface TrackingMilestone {
  title: string;
  location: string;
  timestamp: string;
  completed: boolean;
  active: boolean;
  desc: string;
}

export interface TrackingResult {
  orderId: string;
  awbNumber: string;
  carrier: string;
  estimatedDeliveryDate: string;
  status: 'Order Confirmed' | 'Dispatched' | 'In Transit' | 'Out for Delivery' | 'Delivered';
  milestones: TrackingMilestone[];
}

// 1. PIN code Serviceability Checker (Shiprocket / Carrier Hub Engine)
export function checkPincodeServiceability(pincode: string): ServiceabilityResult {
  const clean = pincode.trim();

  // Tier 1 Metros: Guaranteed Blue Dart Air Express 24-48 Hours
  if (clean.startsWith('40') || clean.startsWith('41')) {
    return {
      pincode: clean,
      city: 'Mumbai / Pune',
      state: 'Maharashtra',
      serviceable: true,
      carrier: 'Blue Dart Air Express',
      estimatedDays: '24-36 Hours (Direct Flight from BOM)',
      codAvailable: true,
      hubLocation: 'BOM-01 Air Logistics Hub, Santacruz',
    };
  }

  if (clean.startsWith('11') || clean.startsWith('12')) {
    return {
      pincode: clean,
      city: 'New Delhi / Gurugram',
      state: 'Delhi NCR',
      serviceable: true,
      carrier: 'Blue Dart Air Express',
      estimatedDays: '24-48 Hours (Direct Flight to DEL)',
      codAvailable: true,
      hubLocation: 'DEL-Cargo Gateway, IGI Terminal 3',
    };
  }

  if (clean.startsWith('56') || clean.startsWith('57')) {
    return {
      pincode: clean,
      city: 'Bengaluru',
      state: 'Karnataka',
      serviceable: true,
      carrier: 'Blue Dart Air Express',
      estimatedDays: '24-48 Hours (Direct Flight to BLR)',
      codAvailable: true,
      hubLocation: 'BLR Air Freight Hub, Devanahalli',
    };
  }

  if (clean.startsWith('50') || clean.startsWith('51')) {
    return {
      pincode: clean,
      city: 'Hyderabad',
      state: 'Telangana',
      serviceable: true,
      carrier: 'Blue Dart Air Express',
      estimatedDays: '24-48 Hours',
      codAvailable: true,
      hubLocation: 'HYD Shamshabad Gateway',
    };
  }

  if (clean.startsWith('60') || clean.startsWith('61')) {
    return {
      pincode: clean,
      city: 'Chennai',
      state: 'Tamil Nadu',
      serviceable: true,
      carrier: 'Blue Dart Air Express',
      estimatedDays: '24-48 Hours',
      codAvailable: true,
      hubLocation: 'MAA Air Gateway, Meenambakkam',
    };
  }

  if (clean.startsWith('70')) {
    return {
      pincode: clean,
      city: 'Kolkata',
      state: 'West Bengal',
      serviceable: true,
      carrier: 'Delhivery Surface Express',
      estimatedDays: '2-3 Business Days',
      codAvailable: true,
      hubLocation: 'CCU Rajarhat Regional Hub',
    };
  }

  // Rest of India
  return {
    pincode: clean,
    city: 'Tier 2/3 Regional Hub',
    state: 'India',
    serviceable: clean.length === 6,
    carrier: 'Delhivery Surface Express',
    estimatedDays: '2-4 Business Days',
    codAvailable: true,
    hubLocation: 'National Central Transit Hub, Bhiwandi',
  };
}

// 2. Generate AWB Tracking Number & Timeline
export function getOrderTrackingData(orderId: string): TrackingResult {
  const cleanId = orderId.toUpperCase().replace('#', '');
  const now = new Date();

  // Deterministic AWB based on orderId
  const rawHash = cleanId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const awbNumber = `BD${(847291039 + rawHash).toString().slice(0, 9)}IN`;

  const orderTimeStr = `${now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}, 11:30 AM`;
  const packedTimeStr = `${now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}, 02:15 PM`;
  const dispatchTimeStr = `${now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}, 05:45 PM`;

  const deliveryDate = new Date(now.getTime() + 48 * 60 * 60 * 1000);
  const deliveryDateStr = deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  return {
    orderId: cleanId,
    awbNumber,
    carrier: 'Blue Dart Air Express',
    estimatedDeliveryDate: deliveryDateStr,
    status: 'In Transit',
    milestones: [
      {
        title: 'Order Verified & Security Tagged',
        location: 'Aurelle Central Hub, BKC Mumbai',
        timestamp: orderTimeStr,
        completed: true,
        active: false,
        desc: 'Precision packaging completed with tamper-evident serialized gold seal.',
      },
      {
        title: 'Air Cargo Manifest Handover',
        location: 'Blue Dart BOM Air Gateway Hub',
        timestamp: packedTimeStr,
        completed: true,
        active: false,
        desc: 'Consignment cleared priority screening and loaded onto dedicated air freighter.',
      },
      {
        title: 'In Flight Transit to Destination City',
        location: 'Air Cargo Flight 6E-804',
        timestamp: dispatchTimeStr,
        completed: true,
        active: true,
        desc: 'En route to local sorting facility for morning priority dispatch.',
      },
      {
        title: 'Out for White-Glove Delivery',
        location: 'Local Destination Fulfillment Depot',
        timestamp: `Expected: Tomorrow, by 2:00 PM`,
        completed: false,
        active: false,
        desc: 'Courier will phone or WhatsApp before arrival for contact-free handover.',
      },
    ],
  };
}
