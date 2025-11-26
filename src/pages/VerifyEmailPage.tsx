import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlinePaperAirplane, HiOutlineArrowLeft } from 'react-icons/hi';

// =================================================================================
// 1. REUSABLE SUB-COMPONENTS
// =================================================================================

const AuthCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-center justify-center min-h-[calc(100vh-250px)] px-4">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg p-8 sm:p-12 text-center bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700/50"
        >
            {children}
        </motion.div>
    </div>
);

// =================================================================================
// 2. MAIN PAGE COMPONENT
// =================================================================================

const VerifyEmailPage: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };
    
  return (
    <AuthCard>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
                <div className="p-4 bg-red-100 dark:bg-red-900/50 rounded-full">
                    <HiOutlinePaperAirplane className="w-10 h-10 text-red-500 transform -rotate-45" />
                </div>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                Please Verify Your Email
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-3 text-slate-600 dark:text-slate-400">
                We've sent a verification link to your email address. Please click the link to activate your account and log in.
            </motion.p>
            
            <motion.div variants={itemVariants} className="mt-8">
                <Link
                    to="/"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 text-sm font-semibold tracking-wide text-white bg-red-600 rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-slate-900 transition-colors"
                >
                    <HiOutlineArrowLeft className="mr-2 h-4 w-4" /> Back to Homepage
                </Link>
            </motion.div>
            
            <motion.p variants={itemVariants} className="mt-8 text-xs text-slate-500 dark:text-slate-500">
                Didn't receive an email? Please check your spam or junk folder.
            </motion.p>
        </motion.div>
    </AuthCard>
  );
};

export default VerifyEmailPage;