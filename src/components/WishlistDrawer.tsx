import React from 'react';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import { siteConfig } from '../config/siteConfig';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const WishlistDrawer: React.FC = () => {
  const { 
    isWishlistOpen, 
    setIsWishlistOpen, 
    wishlist, 
    toggleWishlist, 
    addToCart,
    navigateTo,
    recordRecentlyViewed 
  } = useShop();

  const savedProducts = wishlist
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is typeof products[0] => Boolean(p));

  const handleMoveToCart = (product: typeof products[0]) => {
    addToCart(product, 1);
  };

  const handleViewProduct = (slug: string, id: string) => {
    recordRecentlyViewed(id);
    setIsWishlistOpen(false);
    navigateTo('product-detail', slug);
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col justify-between border-l border-[#EDE4D6]"
            >
              {/* Header */}
              <div className="p-5 border-b border-[#E6E0D5] flex items-center justify-between bg-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#F3E8FF] flex items-center justify-center text-[#5D3FD3]">
                    <Heart className="w-4 h-4 fill-[#5D3FD3]" />
                  </div>
                  <div>
                    <h2 className="font-display font-semibold text-lg text-[#2D2A32] leading-tight">
                      Saved Loops ♥
                    </h2>
                    <span className="text-xs text-[#8A9A5B] font-medium">
                      {savedProducts.length} {savedProducts.length === 1 ? 'item' : 'items'} in your wishlist
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsWishlistOpen(false)}
                  aria-label="Close wishlist"
                  className="p-2 text-[#6B6471] hover:text-[#2D2A32] hover:bg-[#F3E8FF] rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {savedProducts.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-[#F3E8FF] flex items-center justify-center text-[#5D3FD3] mb-1">
                      <Heart className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#2D2A32]">
                      Your wishlist is empty
                    </h3>
                    <p className="text-sm text-[#6B6471] max-w-xs font-sans">
                      Tap the heart icon on any handmade piece or pattern to save it here for later.
                    </p>
                  </div>
                ) : (
                  savedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white p-3.5 rounded-2xl border border-[#E6E0D5] shadow-xs flex gap-3.5 items-center justify-between"
                    >
                      <img
                        src={product.thumbnail || product.images[0]}
                        alt={product.name}
                        onClick={() => handleViewProduct(product.slug, product.id)}
                        className="w-16 h-16 rounded-xl object-cover bg-[#FDFBF7] cursor-pointer shrink-0 border border-[#E6E0D5]/50"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 
                          onClick={() => handleViewProduct(product.slug, product.id)}
                          className="font-display font-semibold text-sm text-[#2D2A32] truncate hover:text-[#5D3FD3] cursor-pointer"
                        >
                          {product.name}
                        </h4>
                        <span className="font-display text-xs font-bold text-[#2D2A32] block mt-0.5">
                          {siteConfig.currencySymbol}{product.price.toFixed(2)}
                        </span>

                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => handleMoveToCart(product)}
                            className="px-3 py-1 bg-[#5D3FD3] hover:bg-[#4B32A8] text-white text-xs font-semibold rounded-full flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Add to Basket</span>
                          </button>

                          <button
                            onClick={() => toggleWishlist(product.id)}
                            aria-label="Remove from wishlist"
                            className="p-1 text-[#6B6471] hover:text-[#C53030] transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-[#E6E0D5] bg-white">
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="w-full py-2 text-xs text-[#6B6471] hover:text-[#5D3FD3] font-semibold text-center transition-colors cursor-pointer"
                >
                  Close Wishlist
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
