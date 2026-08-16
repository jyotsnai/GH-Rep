import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { useShop } from '../context/ShopContext';
import { Heart, Sparkles, Scissors, Coffee, Feather, ArrowRight, Instagram } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div id="about-page" className="py-8 sm:py-16 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 sm:mb-24">
          
          {/* Left: Jyotsna's Studio Portrait / Placeholder */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Soft decorative shadow shape */}
              <div className="absolute -inset-3 bg-[#F3E8FF] rounded-[32px] -rotate-2 opacity-80" />
              
              <div className="relative rounded-[28px] overflow-hidden bg-white shadow-xl border border-[#E6E0D5]">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
                  alt="Jyotsna - Creator of Moonlit Loops"
                  className="w-full h-96 sm:h-[460px] object-cover object-center"
                />
                
                {/* Floating caption badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#E6E0D5] shadow-xs flex items-center justify-between">
                  <div>
                    <span className="font-display font-semibold text-sm text-[#2D2A32] block">
                      Jyotsna
                    </span>
                    <span className="text-[11px] text-[#6B6471]">
                      Designer & Maker • Moonlit Loops
                    </span>
                  </div>
                  <span className="text-xs bg-[#F3E8FF] text-[#5D3FD3] px-3 py-1 rounded-full font-semibold">
                    Handmade
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Personal Bio */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F3E8FF] border border-[#E9D5FF] text-[#5D3FD3] text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Behind the Hook</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl text-[#2D2A32] font-semibold tracking-tight leading-tight">
              Meet Jyotsna
            </h1>

            <div className="space-y-4 text-base sm:text-lg text-[#423D47] leading-relaxed font-sans">
              <p className="font-serif italic text-xl sm:text-2xl text-[#5D3FD3]">
                "Hi! I'm Jyotsna, the creator behind Moonlit Loops."
              </p>
              <p>
                I love turning simple yarn and a crochet hook into little things that make people smile. Moonlit Loops is my little creative space where I can experiment, learn, design and share the things I love making.
              </p>
              <p className="text-sm sm:text-base text-[#6B6471]">
                What started with a single skein of lilac yarn during late evening hours quickly blossomed into a deep passion for tactile fiber art. Each piece in the shop is looped individually by hand with gentle tension and genuine joy.
              </p>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-4">
              <div className="p-4 bg-white rounded-2xl border border-[#E6E0D5] shadow-xs">
                <Scissors className="w-5 h-5 text-[#5D3FD3] mb-1.5" />
                <span className="text-xs font-semibold text-[#2D2A32] block">Small-Batch</span>
                <span className="text-[11px] text-[#6B6471]">Care over quantity</span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#E6E0D5] shadow-xs">
                <Coffee className="w-5 h-5 text-[#8A9A5B] mb-1.5" />
                <span className="text-xs font-semibold text-[#2D2A32] block">Late Stitches</span>
                <span className="text-[11px] text-[#6B6471]">Made under moonlight</span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#E6E0D5] shadow-xs col-span-2 sm:col-span-1">
                <Feather className="w-5 h-5 text-[#5D3FD3] mb-1.5" />
                <span className="text-xs font-semibold text-[#2D2A32] block">Pure Fibers</span>
                <span className="text-[11px] text-[#6B6471]">Soft & hypoallergenic</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigateTo('handmade')}
                className="px-6 py-3 rounded-full bg-[#5D3FD3] hover:bg-[#4B32A8] text-white text-sm font-semibold tracking-wide transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Creations</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-white hover:bg-[#F3E8FF] text-[#2D2A32] border border-[#E6E0D5] text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Instagram className="w-4 h-4 text-[#5D3FD3]" />
                <span>Follow My Stitches</span>
              </a>
            </div>

          </div>

        </div>

        {/* Studio Philosophy & Sustainable Materials */}
        <div className="bg-white rounded-[28px] p-8 sm:p-12 border border-[#E6E0D5] shadow-xs">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8A9A5B] block font-sans">
              Our Materials Promise
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#2D2A32]">
              Yarn that feels gentle on your skin and kind to the earth.
            </h2>
            <p className="text-sm sm:text-base text-[#6B6471] leading-relaxed font-sans">
              We carefully select natural combed cottons, breathable bamboo blends, and ethically sourced wools. We avoid scratchy synthetics wherever possible so that every headband, blanket, and amigurumi feels cozy from the very first touch.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
