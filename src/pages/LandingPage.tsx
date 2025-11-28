import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiArrowRight, 
  HiOutlineShieldCheck, 
  HiOutlineStatusOnline,
  HiOutlineLogin,
  HiOutlineServer,
  HiOutlineDatabase,
  HiOutlineDocumentText,
  HiOutlineUserGroup,
  HiChevronRight,
  HiCheckCircle,
  HiTrendingUp
} from 'react-icons/hi';

import { toast } from 'react-hot-toast'; 

// --- CONFIGURATION ---
const COUNCILS = [
  { 
    id: 'watford', 
    name: 'Watford Borough Council', 
    status: 'Operational', 
    region: 'Hertfordshire',
    logo: '/logos/watfordlogo.png' 
  },
  { 
    id: 'dacorum', 
    name: 'Dacorum Borough Council', 
    status: 'Operational', 
    region: 'Hertfordshire',
    logo: '/logos/dacorumlogo.jpg'
  },
  { 
    id: 'hertsmere', 
    name: 'Hertsmere Borough Council', 
    status: 'Operational', 
    region: 'Hertfordshire',
    logo: '/logos/hertsmerelogo.png'
  },
  { 
    id: 'stalbans', 
    name: 'St Albans City & District Council', 
    status: 'Operational', 
    region: 'Hertfordshire',
    logo: '/logos/stalbanslogo.png'
  },
  { 
    id: 'manchester', 
    name: 'Manchester City Council', 
    status: 'Pilot', // Changed to Pilot
    region: 'North West',
    logo: '/logos/manchesterlogo.png' // Added Logo
  },
  { 
    id: 'liverpool', 
    name: 'Liverpool City Council', 
    status: 'Pilot', 
    region: 'North West',
    logo: '/logos/liverpoollogo.png' // Added Logo
  },
];

const FEATURES = [
    {
        title: "Centralised Hosting",
        desc: "Publish opportunities to a dedicated sub-threshold environment.",
        icon: HiOutlineDatabase,
        mockupType: "dashboard"
    },
    {
        title: "Supplier Compliance",
        desc: "Automated checks against CDP and exclusion lists.",
        icon: HiOutlineShieldCheck,
        mockupType: "form"
    },
    {
        title: "Local Economic Value",
        desc: "Track spend retention within your specific borough.",
        icon: HiOutlineUserGroup,
        mockupType: "graph"
    }
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { type: "spring" as const, stiffness: 60, damping: 15 } 
  }
};

// --- SUB-COMPONENTS (High Fidelity Mockups) ---

// 1. Dashboard Mockup
const DashboardMockup = () => (
    <div className="w-full h-full bg-slate-50 dark:bg-slate-900 p-4 rounded-xl flex flex-col gap-3 font-mono text-[10px] sm:text-xs shadow-inner">
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">ACTIVE CONTRACTS</span>
            <span className="text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> LIVE</span>
        </div>
        <div className="space-y-2">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between bg-white dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-slate-100 dark:bg-slate-700 rounded flex items-center justify-center font-bold text-slate-400">#{i}</div>
                        <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                    <div className="text-slate-400">£{10 + i},000</div>
                </div>
            ))}
        </div>
        <div className="mt-auto pt-2 flex gap-2">
            <div className="flex-1 h-8 bg-red-600 rounded text-white flex items-center justify-center font-bold">New Notice +</div>
            <div className="w-8 h-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded flex items-center justify-center">...</div>
        </div>
    </div>
);

// 2. Compliance Mockup
const ComplianceMockup = () => (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 relative">
        {/* Background "Card" */}
        <div className="absolute inset-x-8 top-8 bottom-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"></div>
        
        {/* Foreground Content */}
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-emerald-100 dark:border-emerald-900/30 flex flex-col items-center gap-3 text-center"
        >
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <HiCheckCircle className="w-8 h-8" />
            </div>
            <div>
                <div className="text-sm font-bold text-slate-800 dark:text-white">Supplier Verified</div>
                <div className="text-[10px] text-slate-500 mt-1">Acme Construction Ltd</div>
            </div>
            <div className="w-full h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
            <div className="w-full flex justify-between text-[10px] font-medium">
                <span className="text-slate-500">Tax Check</span>
                <span className="text-emerald-600">Passed</span>
            </div>
            <div className="w-full flex justify-between text-[10px] font-medium">
                <span className="text-slate-500">Exclusion List</span>
                <span className="text-emerald-600">Clean</span>
            </div>
        </motion.div>
    </div>
);

// 3. Graph Mockup
const GraphMockup = () => (
    <div className="w-full h-full flex items-end justify-center gap-3 px-8 pb-8 pt-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner relative overflow-hidden">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-10 pointer-events-none">
            <div className="w-full h-px bg-slate-900"></div>
            <div className="w-full h-px bg-slate-900"></div>
            <div className="w-full h-px bg-slate-900"></div>
            <div className="w-full h-px bg-slate-900"></div>
        </div>

        {/* Bars */}
        <motion.div 
            initial={{ height: 0 }} animate={{ height: "40%" }} transition={{ delay: 0.1 }}
            className="w-8 bg-slate-200 dark:bg-slate-800 rounded-t-sm" 
        />
        <motion.div 
            initial={{ height: 0 }} animate={{ height: "65%" }} transition={{ delay: 0.2 }}
            className="w-8 bg-slate-300 dark:bg-slate-700 rounded-t-sm" 
        />
        <motion.div 
            initial={{ height: 0 }} animate={{ height: "85%" }} transition={{ delay: 0.3, type: 'spring' }}
            className="w-10 bg-red-600 rounded-t-md shadow-lg shadow-red-500/20 relative group" 
        >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Local Spend: 85%
            </div>
        </motion.div>
        <motion.div 
            initial={{ height: 0 }} animate={{ height: "55%" }} transition={{ delay: 0.4 }}
            className="w-8 bg-slate-200 dark:bg-slate-800 rounded-t-sm" 
        />
    </div>
);


// --- SYSTEM TICKER ---
const SystemTicker = () => (
    <div className="w-full bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-1.5 px-4 flex justify-between items-center text-[10px] uppercase tracking-widest font-mono text-slate-500">
        <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span>Network Operational</span>
        </div>
        <div className="hidden sm:block">Last Sync: {new Date().toLocaleTimeString()} UTC</div>
    </div>
);

// --- MAIN COMPONENT ---
const LandingPage = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
        setActiveFeature(prev => (prev + 1) % FEATURES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCouncilClick = (councilId: string, status: string) => {
    if (status === 'Pilot') {
        toast('This portal is currently in Pilot phase. Access is restricted to authorised testing personnel only.', {
            icon: '🔒',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
                fontSize: '13px'
            },
        });
        return;
    }
    navigate('/login', { state: { councilId } });
  };
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#0f1115] overflow-x-hidden flex flex-col font-sans selection:bg-red-500 selection:text-white">
      
      <SystemTicker />

      {/* 1. BACKGROUND ASSETS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.2] mix-blend-overlay"></div>
        {/* Deep Red Ambient Glows */}
        <div className="absolute -top-[10%] -right-[10%] w-[70vw] h-[70vw] bg-red-600/5 dark:bg-red-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] -left-[10%] w-[50vw] h-[50vw] bg-slate-500/5 dark:bg-slate-800/20 rounded-full blur-[100px]"></div>
      </div>

      {/* 2. MAIN HERO & GRID */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center p-6 lg:p-16">
        <div className="w-full max-w-[1400px] grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* --- LEFT COLUMN: NARRATIVE (Cols 5) --- */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 space-y-10 text-center lg:text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm backdrop-blur-md">
              <HiOutlineServer className="w-4 h-4 text-red-600" />
              <span className="text-xs font-bold tracking-widest text-slate-600 dark:text-slate-300 uppercase">HostAContract v2.4</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                National <br/>
                <span className="text-red-600">Hosting Grid</span>
              </h1>
              <h2 className="text-xl lg:text-2xl font-medium text-slate-500 dark:text-slate-400">
                Sub-threshold Procurement Network
              </h2>
            </div>
            
            {/* Copy */}
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed border-l-4 border-red-500/20 pl-6">
              The designated hosting environment for UK Council <strong>Sub-threshold</strong> contracts. 
              We ensure retention of economic benefits within the <strong>Local Council Region</strong> through automated compliance and reporting.
            </p>

            {/* Trust Indicators - UPDATED */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm font-bold text-slate-600 dark:text-slate-400">
               <div className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <HiOutlineShieldCheck className="w-5 h-5 text-red-500" />
                  <span>ISO 27001</span>
               </div>
               <div className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <HiOutlineDocumentText className="w-5 h-5 text-red-500" />
                  {/* TEXT UPDATED HERE */}
                  <span>Procurement Act 2023</span>
               </div>
            </div>
          </motion.div>

          {/* --- RIGHT COLUMN: PORTAL GRID (Cols 7) --- */}
          <div className="lg:col-span-7 w-full">
              
              {/* Header */}
              <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4"
              >
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                    <HiOutlineLogin className="w-6 h-6" />
                    <span className="text-sm font-bold uppercase tracking-wider">Select Organisation Portal</span>
                  </div>
                  {/* <span className="text-xs font-mono text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">NET_ID: UK_GOV_88</span> */}
              </motion.div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                {COUNCILS.map((council) => (
                  <motion.button
                    key={council.id}
                    variants={cardVariants}
                    onClick={() => handleCouncilClick(council.id, council.status)}
                    className="group relative flex items-center p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-red-500/50 dark:hover:border-red-500/50 shadow-sm hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 text-left w-full overflow-hidden"
                  >
                    {/* Background Status Indicator */}
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent to-current opacity-[0.03] rounded-bl-full transition-opacity group-hover:opacity-10 ${council.status === 'Operational' ? 'text-emerald-500' : 'text-amber-500'}`} />

                    {/* Logo Box - INCREASED SIZE */}
                    <div className="shrink-0 w-20 h-20 bg-white rounded-xl border border-slate-100 flex items-center justify-center p-2 shadow-sm group-hover:scale-105 transition-transform duration-300 z-10">
                        {council.logo ? (
                            <img 
                                src={council.logo} 
                                alt={`${council.name} Logo`} 
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="w-full h-full rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl font-bold text-slate-400">
                                {council.name.charAt(0)}
                            </div>
                        )}
                    </div>

                    <div className="ml-5 flex-grow min-w-0 z-10">
                        <div className="flex items-center gap-2 mb-2">
                            {/* Status Dot */}
                            <div className={`w-2 h-2 rounded-full ${
                                council.status === 'Operational' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]'
                            }`}></div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{council.status}</span>
                        </div>
                        
                        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors leading-snug">
                            {council.name}
                        </h3>
                        
                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                            {council.region}
                        </div>
                    </div>

                    {/* Arrow Overlay */}
                    <div className="absolute right-5 bottom-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <HiArrowRight className="w-5 h-5 text-red-500" />
                    </div>
                  </motion.button>
                ))}
              </motion.div>
          </div>
        </div>
      </div>

      {/* 3. PLATFORM TOUR CAROUSEL (Updated with Code-Based Mockups) */}
      <section className="relative z-10 py-20 bg-white dark:bg-[#0B0D11] border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
                <h3 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2">Platform Capabilities</h3>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Built for Procurement Teams</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
                
                {/* Feature List (Controls) */}
                <div className="space-y-4">
                    {FEATURES.map((feature, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveFeature(index)}
                            className={`w-full text-left p-6 rounded-2xl transition-all duration-300 border ${
                                activeFeature === index 
                                ? 'bg-red-50 dark:bg-red-900/10 border-red-500/30 shadow-lg' 
                                : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-900'
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-lg ${activeFeature === index ? 'bg-red-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className={`text-lg font-bold ${activeFeature === index ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                                        {feature.title}
                                    </h4>
                                    <p className={`text-sm mt-1 ${activeFeature === index ? 'text-slate-600 dark:text-slate-300' : 'text-slate-400'}`}>
                                        {feature.desc}
                                    </p>
                                </div>
                                {activeFeature === index && <HiChevronRight className="ml-auto w-5 h-5 text-red-500" />}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Mockup Display Area (Now uses components instead of divs) */}
                <div className="relative h-[300px] lg:h-[400px] bg-slate-100 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-12 shadow-2xl overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>
                    
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFeature}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full flex items-center justify-center"
                        >
                            {/* RENDER THE CORRECT MOCKUP COMPONENT */}
                            {FEATURES[activeFeature].mockupType === 'dashboard' && <DashboardMockup />}
                            {FEATURES[activeFeature].mockupType === 'form' && <ComplianceMockup />}
                            {FEATURES[activeFeature].mockupType === 'graph' && <GraphMockup />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="w-full py-12 bg-slate-100 dark:bg-black border-t border-slate-200 dark:border-slate-800 text-center">
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">RESTRICTED ACCESS SYSTEM</p>
        <p className="text-xs text-slate-400 mt-2 max-w-2xl mx-auto px-4">
            This system is for authorised use only. Activities may be monitored and recorded. 
            Unauthorised access is a criminal offense under the Computer Misuse Act 1990.
        </p>
        <div className="mt-6 flex justify-center gap-6 text-xs font-mono text-slate-400">
            <span>v2.4.1-stable</span>
            <span>Server: LON-01</span>
            <span>Latency: 12ms</span>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;