import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { INSTAGRAM_FEED_IMAGES } from '../../data';
import { Instagram } from 'lucide-react';

export const SocialFeed: React.FC = () => {
  return (
    <section className="bg-neutral-950 text-white py-28 border-b border-neutral-900 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Social Title */}
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-16">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#c9a96e] mb-3">
              INSTAGRAM JOURNAL
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white tracking-widest font-semibold hover:text-[#c9a96e] transition-colors cursor-pointer">
              @MAISONNOIR
            </h2>
            <div className="h-0.5 w-12 bg-neutral-800 mt-5" />
          </div>
        </ScrollReveal>

        {/* 6-Column Square Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_FEED_IMAGES.map((img, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.08} yOffset={20}>
              <a
                href="https://instagram.com/maisonnoir"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square bg-neutral-900 border border-neutral-900 overflow-hidden"
              >
                {/* Custom photograph */}
                <img
                  src={img}
                  alt={`Maison Noir creative visual ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Dark brand overlay containing Instagram logo */}
                <div className="absolute inset-0 bg-neutral-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <div className="text-center flex flex-col items-center space-y-1.5">
                    <Instagram className="h-5 w-5 text-[#c9a96e]" />
                    <span className="text-[9px] uppercase tracking-widest text-neutral-300">
                      View Story
                    </span>
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
