import React, { useEffect } from 'react';
import { useCartStore } from './store/cartStore';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Page Imports
import { Home } from './components/pages/Home';
import { Collections } from './components/pages/Collections';
import { CollectionDetail } from './components/pages/CollectionDetail';
import { ProductDetail } from './components/pages/ProductDetail';
import { Cart } from './components/pages/Cart';
import { Checkout } from './components/pages/Checkout';
import { About } from './components/pages/About';
import { Contact } from './components/pages/Contact';
import { Login } from './components/pages/Login';
import { Register } from './components/pages/Register';
import { Account } from './components/pages/Account';
import { Wishlist } from './components/pages/Wishlist';

// Animation support from motion
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { activeRoute, setCredentials, syncAuthAndFetch, setProductsAndCategories } = useCartStore();

  // 1. Initialise dynamic catalog fetch from Cloud SQL
  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const prodRes = await fetch('/api/products');
        const prodData = await prodRes.json();
        
        const catRes = await fetch('/api/categories');
        const catData = await catRes.json();

        if (prodData.success && catData.success) {
          setProductsAndCategories(prodData.products, catData.categories);
        }
      } catch (err) {
        console.error("Using offline static files fallback. Failed to read Cloud SQL catalog:", err);
      }
    };
    fetchCatalog();
  }, [setProductsAndCategories]);

  // 2. Initialise Firebase Auth state changed hook
  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | null = null;
    
    const setupFirebaseAuth = async () => {
      try {
        const { auth: clientAuth } = await import('./lib/firebase.ts');
        const { onAuthStateChanged } = await import('firebase/auth');
        
        if (!active) return;

        unsubscribe = onAuthStateChanged(clientAuth, async (fbUser) => {
          try {
            if (!active) return;
            if (fbUser) {
              const token = await fbUser.getIdToken();
              if (active) {
                setCredentials(fbUser, token);
                await syncAuthAndFetch();
              }
            } else {
              if (active) {
                setCredentials(null, null);
              }
            }
          } catch (syncErr) {
            console.error("Auth state synchronization error:", syncErr);
            if (active) setCredentials(null, null);
          }
        });
      } catch (importErr) {
        console.warn("Client Firebase initialization failed or restricted. Operating in offline liaison fallback:", importErr);
        if (active) {
          setCredentials(null, null);
        }
      }
    };

    setupFirebaseAuth();
    
    return () => {
      active = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [setCredentials, syncAuthAndFetch]);

  // Watch and bind the browser's address hash to enable seamless bookmarking and backward transitions
  useEffect(() => {
    const syncRouteFromAddressHash = () => {
      const hash = window.location.hash.slice(1) || '/';
      if (useCartStore.getState().activeRoute !== hash) {
        const normalized = hash.startsWith('/') ? hash : '/' + hash;
        useCartStore.getState().navigateTo(normalized);
      }
    };

    syncRouteFromAddressHash();

    window.addEventListener('hashchange', syncRouteFromAddressHash);
    return () => window.removeEventListener('hashchange', syncRouteFromAddressHash);
  }, []);

  // Structural route switcher
  const renderActivePage = () => {
    if (activeRoute === '/') {
      return <Home />;
    }
    
    if (activeRoute === '/collections') {
      return <Collections />;
    }

    if (activeRoute.startsWith('/collections/')) {
      const collectionSlug = activeRoute.split('/collections/')[1];
      return <CollectionDetail slug={collectionSlug} />;
    }

    if (activeRoute.startsWith('/product/')) {
      const productSlug = activeRoute.split('/product/')[1];
      return <ProductDetail slug={productSlug} />;
    }

    if (activeRoute === '/cart') {
      return <Cart />;
    }

    if (activeRoute === '/checkout') {
      return <Checkout />;
    }

    if (activeRoute === '/about') {
      return <About />;
    }

    if (activeRoute === '/contact') {
      return <Contact />;
    }

    if (activeRoute === '/auth/login') {
      return <Login />;
    }

    if (activeRoute === '/auth/register') {
      return <Register />;
    }

    if (activeRoute === '/account') {
      return <Account />;
    }

    if (activeRoute === '/wishlist') {
      return <Wishlist />;
    }

    return <Home />;
  };

  return (
    <div className="bg-neutral-950 min-h-screen text-white flex flex-col font-sans antialiased selection:bg-[#c9a96e] selection:text-black">
      
      {/* Global Header */}
      <Navbar />

      {/* Main viewport with entry cross-fade animations */}
      <main className="flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRoute}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex-grow flex flex-col"
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer />
      
    </div>
  );
}
