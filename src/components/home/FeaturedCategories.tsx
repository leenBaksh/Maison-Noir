import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { useCartStore } from '../../store/cartStore';

export const FeaturedCategories: React.FC = () => {
  const { navigateTo } = useCartStore();

  return (
    <section className="bg-neutral-950 text-white py-28 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Heading */}
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-16 md:mb-24">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#c9a96e] mb-4">
              VISUAL CAPTIVITY
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight text-white">
              Curated For You
            </h2>
            <div className="h-0.5 w-12 bg-neutral-800 mt-6" />
          </div>
        </ScrollReveal>

        {/* Asymmetric 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left Tall Card: The Avant-Garde (Covers 7 columns out of 12) */}
          <div className="lg:col-span-7 h-[450px] md:h-[620px]">
            <ScrollReveal delay={0.1}>
              <div
                onClick={() => navigateTo('/collections/avant-garde')}
                className="group relative w-full h-full bg-neutral-900 border border-neutral-900 hover:border-neutral-800 transition-all duration-500 overflow-hidden cursor-pointer"
              >
                {/* Background image zoom on hover */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1200&auto=format&fit=crop"
                    alt="The Avant-Garde Collection"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-[center_35%] transform scale-102 group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-neutral-950/40 to-neutral-950/10 opacity-70 group-hover:opacity-85 transition-opacity duration-500" />
                </div>

                {/* Left Card content positioning */}
                <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-end items-start">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 mb-2">
                    Collection Vol. 02
                  </p>
                  <h3 className="font-serif text-2xl md:text-4xl text-white font-medium mb-3">
                    THE AVANT-GARDE
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-300 font-sans max-w-md font-light mb-6 opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                    Disrupting core geometric shapes with modular drapes, raw collars, and asymmetric tailored overlays.
                  </p>
                  
                  <div className="flex items-center space-x-2 text-[#c9a96e] group-hover:text-white transition-colors duration-300">
                    <span className="text-[11px] uppercase tracking-[0.25em] font-medium font-sans">
                      Discover Collection
                    </span>
                    <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right column stacking area (Covers 5 columns out of 12) */}
          <div className="lg:col-span-5 flex flex-col space-y-8 lg:space-y-10">
            
            {/* Top Right Card: Les Accessoires (Footwear & Bags) */}
            <div className="h-[210px] md:h-[295px]">
              <ScrollReveal delay={0.25}>
                <div
                  onClick={() => navigateTo('/collections/les-accessoires')}
                  className="group relative w-full h-full bg-neutral-900 border border-neutral-900 hover:border-neutral-800 transition-all duration-500 overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 z-0">
                    <img
                      src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop"
                      alt="Les Accessoires"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transform scale-102 group-hover:scale-108 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-neutral-950/50 to-neutral-500/10 opacity-70 group-hover:opacity-85 transition-opacity duration-500" />
                  </div>

                  <div className="absolute inset-0 z-10 p-6 md:p-8 flex flex-col justify-end items-start">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 mb-1">
                      Box-Calf & Gold
                    </p>
                    <h3 className="font-serif text-xl md:text-2xl text-white font-medium mb-3">
                      LES ACCESSOIRES
                    </h3>
                    
                    <div className="flex items-center space-x-2 text-[#c9a96e] group-hover:text-white transition-colors duration-300">
                      <span className="text-[10px] uppercase tracking-[0.25em] font-medium font-sans">
                        Discover Accessories
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Bottom Right Card: L'Essence de L'Ombre Parfum */}
            <div className="h-[210px] md:h-[295px]">
              <ScrollReveal delay={0.4}>
                <div
                  onClick={() => navigateTo('/collections/l-essence')}
                  className="group relative w-full h-full bg-neutral-900 border border-neutral-900 hover:border-neutral-800 transition-all duration-500 overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 z-0">
                    <img
                      src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop"
                      alt="L'Essence Fragrances"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transform scale-102 group-hover:scale-108 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-neutral-950/50 to-neutral-500/10 opacity-70 group-hover:opacity-85 transition-opacity duration-500" />
                  </div>

                  <div className="absolute inset-0 z-10 p-6 md:p-8 flex flex-col justify-end items-start">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 mb-1">
                      Midnight Botanical
                    </p>
                    <h3 className="font-serif text-xl md:text-2xl text-white font-medium mb-3">
                      L'ESSENCE PARFUMS
                    </h3>
                    
                    <div className="flex items-center space-x-2 text-[#c9a96e] group-hover:text-white transition-colors duration-300">
                      <span className="text-[10px] uppercase tracking-[0.25em] font-medium font-sans">
                        Discover Scents
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
