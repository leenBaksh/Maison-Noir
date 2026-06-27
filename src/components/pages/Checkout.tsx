import React, { useEffect, useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ScrollReveal } from '../ui/ScrollReveal';
import { CheckCircle2, ArrowLeft, CreditCard, Sparkles, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Order } from '../../types';

export const Checkout: React.FC = () => {
  const {
    cart,
    promoCode,
    promoDiscount,
    clearCart,
    navigateTo,
    user,
    addOrder,
    idToken,
    placeOrder
  } = useCartStore();

  // Basic form fields matching user constraints
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState('12 Avenue Montaigne');
  const [city, setCity] = useState('Paris');
  const [zipCode, setZipCode] = useState('75008');
  const [country, setCountry] = useState('France');

  // Dummy credit card configurations
  const [cardNumber, setCardNumber] = useState('4000 1234 5678 9010');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvv, setCardCvv] = useState('020');

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (cart.length === 0 && !isOrdered) {
      navigateTo('/cart');
    }
  }, [cart, isOrdered]);

  // Order invoice calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * promoDiscount) / 100);
  const shippingCharge = 0;
  const totalAmount = subtotal - discountAmount + shippingCharge;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = 'Full name is required';
    if (!email.trim() || !email.includes('@')) errors.email = 'Valid liaison email is required';
    if (!address.trim()) errors.address = 'Salon delivery address is required';
    if (!city.trim()) errors.city = 'City is required';
    if (!zipCode.trim()) errors.zipCode = 'ZIP / Postal code is required';
    
    // Simple credit card checks
    if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length < 16) {
      errors.cardNumber = 'Valid 16-digit credit credentials are required';
    }
    if (!cardExpiry.trim()) errors.cardExpiry = 'Required';
    if (!cardCvv.trim() || cardCvv.length < 3) errors.cardCvv = 'Required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Scroll to first error or top
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    setFormErrors({});

    if (idToken) {
      placeOrder({
        fullName,
        email,
        address,
        city,
        zipCode,
        country,
        notes: `Card Number: Ending with ${cardNumber.slice(-4)}`
      }).then((order) => {
        setOrderId(order.skuCode || order.id);
        setIsOrdered(true);
      }).catch((err) => {
        setFormErrors({ submit: err.message || "Failed to submit order." });
      });
      return;
    }
    
    // Generate secure invoice number
    const uniqueOrderCode = `MN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(uniqueOrderCode);
    
    // Create new order log
    const newOrder: Order = {
      id: uniqueOrderCode,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      items: [...cart],
      subtotal,
      shipping: shippingCharge,
      discount: discountAmount,
      total: totalAmount,
      shippingAddress: {
        fullName,
        email,
        address,
        city,
        zipCode,
        country
      },
      paymentMethod: `Visa (ending in ${cardNumber.slice(-4)})`
    };

    // Save order status in Zustand and flush cart
    addOrder(newOrder);
    setIsOrdered(true);
    clearCart();
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen pt-32 pb-24 font-sans select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <AnimatePresence mode="wait">
          {!isOrdered ? (
            /* Active checkout view */
            <motion.div
              key="checkout-active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                onClick={() => navigateTo('/cart')}
                className="group flex items-center space-x-2 text-xs uppercase tracking-widest text-[#c9a96e] hover:text-white transition-colors mb-10 cursor-pointer outline-none"
              >
                <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
                <span>Return to Bag Selection</span>
              </button>

              <div className="flex flex-col items-start mb-12">
                <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#c9a96e] block mb-2">
                  SECURE SALON CHECKOUT
                </span>
                <h1 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
                  Checkout Invoice
                </h1>
              </div>

              <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left block billing fields (Covers 7 out of 12 columns) */}
                <div className="lg:col-span-7 space-y-10">
                  
                  {/* Delivery Location section */}
                  <div className="space-y-6">
                    <h3 className="font-serif text-lg font-medium text-neutral-200 border-b border-neutral-900 pb-3 uppercase tracking-[0.1em]">
                      01 // Private Delivery Address
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Full Legal Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        error={formErrors.fullName}
                      />
                      <Input
                        label="Private Liaison Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={formErrors.email}
                      />
                    </div>

                    <Input
                      label="Physical Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      error={formErrors.address}
                    />

                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-2">
                        <Input
                          label="City"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          error={formErrors.city}
                        />
                      </div>
                      <Input
                        label="Postal Code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        error={formErrors.zipCode}
                      />
                    </div>

                    <Input
                      label="Country / Region"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>

                  {/* Payment Credentials section */}
                  <div className="space-y-6 pt-4">
                    <h3 className="font-serif text-lg font-medium text-neutral-200 border-b border-neutral-900 pb-3 uppercase tracking-[0.1em]">
                      02 // Payment Details
                    </h3>

                    <div className="bg-neutral-900/35 border border-neutral-900/80 p-6 space-y-4 rounded shadow-inner">
                      <div className="flex items-center space-x-3 text-neutral-400 pb-2">
                        <CreditCard className="h-4 w-4 text-[#c9a96e]" />
                        <span className="text-[10px] uppercase tracking-widest font-mono">Secure Credit Credentials</span>
                      </div>

                      <Input
                        label="Cardholder Number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        error={formErrors.cardNumber}
                        placeholder="4000 1234 5678 9010"
                      />

                      <div className="grid grid-cols-2 gap-6">
                        <Input
                          label="Expiration (MM/YY)"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          error={formErrors.cardExpiry}
                          placeholder="MM/YY"
                        />
                        <Input
                          label="CVV Code"
                          type="password"
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          error={formErrors.cardCvv}
                          placeholder="000"
                        />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right block Invoice summary sidebar (Covers 5 out of 12 columns) */}
                <div className="lg:col-span-5 bg-neutral-900/30 p-8 border border-neutral-900 rounded space-y-6 flex flex-col shadow-xl">
                  
                  <h3 className="font-serif text-lg font-medium tracking-wide text-neutral-200 border-b border-neutral-900 pb-3 uppercase tracking-[0.1em]">
                    Order Summary
                  </h3>

                  {/* List of Cart Items */}
                  <div className="divide-y divide-neutral-900 max-h-[290px] overflow-y-auto pr-2">
                    {cart.map((item) => (
                      <div key={item.id} className="py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            className="h-14 w-10 object-cover bg-neutral-950"
                          />
                          <div>
                            <p className="font-serif text-xs font-medium text-neutral-200">
                              {item.product.name}
                            </p>
                            <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 mt-0.5">
                              {item.selectedColor.name} // {item.selectedSize} // Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-mono text-xs text-neutral-300">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-neutral-900 pt-6 space-y-3 text-xs font-sans">
                    <div className="flex justify-between text-neutral-400">
                      <span>Products Subtotal</span>
                      <span className="font-mono text-neutral-200">${subtotal.toLocaleString()}</span>
                    </div>

                    {promoDiscount > 0 && (
                      <div className="flex justify-between text-green-500">
                        <span>Liaison Discount ({promoDiscount}%)</span>
                        <span className="font-mono">-${discountAmount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-neutral-400">
                      <span>White Glove Courier</span>
                      <span className="text-green-500 uppercase font-mono tracking-widest text-[9px] font-bold">COMPLIMENTARY</span>
                    </div>

                    <div className="border-t border-neutral-900 my-3" />

                    <div className="flex justify-between items-baseline text-white">
                      <span className="text-xs uppercase tracking-widest font-semibold text-[#c9a96e]">Total Invoice</span>
                      <span className="font-serif text-2xl font-bold text-[#c9a96e]">
                        ${totalAmount.toLocaleString()} USD
                      </span>
                    </div>
                  </div>

                  {formErrors.submit && (
                    <p className="text-[10px] uppercase font-mono tracking-widest text-[#c9a96e] text-center pb-2 bg-red-500/10 py-1.5 border border-red-500/20 rounded-sm">
                      {formErrors.submit}
                    </p>
                  )}

                  <div className="pt-4">
                    <Button
                      variant="gold"
                      size="lg"
                      type="submit"
                      className="w-full text-glow-light"
                    >
                      Authorize Secure Order
                    </Button>
                    <p className="text-center text-[9px] text-neutral-500 uppercase tracking-widest mt-4">
                      Pressing authorize completes your mock purchase invoice securely.
                    </p>
                  </div>

                </div>

              </form>
            </motion.div>
          ) : (
            /* Checkout Success Splash Page */
            <motion.div
              key="checkout-success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center border border-neutral-900 bg-neutral-950 py-24 px-8 rounded shadow-2xl flex flex-col items-center select-none"
            >
              <CheckCircle2 className="h-14 w-14 text-[#c9a96e] mb-6 stroke-1 animate-pulse" />
              
              <p className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#c9a96e] mb-2 font-semibold">
                SALON SECURE CLEARANCE
              </p>
              
              <h1 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-white mb-3">
                Order Registered
              </h1>

              <div className="bg-neutral-900/40 p-4 border border-neutral-850 rounded w-full max-w-sm flex flex-col items-center space-y-1 mt-6 mb-8">
                <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-sans">
                  Private Invoice Code
                </span>
                <span className="font-mono text-base font-bold tracking-widest text-white">
                  {orderId}
                </span>
                <span className="text-[9px] text-neutral-400 mt-1 uppercase tracking-wider font-light">
                  A certification details has been dispatched to {email}.
                </span>
              </div>

              <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-sans font-light max-w-md mb-8">
                Your luxury garments have been reserved in the Paris atelier archives and are being packaged in our signature cedar wood hanger boxes. Tracking references will ignite once leaves the salon.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                <Button
                  variant="gold"
                  onClick={() => navigateTo('/account')}
                  className="w-full sm:w-auto h-12"
                >
                  View Client Dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigateTo('/')}
                  className="w-full sm:w-auto h-12"
                >
                  Return to Zenith
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
