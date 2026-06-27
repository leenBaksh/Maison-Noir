import React, { useEffect, useState } from 'react';
import { COLLECTIONS, PRODUCTS } from '../../data';
import { useCartStore } from '../../store/cartStore';
import { Button } from '../ui/Button';
import { ScrollReveal } from '../ui/ScrollReveal';
import { ArrowLeft, Heart, ShoppingBag, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Breadcrumbs } from '../layout/Breadcrumbs';

interface CollectionDetailProps {
  slug: string;
}

export const CollectionDetail: React.FC<CollectionDetailProps> = ({ slug }) => {
  const { navigateTo, addToCart, products: productsFromStore, toggleWishlist, isWishlisted } = useCartStore();
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  const collection = COLLECTIONS.find((c) => c.slug === slug);

  if (!collection) {
    return (
      <div className="bg-neutral-950 text-white min-h-screen flex flex-col items-center justify-center font-sans">
        <h2 className="font-serif text-xl mb-4">Collection Not Located</h2>
        <Button variant="outline" onClick={() => navigateTo('/collections')}>
          Return to Archives
        </Button>
      </div>
    );
  }

  const catalog = productsFromStore && productsFromStore.length > 0 ? productsFromStore : PRODUCTS;

  // Filter products relevant to collection
  let filteredProducts = catalog;
  if (slug === 'la-nuit') {
    filteredProducts = catalog.filter(
      (p) => p.category === 'Outerwear' || p.category === 'Tailoring' || p.isFeatured
    );
  } else if (slug === 'avant-garde') {
    filteredProducts = catalog.filter(
      (p) => p.category === 'Tailoring' || p.category === 'Gowns'
    );
  } else if (slug === 'les-accessoires') {
    filteredProducts = catalog.filter(
      (p) => p.category === 'Accessories' || p.category === 'Footwear'
    );
  } else if (slug === 'l-essence') {
    filteredProducts = catalog.filter((p) => p.category === 'Fragrances');
  }

  const handleQuickAdd = (e: React.MouseEvent, product: typeof PRODUCTS[0]) => {
    e.stopPropagation();
    const defaultColor = product.colors[0] || { name: 'Noir', hex: '#000000' };
    const defaultSize = product.sizes[0] || 'M';
    addToCart(product, defaultColor, defaultSize, 1);
    
    setNotification(`${product.name} added to your bag.`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen pt-32 pb-24 font-sans select-none">
      <Breadcrumbs />
      
      {/* Floating Add notification */}
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

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12">
        
        {/* Collection Hero Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 border-b border-neutral-900 pb-16">
          <div className="lg:col-span-4 space-y-6">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#c9a96e]">
              {collection.label}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
              {collection.name}
            </h1>
            <p className="font-serif italic text-sm text-neutral-400 font-light">
              "{collection.tagline}"
            </p>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-light">
              {collection.description}
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="aspect-[21/9] w-full bg-neutral-900 border border-neutral-900 overflow-hidden shadow-2xl">
              <img
                src={collection.image}
                alt={collection.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-[center_35%]"
              />
            </div>
          </div>
        </div>

        {/* Products Grid in Collection */}
        <div>
          <h2 className="font-serif text-xl font-medium tracking-wide text-neutral-300 mb-8 border-b border-neutral-900 pb-4 uppercase tracking-[0.1em]">
            Collection Offerings ({filteredProducts.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((prod) => {
              const wished = isWishlisted(prod.id);
              return (
                <div
                  key={prod.id}
                  onClick={() => navigateTo(`/product/${prod.slug}`)}
                  className="group relative cursor-pointer"
                >
                  {/* Photo container */}
                  <div className="aspect-[4/5] w-full relative overflow-hidden bg-neutral-900 border border-neutral-900 group-hover:border-neutral-800 transition-all duration-300">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-104 transition-transform duration-[1s]"
                    />
                    
                    {prod.images[1] && (
                      <img
                        src={prod.images[1]}
                        alt={`${prod.name} alternative context`}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-[0.8s] ease-in-out"
                      />
                    )}

                    <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/45 transition-colors duration-300" />

                    {/* Wishlist button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(prod);
                      }}
                      className="absolute top-4 right-4 z-20 h-8 w-8 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border border-neutral-850 hover:border-[#c9a96e] transition-colors"
                    >
                      <Heart
                        className={`h-4.5 w-4.5 transition-colors duration-300 ${
                          wished ? 'text-red-500 fill-red-500' : 'text-neutral-400 hover:text-white'
                        }`}
                      />
                    </button>

                    {prod.isFeatured && (
                      <div className="absolute top-4 left-4 z-20 bg-[#c9a96e]/95 text-black text-[8px] uppercase tracking-[0.2em] font-sans font-bold px-2 py-0.5 rounded-sm flex items-center space-x-1 shadow-md">
                        <Sparkles className="h-2 w-2" />
                        <span>Featured</span>
                      </div>
                    )}

                    {/* Quick Add Bar */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <button
                        onClick={(e) => handleQuickAdd(e, prod)}
                        className="w-full bg-white text-black py-4 text-[10px] uppercase font-sans tracking-[0.25em] hover:bg-[#c9a96e] hover:text-black transition-colors duration-300 font-semibold text-glow-light"
                      >
                        + Quick Add
                      </button>
                    </div>
                  </div>

                  {/* Metadata fields */}
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

      </div>
    </div>
  );
};
