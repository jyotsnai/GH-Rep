import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { siteConfig } from '../config/siteConfig';
import { generateWhatsAppCartOrderUrl } from '../services/checkoutService';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Sparkles, 
  ArrowRight,
  MessageCircle,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    cartSubtotal, 
    cartCount, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    navigateTo 
  } = useShop();

  const [orderNotes, setOrderNotes] = useState('');

  const handleWhatsAppCheckout = () => {
    const url = generateWhatsAppCartOrderUrl(cart, cartSubtotal, orderNotes);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleExplore = () => {
    setIsCartOpen(false);
    navigateTo('shop');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
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
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-display font-semibold text-lg text-[#2D2A32] leading-tight">
                      Your Moonlit Basket ✨
                    </h2>
                    <span className="text-xs text-[#8A9A5B] font-medium">
                      {cartCount} {cartCount === 1 ? 'item' : 'items'} saved
                    </span>
                  </div>
                </div>

                <button
                  id="close-cart-btn"
                  onClick={() => setIsCartOpen(false)}
                  aria-label="Close basket"
                  className="p-2 text-[#6B6471] hover:text-[#2D2A32] hover:bg-[#F3E8FF] rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  /* Empty State */
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#F3E8FF] flex items-center justify-center text-[#5D3FD3] mb-1">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#2D2A32]">
                      Your basket is waiting for a little magic.
                    </h3>
                    <p className="text-sm text-[#6B6471] max-w-xs font-sans">
                      Explore our finished handmade creations or choose a digital pattern to start looping today.
                    </p>
                    <button
                      onClick={handleExplore}
                      className="mt-2 px-6 py-2.5 rounded-full bg-[#5D3FD3] hover:bg-[#4B32A8] text-white text-sm font-semibold transition-colors shadow-xs cursor-pointer"
                    >
                      Explore Creations
                    </button>
                  </div>
                ) : (
                  /* Cart Items List */
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#8A9A5B]">
                        Selected Loops
                      </span>
                      <button
                        onClick={clearCart}
                        className="text-xs text-[#C53030] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Clear All</span>
                      </button>
                    </div>

                    {cart.map((item) => (
                      <div
                        key={`${item.product.id}-${item.selectedColor || 'default'}`}
                        className="bg-white p-3.5 rounded-2xl border border-[#E6E0D5] shadow-xs flex gap-3.5 items-center"
                      >
                        <img
                          src={item.product.thumbnail || item.product.images[0]}
                          alt={item.product.name}
                          className="w-18 h-18 rounded-xl object-cover bg-[#FDFBF7] shrink-0 border border-[#E6E0D5]/50"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-display font-semibold text-sm text-[#2D2A32] truncate">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              aria-label="Remove item"
                              className="text-[#6B6471] hover:text-[#C53030] p-1 transition-colors cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {item.product.type === 'pattern' ? (
                            <span className="inline-flex items-center gap-1 text-[10px] text-[#5D3FD3] bg-[#F3E8FF] px-2 py-0.5 rounded-md font-semibold">
                              <FileText className="w-2.5 h-2.5" /> Digital PDF
                            </span>
                          ) : (
                            <span className="text-[10px] text-[#8A9A5B] font-medium block">
                              Handcrafted by Jyotsna
                            </span>
                          )}

                          <div className="mt-2 flex items-center justify-between">
                            {/* Quantity buttons */}
                            <div className="flex items-center gap-1.5 bg-[#FDFBF7] border border-[#E6E0D5] rounded-lg p-0.5">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-5 h-5 flex items-center justify-center text-[#423D47] hover:text-[#2D2A32] hover:bg-white rounded transition-colors cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-semibold w-4 text-center text-[#2D2A32]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-5 h-5 flex items-center justify-center text-[#423D47] hover:text-[#2D2A32] hover:bg-white rounded transition-colors cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Line Total */}
                            <span className="font-display font-bold text-sm text-[#2D2A32]">
                              {siteConfig.currencySymbol}{(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Order Notes Field */}
                    <div className="pt-2">
                      <label className="text-xs font-medium text-[#423D47] block mb-1">
                        Add a note for Jyotsna (gift note, custom shade, or deadline):
                      </label>
                      <textarea
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="e.g. Please add a gift card saying Happy Birthday Sarah!"
                        rows={2}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#E6E0D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#5D3FD3]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Checkout Actions */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-[#E6E0D5] bg-white space-y-3">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6B6471] font-medium">Estimated Subtotal</span>
                    <span className="font-display text-xl font-bold text-[#2D2A32]">
                      {siteConfig.currencySymbol}{cartSubtotal.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#8A9A5B] leading-tight">
                    Shipping calculated directly with Jyotsna upon confirmation. Patterns delivered instantly.
                  </p>

                  {/* Primary WhatsApp Order Button */}
                  <button
                    id="whatsapp-cart-checkout-btn"
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-3.5 px-4 rounded-full bg-[#8A9A5B] hover:bg-[#78884B] text-white font-bold text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Order via WhatsApp</span>
                  </button>

                  {/* Secondary Continue Shopping */}
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2 text-xs text-[#6B6471] hover:text-[#5D3FD3] font-semibold text-center transition-colors cursor-pointer"
                  >
                    Continue Browsing
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
