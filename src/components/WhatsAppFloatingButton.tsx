import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const cleanPhone = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');
  const greeting = encodeURIComponent(
    `Hi ${siteConfig.creatorName}! I'm visiting the ${siteConfig.brandName} website and wanted to ask about your crochet creations ✨`
  );

  return (
    <a
      id="whatsapp-floating-btn"
      href={`https://wa.me/${cleanPhone}?text=${greeting}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Jyotsna on WhatsApp"
      className="fixed bottom-6 right-6 z-30 p-3.5 bg-[#25D366] hover:bg-[#1EBE5A] text-zinc-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center group"
    >
      <MessageCircle className="w-6 h-6 fill-zinc-900" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
        Chat with Jyotsna
      </span>
    </a>
  );
};
