import React, { useEffect, useState } from 'react';
import { PRODUCTS } from '../../data';
import { useCartStore } from '../../store/cartStore';
import { Button } from '../ui/Button';
import { Accordion } from '../ui/Accordion';
import { ScrollReveal } from '../ui/ScrollReveal';
import { ArrowLeft, Heart, ShoppingBag, Star, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Breadcrumbs } from '../layout/Breadcrumbs';

interface ProductDetailProps {
  slug: string;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ slug }) => {
  const { navigateTo, addToCart, products: productsFromStore, toggleWishlist, isWishlisted } = useCartStore();

  const catalog = productsFromStore && productsFromStore.length > 0 ? productsFromStore : PRODUCTS;
  const product = catalog.find((p) => p.slug === slug);

  // If product not found
  if (!product) {
    return (
      <div className="bg-neutral-950 text-white min-h-screen flex flex-col items-center justify-center font-sans">
        <h2 className="font-serif text-xl mb-4 text-[#c9a96e]">Creations Silhouette Not Located</h2>
        <Button variant="outline" onClick={() => navigateTo('/collections')}>
          Return to Collections
        </Button>
      </div>
    );
  }

  // Related products (same category or others, excluding current product)
  const relatedProducts = catalog.filter((p) => p.slug !== slug).slice(0, 3);

  // Local state for product custom properties
  const [selectedImage, setSelectedImage] = useState((product.images && product.images[0]) || '');
  const [selectedColor, setSelectedColor] = useState((product.colors && product.colors[0]) || { name: 'Noir Eclipse', hex: '#0a0a0a' });
  const [selectedSize, setSelectedSize] = useState((product.sizes && product.sizes[0]) || 'M');
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState<string | null>(null);

  // Zoom state for interactive high-end magnifying glass zoom effect
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({
    transformOrigin: 'center center',
    transform: 'scale(1)'
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.7)'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: 'center center',
      transform: 'scale(1)'
    });
  };

  // Sync selected state on product swap
  useEffect(() => {
    setSelectedImage((product.images && product.images[0]) || '');
    setSelectedColor((product.colors && product.colors[0]) || { name: 'Noir Eclipse', hex: '#0a0a0a' });
    setSelectedSize((product.sizes && product.sizes[0]) || 'M');
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [slug, product]);

  const handleAddCartItem = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setNotification(`Successfully added ${quantity}x ${product.name} to checkout bag.`);
    setTimeout(() => setNotification(null), 4000);
  };

  const wished = isWishlisted(product.id);

  // Accordion elements compilation
  const accordionItems = [
    {
      title: 'CREATION OVERVIEW',
      content: (
        <ul className="space-y-2 list-disc pl-4 font-light text-neutral-400 text-xs md:text-sm">
          {(product.details || []).map((detail, idx) => (
            <li key={idx}>{detail}</li>
          ))}
        </ul>
      )
    },
    {
      title: 'FABRIC & DETAILS',
      content: (
        <ul className="space-y-2 list-disc pl-4 font-light text-neutral-400 text-xs md:text-sm">
          {(product.materials || []).map((material, idx) => (
            <li key={idx}>{material}</li>
          ))}
        </ul>
      )
    },
    {
      title: 'CARE GUIDE',
      content: (
        <ul className="space-y-2 list-disc pl-4 font-light text-neutral-400 text-xs md:text-sm">
          {(product.care || []).map((rule, idx) => (
            <li key={idx}>{rule}</li>
          ))}
        </ul>
      )
    },
    {
      title: 'COMPLIMENTARY CONCIERGE DELIVERY',
      content: (
        <p className="font-light text-neutral-400 text-xs md:text-sm leading-relaxed">
          {product.shipping}
        </p>
      )
    }
  ];

  return (
    <div className="bg-neutral-950 text-white min-h-screen pt-32 pb-24 font-sans select-none">
      <Breadcrumbs />
      
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

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12">
        
        {/* Product Details Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Image Gallery (Covers 7 out of 12 columns) */}
          <div className="lg:col-span-7 space-y-6 flex flex-col">
            
            {/* Main Stage Image with Zoom Frame */}
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="aspect-[4/5] bg-neutral-900 border border-neutral-900 rounded overflow-hidden relative group shadow-2xl flex items-center justify-center cursor-zoom-in"
            >
              <img
                src={selectedImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                style={zoomStyle}
                className="w-full h-full object-cover object-center transition-transform duration-[0.2s] ease-out select-none pointer-events-none"
              />
              
              {/* Corner brackets simulating editorial layout frames */}
              <div className="absolute top-4 left-4 h-6 w-6 border-t border-l border-white/25" />
              <div className="absolute top-4 right-4 h-6 w-6 border-t border-r border-white/25" />
              <div className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-white/25" />
              <div className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-white/25" />

              {/* Original tag */}
              {product.isFeatured && (
                <div className="absolute bottom-6 left-6 bg-[#c9a96e]/95 text-black text-[9px] uppercase tracking-[0.25em] font-sans font-bold px-3.5 py-1.5 shadow-lg flex items-center space-x-1">
                  <Sparkles className="h-3 w-3" />
                  <span>Atelier Original</span>
                </div>
              )}
            </div>

            {/* Thumbnail Strip Selection */}
            {(product.images || []).length > 1 && (
              <div className="flex gap-4 scrollbar-none pb-2 overflow-x-auto">
                {(product.images || []).map((img, idx) => {
                  const isActive = selectedImage === img;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`flex-shrink-0 h-24 w-20 bg-neutral-900 border overflow-hidden rounded transition-all transition-duration-300 ${
                        isActive ? 'border-[#c9a96e] scale-[1.02]' : 'border-neutral-900 hover:border-neutral-700'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view point ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Product checkout metadata (Covers 5 out of 12 columns, sticky on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8 flex flex-col">
            
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#c9a96e] block">
                {product.category} // Maison Noir Exclusive
              </span>
              
              <h1 className="font-serif text-3xl md:text-4xl text-white font-medium tracking-tight">
                {product.name}
              </h1>

              {/* Ratings and Reviews */}
              <div className="flex items-center space-x-3.5 pt-1.5">
                <div className="flex space-x-1 text-[#c9a96e]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating) ? 'fill-[#c9a96e]' : 'opacity-40'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-neutral-400 font-mono tracking-widest leading-none">
                  ({product.reviewsCount} atelier reviews)
                </span>
              </div>

              {/* Price */}
              <p className="font-serif text-2xl font-semibold text-white pt-2">
                ${product.price.toLocaleString()} USD
              </p>
            </div>

            <p className="text-xs md:text-sm text-neutral-400 font-sans font-light leading-relaxed">
              {product.description}
            </p>

            <div className="h-[1px] w-full bg-neutral-900 my-4" />

            {/* Color Swatches */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-[#c9a96e]">
                Selected Color: <span className="text-white font-sans font-medium text-xs ml-1 font-semibold">{selectedColor.name}</span>
              </span>
              <div className="flex items-center space-x-4 pt-1">
                {(product.colors || []).map((color) => {
                  const isActive = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color.hex }}
                      className={`h-7 w-7 rounded-full border relative transition-all duration-300 ${
                        isActive
                          ? 'border-[#c9a96e] scale-110 shadow-lg outline outline-offset-2 outline-neutral-800'
                          : 'border-neutral-900 hover:border-neutral-700'
                      }`}
                      title={color.name}
                    />
                  );
                })}
              </div>
            </div>

            {/* Size Selectors */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-neutral-400">
                <span className="text-[#c9a96e]">Selected Size: <span className="text-white font-bold">{selectedSize}</span></span>
                <span className="underline border-b border-neutral-700 pb-0.5 hover:text-white transition-colors cursor-pointer">
                  Dimension Guide
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2.5 pt-1">
                {(product.sizes || []).map((sz) => {
                  const isActive = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`h-10 px-5 text-glow-light border rounded transition-all duration-300 text-xs font-mono font-medium ${
                        isActive
                          ? 'bg-white text-black border-white scale-102 flex items-center justify-center font-bold'
                          : 'bg-transparent text-neutral-400 border-neutral-850 hover:border-neutral-600 hover:text-white flex items-center justify-center'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity ticker and Add items action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              
              {/* Quantity ticker */}
              <div className="flex items-center justify-between border border-neutral-850 rounded bg-neutral-900/30 w-full sm:w-32 py-3 px-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-neutral-500 hover:text-white font-semibold font-sans text-xs focus:outline-none"
                >
                  -
                </button>
                <span className="font-mono text-xs font-semibold text-neutral-200">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-neutral-500 hover:text-white font-semibold font-sans text-xs focus:outline-none"
                >
                  +
                </button>
              </div>

              {/* Add to checkout Bag and Wishlist action triggers */}
              <div className="flex items-center gap-3 w-full">
                <Button
                  variant="gold"
                  onClick={handleAddCartItem}
                  className="w-full flex items-center space-x-3 text-glow-light"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Reserve To Bag</span>
                </Button>
                
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`border border-neutral-850 hover:border-neutral-500 p-4 rounded duration-300 transition-all ${
                    wished ? 'bg-red-500/10 border-red-500 text-red-500' : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Bookmark creation"
                >
                  <Heart className={`h-4.5 w-4.5 ${wished ? 'fill-red-500' : ''}`} />
                </button>
              </div>

            </div>

            {/* Concierge checklist cards */}
            <div className="grid grid-cols-3 gap-0 border border-neutral-900 py-3 text-center bg-neutral-900/15">
              <div className="flex flex-col items-center justify-center p-2.5">
                <Truck className="h-4.5 w-4.5 text-[#c9a96e] mb-1.5" />
                <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-medium">Complimentary Post</span>
              </div>
              <div className="flex flex-col items-center justify-center border-x border-neutral-900 p-2.5">
                <RefreshCw className="h-4.5 w-4.5 text-[#c9a96e] mb-1.5" />
                <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-medium">Complimentary returns</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2.5">
                <ShieldCheck className="h-4.5 w-4.5 text-[#c9a96e] mb-1.5" />
                <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-medium">Registered Seal</span>
              </div>
            </div>

            {/* Accordion disclosures */}
            <div className="pt-4">
              <Accordion items={accordionItems} />
            </div>

          </div>

        </div>

        {/* Related Products below */}
        <div className="mt-32 pt-16 border-t border-neutral-900">
          <ScrollReveal>
            <div className="flex items-baseline justify-between mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-white max-w-sm tracking-tight">
                Related Creations
              </h2>
              <button
                onClick={() => navigateTo('/collections')}
                className="text-xs uppercase tracking-widest text-[#c9a96e] hover:text-white transition-colors border-b border-[#c9a96e] pb-1 font-medium font-sans"
              >
                Inspect Full Showroom →
              </button>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {relatedProducts.map((prod) => {
              const insideWish = isWishlisted(prod.id);
              return (
                <div
                  key={prod.id}
                  onClick={() => navigateTo(`/product/${prod.slug}`)}
                  className="group relative cursor-pointer"
                >
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
                        alt={`${prod.name} backup view`}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-[0.8s] ease-in-out"
                      />
                    )}

                    <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/45 transition-colors duration-300" />

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(prod);
                      }}
                      className="absolute top-4 right-4 z-20 h-8 w-8 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border border-neutral-850 hover:border-[#c9a96e] transition-colors"
                    >
                      <Heart className={`h-4.5 w-4.5 ${insideWish ? 'text-red-500 fill-red-500' : 'text-neutral-400'}`} />
                    </button>
                  </div>

                  <div className="mt-5 flex flex-col font-sans">
                    <div className="text-[11px] text-neutral-400 uppercase tracking-widest font-medium">
                      {prod.category}
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
