import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiArrowLeft, 
  HiOutlineDocumentDownload, 
  HiOutlineCheckCircle, 
  HiOutlineXCircle,
  HiOutlineMail,
  HiOutlineClock,
  HiOutlineCurrencyPound,
  HiOutlineUsers,
  HiDotsVertical
} from 'react-icons/hi';

// --- MOCK DATA ---
const CONTRACT_DETAILS = {
    title: 'Road Maintenance Framework 2025',
    id: 'HAC-2025-001',
    status: 'Live',
    daysLeft: 14,
    budget: 1500000,
    description: 'Comprehensive road surface repair and maintenance framework for the North District.',
    cpv: '45233141 - Road-maintenance works'
};

const APPLICANTS = [
    { id: 1, name: 'BuildRight Construction Ltd', date: '20 Oct 2025', bid: 1450000, score: 92, status: 'Shortlisted' },
    { id: 2, name: 'Acme Infrastructure', date: '22 Oct 2025', bid: 1600000, score: 88, status: 'Pending' },
    { id: 3, name: 'NorthWest Civil Eng', date: '23 Oct 2025', bid: 1350000, score: 74, status: 'Reviewing' },
    { id: 4, name: 'Global Roads UK', date: '24 Oct 2025', bid: 1480000, score: 65, status: 'Rejected' },
    { id: 5, name: 'Urban Fix Solutions', date: '25 Oct 2025', bid: 1520000, score: 81, status: 'Pending' },
];

const ManageContractPage = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState<'overview' | 'applications'>('applications');

    // Animation for rows
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8 font-sans">
            
            {/* HEADER */}
            <div className="max-w-6xl mx-auto">
                <div className="mb-6">
                    <Link to="/dashboard" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors mb-4">
                        <HiArrowLeft className="mr-1" /> Back to Dashboard
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{CONTRACT_DETAILS.title}</h1>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 uppercase tracking-wide">
                                    {CONTRACT_DETAILS.status}
                                </span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Ref: {CONTRACT_DETAILS.id} • CPV: {CONTRACT_DETAILS.cpv}</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-lg font-medium shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                                Edit Contract
                            </button>
                            <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold shadow-lg shadow-red-500/30 hover:bg-red-700 transition">
                                Close Early
                            </button>
                        </div>
                    </div>
                </div>

                {/* KEY METRICS ROW */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase mb-1">
                            <HiOutlineClock /> Time Remaining
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">{CONTRACT_DETAILS.daysLeft} Days</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase mb-1">
                            <HiOutlineUsers /> Total Applicants
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">{APPLICANTS.length}</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase mb-1">
                            <HiOutlineCurrencyPound /> Budget
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">£1.5m</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase mb-1">
                            <HiOutlineMail /> Clarifications
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">3 Pending</div>
                    </div>
                </div>

                {/* MAIN CONTENT BOX */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                    
                    {/* TABS */}
                    <div className="flex border-b border-slate-200 dark:border-slate-700">
                        <button 
                            onClick={() => setActiveTab('applications')}
                            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'applications' ? 'border-red-600 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                        >
                            Applications ({APPLICANTS.length})
                        </button>
                        <button 
                            onClick={() => setActiveTab('overview')}
                            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'overview' ? 'border-red-600 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                        >
                            Contract Details
                        </button>
                    </div>

                    {/* TAB CONTENT */}
                    <div className="p-6">
                        {activeTab === 'applications' && (
                            <motion.div variants={container} initial="hidden" animate="show">
                                {/* Filters */}
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex gap-2">
                                        <input type="text" placeholder="Search suppliers..." className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500 transition" />
                                    </div>
                                    <button className="text-sm text-red-600 font-medium hover:underline">Export CSV</button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="text-xs font-semibold text-slate-500 uppercase bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                                                <th className="py-3 pl-4">Supplier Name</th>
                                                <th className="py-3">Bid Amount</th>
                                                <th className="py-3">Tender Score</th>
                                                <th className="py-3">Status</th>
                                                <th className="py-3 text-right pr-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                            {APPLICANTS.map((app) => (
                                                <motion.tr key={app.id} variants={item} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                                                    <td className="py-4 pl-4">
                                                        <div className="font-medium text-slate-900 dark:text-white">{app.name}</div>
                                                        <div className="text-xs text-slate-500">Submitted {app.date}</div>
                                                    </td>
                                                    <td className="py-4 font-medium text-slate-700 dark:text-slate-300">
                                                        £{app.bid.toLocaleString()}
                                                    </td>
                                                    <td className="py-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                                <div className={`h-full rounded-full ${app.score > 80 ? 'bg-emerald-500' : app.score > 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${app.score}%` }}></div>
                                                            </div>
                                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{app.score}%</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4">
                                                        <span className={`px-2 py-1 rounded text-xs font-bold border ${
                                                            app.status === 'Shortlisted' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                            app.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' :
                                                            'bg-slate-50 text-slate-600 border-slate-200'
                                                        }`}>
                                                            {app.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 text-right pr-4">
                                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg" title="Shortlist">
                                                                <HiOutlineCheckCircle className="w-5 h-5" />
                                                            </button>
                                                            <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg" title="Reject">
                                                                <HiOutlineXCircle className="w-5 h-5" />
                                                            </button>
                                                            <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg" title="View Documents">
                                                                <HiOutlineDocumentDownload className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'overview' && (
                            <div className="py-4 text-slate-500 text-center">
                                {/* Placeholder for detailed overview */}
                                <p>Full tender specification and timeline details would appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageContractPage;