import React, { useRef, useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { PRODUCTS } from '../../data';
import { useCartStore } from '../../store/cartStore';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NewArrivals: React.FC = () => {
  const { navigateTo, addToCart, products: productsFromStore, toggleWishlist, isWishlisted } = useCartStore();
  const catalog = productsFromStore && productsFromStore.length > 0 ? productsFromStore : PRODUCTS;
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // State for quick notification upon clicking 'Quick Add'
  const [notification, setNotification] = useState<string | null>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  const handleQuickAdd = (e: React.MouseEvent, product: typeof PRODUCTS[0]) => {
    e.stopPropagation(); // Avoid triggering route navigation
    // Select default color and size of product
    const defaultColor = product.colors[0] || { name: 'Noir', hex: '#000000' };
    const defaultSize = product.sizes[0] || 'M';
    
    addToCart(product, defaultColor, defaultSize, 1);
    
    setNotification(`${product.name} added to your bag.`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <section className="bg-neutral-950 text-white py-28 border-t border-neutral-900 z-20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col">
        
        {/* Quick Added Floating Toast Banner */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: 50, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 20, x: '-50%' }}
              className="fixed bottom-10 left-1/2 z-50 bg-white text-black px-6 py-4 border border-neutral-200 text-xs uppercase tracking-[0.2em] font-sans flex items-center space-x-3.5 shadow-2xl"
            >
              <ShoppingBag className="h-4 w-4 text-[#c9a96e]" />
              <span>{notification}</span>
              <button
                onClick={() => setNotification(null)}
                className="pl-4 text-neutral-400 hover:text-black font-sans text-[10px] font-bold"
              >
                DISMISS
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Header with Slider Navigation */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="flex flex-col">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#c9a96e] mb-3">
                THE LATEST CREATIONS
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight">
                New Arrivals
              </h2>
            </div>
            
            <div className="flex items-center space-x-6 mt-6 md:mt-0">
              <button
                onClick={() => navigateTo('/collections')}
                className="text-xs uppercase tracking-widest text-[#c9a96e] hover:text-white transition-colors border-b border-[#c9a96e] pb-1 font-medium font-sans"
              >
                View Full Archive →
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={scrollLeft}
                  className="h-9 w-9 border border-neutral-800 hover:border-neutral-500 rounded-full flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={scrollRight}
                  className="h-9 w-9 border border-neutral-800 hover:border-neutral-500 rounded-full flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal Slider Area */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto gap-8 pb-8 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {catalog.map((prod, index) => {
            const wished = isWishlisted(prod.id);
            return (
              <div
                key={prod.id}
                onClick={() => navigateTo(`/product/${prod.slug}`)}
                className="min-w-[280px] sm:min-w-[325px] w-[325px] snap-start group relative cursor-pointer select-none"
              >
                {/* Product Image Frame */}
                <div className="aspect-[4/5] w-full relative overflow-hidden bg-neutral-900 border border-neutral-900/60 group-hover:border-neutral-800 transition-all duration-500">
                  
                  {/* Primary Angle Image */}
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />

                  {/* Secondary Hover Angle Image */}
                  {prod.images[1] && (
                    <img
                      src={prod.images[1]}
                      alt={`${prod.name} alternative context`}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
                    />
                  )}

                  {/* Dark aesthetic overlay cover top-to-bottom on hover */}
                  <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/40 transition-colors duration-500" />

                  {/* Absolute positioning of Wishlist Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(prod);
                    }}
                    className="absolute top-4 right-4 z-25 h-8 w-8 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border border-neutral-850 hover:border-[#c9a96e] transition-colors"
                  >
                    <Heart
                      className={`h-4.5 w-4.5 transition-colors duration-300 ${
                        wished ? 'text-red-500 fill-red-500' : 'text-neutral-400 hover:text-white'
                      }`}
                    />
                  </button>

                  {/* Left Top Label for Featured creations */}
                  {prod.isFeatured && (
                    <div className="absolute top-4 left-4 z-20 bg-[#c9a96e]/95 text-black text-[8px] uppercase tracking-[0.2em] font-sans font-bold px-2 py-0.5 rounded-sm flex items-center space-x-1 shadow-md">
                      <Sparkles className="h-2 w-2" />
                      <span>Atelier Original</span>
                    </div>
                  )}

                  {/* Quick Add Bar - Slides up from the bottom of the image box on hover */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <button
                      onClick={(e) => handleQuickAdd(e, prod)}
                      className="w-full bg-white text-black py-4 text-[10px] uppercase font-sans tracking-[0.25em] hover:bg-[#c9a96e] hover:text-black transition-colors duration-300 font-semibold"
                    >
                      + Quick Add
                    </button>
                  </div>
                </div>

                {/* Product Metadata Descriptions Below */}
                <div className="mt-5 flex flex-col font-sans">
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 uppercase tracking-widest font-medium">
                    <span>{prod.category}</span>
                    <span className="text-neutral-500">{prod.sizes.join(', ')}</span>
                  </div>

                  <h3 className="font-serif text-base text-neutral-100 font-medium mt-1.5 group-hover:text-[#c9a96e] transition-colors duration-300">
                    {prod.name}
                  </h3>

                  <p className="text-sm font-semibold tracking-wide text-white mt-1">
                    ${prod.price.toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
