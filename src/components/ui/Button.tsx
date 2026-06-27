import React from 'react';
import { motion } from 'motion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'full';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'solid', size = 'md', className = '', children, ...props }, ref) => {
    
    // Core editorial styling
    let baseStyles = 'inline-flex items-center justify-center font-sans uppercase tracking-[0.2em] text-xs transition-all duration-300 outline-none select-none';
    
    let variantStyles = '';
    switch (variant) {
      case 'solid':
        variantStyles = 'bg-white text-black hover:bg-black hover:text-white border border-white hover:border-white';
        break;
      case 'gold':
        variantStyles = 'bg-[#c9a96e] text-black hover:bg-black hover:text-[#c9a96e] border border-[#c9a96e] hover:border-black';
        break;
      case 'outline':
        variantStyles = 'bg-transparent text-white border border-neutral-700 hover:border-white hover:bg-white hover:text-black';
        break;
      case 'ghost':
        variantStyles = 'bg-transparent text-neutral-400 hover:text-white hover:bg-neutral-900/50';
        break;
    }

    let sizeStyles = '';
    switch (size) {
      case 'sm':
        sizeStyles = 'px-4 py-2 text-[10px]';
        break;
      case 'md':
        sizeStyles = 'px-8 py-4 text-xs';
        break;
      case 'lg':
        sizeStyles = 'px-12 py-5 text-sm font-medium';
        break;
      case 'full':
        sizeStyles = 'w-full py-4 text-xs';
        break;
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.01, y: -1 }}
        whileTap={{ scale: 0.99 }}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
