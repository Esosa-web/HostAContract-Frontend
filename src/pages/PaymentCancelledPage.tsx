import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { HiOutlineArrowLeft, HiOutlineArrowUturnLeft } from 'react-icons/hi2';

const PaymentCancelledPage: React.FC = () => {

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { 
                staggerChildren: 0.1, 
                delayChildren: 0.2 
            } 
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                type: 'spring', 
                stiffness: 100 
            } 
        }
    };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-250px)] px-4">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg p-8 sm:p-12 text-center bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700/50"
        >
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
                <motion.div variants={itemVariants} className="flex justify-center mb-6">
                    <div className="relative flex items-center justify-center h-20 w-20">
                        <motion.div 
                            initial={{ scale: 0, rotate: -90, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.3 }}
                            className="absolute inset-0 bg-slate-100 dark:bg-slate-700 rounded-full" 
                        />
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.5 }}
                        >
                            <HiOutlineArrowUturnLeft className="relative w-10 h-10 text-slate-500" />
                        </motion.div>
                    </div>
                </motion.div>
                
                <motion.h1 variants={itemVariants} className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                    Purchase Cancelled
                </motion.h1>

                <motion.p variants={itemVariants} className="mt-3 max-w-md mx-auto text-slate-600 dark:text-slate-400">
                    It looks like the payment process wasn't completed. Your card has not been charged, and you can return to the pricing page at any time.
                </motion.p>
                
                <motion.div variants={itemVariants} className="mt-8">
                    <Link
                        to="/pricing"
                        className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 text-sm font-semibold tracking-wide text-white bg-red-600 rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-slate-900 transition-colors"
                    >
                        <HiOutlineArrowLeft className="mr-2 h-4 w-4" />
                        Back to Pricing
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    </div>
  );
};

export default PaymentCancelledPage;