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
  HiOutlineExternalLink,
  HiOutlineClipboardCheck
} from 'react-icons/hi';
import SupplierApplyModal from '../components/SupplierApplyModal';

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

// Enhanced Data with "Type" as requested
const APPLICANTS = [
    { id: 1, name: 'BuildRight Construction Ltd', type: 'SME', date: '20 Oct 2025', bid: 1450000, score: 92, status: 'Shortlisted' },
    { id: 2, name: 'Acme Infrastructure', type: 'Large Ent.', date: '22 Oct 2025', bid: 1600000, score: 88, status: 'Pending' },
    { id: 3, name: 'NorthWest Civil Eng', type: 'SME (Local)', date: '23 Oct 2025', bid: 1350000, score: 74, status: 'Reviewing' },
    { id: 4, name: 'Global Roads UK', type: 'Large Ent.', date: '24 Oct 2025', bid: 1480000, score: 65, status: 'Rejected' },
    { id: 5, name: 'Urban Fix Solutions', type: 'Micro', date: '25 Oct 2025', bid: 1520000, score: 81, status: 'Pending' },
];

const ManageContractPage = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState<'overview' | 'applications'>('applications');

    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [applicantsList, setApplicantsList] = useState(APPLICANTS); // Changed from constant to state so we can add to it

    // Handler for new application
    const handleNewApplication = (newApplicant: any) => {
        setApplicantsList(prev => [newApplicant, ...prev]);
        setActiveTab('applications'); // Switch to apps tab to show the new entry
    };

    // Animation for rows
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const item = {
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] p-4 md:p-8 font-sans">
            
            {/* HEADER */}
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Link to="/dashboard" className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mb-6 transition-colors uppercase tracking-wider">
                        <HiArrowLeft className="mr-1 h-4 w-4" /> Back to Dashboard
                    </Link>
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{CONTRACT_DETAILS.title}</h1>
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 uppercase tracking-wide">
                                    {CONTRACT_DETAILS.status}
                                </span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-4">
                                <span>Ref: {CONTRACT_DETAILS.id}</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                <span>CPV: {CONTRACT_DETAILS.cpv}</span>
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-xl font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                                Edit Contract
                            </button>
                            <button className="px-5 py-2.5 bg-red-600 text-white rounded-xl font-bold shadow-lg shadow-red-600/20 hover:bg-red-700 hover:-translate-y-0.5 transition-all">
                                Close Early
                            </button>
                        </div>
                    </div>
                </div>

                {/* KEY METRICS ROW */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                            <HiOutlineClock className="w-4 h-4" /> Time Remaining
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">{CONTRACT_DETAILS.daysLeft} Days</div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                            <HiOutlineUsers className="w-4 h-4" /> Total Applicants
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">{APPLICANTS.length}</div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                            <HiOutlineCurrencyPound className="w-4 h-4" /> Total Budget
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">£1.5m</div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                            <HiOutlineMail className="w-4 h-4" /> Clarifications
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">3 Pending</div>
                    </div>
                </div>

                {/* MAIN CONTENT BOX */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    
                    {/* TABS */}
                    <div className="flex border-b border-slate-200 dark:border-slate-800 px-2">
                        <button 
                            onClick={() => setActiveTab('applications')}
                            className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'applications' ? 'border-red-600 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                        >
                            Applications ({APPLICANTS.length})
                        </button>
                        <button 
                            onClick={() => setActiveTab('overview')}
                            className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'overview' ? 'border-red-600 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                        >
                            Contract Specification
                        </button>
                    </div>

                    {/* TAB CONTENT */}
                    <div className="p-0">
                        {activeTab === 'applications' && (
                            <motion.div variants={container} initial="hidden" animate="show">
                                {/* Filters Bar */}
                                <div className="p-4 bg-slate-50/50 dark:bg-slate-800/20 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                                    <div className="flex gap-3">
                                        <input 
                                            type="text" 
                                            placeholder="Filter suppliers..." 
                                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-red-500 dark:text-white placeholder-slate-400 w-64" 
                                        />
                                    </div>
                                    <button className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1">
                                        <HiOutlineDocumentDownload className="w-4 h-4" /> Download All
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-800">
                                                <th className="py-3 pl-6 w-1/4">Supplier</th>
                                                <th className="py-3">Type</th>
                                                <th className="py-3">Bid Value</th>
                                                <th className="py-3">Score</th>
                                                <th className="py-3">Status</th>
                                                <th className="py-3 text-right pr-6">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {applicantsList.map((app) => (
                                                <motion.tr key={app.id} variants={item} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                                    <td className="py-4 pl-6">
                                                        <div className="font-bold text-slate-900 dark:text-white text-sm">{app.name}</div>
                                                        <div className="text-[11px] text-slate-500 font-medium">Applied {app.date}</div>
                                                    </td>
                                                    <td className="py-4">
                                                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 uppercase tracking-wide">
                                                            {app.type}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 font-bold text-slate-700 dark:text-slate-300 text-sm">
                                                        £{app.bid.toLocaleString()}
                                                    </td>
                                                    <td className="py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                                <div className={`h-full rounded-full ${app.score > 80 ? 'bg-emerald-500' : app.score > 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${app.score}%` }}></div>
                                                            </div>
                                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{app.score}%</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                                                            app.status === 'Shortlisted' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
                                                            app.status === 'Rejected' ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' :
                                                            'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                                                        }`}>
                                                            {app.status === 'Shortlisted' && <HiOutlineCheckCircle className="w-3 h-3 mr-1" />}
                                                            {app.status === 'Rejected' && <HiOutlineXCircle className="w-3 h-3 mr-1" />}
                                                            {app.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 text-right pr-6">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors" title="Shortlist">
                                                                <HiOutlineCheckCircle className="w-5 h-5" />
                                                            </button>
                                                            <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors" title="Reject">
                                                                <HiOutlineXCircle className="w-5 h-5" />
                                                            </button>
                                                            <button className="px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 rounded-lg shadow-sm transition-colors flex items-center gap-1">
                                                                <HiOutlineClipboardCheck className="w-4 h-4 text-slate-400" />
                                                                Review
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
                            <div className="p-12 text-center">
                                <div className="inline-flex p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
                                    <HiOutlineExternalLink className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Contract Specification</h3>
                                <p className="text-slate-500 max-w-md mx-auto mt-2">
                                    This is the public view. You can simulate the supplier experience below.
                                </p>
                                
                                {/* THE TRIGGER BUTTON */}
                                <button 
                                    onClick={() => setIsApplyModalOpen(true)}
                                    className="mt-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-0.5 transition-all flex items-center gap-2 mx-auto"
                                >
                                    View Live Notice & Apply
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
             <SupplierApplyModal 
                isOpen={isApplyModalOpen} 
                onClose={() => setIsApplyModalOpen(false)}
                contractTitle={CONTRACT_DETAILS.title}
                onSubmit={handleNewApplication}
            />
        </div>
    );
};

export default ManageContractPage;