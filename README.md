# Moonlit Loops by Jyotsna ✨
> "Every loop is made with creativity, patience and love."

A modern, responsive, static ecommerce website crafted for **Moonlit Loops by Jyotsna** — selling handmade crochet exhibits, digital crochet patterns, and bespoke custom orders.

---

## 🌸 Table of Contents

1. [Local Development](#1-local-development)
2. [Building for Production](#2-building-for-production)
3. [Deploying to Vercel](#3-deploying-to-vercel)
4. [How to Add or Edit Products](#4-how-to-add-or-edit-products)
5. [How to Replace Product Images](#5-how-to-replace-product-images)
6. [How to Change Prices and Currency](#6-how-to-change-prices-and-currency)
7. [How to Change the WhatsApp Number](#7-how-to-change-the-whatsapp-number)
8. [How to Change Instagram and Social Links](#8-how-to-change-instagram-and-social-links)
9. [How to Add External Payment / Pattern Checkout Links](#9-how-to-add-external-payment--pattern-checkout-links)
10. [How to Connect a Custom Domain on Vercel](#10-how-to-connect-a-custom-domain-on-vercel)

---

## 1. Local Development

To run the project locally on your computer:

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev
```

The site will be live at `http://localhost:3000`.

---

## 2. Building for Production

To create an optimized production build:

```bash
npm run build
```

This compiles your static assets into the `dist/` directory.

---

## 3. Deploying to Vercel

This website is **100% static** and deploys effortlessly to Vercel without servers or databases.

### Method A: Deploy via GitHub & Vercel Dashboard
1. Push this repository to your **GitHub / GitLab** account.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Framework Preset: **Vite** (or Other).
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**.

### Method B: Deploy via Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## 4. How to Add or Edit Products

All product catalog data is located in a single file:
📂 `src/data/products.ts`

Each product is a clean TypeScript object. To add a new piece, simply copy and paste an existing item into the `products` array:

```typescript
{
  id: 'prod-handmade-07',
  name: 'Rosewater Scallop Hair Ribbon',
  slug: 'rosewater-scallop-hair-ribbon',
  category: 'accessories', // 'wearables' | 'home-decor' | 'accessories' | 'amigurumi' | 'blankets' | 'bags' | 'pattern-digital'
  type: 'handmade',        // 'handmade' | 'pattern' | 'custom'
  price: 22,
  originalPrice: 28,       // Optional strikethrough price
  currency: '$',
  shortDescription: 'Delicate floral lace crochet ribbon for gentle hairstyles.',
  description: 'Full detailed story and description of this creation...',
  thumbnail: 'https://your-image-url.jpg',
  images: [
    'https://your-image-url-1.jpg',
    'https://your-image-url-2.jpg'
  ],
  availability: 'in-stock', // 'in-stock' | 'made-to-order' | 'digital-download' | 'sold-out'
  featured: true,
  materials: '100% Organic Milk Cotton',
  dimensions: 'Length: 85 cm, Width: 4 cm',
  care: 'Hand wash in cold water, lay flat to dry.',
  processingTime: 'In stock — ships within 2-3 business days.',
}
```

---

## 5. How to Replace Product Images

You have two simple options:

### Option 1: Store Images in the `/public/` Folder
1. Put your photos in `/public/products/` (e.g., `/public/products/bucket-hat-1.jpg`).
2. Reference them directly in `src/data/products.ts`:
   ```typescript
   thumbnail: '/products/bucket-hat-1.jpg',
   images: [
     '/products/bucket-hat-1.jpg',
     '/products/bucket-hat-2.jpg'
   ],
   ```

### Option 2: Use Hosted Image URLs
You can use URLs hosted on Cloudinary, Imgur, Unsplash, or your Instagram/Shopify CDN.

---

## 6. How to Change Prices and Currency

To change the currency symbol store-wide (e.g., from `$` to `₹`, `£`, `€`):
1. Open 📂 `src/config/siteConfig.ts`
2. Update:
   ```typescript
   currencySymbol: '$', // Change to '₹' or '€' or '£'
   currencyCode: 'USD',  // Change to 'INR', 'EUR', 'GBP'
   ```
3. To change individual product prices, edit the `price` field in `src/data/products.ts`.

---

## 7. How to Change the WhatsApp Number

Orders and custom requests are sent directly to Jyotsna's WhatsApp.

1. Open 📂 `src/config/siteConfig.ts`
2. Update the phone numbers:
   ```typescript
   // Numbers only (country code + number, NO '+' or dashes):
   whatsappNumber: '919876543210', 

   // Human readable format displayed in the UI:
   whatsappDisplay: '+91 98765 43210',
   ```

---

## 8. How to Change Instagram and Social Links

1. Open 📂 `src/config/siteConfig.ts`
2. Update:
   ```typescript
   instagramHandle: '@moonlit.loops',
   instagramUrl: 'https://instagram.com/moonlit.loops',
   email: 'hello@moonlitloops.com',
   ```

---

## 9. How to Add External Payment / Pattern Checkout Links

If you want the **"Buy Pattern"** button to redirect to Gumroad, Etsy, Stripe Payment Link, or Razorpay:

1. Open `src/data/products.ts`
2. In the pattern product, set `externalCheckoutUrl`:
   ```typescript
   externalCheckoutUrl: 'https://jyotsna.gumroad.com/l/starry-night-pattern',
   ```
If left blank or omitted, it will automatically route the order via pre-filled WhatsApp message.

---

## 10. How to Connect a Custom Domain on Vercel

1. Purchase a domain name (e.g., `moonlitloops.com` on Namecheap, GoDaddy, Google Domains, Cloudflare, etc.).
2. Go to your project on **Vercel Dashboard** → **Settings** → **Domains**.
3. Type `moonlitloops.com` and click **Add**.
4. Follow Vercel's DNS instructions (add a `CNAME` pointing to `cname.vercel-dns.com` or `A` record pointing to `76.76.21.21`).
5. Your custom domain with free automatic SSL will be live within minutes!

---

*Made with yarn, imagination & lots of loops ✨*
