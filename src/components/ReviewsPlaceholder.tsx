import React from 'react';
import { sampleReviews } from '../data/products';
import { Star, MessageSquareQuote } from 'lucide-react';
import { motion } from 'motion/react';

export const ReviewsPlaceholder: React.FC = () => {
  return (
    <section id="reviews-section" className="py-14 sm:py-20 bg-[#FDFBF7] border-t border-[#E6E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#8A9A5B] block mb-2">
            Client Words & Love
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#2D2A32] font-semibold tracking-tight">
            Notes from the Community
          </h2>
          <p className="text-xs text-[#8A9A5B] mt-2 font-mono">
            [Clear placeholder review architecture ready for Jyotsna's genuine client feedback]
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleReviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#E6E0D5] shadow-xs flex flex-col justify-between relative hover:shadow-lg transition-all"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-[#8A9A5B] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#8A9A5B]" />
                  ))}
                </div>

                {/* Quote Icon */}
                <MessageSquareQuote className="w-6 h-6 text-[#B794F4] mb-2" />

                {/* Comment */}
                <p className="text-sm text-[#423D47] leading-relaxed italic font-sans mb-4">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-3 border-t border-[#E6E0D5] flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-[#2D2A32] block">{rev.author}</span>
                  <span className="text-[#8A9A5B]">{rev.location}</span>
                </div>
                <span className="text-[11px] text-[#6B6471] font-medium max-w-[130px] truncate text-right">
                  {rev.productName}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
