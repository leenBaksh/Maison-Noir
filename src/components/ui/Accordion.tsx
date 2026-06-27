import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false }) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]); // First one open by default for rich layout

  const toggleIndex = (index: number) => {
    if (allowMultiple) {
      if (openIndexes.includes(index)) {
        setOpenIndexes(openIndexes.filter((i) => i !== index));
      } else {
        setOpenIndexes([...openIndexes, index]);
      }
    } else {
      if (openIndexes.includes(index)) {
        setOpenIndexes([]);
      } else {
        setOpenIndexes([index]);
      }
    }
  };

  return (
    <div className="border-t border-neutral-800 divide-y divide-neutral-80 & divide-opacity-40">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div key={index} className="border-b border-neutral-800/60 overflow-hidden py-3">
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex items-center justify-between text-left py-3 text-xs uppercase tracking-[0.2em] font-sans text-neutral-300 hover:text-white transition-colors focus:outline-none"
            >
              <span>{item.title}</span>
              {isOpen ? (
                <Minus className="h-3.5 w-3.5 text-neutral-500" />
              ) : (
                <Plus className="h-3.5 w-3.5 text-[#c9a96e]" />
              )}
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="pb-5 pt-1 text-sm text-neutral-400 font-sans leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
