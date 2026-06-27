import React, { useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { LOOKBOOK_LOOKS } from '../../data';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Lookbook: React.FC = () => {
  const [selectedLookIndex, setSelectedLookIndex] = useState<number | null>(null);

  const viewNextLook = () => {
    if (selectedLookIndex !== null) {
      setSelectedLookIndex((selectedLookIndex + 1) % LOOKBOOK_LOOKS.length);
    }
  };

  const viewPrevLook = () => {
    if (selectedLookIndex !== null) {
      setSelectedLookIndex((selectedLookIndex - 1 + LOOKBOOK_LOOKS.length) % LOOKBOOK_LOOKS.length);
    }
  };

  return (
    <section id="lookbook" className="bg-neutral-950 text-white py-28 border-t border-neutral-900 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Lookbook Intro */}
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-16 md:mb-24">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#c9a96e] mb-4">
              EDITORIAL CAMPAIGN
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight">
              Autumn Winter LOOKBOOK
            </h2>
            <div className="h-0.5 w-12 bg-neutral-800 mt-6" />
          </div>
        </ScrollReveal>

        {/* Bento/Grid Lookbook Presentation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {LOOKBOOK_LOOKS.map((look, index) => (
            <ScrollReveal key={look.id} delay={index * 0.15}>
              <div
                onClick={() => setSelectedLookIndex(index)}
                className="group relative aspect-[3/4] bg-neutral-900 border border-neutral-900 overflow-hidden cursor-pointer shadow-lg hover:border-neutral-700/60 transition-all duration-500"
              >
                {/* Background image */}
                <img
                  src={look.image}
                  alt={look.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-106 transition-transform duration-[1s] ease-out"
                />
                
                {/* Dark overlay showing on hover */}
                <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/60 transition-colors duration-500 flex flex-col justify-end p-6" />

                {/* Absolute Top Indicator */}
                <span className="absolute top-4 left-4 z-20 font-mono text-[10px] uppercase tracking-widest text-neutral-400 opacity-60">
                  Look 0{index + 1}
                </span>

                {/* Absolute Center Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="h-10 w-10 bg-black/70 backdrop-blur-md border border-neutral-800 rounded-full flex items-center justify-center text-[#c9a96e]">
                    <ZoomIn className="h-4.5 w-4.5" />
                  </div>
                </div>

                {/* Metadata on bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 pointer-events-none transform translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h4 className="font-serif text-base text-white tracking-wide font-medium">
                    {look.title}
                  </h4>
                  <p className="text-[10px] uppercase tracking-widest text-[#c9a96e] mt-1.5 font-semibold">
                    Inspect Outfit Details
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Lookbook trigger notice */}
        <div className="mt-16 text-center">
          <p className="text-xs text-neutral-500 font-sans tracking-widest">
            * Click custom looking card to inspect close-up textiles and campaign notes.
          </p>
        </div>

      </div>

      {/* --- Campaign Fullscreen Lightbox Modal --- */}
      <AnimatePresence>
        {selectedLookIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-neutral-950/98 backdrop-blur-md flex flex-col items-center justify-center p-6 md:p-12 text-white"
          >
            {/* Direct Close Button */}
            <button
              onClick={() => setSelectedLookIndex(null)}
              className="absolute top-8 right-8 z-50 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 p-3 rounded-full text-white transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Lightbox Controls */}
            <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-12 pr-4 pl-4">
              
              {/* Image Frame */}
              <div className="relative w-full md:w-1/2 aspect-[3/4] bg-neutral-950 flex items-center justify-center">
                
                {/* Arrow navigation inside lightbox */}
                <button
                  onClick={viewPrevLook}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/60 border border-neutral-800 flex items-center justify-center text-[#c9a96e] hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
                  aria-label="Previous Look"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <img
                  src={LOOKBOOK_LOOKS[selectedLookIndex].image}
                  alt={LOOKBOOK_LOOKS[selectedLookIndex].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center rounded border border-neutral-900 shadow-2xl"
                />

                <button
                  onClick={viewNextLook}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/60 border border-neutral-800 flex items-center justify-center text-[#c9a96e] hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
                  aria-label="Next Look"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Text / Silhouette Details Frame */}
              <div className="w-full md:w-1/2 flex flex-col items-start space-y-6">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c9a96e]">
                  Lookbook Collection — Detail 0{selectedLookIndex + 1} of 04
                </span>
                
                <h3 className="font-serif text-3xl md:text-4xl text-white font-semibold tracking-tight">
                  {LOOKBOOK_LOOKS[selectedLookIndex].title}
                </h3>
                
                <div className="h-0.5 w-16 bg-neutral-800 mb-2" />

                <p className="text-sm text-neutral-400 font-sans leading-relaxed font-light">
                  {LOOKBOOK_LOOKS[selectedLookIndex].tagline}
                </p>

                <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                  Every silhouette represented in this look is crafted from select fabrics custom-molded to create natural, deep shadows and lines of movement. Perfect for standard, elegant daywear and private evening gatherings alike.
                </p>

                <div className="pt-6 border-t border-neutral-900 w-full flex items-center justify-between text-neutral-400 text-xs">
                  <span>Atelier: Paris (AW2026)</span>
                  <span className="text-[#c9a96e] font-semibold tracking-widest uppercase">
                    Timeless Wardrobe Pieces
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
