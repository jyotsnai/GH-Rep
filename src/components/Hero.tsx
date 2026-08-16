import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles, Heart, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section 
      id="hero-section" 
      className="relative overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-[#F8F3FC] to-[#FDFBF7] pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#E6E0D5]"
    >
      {/* Decorative ambient moonlight glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 right-1/4 w-96 h-96 bg-[#E9D5FF]/40 rounded-full blur-3xl pointer-events-none -z-10" 
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-10 left-10 w-72 h-72 bg-[#8A9A5B]/15 rounded-full blur-2xl pointer-events-none -z-10" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start space-y-6 text-left"
          >
            {/* Subtle Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3E8FF] border border-[#E9D5FF] text-[#5D3FD3] text-xs md:text-sm font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#8A9A5B]" />
              <span>✦ Handmade with love ✦ Designed by Jyotsna</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] text-[#2D2A32] leading-[1.1] tracking-tight font-semibold">
              Made with loops.<br />
              <span className="italic font-normal text-[#5D3FD3]">Made with love.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#6B6471] max-w-xl leading-relaxed font-sans font-normal">
              Handmade crochet creations and patterns designed by Jyotsna — one little loop at a time.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                id="hero-shop-handmade-btn"
                onClick={() => navigateTo('handmade')}
                className="px-6 sm:px-7 py-3.5 rounded-full bg-[#5D3FD3] hover:bg-[#4B32A8] text-white font-semibold text-sm sm:text-base tracking-wide transition-all shadow-md shadow-[#5D3FD3]/25 hover:shadow-lg flex items-center gap-2.5 group cursor-pointer"
              >
                <span>Shop Handmade</span>
                <ArrowRight className="w-4 h-4 text-[#E9D5FF] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-explore-patterns-btn"
                onClick={() => navigateTo('patterns')}
                className="px-6 sm:px-7 py-3.5 rounded-full bg-[#FDFBF7] hover:bg-[#F3E8FF] text-[#5D3FD3] border-2 border-[#5D3FD3] font-semibold text-sm sm:text-base tracking-wide transition-all flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#8A9A5B]" />
                <span>Explore Patterns</span>
              </button>
            </div>

            {/* Subtle Brand Perks */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E6E0D5] w-full max-w-lg text-xs text-[#6B6471]">
              <div className="flex flex-col">
                <span className="font-semibold text-[#2D2A32]">100% Handcrafted</span>
                <span>Small batch creations</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[#2D2A32]">Instant Patterns</span>
                <span>PDF with diagrams</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[#2D2A32]">Custom Orders</span>
                <span>Tailored to your ideas</span>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Composition Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            {/* Layered Decorative Card Frame */}
            <div className="relative mx-auto max-w-md lg:max-w-none group">
              
              {/* Geometric Balance Underlay Layer */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#E9D5FF] via-[#E6E0D5] to-[#D9E2C8] rounded-[36px] rotate-3 opacity-80 transition-transform group-hover:rotate-1 duration-500 blur-[0.5px]" />

              {/* Main Visual Image Container */}
              <div className="relative rounded-[28px] overflow-hidden bg-white shadow-xl border border-[#E6E0D5]">
                <img
                  src="https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1000&q=80"
                  alt="Moonlit Loops Handmade Crochet Floral Bucket Hat by Jyotsna"
                  className="w-full h-80 sm:h-96 object-cover object-center transform hover:scale-102 transition-transform duration-700"
                  loading="eager"
                />
                
                {/* Visual Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2A32]/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Bottom Card Over Image */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#E6E0D5] shadow-md flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A9A5B] block">Featured Exhibit</span>
                    <h2 className="font-display font-medium text-[#2D2A32] text-sm sm:text-base leading-tight">Lavender Dusk Daisy Bucket Hat</h2>
                  </div>
                  <button
                    onClick={() => navigateTo('product-detail', 'lavender-dusk-daisy-bucket-hat')}
                    className="px-3.5 py-1.5 bg-[#5D3FD3] text-white text-xs font-semibold rounded-full hover:bg-[#4B32A8] transition-colors cursor-pointer shadow-xs"
                  >
                    View
                  </button>
                </div>
              </div>

              {/* Floating Craft Badge Top-Right */}
              <div className="absolute -top-4 -right-3 sm:-right-4 bg-white border border-[#E6E0D5] text-[#2D2A32] py-1.5 px-3.5 rounded-full shadow-md text-xs font-semibold flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#5D3FD3] fill-[#E9D5FF]" />
                <span>Crochet creations & patterns</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
