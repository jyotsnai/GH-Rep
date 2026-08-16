import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartItem, Product } from '../types';
import { products } from '../data/products';

export type PageView = 
  | 'home' 
  | 'shop' 
  | 'patterns' 
  | 'handmade' 
  | 'custom' 
  | 'about' 
  | 'contact' 
  | 'product-detail'
  | 'cart-page';

interface ShopContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string, customNote?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Recently Viewed
  recentlyViewed: Product[];
  recordRecentlyViewed: (productId: string) => void;

  // Drawers & Modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Navigation / Pages
  currentView: PageView;
  selectedProductSlug: string | null;
  navigateTo: (view: PageView, productSlug?: string) => void;

  // Toast Notifications
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'moonlit_loops_cart_v1';
const WISHLIST_STORAGE_KEY = 'moonlit_loops_wishlist_v1';
const RECENT_STORAGE_KEY = 'moonlit_loops_recent_v1';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart State with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State with localStorage persistence
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Recently Viewed IDs with localStorage persistence
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(RECENT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Routing State
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(null);

  // Save Cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Unable to persist cart in localStorage', e);
    }
  }, [cart]);

  // Save Wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Unable to persist wishlist in localStorage', e);
    }
  }, [wishlist]);

  // Save Recently Viewed
  useEffect(() => {
    try {
      localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(recentlyViewedIds));
    } catch (e) {
      console.warn('Unable to persist recent items', e);
    }
  }, [recentlyViewedIds]);

  // Handle URL hash / path parsing on initial load
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) {
        setCurrentView('home');
        setSelectedProductSlug(null);
        return;
      }

      if (hash.startsWith('product/')) {
        const slug = hash.replace('product/', '');
        setCurrentView('product-detail');
        setSelectedProductSlug(slug);
      } else if (['shop', 'patterns', 'handmade', 'custom', 'about', 'contact', 'cart-page'].includes(hash)) {
        setCurrentView(hash as PageView);
        setSelectedProductSlug(null);
      } else {
        setCurrentView('home');
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateTo = useCallback((view: PageView, productSlug?: string) => {
    setCurrentView(view);
    if (view === 'product-detail' && productSlug) {
      setSelectedProductSlug(productSlug);
      window.location.hash = `product/${productSlug}`;
    } else if (view === 'home') {
      setSelectedProductSlug(null);
      window.location.hash = '';
    } else {
      setSelectedProductSlug(null);
      window.location.hash = view;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = useCallback((
    product: Product, 
    quantity: number = 1, 
    selectedColor?: string, 
    customNote?: string
  ) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.product.id === product.id && item.selectedColor === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity, selectedColor, customNote }];
      }
    });

    showToast(`Added "${product.name}" to your Moonlit Loops ✨`);
  }, [showToast]);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        return prev.filter(id => id !== productId);
      } else {
        const product = products.find(p => p.id === productId);
        if (product) {
          showToast(`Saved "${product.name}" to your wishlist ♥`);
        }
        return [...prev, productId];
      }
    });
  }, [showToast]);

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.includes(productId);
  }, [wishlist]);

  const recordRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewedIds(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 6);
    });
  }, []);

  // Compute subtotal and count
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Resolved recently viewed objects
  const recentlyViewed = recentlyViewedIds
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        recentlyViewed,
        recordRecentlyViewed,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        currentView,
        selectedProductSlug,
        navigateTo,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
