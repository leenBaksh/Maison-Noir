import React, { useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Button } from '../ui/Button';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid luxury liaison email.');
      return;
    }
    setErrorMsg('');
    setIsSubmitted(true);
  };

  return (
    <section className="bg-neutral-950 text-white py-28 px-6 md:px-12 border-b border-neutral-900 select-none">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
        
        <ScrollReveal>
          <div className="flex items-center justify-center space-x-1.5 mb-6 text-[#c9a96e]">
            <span className="h-[1px] w-5 bg-[#c9a96e]" />
            <span className="text-[10px] uppercase tracking-[0.35em] font-medium font-sans">
              PRIVATE EXCLUSIVE ACCESS
            </span>
            <span className="h-[1px] w-5 bg-[#c9a96e]" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Join the Inner Circle
          </h2>
          <p className="text-xs md:text-sm text-neutral-400 font-sans font-light leading-relaxed max-w-lg mx-auto mb-12">
            Be the first to discover new collections, private brand sales, lookbook releases, and invitations to showroom events in Paris and Milan.
          </p>
        </ScrollReveal>

        {/* Form container with nice fade transitions */}
        <ScrollReveal delay={0.3}>
          <div className="w-full max-w-md bg-neutral-900/30 border border-neutral-900 p-8 md:p-10 rounded shadow-2xl">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubscribe}
                  className="flex flex-col space-y-6"
                >
                  <div className="relative font-sans text-left">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full bg-transparent border-b border-neutral-800 focus:border-[#c9a96e] py-3 text-sm text-white focus:outline-none transition-colors duration-300 placeholder-neutral-700"
                    />
                    {errorMsg && (
                      <p className="absolute bottom-[-22px] left-0 text-[9px] uppercase tracking-widest text-red-500">
                        {errorMsg}
                      </p>
                    )}
                  </div>

                  <Button
                    variant="solid"
                    type="submit"
                    className="w-full tracking-[0.25em] !py-4 text-glow-light"
                  >
                    Subscribe
                  </Button>

                  <p className="text-[9px] uppercase tracking-[0.15em] text-neutral-600">
                    Your confidentiality is guaranteed. Unsubscribe anytime.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-4"
                >
                  <CheckCircle2 className="h-10 w-10 text-[#c9a96e] mb-4" />
                  
                  <h4 className="font-serif text-xl font-medium text-white mb-2">
                    Access Granted
                  </h4>
                  
                  <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed mb-6 max-w-xs">
                    Your luxurious liaison with Maison Noir is now established. Welcome to the core circle.
                  </p>

                  <div className="bg-neutral-950 p-4 border border-dashed border-[#c9a96e]/30 rounded w-full flex flex-col items-center justify-center space-y-1">
                    <span className="text-[9px] uppercase tracking-[0.15em] text-neutral-500 font-sans">
                      Your Welcome Invitation Code
                    </span>
                    <span className="font-mono text-base font-semibold tracking-widest text-[#c9a96e]">
                      WELCOME10
                    </span>
                    <span className="text-[9px] font-sans text-neutral-400">
                      (Apply code at checkout for 10% off your purchase)
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
