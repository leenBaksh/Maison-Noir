import React from 'react';

export const Marquee: React.FC = () => {
  const marqueeText = "COMPLIMENTARY SHIPPING ✦ NEW ARRIVALS ✦ HANDCRAFTED IN PARIS ✦ LIMITED EDITION ✦ ARCHIVAL SILHOUETTES ✦ PRIVATE SALON FITTING ✦ ";

  return (
    <div className="relative w-full bg-neutral-950 border-y border-neutral-900 py-5 overflow-hidden z-20 select-none">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-custom {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
      `}</style>
      <div className="animate-marquee-custom flex whitespace-nowrap">
        {/* Double render for infinite visual wrapping */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center text-[10px] md:text-xs font-sans uppercase tracking-[0.4em] text-[#c9a96e] font-semibold pr-8">
            <span>{marqueeText}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
