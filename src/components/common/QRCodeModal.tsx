// src/components/common/QRCodeModal.tsx

import React from 'react';
import QRCode from 'react-qr-code';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX } from 'react-icons/hi';
import { toast } from 'react-hot-toast';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, url, title }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Link copied to clipboard!');
    }, () => {
      toast.error('Could not copy link.');
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-8 max-w-sm w-full text-center border border-slate-200 dark:border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 transition-colors"
              aria-label="Close QR Code Modal"
            >
              <HiOutlineX className="h-6 w-6" />
            </button>

            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Share Opportunity</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 px-4">{title}</p>
            
            <div className="p-4 bg-white rounded-lg inline-block">
                <QRCode value={url} size={192} />
            </div>

            <div className="mt-6 text-xs text-slate-400 dark:text-slate-500">
                Scan this code with your phone's camera.
            </div>

            <div className="mt-4 w-full bg-slate-100 dark:bg-slate-700 p-2 rounded-lg flex items-center">
                <p className="text-xs text-slate-600 dark:text-slate-300 truncate flex-grow text-left pl-2">{url}</p>
                <button 
                    onClick={handleCopy}
                    className="flex-shrink-0 px-3 py-1.5 text-xs font-semibold text-red-600 bg-white dark:bg-slate-800 rounded-md shadow-sm hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-600"
                >
                    Copy
                </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QRCodeModal;