import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Button } from '../ui/Button';
import { useCartStore } from '../../store/cartStore';

export const BrandStory: React.FC = () => {
  const { navigateTo } = useCartStore();

  return (
    <section className="bg-neutral-950 text-white py-28 px-6 md:px-12 border-t border-neutral-900 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Large Editorial Image with Custom Matte Framing */}
          <ScrollReveal yOffset={45}>
            <div className="relative group w-full aspect-[3/4] bg-neutral-900 border border-neutral-900/40 overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1000&auto=format&fit=crop"
                alt="Model casting campaign silhouette"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-[center_20%] transform scale-102 group-hover:scale-108 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/35 transition-colors duration-500" />
              
              {/* Corner Accent Overlays defining architectural design precision */}
              <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-[#c9a96e]/40 p-0" />
              <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-[#c9a96e]/40 p-0" />
            </div>
          </ScrollReveal>

          {/* Right Side: Philisophical Editorial Copy */}
          <ScrollReveal delay={0.2} yOffset={30}>
            <div className="flex flex-col items-start space-y-6">
              
              {/* Philosophy Label */}
              <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#c9a96e]">
                OUR PHILOSOPHY
              </p>

              {/* Dynamic Title */}
              <h2 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
                Crafted in Shadow, <br />
                Worn in Light
              </h2>

              <div className="h-0.5 w-12 bg-[#c9a96e] mt-2 mb-3" />

              {/* Body */}
              <p className="text-sm text-neutral-400 font-sans font-light leading-relaxed max-w-lg">
                At Maison Noir, we believe that garments should serve as architectural shields — frameworks designed to mold and project. Every creation is conceived under the dark, beautiful silence of midnight, then realized through the pristine hands of Parisian master tailors.
              </p>
              
              <p className="text-sm text-neutral-400 font-sans font-light leading-relaxed max-w-lg">
                We reject the fast fashion cycle in favor of absolute permanence. Each fabric is selected for its heavy tactile drape and ultimate material lifespan, resulting in silhouettes that exist outside of chronological time.
              </p>

              {/* Signature Attribute */}
              <div className="pt-4 pb-4">
                <p className="font-serif italic text-lg text-neutral-300">
                  "— Alexander Noir, Creative Director"
                </p>
                <p className="text-[10px] uppercase font-sans tracking-widest text-[#c9a96e] mt-1 font-semibold">
                  Atelier First Edition Paris
                </p>
              </div>

              {/* Navigation button */}
              <Button
                variant="outline"
                size="md"
                onClick={() => navigateTo('/about')}
                className="mt-4"
              >
                Learn Our Narrative
              </Button>

            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};
