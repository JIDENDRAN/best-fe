import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, ArrowRight, X, CheckCircle2, ShieldCheck, ThumbsUp, Heart, PhoneCall,
  MessageCircle, Wind, Luggage, Star, Navigation, Car as CarIcon
} from 'lucide-react';
import BookingModal from '../components/BookingModal';
import API_BASE_URL from '../apiConfig';
import { getVehicleImage } from '../utils/imageImports';

import ThirumalaiDesktop from '../assets/thirumalai_desktop.png';

// Helper to parse description string into structured plans
const parseDesc = (descString) => {
  if (!descString) return null;
  const plans = {};
  const sections = descString.split(/\n\s*\n/);
  sections.forEach(sec => {
    const lines = sec.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return;
    const titleLine = lines[0];
    const title = titleLine.replace('[', '').replace(']', '').toUpperCase();
    const items = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(':');
      if (parts.length >= 2) {
        items.push({
          label: parts[0].trim(),
          value: parts.slice(1).join(':').trim()
        });
      }
    }
    if (title.includes('OUTSTATION')) {
      plans.outstation = { title, items };
    } else if (title.includes('DAY RENTAL')) {
      plans.dayRental = { title, items };
    }
  });
  return plans;
};

// ─── Default Vehicles ─────────────────────────────────────────
const defaultVehicles = [
  {
    id: 1, type: 'suv', name: 'Innova Crysta', seats: '7 Seats', bags: '4 Bags', ac: 'AC', price: '₹22/km',
    image: 'car 1.jpeg',
    dayRent: 'Rs. 2700', perKm: 'Rs. 17', minKm: '300 kms',
    extraKm: 'Rs. 22', driverCharge: 'Rs. 400 / day',
  },
  {
    id: 2, type: 'suv', name: 'Toyota Innova', seats: '7 Seats', bags: '4 Bags', ac: 'AC', price: '₹19/km',
    image: 'car 2.jpeg',
    dayRent: 'Rs. 2300', perKm: 'Rs. 13', minKm: '300 kms',
    extraKm: 'Rs. 19', driverCharge: 'Rs. 400 / day',
  },
  {
    id: 3, type: 'sedan', name: 'Swift Dzire', seats: '4 Seats', bags: '2 Bags', ac: 'AC', price: '₹14/km',
    image: 'car 3.png',
    dayRent: 'Rs. 1600', perKm: 'Rs. 11', minKm: '250 kms',
    extraKm: 'Rs. 14', driverCharge: 'Rs. 400 / day',
  },
  {
    id: 4, type: 'tempo', name: 'Tempo Traveller (12 Seater)', seats: '12 Seats', bags: '6 Bags', ac: 'AC', price: '₹25/km',
    image: 'car 4.jpg',
    dayRent: 'Rs. 2800', perKm: 'Rs. 18', minKm: '350 kms',
    extraKm: 'Rs. 25', driverCharge: 'Rs. 400 / day',
  },
  {
    id: 5, type: 'tempo', name: 'Tempo Traveller (18 Seater)', seats: '18 Seats', bags: '8 Bags', ac: 'AC', price: '₹30/km',
    image: 'car 5.jpeg',
    dayRent: 'Rs. 3900', perKm: 'Rs. 22', minKm: '300 kms',
    extraKm: 'Rs. 30', driverCharge: 'Rs. 400 / day',
  },
  {
    id: 6, type: 'tempo', name: 'Urbania', seats: '12+1 / 14+1 Seats', bags: '8 Bags', ac: 'AC', price: '₹27/km',
    image: 'car 6.jpeg',
    dayRent: 'Rs. 7500', perKm: 'Rs. 27', minKm: '250 kms',
    extraKm: 'Rs. 37', driverCharge: 'Rs. 400 / day',
  },
];

const filterTabs = [
  { id: 'all', label: 'All Vehicles', icon: '🚗' },
  { id: 'sedan', label: 'Sedan', icon: '🚙' },
  { id: 'suv', label: 'SUV', icon: '🚐' },
  { id: 'tempo', label: 'Tempo Traveller', icon: '🚌' },
  { id: 'luxury', label: 'Luxury', icon: '👑' },
];

const whyItems = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#d4951e]" />,
    title: 'Safety First',
    desc: 'GPS tracking, verified drivers and well-maintained vehicles for your safety.',
  },
  {
    icon: <ThumbsUp className="w-6 h-6 text-[#d4951e]" />,
    title: 'Best in Class',
    desc: 'Premium vehicles with superior comfort and performance.',
  },
  {
    icon: <Heart className="w-6 h-6 text-[#d4951e]" />,
    title: 'Customer Satisfaction',
    desc: "We go above and beyond to make your journey memorable every time.",
  },
  {
    icon: <PhoneCall className="w-6 h-6 text-[#d4951e]" />,
    title: '24/7 Support',
    desc: 'Our support team is always ready to assist you before, during and after your trip.',
  },
];

// ─── Vehicles Page ────────────────────────────────────────────
const Vehicles = () => {
  const { t } = useTranslation();
  const [cars, setCars] = useState(defaultVehicles);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [modalData, setModalData] = useState({ isOpen: false, vehicle: '' });
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [cardPlans, setCardPlans] = useState({});

  useEffect(() => {
    setLoading(false);
  }, []);

  const openBookingModal = (vehicleName) => setModalData({ isOpen: true, vehicle: vehicleName });

  const filtered = cars.filter(v =>
    activeFilter === 'all' ||
    (v.type && v.type.toLowerCase() === activeFilter) ||
    (v.seats && v.seats.includes('12') && activeFilter === 'tempo') ||
    (v.seats && !v.seats.includes('12') && v.seats.includes('7') && activeFilter === 'suv') ||
    (v.seats && v.seats.includes('4') && activeFilter === 'sedan')
  );

  return (
    <div className="bg-[#f5f0e8] min-h-screen font-outfit">

      {/* ── PAGE HERO ─────────────────────────────────────── */}
      <section className="relative h-80 pt-16 flex items-center justify-center overflow-hidden bg-[#0f2420]">
        {/* Background */}
        <div className="absolute inset-0">
          <img src={ThirumalaiDesktop} alt="Fleet Hero" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,36,32,0.5)] via-[rgba(15,36,32,0.7)] to-[rgba(15,36,32,0.95)]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center px-6"
        >
          <div className="text-[#f5c842] font-dancing text-2xl italic mb-2">Our Fleet</div>
          <h1 className="text-4xl lg:text-6xl font-poppins font-black text-white leading-tight">
            Premium <span className="text-[#f5c842]">Vehicles</span>
          </h1>
          <div className="flex items-center justify-center gap-3 my-3">
            <span className="w-10 h-px bg-[#d4951e]/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#d4951e]" />
            <span className="w-10 h-px bg-[#d4951e]/60" />
          </div>
          <p className="text-white/70 text-sm max-w-lg mx-auto mb-6 leading-relaxed">
            {t('Well-maintained, sanitized and comfortable vehicles for a smooth and safe journey.')}
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
          <span className="text-[#0f2420] font-semibold">Vehicles</span>
        </div>
      </div>

      {/* ── MAIN FLEET SECTION ────────────────────────────── */}
      <section className="py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-6">

          {loading ? (
            <div className="text-center py-12 lg:py-24">
              <div className="w-14 h-14 border-4 border-[#0f2420] border-t-[#d4951e] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#0f2420] font-semibold">Loading vehicles...</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6 w-full pb-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((v, i) => (
                  <motion.div
                    key={v.id || i}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="bg-white rounded-3xl overflow-hidden border border-[#1a3c34]/10 shadow-sm w-full flex flex-col md:flex-row h-auto hover:shadow-xl transition-all duration-300"
                  >
                    {/* Left: Vehicle Image */}
                    <div className="bg-[#f5f0e8] flex flex-col items-center justify-center p-6 md:p-8 md:w-2/5 min-h-[300px]">
                      <img
                        src={getVehicleImage(v.image)}
                        alt={v.name}
                        loading="lazy"
                        className="w-full max-h-64 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                        onError={e => { e.target.src = getVehicleImage('sedan_cab-removebg-preview.png'); }}
                      />
                      <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
                        <div className="flex items-center gap-1 text-[11px] text-gray-600 font-semibold">
                          <Users className="w-3.5 h-3.5 text-[#d4951e]" />
                          {v.seats}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-gray-600 font-semibold">
                          <Wind className="w-3.5 h-3.5 text-[#d4951e]" />
                          {v.ac}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-gray-600 font-semibold">
                          <span className="text-[#d4951e]">🧳</span>
                          {v.bags}
                        </div>
                      </div>
                    </div>

                    {/* Right: Details */}
                    <div className="p-6 md:p-8 flex flex-col justify-between text-left md:w-3/5 border-t md:border-t-0 md:border-l border-[#1a3c34]/10">
                      <div>
                        {/* Type tag & Name */}
                        <div className="flex justify-between items-start mb-0.5">
                          <div className="text-[#d4951e] font-bold text-sm">{v.seats}</div>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#f5f0e8] text-[#0f2420] px-2.5 py-1 rounded-full border border-[#edeae1]">
                            {v.type ? v.type.charAt(0).toUpperCase() + v.type.slice(1) : 'Vehicle'}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-poppins font-black text-[#0f2420] mb-4">{t(v.name)}</h3>

                        {/* Plans Section */}
                        <div className="flex flex-col gap-4 mb-6">
                          {/* Outstation Plan */}
                          <div className="bg-[#fcfcfc] border border-gray-100 rounded-2xl p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                              <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Outstation Plan</span>
                            </div>
                            <div className="flex justify-between items-center mb-2.5">
                              <span className="text-sm font-bold text-[#6b7280]">Rate</span>
                              <span className="text-sm font-bold text-[#111827] bg-white border border-gray-100 px-3 py-1 rounded-md shadow-sm">{v.price || v.perKm}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-bold text-[#6b7280]">Min Distance</span>
                              <span className="text-sm font-bold text-[#111827] bg-white border border-gray-100 px-3 py-1 rounded-md shadow-sm">{v.minKm?.toLowerCase().includes('above') ? v.minKm : `Above ${v.minKm || '300 kms'}`}</span>
                            </div>
                          </div>

                          {/* Day Rental Plan */}
                          <div className="bg-[#fcfcfc] border border-gray-100 rounded-2xl p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Day Rental Plan</span>
                            </div>
                            <div className="flex justify-between items-center mb-2.5">
                              <span className="text-sm font-bold text-[#6b7280]">Base Rent</span>
                              <span className="text-sm font-bold text-[#111827] bg-white border border-gray-100 px-3 py-1 rounded-md shadow-sm">{v.dayRent || '—'}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2.5">
                              <span className="text-sm font-bold text-[#6b7280]">Per km Charge</span>
                              <span className="text-sm font-bold text-[#111827] bg-white border border-gray-100 px-3 py-1 rounded-md shadow-sm">{v.perKm ? (v.perKm.includes('/km') ? v.perKm : `${v.perKm}/km`) : '—'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-bold text-[#6b7280]">Driver Charge</span>
                              <span className="text-sm font-bold text-[#111827] bg-white border border-gray-100 px-3 py-1 rounded-md shadow-sm">{v.driverCharge || '—'}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                        <div>
                          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Starting From</div>
                          <div className="text-xl font-black text-[#111827]">{v.price}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          </button>
                          <button
                            onClick={() => openBookingModal(v.name)}
                            className="bg-[#0f2420] hover:bg-[#1a3c34] text-white font-bold py-2.5 px-6 rounded-xl transition-all text-sm tracking-wide cursor-pointer shadow-md"
                          >
                            {t('Book Now')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* ── CUSTOM VEHICLE BANNER ─────────────────────────── */}
      <section className="py-6 lg:py-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0f2420] rounded-3xl overflow-hidden relative"
          >
            <div className="grid md:grid-cols-2 items-center gap-0">
              {/* Text left */}
              <div className="p-10">
                <div className="w-14 h-14 rounded-2xl bg-[#d4951e]/15 border border-[#d4951e]/25 flex items-center justify-center mb-5">
                  <CarIcon className="w-6 h-6 text-[#d4951e]" />
                </div>
                <h3 className="text-2xl font-poppins font-black text-white mb-2">
                  Need a <span className="text-[#f5c842]">Custom Vehicle?</span>
                </h3>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                  Contact us for special requirements.<br />We'll tailor the perfect ride for you.
                </p>
                <a
                  href="https://wa.me/916382513075"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#d4951e] hover:bg-[#f0a93a] text-white font-extrabold px-6 py-3 rounded-full transition-all shadow-lg text-sm"
                >
                  Request a Custom Vehicle <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Car image right */}
              <div className="hidden md:flex items-end justify-end pr-8 pb-0 pt-6">
                <img
                  src={getVehicleImage('innova_crysta-removebg-preview.png')}
                  alt="Custom Vehicle"
                  loading="lazy"
                  className="h-52 object-contain drop-shadow-2xl filter brightness-110"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#d4951e]" />
              <span className="text-[#d4951e] text-xs font-bold uppercase tracking-widest">WHY CHOOSE US</span>
              <span className="w-8 h-px bg-[#d4951e]" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-poppins font-black text-[#0f2420]">
              Travel with <span className="text-[#d4951e] font-dancing text-4xl normal-case font-bold">Confidence</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {whyItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center border border-[#edeae1] hover:shadow-md hover:border-[#d4951e]/25 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-[#fcf8ee] border border-[#f5c842]/30 flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-poppins font-bold text-[#0f2420] text-sm mb-2">{t(item.title)}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{t(item.desc)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <section className="py-10 lg:py-12 bg-[#0f2420] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={ThirumalaiDesktop} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#d4951e]/15 border border-[#d4951e]/25 flex items-center justify-center shrink-0">
                <span className="text-2xl">🏁</span>
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-poppins font-black text-white leading-tight">
                  Ready to Start Your{' '}
                  <span className="text-[#f5c842] font-dancing text-3xl normal-case font-bold">Journey?</span>
                </h3>
                <p className="text-white/60 text-sm mt-1">
                  Book your ride now and travel with peace of mind.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href="tel:6382513075"
                className="flex items-center gap-2.5 bg-[#d4951e] hover:bg-[#f0a93a] text-white font-extrabold px-6 py-3 rounded-full transition-all shadow-lg text-sm"
              >
                <PhoneCall className="w-4 h-4" /> Book Now <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/916382513075"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 border border-white/20 hover:bg-white/10 text-white font-extrabold px-6 py-3 rounded-full transition-all text-sm backdrop-blur-sm"
              >
                WhatsApp Us
                <svg className="w-4 h-4 fill-[#25d366]" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <BookingModal
        isOpen={modalData.isOpen}
        onClose={() => setModalData({ ...modalData, isOpen: false })}
        defaultVehicle={modalData.vehicle}
      />
    </div>
  );
};

export default Vehicles;
