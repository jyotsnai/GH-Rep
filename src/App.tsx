import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { ToastNotification } from './components/ToastNotification';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { PatternsPage } from './pages/PatternsPage';
import { HandmadePage } from './pages/HandmadePage';
import { CustomOrderPage } from './pages/CustomOrderPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

const MainContent: React.FC = () => {
  const { currentView } = useShop();

  const renderCurrentPage = () => {
    switch (currentView) {
      case 'shop':
        return <ShopPage />;
      case 'patterns':
        return <PatternsPage />;
      case 'handmade':
        return <HandmadePage />;
      case 'custom':
        return <CustomOrderPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#423D47] selection:bg-[#E9D5FF] selection:text-[#5D3FD3]">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Sticky Header with Navigation, Wishlist & Cart */}
      <Header />

      {/* Main Page View Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Warm Handmade Footer */}
      <Footer />

      {/* Slide-over Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />

      {/* Non-intrusive Feedback Toast */}
      <ToastNotification />

      {/* Direct Floating WhatsApp Contact Button */}
      <WhatsAppFloatingButton />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
