import { CartItem, CustomOrderFormData, Product } from '../types';
import { siteConfig } from '../config/siteConfig';

/**
 * =========================================================================
 * CHECKOUT & ORDER INTEGRATION SERVICE
 * =========================================================================
 * This service centralizes all checkout handling for Moonlit Loops.
 *
 * Current Static Capabilities:
 * 1. WhatsApp Instant Cart Ordering
 * 2. WhatsApp & Email Custom Order Request Generator
 * 3. External Digital Pattern Direct Links (Gumroad, Stripe, Etsy, etc.)
 *
 * FUTURE PAYMENT INTEGRATION:
 * To integrate Stripe / Razorpay / Shopify later, replace or enhance
 * `processOnlinePayment()` below without modifying UI components.
 */

export interface CheckoutResult {
  success: boolean;
  orderId?: string;
  redirectUrl?: string;
  errorMessage?: string;
}

/**
 * Formats cart items and constructs a friendly, pre-filled WhatsApp ordering URL
 */
export function generateWhatsAppCartOrderUrl(
  items: CartItem[],
  subtotal: number,
  notes?: string
): string {
  if (!items || items.length === 0) return '';

  const cleanPhone = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');
  
  let text = `✨ *New Order Request from ${siteConfig.brandName}* ✨\n\n`;
  text += `Hi ${siteConfig.creatorName}! I would like to order the following handmade items:\n\n`;

  items.forEach((item, index) => {
    const typeLabel = item.product.type === 'pattern' ? '[Digital Pattern]' : item.product.type === 'custom' ? '[Custom Order]' : '[Handmade]';
    text += `${index + 1}. *${item.product.name}* ${typeLabel}\n`;
    text += `   • Qty: ${item.quantity}\n`;
    text += `   • Price: ${siteConfig.currencySymbol}${(item.product.price * item.quantity).toFixed(2)}\n`;
    if (item.selectedColor) {
      text += `   • Color/Choice: ${item.selectedColor}\n`;
    }
    if (item.customNote) {
      text += `   • Note: ${item.customNote}\n`;
    }
    text += `\n`;
  });

  text += `--------------------------\n`;
  text += `*Estimated Subtotal: ${siteConfig.currencySymbol}${subtotal.toFixed(2)}*\n`;
  text += `--------------------------\n\n`;

  if (notes && notes.trim()) {
    text += `*Customer Note:* ${notes.trim()}\n\n`;
  }

  text += `Please let me know availability, shipping details, and payment options. Thank you! 🧶✨`;

  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

/**
 * Formats custom order form submissions into a WhatsApp URL
 */
export function generateWhatsAppCustomOrderUrl(formData: CustomOrderFormData): string {
  const cleanPhone = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');

  let text = `🌸 *Custom Crochet Request — ${siteConfig.brandName}* 🌸\n\n`;
  text += `Hi ${siteConfig.creatorName}! I have a custom crochet idea I'd love to discuss:\n\n`;
  text += `• *Name:* ${formData.name || 'Not provided'}\n`;
  text += `• *Email:* ${formData.email || 'Not provided'}\n`;
  text += `• *WhatsApp/Phone:* ${formData.whatsapp || 'Not provided'}\n`;
  text += `• *Item/Idea:* ${formData.itemType || 'Custom piece'}\n`;
  text += `• *Preferred Colors:* ${formData.preferredColors || 'Open to suggestions'}\n`;
  text += `• *Approximate Size:* ${formData.approximateSize || 'Flexible'}\n`;
  text += `• *Budget Range:* ${formData.budgetRange || 'Flexible'}\n`;
  if (formData.deadline) {
    text += `• *Needed By:* ${formData.deadline}\n`;
  }
  text += `\n*Details / Vision:*\n${formData.message || 'I would love your creative input!'}\n\n`;
  text += `Looking forward to hearing your thoughts and timeline! ✨`;

  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

/**
 * Formats custom order form submissions into a Mailto URL
 */
export function generateMailtoCustomOrderUrl(formData: CustomOrderFormData): string {
  const subject = encodeURIComponent(`Custom Crochet Request - ${formData.name || 'Inquiry'}`);
  
  let body = `Hi ${siteConfig.creatorName},\n\n`;
  body += `I would love to request a custom crochet creation from ${siteConfig.brandName}:\n\n`;
  body += `Name: ${formData.name}\n`;
  body += `Email: ${formData.email}\n`;
  body += `Phone/WhatsApp: ${formData.whatsapp}\n`;
  body += `Item requested: ${formData.itemType}\n`;
  body += `Preferred colors: ${formData.preferredColors}\n`;
  body += `Approximate size: ${formData.approximateSize}\n`;
  body += `Budget range: ${formData.budgetRange}\n`;
  body += `Deadline: ${formData.deadline || 'None'}\n\n`;
  body += `Message & Inspiration:\n${formData.message}\n\n`;
  body += `Thank you!`;

  return `mailto:${siteConfig.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
}

/**
 * Handles digital pattern direct checkout / download links or fallback to WhatsApp
 */
export function handlePatternCheckout(product: Product): { action: 'redirect' | 'whatsapp'; url: string } {
  if (product.externalCheckoutUrl && product.externalCheckoutUrl !== 'https://gumroad.com') {
    return {
      action: 'redirect',
      url: product.externalCheckoutUrl
    };
  }

  // Fallback direct WhatsApp pattern request
  const cleanPhone = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');
  const text = encodeURIComponent(
    `Hi ${siteConfig.creatorName}! I would like to purchase the *${product.name}* (Digital PDF Pattern for ${siteConfig.currencySymbol}${product.price}). Please share the payment link & download instructions. Thank you! ✨`
  );

  return {
    action: 'whatsapp',
    url: `https://wa.me/${cleanPhone}?text=${text}`
  };
}

/**
 * Placeholder for future real Payment Gateway integration (Stripe / Razorpay / Shopify)
 */
export async function processOnlinePayment(
  items: CartItem[],
  totalAmount: number
): Promise<CheckoutResult> {
  // Simulate future payment integration endpoint or redirect
  console.log('Future payment gateway hook:', { items, totalAmount });
  return {
    success: true,
    orderId: 'ML-' + Math.floor(100000 + Math.random() * 900000),
  };
}
