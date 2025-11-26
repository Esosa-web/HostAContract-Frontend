import React, { useState, FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import ClipLoader from 'react-spinners/ClipLoader';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineLockClosed, HiOutlineCheckCircle, HiOutlineArrowRight, HiOutlineExclamationCircle } from 'react-icons/hi';

// =================================================================================
// 1. REUSABLE SUB-COMPONENTS
// =================================================================================

const AuthCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-center justify-center min-h-[calc(100vh-250px)] px-4">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md p-8 sm:p-10 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700/50"
        >
            {children}
        </motion.div>
    </div>
);

const AnimatedFeedback = ({ message, type }: { message: string | null; type: 'success' | 'error' }) => {
    const isSuccess = type === 'success';
    const textColor = isSuccess ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300';
    const bgColor = isSuccess ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30';
    const borderColor = isSuccess ? 'border-green-200 dark:border-green-700/50' : 'border-red-200 dark:border-red-700/50';
    const Icon = isSuccess ? HiOutlineCheckCircle : HiOutlineExclamationCircle;

    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                >
                    <div className={`flex items-start text-center gap-3 p-4 mt-6 text-sm rounded-lg border ${textColor} ${bgColor} ${borderColor}`}>
                        <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <span>{message}</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// =================================================================================
// 2. MAIN PAGE COMPONENT
// =================================================================================

const PasswordResetConfirmPage: React.FC = () => {
    const { uidb64, token } = useParams<{ uidb64: string; token: string }>();
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { apiFetch } = useApi();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setError('');

        if (newPassword1 !== newPassword2) {
            setError('Passwords do not match.');
            setIsLoading(false);
            return;
        }

        try {
            await apiFetch('/api/auth/password/reset/confirm/', {
                method: 'POST',
                body: JSON.stringify({ uid: uidb64, token, new_password1: newPassword1, new_password2: newPassword2 }),
            });
            setMessage('Your password has been reset successfully!');
        } catch (err: any) {
            console.error("Password Reset Failed. Full server response:", err.data);
            const serverErrorDetail = err.data?.detail || JSON.stringify(err.data) || 'Unknown error';
            setError(`Request failed. ${serverErrorDetail}`);
        } finally {
            setIsLoading(false);
        }
    };

    const inputWrapperClass = "relative";
    const inputIconClass = "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400";
    const inputClass = "block w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-900/70 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition";

    return (
        <AuthCard>
            <div className="text-center">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                    Set a New Password
                </h1>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                    Choose a strong, new password for your account.
                </p>
            </div>

            <AnimatePresence mode="wait">
                {message ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mt-6"
                    >
                        <AnimatedFeedback message={message} type="success" />
                        <Link to="/login" className="inline-flex items-center justify-center w-full mt-6 px-4 py-3 text-sm font-semibold tracking-wide text-white bg-red-600 rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-slate-900 transition-colors">
                            Proceed to Login <HiOutlineArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-8"
                    >
                        <form onSubmit={handleSubmit} noValidate className="space-y-5">
                            <div className={inputWrapperClass}>
                                <HiOutlineLockClosed className={inputIconClass} />
                                <input
                                    id="new_password1" type="password" value={newPassword1}
                                    onChange={(e) => setNewPassword1(e.target.value)}
                                    className={inputClass} placeholder="New Password"
                                    required autoComplete="new-password"
                                />
                            </div>
                            <div className={inputWrapperClass}>
                                <HiOutlineLockClosed className={inputIconClass} />
                                <input
                                    id="new_password2" type="password" value={newPassword2}
                                    onChange={(e) => setNewPassword2(e.target.value)}
                                    className={inputClass} placeholder="Confirm New Password"
                                    required autoComplete="new-password"
                                />
                            </div>
                            
                            <AnimatedFeedback message={error} type="error" />

                            <div className="pt-1">
                                <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center px-4 py-3 text-sm font-semibold tracking-wide text-white bg-red-600 rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-slate-900 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors">
                                    {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Reset Password'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </AuthCard>
    );
};

export default PasswordResetConfirmPage;