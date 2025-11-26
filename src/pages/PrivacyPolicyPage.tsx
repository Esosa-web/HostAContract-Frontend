import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineShieldCheck, HiOutlineDocumentText, HiOutlineMail } from 'react-icons/hi';

// A reusable component for consistent section styling
const PolicySection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3 mb-6">
      {title}
    </h2>
    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-4">
      {children}
    </div>
  </section>
);

const PrivacyPolicyPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white dark:bg-slate-900"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <HiOutlineShieldCheck className="mx-auto h-16 w-16 text-red-500" />
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Privacy & Cookie Policy
          </h1>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
            Effective Date: 20/07/2025 | Last Updated: 20/07/2025
          </p>
        </div>

        {/* --- PRIVACY POLICY --- */}
        <div className="mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-slate-800 dark:text-white">Privacy Policy</h1>
            <PolicySection title="1. Introduction">
                <p>
                    eSourcing Data Ltd ("we", "our", "us") respects your privacy and is committed to protecting your personal and commercial data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website https://www.winacontract.com (“Website”) and when you create a buyer or supplier account.
                </p>
            </PolicySection>

            <PolicySection title="2. Information We Collect">
                <p>We may collect and process the following types of personal and commercial data:</p>
                <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 !mt-6">a. Personal Data</h3>
                <ul>
                    <li><strong>Contact Details:</strong> Name, email address, phone number, and company name.</li>
                    <li><strong>Account Information:</strong> Login credentials, role/title, preferences, and subscription details.</li>
                    <li><strong>Usage Data:</strong> IP address, browser type, operating system, pages visited, time spent, and referring URLs.</li>
                    <li><strong>Communication Data:</strong> Emails, messages sent via our contact form, or other correspondence.</li>
                    <li><strong>Marketing Preferences:</strong> Your preferences for receiving updates and marketing from us.</li>
                </ul>
                <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 !mt-6">b. Commercial Data</h3>
                <p>(as part of buyer/supplier account creation)</p>
                <ul>
                    <li><strong>Business Profile:</strong> Organisation name, trading status, registration number, VAT number, and sector.</li>
                    <li><strong>Procurement or Supply Interests:</strong> Categories of goods/services bought or sold, geographic areas served, preferred procurement channels.</li>
                    <li><strong>Tender Activity:</strong> Past, current, or intended contract opportunities (if provided).</li>
                    <li><strong>Uploaded Content:</strong> Capability statements, brochures, pricing information, or case studies submitted to your profile.</li>
                </ul>
            </PolicySection>
            
            <PolicySection title="3. How We Use Your Data">
                <p>We use your personal and commercial data to:</p>
                 <ul>
                    <li>Provide access to our website, including buyer and supplier account services;</li>
                    <li>Support networking, visibility, and matching between buyers and suppliers;</li>
                    <li>Respond to enquiries and provide technical and user support;</li>
                    <li>Improve our website, platform features, and service offerings;</li>
                    <li>Send relevant updates, tender alerts, and marketing communications (where opted in);</li>
                    <li>Comply with legal obligations and maintain platform integrity.</li>
                </ul>
            </PolicySection>

             <PolicySection title="4. Legal Basis for Processing">
                <p>We process your data based on:</p>
                 <ul>
                    <li><strong>Consent:</strong> For marketing communications or optional profile data;</li>
                    <li><strong>Contractual Necessity:</strong> To provide the services related to your account;</li>
                    <li><strong>Legal Obligation:</strong> For regulatory compliance;</li>
                    <li><strong>Legitimate Interest:</strong> To operate and improve our platform and user experience.</li>
                </ul>
            </PolicySection>

             <PolicySection title="5. Sharing Your Data">
                <p>We do not sell your data. We may share personal or commercial data with:</p>
                 <ul>
                    <li>Other users of the platform (e.g. limited business profile details such as your organisation's name and sector shown in public listings);</li>
                    <li>Service providers (e.g. cloud hosting, analytics, email tools);</li>
                    <li>Regulators, legal advisors, or law enforcement when legally required;</li>
                    <li>Third parties with your explicit consent.</li>
                </ul>
            </PolicySection>
            
            <PolicySection title="6. Data Security & Retention">
                 <p>We employ robust technical and organisational measures to secure your data against unauthorised access, loss, or disclosure. Your data is retained only for as long as necessary to fulfil the purposes outlined above, or as required by law.</p>
            </PolicySection>

            <PolicySection title="7. Your Rights">
                <p>You have the right to:</p>
                <ul>
                    <li>Access and receive a copy of your personal data;</li>
                    <li>Rectify inaccurate or incomplete data;</li>
                    <li>Request deletion of your data;</li>
                    <li>Object to certain types of processing;</li>
                    <li>Withdraw consent at any time;</li>
                    <li>Lodge a complaint with the Information Commissioner’s Office (ICO).</li>
                </ul>
                <p>Contact us at <a href="mailto:info@winacontract.com" className="font-semibold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500">info@winacontract.com</a> to exercise these rights.</p>
            </PolicySection>

            <PolicySection title="8. Cookies & Third-Party Links">
                <p>We use cookies to enhance functionality and analyse website usage. See our Cookie Policy below for full details. Our site may link to other websites not governed by this policy. Please review their privacy policies before submitting any data.</p>
            </PolicySection>

             <PolicySection title="9. Changes to This Policy">
                <p>We may update this Privacy Policy to reflect changes in law, technology, or services. Updates will be posted on this page with a revised effective date.</p>
            </PolicySection>
        </div>
        
        <hr className="border-t border-slate-200 dark:border-slate-700 my-16" />

        {/* --- COOKIE POLICY --- */}
        <div className="mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-slate-800 dark:text-white">Cookie Policy</h1>
             <PolicySection title="1. What Are Cookies?">
                 <p>Cookies are small text files placed on your device when you visit a website. They help us recognise your device, improve functionality, analyse site usage, and personalise your experience.</p>
            </PolicySection>
            <PolicySection title="2. Types of Cookies We Use">
                 <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 !mt-6">a. Strictly Necessary Cookies</h3>
                 <p>These are essential for the Website to function properly and cannot be switched off. They are usually set in response to actions made by you, such as logging in, filling out forms, or setting your privacy preferences.</p>
                 <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 !mt-6">b. Performance Cookies</h3>
                 <p>These cookies collect anonymous information about how visitors use our Website, such as which pages are visited most often. This helps us improve functionality and performance. We use tools like Google Analytics (with anonymised IPs).</p>
                 <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 !mt-6">c. Functional Cookies</h3>
                 <p>These allow the Website to remember choices you make (e.g. your username, language, or region) and provide enhanced features.</p>
                  <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 !mt-6">d. Targeting/Advertising Cookies</h3>
                 <p>We do not currently use advertising cookies. If we do so in the future, this policy will be updated accordingly.</p>
            </PolicySection>
             <PolicySection title="3. Managing Cookies">
                <p>You can control and manage cookies via the cookie consent banner on your first visit. Additionally, most browsers allow you to block or delete cookies through their settings, though this may impact your experience.</p>
            </PolicySection>
             <PolicySection title="4. Contact Us">
                 <p>If you have any questions about this policy or our data practices, please contact us:</p>
                 <div className="mt-4 not-prose flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
                    <div className="flex items-center">
                        <HiOutlineMail className="h-6 w-6 mr-3 text-slate-500 dark:text-slate-400"/>
                        <a href="mailto:info@winacontract.com" className="font-semibold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500">info@winacontract.com</a>
                    </div>
                     <div className="flex items-center">
                        <HiOutlineDocumentText className="h-6 w-6 mr-3 text-slate-500 dark:text-slate-400"/>
                        <p className="text-slate-700 dark:text-slate-300">eSourcing Data Ltd, 63 Mill Lane, London, NW6 1NB, UK</p>
                    </div>
                </div>
            </PolicySection>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicyPage;