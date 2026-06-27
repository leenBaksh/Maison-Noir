import React, { useEffect, useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import { Button } from '../ui/Button';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Cart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    promoCode,
    promoDiscount,
    applyPromoCode,
    removePromoCode,
    navigateTo
  } = useCartStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // Calculate pricing
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * promoDiscount) / 100);
  const shippingCharge = 0; // Complimentry signature shipping is the default
  const totalAmount = subtotal - discountAmount + shippingCharge;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const accepted = applyPromoCode(promoInput);
    if (accepted) {
      setPromoSuccess(true);
      setPromoError('');
      setPromoInput('');
    } else {
      setPromoError('LIAISON CODE NOT RECOGNIZED OR EXPIRED');
      setPromoSuccess(false);
    }
  };

  const handleRemovePromo = () => {
    removePromoCode();
    setPromoSuccess(false);
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen pt-32 pb-24 font-sans select-none animate-fadeIn">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <ScrollReveal>
          <div className="flex flex-col items-start mb-12">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#c9a96e] block mb-2">
              YOUR PRIVATE SELECTION
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight">
              Shopping Bag
            </h1>
          </div>
        </ScrollReveal>

        {cart.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-neutral-900 bg-neutral-950 py-24 px-6 text-center max-w-2xl mx-auto rounded flex flex-col items-center"
          >
            <ShoppingBag className="h-12 w-12 text-[#c9a96e] mb-6 stroke-1" />
            
            <h3 className="font-serif text-2xl font-medium mb-3">
              Your Bag is Empty
            </h3>
            
            <p className="text-xs md:text-sm text-neutral-400 font-light leading-relaxed max-w-md mb-8">
              You have not reserved any Maison Noir garments yet. Return to the showroom archives to discover original seasonal tailoring.
            </p>
            
            <Button variant="gold" onClick={() => navigateTo('/collections')}>
              Explore Showroom
            </Button>
          </motion.div>
        ) : (
          /* Active Cart Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
            
            {/* Left Frame: Selected items list (Covers 8 out of 12 columns) */}
            <div className="lg:col-span-8 flex flex-col space-y-6">
              
              <div className="hidden md:grid grid-cols-12 pb-4 border-b border-neutral-900 text-[10px] uppercase tracking-widest text-[#c9a96e] font-semibold">
                <div className="col-span-6">Creation / Description</div>
                <div className="col-span-2 text-center">Amount</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Aggregate</div>
              </div>

              <div className="divide-y divide-neutral-900">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="py-6 grid grid-cols-1 md:grid-cols-12 items-center gap-4 border-neutral-900"
                    >
                      {/* Image + info */}
                      <div className="col-span-1 md:col-span-6 flex items-center space-x-4">
                        <div
                          onClick={() => navigateTo(`/product/${item.product.slug}`)}
                          className="h-28 w-22 bg-neutral-900 border border-neutral-900 hover:border-neutral-700 transition-colors overflow-hidden rounded flex-shrink-0 cursor-pointer"
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-center"
                          />
                        </div>

                        <div className="space-y-1.5 flex flex-col">
                          <p onClick={() => navigateTo(`/product/${item.product.slug}`)}
                             className="font-serif text-sm font-medium hover:text-[#c9a96e] transition-colors cursor-pointer text-neutral-100">
                            {item.product.name}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 text-[10px] uppercase font-mono tracking-widest text-neutral-400">
                            <span className="flex items-center space-x-1">
                              <span>Color:</span>
                              <strong>{item.selectedColor.name}</strong>
                              <span
                                style={{ backgroundColor: item.selectedColor.hex }}
                                className="h-2.5 w-2.5 rounded-full inline-block border border-neutral-800 ml-1.5"
                              />
                            </span>
                            <span>✦</span>
                            <span>Size: <strong>{item.selectedSize}</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Single Price (mobile show helper) */}
                      <div className="col-span-1 md:col-span-2 text-left md:text-center">
                        <span className="md:hidden text-[10px] text-neutral-500 uppercase font-mono tracking-widest block mb-0.5">Price</span>
                        <p className="text-xs font-mono font-medium">${item.product.price.toLocaleString()}</p>
                      </div>

                      {/* Quantity Selector Ticker */}
                      <div className="col-span-1 md:col-span-2 flex items-center justify-start md:justify-center">
                        <div className="flex items-center border border-neutral-850 rounded bg-neutral-900/40 w-24 py-1.5 px-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-neutral-500 hover:text-white font-sans text-xs flex-shrink-0"
                          >
                            -
                          </button>
                          <span className="font-mono text-xs text-neutral-200 mx-auto select-none font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-neutral-500 hover:text-white font-sans text-xs flex-shrink-0"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Line Item Total Aggregate Price */}
                      <div className="col-span-1 md:col-span-2 text-left md:text-right flex items-center justify-between md:justify-end">
                        <div className="md:hidden">
                          <span className="text-[10px] text-neutral-500 uppercase font-mono tracking-widest block">Subtotal</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="font-mono text-sm font-semibold text-neutral-100">
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </span>
                          
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 hover:bg-neutral-900 rounded text-neutral-500 hover:text-red-500 transition-colors"
                            title="Remove creation from bag"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Continue Shopping button */}
              <div className="pt-6">
                <button
                  onClick={() => navigateTo('/collections')}
                  className="group flex items-center space-x-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
                  <span>Resume Shopping Archive</span>
                </button>
              </div>

            </div>

            {/* Right Frame: Order Summary Sidebar (Covers 4 out of 12 columns) */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 bg-neutral-900/30 p-8 border border-neutral-900 rounded space-y-6 flex flex-col shadow-xl">
              <h3 className="font-serif text-lg font-medium tracking-wide text-neutral-200 border-b border-neutral-900 pb-3 uppercase tracking-[0.1em]">
                Order Invoice
              </h3>

              <div className="space-y-4 text-xs font-sans">
                
                {/* Invoice items */}
                <div className="flex justify-between items-center text-neutral-400">
                  <span>Bag Subtotal</span>
                  <span className="font-mono text-neutral-200">${subtotal.toLocaleString()}</span>
                </div>

                {promoDiscount > 0 && (
                  <div className="flex justify-between items-center text-green-500">
                    <span>Liaison Discount ({promoDiscount}%)</span>
                    <span className="font-mono">-${discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-neutral-400">
                  <span>White Glove Delivery</span>
                  <span className="font-mono text-green-500 uppercase tracking-widest font-semibold text-[10px]">COMPLIMENTARY</span>
                </div>

                <div className="border-t border-neutral-900 my-4" />

                <div className="flex justify-between items-baseline text-white">
                  <span className="text-sm font-medium uppercase tracking-widest">Aggregate Total</span>
                  <span className="font-serif text-xl font-semibold text-[#c9a96e]">
                    ${totalAmount.toLocaleString()} USD
                  </span>
                </div>
              </div>

              <div className="border-t border-neutral-900 pt-4" />

              {/* Promo Code Input Field */}
              <form onSubmit={handleApplyPromo} className="space-y-3">
                <label className="block text-[10px] uppercase font-mono tracking-widest text-[#c9a96e] font-semibold">
                  Promo / Liaison Code
                </label>
                
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      setPromoError('');
                    }}
                    placeholder="e.g. VIP20 or WELCOME10"
                    disabled={!!promoCode}
                    className="w-full bg-neutral-950 border border-neutral-850 rounded px-3 py-2 text-xs uppercase font-mono text-white placeholder-neutral-700 outline-none focus:border-[#c9a96e] disabled:opacity-40"
                  />
                  
                  {!promoCode ? (
                    <Button
                      variant="outline"
                      type="submit"
                      className="!px-4 !py-2 shrink-0 border-neutral-800"
                    >
                      Apply
                    </Button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleRemovePromo}
                      className="text-red-500 hover:text-white text-xs font-semibold px-2 uppercase font-mono tracking-widest"
                    >
                      CLEAR
                    </button>
                  )}
                </div>

                {promoError && (
                  <p className="text-[9px] uppercase tracking-widest text-red-500">{promoError}</p>
                )}
                {promoCode && (
                  <p className="text-[9px] uppercase tracking-widest text-green-500">
                    LIAISON CODE: {promoCode} APPLIED SUCCESSFULLY
                  </p>
                )}
              </form>

              <div className="pt-4 flex flex-col">
                <Button
                  variant="gold"
                  size="lg"
                  onClick={() => navigateTo('/checkout')}
                  className="w-full flex items-center justify-center space-x-2 group text-glow-light"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" />
                </Button>
                
                <p className="text-center text-[9px] text-neutral-500 uppercase tracking-widest mt-4 font-light">
                  Transactions encrypted via SSL with dedicated private routing.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
