import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiArrowRight, 
  HiOutlineShieldCheck, 
  HiOutlineLogin,
  HiOutlineServer,
  HiOutlineDatabase,
  HiOutlineDocumentText,
  HiOutlineUserGroup,
  HiChevronRight,
  HiCheckCircle,
  HiOutlineSearch,
  HiOutlineOfficeBuilding
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
    status: 'Demo', 
    region: 'North West',
    logo: '/logos/manchesterlogo.png' 
  },
  { 
    id: 'liverpool', 
    name: 'Liverpool City Council', 
    status: 'Pilot', 
    region: 'North West',
    logo: '/logos/liverpoollogo.png' 
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

// --- MOCKUPS (Unchanged) ---
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

const ComplianceMockup = () => (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 relative">
        <div className="absolute inset-x-8 top-8 bottom-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"></div>
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

const GraphMockup = () => (
    <div className="w-full h-full flex items-end justify-center gap-3 px-8 pb-8 pt-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-10 pointer-events-none">
            <div className="w-full h-px bg-slate-900"></div>
            <div className="w-full h-px bg-slate-900"></div>
            <div className="w-full h-px bg-slate-900"></div>
            <div className="w-full h-px bg-slate-900"></div>
        </div>
        <motion.div initial={{ height: 0 }} animate={{ height: "40%" }} transition={{ delay: 0.1 }} className="w-8 bg-slate-200 dark:bg-slate-800 rounded-t-sm" />
        <motion.div initial={{ height: 0 }} animate={{ height: "65%" }} transition={{ delay: 0.2 }} className="w-8 bg-slate-300 dark:bg-slate-700 rounded-t-sm" />
        <motion.div 
            initial={{ height: 0 }} animate={{ height: "85%" }} transition={{ delay: 0.3, type: 'spring' }}
            className="w-10 bg-red-600 rounded-t-md shadow-lg shadow-red-500/20 relative group" 
        >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Local Spend: 85%
            </div>
        </motion.div>
        <motion.div initial={{ height: 0 }} animate={{ height: "55%" }} transition={{ delay: 0.4 }} className="w-8 bg-slate-200 dark:bg-slate-800 rounded-t-sm" />
    </div>
);

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

// --- NEW COMPONENT: PORTAL TERMINAL ---
// This replaces the Grid with a slick selection interface
const PortalTerminal = ({ onSelect }: { onSelect: (id: string, status: string) => void }) => {
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<string | null>(null);

    const filteredCouncils = COUNCILS.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleConfirm = () => {
        if (!selected) return;
        const council = COUNCILS.find(c => c.id === selected);
        if (council) onSelect(council.id, council.status);
    };

    return (
        <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 overflow-hidden flex flex-col">
            
            {/* 1. Terminal Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600">
                            <HiOutlineLogin className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">Portal Access</h3>
                            <p className="text-xs text-slate-500">Select your organisation to authenticate.</p>
                        </div>
                    </div>
                </div>

                {/* Search Input */}
                <div className="relative group">
                    <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search for your council..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-slate-400 dark:text-white"
                    />
                </div>
            </div>

            {/* 2. Scrollable Selection List */}
            <div className="flex-1 overflow-y-auto max-h-[320px] p-2 space-y-1 custom-scrollbar">
                {filteredCouncils.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-sm">No organisations found.</div>
                ) : (
                    filteredCouncils.map((council) => (
                        <button
                            key={council.id}
                            onClick={() => setSelected(council.id)}
                            className={`w-full flex items-center gap-4 p-3 rounded-xl border transition-all duration-200 text-left group ${
                                selected === council.id 
                                ? 'bg-red-50 dark:bg-red-900/10 border-red-500 dark:border-red-500/50 ring-1 ring-red-500/20' 
                                : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
                            }`}
                        >
                            {/* Logo Avatar */}
                            <div className={`w-10 h-10 rounded-lg bg-white p-1 border flex items-center justify-center transition-colors ${selected === council.id ? 'border-red-200' : 'border-slate-100 dark:border-slate-700'}`}>
                                {council.logo ? (
                                    <img src={council.logo} alt="" className="w-full h-full object-contain" />
                                ) : (
                                    <HiOutlineOfficeBuilding className="text-slate-400" />
                                )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <h4 className={`text-sm font-bold truncate ${selected === council.id ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                                    {council.name}
                                </h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                    {/* UPDATED DOT LOGIC */}
                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                        council.status === 'Operational' ? 'bg-emerald-500' : 
                                        council.status === 'Demo' ? 'bg-blue-500' : // <--- Blue for Demo
                                        'bg-amber-500' // Amber for Pilot
                                    }`}></span>
                                    
                                    <span className="text-[10px] text-slate-400 uppercase tracking-wide">
                                        {council.status}
                                    </span>
                                </div>
                            </div>

                            {selected === council.id && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                    <HiCheckCircle className="w-5 h-5 text-red-600" />
                                </motion.div>
                            )}
                        </button>
                    ))
                )}
            </div>

            {/* 3. Footer Action Button */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <button
                    onClick={handleConfirm}
                    disabled={!selected}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                        selected 
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20 translate-y-0' 
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                    }`}
                >
                    <span>{selected ? 'Launch Secure Portal' : 'Select Organisation'}</span>
                    <HiArrowRight className={`w-4 h-4 transition-transform ${selected ? 'group-hover:translate-x-1' : ''}`} />
                </button>
            </div>
        </div>
    );
};


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

  const handleCouncilSelect = (councilId: string, status: string) => {
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

    localStorage.setItem('selected_council_id', councilId); 
    
    // Navigate with animation feeling
    const loadingToast = toast.loading('Establishing secure connection...');
    setTimeout(() => {
        toast.dismiss(loadingToast);
        navigate('/login', { state: { councilId } });
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#0f1115] overflow-x-hidden flex flex-col font-sans selection:bg-red-500 selection:text-white">
      
      <SystemTicker />

      {/* BACKGROUND ASSETS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.2] mix-blend-overlay"></div>
        <div className="absolute -top-[10%] -right-[10%] w-[70vw] h-[70vw] bg-red-600/5 dark:bg-red-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] -left-[10%] w-[50vw] h-[50vw] bg-slate-500/5 dark:bg-slate-800/20 rounded-full blur-[100px]"></div>
      </div>

      {/* MAIN HERO & GRID */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center p-6 lg:p-16">
        <div className="w-full max-w-[1200px] grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* --- LEFT COLUMN: NARRATIVE (Cols 6) --- */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-10 text-center lg:text-left"
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
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed border-l-4 border-red-500/20 pl-6 max-w-2xl">
              The designated hosting environment for UK Council <strong>Sub-threshold</strong> contracts. 
              We ensure retention of economic benefits within the <strong>Local Council Region</strong>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm font-bold text-slate-600 dark:text-slate-400">
               <div className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <HiOutlineShieldCheck className="w-5 h-5 text-red-500" />
                  <span>ISO 27001</span>
               </div>
               <div className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <HiOutlineDocumentText className="w-5 h-5 text-red-500" />
                  <span>Procurement Act 2023</span>
               </div>
            </div>
          </motion.div>

          {/* --- RIGHT COLUMN: NEW PORTAL TERMINAL (Cols 6) --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-5 w-full"
          >
              <PortalTerminal onSelect={handleCouncilSelect} />
              
              {/* Optional footer link under the box */}
              <div className="mt-4 text-center">
                  <button className="text-xs text-slate-400 hover:text-red-500 transition-colors">
                      Don't see your organisation? Apply for access &rarr;
                  </button>
              </div>
          </motion.div>

        </div>
      </div>

      {/* PLATFORM TOUR CAROUSEL */}
      <section className="relative z-10 py-20 bg-white dark:bg-[#0B0D11] border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
                <h3 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2">Platform Capabilities</h3>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Built for Procurement Teams</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                            {FEATURES[activeFeature].mockupType === 'dashboard' && <DashboardMockup />}
                            {FEATURES[activeFeature].mockupType === 'form' && <ComplianceMockup />}
                            {FEATURES[activeFeature].mockupType === 'graph' && <GraphMockup />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-12 bg-slate-100 dark:bg-black border-t border-slate-200 dark:border-slate-800 text-center">
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">RESTRICTED ACCESS SYSTEM</p>
        <p className="text-xs text-slate-400 mt-2 max-w-2xl mx-auto px-4">
            This system is for authorised use only. Activities may be monitored and recorded. 
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