import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiOutlinePlus, 
  HiSearch,
  HiFilter,
  HiOutlineExternalLink
} from 'react-icons/hi';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line
} from 'recharts';

// --- MOCK CHART DATA ---

// 1. Tender Activity (Area Chart)
const ACTIVITY_DATA = [
  { name: 'Jan', tenders: 4 },
  { name: 'Feb', tenders: 7 },
  { name: 'Mar', tenders: 5 },
  { name: 'Apr', tenders: 10 },
  { name: 'May', tenders: 12 },
  { name: 'Jun', tenders: 18 },
];

// 2. Budget (Donut Chart)
const BUDGET_DATA = [
  { name: 'Allocated', value: 4200000 },
  { name: 'Remaining', value: 1800000 },
];
const BUDGET_COLORS = ['#EF4444', '#E5E7EB']; // Red-500 vs Gray-200

// 3. Categories (Bar Chart)
const CATEGORY_DATA = [
  { name: 'Services', value: 12 },
  { name: 'Works', value: 8 },
  { name: 'Goods', value: 5 },
];

// 4. Engagement (Line Chart)
const VIEWS_DATA = [
  { day: 'M', views: 120 },
  { day: 'T', views: 150 },
  { day: 'W', views: 300 }, // Peak
  { day: 'T', views: 220 },
  { day: 'F', views: 180 },
];

// --- TABLE DATA ---
const ACTIVE_CONTRACTS = [
    { id: 1, title: 'Road Maintenance Framework 2025', value: '£1,500,000', deadline: '14 Days Left', applicants: 12, status: 'Live' },
    { id: 2, title: 'City Centre Public Wi-Fi Upgrade', value: '£450,000', deadline: '5 Days Left', applicants: 8, status: 'Reviewing' },
    { id: 3, title: 'Green Spaces Landscaping Contract', value: '£200,000', deadline: '28 Days Left', applicants: 3, status: 'Live' },
    { id: 4, title: 'School IT Equipment Refresh', value: '£85,000', deadline: '2 Days Left', applicants: 15, status: 'Closing Soon' },
];

const ARCHIVED_CONTRACTS = [
    { id: 101, title: 'Q4 Office Supplies Procurement', value: '£25,000', ended: 'Dec 2024', winner: 'Staples UK', status: 'Awarded' },
    { id: 102, title: 'Council Fleet EV Charging Install', value: '£1,200,000', ended: 'Nov 2024', winner: 'Volta Grid', status: 'Awarded' },
];

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState<'active' | 'archive'>('active');
    
    // STATE: Start with the mock data, but allow it to grow
    const [contracts, setContracts] = useState(ACTIVE_CONTRACTS);

    // EFFECT: Load local storage on mount
    React.useEffect(() => {
        const localData = localStorage.getItem('hostacontract_local_tenders');
        if (localData) {
            const parsed = JSON.parse(localData);
            // Merge: Local items first (top of list), then Mock items
            setContracts([...parsed, ...ACTIVE_CONTRACTS]);
        }
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8 font-sans">
            
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Command Center</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Overview of Manchester City Council procurement.</p>
                </div>
                
                <Link 
                    to="/host-contract" 
                    className="group flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-red-500/30 transition-all transform hover:-translate-y-0.5"
                >
                    <HiOutlinePlus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    <span>Host New Contract</span>
                </Link>
            </div>

            {/* GRAPHICS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                
                {/* CARD 1: TENDER VELOCITY (Area) */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-48">
                    <div>
                        <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Contracts Hosted</div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">18 Active</div>
                    </div>
                    <div className="h-24 w-full -ml-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={ACTIVITY_DATA}>
                                <defs>
                                    <linearGradient id="colorTenders" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} cursor={false} />
                                <Area type="monotone" dataKey="tenders" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorTenders)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* CARD 2: BUDGET (Donut) */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-48 relative overflow-hidden">
                    <div>
                         <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Local SME Spend</div>
                         <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">70% Spent</div>
                    </div>
                    <div className="absolute right-[-20px] bottom-[-20px] w-32 h-32">
                         {/* Decorative Background Donut */}
                    </div>
                    <div className="h-28 w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={BUDGET_DATA}
                                    innerRadius={35}
                                    outerRadius={50}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {BUDGET_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={BUDGET_COLORS[index % BUDGET_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* CARD 3: Procurement Budget Savings (Bar) */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-48">
                     <div>
                        <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Procurement Budget Savings</div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">Services Lead</div>
                    </div>
                    <div className="h-24 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={CATEGORY_DATA}>
                                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff', borderRadius: '8px' }} />
                                <Bar dataKey="value" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* CARD 4: ENGAGEMENT (Line) */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-48">
                    <div>
                        <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Portal Traffic</div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">1.2k Daily Views</div>
                    </div>
                    <div className="h-24 w-full -ml-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={VIEWS_DATA}>
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} cursor={false} />
                                <Line type="monotone" dataKey="views" stroke="#EF4444" strokeWidth={3} dot={{ r: 4, fill: '#EF4444', strokeWidth: 2, stroke: '#fff' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* MAIN TABLE */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                
                {/* Tabs & Filters */}
                <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex space-x-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl w-fit">
                        <button 
                            onClick={() => setActiveTab('active')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'active' ? 'bg-white dark:bg-slate-800 text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Active Contracts
                        </button>
                        <button 
                            onClick={() => setActiveTab('archive')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'archive' ? 'bg-white dark:bg-slate-800 text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
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
                                className="pl-9 pr-4 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-transparent focus:ring-2 focus:ring-red-500 outline-none dark:text-white" 
                            />
                        </div>
                        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700">
                            <HiFilter className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-xs font-semibold text-slate-500 uppercase border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                                <th className="py-4 pl-6">Contract Title</th>
                                <th className="py-4">Value</th>
                                <th className="py-4">{activeTab === 'active' ? 'Deadline' : 'Ended'}</th>
                                <th className="py-4">{activeTab === 'active' ? 'Applicants' : 'Winner'}</th>
                                <th className="py-4">Status</th>
                                <th className="py-4 text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {activeTab === 'active' ? (
                                contracts.map((contract) => (
                                    <tr key={contract.id} className="group hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="py-4 pl-6">
                                            <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                                {contract.title}
                                                {/* NEW BADGE LOGIC */}
                                                {(contract as any).isLocal && (
                                                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-100 text-blue-600 border border-blue-200 font-bold uppercase tracking-wide">
                                                        New
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-xs text-slate-500">ID: #HAC-2025-{contract.id}</div>
                                        </td>
                                        <td className="py-4 font-medium text-slate-700 dark:text-slate-300">{contract.value}</td>
                                        <td className="py-4 text-red-600 font-medium text-sm">{contract.deadline}</td>
                                        <td className="py-4">
                                            <div className="flex -space-x-2">
                                                {[...Array(Math.min(contract.applicants, 4))].map((_, i) => (
                                                    <div key={i} className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs font-bold text-slate-500">
                                                        {String.fromCharCode(65 + i)}
                                                    </div>
                                                ))}
                                                {contract.applicants > 4 && (
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs font-bold text-slate-500">
                                                        +{contract.applicants - 4}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                contract.status === 'Live' 
                                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                                                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                            }`}>
                                                {contract.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right pr-6">
                                            <Link 
                                                to={`/manage/${contract.id}`}
                                                className="text-sm text-slate-500 hover:text-red-600 font-medium flex items-center justify-end gap-1 w-full"
                                            >
                                                Manage <HiOutlineExternalLink />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                ARCHIVED_CONTRACTS.map((contract) => (
                                    <tr key={contract.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                                        <td className="py-4 pl-6">
                                            <div className="font-semibold text-slate-900 dark:text-white opacity-75">{contract.title}</div>
                                            <div className="text-xs text-slate-500">ID: #HAC-2024-{contract.id}</div>
                                        </td>
                                        <td className="py-4 text-slate-500">{contract.value}</td>
                                        <td className="py-4 text-slate-500">{contract.ended}</td>
                                        <td className="py-4 font-medium text-slate-700 dark:text-slate-300">{contract.winner}</td>
                                        <td className="py-4">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                                                {contract.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right pr-6">
                                            <button className="text-sm text-slate-500 hover:text-slate-800">View Record</button>
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