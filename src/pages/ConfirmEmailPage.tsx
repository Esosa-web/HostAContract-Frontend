import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import ClipLoader from 'react-spinners/ClipLoader';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineArrowRight } from 'react-icons/hi';

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

const FeedbackContent: React.FC<{
    status: 'success' | 'error';
    title: string;
    message: string;
    linkTo: string;
    linkText: string;
}> = ({ status, title, message, linkTo, linkText }) => {
    const isSuccess = status === 'success';
    const Icon = isSuccess ? HiOutlineCheckCircle : HiOutlineXCircle;
    const iconColor = isSuccess ? 'text-green-500' : 'text-red-500';
    const bgColor = isSuccess ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50';
    const buttonClass = isSuccess 
        ? "inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 text-sm font-semibold tracking-wide text-white bg-red-600 rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-slate-900 transition-colors"
        : "inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 text-sm font-semibold tracking-wide text-slate-700 bg-slate-100 rounded-lg shadow-sm hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:text-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:ring-offset-slate-900 transition-colors";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
        >
            <div className={`p-3 ${bgColor} rounded-full`}>
                <Icon className={`w-10 h-10 ${iconColor}`} />
            </div>
            <h1 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {title}
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
                {message}
            </p>
            <Link to={linkTo} className={`${buttonClass} mt-8`}>
                {linkText} <HiOutlineArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </motion.div>
    );
};

// =================================================================================
// 2. MAIN PAGE COMPONENT
// =================================================================================

const ConfirmEmailPage: React.FC = () => {
  const { key } = useParams<{ key: string }>();
  const { apiFetch } = useApi();
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (key) {
      const confirmEmail = async () => {
        // Add a small delay to prevent jarring flash of content
        await new Promise(resolve => setTimeout(resolve, 500)); 
        try {
          await apiFetch('/api/auth/registration/verify-email/', {
            method: 'POST',
            body: JSON.stringify({ key }),
          });
          setStatus('success');
        } catch (err: any) {
          setErrorMessage(err.data?.detail || 'This link is invalid or has expired.');
          setStatus('error');
        }
      };
      confirmEmail();
    } else {
      setErrorMessage('No confirmation key provided.');
      setStatus('error');
    }
  }, [key, apiFetch]);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-semibold text-slate-700 dark:text-slate-200">Verifying Your Email...</h1>
            <ClipLoader color="#3b82f6" loading={true} size={35} className="mt-6" />
          </div>
        );
      case 'success':
        return (
          <FeedbackContent
            status="success"
            title="Email Confirmed!"
            message="Your account has been successfully activated."
            linkTo="/login"
            linkText="Proceed to Login"
          />
        );
      case 'error':
        return (
          <FeedbackContent
            status="error"
            title="Verification Failed"
            message={errorMessage}
            linkTo="/"
            linkText="Back to Homepage"
          />
        );
    }
  };

  return (
    <AuthCard>
      <AnimatePresence mode="wait">
        <motion.div key={status}>
            {renderContent()}
        </motion.div>
      </AnimatePresence>
    </AuthCard>
  );
};

export default ConfirmEmailPage;