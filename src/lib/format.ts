/**
 * Format currency amounts in Indian Rupees (INR) using Indian numbering system
 * Example: 1599 -> "₹1,599", 2499 -> "₹2,499"
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format pin code with space: 400001 -> "400 001"
 */
export function formatPincode(pincode: string): string {
  const clean = pincode.replace(/\D/g, "");
  if (clean.length > 3) {
    return `${clean.slice(0, 3)} ${clean.slice(3, 6)}`;
  }
  return clean;
}
