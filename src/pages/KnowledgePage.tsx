// src/pages/KnowledgePage.tsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiBookOpen, FiDollarSign, FiSettings, FiHelpCircle, FiChevronRight, FiPlayCircle, FiMessageSquare } from 'react-icons/fi';

// --- Dummy Data (Replace with real data from a CMS or API later) ---

const categories = [
  { name: 'Getting Started', description: 'Everything you need to set up your account and find your first opportunity.', icon: FiBookOpen, link: '#' },
  { name: 'Billing & Subscription', description: 'Manage your plan, invoices, and payment details.', icon: FiDollarSign, link: '#' },
  { name: 'Advanced Search', description: 'Master filters, CPV codes, and alerts to gain a competitive edge.', icon: FiSearch, link: '#' },
  { name: 'Account Management', description: 'Update your profile, manage team members, and set preferences.', icon: FiSettings, link: '#' },
];

const featuredArticles = [
  { title: 'How to Set Up Your First Tender Alert', category: 'Getting Started', link: '#' },
  { title: 'Understanding Contract Award Notices', category: 'Advanced Search', link: '#' },
  { title: 'Can I Upgrade or Downgrade My Plan?', category: 'Billing & Subscription', link: '#' },
];

const videoTutorials = [
    { title: 'A 5-Minute Guide to Winning Your First Contract', duration: '5:21' },
    { title: 'Mastering the Search Filters', duration: '8:44' },
    { title: 'How to Use the Leaderboards for Market Research', duration: '12:15' },
]

const faqs = [
  { question: 'How often is the tender database updated?', answer: 'Our database is updated daily with thousands of new opportunities from sources across the UK. We aggregate data continuously to ensure you have the most current information available.' },
  { question: 'What is a CPV code and how do I use it?', answer: 'CPV (Common Procurement Vocabulary) codes are a standardized system to classify the subject of public contracts. You can use them in the Advanced Search to find highly specific opportunities. For example, the code for "IT services" is 72000000.' },
  { question: 'How does the "My Favourites" feature work?', answer: 'When you find an opportunity you\'re interested in, click the star icon to add it to your Favourites. This saves it to your account dashboard, allowing you to easily track its progress and deadlines.' },
];

// --- Sub-components for a Clean Structure ---

const CategoryCard: React.FC<typeof categories[0]> = ({ icon: Icon, name, description, link }) => (
    <Link to={link} className="block group">
        <motion.div 
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full"
        >
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300 mb-4">
                <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{name}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{description}</p>
        </motion.div>
    </Link>
);

const FaqItem: React.FC<{ faq: { question: string, answer: string } }> = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.div layout className="py-6 border-b border-slate-200 dark:border-slate-700/50">
            <motion.button layout className="w-full flex justify-between items-center text-left" onClick={() => setIsOpen(!isOpen)}>
                <span className="font-semibold text-lg text-slate-800 dark:text-slate-100">{faq.question}</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="text-slate-500"><FiChevronRight className="h-6 w-6" /></motion.div>
            </motion.button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: '16px' }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// --- Main Knowledge Page Component ---

const KnowledgePage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* 1. Hero and Search Section */}
            <section className="text-center py-20 sm:py-28 px-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <div className="max-w-3xl mx-auto">
                    <FiHelpCircle className="mx-auto h-16 w-16 text-red-500" />
                    <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Knowledge Base
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                        Have a question? Find answers to everything you need to know about our platform.
                    </p>
                    <form className="mt-10 max-w-xl mx-auto flex items-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-full shadow-md">
                        <FiSearch className="h-5 w-5 text-slate-400 ml-5 flex-shrink-0" />
                        <input
                            type="search"
                            placeholder="Search for articles..."
                            className="w-full py-3 pl-4 pr-2 bg-transparent focus:outline-none text-slate-900 dark:text-white placeholder-slate-400"
                        />
                        <button type="submit" className="px-5 py-2.5 m-1 text-sm font-semibold text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors">
                            Search
                        </button>
                    </form>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 space-y-24">
                {/* 2. Categories Section */}
                <section>
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white tracking-tight">Browse by Category</h2>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.map(cat => <CategoryCard key={cat.name} {...cat} />)}
                    </div>
                </section>
                
                {/* 3. Featured Articles & Video Tutorials */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
                    <div className="lg:col-span-1">
                         <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Featured Articles</h2>
                         <div className="mt-8 space-y-4">
                            {featuredArticles.map(article => (
                                <Link key={article.title} to={article.link} className="group block p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <p className="text-xs font-semibold text-red-600 dark:text-red-400">{article.category}</p>
                                    <p className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{article.title}</p>
                                </Link>
                            ))}
                         </div>
                    </div>
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Video Tutorials</h2>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                           {videoTutorials.map(video => (
                                <Link key={video.title} to="#" className="group">
                                    {/* Video Thumbnail Placeholder */}
                                    <div className="aspect-video bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                                         <FiPlayCircle className="h-16 w-16 text-slate-400 dark:text-slate-500 group-hover:text-white transition-colors" />
                                         <div className="absolute inset-0 bg-black/20 group-hover:bg-red-600/70 transition-opacity duration-300"></div>
                                         <span className="absolute bottom-2 right-2 text-xs font-mono bg-black/50 text-white px-1.5 py-0.5 rounded">{video.duration}</span>
                                    </div>
                                    <p className="mt-3 font-semibold text-slate-800 dark:text-slate-100">{video.title}</p>
                                </Link>
                           ))}
                        </div>
                    </div>
                </section>

                {/* 4. FAQ Section */}
                <section>
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white tracking-tight">Frequently Asked Questions</h2>
                    <div className="mt-12 max-w-3xl mx-auto">
                        {faqs.map((faq, i) => <FaqItem key={i} faq={faq} />)}
                    </div>
                </section>
            </div>

            {/* 5. Contact CTA Section */}
            <section className="bg-slate-100 dark:bg-slate-800/50 py-16 text-center rounded-xl">
                 <div className="max-w-2xl mx-auto px-4">
                    <FiMessageSquare className="mx-auto h-12 w-12 text-slate-500" />
                    <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">Still Have Questions?</h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                        Can't find the answer you're looking for? Our support team is here to help.
                    </p>
                    <Link to="/contact" className="mt-6 inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                        Contact Support
                    </Link>
                 </div>
            </section>

        </motion.div>
    );
};

export default KnowledgePage;