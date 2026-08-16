import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Smile, Lightbulb, CircleDot, Layers } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const BrandStory: React.FC = () => {
  const steps = [
    { label: 'Yarn', desc: 'Soft organic fibers', icon: Layers, color: '#5D3FD3' },
    { label: 'Loop', desc: 'Patient hand stitches', icon: CircleDot, color: '#8A9A5B' },
    { label: 'Idea', desc: 'Whimsical sketches', icon: Lightbulb, color: '#5D3FD3' },
    { label: 'Creation', desc: 'Bespoke piece finished', icon: Sparkles, color: '#8A9A5B' },
    { label: "Someone's Smile", desc: 'Warmth delivered', icon: Smile, color: '#5D3FD3' },
  ];

  return (
    <section id="brand-story-section" className="py-16 sm:py-24 bg-gradient-to-b from-[#FDFBF7] via-[#F8F4FD]/60 to-[#FDFBF7] border-t border-[#E6E0D5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F3E8FF] border border-[#E9D5FF] text-[#5D3FD3] text-[11px] font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3 h-3 text-[#5D3FD3] fill-[#E9D5FF]" />
            <span>The Craft Philosophy</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#2D2A32] font-semibold tracking-tight">
            Why Moonlit Loops?
          </h2>
          <p className="text-base text-[#6B6471] mt-2 italic font-serif">
            "{siteConfig.tagline}"
          </p>
        </div>

        {/* Visual Motif Chain */}
        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-[#E9D5FF] via-[#D1DBC0] to-[#E9D5FF] -translate-y-6 -z-0" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-4 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="flex flex-col items-center text-center p-5 rounded-[24px] bg-white border border-[#E6E0D5] shadow-xs hover:shadow-lg transition-all group"
                >
                  {/* Step number */}
                  <span className="text-[10px] font-mono font-bold text-[#8A9A5B] mb-2">
                    0{idx + 1}
                  </span>

                  {/* Icon bubble */}
                  <div 
                    className="w-13 h-13 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110 shadow-xs"
                    style={{ backgroundColor: `${step.color}18`, color: step.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Label */}
                  <h3 className="font-display font-semibold text-lg text-[#2D2A32] mb-0.5">
                    {step.label}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#6B6471]">
                    {step.desc}
                  </p>

                  {/* Mobile Arrow for Flow */}
                  {idx < steps.length - 1 && (
                    <span className="lg:hidden text-[#8A9A5B] font-bold text-xs mt-2">
                      ↓
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Studio Note */}
        <div className="mt-14 max-w-2xl mx-auto text-center bg-white rounded-[24px] p-6 sm:p-8 border border-[#E6E0D5] shadow-xs">
          <p className="text-sm sm:text-base text-[#423D47] leading-relaxed font-sans">
            Every creation that leaves our studio is crocheted stitch-by-stitch by Jyotsna. We source hypoallergenic, sustainably harvested cottons and gentle merino blends that feel soft against the skin and last for years of gentle memories.
          </p>
        </div>

      </div>
    </section>
  );
};
