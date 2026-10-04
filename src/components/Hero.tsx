import React from 'react';
import { useShop } from '../context/ShopContext';

export const Hero: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section
      id="hero-section"
      className="relative overflow-hidden bg-[#06172F] text-white"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 lg:min-h-[calc(100vh-76px)] lg:grid-cols-12">

          {/* LEFT — frozen brand identity, message and CTAs */}
          <div className="flex flex-col items-center justify-center px-6 py-8 text-center sm:px-10 lg:col-span-6 lg:px-12 xl:px-16">

            <img
              src="/brand/moonlit-logo-frozen.png"
              alt="Moonlit Loops by Jyotsna — Handcrafted Magic Under the Stars"
              className="mb-5 w-[min(72%,430px)] max-h-[135px] object-contain object-center"
              loading="eager"
            />

            <h1 className="font-display text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.04] tracking-tight text-white">
              Beautiful, Handmade,
              <br />
              Heartfelt.
              <span className="text-[#F3A7E8]"> Uniquely Yours.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
              Handmade crochet creations by Jyotsna — made to order,
              one little loop at a time.
            </p>

            <div className="mt-3 flex flex-wrap justify-center gap-3">
              <button
                id="hero-shop-handmade-btn"
                onClick={() => navigateTo('handmade')}
                className="rounded-full bg-[#F50087] px-6 py-3 text-sm font-bold tracking-wide text-white shadow-lg transition hover:scale-[1.02] hover:bg-[#ff1498] sm:px-8"
              >
                SHOP CROCHET&nbsp; →
              </button>

              <button
                id="hero-custom-order-btn"
                onClick={() => navigateTo('custom')}
                className="rounded-full border-2 border-white/90 bg-transparent px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-white/10 sm:px-8"
              >
                CUSTOM ORDER&nbsp; →
              </button>
            </div>
          </div>

          {/* RIGHT — frozen Jyotsna photograph; NEVER crop */}
          <div className="relative mt-2 min-h-[300px] bg-[#06172F] sm:min-h-[380px] lg:mt-0 lg:min-h-0 lg:col-span-6 lg:flex lg:items-center lg:justify-center">
            <img
              src="/brand/hero-jyotsna-frozen.png"
              alt="Jyotsna creating handmade crochet surrounded by her crochet creations"
              className="h-full w-full object-contain object-center"
              loading="eager"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
