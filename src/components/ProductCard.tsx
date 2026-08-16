import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { siteConfig } from '../config/siteConfig';
import { Heart, ShoppingBag, Eye, FileText, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    navigateTo,
    recordRecentlyViewed 
  } = useShop();

  const isFavorited = isInWishlist(product.id);

  const handleCardClick = () => {
    recordRecentlyViewed(product.id);
    navigateTo('product-detail', product.slug);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const renderTypeBadge = () => {
    switch (product.type) {
      case 'pattern':
        return (
          <span className="inline-flex items-center gap-1 bg-[#F3E8FF] text-[#5D3FD3] border border-[#E9D5FF] text-[11px] font-semibold px-2.5 py-0.5 rounded-full tracking-wide">
            <FileText className="w-3 h-3" />
            <span>Digital Pattern</span>
          </span>
        );
      case 'custom':
        return (
          <span className="inline-flex items-center gap-1 bg-[#F5F7EF] text-[#63723D] border border-[#D1DBC0] text-[11px] font-semibold px-2.5 py-0.5 rounded-full tracking-wide">
            <Sparkles className="w-3 h-3 text-[#8A9A5B]" />
            <span>Custom Order</span>
          </span>
        );
      case 'handmade':
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-[#FDFBF7] text-[#5C5562] border border-[#E6E0D5] text-[11px] font-semibold px-2.5 py-0.5 rounded-full tracking-wide">
            <span>Handmade</span>
          </span>
        );
    }
  };

  return (
    <motion.div
      id={`product-card-${product.id}`}
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onClick={handleCardClick}
      className="group bg-white rounded-[24px] border border-[#E6E0D5] overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-xl transition-all duration-300 cursor-pointer relative"
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-square bg-[#FDFBF7] overflow-hidden">
        <img
          src={product.thumbnail || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {renderTypeBadge()}
          {product.difficulty && (
            <span className="bg-[#2D2A32]/85 text-[#FDFBF7] backdrop-blur-xs text-[10px] font-medium px-2 py-0.5 rounded-full self-start">
              {product.difficulty}
            </span>
          )}
        </div>

        {/* Wishlist Button Top Right */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={handleToggleWishlist}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isFavorited
              ? 'bg-white text-[#5D3FD3] shadow-md'
              : 'bg-white/85 hover:bg-white text-[#6B6471] hover:text-[#5D3FD3] shadow-xs'
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform active:scale-125 ${isFavorited ? 'fill-[#5D3FD3]' : ''}`} />
        </button>

        {/* Quick View hint on desktop hover */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-[#2D2A32] text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-[#E6E0D5]">
            <Eye className="w-3.5 h-3.5 text-[#5D3FD3]" />
            Quick View
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between text-left">
        <div>
          {/* Availability note */}
          <div className="flex items-center justify-between text-[11px] text-[#6B6471] mb-1">
            <span className="capitalize">{product.category.replace('-', ' ')}</span>
            {product.availability === 'in-stock' && (
              <span className="text-[#63723D] font-semibold">Ready to ship</span>
            )}
            {product.availability === 'made-to-order' && (
              <span className="text-[#5D3FD3] font-semibold">Made to order</span>
            )}
            {product.availability === 'digital-download' && (
              <span className="text-[#5D3FD3] font-semibold">Instant PDF</span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-display font-semibold text-base sm:text-lg text-[#2D2A32] line-clamp-1 group-hover:text-[#5D3FD3] transition-colors">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#6B6471] line-clamp-2 mt-1 leading-relaxed font-sans">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Add to Cart Footer */}
        <div className="mt-4 pt-3 border-t border-[#E6E0D5] flex items-center justify-between gap-2">
          
          {/* Price display */}
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-lg font-bold text-[#2D2A32]">
              {siteConfig.currencySymbol}{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#8A9A5B] line-through">
                {siteConfig.currencySymbol}{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Action button */}
          <button
            id={`add-to-cart-btn-${product.id}`}
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to basket`}
            className="p-2 sm:px-3 sm:py-1.5 bg-[#5D3FD3] hover:bg-[#4B32A8] active:scale-95 text-white rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#E9D5FF]" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>

    </motion.div>
  );
};
