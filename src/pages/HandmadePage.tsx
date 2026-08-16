import React, { useState } from 'react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { siteConfig } from '../config/siteConfig';
import { Scissors, Sparkles, Heart, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'motion/react';

export const HandmadePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handmadeProducts = products.filter((p) => p.type === 'handmade');

  const filteredItems = handmadeProducts.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const categories = [
    { id: 'all', label: 'All Handmade' },
    { id: 'wearables', label: 'Hats & Wearables' },
    { id: 'home-decor', label: 'Home Decor & Coasters' },
    { id: 'amigurumi', label: 'Amigurumi & Plush' },
    { id: 'bags', label: 'Bags & Totes' },
    { id: 'blankets', label: 'Blankets & Throws' },
    { id: 'accessories', label: 'Hair Accessories' },
  ];

  return (
    <div id="handmade-page" className="py-8 sm:py-14 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F3E8FF] border border-[#E9D5FF] text-[#5D3FD3] text-[11px] font-bold uppercase tracking-wider mb-2">
            <Scissors className="w-3.5 h-3.5" />
            <span>Finished Studio Exhibits</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl text-[#2D2A32] font-semibold tracking-tight">
            Handmade Creations
          </h1>
          <p className="text-base sm:text-lg text-[#6B6471] mt-2 font-serif italic">
            Unique crochet pieces made by hand — one little loop at a time.
          </p>
        </div>

        {/* Quality Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-[#E6E0D5] shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#F3E8FF] flex items-center justify-center text-[#5D3FD3] shrink-0">
              <Heart className="w-5 h-5 fill-[#5D3FD3]" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-sm text-[#2D2A32]">100% Handcrafted</h3>
              <p className="text-xs text-[#6B6471]">Every stitch made personally by Jyotsna</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E6E0D5] shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#F3E8FF] flex items-center justify-center text-[#5D3FD3] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-sm text-[#2D2A32]">Gentle Natural Fibers</h3>
              <p className="text-xs text-[#6B6471]">Organic milk cotton, bamboo & merino</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E6E0D5] shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#F3E8FF] flex items-center justify-center text-[#8A9A5B] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-sm text-[#2D2A32]">Carefully Packaged</h3>
              <p className="text-xs text-[#6B6471]">Includes care card & giftable wrapping</p>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#5D3FD3] text-white shadow-xs'
                  : 'bg-white text-[#423D47] border border-[#E6E0D5] hover:bg-[#F3E8FF] hover:text-[#5D3FD3]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
};
