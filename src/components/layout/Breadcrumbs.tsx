import React from 'react';
import { useCartStore } from '../../store/cartStore';
import { COLLECTIONS, PRODUCTS } from '../../data';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'motion/react';

export const Breadcrumbs: React.FC = () => {
  const { activeRoute, navigateTo, products: productsFromStore } = useCartStore();

  // Helper to resolve collection slug from product category
  const getCollectionForProduct = (category: string, slug: string) => {
    const cat = category.toLowerCase();
    if (cat === 'outerwear' || slug === 'noir-oversized-structured-coat') {
      return { name: 'La Nuit Autumn', slug: 'la-nuit' };
    }
    if (cat === 'gowns' || slug === 'shadow-silhouette-silk-gown') {
      return { name: 'The Avant-Garde', slug: 'avant-garde' };
    }
    if (cat === 'accessories' || cat === 'footwear') {
      return { name: 'Les Accessoires', slug: 'les-accessoires' };
    }
    if (cat === 'fragrances') {
      return { name: "L'Essence Fragrances", slug: 'l-essence' };
    }
    // Tailoring fallback or featured
    if (cat === 'tailoring') {
      if (slug.includes('blazer') || slug.includes('avant-garde')) {
        return { name: 'The Avant-Garde', slug: 'avant-garde' };
      }
      return { name: 'La Nuit Autumn', slug: 'la-nuit' };
    }
    return { name: 'La Nuit Autumn', slug: 'la-nuit' }; // default fallback
  };

  const getBreadcrumbs = (): { label: string; route?: string; active: boolean }[] => {
    const items: { label: string; route?: string; active: boolean }[] = [
      { label: 'MAISON NOIR', route: '/', active: false },
    ];

    if (activeRoute === '/collections') {
      items.push({ label: 'COLLECTIONS', active: true });
    } else if (activeRoute.startsWith('/collections/')) {
      const slug = activeRoute.split('/collections/')[1];
      const collection = COLLECTIONS.find((c) => c.slug === slug);
      
      items.push({ label: 'COLLECTIONS', route: '/collections', active: false });
      items.push({ 
        label: collection ? collection.name.toUpperCase() : 'COLLECTION', 
        active: true 
      });
    } else if (activeRoute.startsWith('/product/')) {
      const slug = activeRoute.split('/product/')[1];
      const catalog = productsFromStore && productsFromStore.length > 0 ? productsFromStore : PRODUCTS;
      const product = catalog.find((p) => p.slug === slug);

      items.push({ label: 'COLLECTIONS', route: '/collections', active: false });
      
      if (product) {
        const col = getCollectionForProduct(product.category, product.slug);
        items.push({ 
          label: col.name.toUpperCase(), 
          route: `/collections/${col.slug}`, 
          active: false 
        });
        items.push({ 
          label: product.name.toUpperCase(), 
          active: true 
        });
      } else {
        items.push({ label: 'CREATION', active: true });
      }
    }

    return items;
  };

  const breadcrumbs = getBreadcrumbs();

  // Only render on product and collection pages
  const isCollectionsPage = activeRoute === '/collections';
  const isCollectionDetailPage = activeRoute.startsWith('/collections/');
  const isProductDetailPage = activeRoute.startsWith('/product/');

  if (!isCollectionsPage && !isCollectionDetailPage && !isProductDetailPage) {
    return null;
  }

  return (
    <nav 
      aria-label="Breadcrumb"
      className="w-full border-b border-neutral-900/40 bg-neutral-950/80 backdrop-blur-md py-4 select-none"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center flex-wrap gap-2 text-[10px] font-mono tracking-[0.25em]">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <React.Fragment key={index}>
              {index > 0 && (
                <ChevronRight className="h-3 w-3 text-neutral-600 flex-shrink-0 mx-1" />
              )}
              
              {item.active ? (
                <span className="text-[#c9a96e] font-semibold truncate max-w-[150px] sm:max-w-[280px]">
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => item.route && navigateTo(item.route)}
                  className="text-neutral-500 hover:text-white transition-all duration-300 outline-none flex items-center gap-1 cursor-pointer"
                >
                  {index === 0 && <Home className="h-3 w-3 text-[#c9a96e] opacity-80" />}
                  <span className="hover:underline">{item.label}</span>
                </button>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
