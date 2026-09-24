/**
 * Claims & Compliance Policy for Aurelle
 * Any claim rendered on the website is guarded by these flags.
 * Defaults are strictly false unless verifiable laboratory certificates exist.
 */
export const CLAIMS = {
  plantBased: false, // Set to true once material test report is received
  recycledPlastic: false, // Set to true once post-consumer resin cert is filed
  dermatologicallyTested: false, // Cosmetic/skin contact safety test
  biodegradableHeads: false, // Industrial composting / disintegration cert
  madeInIndia: true, // Assembled & engineered for Indian plumbing and hard water
  reviewsVerifiedCount: 184, // Only verified customer reviews from domestic shipments
  guaranteeDays: 7, // 7 days replacement guarantee
  neverFlushNotice: true, // Mandatory hygiene safety rule: never flush used heads
};
