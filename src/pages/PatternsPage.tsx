import React, { useState } from 'react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { siteConfig } from '../config/siteConfig';
import { SkillLevel } from '../types';
import { BookOpen, FileText, CheckCircle2, Sparkles, Download, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const PatternsPage: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const patternProducts = products.filter((p) => p.type === 'pattern');

  const filteredPatterns = patternProducts.filter((p) => {
    if (selectedDifficulty !== 'all' && p.difficulty !== selectedDifficulty) {
      return false;
    }
    return true;
  });

  const difficulties: { id: string; label: string }[] = [
    { id: 'all', label: 'All Skill Levels' },
    { id: 'Beginner', label: 'Beginner' },
    { id: 'Easy', label: 'Easy' },
    { id: 'Intermediate', label: 'Intermediate' },
    { id: 'Advanced', label: 'Advanced' },
  ];

  return (
    <div id="patterns-page" className="py-8 sm:py-14 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F3E8FF] border border-[#E9D5FF] text-[#5D3FD3] text-[11px] font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Digital Download Guides</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl text-[#2D2A32] font-semibold tracking-tight">
            Crochet Patterns
          </h1>
          <p className="text-base sm:text-lg text-[#6B6471] mt-2 font-serif italic">
            Make your own little piece of Moonlit Loops.
          </p>
        </div>

        {/* Informative Digital Pattern Banner */}
        <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#E6E0D5] shadow-xs mb-10 text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-2">
              <span className="inline-block bg-[#5D3FD3] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                DIGITAL PATTERN ARCHIVE
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#2D2A32]">
                Clear step-by-step PDF instructions designed with love.
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6471] leading-relaxed font-sans">
                Digital crochet patterns designed to help you create your own handmade pieces. Every pattern includes stitch-by-stitch photo tutorials, gauge guidance, sizing options, and US crochet terminology.
              </p>
            </div>

            <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#E6E0D5] space-y-2 text-xs text-[#423D47]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8A9A5B] shrink-0" />
                <span>Instant PDF download link</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8A9A5B] shrink-0" />
                <span>High-res photo walkthroughs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8A9A5B] shrink-0" />
                <span>Print-friendly layout & charts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Difficulty Filter Chips */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            <span className="text-xs font-bold text-[#8A9A5B] uppercase tracking-wider">
              Filter by level:
            </span>
            {difficulties.map((diff) => (
              <button
                key={diff.id}
                onClick={() => setSelectedDifficulty(diff.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedDifficulty === diff.id
                    ? 'bg-[#5D3FD3] text-white shadow-xs'
                    : 'bg-white text-[#423D47] border border-[#E6E0D5] hover:bg-[#F3E8FF] hover:text-[#5D3FD3]'
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#8A9A5B] font-medium">
            {filteredPatterns.length} {filteredPatterns.length === 1 ? 'pattern' : 'patterns'} available
          </span>
        </div>

        {/* Patterns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPatterns.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* FAQ for digital patterns */}
        <div className="mt-16 bg-white rounded-[28px] p-6 sm:p-8 border border-[#E6E0D5] shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#5D3FD3]">
            <HelpCircle className="w-5 h-5" />
            <h3 className="font-display font-semibold text-lg text-[#2D2A32]">
              Pattern Delivery & Support
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#6B6471] leading-relaxed">
            <div className="p-3.5 bg-[#FDFBF7] rounded-xl border border-[#E6E0D5]">
              <span className="font-semibold text-[#2D2A32] block mb-1">How do I receive my PDF?</span>
              <p>Once you complete your order, a download link will be provided instantly or sent via email/WhatsApp directly so you can start crocheting right away.</p>
            </div>
            <div className="p-3.5 bg-[#FDFBF7] rounded-xl border border-[#E6E0D5]">
              <span className="font-semibold text-[#2D2A32] block mb-1">Stuck on a stitch?</span>
              <p>Jyotsna provides stitch support! You can message us anytime on Instagram or WhatsApp if you need clarification on any step.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
