import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HiOutlinePlus, 
  HiSearch,
  HiFilter,
  HiOutlineExternalLink,
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
  HiOutlineCurrencyPound
} from 'react-icons/hi';
import { 
  AreaChart, Area, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line
} from 'recharts';

// --- SHARED LOGO MAP (Ideally shared, but redefined here for simplicity) ---
const COUNCILS_MAP: Record<string, { name: string, logo: string | null }> = {
    watford: { name: 'Watford Borough Council', logo: '/logos/watfordlogo.png' },
    dacorum: { name: 'Dacorum Borough Council', logo: '/logos/dacorumlogo.jpg' },
    hertsmere: { name: 'Hertsmere Borough Council', logo: '/logos/hertsmerelogo.png' },
    stalbans: { name: 'St Albans City & District Council', logo: '/logos/stalbanslogo.png' },
    manchester: { name: 'Manchester City Council', logo: null }, // Fallback logic handled below
    liverpool: { name: 'Liverpool City Council', logo: null },
};

// --- MOCK CHART DATA ---

// 1. Tender Activity (Area)
const ACTIVITY_DATA = [
  { name: 'Jan', tenders: 4 }, { name: 'Feb', tenders: 7 },
  { name: 'Mar', tenders: 5 }, { name: 'Apr', tenders: 10 },
  { name: 'May', tenders: 12 }, { name: 'Jun', tenders: 18 },
];

// 2. Budget (Donut)
const BUDGET_DATA = [{ name: 'Allocated', value: 4200000 }, { name: 'Remaining', value: 1800000 }];
const BUDGET_COLORS = ['#dc2626', '#f1f5f9']; // Red-600 vs Slate-100

// 3. Procurement Savings (Bar - NEW)
const SAVINGS_DATA = [
  { name: 'Q1', value: 45000 }, { name: 'Q2', value: 72000 },
  { name: 'Q3', value: 38000 }, { name: 'Q4', value: 95000 },
];

// 4. Social Value (Gauge Logic - NEW)
// We'll simulate a gauge using a simple half-pie or just CSS. CSS is cleaner here.

// --- TABLE DATA ---
const ACTIVE_CONTRACTS = [
    { id: 1, title: 'Road Maintenance Framework 2025', value: '£90,000', deadline: '14 Days Left', applicants: 12, status: 'Live' },
    { id: 2, title: 'City Centre Public Wi-Fi Upgrade', value: '£60,000', deadline: '5 Days Left', applicants: 8, status: 'Reviewing' },
    { id: 3, title: 'Green Spaces Landscaping Contract', value: '£85,000', deadline: '28 Days Left', applicants: 3, status: 'Live' },
    { id: 4, title: 'School IT Equipment Refresh', value: '£35,000', deadline: '2 Days Left', applicants: 15, status: 'Closing Soon' },
];

// Enhanced Archive Data with "Type"
const ARCHIVED_CONTRACTS = [
    { id: 101, title: 'Q4 Office Supplies Procurement', value: '£25,000', ended: 'Dec 2024', winner: 'Staples UK', type: 'Large Ent.', status: 'Awarded' },
    { id: 102, title: 'Council Fleet EV Charging Install', value: '£1,200,000', ended: 'Nov 2024', winner: 'Volta Grid', type: 'SME', status: 'Awarded' },
    { id: 103, title: 'Community Centre Roof Repair', value: '£45,000', ended: 'Oct 2024', winner: 'Local Build Ltd', type: 'SME (Local)', status: 'Awarded' },
    { id: 104, title: 'Annual Audit Services', value: '£120,000', ended: 'Sep 2024', winner: 'KPMG', type: 'Large Ent.', status: 'Awarded' },
    { id: 105, title: 'Youth Club Catering', value: '£15,000', ended: 'Aug 2024', winner: 'Fresh Bites', type: 'Micro / VCSE', status: 'Awarded' },
];

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState<'active' | 'archive'>('active');
    const [contracts, setContracts] = useState(ACTIVE_CONTRACTS);
    const location = useLocation();

    // 1. Get Council Config (or Default)
    // In a real app, this would come from AuthContext user data
    // For now, we assume standard flow: Landing -> Login -> Dashboard
    // Since we don't persist state perfectly in this mock, we default to Watford for the demo look.
    const councilId = 'watford'; // Forced for 1.0 Demo Polish
    const config = COUNCILS_MAP[councilId];

    // Load local storage new contracts
    useEffect(() => {
        const localData = localStorage.getItem('hostacontract_local_tenders');
        if (localData) {
            setContracts([...JSON.parse(localData), ...ACTIVE_CONTRACTS]);
        }
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] p-4 md:p-8 font-sans">
            
            {/* 1. DYNAMIC HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-5">
                    {/* Logo Box */}
                    <div className="w-16 h-16 bg-white rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center p-1.5">
                        <img src={config.logo || ''} alt="Council Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                            {config.name}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-2 text-sm font-medium">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Secure Procurement Environment
                        </p>
                    </div>
                </div>
                
                <Link 
                    to="/host-contract" 
                    className="group flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-red-600/20 hover:shadow-red-600/30 transition-all transform hover:-translate-y-0.5"
                >
                    <HiOutlinePlus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    <span>Host New Contract</span>
                </Link>
            </div>

            {/* 2. INFOGRAPHICS ROW (Revised) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                
                {/* CARD 1: ACTIVITY */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-48 flex flex-col justify-between">
                    <div>
                        <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Live Contracts</div>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white mt-1">18</div>
                    </div>
                    <div className="h-20 w-full -ml-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={ACTIVITY_DATA}>
                                <defs>
                                    <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#dc2626" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="tenders" stroke="#dc2626" strokeWidth={2} fillOpacity={1} fill="url(#colorRed)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* CARD 2: SOCIAL VALUE SCORE (NEW) */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-48 flex flex-col items-center justify-center relative">
                    <div className="absolute top-5 left-5 text-slate-500 text-xs font-bold uppercase tracking-wider">Social Value Score</div>
                    
                    <div className="relative w-32 h-32 flex items-center justify-center mt-4">
                        {/* CSS Gauge Background */}
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                            <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="351.86" strokeDashoffset="50" className="text-emerald-500 transition-all duration-1000" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-slate-900 dark:text-white">85%</span>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded uppercase">Excellent</span>
                        </div>
                    </div>
                </div>

                {/* CARD 3: PROCUREMENT SAVINGS (Bar) */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-48 flex flex-col justify-between">
                     <div>
                        <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Budget Savings (YTD)</div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">£250,000</div>
                    </div>
                    <div className="h-24 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={SAVINGS_DATA}>
                                <Bar dataKey="value" fill="#dc2626" radius={[4, 4, 0, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* CARD 4: BUDGET (Donut) */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-48 flex flex-col justify-between">
                    <div>
                         <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Local Spend Retention</div>
                         <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">70%</div>
                    </div>
                    <div className="h-24 w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={BUDGET_DATA}
                                    innerRadius={30}
                                    outerRadius={45}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {BUDGET_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={BUDGET_COLORS[index % BUDGET_COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 3. MAIN TABLE (Polished) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                
                {/* Tabs & Filters */}
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex space-x-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl w-fit">
                        <button 
                            onClick={() => setActiveTab('active')}
                            className={`px-5 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'active' ? 'bg-white dark:bg-slate-800 text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                        >
                            Live Procurement
                        </button>
                        <button 
                            onClick={() => setActiveTab('archive')}
                            className={`px-5 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'archive' ? 'bg-white dark:bg-slate-800 text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                        >
                            Archive
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative hidden sm:block">
                            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Search records..." 
                                className="pl-9 pr-4 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-transparent focus:ring-2 focus:ring-red-500 outline-none dark:text-white dark:placeholder-slate-500 w-64" 
                            />
                        </div>
                        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors">
                            <HiFilter className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-xs font-bold text-slate-500 uppercase border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                                <th className="py-4 pl-6 w-1/3">Contract Title</th>
                                <th className="py-4">Value</th>
                                <th className="py-4">{activeTab === 'active' ? 'Deadline' : 'Ended'}</th>
                                <th className="py-4">{activeTab === 'active' ? 'Applicants' : 'Winner'}</th>
                                {activeTab === 'archive' && <th className="py-4">Type</th>}
                                <th className="py-4">Status</th>
                                <th className="py-4 text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {activeTab === 'active' ? (
                                contracts.map((contract) => (
                                    <tr key={contract.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="py-4 pl-6">
                                            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                {contract.title}
                                                {(contract as any).isLocal && (
                                                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-100 text-blue-700 border border-blue-200 font-bold uppercase tracking-wide">New</span>
                                                )}
                                            </div>
                                            <div className="text-xs text-slate-500 font-mono mt-0.5">ID: #HAC-2025-{contract.id}</div>
                                        </td>
                                        <td className="py-4 font-medium text-slate-700 dark:text-slate-300">{contract.value}</td>
                                        <td className="py-4 text-red-600 font-bold text-sm">{contract.deadline}</td>
                                        <td className="py-4">
                                            <div className="flex -space-x-2">
                                                {[...Array(Math.min(contract.applicants, 4))].map((_, i) => (
                                                    <div key={i} className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-900 flex items-center justify-center text-xs font-bold text-slate-500">
                                                        {String.fromCharCode(65 + i)}
                                                    </div>
                                                ))}
                                                {contract.applicants > 4 && (
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-xs font-bold text-slate-500">
                                                        +{contract.applicants - 4}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                                contract.status === 'Live' 
                                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' 
                                                : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                                            }`}>
                                                {contract.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right pr-6">
                                            <Link 
                                                to={`/manage/${contract.id}`}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-red-500 hover:text-red-600 transition-colors"
                                            >
                                                Manage <HiOutlineExternalLink />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                ARCHIVED_CONTRACTS.map((contract) => (
                                    <tr key={contract.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                        <td className="py-4 pl-6">
                                            <div className="font-bold text-slate-900 dark:text-white opacity-90">{contract.title}</div>
                                            <div className="text-xs text-slate-500 font-mono mt-0.5">ID: #HAC-2024-{contract.id}</div>
                                        </td>
                                        <td className="py-4 text-slate-500 font-medium">{contract.value}</td>
                                        <td className="py-4 text-slate-500">{contract.ended}</td>
                                        <td className="py-4 font-bold text-slate-700 dark:text-slate-300">{contract.winner}</td>
                                        {/* NEW TYPE COLUMN */}
                                        <td className="py-4">
                                            <span className="text-xs font-semibold text-slate-500 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded">
                                                {contract.type}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                                {contract.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right pr-6">
                                            <button className="text-sm font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">View Record</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;