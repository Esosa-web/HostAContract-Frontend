import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiBell, FiSearch, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import ClipLoader from "react-spinners/ClipLoader";

// A single-use component for the action cards. Keeps the main return statement clean.
const ActionCard: React.FC<{
    icon: React.ReactElement;
    title: string;
    description: string;
    buttonText: string;
    onClick: () => void;
    delay: number;
}> = ({ icon, title, description, buttonText, onClick, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay }}
        className="flex flex-col text-left p-6 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-red-500 dark:hover:border-red-500 transition-all duration-300"
    >
        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400">
            {icon}
        </div>
        <div className="flex-grow mt-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
        </div>
        <button 
            onClick={onClick} 
            className="group mt-6 inline-flex items-center text-sm font-semibold text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
        >
            {buttonText}
            <FiArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
    </motion.div>
);

const PaymentSuccessPage: React.FC = () => {
    const { refreshUserStatus } = useAuth();
    const navigate = useNavigate();
    
    // This state controls which view is shown: the "Finalizing" spinner or the "Success" launchpad.
    const [isFinalizing, setIsFinalizing] = useState(true);

    useEffect(() => {
        const handleSuccess = async () => {
            // Refresh the user's session to pull their new 'is_paid: true' status.
            await refreshUserStatus();

            // After refreshing, wait a moment before revealing the success page.
            // This ensures the user sees the confirmation before the UI changes.
            setTimeout(() => {
                setIsFinalizing(false);
            }, 1500); // 1.5 second delay
        };

        handleSuccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const actions = [
        {
            icon: <FiBell className="h-6 w-6" />,
            title: "Create Custom Alerts",
            description: "Never miss an opportunity. Get relevant contracts sent directly to your inbox by setting up your personalized alert profiles.",
            buttonText: "Go to My Alerts",
            onClick: () => navigate('/account/alerts')
        },
        {
            icon: <FiSearch className="h-6 w-6" />,
            title: "Unleash Advanced Search",
            description: "Dive deep into our database with unrestricted access to all advanced filters, including buyer names, CPV codes, and tender values.",
            buttonText: "Go to Search Page",
            onClick: () => navigate('/search')
        },
        {
            icon: <FiTrendingUp className="h-6 w-6" />,
            title: "Explore the Leaderboards",
            description: "Gain market intelligence with full access to our leaderboards. Discover the top buyers and most successful suppliers in your industry.",
            buttonText: "View Leaderboards",
            onClick: () => navigate('/leaderboards')
        }
    ];

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4 text-center">
            <AnimatePresence mode="wait">
                {isFinalizing ? (
                    // STATE 1: FINALIZING VIEW
                    <motion.div
                        key="finalizing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center p-8 min-h-[300px]"
                    >
                        <ClipLoader color="#3b82f6" size={40} />
                        <h1 className="mt-6 text-2xl font-bold text-slate-800 dark:text-slate-100">
                            Finalizing Your Subscription...
                        </h1>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">
                            Just a moment while we upgrade your account.
                        </p>
                    </motion.div>
                ) : (
                    // STATE 2: SUCCESS & CHOICE VIEW
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        {/* --- Success Header --- */}
                        <div className="mb-12">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                                className="flex justify-center"
                            >
                                <FiCheckCircle className="h-20 w-20 text-green-500" />
                            </motion.div>
                            <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                Your Upgrade is Complete!
                            </h1>
                            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
                                You've unlocked the full potential of WinAContract. Here's what you can do next:
                            </p>
                        </div>

                        {/* --- Action Hub --- */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {actions.map((action, index) => (
                                <ActionCard
                                    key={action.title}
                                    icon={action.icon}
                                    title={action.title}
                                    description={action.description}
                                    buttonText={action.buttonText}
                                    onClick={action.onClick}
                                    delay={0.4 + index * 0.15} // Staggered animation delay
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PaymentSuccessPage;