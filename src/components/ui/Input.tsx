import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full font-sans">
        {label && (
          <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-400 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full bg-transparent border-b border-neutral-800 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#c9a96e] transition-colors duration-300 ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-[10px] text-red-500 uppercase tracking-widest">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
