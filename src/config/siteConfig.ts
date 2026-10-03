import { SiteConfig } from '../types';

/**
 * =========================================================================
 * MOONLIT LOOPS CONFIGURATION FILE
 * =========================================================================
 * Edit brand information, social links, contact numbers and currency here.
 * Any updates here automatically propagate throughout the entire store.
 */
export const siteConfig: SiteConfig = {
  brandName: 'Moonlit Loops',
  subtitle: 'by Jyotsna',
  creatorName: 'Jyotsna',
  tagline: 'Every loop is made with creativity, patience and love.',
  
  // WhatsApp Configuration for Orders & Custom Requests
  // Format: Country code without '+' or special characters for URL (e.g. "919876543210")
  whatsappNumber: '919876543210',
  whatsappDisplay: '+91 98765 43210',
  
  // Social Media Links
  instagramHandle: '@moonlit.loops',
  instagramUrl: 'https://instagram.com/moonlit.loops',
  email: 'hello@moonlitloops.com',
  
  // Store & Currency Settings
  currencySymbol: '$', // Change to '₹', '£', '€', etc. as needed
  currencyCode: 'USD',
  
  // Location & Shipping Note
  location: 'Handmade Studio, Earth',
  shippingNote: 'Worldwide digital pattern delivery • Worldwide handmade shipping with tracking',
  
  // Optional Announcement bar (leave empty string to hide)
  noticeBanner: '✨ Welcome to Moonlit Loops — handmade crochet creations & digital patterns by Jyotsna ✨',
};
