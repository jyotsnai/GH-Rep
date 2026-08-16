import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { CustomOrderFormData } from '../types';
import { 
  generateWhatsAppCustomOrderUrl, 
  generateMailtoCustomOrderUrl 
} from '../services/checkoutService';
import { 
  Palette, 
  Sparkles, 
  MessageCircle, 
  Mail, 
  CheckCircle2, 
  Clock, 
  Heart,
  HelpCircle 
} from 'lucide-react';
import { motion } from 'motion/react';

export const CustomOrderPage: React.FC = () => {
  const [formData, setFormData] = useState<CustomOrderFormData>({
    name: '',
    email: '',
    whatsapp: '',
    itemType: 'Custom Blanket or Throw',
    preferredColors: 'Pastel Lilac, Cream & Soft Sage',
    approximateSize: 'Medium / Standard',
    budgetRange: '$50 - $150',
    deadline: '',
    message: '',
  });

  const [submittedOption, setSubmittedOption] = useState<'whatsapp' | 'email' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedOption('whatsapp');
    const url = generateWhatsAppCustomOrderUrl(formData);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSendEmail = () => {
    setSubmittedOption('email');
    const url = generateMailtoCustomOrderUrl(formData);
    window.location.href = url;
  };

  return (
    <div id="custom-order-page" className="py-8 sm:py-14 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F3E8FF] border border-[#E9D5FF] text-[#5D3FD3] text-[11px] font-bold uppercase tracking-wider mb-2">
            <Palette className="w-3.5 h-3.5" />
            <span>Bespoke Creations</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl text-[#2D2A32] font-semibold tracking-tight leading-tight">
            Dream it.<br />
            <span className="italic font-normal text-[#5D3FD3]">We'll crochet it.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#6B6471] mt-3 font-serif italic max-w-xl mx-auto">
            Have an idea for something special? Tell us what you're imagining and let's see what we can create.
          </p>
        </div>

        {/* 2-Column Layout: Left Custom Process Guide, Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: How it Works */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#E6E0D5] shadow-xs space-y-6">
              <h2 className="font-display text-2xl font-semibold text-[#2D2A32]">
                How Custom Orders Work
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#F3E8FF] text-[#5D3FD3] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <h3 className="font-semibold text-sm text-[#2D2A32]">Share Your Vision</h3>
                    <p className="text-xs text-[#6B6471] leading-relaxed">
                      Fill in your dream colors, dimensions, or inspiration photos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#F3E8FF] text-[#5D3FD3] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <h3 className="font-semibold text-sm text-[#2D2A32]">Yarn & Swatch Consultation</h3>
                    <p className="text-xs text-[#6B6471] leading-relaxed">
                      Jyotsna will confirm fiber choices, swatches, price quote, and crafting timeline.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#F3E8FF] text-[#5D3FD3] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <h3 className="font-semibold text-sm text-[#2D2A32]">Crafting with Progress Snaps</h3>
                    <p className="text-xs text-[#6B6471] leading-relaxed">
                      Your piece is lovingly crocheted loop-by-loop with occasional photo updates.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#F3E8FF] text-[#5D3FD3] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <h3 className="font-semibold text-sm text-[#2D2A32]">Delivered with Love</h3>
                    <p className="text-xs text-[#6B6471] leading-relaxed">
                      Packaged with bespoke care instructions and dispatched safely.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timing info */}
              <div className="pt-4 border-t border-[#E6E0D5] flex items-center gap-2.5 text-xs text-[#8A9A5B] font-medium">
                <Clock className="w-4 h-4 text-[#8A9A5B] shrink-0" />
                <span>Typical lead time: 1-3 weeks depending on size & complexity</span>
              </div>
            </div>

            {/* Popular Custom Requests Ideas */}
            <div className="bg-white rounded-[28px] p-6 border border-[#E6E0D5] space-y-3 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A9A5B] block">
                Popular Custom Ideas
              </span>
              <ul className="text-xs text-[#423D47] space-y-2">
                <li>• Personalized floral bouquets for birthdays & anniversaries</li>
                <li>• Bespoke nursery blanket in baby room colorways</li>
                <li>• Custom-sized daisy cardigans or bucket hats</li>
                <li>• Memory plush toys / heirloom amigurumi gifts</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <form
              id="custom-order-form"
              onSubmit={handleSendWhatsApp}
              className="bg-white rounded-[28px] p-6 sm:p-10 border border-[#E6E0D5] shadow-xs space-y-5 text-left"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E6E0D5]">
                <h3 className="font-display font-semibold text-xl text-[#2D2A32]">
                  Your Custom Request Details
                </h3>
                <span className="text-xs text-[#8A9A5B] font-semibold">No payment needed today</span>
              </div>

              {/* Name & WhatsApp/Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#423D47] block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Maya Sharma"
                    className="w-full text-sm p-3 rounded-xl border border-[#E6E0D5] bg-[#FDFBF7] text-[#2D2A32] focus:outline-none focus:ring-2 focus:ring-[#5D3FD3]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#423D47] block mb-1">
                    WhatsApp or Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="e.g. +1 555-123-4567"
                    className="w-full text-sm p-3 rounded-xl border border-[#E6E0D5] bg-[#FDFBF7] text-[#2D2A32] focus:outline-none focus:ring-2 focus:ring-[#5D3FD3]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-semibold text-[#423D47] block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. maya@example.com"
                  className="w-full text-sm p-3 rounded-xl border border-[#E6E0D5] bg-[#FDFBF7] text-[#2D2A32] focus:outline-none focus:ring-2 focus:ring-[#5D3FD3]"
                />
              </div>

              {/* Item Type & Approximate Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#423D47] block mb-1">
                    What would you like? *
                  </label>
                  <select
                    name="itemType"
                    value={formData.itemType}
                    onChange={handleChange}
                    className="w-full text-sm p-3 rounded-xl border border-[#E6E0D5] bg-[#FDFBF7] text-[#2D2A32] focus:outline-none focus:ring-2 focus:ring-[#5D3FD3] cursor-pointer"
                  >
                    <option value="Custom Blanket or Throw">Custom Blanket / Throw</option>
                    <option value="Personalized Floral Bouquet">Personalized Floral Bouquet</option>
                    <option value="Wearable (Cardigan / Hat / Top)">Wearable (Cardigan / Hat / Top)</option>
                    <option value="Custom Amigurumi / Plush">Custom Amigurumi / Plush Companion</option>
                    <option value="Shoulder Bag / Tote">Shoulder Bag / Tote</option>
                    <option value="Other Creative Request">Other Unique Idea</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#423D47] block mb-1">
                    Approximate Size
                  </label>
                  <input
                    type="text"
                    name="approximateSize"
                    value={formData.approximateSize}
                    onChange={handleChange}
                    placeholder="e.g. Standard Throw, Baby (80x100cm), Adult M"
                    className="w-full text-sm p-3 rounded-xl border border-[#E6E0D5] bg-[#FDFBF7] text-[#2D2A32] focus:outline-none focus:ring-2 focus:ring-[#5D3FD3]"
                  />
                </div>
              </div>

              {/* Preferred Colors & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#423D47] block mb-1">
                    Preferred Colors / Palette
                  </label>
                  <input
                    type="text"
                    name="preferredColors"
                    value={formData.preferredColors}
                    onChange={handleChange}
                    placeholder="e.g. Lavender, Dusty Rose, Ivory, Sage"
                    className="w-full text-sm p-3 rounded-xl border border-[#E6E0D5] bg-[#FDFBF7] text-[#2D2A32] focus:outline-none focus:ring-2 focus:ring-[#5D3FD3]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#423D47] block mb-1">
                    Budget Range
                  </label>
                  <select
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    className="w-full text-sm p-3 rounded-xl border border-[#E6E0D5] bg-[#FDFBF7] text-[#2D2A32] focus:outline-none focus:ring-2 focus:ring-[#5D3FD3] cursor-pointer"
                  >
                    <option value="Under $40">Under $40</option>
                    <option value="$40 - $80">$40 - $80</option>
                    <option value="$80 - $150">$80 - $150</option>
                    <option value="$150 - $250">$150 - $250</option>
                    <option value="$250+">$250+ (Large Heirloom)</option>
                    <option value="Flexible">Flexible / Open to Quote</option>
                  </select>
                </div>
              </div>

              {/* Optional Deadline */}
              <div>
                <label className="text-xs font-semibold text-[#423D47] block mb-1">
                  Needed by specific date? (Optional for birthdays/events)
                </label>
                <input
                  type="text"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  placeholder="e.g. By end of next month / No rush"
                  className="w-full text-sm p-3 rounded-xl border border-[#E6E0D5] bg-[#FDFBF7] text-[#2D2A32] focus:outline-none focus:ring-2 focus:ring-[#5D3FD3]"
                />
              </div>

              {/* Message & Vision */}
              <div>
                <label className="text-xs font-semibold text-[#423D47] block mb-1">
                  Tell us more about what you're imagining *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your idea, recipient, vibe, or any specific yarn preferences..."
                  className="w-full text-sm p-3 rounded-xl border border-[#E6E0D5] bg-[#FDFBF7] text-[#2D2A32] focus:outline-none focus:ring-2 focus:ring-[#5D3FD3]"
                />
              </div>

              {/* Submission Buttons */}
              <div className="pt-3 space-y-3">
                <button
                  type="submit"
                  id="send-custom-request-whatsapp-btn"
                  className="w-full py-4 px-6 rounded-full bg-[#8A9A5B] hover:bg-[#78884B] text-white font-bold text-base tracking-wide transition-all shadow-xs flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Send Custom Request via WhatsApp</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-[#6B6471]">
                  <span>or</span>
                  <button
                    type="button"
                    onClick={handleSendEmail}
                    className="text-[#5D3FD3] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send via Email instead</span>
                  </button>
                </div>
              </div>

              {submittedOption && (
                <div className="p-3 bg-[#F3E8FF] rounded-xl border border-[#E9D5FF] text-[#5D3FD3] text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Your request details have been formatted and opened! Jyotsna will respond promptly.</span>
                </div>
              )}

            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
