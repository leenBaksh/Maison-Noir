import React, { useEffect } from 'react';
import { useCartStore } from '../../store/cartStore';
import { Button } from '../ui/Button';
import { ScrollReveal } from '../ui/ScrollReveal';
import { LogOut, Shirt, Award, User, Clock, CheckCircle, Package } from 'lucide-react';

export const Account: React.FC = () => {
  const { user, orders: cloudOrders, logout, navigateTo } = useCartStore();
  const orders = cloudOrders && cloudOrders.length > 0 ? cloudOrders : (user?.orders || []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (!user) {
      navigateTo('/auth/login');
    }
  }, [user]);

  if (!user) return null;

  const handleSignOut = () => {
    logout();
    navigateTo('/');
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen pt-32 pb-24 font-sans select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Title */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 border-b border-neutral-900 pb-10">
            <div className="flex flex-col space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#c9a96e] block font-semibold">
                PRIVATE CLIENT SERVICES
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-mono tracking-tight font-semibold">
                Client Profile
              </h1>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="flex items-center space-x-2 border-neutral-800 hover:border-red-500/40 hover:text-red-500"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Disconnect Client Session</span>
            </Button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Personal Metadata Card (Covers 4 out of 12 columns) */}
          <div className="lg:col-span-4 bg-neutral-900/15 border border-neutral-900 p-8 rounded space-y-6 shadow-inner">
            <div className="flex items-center space-x-4">
              <div className="h-14 w-14 bg-neutral-900 border border-neutral-850 rounded-full flex items-center justify-center text-[#c9a96e] shadow">
                <User className="h-6 w-6 stroke-[1.25]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-white">{user.fullName}</h3>
                <p className="text-[10px] text-neutral-500 font-mono tracking-wider">{user.email}</p>
              </div>
            </div>

            <div className="border-t border-neutral-900 pt-6 space-y-4 font-sans">
              
              {/* Platinum Tier Card */}
              <div className="flex items-center space-x-3 text-xs bg-neutral-950 border border-neutral-900 p-4 rounded text-neutral-300">
                <Award className="h-4.5 w-4.5 text-[#c9a96e] shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#c9a96e]">
                    Atelier Member Tier
                  </span>
                  <span className="text-white text-xs font-semibold mt-0.5">VIP PLATINUM CLIENT</span>
                </div>
              </div>

              <div className="flex justify-between text-xs py-1 border-b border-neutral-900 text-neutral-400">
                <span>Account Created</span>
                <span className="font-mono text-neutral-200">{user.joinedDate}</span>
              </div>

              <div className="flex justify-between text-xs py-1 border-b border-neutral-900 text-neutral-400">
                <span>Liaison Cleared ID</span>
                <span className="font-mono text-neutral-200 uppercase">MN-VIP-90021</span>
              </div>

              <div className="flex justify-between text-xs py-1 text-neutral-400">
                <span>Showroom Bookings</span>
                <span className="font-bold text-green-500 uppercase tracking-widest text-[9px]">ACTIVE INQUIRIES</span>
              </div>
            </div>
          </div>

          {/* Right Column: Historical orders layout (Covers 8 out of 12 columns) */}
          <div className="lg:col-span-8 space-y-8 flex flex-col">
            <h2 className="font-serif text-xl font-medium tracking-wide text-neutral-200 border-b border-neutral-900 pb-3 uppercase tracking-[0.1em]">
               Archival Order History ({orders.length})
             </h2>
 
             {orders.length === 0 ? (
               <div className="border border-neutral-900 py-16 text-center rounded bg-neutral-900/10">
                 <Package className="h-10 w-10 text-neutral-600 mb-4 mx-auto stroke-1" />
                 <p className="text-xs text-neutral-400 uppercase tracking-widest">
                   No orders registered under this client log.
                 </p>
                 <Button variant="outline" onClick={() => navigateTo('/collections')} className="mt-6">
                   Explore Tailoring Archive
                 </Button>
               </div>
             ) : (
               <div className="space-y-8">
                 {orders.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="border border-neutral-900 bg-neutral-900/20 p-6 md:p-8 rounded shadow-lg space-y-6"
                  >
                    {/* Invoice header metadata */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                        <div>
                          <span className="text-[10px] uppercase text-neutral-500 block">Invoice Code</span>
                          <span className="font-mono font-semibold text-[#c9a96e] block">{invoice.id}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-neutral-500 block">Authorized Date</span>
                          <span className="font-mono text-neutral-300 block">{invoice.date}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-neutral-500 block">Total Amount</span>
                          <span className="font-mono text-neutral-300 block font-semibold">${invoice.total.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-neutral-500 block">Courier Status</span>
                          <span className="inline-flex items-center space-x-1.5 mt-0.5 text-xs text-green-500 bg-green-500/5 px-2 py-0.5 border border-green-500/10 rounded-sm">
                            <CheckCircle className="h-3 w-3" />
                            <span className="text-[9px] uppercase tracking-wider font-bold">{invoice.status}</span>
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => alert(`Liaison invoice ${invoice.id} has been printed to logs.`)}
                        className="self-start md:self-center border-neutral-850 py-2.5 px-4"
                      >
                        Print Invoice
                      </Button>
                    </div>

                    {/* Invoice items lists */}
                    <div className="divide-y divide-neutral-900">
                      {invoice.items.map((line) => (
                        <div key={line.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={line.product.images[0]}
                              alt={line.product.name}
                              referrerPolicy="no-referrer"
                              className="h-16 w-12 object-cover object-center bg-neutral-950 border border-neutral-900 flex-shrink-0"
                            />
                            <div>
                              <h4 className="font-serif text-sm font-medium text-neutral-100">
                                {line.product.name}
                              </h4>
                              <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 mt-1">
                                Color: {line.selectedColor.name} // Size: {line.selectedSize} // Qty: {line.quantity}
                              </p>
                            </div>
                          </div>
                          
                          <span className="font-mono text-xs font-semibold text-neutral-300">
                            ${(line.product.price * line.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Delivery specifications */}
                    <div className="pt-4 border-t border-neutral-900 flex flex-col md:flex-row items-start justify-between text-neutral-500 text-xs gap-4 font-light">
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase tracking-wider text-neutral-600 block">Salon Ship Destination</span>
                        <span className="text-neutral-400 font-sans block">
                          {invoice.shippingAddress.fullName} — {invoice.shippingAddress.address}, {invoice.shippingAddress.city}, {invoice.shippingAddress.zipCode}, {invoice.shippingAddress.country}
                        </span>
                      </div>
                      <div className="space-y-1 md:text-right">
                        <span className="text-[9px] uppercase tracking-wider text-neutral-600 block">Payment Credentials Used</span>
                        <span className="text-neutral-400 font-mono block">
                          {invoice.paymentMethod}
                        </span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
