import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineLockClosed, HiArrowLeft } from 'react-icons/hi';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="max-w-lg w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 mb-6">
          <HiOutlineLockClosed className="w-8 h-8" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
          Restricted Access
        </h2>
        
        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
          Self-registration is disabled for this portal. Accounts for Local Authorities are provisioned exclusively by the <strong>Central Procurement Administrator</strong>.
        </p>

        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mb-8 text-sm text-slate-500">
          If you require an account, please contact your department head or email <br/>
          <a href="mailto:support@hostacontract.gov.uk" className="text-red-600 font-medium hover:underline">support@hostacontract.gov.uk</a>
        </div>

        <Link to="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-slate-900 hover:bg-slate-800 transition-colors w-full">
          <HiArrowLeft className="mr-2" /> Return to Portal
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;