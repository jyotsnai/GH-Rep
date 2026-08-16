import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles, BookOpen, Palette, Scissors } from 'lucide-react';
import { motion } from 'motion/react';

export const FeaturedCategories: React.FC = () => {
  const { navigateTo } = useShop();

  const categories = [
    {
      id: 'cat-handmade',
      title: 'Handmade Creations',
      subtitle: 'Unique crochet pieces made by hand.',
      buttonLabel: 'Shop Creations',
      icon: Scissors,
      bgGradient: 'from-[#FDFBF7] via-[#F6F1FA] to-[#FDFBF7]',
      accentColor: '#5D3FD3',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=700&q=80',
      action: () => navigateTo('handmade'),
    },
    {
      id: 'cat-patterns',
      title: 'Crochet Patterns',
      subtitle: 'Patterns to make your own little loops.',
      buttonLabel: 'Explore Patterns',
      icon: BookOpen,
      bgGradient: 'from-[#FDFBF7] via-[#F4F8EC] to-[#FDFBF7]',
      accentColor: '#8A9A5B',
      image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=700&q=80',
      action: () => navigateTo('patterns'),
    },
    {
      id: 'cat-custom',
      title: 'Custom Creations',
      subtitle: 'Have something special in mind?',
      buttonLabel: 'Request Custom',
      icon: Palette,
      bgGradient: 'from-[#FDFBF7] via-[#FBF5F8] to-[#FDFBF7]',
      accentColor: '#5D3FD3',
      image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=700&q=80',
      action: () => navigateTo('custom'),
    },
  ];

  return (
    <section id="featured-categories" className="py-14 sm:py-18 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#8A9A5B] block mb-2 font-sans">
            Handcrafted with Care
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#2D2A32] font-semibold tracking-tight">
            Explore the Studio
          </h2>
        </div>

        {/* 3 Large Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                id={`category-card-${cat.id}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -6 }}
                className={`group relative rounded-[28px] overflow-hidden border border-[#E6E0D5] bg-gradient-to-b ${cat.bgGradient} p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300`}
              >
                {/* Visual Thumbnail Frame */}
                <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-5 bg-white shadow-inner border border-[#E6E0D5]/60">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                  
                  {/* Floating icon badge */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs p-2 rounded-full shadow-sm text-[#5D3FD3]">
                    <Icon className="w-4 h-4 text-[#5D3FD3]" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-[#2D2A32] mb-1.5 group-hover:text-[#5D3FD3] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-[#6B6471] leading-relaxed font-sans mb-6">
                      {cat.subtitle}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={cat.action}
                    className="w-full py-3 px-4 rounded-full bg-white hover:bg-[#5D3FD3] text-[#5D3FD3] hover:text-white border-2 border-[#5D3FD3] font-semibold text-sm tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 group-hover:border-[#5D3FD3] cursor-pointer"
                  >
                    <span>{cat.buttonLabel}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
