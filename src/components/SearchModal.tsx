import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import { siteConfig } from '../config/siteConfig';
import { Search, X, Sparkles, ArrowRight, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    searchQuery, 
    setSearchQuery, 
    navigateTo,
    recordRecentlyViewed 
  } = useShop();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase();
    const matchName = p.name.toLowerCase().includes(q);
    const matchDesc = p.description.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q);
    const matchCat = p.category.toLowerCase().includes(q);
    const matchTags = p.tags?.some((t) => t.toLowerCase().includes(q));
    const matchType = p.type.toLowerCase().includes(q);
    return matchName || matchDesc || matchCat || matchTags || matchType;
  });

  const handleSelectProduct = (slug: string, id: string) => {
    recordRecentlyViewed(id);
    setIsSearchOpen(false);
    setSearchQuery('');
    navigateTo('product-detail', slug);
  };

  const handleViewAll = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigateTo('shop');
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex items-start justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-[28px] shadow-2xl border border-[#E6E0D5] overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="p-4 sm:p-5 border-b border-[#E6E0D5] bg-white flex items-center gap-3">
              <Search className="w-5 h-5 text-[#5D3FD3] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search handmade creations, bucket hats, PDF patterns, amigurumi..."
                className="w-full text-base sm:text-lg bg-transparent text-[#2D2A32] placeholder-[#98909D] focus:outline-none font-sans"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-[#6B6471] hover:text-[#2D2A32] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : null}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-xs font-semibold px-2.5 py-1 text-[#6B6471] hover:text-[#2D2A32] hover:bg-[#F3E8FF] rounded-md transition-colors cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Suggestions / Results */}
            <div className="p-5 max-h-[60vh] overflow-y-auto">
              {!searchQuery.trim() ? (
                <div className="space-y-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A9A5B] block">
                    Popular Searches
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['Bucket Hat', 'Digital PDF Pattern', 'Daisy', 'Amigurumi Bunny', 'Blanket', 'Coasters', 'Tote Bag'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-3.5 py-1.5 rounded-full bg-white border border-[#E6E0D5] text-xs text-[#423D47] hover:bg-[#F3E8FF] hover:border-[#5D3FD3] hover:text-[#5D3FD3] transition-colors cursor-pointer font-medium"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : filteredProducts.length === 0 ? (
                /* Empty state */
                <div className="text-center py-10 px-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#F3E8FF] mx-auto flex items-center justify-center text-[#5D3FD3]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#2D2A32]">
                    Hmm... we couldn't find that loop.
                  </h3>
                  <p className="text-xs text-[#6B6471] max-w-xs mx-auto">
                    Try searching for different keywords or browse our complete collection.
                  </p>
                  <button
                    onClick={handleViewAll}
                    className="mt-2 px-5 py-2 rounded-full bg-[#5D3FD3] text-white text-xs font-semibold hover:bg-[#4B32A8] transition-colors cursor-pointer"
                  >
                    View Everything
                  </button>
                </div>
              ) : (
                /* Search Results */
                <div className="space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A9A5B] block mb-2">
                    Found {filteredProducts.length} {filteredProducts.length === 1 ? 'match' : 'matches'}
                  </span>
                  {filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod.slug, prod.id)}
                      className="p-3 bg-white rounded-2xl border border-[#E6E0D5] hover:border-[#5D3FD3] hover:shadow-xs flex items-center justify-between gap-3 cursor-pointer group transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={prod.thumbnail || prod.images[0]}
                          alt={prod.name}
                          className="w-12 h-12 rounded-xl object-cover bg-[#FDFBF7] shrink-0 border border-[#E6E0D5]/50"
                        />
                        <div className="min-w-0">
                          <h4 className="font-display font-semibold text-sm text-[#2D2A32] group-hover:text-[#5D3FD3] transition-colors truncate">
                            {prod.name}
                          </h4>
                          <div className="flex items-center gap-2 text-[11px] text-[#6B6471]">
                            <span className="capitalize">{prod.category.replace('-', ' ')}</span>
                            <span>•</span>
                            <span className="font-semibold text-[#2D2A32]">
                              {siteConfig.currencySymbol}{prod.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {prod.type === 'pattern' && (
                          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] bg-[#F3E8FF] text-[#5D3FD3] px-2 py-0.5 rounded font-semibold">
                            <FileText className="w-3 h-3" /> PDF
                          </span>
                        )}
                        <ArrowRight className="w-4 h-4 text-[#8A9A5B] group-hover:text-[#5D3FD3] group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
