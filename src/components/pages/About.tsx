import React, { useEffect } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Button } from '../ui/Button';
import { useCartStore } from '../../store/cartStore';

export const About: React.FC = () => {
  const { navigateTo } = useCartStore();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="bg-neutral-950 text-white min-h-screen pt-32 pb-24 font-sans select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col space-y-28">
        
        {/* Editorial Heading */}
        <ScrollReveal>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#c9a96e]">
              CHAPTER I // GENESIS OF THE HOUSE
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Crafted in Shadow, <br />
              Sculpted For Permanence
            </h1>
            <div className="h-0.5 w-12 bg-neutral-800 my-4" />
            <p className="text-sm text-neutral-400 font-light leading-relaxed font-serif italic text-glow-dark">
              "Maison Noir was established not merely to manufacture apparel, but to frame individual existence in architectural, beautiful lines of shadow."
            </p>
          </div>
        </ScrollReveal>

        {/* 50/50 Chapter Block 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <ScrollReveal yOffset={35}>
            <div className="aspect-[3/4] bg-neutral-900 border border-neutral-900 overflow-hidden relative rounded shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=900&auto=format&fit=crop"
                alt="Parisian Tailoring Studio AW2026"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-[center_35%]"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} yOffset={25}>
            <div className="space-y-6">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#c9a96e]">
                01 // DESIGN RADICALISM
              </span>
              <h2 className="font-serif text-3xl font-medium text-white tracking-tight">
                The Silhouette Shield
              </h2>
              <div className="h-[1px] w-12 bg-[#c9a96e]" />
              
              <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-light">
                Founded in 2025 by high-concept designer Alexander Noir, Maison Noir emerged as a critical rebellion against seasonal hyper-trend cycles. We construct shields — clean structural forms equipped to guide human presence with power and comfort.
              </p>

              <p className="text-xs md:text-sm text-[#c9a96e] leading-relaxed italic font-serif">
                “A garment should never be a passive addition. It must command room volume, carving gravity wherever it stands.”
              </p>

              <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-light">
                Every collar, cuff, and bias fold is computed in our Parisian creative rooms, then refined through rigorous material fit tests. We combine classic tailoring with modern deconstructed raw hems.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* 50/50 Chapter Block 2 (Reordered) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Left */}
          <div className="lg:order-2">
            <ScrollReveal yOffset={35}>
              <div className="aspect-[3/4] bg-neutral-900 border border-neutral-900 overflow-hidden relative rounded shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1510832198440-a52376950479?q=80&w=900&auto=format&fit=crop"
                  alt="Raw Sustainable Textiles"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-[center_40%]"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Image Right */}
          <div className="lg:order-1">
            <ScrollReveal delay={0.2} yOffset={25}>
              <div className="space-y-6">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#c9a96e]">
                  02 // PRISTINE MATERIAL SOURCING
                </span>
                
                <h2 className="font-serif text-3xl font-medium text-white tracking-tight">
                  Sustainable Permanence
                </h2>
                
                <div className="h-[1px] w-12 bg-[#c9a96e]" />
                
                <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-light">
                  Maison Noir maintains full transparent liability over our material chain. We source 100% certified organic Mongolian cashmere, bio-processed sand-washed Italian silk, and trace-certified virgin merino fibers.
                </p>

                <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-light">
                  By sourcing fabrics only from regenerative farmers who respect raw biodiversity, we protect regional ecological stabilities while assuring our clients enjoy textiles of unparalleled thickness, weight, and touch comfort.
                </p>

                <div className="grid grid-cols-2 gap-4 border border-neutral-900 p-4 bg-neutral-900/10 rounded">
                  <div>
                    <span className="font-serif text-[#c9a96e] text-xl font-bold">100%</span>
                    <p className="text-[9px] uppercase tracking-widest text-neutral-500 font-sans mt-0.5">Trace-Certified Sourcing</p>
                  </div>
                  <div>
                    <span className="font-serif text-[#c9a96e] text-xl font-bold">Zero</span>
                    <p className="text-[9px] uppercase tracking-widest text-neutral-500 font-sans mt-0.5">Fast-Fashion Waste</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Dynamic CTA */}
        <ScrollReveal>
          <div className="border border-neutral-900 bg-neutral-900/10 p-12 md:p-16 text-center max-w-4xl mx-auto rounded flex flex-col items-center">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#c9a96e] mb-2 font-semibold">
              JOIN THE NARRATIVE
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-4 text-white">
              Discover the Tailored Showroom
            </h3>
            <p className="text-xs md:text-sm text-neutral-400 font-light leading-relaxed max-w-md mb-8">
              Experience the physical manifestations of Alexander Noir's creative philosophies. Explore our trench coats, footwear, and scents.
            </p>
            <Button variant="gold" onClick={() => navigateTo('/collections')}>
              Browse Curations
            </Button>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
