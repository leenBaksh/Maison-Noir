import React, { useState, useEffect } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { PRESS_QUOTES } from '../../data';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % PRESS_QUOTES.length);
    }, 7000); // Transitions every 7 seconds for an uninterrupted premium reading experience
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % PRESS_QUOTES.length);
  };

  const handlePrev = () => {
    setActiveIndex((activeIndex - 1 + PRESS_QUOTES.length) % PRESS_QUOTES.length);
  };

  return (
    <section id="press" className="bg-neutral-950 text-white py-28 border-y border-neutral-900 select-none">
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        
        {/* Glowing visual accent dot */}
        <ScrollReveal>
          <div className="h-9 w-9 bg-neutral-900 border border-neutral-850 rounded-full flex items-center justify-center text-[#c9a96e] mb-10">
            <Quote className="h-3.5 w-3.5 fill-[#c9a96e]" />
          </div>
        </ScrollReveal>

        {/* Carousel block using Framer Motion layout transitions for gorgeous crosssfading */}
        <div className="min-h-[180px] flex items-center justify-center w-full relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center max-w-3xl"
            >
              <h3 className="font-serif italic text-xl md:text-3xl text-neutral-200 leading-relaxed font-light px-4">
                "{PRESS_QUOTES[activeIndex].quote}"
              </h3>
              
              <div className="h-[1px] w-8 bg-neutral-800 mt-8 mb-4" />
              
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a96e] font-semibold font-sans">
                {PRESS_QUOTES[activeIndex].publication}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dot Indicators */}
        <div className="flex items-center space-x-3 mt-12 z-20">
          <button
            onClick={handlePrev}
            className="text-neutral-500 hover:text-[#c9a96e] hover:bg-neutral-900 p-2 rounded-full transition-all duration-300 mr-2"
            aria-label="Previous Quote"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {PRESS_QUOTES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                activeIndex === idx ? 'w-6 bg-[#c9a96e]' : 'w-1.5 bg-neutral-800'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}

          <button
            onClick={handleNext}
            className="text-neutral-500 hover:text-[#c9a96e] hover:bg-neutral-900 p-2 rounded-full transition-all duration-300 ml-2"
            aria-label="Next Quote"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
