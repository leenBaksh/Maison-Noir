import React, { useEffect, useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Mail, Phone, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showroom, setShowroom] = useState('Paris (Place Vendôme)');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const [isBooked, setIsBooked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setErrorMsg('Please enter your full name and luxury liaison email address.');
      return;
    }
    setErrorMsg('');
    setIsBooked(true);
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen pt-32 pb-24 font-sans select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Title */}
        <ScrollReveal>
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#c9a96e]">
              PRIVATE CLIENT SERVICES
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
              Contact Private Salon
            </h1>
            <div className="h-0.5 w-12 bg-neutral-800 my-2" />
            <p className="text-xs md:text-sm text-neutral-400 font-light leading-relaxed">
              Arrange a private fitting consultation at our salons, check custom garment availability, or contact our global client concierge.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Direct Address cards (Covers 5 out of 12 columns) */}
          <div className="lg:col-span-5 space-y-10 flex flex-col">
            
            {/* Showrooms address panel */}
            <div className="space-y-6">
              <h3 className="font-serif text-lg font-medium text-neutral-200 border-b border-neutral-900 pb-3 uppercase tracking-[0.1em]">
                Maison Salons
              </h3>

              {/* Atelier Paris */}
              <div className="p-6 bg-neutral-900/15 border border-neutral-900 rounded space-y-3">
                <p className="text-[10px] uppercase font-mono tracking-widest text-[#c9a96e] font-semibold">
                  Paris HQ Showroom
                </p>
                <h4 className="font-serif text-base text-white font-medium">Place Vendôme Salon</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  15 Place Vendôme, 75001 Paris, France <br />
                  Fittings scheduled by prior liaison invitation only.
                </p>
                <div className="flex items-center space-x-2 text-[11px] text-neutral-500 pt-1">
                  <MapPin className="h-3 w-3 text-[#c9a96e]" />
                  <span>Métro: Concorde // Opéra</span>
                </div>
              </div>

              {/* Atelier Milano */}
              <div className="p-6 bg-neutral-900/15 border border-neutral-900 rounded space-y-3">
                <p className="text-[10px] uppercase font-mono tracking-widest text-[#c9a96e] font-semibold">
                  Milan Showroom
                </p>
                <h4 className="font-serif text-base text-white font-medium">Via Montenapoleone Salon</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  24 Via Monte Napoleone, 20121 Milano, Italy <br />
                  Private chambers by prior arrangement.
                </p>
                <div className="flex items-center space-x-2 text-[11px] text-neutral-500 pt-1">
                  <MapPin className="h-3 w-3 text-[#c9a96e]" />
                  <span>Metro: Montenapoleone</span>
                </div>
              </div>
            </div>

            {/* Direct liaison contact details */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-medium text-neutral-200 border-b border-neutral-900 pb-3 uppercase tracking-[0.1em]">
                Liaison Channels
              </h3>
              
              <div className="flex items-center space-x-3 text-xs text-neutral-300">
                <Phone className="h-3.5 w-3.5 text-[#c9a96e]" />
                <span className="font-mono">+33 1 42 60 30 00 (English & French)</span>
              </div>

              <div className="flex items-center space-x-3 text-xs text-neutral-300">
                <Mail className="h-3.5 w-3.5 text-[#c9a96e] -translate-y-0.5" />
                <span className="font-mono">concierge@maisonnoir.vip</span>
              </div>

              <div className="flex items-center space-x-3 text-xs text-neutral-300">
                <Clock className="h-3.5 w-3.5 text-[#c9a96e] -translate-y-0.5" />
                <span className="font-sans font-light">Mon – Sat // 10:00 to 19:00 CET</span>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic submission/booking form (Covers 7 out of 12 columns) */}
          <div className="lg:col-span-7 bg-neutral-900/20 p-8 md:p-10 border border-neutral-900 rounded shadow-2xl">
            <AnimatePresence mode="wait">
              {!isBooked ? (
                <motion.form
                  key="booking-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleBookAppointment}
                  className="space-y-6"
                >
                  <h3 className="font-serif text-lg font-medium text-neutral-200 border-b border-neutral-900 pb-3 uppercase tracking-[0.1em]">
                    Arrange Showroom Appointment
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Your Legal Name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrorMsg('');
                      }}
                      placeholder="e.g. Christian Dior"
                    />
                    <Input
                      label="Liaison Email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrorMsg('');
                      }}
                      placeholder="client@noir.vip"
                    />
                  </div>

                  {/* Showroom venue selector */}
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                      Showroom Target Venue
                    </label>
                    <select
                      value={showroom}
                      onChange={(e) => setShowroom(e.target.value)}
                      className="w-full bg-neutral-950 border-b border-neutral-800 py-3 text-sm text-white focus:outline-none focus:border-[#c9a96e] transition-colors duration-300 font-sans"
                    >
                      <option value="Paris (Place Vendôme)">Paris (Place Vendôme Salon)</option>
                      <option value="Milano (Via Montenapoleone)">Milano (Via Montenapoleone Salon)</option>
                    </select>
                  </div>

                  <Input
                    label="Requested Booking Date (Optional)"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />

                  {/* Rich layout message */}
                  <div className="space-y-2 font-sans">
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                      Inquire details or sizing preferences
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe preferred silhouettes, required sizing, or physical fitting goals..."
                      className="w-full bg-transparent border-b border-neutral-800 py-3 text-sm text-white placeholder-neutral-700 focus:outline-none focus:border-[#c9a96e] transition-colors duration-300 resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-[10px] uppercase tracking-widest text-red-500">{errorMsg}</p>
                  )}

                  <Button
                    variant="gold"
                    size="lg"
                    type="submit"
                    className="w-full text-glow-light"
                  >
                    Submit Salon Appointment
                  </Button>
                </motion.form>
              ) : (
                /* Success Dialog */
                <motion.div
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 flex flex-col items-center"
                >
                  <CheckCircle2 className="h-12 w-12 text-[#c9a96e] mb-6 stroke-1 animate-pulse" />
                  
                  <h3 className="font-serif text-2xl font-medium text-white mb-2">
                    Liaison Registered
                  </h3>
                  
                  <p className="text-xs text-[#c9a96e] uppercase tracking-widest font-mono font-bold mb-4">
                    SALON VENUE: {showroom.toUpperCase()}
                  </p>

                  <p className="text-sm text-neutral-400 font-sans font-light leading-relaxed max-w-sm mb-6">
                    Maison Noir's private concierge will contact your liaison email ({email}) within the hour to formally certify and confirm your private showroom fitting. Thank you for your elegance.
                  </p>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setName('');
                      setEmail('');
                      setMessage('');
                      setDate('');
                      setIsBooked(false);
                    }}
                  >
                    Submit Another Inquiry
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
};
