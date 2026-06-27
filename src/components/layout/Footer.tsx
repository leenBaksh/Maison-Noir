import React from 'react';
import { useCartStore } from '../../store/cartStore';
import { Instagram, Twitter, Facebook, ArrowUp, Link } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useCartStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 font-sans border-t border-neutral-900 pt-24 pb-12 px-6 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
          
          {/* Column 1: Brand details */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <button
              onClick={() => navigateTo('/')}
              className="font-serif text-white text-xl tracking-[0.25em] text-left outline-none"
            >
              MAISON NOIR
            </button>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-sm">
              Established as an international haven of moody, deconstructed structuralism. We design timeless garments crafted to outwear seasonal cycles. Born in midnight inspirations, worn under raw Parisian starlight.
            </p>
            <div className="flex space-x-4 pt-2">
              {[
                { icon: <Instagram className="h-4 w-4" />, href: 'https://instagram.com/maisonnoir' },
                { icon: <Twitter className="h-4 w-4" />, href: 'https://twitter.com/maisonnoir' },
                { icon: <Facebook className="h-4 w-4" />, href: 'https://facebook.com/maisonnoir' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 hover:bg-neutral-900 rounded-full flex items-center justify-center border border-neutral-900 hover:border-neutral-750 transition-colors hover:text-[#c9a96e]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Shop links */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white font-medium">Collections</h4>
            <ul className="space-y-3.5 text-xs">
              {[
                { label: "La Nuit Autumn", slug: "la-nuit" },
                { label: "The Avant-Garde", slug: "avant-garde" },
                { label: "Les Accessoires", slug: "les-accessoires" },
                { label: "L'Essence Fragrances", slug: "l-essence" }
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navigateTo(`/collections/${item.slug}`)}
                    className="hover:text-[#c9a96e] transition-colors outline-none text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company links */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white font-medium">The House</h4>
            <ul className="space-y-3.5 text-xs">
              {[
                { label: 'Brand Story', route: '/about' },
                { label: 'Sustainable Sourcing', route: '/about' },
                { label: 'Atelier Careers', route: '/contact' },
                { label: 'Press Editorial', route: '/#press' },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => {
                      if (item.route.startsWith('/#')) {
                        navigateTo('/');
                        setTimeout(() => {
                          document.getElementById(item.route.substring(2))?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      } else {
                        navigateTo(item.route);
                      }
                    }}
                    className="hover:text-[#c9a96e] transition-colors outline-none text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Help / Client Concierge */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white font-medium">Concierge</h4>
            <ul className="space-y-3.5 text-xs">
              {[
                { label: 'Private Fitting Salon', route: '/contact' },
                { label: 'Complimentary Shipping & Returns', route: '/contact' },
                { label: 'Luxury Garment Care Instructions', route: '/about' },
                { label: 'Private Client FAQ', route: '/contact' },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navigateTo(item.route)}
                    className="hover:text-[#c9a96e] transition-colors outline-none text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Separator */}
        <div className="border-t border-neutral-900 pt-10 pb-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-8 text-[11px] text-neutral-500 font-light">
            <span>© 2026 MAISON NOIR. All silhouettes registered.</span>
            <div className="flex space-x-4">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <span>✦</span>
              <a href="#terms" className="hover:text-white transition-colors">Terms of Use</a>
              <span>✦</span>
              <a href="#cookies" className="hover:text-white transition-colors">Cookie Settings</a>
            </div>
          </div>

          {/* Styled monochrome payment support icons */}
          <div className="flex items-center space-x-4 filter grayscale brightness-50 contrast-150">
            {['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'PayPal'].map((pName) => (
              <span
                key={pName}
                className="text-[9px] font-mono tracking-widest border border-neutral-800 px-2 py-1 uppercase rounded-sm cursor-default select-none hover:border-neutral-600 transition-colors"
                title={`${pName} Secure Payment`}
              >
                {pName}
              </span>
            ))}
          </div>

          {/* Scroll block top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-[#c9a96e] hover:text-white transition-colors border-b border-dashed border-[#c9a96e] pb-1 cursor-pointer outline-none"
          >
            <span>Back to Zenith</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
