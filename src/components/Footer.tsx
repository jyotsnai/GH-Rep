import React from 'react';
import { useShop, PageView } from '../context/ShopContext';
import { siteConfig } from '../config/siteConfig';
import { Sparkles, Heart, Instagram, Mail, MessageCircle, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useShop();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { label: string; view: PageView }[] = [
    { label: 'Shop All', view: 'shop' },
    { label: 'Crochet Patterns', view: 'patterns' },
    { label: 'Handmade Creations', view: 'handmade' },
    { label: 'Custom Orders', view: 'custom' },
    { label: 'About Jyotsna', view: 'about' },
    { label: 'Contact & FAQ', view: 'contact' },
  ];

  const cleanPhone = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <footer id="main-footer" className="bg-[#2D2A32] text-[#E6E0D5] pt-14 pb-10 border-t border-[#423D47]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif italic text-2xl font-semibold tracking-tight text-white">
                {siteConfig.brandName}
              </span>
              <Sparkles className="w-4 h-4 text-[#8A9A5B]" />
            </div>
            <p className="text-[11px] uppercase tracking-widest text-[#8A9A5B] font-bold font-sans">
              {siteConfig.subtitle}
            </p>
            <p className="text-sm text-[#D1C9BE] max-w-sm leading-relaxed font-sans">
              "{siteConfig.tagline}"
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#423D47] hover:bg-[#5D3FD3] text-white flex items-center justify-center transition-colors border border-[#524B57]"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-[#423D47] hover:bg-[#5D3FD3] text-white flex items-center justify-center transition-colors border border-[#524B57]"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Email"
                className="w-9 h-9 rounded-full bg-[#423D47] hover:bg-[#5D3FD3] text-white flex items-center justify-center transition-colors border border-[#524B57]"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-base font-semibold text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.view}>
                  <button
                    onClick={() => navigateTo(link.view)}
                    className="text-[#D1C9BE] hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Info */}
          <div>
            <h4 className="font-display text-base font-semibold text-white mb-4">
              Studio & Care
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D1C9BE]">
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Meet Jyotsna
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Care Instructions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pattern Download FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('custom')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Custom Request Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Direct WhatsApp Box */}
          <div className="bg-[#3B3540] p-4.5 rounded-[24px] border border-[#524B57] space-y-2.5">
            <span className="text-xs uppercase tracking-wider text-[#8A9A5B] font-bold block">
              Quick Contact
            </span>
            <p className="text-xs text-[#D1C9BE] leading-relaxed">
              Have a question about a stitch, sizing, or custom palette? Message Jyotsna directly.
            </p>
            <a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-full bg-[#8A9A5B] hover:bg-[#78884B] text-white font-semibold text-xs transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#423D47] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D1C9BE]">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <Heart className="w-3.5 h-3.5 text-[#5D3FD3]" />
            <span className="font-serif italic text-sm text-[#FDFBF7]">
              Made with yarn, imagination & lots of loops. ✨
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.</span>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2 rounded-full bg-[#423D47] hover:bg-[#5D3FD3] text-white transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
