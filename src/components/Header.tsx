import React, { useState, useEffect } from 'react';
import { useShop, PageView } from '../context/ShopContext';
import { siteConfig } from '../config/siteConfig';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const { 
    cartCount, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsSearchOpen, 
    currentView, 
    navigateTo 
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; view: PageView; icon?: string }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Shop', view: 'shop' },
    { label: 'Patterns', view: 'patterns' },
    { label: 'Handmade', view: 'handmade' },
    { label: 'Custom', view: 'custom' },
    { label: 'About', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (view: PageView) => {
    navigateTo(view);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FDFBF7]/95 backdrop-blur-md shadow-xs border-b border-[#E6E0D5] py-2.5'
          : 'bg-[#FDFBF7] border-b border-[#E6E0D5] py-3.5 md:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex flex-col text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5D3FD3] rounded-md px-1"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-serif italic text-2xl md:text-3xl font-semibold tracking-tight text-[#5D3FD3] group-hover:text-[#4B32A8] transition-colors leading-none">
                {siteConfig.brandName}
              </span>
              <Sparkles className="w-4 h-4 text-[#8A9A5B] group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="text-[10px] md:text-[11px] font-sans tracking-widest text-[#8A9A5B] uppercase font-semibold mt-1">
              {siteConfig.subtitle}
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" aria-label="Main Navigation" className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  id={`nav-link-${link.view}`}
                  onClick={() => handleNavClick(link.view)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all relative ${
                    isActive
                      ? 'text-[#5D3FD3] font-semibold bg-[#F3E8FF]'
                      : 'text-[#423D47] hover:text-[#5D3FD3] hover:bg-[#F3E8FF]/60'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#5D3FD3] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right-Side Utility Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Search Trigger */}
            <button
              id="header-search-btn"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search catalog"
              className="p-2 text-[#423D47] hover:text-[#5D3FD3] hover:bg-[#F3E8FF] rounded-full transition-colors relative"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              id="header-wishlist-btn"
              onClick={() => setIsWishlistOpen(true)}
              aria-label="View saved wishlist"
              className="p-2 text-[#423D47] hover:text-[#5D3FD3] hover:bg-[#F3E8FF] rounded-full transition-colors relative"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-[#5D3FD3] fill-[#E9D5FF]' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#8A9A5B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="View basket"
              className="flex items-center gap-2 pl-2.5 pr-3 py-1.5 bg-[#5D3FD3] hover:bg-[#4B32A8] text-white rounded-full transition-all shadow-sm group cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#E9D5FF] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold tracking-wide">
                Basket
              </span>
              <span className="bg-[#8A9A5B] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center border border-[#5D3FD3]/30">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="p-2 text-[#423D47] hover:text-[#5D3FD3] md:hidden rounded-lg hover:bg-[#F3E8FF] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[#E6E0D5] bg-[#FDFBF7] px-4 pt-3 pb-6 shadow-md"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = currentView === link.view;
                return (
                  <button
                    key={link.view}
                    onClick={() => handleNavClick(link.view)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#F3E8FF] text-[#5D3FD3] font-semibold'
                        : 'text-[#423D47] hover:bg-[#F3E8FF]/50'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#8A9A5B]" />
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-[#E6E0D5] flex items-center justify-between text-xs text-[#6B6471]">
              <span>Handmade with love in small batches</span>
              <button 
                onClick={() => { setMobileMenuOpen(false); setIsWishlistOpen(true); }}
                className="text-[#5D3FD3] font-semibold underline cursor-pointer"
              >
                Saved Items ({wishlist.length})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
