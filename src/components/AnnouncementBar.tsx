import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  if (!siteConfig.noticeBanner) return null;

  return (
    <div className="bg-[#2D2A32] text-[#FDFBF7] px-4 py-2 text-xs md:text-sm font-medium tracking-wide flex items-center justify-center gap-2 border-b border-[#423D47]/40">
      <Sparkles className="w-3.5 h-3.5 text-[#8A9A5B] shrink-0 animate-pulse" />
      <span className="text-center font-sans tracking-wide">{siteConfig.noticeBanner}</span>
    </div>
  );
};
