import React, { useState, useEffect } from 'react';
import { useCartStore } from '../../store/cartStore';
import { PRODUCTS } from '../../data';
import { Search, Heart, ShoppingBag, Menu, X, User, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { cart, activeRoute, navigateTo, user, wishlist } = useCartStore();

  // Handle transparent to blurred black transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Filter products for immediate search preview
  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchItemClick = (slug: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigateTo(`/product/${slug}`);
  };

  return (
    <>
      <nav
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-sans border-b ${
          isScrolled
            ? 'bg-neutral-950/95 backdrop-blur-md py-4 border-neutral-900 shadow-sm'
            : 'bg-transparent py-6 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Left: Brand Logo */}
          <button
            onClick={() => navigateTo('/')}
            className="flex items-baseline space-x-1 outline-none text-left"
          >
            <span className="font-serif text-xl md:text-2xl font-bold tracking-[0.2em] text-white">
              MAISON NOIR
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] inline-block animate-pulse" />
          </button>

          {/* Center: Main Navigation Desktop */}
          <div className="hidden lg:flex items-center space-x-12">
            {[
              { label: 'Collections', route: '/collections' },
              { label: 'Lookbook', route: '/#lookbook' },
              { label: 'Journal & Story', route: '/about' },
              { label: 'Contact Private Salon', route: '/contact' }
            ].map((link) => {
              const isCurrent = activeRoute === link.route || (link.route.startsWith('/collections') && activeRoute.startsWith('/collections'));
              return (
                <button
                  key={link.label}
                  onClick={() => {
                    if (link.route.startsWith('/#')) {
                      navigateTo('/');
                      setTimeout(() => {
                        const el = document.getElementById(link.route.substring(2));
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    } else {
                      navigateTo(link.route);
                    }
                  }}
                  className={`text-[10px] uppercase tracking-[0.3em] font-medium transition-all duration-300 relative py-1 hover:text-white ${
                    isCurrent ? 'text-[#c9a96e]' : 'text-neutral-400'
                  }`}
                >
                  {link.label}
                  {isCurrent && (
                    <motion.div
                      layoutId="nav-line"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#c9a96e]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Icons Action Bar */}
          <div className="flex items-center space-x-6 md:space-x-8 text-white">
            
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-neutral-400 hover:text-white transition-colors p-1"
              aria-label="Search Collection"
            >
              <Search className="h-4 w-4 md:h-4.5 md:w-4.5" />
            </button>

            {/* Account Profile Trigger */}
            <button
              onClick={() => navigateTo(user ? '/account' : '/auth/login')}
              className={`transition-colors p-1 flex items-center ${
                activeRoute === '/account' || activeRoute.startsWith('/auth')
                  ? 'text-[#c9a96e]'
                  : 'text-neutral-400 hover:text-white'
              }`}
              aria-label="Private Client Account"
            >
              <User className="h-4 w-4 md:h-4.5 md:w-4.5" />
              {user && (
                <span className="hidden md:inline ml-1.5 text-[9px] uppercase tracking-[0.1em] text-neutral-400 font-medium max-w-[80px] truncate">
                  {user.fullName.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => navigateTo('/wishlist')}
              className={`relative transition-colors p-1 ${
                activeRoute === '/wishlist' ? 'text-[#c9a96e]' : 'text-neutral-400 hover:text-white'
              }`}
              aria-label="Private Wishlist"
            >
              <Heart className="h-4 w-4 md:h-4.5 md:w-4.5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#c9a96e] text-black text-[8px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Icon Trigger */}
            <button
              onClick={() => navigateTo('/cart')}
              className={`relative transition-colors p-1 ${
                activeRoute === '/cart' ? 'text-[#c9a96e]' : 'text-neutral-400 hover:text-white'
              }`}
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="h-4 w-4 md:h-4.5 md:w-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-white text-black text-[8px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-neutral-400 hover:text-white transition-colors p-1"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

          </div>
        </div>
      </nav>

      {/* --- Search Overlay Panel --- */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-neutral-950/98 z-50 text-white flex flex-col pt-24 px-6 md:px-24"
          >
            <div className="max-w-4xl mx-auto w-full">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div className="flex items-center space-x-4 w-full">
                  <Search className="h-5 w-5 text-[#c9a96e]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tailored outerwear, fragrances, accessory, lookbooks..."
                    autoFocus
                    className="bg-transparent border-none outline-none text-lg md:text-xl font-serif text-white w-full placeholder-neutral-700 focus:ring-0"
                  />
                </div>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-2 text-neutral-500 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Suggestions / Results */}
              <div className="mt-12">
                {searchQuery.trim() === '' ? (
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-6">
                      Suggested Search Terms
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {['Structured Trench', 'Blazer', 'Fragrance', 'Calfskin Bag', 'Turtleneck', 'Footwear'].map(
                        (term) => (
                          <button
                            key={term}
                            onClick={() => setSearchQuery(term)}
                            className="px-4 py-2 bg-neutral-900 border border-neutral-850 hover:border-[#c9a96e] text-xs uppercase tracking-widest text-neutral-300 transition-all rounded-sm"
                          >
                            {term}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-6">
                      Results ({searchResults.length})
                    </h4>
                    {searchResults.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto pr-2">
                        {searchResults.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => handleSearchItemClick(product.slug)}
                            className="flex items-center space-x-4 p-3 bg-neutral-900/40 border border-neutral-900 hover:border-neutral-800 cursor-pointer transition-all duration-300"
                          >
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              referrerPolicy="no-referrer"
                              className="h-16 w-12 object-cover object-center bg-neutral-950"
                            />
                            <div>
                              <p className="text-[11px] uppercase tracking-widest text-[#c9a96e]">
                                {product.category}
                              </p>
                              <h5 className="font-serif text-sm mt-0.5 text-neutral-100 font-medium">
                                {product.name}
                              </h5>
                              <p className="text-xs text-neutral-400 mt-1">
                                ${product.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm font-sans text-neutral-600">
                        No creations matches the criteria. Try looking for 'Structured', 'Blazer', or 'Perfume'.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Mobile Dropdown Nav Menu Overlay --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-neutral-950/98 z-40 lg:hidden flex flex-col justify-center px-12 md:px-24"
          >
            <div className="flex flex-col space-y-8 font-serif text-2xl font-bold tracking-widest text-white">
              {[
                { label: 'Collections', route: '/collections' },
                { label: 'Lookbook Compilation', route: '/#lookbook' },
                { label: 'Brand Story', route: '/about' },
                { label: 'Contact Salon', route: '/contact' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (item.route.startsWith('/#')) {
                      navigateTo('/');
                      setTimeout(() => {
                        document.getElementById(item.route.substring(2))?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    } else {
                      navigateTo(item.route);
                    }
                  }}
                  className="text-left py-2 border-b border-neutral-900 border-opacity-40 flex items-center justify-between group outline-none"
                >
                  <span className="hover:text-[#c9a96e] transition-colors">{item.label}</span>
                  <ArrowRight className="h-5 w-5 text-[#c9a96e] opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0" />
                </button>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-neutral-900 flex flex-col space-y-4 font-sans">
              {user ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('/account');
                  }}
                  className="text-xs uppercase tracking-[0.2em] text-neutral-400 text-left"
                >
                  Dashboard ({user.fullName.split(' ')[0]})
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('/auth/login');
                  }}
                  className="text-xs uppercase tracking-[0.2em] text-neutral-400 text-left"
                >
                  Access Salon Account
                </button>
              )}
              <p className="text-[10px] uppercase tracking-widest text-neutral-600">
                Complimentary Shipping Applied
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
