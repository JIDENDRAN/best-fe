import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ShieldCheck, Phone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../assets/logo.jpeg';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const changeLanguage = (lng) => { i18n.changeLanguage(lng); setLangOpen(false); };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Vehicles', path: '/vehicles' },
    { name: 'Packages', path: '/packages' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-[#1a3c34] shadow-[0_4px_30px_rgba(0,0,0,0.25)]'
          : 'bg-gradient-to-b from-[rgba(15,36,32,0.75)] to-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'h-16' : 'h-20'}`}>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-[rgba(212,149,30,0.5)] shadow-lg"
              >
                <img src={Logo} alt="Madurai Best Tours and Travels" className="w-full h-full object-cover" />
              </motion.div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5 font-poppins font-black text-lg text-[#f5c842] tracking-tight leading-none mb-0.5">
                  <span>MADURAI</span>
                  <span>BEST</span>
                </div>
                <span className="font-poppins font-semibold text-xs text-white/90 tracking-widest uppercase leading-none">TOURS & TRAVELS</span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg group ${isActive(link.path)
                    ? 'text-[#f5c842]'
                    : 'text-white/85 hover:text-white'
                    }`}
                >
                  {t(link.name)}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#f5c842] rounded-full transition-all duration-300 ${isActive(link.path) ? 'w-4/5' : 'w-0 group-hover:w-4/5'
                    }`} />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/10 transition-all"
                >
                  {languages.find(l => l.code === i18n.language)?.flag}
                  <span>{languages.find(l => l.code === i18n.language)?.label?.slice(0, 2)}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-44 bg-[#1a3c34] rounded-xl shadow-xl py-2 border border-white/10 z-50 overflow-hidden"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${i18n.language === lang.code
                            ? 'text-[#f5c842] bg-white/10'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                            }`}
                        >
                          <span>{lang.flag}</span>
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Call CTA */}
              <a
                href="tel:6382513075"
                className="flex items-center gap-2 bg-[#d4951e] hover:bg-[#f0a93a] text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[rgba(212,149,30,0.4)] hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                Book Now
              </a>

              {/* Admin */}
              <Link
                to="/admin/dashboard"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/50 transition-all"
                title="Admin"
              >
                <ShieldCheck className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-72 bg-[#1a3c34] z-50 lg:hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <span className="font-poppins font-bold text-white">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-4 flex-1 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive(link.path)
                        ? 'bg-[#d4951e] text-white'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                    >
                      {t(link.name)}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.07 }}
                >
                  <Link
                    to="/admin/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-[#d4951e] bg-white/5 hover:bg-white/10 border border-[#d4951e]/20"
                  >
                    {t('Admin')} <ShieldCheck className="w-4 h-4 ml-auto" />
                  </Link>
                </motion.div>
              </nav>
              <div className="p-4 border-t border-white/10 space-y-3">
                <a href="tel:6382513075" className="flex items-center justify-center gap-2 w-full bg-[#d4951e] text-white font-bold py-3 rounded-xl">
                  <Phone className="w-4 h-4" /> +91 63825 13075
                </a>
                <div className="flex gap-2">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${i18n.language === lang.code ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
                        }`}
                    >
                      {lang.flag} {lang.label.slice(0, 2)}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
