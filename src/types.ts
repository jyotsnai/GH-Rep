export type ProductType = 'handmade' | 'pattern' | 'custom';

export type ProductCategory = 
  | 'wearables'
  | 'home-decor'
  | 'accessories'
  | 'amigurumi'
  | 'blankets'
  | 'bags'
  | 'pattern-digital';

export type SkillLevel = 'Beginner' | 'Easy' | 'Intermediate' | 'Advanced';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  type: ProductType;
  price: number;
  originalPrice?: number;
  currency: string;
  description: string;
  shortDescription: string;
  images: string[];
  thumbnail: string;
  availability: 'in-stock' | 'made-to-order' | 'digital-download' | 'sold-out';
  featured?: boolean;
  isNew?: boolean;
  bestseller?: boolean;
  tags?: string[];
  
  // Specific details for Handmade
  materials?: string;
  dimensions?: string;
  care?: string;
  processingTime?: string;
  
  // Specific details for Digital Patterns
  difficulty?: SkillLevel;
  digitalFileType?: string;
  language?: string;
  hookSize?: string;
  externalCheckoutUrl?: string; // e.g., Gumroad, Etsy, Stripe, Razorpay link
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  customNote?: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: number;
}

export interface CustomOrderFormData {
  name: string;
  email: string;
  whatsapp: string;
  itemType: string;
  preferredColors: string;
  approximateSize: string;
  budgetRange: string;
  deadline?: string;
  message: string;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  creatorName: string;
  subtitle: string;
  whatsappNumber: string; // international format e.g. "+919876543210" or "919876543210"
  whatsappDisplay: string;
  instagramHandle: string;
  instagramUrl: string;
  email: string;
  currencySymbol: string;
  currencyCode: string;
  shippingNote: string;
  location: string;
  noticeBanner?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location?: string;
  productName?: string;
  rating: number;
  comment: string;
  date: string;
  isPlaceholder?: boolean;
}
