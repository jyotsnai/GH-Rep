import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { 
  MessageCircle, 
  Instagram, 
  Mail, 
  Sparkles, 
  Send, 
  HelpCircle, 
  ChevronDown,
  Clock,
  Heart
} from 'lucide-react';
import { motion } from 'motion/react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const cleanPhone = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hi ${siteConfig.creatorName}! My name is ${name} (${email}).\n\n${message}`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const faqs = [
    {
      q: 'How do I care for my handmade crochet pieces?',
      a: 'We recommend gentle hand washing in cool or lukewarm water with a mild wool-friendly liquid detergent. Gently squeeze out excess water with a towel (do not wring or twist), and lay the item flat to dry in the shade to preserve the shape and fiber elasticity.',
    },
    {
      q: 'How are digital crochet patterns delivered?',
      a: 'Digital patterns are delivered immediately in PDF format. You can download and save the file to your computer, tablet, or mobile device to view or print at your convenience.',
    },
    {
      q: 'How long do custom orders take to make?',
      a: 'Depending on the size and complexity of your custom piece (e.g. bouquet vs. heirloom blanket), crafting typically takes between 1 to 3 weeks. Jyotsna will provide an estimated delivery date and share progress photos along the way.',
    },
    {
      q: 'Do you offer gift packaging?',
      a: 'Yes! All Moonlit Loops handmade creations arrive packaged in tissue paper, soft twine/ribbon, and include a personalized handwritten care card. You can also specify a gift note during checkout.',
    },
    {
      q: 'Can I request a custom colorway for an existing pattern?',
      a: 'Absolutely! If you love a bucket hat, cardigan, or coaster set in our shop but want different yarn shades to match your wardrobe or home decor, send a message through our Custom Request page or directly on WhatsApp.',
    },
  ];

  return (
    <div id="contact-page" className="py-8 sm:py-16 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F3E8FF] border border-[#E9D5FF] text-[#5D3FD3] text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Say Hello</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-[#2D2A32] font-semibold tracking-tight">
            Contact & Studio FAQ
          </h1>
          <p className="text-base sm:text-lg text-[#6B6471] mt-2 font-serif italic">
            Have a question about a stitch, pattern, or custom piece? We'd love to hear from you.
          </p>
        </div>

        {/* 3 Channels Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* WhatsApp */}
          <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-[#E6E0D5] shadow-xs flex flex-col justify-between text-left">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] text-[#8A9A5B] flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 fill-[#8A9A5B]" />
              </div>
              <h3 className="font-display font-semibold text-lg text-[#2D2A32] mb-1">
                WhatsApp Direct
              </h3>
              <p className="text-xs text-[#6B6471] leading-relaxed mb-4">
                The fastest way to chat with Jyotsna about instant orders, custom swatches, and stitch queries.
              </p>
            </div>
            <a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-full bg-[#8A9A5B] hover:bg-[#78884B] text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat {siteConfig.whatsappDisplay}</span>
            </a>
          </div>

          {/* Instagram */}
          <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-[#E6E0D5] shadow-xs flex flex-col justify-between text-left">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] text-[#5D3FD3] flex items-center justify-center mb-4">
                <Instagram className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-[#2D2A32] mb-1">
                Instagram Stitches
              </h3>
              <p className="text-xs text-[#6B6471] leading-relaxed mb-4">
                Follow behind-the-scenes progress, yarn drops, upcoming pattern releases, and DM us anytime.
              </p>
            </div>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-full bg-[#5D3FD3] hover:bg-[#4B32A8] text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <Instagram className="w-4 h-4" />
              <span>{siteConfig.instagramHandle}</span>
            </a>
          </div>

          {/* Email */}
          <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-[#E6E0D5] shadow-xs flex flex-col justify-between text-left">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FDFBF7] text-[#423D47] border border-[#E6E0D5] flex items-center justify-center mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-[#2D2A32] mb-1">
                Studio Email
              </h3>
              <p className="text-xs text-[#6B6471] leading-relaxed mb-4">
                For detailed project inquiries, pattern distribution, collaborations, or wholesale exhibits.
              </p>
            </div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="py-2.5 px-4 rounded-full bg-[#FDFBF7] hover:bg-[#F3E8FF] text-[#2D2A32] text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 border border-[#E6E0D5]"
            >
              <Mail className="w-4 h-4" />
              <span>{siteConfig.email}</span>
            </a>
          </div>
        </div>

        {/* 2-Column: Quick Message Form & FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start text-left">
          
          {/* Quick Message Form */}
          <div className="lg:col-span-5 bg-white rounded-[28px] p-6 sm:p-8 border border-[#E6E0D5] shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#5D3FD3] mb-1">
              <Heart className="w-4 h-4 fill-[#5D3FD3]" />
              <span className="text-xs font-bold uppercase tracking-wider">Direct Studio Message</span>
            </div>
            <h2 className="font-display font-semibold text-2xl text-[#2D2A32]">
              Send a Quick Note
            </h2>
            <p className="text-xs text-[#6B6471] leading-relaxed">
              Fill in your details and this form will connect you directly to Jyotsna.
            </p>

            <form onSubmit={handleSendMessage} className="space-y-3.5 pt-2">
              <div>
                <label className="text-xs font-semibold text-[#423D47] block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Clara"
                  className="w-full text-xs p-3 rounded-xl border border-[#E6E0D5] bg-[#FDFBF7] text-[#2D2A32] focus:outline-none focus:ring-2 focus:ring-[#5D3FD3]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#423D47] block mb-1">Your Email or WhatsApp</label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. clara@example.com"
                  className="w-full text-xs p-3 rounded-xl border border-[#E6E0D5] bg-[#FDFBF7] text-[#2D2A32] focus:outline-none focus:ring-2 focus:ring-[#5D3FD3]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#423D47] block mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you today?..."
                  className="w-full text-xs p-3 rounded-xl border border-[#E6E0D5] bg-[#FDFBF7] text-[#2D2A32] focus:outline-none focus:ring-2 focus:ring-[#5D3FD3]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-full bg-[#5D3FD3] hover:bg-[#4B32A8] text-white text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-white" />
                <span>Send to Studio</span>
              </button>
            </form>
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-[#8A9A5B] mb-1">
              <HelpCircle className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Frequently Asked Questions</span>
            </div>
            <h2 className="font-display font-semibold text-2xl text-[#2D2A32]">
              Everything You Need to Know
            </h2>

            <div className="space-y-3 pt-2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-[#E6E0D5] shadow-xs overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-display font-medium text-sm sm:text-base text-[#2D2A32] hover:text-[#5D3FD3] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#8A9A5B] transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-[#6B6471] leading-relaxed border-t border-[#E6E0D5] pt-3 font-sans bg-[#FDFBF7]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
