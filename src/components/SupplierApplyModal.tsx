import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiX, 
  HiOutlineCloudUpload, 
  HiCheckCircle, 
  HiOutlineOfficeBuilding, 
  HiOutlineDocumentText,
  HiOutlineCurrencyPound,
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineHeart,
  HiOutlineGlobeAlt,
  HiOutlineCheck,
  HiOutlinePaperClip
} from 'react-icons/hi';

interface SupplierApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractTitle: string;
  onSubmit: (applicant: any) => void;
}

const SupplierApplyModal: React.FC<SupplierApplyModalProps> = ({ isOpen, onClose, contractTitle, onSubmit }) => {
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [useCDP, setUseCDP] = useState(false);
  
  // Upload State
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  
  // Form Data State
  const [bidAmount, setBidAmount] = useState('');
  const [techFile, setTechFile] = useState<string | null>(null);
  const [supportingFile, setSupportingFile] = useState<string | null>(null);
  const [pricingSchedule, setPricingSchedule] = useState<string | null>(null);
  const [execSummary, setExecSummary] = useState('');
  const [validityPeriod, setValidityPeriod] = useState('90');
  
  const [socialValueCommitment, setSocialValueCommitment] = useState(10); 
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
        setStep('form');
        setUseCDP(false);
        setBidAmount('');
        setTechFile(null);
        setSupportingFile(null);
        setPricingSchedule(null);
        setExecSummary('');
        setSocialValueCommitment(10);
        setTermsAccepted(false);
    }
  }, [isOpen]);

  const handleFileUpload = (field: 'tech' | 'support' | 'price') => {
      setUploadingField(field);
      setTimeout(() => {
          setUploadingField(null);
          if (field === 'tech') setTechFile('technical_proposal_v1.pdf');
          if (field === 'support') setSupportingFile('case_studies_cvs.zip');
          if (field === 'price') setPricingSchedule('pricing_matrix_completed.xlsx');
      }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    setTimeout(() => {
        setStep('success');
        // Pass data back to parent to update the table (Simulated)
        onSubmit({
            id: Math.floor(Math.random() * 1000),
            name: useCDP ? 'Demo Construction Ltd' : 'New Supplier Ltd',
            type: useCDP ? 'SME (Local)' : 'Pending', 
            date: 'Just now',
            bid: parseInt(bidAmount) || 0,
            score: 0, // Pending
            status: 'Pending'
        });
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={onClose}
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-start bg-slate-50 dark:bg-slate-950">
            <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Submit Tender Response</h2>
                <p className="text-sm text-slate-500 mt-1">{contractTitle}</p>
            </div>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                <HiX className="w-6 h-6 text-slate-500" />
            </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <AnimatePresence mode="wait">
                {step === 'form' ? (
                    <motion.form 
                        key="form"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="space-y-8"
                        onSubmit={handleSubmit}
                    >
                        {/* 1. IDENTITY & COMPLIANCE SECTION */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                                <HiOutlineOfficeBuilding className="w-4 h-4 text-blue-500" /> 1. Verification & Identity
                            </h3>
                            
                            {/* CDP Magic Button */}
                            <div 
                                onClick={() => setUseCDP(!useCDP)}
                                className={`cursor-pointer p-5 rounded-xl border-2 transition-all group ${
                                    useCDP 
                                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10' 
                                    : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500'
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                        useCDP ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 group-hover:border-blue-400'
                                    }`}>
                                        {useCDP && <HiCheckCircle className="w-4 h-4" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                Import Verified Profile via CDP
                                                <HiOutlineLightningBolt className="w-4 h-4 text-amber-500" />
                                            </div>
                                            {useCDP && <span className="text-xs font-bold text-emerald-600 bg-white px-2 py-1 rounded-md shadow-sm">Verified</span>}
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">Instantly populate company data, insurance certificates, and exclusion checks.</p>
                                        
                                        {/* THE "FLUFF": Data Visualization of what just happened */}
                                        <AnimatePresence>
                                            {useCDP && (
                                                <motion.div 
                                                    initial={{ height: 0, opacity: 0 }} 
                                                    animate={{ height: 'auto', opacity: 1 }} 
                                                    className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 overflow-hidden"
                                                >
                                                    {[
                                                        { label: 'Registered Address', icon: HiOutlineGlobeAlt },
                                                        { label: 'Public Liability', icon: HiOutlineShieldCheck },
                                                        { label: 'Modern Slavery', icon: HiOutlineDocumentText },
                                                        { label: 'Carbon Reduction', icon: HiOutlineHeart },
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex flex-col items-center p-2 bg-white dark:bg-slate-800 rounded border border-emerald-200 dark:border-emerald-800/30">
                                                            <item.icon className="w-4 h-4 text-emerald-500 mb-1" />
                                                            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{item.label}</span>
                                                            <span className="text-[9px] text-emerald-600 font-mono">PASSED</span>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>

                            {/* Auto-filled Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-500">Company Name</label>
                                    <input type="text" disabled={useCDP} value={useCDP ? "Demo Construction Ltd" : ""} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 disabled:bg-emerald-50/30 disabled:border-emerald-200" placeholder="-" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-500">Registration No.</label>
                                    <input type="text" disabled={useCDP} value={useCDP ? "09876543" : ""} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 disabled:bg-emerald-50/30 disabled:border-emerald-200" placeholder="-" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-500">Supplier Type</label>
                                    <input type="text" disabled={useCDP} value={useCDP ? "SME (Local)" : ""} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 disabled:bg-emerald-50/30 disabled:border-emerald-200" placeholder="-" />
                                </div>
                            </div>
                        </div>

                        {/* 2. TECHNICAL RESPONSE (EXPANDED) */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                                <HiOutlineDocumentText className="w-4 h-4 text-blue-500" /> 2. Technical Response
                            </h3>
                            
                            {/* Executive Summary */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Executive Summary</label>
                                <textarea 
                                    rows={4}
                                    value={execSummary}
                                    onChange={(e) => setExecSummary(e.target.value)}
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white text-sm"
                                    placeholder="Briefly summarize your approach and key differentiators..."
                                />
                                <p className="text-xs text-right text-slate-400">{execSummary.length}/500 chars</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Main Proposal Upload */}
                                <div 
                                    onClick={() => handleFileUpload('tech')}
                                    className={`border-2 border-dashed rounded-xl p-4 text-center transition-all cursor-pointer flex flex-col items-center justify-center h-32 ${
                                        techFile 
                                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10' 
                                        : 'border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    {uploadingField === 'tech' ? (
                                        <span className="text-xs font-bold text-blue-500 animate-pulse">Uploading...</span>
                                    ) : techFile ? (
                                        <>
                                            <HiCheckCircle className="w-8 h-8 text-emerald-500 mb-2" />
                                            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{techFile}</span>
                                            <span className="text-xs text-emerald-600">Click to replace</span>
                                        </>
                                    ) : (
                                        <>
                                            <HiOutlineCloudUpload className="w-8 h-8 text-slate-400 mb-2" />
                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Technical Proposal</span>
                                            <span className="text-xs text-slate-500">PDF (Max 20MB)</span>
                                        </>
                                    )}
                                </div>

                                {/* Supporting Docs Upload */}
                                <div 
                                    onClick={() => handleFileUpload('support')}
                                    className={`border-2 border-dashed rounded-xl p-4 text-center transition-all cursor-pointer flex flex-col items-center justify-center h-32 ${
                                        supportingFile 
                                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10' 
                                        : 'border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    {uploadingField === 'support' ? (
                                        <span className="text-xs font-bold text-blue-500 animate-pulse">Uploading...</span>
                                    ) : supportingFile ? (
                                        <>
                                            <HiCheckCircle className="w-8 h-8 text-emerald-500 mb-2" />
                                            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{supportingFile}</span>
                                            <span className="text-xs text-emerald-600">Click to replace</span>
                                        </>
                                    ) : (
                                        <>
                                            <HiOutlinePaperClip className="w-8 h-8 text-slate-400 mb-2" />
                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Supporting Evidence</span>
                                            <span className="text-xs text-slate-500">CVs, Case Studies (ZIP)</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 3. COMMERCIAL (EXPANDED) */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                                <HiOutlineCurrencyPound className="w-4 h-4 text-blue-500" /> 3. Commercial Offer
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                {/* Price Input */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Total Contract Value</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-slate-400 font-bold">£</span>
                                        <input 
                                            type="number" 
                                            value={bidAmount}
                                            onChange={(e) => setBidAmount(e.target.value)}
                                            className="w-full pl-8 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-lg"
                                            placeholder="0.00"
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <label className="text-xs text-slate-500">Bid Validity:</label>
                                        <select 
                                            value={validityPeriod} 
                                            onChange={(e) => setValidityPeriod(e.target.value)}
                                            className="bg-slate-100 dark:bg-slate-800 border-none text-xs font-bold rounded px-2 py-1 outline-none"
                                        >
                                            <option value="30">30 Days</option>
                                            <option value="60">60 Days</option>
                                            <option value="90">90 Days</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Pricing Schedule Upload */}
                                <div 
                                    onClick={() => handleFileUpload('price')}
                                    className={`border-2 border-dashed rounded-xl p-3 text-center transition-all cursor-pointer h-full flex flex-col items-center justify-center min-h-[100px] ${
                                        pricingSchedule 
                                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10' 
                                        : 'border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    {uploadingField === 'price' ? (
                                        <span className="text-xs font-bold text-blue-500 animate-pulse">Uploading...</span>
                                    ) : pricingSchedule ? (
                                        <>
                                            <HiCheckCircle className="text-emerald-500 w-5 h-5 mb-1" />
                                            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{pricingSchedule}</span>
                                        </>
                                    ) : (
                                        <>
                                            <HiOutlineCurrencyPound className="w-6 h-6 text-slate-400 mb-1" />
                                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Upload Pricing Schedule</span>
                                            <span className="text-[10px] text-slate-500">Excel / CSV</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 4. SOCIAL VALUE PLEDGE */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                                <HiOutlineHeart className="w-4 h-4 text-red-500" /> 4. Social Value Commitment
                            </h3>
                            <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Committed Spend within Borough:
                                    </label>
                                    <span className="text-lg font-bold text-red-600">{socialValueCommitment}%</span>
                                </div>
                                <input 
                                    type="range" min="0" max="100" step="5"
                                    value={socialValueCommitment}
                                    onChange={(e) => setSocialValueCommitment(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600 mb-4"
                                />
                                <div className="flex gap-2 text-xs text-slate-500 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <HiOutlineCheck className="text-emerald-500 w-4 h-4" />
                                    <span>Based on this commitment, your bid will receive a <strong>+{(socialValueCommitment / 5).toFixed(0)} point</strong> bonus in the evaluation matrix.</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer T&Cs */}
                        <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl">
                            <input 
                                type="checkbox" 
                                id="terms"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" 
                            />
                            <label htmlFor="terms" className="text-xs text-slate-600 dark:text-slate-300 leading-tight">
                                I declare that I have the authority to submit this tender response. I understand that false information regarding Social Value commitments may lead to contract termination.
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit"
                            disabled={!termsAccepted || !bidAmount}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                        >
                            <HiOutlineCheck className="w-5 h-5" />
                            Submit Final Application
                        </button>
                    </motion.form>
                ) : (
                    <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center text-center py-10"
                    >
                        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 mb-6 animate-bounce">
                            <HiCheckCircle className="w-12 h-12" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Application Received</h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8">
                            Your response has been signed and submitted to the HostAContract grid. 
                            <br/><br/>
                            <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Ref: {`SUB-${Math.floor(Math.random()*100000)}`}</span>
                        </p>
                        <button 
                            onClick={onClose}
                            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-2.5 rounded-xl font-bold hover:opacity-90 transition-opacity"
                        >
                            Return to Dashboard
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default SupplierApplyModal;