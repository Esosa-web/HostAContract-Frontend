import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineX, HiOutlineQuestionMarkCircle, HiOutlineCalendar, HiOutlineTag, HiOutlineLocationMarker, HiOutlineOfficeBuilding, HiOutlineCode, HiOutlineDatabase, HiOutlineCurrencyPound } from 'react-icons/hi';

// --- Icon Mapping ---
const iconMap: { [key: string]: React.ReactElement } = {
    "Keyword Search": <HiOutlineQuestionMarkCircle />,
    "Date Filters (Release & Deadline)": <HiOutlineCalendar />,
    "Stage": <HiOutlineTag />,
    "Region & Category": <HiOutlineLocationMarker />,
    "Value (£)": <HiOutlineCurrencyPound />,
    "Buyer Name": <HiOutlineOfficeBuilding />,
    "CPV Codes": <HiOutlineCode />,
    "Sources": <HiOutlineDatabase />
};

const helpContent = [
    { title: "Keyword Search", text: "Search across titles, descriptions, buyers, and suppliers. Use a comma for multiple terms (e.g., 'solar, installation') or quotes for exact phrases (e.g., '\"street lighting\"')." },
    { title: "Date Filters (Release & Deadline)", text: "Filter opportunities based on when their notice was published (Release Date) or when the submission window closes (Deadline Date)." },
    { title: "Stage", text: "Filter by the current phase of the procurement lifecycle. 'Planning' for early notices, 'Tender' for active bids, and 'Award' for completed contracts." },
    { title: "Region & Category", text: "Narrow your search to a specific UK NUTS 1 region for the buyer, or a main procurement category (Goods, Services, or Works)." },
    { title: "Value (£)", text: "Find opportunities within a specific range based on their estimated total contract value in GBP." },
    { title: "Buyer Name", text: "Search for opportunities from a specific public body, council, or government department." },
    { title: "CPV Codes", text: "Use official Common Procurement Vocabulary (CPV) codes to find opportunities in highly specific market sectors. You can find codes using an online browser." },
    { title: "Sources", text: "Select the government portals you want to include in your search: Contracts Finder (CF) for lower-value UK tenders, and Find a Tender Service (FTS) for high-value tenders." }
];

interface FilterHelpPanelProps {
  onClose: () => void;
}

const FilterHelpPanel: React.FC<FilterHelpPanelProps> = ({ onClose }) => {
  return (
    <div className="relative z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
              className="pointer-events-auto w-screen max-w-md"
            >
              <div className="flex h-full flex-col bg-white dark:bg-slate-800 shadow-2xl">
                <header className="bg-slate-50 dark:bg-slate-800/50 px-4 py-5 sm:px-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50" id="slide-over-title">
                      About Filters
                    </h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full p-1 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-label="Close help panel"
                      >
                        <HiOutlineX className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </header>
                
                <div className="relative flex-1 overflow-y-auto px-4 sm:px-6 py-6">
                    <motion.dl 
                        initial="hidden"
                        animate="visible"
                        variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
                        className="space-y-8"
                    >
                        {helpContent.map((item) => (
                            <motion.div 
                                key={item.title} 
                                variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
                                className="flex items-start gap-4"
                            >
                                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300">
                                    {React.cloneElement(iconMap[item.title], { className: "h-6 w-6" } as any)}
                                </div>
                                <div>
                                    <dt className="text-base font-semibold text-slate-900 dark:text-white">{item.title}</dt>
                                    <dd className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</dd>
                                </div>
                            </motion.div>
                        ))}
                    </motion.dl>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterHelpPanel;