import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiOutlineOfficeBuilding, 
  HiArrowRight, 
  HiOutlineShieldCheck, 
  HiOutlineStatusOnline 
} from 'react-icons/hi';

// --- CONFIGURATION ---
const COUNCILS = [
  { id: 'manchester', name: 'Manchester City Council', status: 'Operational', region: 'North West' },
  { id: 'birmingham', name: 'Birmingham City Council', status: 'Operational', region: 'West Midlands' },
  { id: 'leeds', name: 'Leeds City Council', status: 'Maintenance', region: 'Yorkshire' },
  { id: 'liverpool', name: 'Liverpool City Council', status: 'Operational', region: 'North West' },
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 50 } }
};

const LandingPage = () => {
  const navigate = useNavigate();

  const handleCouncilClick = (councilId: string) => {
    navigate('/login', { state: { councilId } });
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden flex flex-col items-center justify-center p-6 font-sans selection:bg-red-500 selection:text-white">
      
      {/* 1. DYNAMIC BACKGROUND ASSETS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
             style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* Glowing Orbs */}
        <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-red-500/20 dark:bg-red-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] bg-blue-500/10 dark:bg-slate-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* 2. MAIN CONTENT CONTAINER */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* LEFT COLUMN: HERO TEXT */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300 uppercase">Secure Gateway v2.4</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Procurement <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 dark:from-red-500 dark:to-orange-400">
              Management
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Welcome to the centralized <strong>HostAContract</strong> portal. Securely manage tenders, award contracts, and oversee supplier compliance across the UK network.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm font-medium text-slate-500 dark:text-slate-500">
             <div className="flex items-center gap-2">
                <HiOutlineShieldCheck className="w-5 h-5 text-slate-400" />
                <span>Encrypted Connection</span>
             </div>
             <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></div>
             <div>ISO 27001 Certified</div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: THE GRID */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {COUNCILS.map((council) => (
            <motion.button
              key={council.id}
              variants={cardVariants}
              onClick={() => handleCouncilClick(council.id)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex flex-col p-6 h-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 text-left overflow-hidden"
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/5 group-hover:to-red-500/10 transition-all duration-500" />

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-900 group-hover:scale-110 transition-transform duration-300`}>
                  {council.name.charAt(0)}
                </div>
                
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${
                  council.status === 'Operational' 
                    ? 'bg-emerald-100/50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800' 
                    : 'bg-amber-100/50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
                }`}>
                   <HiOutlineStatusOnline className="w-3.5 h-3.5" />
                   {council.status}
                </div>
              </div>

              <div className="relative z-10 mt-auto">
                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mb-1">{council.region}</div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {council.name}
                </h3>
              </div>

              <div className="absolute bottom-6 right-6 transform translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                <HiArrowRight className="w-6 h-6 text-red-500" />
              </div>
            </motion.button>
          ))}
        </motion.div>

      </div>

      {/* 3. FOOTER / DISCLAIMER */}
      <div className="absolute bottom-6 text-center w-full px-6">
        <p className="text-xs text-slate-400 dark:text-slate-600 font-medium">
          Restricted Access System &bull; Unauthorized access is a criminal offense under the Computer Misuse Act 1990.
        </p>
      </div>

    </div>
  );
};

export default LandingPage;