// src/components/WACIDBadge.tsx

import React, { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface WACIDBadgeProps {
  id: number;
}

const WACIDBadge: React.FC<WACIDBadgeProps> = ({ id }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(id)).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center space-x-2 px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-sm font-semibold text-slate-600 dark:text-slate-300 transition-colors duration-200 hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-slate-800"
        aria-label={`Copy WinAContract ID ${id} to clipboard`}
      >
        <span className="font-mono">WAC ID:</span>
        <span className="font-mono font-bold text-slate-800 dark:text-slate-100">{id}</span>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={isCopied ? 'check' : 'copy'}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
          >
            {isCopied ? (
              <FiCheck className="h-4 w-4 text-green-500" />
            ) : (
              <FiCopy className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            )}
          </motion.div>
        </AnimatePresence>
      </button>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && !isCopied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute z-10 top-full mt-2 w-max max-w-xs p-2 text-xs font-medium text-white bg-slate-800 dark:bg-slate-900 rounded-md shadow-lg"
            role="tooltip"
          >
            Click to copy. You can paste this ID into the search bar.
          </motion.div>
        )}
        {isHovered && isCopied && (
           <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute z-10 top-full mt-2 w-max max-w-xs p-2 text-xs font-medium text-white bg-green-600 dark:bg-green-700 rounded-md shadow-lg"
            role="tooltip"
          >
            Copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WACIDBadge;