import React, { useState, useEffect } from 'react';
import { useCartStore } from '../../store/cartStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Chrome, KeyRound, LogIn, Sparkles } from 'lucide-react';

export const Login: React.FC = () => {
  const { login, user, navigateTo } = useCartStore();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('••••••••••••');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // If user already authenticated, redirect
  useEffect(() => {
    if (user) {
      navigateTo('/account');
    }
  }, [user]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const { auth, googleAuthProvider, signInWithPopup } = await import('../../lib/firebase.ts');
      await signInWithPopup(auth, googleAuthProvider);
      navigateTo('/account');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to authenticate with Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please supply a valid private liaison email address.');
      return;
    }
    const derivedName = name.trim() || 'Alexander Mercer';
    setErrorMsg('');
    login(email, derivedName);
    navigateTo('/account');
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen pt-32 pb-24 font-sans select-none flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        
        <ScrollReveal>
          <div className="border border-neutral-900 bg-neutral-900/10 p-8 md:p-10 rounded shadow-2xl flex flex-col space-y-8">
            
            <div className="text-center space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#c9a96e] font-semibold">
                SECURE PRIVATE ACCESS
              </span>
              <h1 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-white">
                Maison Client Log
              </h1>
              <p className="text-[11px] text-neutral-500 font-sans tracking-widest uppercase">
                Access your private orders and salon schedules
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900 hover:border-neutral-700 rounded transition-all text-xs font-mono uppercase tracking-widest outline-none disabled:opacity-50"
              >
                <Chrome size={14} className="text-[#c9a96e]" />
                <span>{loading ? 'Decrypting Salon...' : 'Sign in with Google Portal'}</span>
              </button>
              
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-neutral-900"></div>
                <span className="flex-shrink mx-4 text-[9px] uppercase tracking-widest text-neutral-600 font-mono">Or Liaison Bypass</span>
                <div className="flex-grow border-t border-neutral-900"></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <Input
                label="Full Name (Default Guest Provided)"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alexander Mercer"
              />

              <Input
                label="Liaison Email Address"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="client@noir.vip"
              />

              <Input
                label="Password Credentials"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {errorMsg && (
                <p className="text-[10px] uppercase tracking-widest text-red-500">{errorMsg}</p>
              )}

              <Button
                variant="gold"
                type="submit"
                className="w-full text-glow-light"
              >
                Access Salon Dashboard
              </Button>
            </form>

            <div className="border-t border-neutral-900 pt-6 text-center space-y-3">
              <button
                onClick={() => navigateTo('/auth/register')}
                className="text-xs text-[#c9a96e] hover:text-white transition-colors uppercase tracking-widest font-mono font-medium outline-none"
              >
                Create Private Account Instead
              </button>
              <p className="text-[9px] uppercase tracking-widest text-neutral-600">
                Liaisons encrypted with full end-to-end SSL layers.
              </p>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
