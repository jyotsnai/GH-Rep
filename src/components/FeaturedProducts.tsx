import React from 'react';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const { navigateTo } = useShop();

  // Pick curated featured products
  const featuredList = products.filter(p => p.featured || p.bestseller).slice(0, 8);

  return (
    <section id="featured-products-section" className="py-14 sm:py-20 bg-[#FDFBF7] border-t border-[#E6E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div className="text-left">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#8A9A5B] mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8A9A5B]" />
              <span>Studio Favourites</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#2D2A32] font-semibold tracking-tight">
              Little things worth keeping
            </h2>
            <p className="text-sm sm:text-base text-[#6B6471] mt-1 italic font-serif">
              Some of our favourite handmade creations.
            </p>
          </div>

          <button
            id="view-all-creations-btn"
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#5D3FD3] hover:text-[#4B32A8] transition-colors self-start md:self-auto cursor-pointer"
          >
            <span>View all creations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Responsive Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredList.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
