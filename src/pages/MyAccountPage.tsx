import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  HiOutlineUserCircle, 
  HiOutlineMail, 
  HiOutlineOfficeBuilding, 
  HiOutlineLockClosed,
  HiOutlineSave,
  HiOutlineLogout,
  HiOutlineBadgeCheck
} from 'react-icons/hi';

const MyAccountPage = () => {
  const { user, logout } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  // Mock Form State (Pre-filled with auth data or defaults)
  const [formData, setFormData] = useState({
    firstName: user?.first_name || 'Admin',
    lastName: user?.last_name || 'User',
    email: user?.email || 'admin@council.gov.uk',
    jobTitle: 'Senior Procurement Officer',
    department: 'Infrastructure & Works',
    phone: '0161 234 5000'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8 font-sans">
      
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Account Settings</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your profile and security preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COL: PROFILE CARD */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 text-center relative overflow-hidden">
               {/* Decorative Background */}
               <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-red-500 to-red-600 opacity-90"></div>
               
               <div className="relative z-10 mt-12">
                  <div className="w-24 h-24 mx-auto bg-white dark:bg-slate-900 rounded-full p-1.5 shadow-lg">
                    <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
                        <HiOutlineUserCircle className="w-16 h-16" />
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-4">
                    {formData.firstName} {formData.lastName}
                  </h2>
                  <p className="text-sm text-red-600 font-medium">{formData.jobTitle}</p>
                  
                  <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 bg-slate-50 dark:bg-slate-900/50 py-2 rounded-lg border border-slate-100 dark:border-slate-700">
                     <HiOutlineOfficeBuilding /> Manchester City Council
                  </div>
               </div>
            </div>

            {/* TEAM WIDGET */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
               <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Department Team</h3>
               <div className="space-y-4">
                  {[
                    { name: 'Sarah Jenkins', role: 'Head of Procurement', status: 'Online' },
                    { name: 'David Ross', role: 'Compliance Officer', status: 'Away' },
                    { name: 'Priya Patel', role: 'Works Category Lead', status: 'Online' },
                  ].map((member, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                             <div className="text-sm font-medium text-slate-900 dark:text-white">{member.name}</div>
                             <div className="text-xs text-slate-500">{member.role}</div>
                          </div>
                       </div>
                       <div className={`w-2 h-2 rounded-full ${member.status === 'Online' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-6 text-xs font-medium text-slate-500 hover:text-red-600 transition">View Organization Chart</button>
            </div>
          </div>

          {/* RIGHT COL: FORMS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* PERSONAL DETAILS FORM */}
            <form onSubmit={handleSave} className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Personal Details</h3>
                  <HiOutlineBadgeCheck className="text-emerald-500 w-6 h-6" title="Verified Personnel" />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-2">First Name</label>
                     <input 
                       name="firstName"
                       type="text" 
                       value={formData.firstName}
                       onChange={handleChange}
                       className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white"
                     />
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Last Name</label>
                     <input 
                       name="lastName"
                       type="text" 
                       value={formData.lastName}
                       onChange={handleChange}
                       className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white"
                     />
                  </div>
                  
                  <div className="md:col-span-2">
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Official Email</label>
                     <div className="relative">
                        <HiOutlineMail className="absolute left-4 top-3.5 text-slate-400" />
                        <input 
                          name="email"
                          type="email" 
                          value={formData.email}
                          onChange={handleChange}
                          disabled
                          className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-500 cursor-not-allowed"
                        />
                     </div>
                     <p className="text-xs text-slate-400 mt-2">Contact IT Support to change your official email address.</p>
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Job Title</label>
                     <input 
                       name="jobTitle"
                       type="text" 
                       value={formData.jobTitle}
                       onChange={handleChange}
                       className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white"
                     />
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Department</label>
                     <input 
                       name="department"
                       type="text" 
                       value={formData.department}
                       onChange={handleChange}
                       className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white"
                     />
                  </div>
               </div>

               <div className="flex justify-end">
                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-red-500/20 transition-all disabled:opacity-70"
                  >
                    {isSaving ? 'Saving...' : <><HiOutlineSave /> Save Changes</>}
                  </button>
               </div>
            </form>

            {/* SECURITY SECTION */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Security & Login</h3>
                  <HiOutlineLockClosed className="text-slate-400 w-6 h-6" />
               </div>
               
               <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 mb-4">
                  <div>
                     <div className="text-sm font-bold text-slate-900 dark:text-white">Password</div>
                     <div className="text-xs text-slate-500">Last changed 3 months ago</div>
                  </div>
                  <button className="text-sm font-medium text-slate-600 hover:text-red-600 border border-slate-300 hover:border-red-300 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 transition-colors">
                     Change Password
                  </button>
               </div>

               <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                     <div className="text-sm font-bold text-slate-900 dark:text-white">2-Factor Authentication</div>
                     <div className="text-xs text-slate-500">Currently <span className="text-emerald-600 font-bold">Enabled</span></div>
                  </div>
                  <button className="text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg transition-colors">
                     Configure
                  </button>
               </div>
            </div>

             {/* LOGOUT BUTTON */}
             <button 
                onClick={logout} 
                className="w-full p-4 border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors dark:bg-red-900/10 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/20"
             >
                <HiOutlineLogout /> Sign Out of Session
             </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;