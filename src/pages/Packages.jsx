import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, X, MapPin, Star, ShieldCheck, Calendar, HeadphonesIcon, Award } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import API_BASE_URL from '../apiConfig';
import { getPackageImage } from '../utils/imageImports';

import MeenakshiBg from '../assets/meenakshi_bg.png';
import RameswaramBg from '../assets/rameswaram_bg.png';
import KodaikanalBg from '../assets/kodaikanal_bg.png';
import OotyBg from '../assets/ooty_bg.png';
import KanyakumariBg from '../assets/kanyakumari_bg.png';
import MunnarBg from '../assets/munnar_bg.png';
import ThanjavurBg from '../assets/thanjavur_bg.png';
import MaduraiAerialBg from '../assets/madurai_aerial_bg.png';
import ThirumalaiDesktop from '../assets/thirumalai_desktop.png';

// Removed hardcoded defaultPackages
const trustItems = [
  { icon: <ShieldCheck className="w-5 h-5 text-[#f5c842]" />, title: 'Best Price Guarantee', desc: 'Get the best deals always' },
  { icon: <Calendar className="w-5 h-5 text-[#f5c842]" />, title: 'Easy Booking', desc: 'Book in just a few clicks' },
  { icon: <span className="text-[#f5c842] text-lg">🎧</span>, title: '24/7 Support', desc: 'We\'re here for you anytime' },
  { icon: <Award className="w-5 h-5 text-[#f5c842]" />, title: 'Trusted & Safe Travel', desc: 'Your safety is our priority' },
];

const Packages = () => {
  const { t } = useTranslation();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState({ isOpen: false, packageType: '' });
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [sortBy, setSortBy] = useState('Popular');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/packages`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setPackages(data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch packages', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const openBookingModal = (pkgName) => setModalData({ isOpen: true, packageType: pkgName });

  return (
    <div className="bg-[#f5f0e8] min-h-screen font-outfit">

      {/* ── PAGE HERO ─────────────────────────────────────── */}
      <section className="relative h-80 pt-18 flex items-center justify-center overflow-hidden bg-[#0f2420]">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={ThirumalaiDesktop} alt="Tour Packages Hero" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,36,32,0.5)] via-[rgba(15,36,32,0.7)] to-[rgba(15,36,32,0.95)]" />
        </div>

        {/* Dotted airplane path decoration */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 opacity-40 hidden lg:block">
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
            <path d="M10 50 Q40 10 80 30 Q100 40 110 20" stroke="#f5c842" strokeWidth="2" strokeDasharray="6 4" fill="none" />
            <text x="85" y="18" fontSize="18" fill="#f5c842">✈</text>
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center px-6"
        >
          <div className="text-[#f5c842] font-dancing text-2xl italic mb-2">Explore</div>
          <h1 className="text-4xl lg:text-6xl font-poppins font-black text-white leading-tight">
            Tour <span className="text-[#f5c842]">Packages</span>
          </h1>
          <div className="flex items-center justify-center gap-3 my-3">
            <span className="w-10 h-px bg-[#d4951e]/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#d4951e]" />
            <span className="w-10 h-px bg-[#d4951e]/60" />
          </div>
          <p className="text-white/70 text-sm max-w-lg mx-auto">
            {t('Explore the beauty of South India with our specially curated tour packages.')}
          </p>
        </motion.div>
      </section>

      {/* ── BREADCRUMB ─────────────────────────────────────── */}
      <div className="bg-white border-b border-[#edeae1]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-gray-500">
          <a href="/" className="hover:text-[#0f2420] transition-colors">Home</a>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-[#0f2420] font-semibold">Tour Packages</span>
        </div>
      </div>

      {/* ── PACKAGES SECTION ──────────────────────────────── */}
      <section className="py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-6">

          {loading ? (
            <div className="text-center py-12 lg:py-24">
              <div className="w-14 h-14 border-4 border-[#0f2420] border-t-[#d4951e] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#0f2420] font-semibold">Loading tour packages...</p>
            </div>
          ) : (
            <>
              {/* Sort bar */}
              <div className="flex justify-end mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-xs font-semibold">Sort by:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-[#edeae1] text-gray-700 text-xs font-semibold pl-3 pr-8 py-2.5 rounded-lg shadow-sm focus:outline-none focus:border-[#d4951e] cursor-pointer"
                    >
                      <option>Popular</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Duration</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-gray-500" />
                  </div>
                </div>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {packages.map((pkg, i) => (
                  <motion.div
                    key={pkg.id || i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(i * 0.08, 0.5) }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#edeae1] hover:shadow-xl hover:border-[#d4951e]/30 transition-all duration-300 group flex flex-col"
                  >
                    {/* Image with price badge */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={getPackageImage(pkg.image)}
                        alt={pkg.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Price badge top right */}
                      <div className="absolute top-3 right-3 bg-[#d4951e] text-white text-xs font-black px-3 py-1 rounded-full shadow-lg">
                        {pkg.price}
                      </div>

                      {/* Duration bottom left */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-[11px] font-semibold bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        <Clock className="w-3 h-3 text-[#f5c842]" />
                        {t(pkg.duration)}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 flex flex-col flex-grow">
                      {/* Title */}
                      <h3 className="font-poppins font-black text-[#0f2420] text-base mb-1 line-clamp-1">
                        {t(pkg.name)}
                      </h3>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium mb-2">
                        <MapPin className="w-3 h-3 text-[#d4951e] shrink-0" />
                        <span className="line-clamp-1">{pkg.location || 'Tamil Nadu'}</span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">
                        {t(pkg.places)}
                      </p>

                      {/* Stars */}
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, si) => (
                          <Star key={si} className={`w-3 h-3 fill-current ${si < Math.floor(parseFloat(pkg.rating || 5)) ? 'text-[#f5c842]' : 'text-gray-300'}`} />
                        ))}
                        <span className="text-[10px] text-gray-500 ml-1">
                          {pkg.rating || '5.0'} ({pkg.reviewCount || '30+'} reviews)
                        </span>
                      </div>

                      {/* Price + Buttons */}
                      <div className="mt-auto">
                        <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Starting from</div>
                        <div className="text-2xl font-poppins font-black text-[#0f2420] mb-3">{pkg.price}</div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedDetails(pkg)}
                            className="flex-1 py-2.5 border border-[#0f2420]/20 text-[#0f2420] font-bold text-xs rounded-lg hover:border-[#0f2420] hover:bg-[#0f2420]/5 transition-all"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => openBookingModal(pkg.name)}
                            className="flex-1 flex items-center justify-center gap-1.5 bg-[#0f2420] hover:bg-[#1a3c34] text-white font-bold py-2.5 rounded-lg transition-all text-xs cursor-pointer"
                          >
                            Book Now <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────── */}
      <section className="py-6 lg:py-8 bg-[#0f2420]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {trustItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 py-4 md:py-0 px-4 first:pt-0 last:pb-0"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{t(item.title)}</div>
                  <div className="text-white/50 text-[11px]">{t(item.desc)}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGE DETAIL MODAL ──────────────────────────── */}
      <AnimatePresence>
        {selectedDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDetails(null)}
              className="absolute inset-0 bg-[rgba(15,36,32,0.75)] backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl z-10 overflow-hidden"
            >
              {/* Header image */}
              <div className="h-52 relative">
                <img
                  src={getPackageImage(selectedDetails.image)}
                  alt={selectedDetails.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,36,32,0.9)] to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <h3 className="text-xl font-poppins font-black text-white">{t(selectedDetails.name)}</h3>
                  <div className="text-[#f5c842] font-bold text-base mt-1">Starting at {selectedDetails.price}</div>
                </div>
                <button
                  onClick={() => setSelectedDetails(null)}
                  className="absolute top-3 right-3 w-9 h-9 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 bg-[#f5f0e8] rounded-xl px-4 py-3">
                  <Clock className="w-4 h-4 text-[#d4951e] shrink-0" />
                  <span className="font-semibold text-[#0f2420] text-sm">{selectedDetails.duration}</span>
                </div>

                {selectedDetails.location && (
                  <div className="flex items-center gap-3 bg-[#f5f0e8] rounded-xl px-4 py-3">
                    <MapPin className="w-4 h-4 text-[#d4951e] shrink-0" />
                    <span className="font-semibold text-[#0f2420] text-sm">{selectedDetails.location}</span>
                  </div>
                )}

                <div className="bg-[#f5f0e8] rounded-xl p-4">
                  <div className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-2">
                    Itinerary Highlights
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{selectedDetails.places}</p>
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className="w-4 h-4 text-[#f5c842] fill-current" />
                  ))}
                  <span className="text-sm text-gray-500 ml-1">Excellent ({selectedDetails.reviewCount || '30+'} reviews)</span>
                </div>

                <button
                  onClick={() => {
                    const n = selectedDetails.name;
                    setSelectedDetails(null);
                    openBookingModal(n);
                  }}
                  className="w-full bg-[#0f2420] hover:bg-[#1a3c34] text-white font-extrabold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  Book This Tour <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <BookingModal
        isOpen={modalData.isOpen}
        onClose={() => setModalData({ ...modalData, isOpen: false })}
        defaultPackage={modalData.packageType}
      />
    </div>
  );
};

export default Packages;
