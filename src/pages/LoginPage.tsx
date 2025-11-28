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

// --- SHARED CONFIGURATION (Ideally move to a config file later) ---
const COUNCILS_MAP: Record<string, { name: string, logo: string | null }> = {
    watford: { name: 'Watford Borough Council', logo: '/logos/watfordlogo.png' },
    dacorum: { name: 'Dacorum Borough Council', logo: '/logos/dacorumlogo.jpg' },
    hertsmere: { name: 'Hertsmere Borough Council', logo: '/logos/hertsmerelogo.png' },
    stalbans: { name: 'St Albans City & District Council', logo: '/logos/stalbanslogo.png' },
    manchester: { name: 'Manchester City Council', logo: null },
    liverpool: { name: 'Liverpool City Council', logo: null },
};

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { login, isAuthenticated, isLoading, error: authError } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // 1. Detect which Council was clicked
    const councilId = location.state?.councilId;
    const selectedCouncil = councilId ? COUNCILS_MAP[councilId] : null;

    // 2. Dynamic Config based on Selection vs Default
    const displayConfig = selectedCouncil || { 
        name: 'HostAContract Gateway', 
        logo: null 
    };

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
        <div className="relative min-h-screen bg-slate-50 dark:bg-[#0B1120] flex items-center justify-center p-4 overflow-hidden font-sans selection:bg-red-500 selection:text-white">
            
            {/* Background Ambience (Matches Landing Page) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
                <div className="absolute -top-[30%] -right-[10%] w-[600px] h-[600px] bg-red-600/10 dark:bg-red-900/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-slate-500/10 dark:bg-slate-800/20 rounded-full blur-[80px]"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 50 }}
                className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-3xl p-8 md:p-10"
            >
                {/* Header */}
                <div className="mb-8 text-center">
                    <Link to="/" className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mb-8 transition-colors uppercase tracking-wider">
                        <HiArrowLeft className="mr-1 h-4 w-4" /> Switch Portal
                    </Link>
                    
                    {/* Logo Area */}
                    <div className="mx-auto w-24 h-24 bg-white rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-center p-2 shadow-lg mb-6">
                        {displayConfig.logo ? (
                            <img 
                                src={displayConfig.logo} 
                                alt={displayConfig.name} 
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="text-3xl font-bold text-slate-400">
                                {displayConfig.name.charAt(0)}
                            </div>
                        )}
                    </div>
                    
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight px-4">
                        {displayConfig.name}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">
                        Secure Personnel Login
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase ml-1">Email Identifier</label>
                        <div className="relative">
                            <HiOutlineMail className="absolute left-4 top-3.5 text-slate-400 h-5 w-5" />
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400"
                                placeholder="name@council.gov.uk"
                                required 
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase ml-1">Password</label>
                        <div className="relative">
                            <HiOutlineLockClosed className="absolute left-4 top-3.5 text-slate-400 h-5 w-5" />
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-••••••••"
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
                                className="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-900/50"
                            >
                                <HiOutlineExclamationCircle className="flex-shrink-0" />
                                {authError}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full py-3.5 rounded-xl text-white font-bold shadow-lg shadow-red-500/20 bg-red-600 hover:bg-red-700 hover:shadow-red-500/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <ClipLoader color="#fff" size={20} /> : 'Authenticate Access'}
                    </button>
                </form>

                {/* Footer / Security Badge */}
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-400 font-medium">
                    <div className="flex items-center gap-1.5">
                        <HiOutlineShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span>Encrypted Connection</span>
                    </div>
                    <Link to="/auth/password-reset" className="hover:text-red-500 transition-colors">
                        Lost Access?
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;