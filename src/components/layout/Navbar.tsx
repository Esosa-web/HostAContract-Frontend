import React, { useState, Fragment } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiMenu, 
  HiX, 
  HiOutlineUserCircle, 
  HiOutlineLogout, 
} from 'react-icons/hi';

// --- ASSETS ---
import logoHostPart from '../../assets/logo-host-part.png'; 
import hacTextPart from '../../assets/logo-acontract-part.png'; // Updated import

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getUserInitials = () => {
    if (user?.first_name) return user.first_name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
    }`;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* ================================================================= */}
          {/* 1. ANIMATED LOGO SECTION */}
          {/* ================================================================= */}
          <div className="flex-shrink-0 flex items-center overflow-visible">
             <Link 
                to="/" 
                className="group relative p-2 rounded-lg overflow-visible focus:outline-none"
             >
                <div className="flex items-center gap-x-0.5">
                    
                    {/* PART A: The Host Icon */}
                    {/* Size: h-9 (36px) to match your reference file */}
                    <div className="relative origin-left transition-transform duration-300 ease-out group-hover:scale-110">
                        <img 
                            src={logoHostPart} 
                            alt="Host Icon" 
                            className="h-9 w-auto object-contain" 
                        />
                        
                        {/* The Status Dot */}
                        <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-slate-900 bg-emerald-500 shadow-sm transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-emerald-500/20"></div>
                    </div>

                    {/* PART B: The 'aContract' Text */}
                    {/* Size: h-5 (20px) to match your reference file */}
                    <div className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                        <img 
                            src={hacTextPart} 
                            alt="aContract Text" 
                            className="h-5 w-auto object-contain mt-0.5" 
                        />
                    </div>

                </div>
             </Link>
          </div>
          {/* ================================================================= */}


          {/* 2. Desktop Navigation */}
          <div className="hidden md:block ml-10">
            <div className="flex items-baseline space-x-4">
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
              {isAuthenticated && (
                 <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
              )}
            </div>
          </div>

          {/* 3. Right Side (User Profile or Login) */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {!isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-red-600 dark:text-slate-300 dark:hover:text-red-400 transition-colors">
                    Log In
                  </Link>
                  <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-slate-900">
                    Register Council
                  </Link>
                </div>
              ) : (
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-shadow">
                      <span className="sr-only">Open user menu</span>
                      <div className="h-9 w-9 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                        <span className="font-bold text-sm">
                          {getUserInitials()}
                        </span>
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white dark:bg-slate-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-slate-100 dark:border-slate-700">
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                        <p className="text-sm text-slate-500 dark:text-slate-400">Signed in as</p>
                        <p className="text-sm font-medium truncate text-slate-900 dark:text-white">{user?.email}</p>
                      </div>
                      
                      <Menu.Item>
                        {({ active }) => (
                          <Link to="/my-account" className={`${active ? 'bg-slate-50 dark:bg-slate-700/50' : ''} flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-200`}>
                            <HiOutlineUserCircle className="mr-3 h-5 w-5 text-slate-400" />
                            My Account
                          </Link>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <button onClick={handleLogout} className={`${active ? 'bg-slate-50 dark:bg-slate-700/50' : ''} flex w-full items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-200`}>
                            <HiOutlineLogout className="mr-3 h-5 w-5 text-slate-400" />
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}
            </div>
          </div>

          {/* 4. Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <HiX className="block h-6 w-6" /> : <HiMenu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
          >
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-red-50 text-red-600' : 'text-slate-700 hover:bg-slate-50'}`}>
                Home
              </NavLink>
              {isAuthenticated && (
                <NavLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-red-50 text-red-600' : 'text-slate-700 hover:bg-slate-50'}`}>
                    Dashboard
                </NavLink>
              )}
            </div>
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 pb-4">
              {!isAuthenticated ? (
                <div className="px-5 space-y-3">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block text-center w-full px-4 py-2 text-slate-600 border border-slate-300 rounded-lg font-medium hover:bg-slate-50">Log In</Link>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="block text-center w-full px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700">Register Council</Link>
                </div>
              ) : (
                <div className="px-5 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500">{user?.email}</span>
                    <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="text-sm font-medium text-red-600">Sign Out</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;