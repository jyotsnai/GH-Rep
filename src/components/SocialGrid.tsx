import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export const SocialGrid: React.FC = () => {
  const instagramTiles = [
    {
      id: 'ig-1',
      title: 'Studio morning stitches & tea',
      image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'ig-2',
      title: 'Pastel daisy square blocking',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'ig-3',
      title: 'Little Moon Bunny ears in progress',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'ig-4',
      title: 'Yarn palette swatching for custom order',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'ig-5',
      title: 'Scalloped cardigan border finishing',
      image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'ig-6',
      title: 'Everlasting floral botanical bouquet',
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section id="social-grid-section" className="py-14 sm:py-20 bg-[#FDFBF7] border-t border-[#E6E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#8A9A5B] mb-1">
              <Instagram className="w-3.5 h-3.5 text-[#8A9A5B]" />
              <span>Behind the stitches</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#2D2A32] font-semibold tracking-tight">
              Follow the loops ✨
            </h2>
          </div>

          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F3E8FF] hover:bg-[#E9D5FF] text-[#5D3FD3] font-semibold text-xs sm:text-sm transition-colors border border-[#E9D5FF] self-start sm:self-auto cursor-pointer"
          >
            <Instagram className="w-4 h-4 text-[#5D3FD3]" />
            <span>{siteConfig.instagramHandle}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#8A9A5B]" />
          </a>
        </div>

        {/* 6-Grid Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramTiles.map((tile, idx) => (
            <motion.a
              key={tile.id}
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-white border border-[#E6E0D5] shadow-xs block"
            >
              <img
                src={tile.image}
                alt={tile.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                loading="lazy"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[#2D2A32]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center text-white">
                <Instagram className="w-5 h-5 mb-1 text-[#E9D5FF]" />
                <span className="text-[11px] font-medium line-clamp-2 leading-tight">
                  {tile.title}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};
