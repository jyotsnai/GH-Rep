import React from 'react';
import { Hero } from '../components/Hero';
import { FeaturedCategories } from '../components/FeaturedCategories';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { BrandStory } from '../components/BrandStory';
import { SocialGrid } from '../components/SocialGrid';
import { ReviewsPlaceholder } from '../components/ReviewsPlaceholder';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight, Palette } from 'lucide-react';
import { motion } from 'motion/react';

export const HomePage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div id="home-page" className="min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Featured Categories (3 Large Visual Cards) */}
      <FeaturedCategories />

      {/* 3. Featured Products ("Little things worth keeping") */}
      <FeaturedProducts />

      {/* 4. Brand Story ("Why Moonlit Loops?" Yarn -> Loop -> Idea -> Creation -> Smile) */}
      <BrandStory />

      {/* 5. Custom Orders Callout Banner */}
      <section className="py-14 sm:py-18 bg-[#F6EEF8] border-y border-[#E8DFC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#DFCDEE] shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-left space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE9F5] text-[#674B80] text-xs font-semibold uppercase tracking-wider">
                <Palette className="w-3.5 h-3.5" />
                <span>Bespoke Creations</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#2B1D38] tracking-tight">
                Dream it. We'll crochet it.
              </h2>
              <p className="text-sm sm:text-base text-[#594964] leading-relaxed">
                Have an idea for a custom cardigan, nursery blanket, or favorite flower bouquet? Tell Jyotsna what you're imagining and let's see what we can create together.
              </p>
            </div>

            <button
              id="home-custom-order-btn"
              onClick={() => navigateTo('custom')}
              className="px-7 py-3.5 rounded-full bg-[#2B1D38] hover:bg-[#4E3566] text-[#FAF7F2] font-semibold text-sm sm:text-base tracking-wide transition-all shadow-sm flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Request Custom Order</span>
              <ArrowRight className="w-4 h-4 text-[#D8B4E2]" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Instagram / Social Section ("Follow the loops ✨") */}
      <SocialGrid />

      {/* 7. Reviews Placeholder Section */}
      <ReviewsPlaceholder />
    </div>
  );
};
