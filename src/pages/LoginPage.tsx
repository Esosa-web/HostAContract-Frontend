import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ClipLoader from "react-spinners/ClipLoader";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineMail, 
  HiOutlineLockClosed, 
  HiOutlineExclamationCircle, 
  HiArrowLeft,
  HiOutlineShieldCheck 
} from 'react-icons/hi';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { login, isAuthenticated, isLoading, error: authError } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // 1. Detect which Council was clicked
    const councilId = location.state?.councilId || 'default';
    
    // 2. Dynamic Config based on Council
    const getCouncilConfig = (id: string) => {
        switch(id) {
            case 'manchester': return { name: 'Manchester City Council', color: 'text-red-600', bg: 'bg-red-600' };
            case 'birmingham': return { name: 'Birmingham City Council', color: 'text-red-700', bg: 'bg-red-700' };
            case 'leeds': return { name: 'Leeds City Council', color: 'text-red-800', bg: 'bg-red-800' };
            case 'liverpool': return { name: 'Liverpool City Council', color: 'text-red-900', bg: 'bg-red-900' };
            default: return { name: 'HostAContract Gateway', color: 'text-slate-700', bg: 'bg-slate-700' };
        }
    };
    
    const config = getCouncilConfig(councilId);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) return;
        await login(email, password);
    };

    return (
        <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 overflow-hidden font-sans">
            
            {/* Background Ambience (Matches Landing) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
                <div className="absolute -top-[30%] -right-[10%] w-[600px] h-[600px] bg-red-500/10 dark:bg-red-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-blue-500/5 dark:bg-slate-600/10 rounded-full blur-3xl"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 w-full max-w-md bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-700 shadow-2xl rounded-3xl p-8 md:p-10"
            >
                {/* Header */}
                <div className="mb-8 text-center">
                    <Link to="/" className="inline-flex items-center text-sm text-slate-400 hover:text-slate-600 mb-6 transition-colors">
                        <HiArrowLeft className="mr-1" /> Back to Portal Selection
                    </Link>
                    
                    <div className={`mx-auto w-16 h-16 rounded-2xl ${config.bg} text-white flex items-center justify-center text-3xl font-bold shadow-lg mb-4`}>
                        {config.name.charAt(0)}
                    </div>
                    
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {config.name}
                    </h1>
                    <p className="text-slate-500 text-sm mt-2">
                        Secure Personnel Login
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Email Identifier</label>
                        <div className="relative">
                            <HiOutlineMail className="absolute left-4 top-3.5 text-slate-400 h-5 w-5" />
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                placeholder="name@council.gov.uk"
                                required 
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Password</label>
                        <div className="relative">
                            <HiOutlineLockClosed className="absolute left-4 top-3.5 text-slate-400 h-5 w-5" />
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                                required 
                            />
                        </div>
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                        {authError && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg"
                            >
                                <HiOutlineExclamationCircle className="flex-shrink-0" />
                                {authError}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className={`w-full py-3.5 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 ${config.bg}`}
                    >
                        {isLoading ? <ClipLoader color="#fff" size={20} /> : 'Authenticate Access'}
                    </button>
                </form>

                {/* Footer / Security Badge */}
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                        <HiOutlineShieldCheck className="w-4 h-4" />
                        <span>256-bit Encryption</span>
                    </div>
                    <Link to="/auth/password-reset" className="hover:text-red-500 transition-colors">
                        Forgot credentials?
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;