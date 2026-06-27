import React, { useEffect, useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import { PRODUCTS } from '../../data';
import { Button } from '../ui/Button';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Wishlist: React.FC = () => {
  const { wishlist: wishlistIds, products: productsFromStore, toggleWishlist, navigateTo, addToCart } = useCartStore();
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const catalog = productsFromStore && productsFromStore.length > 0 ? productsFromStore : PRODUCTS;
  const wishlist = catalog.filter((prod) => wishlistIds.includes(prod.id));

  const handleMoveToBag = (e: React.MouseEvent, prod: typeof wishlist[0]) => {
    e.stopPropagation();
    const defaultColor = prod.colors[0] || { name: 'Noir Eclipse', hex: '#0a0a0a' };
    const defaultSize = prod.sizes[0] || 'M';
    addToCart(prod, defaultColor, defaultSize, 1);
    toggleWishlist(prod); // Remove from wishlist

    setNotification(`Moved ${prod.name} into your bag.`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen pt-32 pb-24 font-sans select-none">
      
      {/* Toast Notification */}
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
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Title */}
        <ScrollReveal>
          <div className="flex flex-col items-start mb-16">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#c9a96e] block mb-2">
              YOUR TIMELESS PREFERENCES
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight">
              Private Wishlist
            </h1>
          </div>
        </ScrollReveal>

        {wishlist.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-neutral-900 bg-neutral-950 py-24 px-6 text-center max-w-2xl mx-auto rounded flex flex-col items-center"
          >
            <Heart className="h-12 w-12 text-[#c9a96e] mb-6 stroke-[1.25]" />
            
            <h3 className="font-serif text-2xl font-medium mb-3">
              Wishlist is Currently Deserted
            </h3>
            
            <p className="text-xs md:text-sm text-neutral-400 font-light leading-relaxed max-w-md mb-8">
              No deconstructed blazers or heavy trench coats have been saved. Browse our original seasonal collections and bookmark your ultimate outlines.
            </p>
            
            <Button variant="gold" onClick={() => navigateTo('/collections')}>
              Explore Collections
            </Button>
          </motion.div>
        ) : (
          /* Active Wishlist Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence>
              {wishlist.map((prod) => (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => navigateTo(`/product/${prod.slug}`)}
                  className="group relative cursor-pointer"
                >
                  {/* Photo with hover reveals */}
                  <div className="aspect-[4/5] w-full relative overflow-hidden bg-neutral-900 border border-neutral-900 group-hover:border-neutral-800 transition-all duration-300">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-104 transition-transform duration-[1s]"
                    />

                    <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/45 transition-colors duration-300" />

                    {/* Absolute Delete Button on Top Left */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(prod);
                      }}
                      className="absolute top-4 left-4 z-20 h-8 w-8 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border border-neutral-850 hover:border-red-500 transition-colors text-neutral-400 hover:text-red-500"
                      title="Delete wish allocation"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    {/* Absolute Quick Add Button on bottom */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <button
                        onClick={(e) => handleMoveToBag(e, prod)}
                        className="w-full bg-white text-black py-4 text-[10px] uppercase font-sans tracking-[0.25em] hover:bg-[#c9a96e] hover:text-black transition-colors duration-300 font-semibold"
                      >
                        Move to Bag
                      </button>
                    </div>
                  </div>

                  {/* Metadata fields below */}
                  <div className="mt-5 flex flex-col font-sans">
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 uppercase tracking-widest font-medium">
                      <span>{prod.category}</span>
                      <span>${prod.price.toLocaleString()}</span>
                    </div>

                    <h3 className="font-serif text-base text-neutral-100 font-medium mt-1.5 group-hover:text-[#c9a96e] transition-colors duration-300">
                      {prod.name}
                    </h3>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
};
