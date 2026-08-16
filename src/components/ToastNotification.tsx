import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastNotification: React.FC = () => {
  const { toastMessage, setIsCartOpen } = useShop();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-sm sm:max-w-md w-[92%] sm:w-auto"
        >
          <div className="bg-[#2D2A32] text-[#FDFBF7] px-4.5 py-3 rounded-full shadow-xl border border-[#423D47] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-[#5D3FD3] flex items-center justify-center text-white shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs sm:text-sm font-medium truncate font-sans">
                {toastMessage}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="px-3.5 py-1 bg-[#8A9A5B] hover:bg-[#78884B] text-white text-xs font-semibold rounded-full shrink-0 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ShoppingBag className="w-3 h-3" />
              <span>View</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
