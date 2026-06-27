import React, { useEffect } from 'react';
import { COLLECTIONS } from '../../data';
import { useCartStore } from '../../store/cartStore';
import { Button } from '../ui/Button';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Breadcrumbs } from '../layout/Breadcrumbs';

export const Collections: React.FC = () => {
  const { navigateTo } = useCartStore();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="bg-neutral-950 text-white min-h-screen pt-32 pb-24 font-sans select-none">
      <Breadcrumbs />
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12">
        
        {/* Header Title */}
        <ScrollReveal>
          <div className="text-center md:text-left mb-20">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#c9a96e] block mb-4">
              THE HOUSE SILHOUETTES
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
              Collections Archive
            </h1>
            <p className="text-sm font-light text-neutral-400 mt-4 max-w-xl leading-relaxed">
              Explore the design chapters of Maison Noir. Each collection is a dedicated, archival exploration of fabric weight, custom hardware, and moody silhouettes.
            </p>
            <div className="h-[1px] w-full bg-neutral-900 mt-12" />
          </div>
        </ScrollReveal>

        {/* Collections alternating list */}
        <div className="space-y-32">
          {COLLECTIONS.map((col, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={col.slug}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
              >
                
                {/* Image Grid Slot (Reordered based on alternating row indexing) */}
                <div className={`col-span-1 lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <ScrollReveal yOffset={40}>
                    <div
                      onClick={() => navigateTo(`/collections/${col.slug}`)}
                      className="group relative aspect-[16/10] bg-neutral-900 border border-neutral-900 overflow-hidden cursor-pointer shadow-2xl"
                    >
                      <img
                        src={col.image}
                        alt={col.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                      <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/40 transition-colors duration-500" />
                    </div>
                  </ScrollReveal>
                </div>

                {/* Text Content Slot */}
                <div className={`col-span-1 lg:col-span-5 flex flex-col items-start ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <ScrollReveal delay={0.15}>
                    <span className="text-[10px] font-mono tracking-widest text-[#c9a96e] block mb-2">
                      {col.label}
                    </span>
                    
                    <h2 className="font-serif text-2xl md:text-3xl text-white font-semibold tracking-tight hover:text-[#c9a96e] transition-colors cursor-pointer"
                        onClick={() => navigateTo(`/collections/${col.slug}`)}>
                      {col.name}
                    </h2>
                    
                    <p className="font-serif italic text-neutral-400 text-sm mt-3 font-light">
                      "{col.tagline}"
                    </p>
                    
                    <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-light mt-5 mb-8">
                      {col.description}
                    </p>

                    <Button
                      variant="outline"
                      onClick={() => navigateTo(`/collections/${col.slug}`)}
                    >
                      Enter Collection
                    </Button>
                  </ScrollReveal>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
