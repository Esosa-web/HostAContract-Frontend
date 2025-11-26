import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import ScrollToTop from './components/utils/ScrollToTop';

// --- Pages ---
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyAccountPage from './pages/MyAccountPage';
import Dashboard from './pages/Dashboard';
import HostContractPage from './pages/HostContractPage'; // <--- Now importing the REAL page
import ManageContractPage from './pages/ManageContractPage';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <ScrollToTop />
      <Navbar />
      
      <main className="pt-20 pb-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
          {/* Public / Entry */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Secure Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/host-contract" element={<HostContractPage />} />
          <Route path="/my-account" element={<MyAccountPage />} />
          <Route path="/manage/:id" element={<ManageContractPage />} />
          
          {/* 404 Fallback */}
          <Route path="*" element={<div className="p-20 text-center text-slate-500">404 | Page Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;