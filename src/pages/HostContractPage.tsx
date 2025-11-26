import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiArrowLeft, 
  HiOutlineCheck, 
  HiOutlineDocumentAdd, 
  HiOutlineCurrencyPound,
  HiOutlineCalendar,
  HiOutlineClipboardList,
  HiOutlineCloudUpload
} from 'react-icons/hi';

// --- STEPS CONFIGURATION ---
const STEPS = [
  { id: 1, label: 'General Info', icon: HiOutlineClipboardList },
  { id: 2, label: 'Timeline', icon: HiOutlineCalendar },
  { id: 3, label: 'Criteria', icon: HiOutlineCheck },
  { id: 4, label: 'Documents', icon: HiOutlineDocumentAdd },
];

const HostContractPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- FORM STATE (Mirrors your JSON structure) ---
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    value: '',
    procurementMethod: 'Open', // Default from JSON
    mainCategory: 'Works', // Default from JSON
    cpvCode: '45210000',   // Default from JSON
    smeSuitable: true,
    
    // Timeline
    deadlineDate: '',
    deadlineTime: '12:00',
    contractStart: '',
    contractEnd: '',
    
    // Criteria (Weights)
    weightPrice: 30,
    weightQuality: 60,
    weightSocial: 10,
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  // Helper to format "Days Left"
  const getDaysLeft = (dateStr: string) => {
      if (!dateStr) return 'TBC';
      const deadline = new Date(dateStr);
      const today = new Date();
      const diffTime = Math.abs(deadline.getTime() - today.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      return `${diffDays} Days Left`;
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // 1. Build the new contract object
    const newContract = {
        id: Math.floor(Math.random() * 100000), // Random ID
        title: formData.title || 'Untitled Opportunity',
        value: formData.value ? `£${parseInt(formData.value).toLocaleString()}` : '£TBC',
        deadline: getDaysLeft(formData.deadlineDate),
        applicants: 0,
        status: 'Live',
        isLocal: true // Marker for the "NEW" badge
    };

    // 2. Get existing, Append, Save
    const existing = localStorage.getItem('hostacontract_local_tenders');
    const localTenders = existing ? JSON.parse(existing) : [];
    localTenders.push(newContract);
    localStorage.setItem('hostacontract_local_tenders', JSON.stringify(localTenders));

    // 3. Simulate delay & Redirect
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 1500);
  };

  // --- ANIMATION VARIANTS ---
  const slideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8 font-sans flex items-center justify-center">
       
       {/* BACKGROUND AMBIENCE */}
       <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/dashboard" className="flex items-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
            <HiArrowLeft className="mr-2" /> Cancel
          </Link>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Publish New Tender</h1>
            <p className="text-sm text-slate-500">Step {currentStep} of {STEPS.length}</p>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="flex items-center justify-between mb-8 relative">
           
           {/* TRACK CONTAINER - Constrained to connect the centers of the first and last icon */}
           {/* left-5 and right-5 = 1.25rem (20px), which is exactly half of the w-10 (40px) icons */}
           <div className="absolute top-5 left-5 right-5 h-1 -z-10 transform -translate-y-1/2">
              
              {/* Gray Background Line */}
              <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
              
              {/* Active Red Line */}
              <div 
                className="absolute top-0 left-0 h-full bg-red-600 transition-all duration-500 rounded-full"
                style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
              ></div>
           </div>

           {STEPS.map((step) => (
             <div key={step.id} className="flex flex-col items-center gap-2 relative z-10">
                {/* Icon Circle */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  currentStep >= step.id 
                    ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-500/30' 
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-400'
                }`}>
                   <step.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-medium ${currentStep >= step.id ? 'text-red-600' : 'text-slate-400'}`}>
                  {step.label}
                </span>
             </div>
           ))}
        </div>

        {/* FORM CARD */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl p-8 min-h-[500px] flex flex-col">
           
           <div className="flex-grow">
             <AnimatePresence mode="wait">
               
               {/* --- STEP 1: GENERAL INFO --- */}
               {currentStep === 1 && (
                 <motion.div 
                   key="step1" 
                   variants={slideVariants} 
                   initial="hidden" animate="visible" exit="exit"
                   className="space-y-6"
                 >
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Opportunity Basics</h2>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Tender Title</label>
                        <input 
                          type="text" 
                          value={formData.title}
                          onChange={(e) => handleChange('title', e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white"
                          placeholder="e.g. HRP - Reveller TOL Main Works"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Description</label>
                        <textarea 
                          rows={4}
                          value={formData.description}
                          onChange={(e) => handleChange('description', e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white"
                          placeholder="Describe the works required..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                         <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Estimated Value (GBP)</label>
                         <div className="relative">
                            <HiOutlineCurrencyPound className="absolute left-4 top-3.5 text-slate-400" />
                            <input 
                              type="number" 
                              value={formData.value}
                              onChange={(e) => handleChange('value', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white"
                              placeholder="5000000"
                            />
                         </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">CPV Codes</label>
                        <input 
                          type="text" 
                          value={formData.cpvCode}
                          onChange={(e) => handleChange('cpvCode', e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white"
                          placeholder="45210000"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 items-center">
                       <label className="flex items-center gap-3 cursor-pointer p-4 border border-slate-200 dark:border-slate-600 rounded-xl w-full hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                          <input 
                             type="checkbox" 
                             checked={formData.smeSuitable}
                             onChange={(e) => handleChange('smeSuitable', e.target.checked)}
                             className="w-5 h-5 text-red-600 rounded focus:ring-red-500" 
                          />
                          <span className="text-slate-700 dark:text-slate-200 font-medium">Suitable for SME?</span>
                       </label>
                       <div className="w-full">
                          {/* Spacer or 2nd toggle */}
                       </div>
                    </div>
                 </motion.div>
               )}

               {/* --- STEP 2: TIMELINE --- */}
               {currentStep === 2 && (
                 <motion.div 
                   key="step2" 
                   variants={slideVariants} 
                   initial="hidden" animate="visible" exit="exit"
                   className="space-y-6"
                 >
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Process Timeline</h2>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 mb-6">
                       <p className="text-sm text-blue-700 dark:text-blue-300">
                          Please ensure deadlines comply with PA 23.
                       </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Submission Deadline</label>
                          <input 
                             type="date" 
                             value={formData.deadlineDate}
                             onChange={(e) => handleChange('deadlineDate', e.target.value)}
                             className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white"
                          />
                       </div>
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Time</label>
                          <input 
                             type="time" 
                             value={formData.deadlineTime}
                             onChange={(e) => handleChange('deadlineTime', e.target.value)}
                             className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white"
                          />
                       </div>
                    </div>

                    <hr className="border-slate-200 dark:border-slate-700" />

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Contract Duration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Start Date (Est)</label>
                          <input 
                             type="date" 
                             value={formData.contractStart}
                             onChange={(e) => handleChange('contractStart', e.target.value)}
                             className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white"
                          />
                       </div>
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">End Date (Est)</label>
                          <input 
                             type="date" 
                             value={formData.contractEnd}
                             onChange={(e) => handleChange('contractEnd', e.target.value)}
                             className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white"
                          />
                       </div>
                    </div>
                 </motion.div>
               )}

               {/* --- STEP 3: CRITERIA --- */}
               {currentStep === 3 && (
                 <motion.div 
                   key="step3" 
                   variants={slideVariants} 
                   initial="hidden" animate="visible" exit="exit"
                   className="space-y-8"
                 >
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Award Criteria Weighting</h2>
                    <p className="text-slate-500">Define how you will evaluate the bids. Must total 100%.</p>

                    {/* Price Slider */}
                    <div className="space-y-2">
                       <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
                          <span>Price / Commercial</span>
                          <span>{formData.weightPrice}%</span>
                       </div>
                       <input 
                         type="range" min="0" max="100" step="5"
                         value={formData.weightPrice}
                         onChange={(e) => handleChange('weightPrice', parseInt(e.target.value))}
                         className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                       />
                    </div>

                    {/* Quality Slider */}
                    <div className="space-y-2">
                       <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
                          <span>Technical Quality</span>
                          <span>{formData.weightQuality}%</span>
                       </div>
                       <input 
                         type="range" min="0" max="100" step="5"
                         value={formData.weightQuality}
                         onChange={(e) => handleChange('weightQuality', parseInt(e.target.value))}
                         className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                       />
                    </div>

                    {/* Social Value Slider */}
                    <div className="space-y-2">
                       <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
                          <span>Social Value</span>
                          <span>{formData.weightSocial}%</span>
                       </div>
                       <input 
                         type="range" min="0" max="100" step="5"
                         value={formData.weightSocial}
                         onChange={(e) => handleChange('weightSocial', parseInt(e.target.value))}
                         className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                       />
                    </div>

                    {/* Total Check */}
                    <div className={`p-4 rounded-xl text-center font-bold text-lg ${
                       (formData.weightPrice + formData.weightQuality + formData.weightSocial) === 100 
                       ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                       : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                       Total: {formData.weightPrice + formData.weightQuality + formData.weightSocial}%
                    </div>
                 </motion.div>
               )}

               {/* --- STEP 4: DOCUMENTS --- */}
               {currentStep === 4 && (
                 <motion.div 
                   key="step4" 
                   variants={slideVariants} 
                   initial="hidden" animate="visible" exit="exit"
                   className="space-y-6"
                 >
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Tender Documentation</h2>
                    
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-10 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer group">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                           <HiOutlineCloudUpload className="w-8 h-8 text-slate-400 dark:text-slate-300" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-700 dark:text-white">Click or Drag files here</h3>
                        <p className="text-slate-500 text-sm mt-1">Upload ITT, Specs, and Appendices (ZIP, PDF)</p>
                    </div>

                    <div className="space-y-3">
                       <h3 className="text-sm font-semibold text-slate-500 uppercase">Required Files Check</h3>
                       <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <HiOutlineCheck className="text-emerald-500" /> specification-v1.pdf
                       </div>
                       <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <HiOutlineCheck className="text-emerald-500" /> pricing-schedule.xlsx
                       </div>
                    </div>
                 </motion.div>
               )}

             </AnimatePresence>
           </div>

           {/* FOOTER ACTIONS */}
           <div className="pt-8 mt-8 border-t border-slate-200 dark:border-slate-700 flex justify-between">
              <button 
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-xl font-medium transition ${
                   currentStep === 1 
                   ? 'opacity-0 pointer-events-none' 
                   : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                Back
              </button>

              {currentStep < STEPS.length ? (
                 <button 
                   onClick={handleNext}
                   className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-2.5 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                 >
                   Next Step
                 </button>
              ) : (
                 <button 
                   onClick={handleSubmit}
                   className="bg-red-600 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-red-500/30 hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center gap-2"
                 >
                   {isSubmitting ? 'Publishing...' : 'Publish Tender'}
                 </button>
              )}
           </div>

        </div>
      </div>
    </div>
  );
};

export default HostContractPage;