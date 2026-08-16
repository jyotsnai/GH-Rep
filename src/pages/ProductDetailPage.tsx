import React, { useState, useEffect } from 'react';
import { products } from '../data/products';
import { useShop } from '../context/ShopContext';
import { siteConfig } from '../config/siteConfig';
import { generateWhatsAppCartOrderUrl, handlePatternCheckout } from '../services/checkoutService';
import { ProductCard } from '../components/ProductCard';
import { 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  MessageCircle, 
  FileText, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  Clock, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Share2,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProductSlug, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    navigateTo,
    recordRecentlyViewed,
    showToast 
  } = useShop();

  const product = products.find((p) => p.slug === selectedProductSlug) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<'details' | 'materials' | 'care' | 'shipping'>('details');

  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
    if (product) {
      recordRecentlyViewed(product.id);
    }
  }, [selectedProductSlug, product]);

  const isFavorited = isInWishlist(product.id);

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.type === product.type))
    .slice(0, 4);

  const handleInstantWhatsAppBuy = () => {
    if (product.type === 'pattern') {
      const { action, url } = handlePatternCheckout(product);
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      const url = generateWhatsAppCartOrderUrl(
        [{ product, quantity }],
        product.price * quantity,
        `Quick order for ${product.name}`
      );
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard ✨');
    }
  };

  const renderTypeBadge = () => {
    switch (product.type) {
      case 'pattern':
        return (
          <span className="inline-flex items-center gap-1.5 bg-[#F3E8FF] text-[#5D3FD3] border border-[#E9D5FF] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Digital PDF Pattern</span>
          </span>
        );
      case 'custom':
        return (
          <span className="inline-flex items-center gap-1.5 bg-[#F3E8FF] text-[#8A9A5B] border border-[#E9D5FF] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Custom Creation</span>
          </span>
        );
      case 'handmade':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 bg-[#FDFBF7] text-[#5D3FD3] border border-[#E6E0D5] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#5D3FD3]" />
            <span>Handmade Exhibit</span>
          </span>
        );
    }
  };

  return (
    <div id="product-detail-page" className="py-6 sm:py-12 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 text-xs text-[#6B6471]">
          <button
            onClick={() => navigateTo('shop')}
            className="flex items-center gap-1 text-[#423D47] hover:text-[#5D3FD3] font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Studio Collection</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-1 hover:text-[#5D3FD3] transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* 2-Column Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16 sm:mb-20">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-4/3 sm:aspect-square rounded-[28px] overflow-hidden bg-white border border-[#E6E0D5] shadow-xs">
              <img
                src={product.images[activeImageIndex] || product.thumbnail}
                alt={`${product.name} angle ${activeImageIndex + 1}`}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Multiple images controls */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))}
                    aria-label="Previous photo"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-[#2D2A32] shadow-md transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
                    aria-label="Next photo"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-[#2D2A32] shadow-md transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Toggle wishlist"
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                  isFavorited
                    ? 'bg-white text-[#5D3FD3] shadow-md'
                    : 'bg-white/80 hover:bg-white text-[#8A9A5B] shadow-xs'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#5D3FD3]' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#5D3FD3] ring-2 ring-[#5D3FD3]/30 shadow-xs'
                        : 'border-[#E6E0D5] hover:border-[#5D3FD3] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Badges & Category */}
            <div className="flex flex-wrap items-center gap-2">
              {renderTypeBadge()}
              <span className="text-xs font-bold text-[#8A9A5B] uppercase tracking-wider font-sans">
                {product.category.replace('-', ' ')}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl text-[#2D2A32] font-semibold tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-display text-2xl sm:text-3xl font-bold text-[#2D2A32]">
                {siteConfig.currencySymbol}{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-[#8A9A5B] line-through">
                  {siteConfig.currencySymbol}{product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.availability === 'in-stock' && (
                <span className="ml-auto text-xs font-medium text-emerald-800 bg-[#E8F8EE] px-3 py-1 rounded-full">
                  In Stock & Ready to Ship
                </span>
              )}
              {product.availability === 'made-to-order' && (
                <span className="ml-auto text-xs font-medium text-[#5D3FD3] bg-[#F3E8FF] px-3 py-1 rounded-full">
                  Handmade to Order
                </span>
              )}
              {product.availability === 'digital-download' && (
                <span className="ml-auto text-xs font-medium text-[#5D3FD3] bg-[#F3E8FF] px-3 py-1 rounded-full">
                  Instant PDF Access
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-sm sm:text-base text-[#6B6471] leading-relaxed font-sans">
              {product.shortDescription}
            </p>

            {/* Quantity Selector & Action Buttons */}
            <div className="pt-2 space-y-3">
              
              {/* Quantity */}
              {product.type !== 'pattern' && (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-[#423D47]">Quantity:</span>
                  <div className="flex items-center border border-[#E6E0D5] rounded-xl bg-white p-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-7 h-7 flex items-center justify-center text-[#423D47] hover:text-[#5D3FD3] hover:bg-[#FDFBF7] rounded-lg transition-colors font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-[#2D2A32]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-7 h-7 flex items-center justify-center text-[#423D47] hover:text-[#5D3FD3] hover:bg-[#FDFBF7] rounded-lg transition-colors font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Add to Cart & Instant Order Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  id="detail-add-to-cart-btn"
                  onClick={() => addToCart(product, quantity)}
                  className="w-full py-3.5 px-5 rounded-full bg-[#5D3FD3] hover:bg-[#4B32A8] active:scale-98 text-white font-semibold text-sm tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <span>Add to Basket</span>
                </button>

                <button
                  id="detail-buy-now-btn"
                  onClick={handleInstantWhatsAppBuy}
                  className="w-full py-3.5 px-5 rounded-full bg-[#8A9A5B] hover:bg-[#78884B] active:scale-98 text-white font-bold text-sm tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  {product.type === 'pattern' ? (
                    <>
                      <ExternalLink className="w-4 h-4" />
                      <span>Buy Pattern</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Order on WhatsApp</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Quick Guarantees Box */}
            <div className="p-4 rounded-2xl bg-white border border-[#E6E0D5] space-y-2 text-xs text-[#6B6471]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8A9A5B] shrink-0" />
                <span>Handcrafted with patience & care by Jyotsna</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#8A9A5B] shrink-0" />
                <span>{product.processingTime || 'In stock / Fast turnaround'}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8A9A5B] shrink-0" />
                <span>Packaged safely with custom care card included</span>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Tabs Section */}
        <div className="bg-white rounded-[28px] p-6 sm:p-10 border border-[#E6E0D5] shadow-xs mb-16 sm:mb-20 text-left">
          {/* Tab headers */}
          <div className="flex items-center gap-2 sm:gap-4 border-b border-[#E6E0D5] pb-3 mb-6 overflow-x-auto">
            {[
              { id: 'details', label: 'About This Creation' },
              { id: 'materials', label: 'Materials & Dimensions' },
              { id: 'care', label: 'Care Instructions' },
              { id: 'shipping', label: 'Processing & Shipping' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`pb-2 px-3 text-sm font-semibold transition-all whitespace-nowrap relative cursor-pointer ${
                  selectedTab === tab.id
                    ? 'text-[#5D3FD3]'
                    : 'text-[#6B6471] hover:text-[#2D2A32]'
                }`}
              >
                {tab.label}
                {selectedTab === tab.id && (
                  <motion.div
                    layoutId="productTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5D3FD3] rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="text-sm text-[#423D47] leading-relaxed font-sans">
            {selectedTab === 'details' && (
              <div className="space-y-4">
                <p>{product.description}</p>
                {product.difficulty && (
                  <div className="p-3.5 bg-[#FDFBF7] rounded-xl border border-[#E6E0D5] space-y-1 text-xs">
                    <span className="font-semibold text-[#2D2A32] block">Skill Level: {product.difficulty}</span>
                    <p>Format: {product.digitalFileType || 'Digital PDF'}</p>
                    {product.language && <p>Language: {product.language}</p>}
                    {product.hookSize && <p>Suggested Hook: {product.hookSize}</p>}
                  </div>
                )}
              </div>
            )}

            {selectedTab === 'materials' && (
              <div className="space-y-3">
                <div>
                  <strong className="text-[#2D2A32] block mb-1">Materials:</strong>
                  <p>{product.materials || '100% Organic Combed Cotton / Wool Blend'}</p>
                </div>
                <div>
                  <strong className="text-[#2D2A32] block mb-1">Approximate Dimensions:</strong>
                  <p>{product.dimensions || 'Standard dimensions as described in specifications.'}</p>
                </div>
              </div>
            )}

            {selectedTab === 'care' && (
              <div className="space-y-3">
                <strong className="text-[#2D2A32] block mb-1">How to Care for Your Piece:</strong>
                <p>{product.care || 'Hand wash gently in cool water with mild wool detergent. Lay flat on clean towel to dry. Avoid bleaching or wringing.'}</p>
              </div>
            )}

            {selectedTab === 'shipping' && (
              <div className="space-y-3">
                <strong className="text-[#2D2A32] block mb-1">Processing Timeline:</strong>
                <p>{product.processingTime || 'In stock items ship within 2-3 business days. Made-to-order items take 1-2 weeks.'}</p>
                <p className="text-xs text-[#6B6471]">
                  All physical items are wrapped with tissue, ribbon, and personalized care note. Digital patterns are available instantly upon order.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Creations */}
        {relatedProducts.length > 0 && (
          <div className="text-left space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#8A9A5B] block">
                  More From the Studio
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#2D2A32]">
                  You May Also Love
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
