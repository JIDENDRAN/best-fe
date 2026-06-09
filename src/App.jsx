// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import DesktopLayout from './components/desktop/DesktopLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import Logo from './assets/logo.jpeg';
import FloatingButtons from './components/FloatingButtons';

const AppContent = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Track page views on route change for Google Tag
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'AW-18225094695', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-wrapper">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-[#0f2420] select-none overflow-hidden"
          >
            {/* Extremely subtle pulsing radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,149,30,0.04)_0%,transparent_60%)] pointer-events-none" />

            <div className="relative flex flex-col items-center z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative mb-8"
              >
                <div className="relative z-10 w-28 h-28 lg:w-32 lg:h-32 rounded-[2rem] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-[#edeae1] p-1.5 flex items-center justify-center overflow-hidden">
                  <img src={Logo} alt="Logo" className="w-full h-full object-contain rounded-[1.5rem]" />
                </div>
                {/* Minimalist animated border ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-3 rounded-[2.5rem] border border-transparent border-t-[#d4951e]/30 border-r-[#d4951e]/10 pointer-events-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex flex-col items-center text-center px-6"
              >
                <h2 className="font-poppins font-black text-2xl lg:text-3xl tracking-tight text-[#0f2420]">
                  Madurai <span className="text-[#d4951e]">Best</span>
                </h2>
                <div className="flex items-center gap-2 mt-3 opacity-60">
                  <span className="w-4 h-px bg-[#0f2420]" />
                  <p className="text-[10px] tracking-[0.2em] font-bold uppercase">Tours & Travels</p>
                  <span className="w-4 h-px bg-[#0f2420]" />
                </div>
              </motion.div>

              {/* Minimal Loading Dots */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-10 flex gap-2"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
                    className="w-1.5 h-1.5 rounded-full bg-[#d4951e]"
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen flex flex-col font-outfit text-gray-800 bg-[#f5f0e8]">
        <main className="flex-grow">
          {isAdminRoute ? (
            <Routes>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          ) : (
            <DesktopLayout />
          )}
        </main>
        {!isAdminRoute && <FloatingButtons />}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
