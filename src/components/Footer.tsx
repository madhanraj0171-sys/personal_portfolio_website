import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-200 bg-[#F5F3EF] py-12 text-stone-600 text-xs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-stone-900 text-sm">
            Madhan Raj B.
          </p>
          <p className="text-stone-500 mt-0.5">
            B.E. Computer Science and Engineering &bull; II Year (CSE-C) &bull; Aspiring Software Engineer
          </p>
          <p className="text-stone-400 text-[11px] mt-1 font-mono">
            Stack: React.js &bull; Node.js &bull; Express.js &bull; MongoDB
          </p>
        </div>

        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="p-2 rounded bg-stone-200/70 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
          title="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};
