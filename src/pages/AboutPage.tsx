import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    HiOutlineEye,
    HiOutlinePencilAlt,
    HiOutlineUserGroup,
    HiOutlineMail,
    HiOutlineTrendingUp,
    HiOfficeBuilding,
    HiOutlineBriefcase,
    HiOutlineArrowRight,
} from 'react-icons/hi';
import { FaUserTie, FaQuoteLeft } from 'react-icons/fa'; // Kept for specific, well-recognized icons

// =================================================================================
// REUSABLE SUB-COMPONENTS
// =================================================================================

const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`py-20 sm:py-24 px-4 sm:px-6 lg:px-8 ${className}`}
    >
        <div className="max-w-7xl mx-auto">
            {children}
        </div>
    </motion.section>
);

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">{title}</h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{subtitle}</p>
    </div>
);

const TestimonialCard: React.FC<{ quote: string; text: string }> = ({ quote, text }) => (
    <div className="relative bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border-t-4 border-red-600 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <FaQuoteLeft className="absolute top-8 left-8 text-5xl text-slate-100 dark:text-slate-700 -z-0" />
        <div className="relative z-10">
            <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">{quote}</h3>
            <p className="text-slate-600 dark:text-slate-300 italic">“{text}”</p>
        </div>
    </div>
);

const PersonaCard: React.FC<{ icon: React.ReactElement<{ className?: string }>; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start space-x-4">
        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300">
            {React.cloneElement(icon, { className: "h-6 w-6" })}
        </div>
        <div>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h4>
            <p className="mt-1 text-slate-600 dark:text-slate-400">{description}</p>
        </div>
    </div>
);

const PromiseCard: React.FC<{ icon: React.ReactElement<{ className?: string }>; title: string; text: string }> = ({ icon, title, text }) => (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex justify-center items-center mb-4">
            {React.cloneElement(icon, { className: "h-10 w-10 text-red-500" })}
        </div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400">{text}</p>
    </div>
);

// =================================================================================
// MAIN ABOUT PAGE COMPONENT
// =================================================================================

const AboutPage: React.FC = () => {
    return (
        <main className="bg-slate-50 dark:bg-slate-900">
            {/* === HERO SECTION === */}
            <section className="relative text-center py-24 sm:py-32 px-4 bg-white dark:bg-slate-800/30 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(224,242,254,0.4),_transparent_50%)] dark:bg-[radial-gradient(circle_at_center,_rgba(30,64,175,0.15),_transparent_60%)] -z-0"></div>
                <div className="relative max-w-4xl mx-auto z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-slate-900 dark:text-white"
                    >
                        Every single day, public contracts are awarded without your bid.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                        className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
                    >
                        Public sector buyers need what you offer, but they won’t come knocking. We built WinAContract because too many great businesses were missing out—not because they weren't good enough, but because the system was too slow and confusing. <span className="font-semibold text-red-600 dark:text-red-400">We changed that.</span>
                    </motion.p>
                </div>
            </section>

            {/* === CLIENTS' WINS SECTION === */}
            <Section>
                <SectionHeader
                    title="You Can't Win Contracts You Don't See"
                    subtitle="Our customers choose us because missing even one opportunity can mean hundreds of thousands in lost revenue. Here’s what happens when you remove the blindfold:"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <TestimonialCard quote="£150k Secured" text="Before, we couldn’t see public tenders. Now we get targeted opportunities daily and secured £150k in council projects in six months. That’s £150k we’d have missed." />
                    <TestimonialCard quote="£91k First Win" text="Our first bid through the platform won us a £91k consultancy contract. That one win will cover our subscription for 70 years. We wouldn’t have even known it existed." />
                    <TestimonialCard quote="£62k in Month One" text="In our first month, we found a £62k school IT upgrade. The difference? We were first to the opportunity ahead of bigger firms because it was delivered straight to our inbox." />
                </div>
            </Section>

            {/* === WHO WE WORK WITH SECTION === */}
            <Section className="bg-white dark:bg-slate-800/30 border-y border-slate-200 dark:border-slate-700/50">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="lg:pr-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">Who We Help Succeed</h2>
                        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                            Public sector contracts aren’t a level playing field—they’re a race. If you don’t have instant access to every opportunity, you’re not even on the starting line. We work with people who refuse to be left behind.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <PersonaCard icon={<HiOutlineTrendingUp />} title="Growing Companies" description="Dominate your sector before competitors do." />
                        <PersonaCard icon={<HiOfficeBuilding />} title="SMEs" description="Tired of big players scooping up local work." />
                        <PersonaCard icon={<HiOutlineBriefcase />} title="Sector Specialists" description="In construction, IT, marketing, and consultancy." />
                        <PersonaCard icon={<FaUserTie />} title="Entrepreneurs" description="Ready to win within weeks, not years." />
                    </div>
                </div>
            </Section>

            {/* === OUR PROMISE SECTION === */}
            <Section>
                <SectionHeader
                    title="Our Promise: Join the Winning Team"
                    subtitle="We don’t just give you a list of tenders—we give you the exact system the winners use. When you join us, you’re not just buying software; you’re joining a team that moves faster and bids smarter."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <PromiseCard icon={<HiOutlineEye />} title="Never Miss an Opportunity" text="All UK public tenders, all in one place. Your search ends here." />
                    <PromiseCard icon={<HiOutlinePencilAlt />} title="Bid With an Edge" text="Proven bid strategies and support to maximize your win rate from day one." />
                    <PromiseCard icon={<HiOutlineUserGroup />} title="Experts in Your Corner" text="Our team of procurement pros, bid writers, and analysts is here to turn your potential into winning bids." />
                </div>
                <div className="text-center mt-16">
                     <Link to="/pricing" className="inline-flex items-center justify-center bg-red-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300 ease-in-out hover:shadow-xl transform hover:-translate-y-0.5">
                        <span>See Plans & Start Winning</span>
                        <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </Section>

            {/* === INQUIRIES SECTION === */}
            <Section className="bg-red-50 dark:bg-red-900/20">
                <div className="text-center max-w-2xl mx-auto">
                    <HiOutlineMail className="text-red-500 text-4xl mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">Talk to a Real Person</h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                        Got a question before joining? Need help with an active bid? Our team is only ever a call or click away.
                    </p>
                    <div className="mt-8">
                         <a href="mailto:esourcingdata@gmail.com" className="inline-block bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 font-semibold py-3 px-8 rounded-lg shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-0.5">
                            Contact Us Now
                        </a>
                    </div>
                </div>
            </Section>
        </main>
    );
};

export default AboutPage;