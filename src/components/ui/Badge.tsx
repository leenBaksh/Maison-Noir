import React from 'react';

interface BadgeProps {
  variant?: 'gold' | 'dark' | 'outline';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'dark', children, className = '' }) => {
  let baseStyles = 'inline-flex items-center justify-center rounded-full text-[9px] font-sans uppercase tracking-[0.15em] font-medium leading-none select-none';
  
  let variantStyles = '';
  switch (variant) {
    case 'gold':
      variantStyles = 'bg-[#c9a96e] text-black px-2 py-1';
      break;
    case 'dark':
      variantStyles = 'bg-neutral-900 text-white border border-neutral-800 px-2 py-1';
      break;
    case 'outline':
      variantStyles = 'bg-transparent text-neutral-400 border border-neutral-850 px-2.5 py-1 hover:border-neutral-700 transition-colors';
      break;
  }

  return (
    <span className={`${baseStyles} ${variantStyles} ${className}`}>
      {children}
    </span>
  );
};
