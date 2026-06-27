import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Volume2, VolumeX, ChevronDown, Sparkles, X, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCartStore } from '../../store/cartStore';

export const Hero: React.FC = () => {
  const { navigateTo } = useCartStore();
  const [isPlayingFilm, setIsPlayingFilm] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <>
      <section className="relative h-screen w-full bg-neutral-950 overflow-hidden flex items-center justify-start select-none">
        
        {/* Parallax Atmospheric Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop"
            alt="Cinematic Campaign Runway Silhouette"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[center_28%] opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/30 to-transparent" />
        </div>

        {/* Hero Copy Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-24 flex flex-col items-start pt-16 md:pt-24 justify-center">
          
          {/* Collection Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center space-x-2.5 mb-6"
          >
            <span className="h-[1px] w-8 bg-[#c9a96e]" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium font-sans text-[#c9a96e]">
              AUTUMN / WINTER 2026
            </p>
          </motion.div>

          {/* Large Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-[1.05] tracking-tight text-left max-w-4xl"
          >
            The Art of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 via-neutral-100 to-white text-glow-dark">
              Darkness
            </span>
          </motion.h1>

          {/* Subtext description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 md:mt-8 font-sans text-neutral-400 text-sm md:text-base leading-relaxed max-w-lg font-light"
          >
            Where shadow meets architectural sophistication. A narrative woven with raw Parisian wools, bias-cut sand-washed silk, and custom gold-dipped hardware. Crafted to stand alone.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <Button
              variant="gold"
              size="lg"
              onClick={() => navigateTo('/collections')}
              className="group shadow-2xl shadow-neutral-950"
            >
              <span className="flex items-center space-x-2">
                <span>Explore Collection</span>
                <Sparkles className="h-3.5 w-3.5 text-black group-hover:rotate-12 transition-transform" />
              </span>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsPlayingFilm(true)}
              className="group"
            >
              <span className="flex items-center justify-center space-x-2">
                <Play className="h-3.5 w-3.5 text-[#c9a96e] group-hover:scale-110 transition-transform fill-[#c9a96e]" />
                <span>Watch Campaign Film</span>
              </span>
            </Button>
          </motion.div>
        </div>

        {/* Animated scroll down indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10 cursor-pointer">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-[9px] uppercase tracking-[0.3em] font-sans text-neutral-500 mb-2"
          >
            Scroll
          </motion.p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-4 w-4 text-[#c9a96e]" />
          </motion.div>
        </div>
      </section>

      {/* --- Campaign Film Modal Overlay --- */}
      <AnimatePresence>
        {isPlayingFilm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-neutral-950 flex flex-col items-center justify-center p-4 backdrop-blur-md"
          >
            {/* Click backdrop to exit */}
            <div 
              className="absolute inset-0 z-0 bg-neutral-950/90 cursor-pointer" 
              onClick={() => setIsPlayingFilm(false)} 
            />

            {/* Modal close block */}
            <button
              onClick={() => setIsPlayingFilm(false)}
              className="absolute top-6 right-6 md:top-8 md:right-8 z-50 bg-neutral-900/80 hover:bg-neutral-800 p-3 rounded-full border border-neutral-800 transition-colors text-white cursor-pointer"
              aria-label="Exit Cinema"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Cinema Screen Container */}
            <div className="relative z-10 max-w-5xl w-full flex flex-col space-y-6 items-center">
              <div className="w-full aspect-video bg-black border border-neutral-800 rounded-lg shadow-2xl relative overflow-hidden">
                <video
                  className="absolute inset-0 h-full w-full object-cover rounded-lg"
                  src="https://assets.mixkit.co/videos/preview/mixkit-fashion-woman-with-silver-makeup-40277-large.mp4"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  controls
                  poster="https://images.unsplash.com/photo-1510832198440-a52376950479?q=80&w=2000&auto=format&fit=crop"
                />

                <div className="absolute bottom-4 right-4 z-20 flex items-center space-x-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-800 text-neutral-300">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 hover:bg-neutral-900 rounded-full hover:text-white transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                  <span className="text-[10px] uppercase font-mono tracking-wider select-none">
                    {isMuted ? 'Muted' : 'Sound On'}
                  </span>
                </div>
              </div>

              {/* Film description and external redirect block */}
              <div className="flex flex-col items-center space-y-4 w-full">
                <div className="text-center max-w-xl mx-auto space-y-3 pointer-events-none">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#c9a96e] font-sans">
                    Directed by Studio Noir, Paris
                  </p>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    Shot on 35mm monochrome Kodak film, this short campaign outlines the architectural lines and motion of the Double-faced Virgin Wool trench under different conditions of ambient darkness.
                  </p>
                </div>

                <a
                  href="https://www.youtube.com/watch?v=5-S31XGHTrc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs text-[#c9a96e] hover:text-[#d9b97e] font-sans tracking-widest uppercase transition-colors py-2 px-4 rounded border border-[#c9a96e]/20 hover:border-[#c9a96e]/45 bg-neutral-900/40 hover:bg-[#c9a96e]/5 cursor-pointer"
                >
                  <span>Watch master cut on YouTube</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
