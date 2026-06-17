import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import {
  PhoneCall, Calendar, MapPin, Clock, Users, ShieldCheck, Car as CarIcon,
  CheckCircle2, MessageCircle, Star, Wallet, Navigation, ArrowRight,
  ChevronRight, ChevronLeft, Plane, Map, Wind, Sparkles, Award
} from 'lucide-react';
import { getVehicleImage, getPackageImage } from '../utils/imageImports';
import BookingModal from '../components/BookingModal';
import Logo from '../assets/logo.jpeg';
import HeroImage from '../assets/hero.png';
import API_BASE_URL from '../apiConfig';

import MeenakshiDesktop from '../assets/meenakshi_desktop.png';
import MeenakshiMobile from '../assets/meenakshi_mobile.png';
import ThirumalaiDesktop from '../assets/thirumalai_desktop.png';
import ThirumalaiMobile from '../assets/thirumalai_mobile.png';
import RameswaramDesktop from '../assets/rameswaram_desktop.png';
import CinematicSouthIndiaBg from '../assets/cinematic_south_india.png';
import KodaikanalBg from '../assets/kodaikanal_bg.png';
import OotyBg from '../assets/ooty_bg.png';
import KanyakumariBg from '../assets/kanyakumari_bg.png';
import MunnarBg from '../assets/munnar_bg.png';
import ThanjavurBg from '../assets/thanjavur_bg.png';
import MaduraiAerialBg from '../assets/madurai_aerial_bg.png';
import RameswaramBg from '../assets/rameswaram_bg.png';
import MeenakshiBg from '../assets/meenakshi_bg.png';
import KeralaBg from '../assets/kerala_bg.png';
import CochinBg from '../assets/cochin_bg.png';
import AlleppeyBg from '../assets/alleppey_bg.png';
import TrivandrumBg from '../assets/trivandrum_bg.png';
import AthirapillyBg from '../assets/athirapilly_bg.png';

// ─── Default Data ────────────────────────────────────────────
const defaultVehicles = [
  {
    name: 'Innova Crysta',
    seats: '7 Seats',
    ac: 'AC',
    price: '₹22/km',
    image: 'car 1.jpeg',
    dayRent: 'Rs. 2700',
    perKm: 'Rs. 17',
    minKm: '300 kms',
    extraKm: 'Rs. 22',
    driverCharge: 'Rs. 400 / day',
  },
  {
    name: 'Toyota Innova',
    seats: '7 Seats',
    ac: 'AC',
    price: '₹19/km',
    image: 'car 2.jpeg',
    dayRent: 'Rs. 2300',
    perKm: 'Rs. 13',
    minKm: '300 kms',
    extraKm: 'Rs. 19',
    driverCharge: 'Rs. 300 / day',
  },
  {
    name: 'Swift Dzire',
    seats: '4 Seats',
    ac: 'AC',
    price: '₹14/km',
    image: 'car 3.png',
    dayRent: 'Rs. 1600',
    perKm: 'Rs. 11',
    minKm: '250 kms',
    extraKm: 'Rs. 14',
    driverCharge: 'Rs. 300 / day',
  },
  {
    name: 'Tempo Traveller (12 Seater)',
    seats: '12 Seats',
    ac: 'AC',
    price: '₹25/km',
    image: 'car 4.jpg',
    dayRent: 'Rs. 2800',
    perKm: 'Rs. 18',
    minKm: '350 kms',
    extraKm: 'Rs. 25',
    driverCharge: 'Rs. 300 / day',
  },
  {
    name: 'Tempo Traveller (18 Seater)',
    seats: '18 Seats',
    ac: 'AC',
    price: '₹30/km',
    image: 'car 5.jpeg',
    dayRent: 'Rs. 3900',
    perKm: 'Rs. 22',
    minKm: '300 kms',
    extraKm: 'Rs. 30',
    driverCharge: 'Rs. 300 / day',
  },
  {
    name: 'Urbania',
    seats: '12+1 / 14+1 Seats',
    ac: 'AC',
    price: '₹27/km',
    image: 'car 6.jpeg',
    dayRent: 'Rs. 7500',
    perKm: 'Rs. 27',
    minKm: '250 kms',
    extraKm: 'Rs. 37',
    driverCharge: 'Rs. 300 / day',
  },
];

const defaultPackages = [
  { name: 'Madurai Local Tour', duration: '2 Days', places: 'Explore Meenakshi Temple, local markets & heritage sites.', price: '₹2499', rating: '4.8 (892)', image: 'meenakshi_bg.png' },
  { name: 'Rameswaram Tour', duration: '2 Days', places: 'Visit Rameswaram, Dhanushkodi & spiritual places.', price: '₹6499', rating: '4.9 (920)', image: 'rameswaram_bg.png' },
  { name: 'Kodaikanal Tour', duration: '4 Days', places: 'Enjoy lakes, waterfalls & the beauty of the hills.', price: '₹7999', rating: '4.7 (780)', image: 'kodaikanal_bg.png' },
  { name: 'Ooty Tour', duration: '3 Days', places: 'Discover Ooty\'s charm & scenic Nilgiri landscapes.', price: '₹5999', rating: '4.6 (751)', image: 'ooty_bg.png' },
  { name: 'Munnar Tour', duration: '2 Days', places: 'Tea Gardens, Eravikulam National Park, Mattupetty Dam.', price: '₹13000', rating: '4.8 (410)', image: 'munnar_bg.png' },
  { name: 'Kanyakumari Tour', duration: '1 Day', places: 'Vivekananda Rock, Thiruvalluvar Statue, Sunset Point.', price: '₹5500', rating: '4.9 (530)', image: 'kanyakumari_bg.png' },
];

import Feedback1 from '../assets/feedback_1.jpg';
import Feedback2 from '../assets/feedback_2.jpg';
import Feedback3 from '../assets/feedback_3.jpg';
import Feedback4 from '../assets/feedback_4.jpg';
import FeedbackNew1 from '../assets/feedback_new_1.jpg';
import FeedbackNew2 from '../assets/feedback_new_2.jpg';
import FeedbackNew3 from '../assets/feedback_new_3.jpg';
import WA1 from '../assets/WhatsApp Image 2026-06-10 at 12.19.24 PM.jpeg';
import WA2 from '../assets/WhatsApp Image 2026-06-10 at 12.19.24 PM (1).jpeg';
import WA3 from '../assets/WhatsApp Image 2026-06-10 at 12.19.25 PM.jpeg';
import WA4 from '../assets/WhatsApp Image 2026-06-10 at 12.19.25 PM (1).jpeg';
import WA5 from '../assets/WhatsApp Image 2026-06-10 at 12.19.26 PM.jpeg';
import WA6 from '../assets/WhatsApp Image 2026-06-10 at 12.19.27 PM.jpeg';
import WA7 from '../assets/WhatsApp Image 2026-06-10 at 12.19.27 PM (1).jpeg';
import WA8 from '../assets/WhatsApp Image 2026-06-10 at 12.19.28 PM.jpeg';

const reviewsData = [
  { name: 'Rajesh Kannan & Family', text: 'Perfect family tour to Rameswaram & Madurai! Exceptionally clean vehicle & safe driving.', role: 'Coimbatore', rating: 5, avatar: Feedback1, position: 'center 35%' },
  { name: 'Abhishek & Family', text: 'Amazing 5-day South India trip! Punctual driver, great routes, and super comfortable ride.', role: 'Bangalore', rating: 5, avatar: Feedback2, position: 'center 20%' },
  { name: 'Sunita Deshmukh', text: 'Super comfortable Innova Crysta. As solo women travelers, we felt extremely safe!', role: 'Pune', rating: 5, avatar: Feedback3, position: 'center 10%' },
  { name: 'Dr. Sandeep Sen & Group', text: 'Excellent service! Large vehicle, accommodated all luggage, and friendly driver.', role: 'Kolkata', rating: 5, avatar: Feedback4, position: 'center 35%' },
  { name: 'Aarthi & Friends', text: 'Perfect sunset tour! Extremely safe driving and clean car.', role: 'Chennai', rating: 5, avatar: FeedbackNew1, position: 'center 40%' },
  { name: 'Rajesh & Family', text: 'Top-notch service! The driver was friendly, punctual, and very helpful.', role: 'Bangalore', rating: 5, avatar: FeedbackNew2, position: 'center 25%' },
  { name: 'Sanjay Kumar & Group', text: 'Very comfortable ride. The driver knew all local spots and guided us well.', role: 'Hyderabad', rating: 5, avatar: FeedbackNew3, position: 'center 25%' },
  { name: 'Vinoth Kumar & Family', text: 'Very professional driver. The tour was extremely comfortable and safe.', role: 'Salem', rating: 5, avatar: WA1, position: 'center 20%' },
  { name: 'Meenakshi S. & Friends', text: 'Awesome tour! Visited all local temples with zero stress.', role: 'Madurai', rating: 5, avatar: WA2, position: 'center 15%' },
  { name: 'Devendra Nath', text: 'Clean car and highly punctual pickup. Recommend them to everyone!', role: 'Chennai', rating: 5, avatar: WA3, position: 'center 20%' },
  { name: 'Harish & Family', text: 'Best taxi service for family trips. Safe, quick, and polite service.', role: 'Trichy', rating: 5, avatar: WA4, position: 'center 25%' },
  { name: 'Rakesh Balakrishnan', text: 'Very polite driver who knew all routes perfectly. Highly recommended!', role: 'Bangalore', rating: 5, avatar: WA5, position: 'center 20%' },
  { name: 'Sneha Patel', text: 'Felt extremely safe as a solo traveler. Wonderful experience!', role: 'Ahmedabad', rating: 5, avatar: WA6, position: 'center 15%' },
  { name: 'Gurbaksh Singh', text: 'Spacious vehicle, clean AC, and very professional behavior. 5 stars!', role: 'Delhi', rating: 5, avatar: WA7, position: 'center 20%' },
  { name: 'Prabhu Devan', text: 'Smooth and budget-friendly trip. Will definitely book again!', role: 'Kochi', rating: 5, avatar: WA8, position: 'center 25%' }
];

const destinations = [
  { name: 'Madurai', subtext: 'Meenakshi Temple', img: MeenakshiBg, category: 'temple' },
  { name: 'Rameswaram', subtext: 'Spiritual & Peace', img: RameswaramBg, category: 'temple' },
  { name: 'Kodaikanal', subtext: 'Queen of Hills', img: KodaikanalBg, category: 'hills' },
  { name: 'Ooty', subtext: 'Scenic Hill Station', img: OotyBg, category: 'hills' },
  { name: 'Kanyakumari', subtext: 'Where 3 Seas Meet', img: KanyakumariBg, category: 'beaches' },
  { name: 'Thanjavur', subtext: 'Great Chola Temples', img: ThanjavurBg, category: 'heritage' },
  { name: 'Kerala', subtext: "God's Own Country", img: KeralaBg, category: 'nature' },
  { name: 'Cochin', subtext: 'Queen of Arabian Sea', img: CochinBg, category: 'heritage' },
  { name: 'Alleppey', subtext: 'Venice of the East', img: AlleppeyBg, category: 'nature' },
  { name: 'Thiruvananthapuram', subtext: 'Royal Temple City', img: TrivandrumBg, category: 'temple' },
  { name: 'Munnar', subtext: 'Tea Garden Paradise', img: MunnarBg, category: 'hills' },
  { name: 'Athirapilly', subtext: 'Niagara of India', img: AthirapillyBg, category: 'nature' },
];

// ─── Animated Counter ────────────────────────────────────────
const AnimatedCounter = ({ end, duration = 2, suffix = '+', label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  return (
    <div ref={ref} className="text-center font-outfit">
      <div className="text-4xl lg:text-5xl font-poppins font-black text-[#f5c842]">{count.toLocaleString()}{suffix}</div>
      <div className="text-xs text-white/70 uppercase tracking-widest mt-2 font-semibold">{label}</div>
    </div>
  );
};

// ─── Section Header ──────────────────────────────────────────
const SectionHeader = ({ tag, title, subtitle, center = true }) => (
  <div className={`mb-16 ${center ? 'text-center' : 'text-left'}`}>
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`section-tag mb-3 ${center ? 'justify-center' : ''}`}
    >
      {tag}
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-3xl lg:text-5xl font-poppins font-black text-[#1a3c34] leading-tight"
    >
      {title}
    </motion.h2>
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: '60px' }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className={`h-0.5 bg-[#d4951e] mt-4 ${center ? 'mx-auto' : ''}`}
    />
    {subtitle && (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-base text-emerald-950/60 mt-4 max-w-2xl leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// ─── Home Page ───────────────────────────────────────────────
const Home = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], ['0%', '12%']);

  const [bgIndex, setBgIndex] = useState(0);
  const [destCategory, setDestCategory] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    fromLocation: '', toLocation: '', date: '', time: '',
    name: '', phone: '', vehicle: 'Select Vehicle', packageType: 'Custom Trip'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [vehicles, setVehicles] = useState(defaultVehicles);
  const [packages, setPackages] = useState(defaultPackages);
  const [modalData, setModalData] = useState({ isOpen: false, vehicle: '', packageType: '' });
  const [activeVehicle, setActiveVehicle] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const pickupRef = useRef(null);
  const dropRef = useRef(null);
  const [loadingPickup, setLoadingPickup] = useState(false);
  const [loadingDrop, setLoadingDrop] = useState(false);

  const desktopImages = [CinematicSouthIndiaBg, MeenakshiDesktop, ThirumalaiDesktop, RameswaramDesktop, MaduraiAerialBg];
  const mobileImages = [CinematicSouthIndiaBg, MeenakshiMobile, ThirumalaiMobile, RameswaramBg, MaduraiAerialBg];
  const heroImages = isMobile ? mobileImages : desktopImages;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // No Google Maps API to load anymore
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setBgIndex(p => (p + 1) % heroImages.length), 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  useEffect(() => {
    const timer = setInterval(() => setReviewIndex(p => (p + 1) % reviewsData.length), 4000);
    return () => clearInterval(timer);
  }, []);



  const detectLocation = (type) => {
    const isPickup = type === 'pickup';
    const setLoading = isPickup ? setLoadingPickup : setLoadingDrop;
    setLoading(true);
    if (!navigator.geolocation) { alert('Geolocation not supported.'); setLoading(false); return; }
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18`);
          const data = await res.json();
          setFormData(prev => ({ ...prev, [isPickup ? 'fromLocation' : 'toLocation']: data.display_name || `${latitude}, ${longitude}` }));
        } catch { /* ignore */ }
        setLoading(false);
      },
      () => { alert('Could not get location.'); setLoading(false); },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fromLocation || !formData.toLocation || !formData.name || !formData.phone) {
      alert(t('Please fill in all required fields.')); return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setIsSuccess(true);
      const text = `*New Booking Request*\n\nFrom: ${formData.fromLocation}\nTo: ${formData.toLocation}\nDate: ${formData.date}\nTime: ${formData.time}\nVehicle: ${formData.vehicle}\nPackage: ${formData.packageType}\n\n*Customer:*\nName: ${formData.name}\nPhone: ${formData.phone}`;
      setTimeout(() => {
        window.open(`https://wa.me/916382513075?text=${encodeURIComponent(text)}`, '_blank');
        setIsSuccess(false);
        setFormData({ fromLocation: '', toLocation: '', date: '', time: '', name: '', phone: '', vehicle: 'Select Vehicle', packageType: 'Custom Trip' });
      }, 3000);
    } catch { alert(t('Error. Please try WhatsApp directly.')); }
    finally { setIsSubmitting(false); }
  };

  const openBookingModal = (type, value) => {
    if (type === 'vehicle') setModalData({ isOpen: true, vehicle: value, packageType: '' });
    else setModalData({ isOpen: true, vehicle: '', packageType: value });
  };

  const inputCls = 'w-full pl-10 sm:pl-11 pr-10 sm:pr-11 py-2.5 sm:py-3.5 rounded-xl bg-[#f7f5f0] border border-[#e4dfd5] text-gray-800 text-sm placeholder:text-gray-400/80 focus:ring-1 focus:ring-[#d4951e] focus:border-[#d4951e] outline-none transition-all';
  const selectCls = 'w-full pl-4 pr-10 py-2.5 sm:py-3.5 rounded-xl bg-[#f7f5f0] border border-[#e4dfd5] text-gray-800 text-sm font-semibold appearance-none focus:ring-1 focus:ring-[#d4951e] outline-none transition-all cursor-pointer';

  return (
    <div className="bg-[#f5f0e8] min-h-screen font-outfit text-left">

      {/* ── HERO SECTION ─────────────────────────────────── */}
      <section className="relative min-h-[95vh] flex flex-col justify-center overflow-hidden bg-[#0f2420] pt-24 pb-10 lg:py-24">
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence initial={false}>
            <motion.img
              key={bgIndex}
              src={heroImages[bgIndex]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              style={{ y: yBg }}
              className="absolute inset-0 w-full h-full object-cover"
              alt="South India"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f2420] via-[#0f2420]/75 to-[#0f2420]/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-12 items-center">

            {/* Left Column Top: Brand Header */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 lg:row-start-1 lg:col-start-1 lg:self-end text-left flex flex-col items-start w-full order-1"
            >


              <div className="mb-8 lg:mb-6 w-full flex items-center justify-center">
                <img
                  src={HeroImage}
                  alt="Madurai Best Tours and Travels"
                  className="w-11/12 md:w-5/6 lg:w-3/4 max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl object-contain drop-shadow-2xl rounded-3xl"
                />
                <h1 className="sr-only">
                  Madurai Best Tours and Travels – Taxi Service, Cab Booking & Tour Packages in Madurai
                </h1>
              </div>
            </motion.div>

            {/* Left Column Bottom: Description & CTAs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-7 lg:row-start-2 lg:col-start-1 lg:self-start text-left flex flex-col items-start w-full order-3"
            >
              <p className="text-white/80 text-sm max-w-lg mb-6 leading-relaxed">
                {t('Curated heritage journeys, temple tours, hill stations & coastal escapes crafted with comfort and trust.')}
              </p>

              <div className="w-24 h-1 bg-[#d4951e] mb-8 rounded-full" />

              <div className="flex flex-wrap gap-3">
                <a href="tel:6382513075" className="flex items-center gap-2.5 px-8 py-3.5 bg-[#d4951e] hover:bg-[#f0a93a] text-white font-bold rounded-full transition-all text-xs uppercase tracking-wider shadow-lg">
                  <PhoneCall className="w-4 h-4" /> {t('Call Now')}
                </a>
                <a href="https://wa.me/916382513075" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 px-8 py-3.5 border border-[#25d366] hover:bg-[#25d366]/10 text-white font-bold rounded-full transition-all text-xs uppercase tracking-wider backdrop-blur-sm">
                  <MessageCircle className="w-4 h-4 text-[#25d366] fill-current" /> WhatsApp
                </a>
                <a href="https://www.instagram.com/maduraibesttourstravels?utm_source=qr&igsh=dXUzYjVpaXd3NTB6" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 px-8 py-3.5 border border-[#E1306C] hover:bg-[#E1306C]/10 text-white font-bold rounded-full transition-all text-xs uppercase tracking-wider backdrop-blur-sm">
                  <svg className="w-4 h-4 text-[#E1306C]" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.8c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.8c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg> Instagram
                </a>
              </div>

              {/* Trust checklist 2x2 grid */}
              <div className="hidden md:grid grid-cols-2 gap-x-6 gap-y-4 mt-8 w-full max-w-xl border-t border-white/10 pt-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#f5c842]/30 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4.5 h-4.5 text-[#f5c842]" />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold uppercase tracking-wider">{t('Safe & Reliable')}</h4>
                    <p className="text-white/50 text-[10px] mt-0.5 leading-tight">{t('Trusted by thousands of happy travelers')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#f5c842]/30 flex items-center justify-center shrink-0">
                    <Award className="w-4.5 h-4.5 text-[#f5c842]" />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold uppercase tracking-wider">{t('Expert Drivers')}</h4>
                    <p className="text-white/50 text-[10px] mt-0.5 leading-tight">{t('Professional, polite & experienced')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#f5c842]/30 flex items-center justify-center shrink-0">
                    <Wallet className="w-4.5 h-4.5 text-[#f5c842]" />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold uppercase tracking-wider">{t('Best Price Guarantee')}</h4>
                    <p className="text-white/50 text-[10px] mt-0.5 leading-tight">{t('Transparent pricing, no hidden charges')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#f5c842]/30 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-4.5 h-4.5 text-[#f5c842]" />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold uppercase tracking-wider">{t('24/7 Support')}</h4>
                    <p className="text-white/50 text-[10px] mt-0.5 leading-tight">{t('We\'re here for you anytime, anywhere')}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Sleek Light Booking Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 lg:row-span-2 lg:col-start-8 lg:row-start-1 flex justify-center lg:justify-end w-full order-2 mb-10 lg:mb-0"
            >
              <div className="w-full max-w-[440px] bg-[#fbfbf9]/95 backdrop-blur-xl border border-[#edeae1] rounded-3xl p-5 sm:p-7 shadow-2xl text-left">
                <div className="text-center mb-5">
                  <div className="flex items-center justify-center gap-1.5 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#d4951e]" />
                    <span className="text-[#d4951e] text-sm font-bold uppercase tracking-wider">{t('Book Your Private Ride')}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#d4951e]" />
                  </div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">{t('Comfortable. Reliable. On Time.')}</p>
                </div>

                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-8 text-center"
                  >
                    <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-8 h-8 text-green-600 animate-bounce" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{t('Booking Confirmed!')}</h3>
                    <p className="text-gray-500 text-xs mb-4">{t('Redirecting to WhatsApp...')}</p>
                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 3 }} className="h-full bg-green-600" />
                    </div>
                  </motion.div>
                ) : (
                  <form className="space-y-2.5 sm:space-y-4" onSubmit={handleSubmit}>
                    {/* Pickup */}
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d4951e] w-4.5 h-4.5" />
                      <input ref={pickupRef} type="text" name="fromLocation" value={formData.fromLocation}
                        onChange={handleChange} placeholder={t('Pickup Location')} className={inputCls} required />
                      <button type="button" onClick={() => detectLocation('pickup')}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#d4951e] hover:text-[#f5c842] transition-colors flex items-center justify-center">
                        {loadingPickup ? <div className="w-4.5 h-4.5 border-2 border-[#d4951e] border-t-transparent rounded-full animate-spin" />
                          : <Navigation className="w-4.5 h-4.5" />}
                      </button>
                    </div>

                    {/* Drop */}
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d4951e] w-4.5 h-4.5" />
                      <input ref={dropRef} type="text" name="toLocation" value={formData.toLocation}
                        onChange={handleChange} placeholder={t('Drop Location')} className={inputCls} required />
                      <button type="button" onClick={() => detectLocation('drop')}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#d4951e] hover:text-[#f5c842] transition-colors flex items-center justify-center">
                        {loadingDrop ? <div className="w-4.5 h-4.5 border-2 border-[#d4951e] border-t-transparent rounded-full animate-spin" />
                          : <Navigation className="w-4.5 h-4.5" />}
                      </button>
                    </div>

                    {/* Name */}
                    <div className="relative">
                      <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d4951e] w-4.5 h-4.5" />
                      <input type="text" name="name" value={formData.name} onChange={handleChange}
                        placeholder={t('Your Name')} className={`${inputCls} pr-2`} required />
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <PhoneCall className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d4951e] w-4.5 h-4.5" />
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                        placeholder={t('Phone Number')} className={`${inputCls} pr-2`} required />
                    </div>

                    {/* Date & Time */}
                    <div className="grid !grid-cols-2 gap-2.5 sm:gap-3">
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d4951e] w-4.5 h-4.5" />
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          onKeyDown={(e) => e.preventDefault()}
                          onClick={(e) => { try { e.target.showPicker(); } catch (err) { } }}
                          className={`${inputCls} pr-2 ${!formData.date ? 'text-gray-400' : 'text-gray-800'}`}
                          required
                        />
                      </div>
                      <div className="relative">
                        <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d4951e] w-4.5 h-4.5" />
                        <input
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          onKeyDown={(e) => e.preventDefault()}
                          onClick={(e) => { try { e.target.showPicker(); } catch (err) { } }}
                          className={`${inputCls} pr-2 ${!formData.time ? 'text-gray-400' : 'text-gray-800'}`}
                          required
                        />
                      </div>
                    </div>

                    {/* Vehicle & Package */}
                    <div className="grid !grid-cols-2 gap-2.5 sm:gap-3">
                      <div className="relative">
                        <select name="vehicle" value={formData.vehicle} onChange={handleChange} className={selectCls}>
                          <option>{t('Select Vehicle')}</option>
                          {vehicles.map(v => <option key={v.id || v.name} value={v.name}>{t(v.name)}</option>)}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#d4951e]" />
                      </div>
                      <div className="relative">
                        <select name="packageType" value={formData.packageType} onChange={handleChange} className={selectCls}>
                          <option>{t('Custom Trip')}</option>
                          {packages.map(p => <option key={p.id || p.name} value={p.name}>{t(p.name)}</option>)}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#d4951e]" />
                      </div>
                    </div>

                    {/* Submit */}
                    <button type="submit" disabled={isSubmitting}
                      className="w-full bg-[#d4951e] hover:bg-[#f0a93a] text-white font-extrabold py-3.5 sm:py-4 rounded-xl shadow-lg active:scale-[0.97] transition-all flex justify-center items-center gap-2 disabled:opacity-70 text-sm uppercase tracking-wider cursor-pointer mt-1 sm:mt-2"
                    >
                      {isSubmitting ? t('PROCESSING...') : (
                        <>{t('CONFIRM BOOKING')} <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>

                    {/* Secure booking tagline */}
                    <div className="flex items-center justify-center gap-1.5 mt-4 sm:mt-5 text-xs text-gray-500 font-bold">
                      <ShieldCheck className="w-4 h-4 text-[#d4951e]" />
                      <span>{t('100% Secure Booking • No Hidden Charges')}</span>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SEO SECTION: WHY CHOOSE US ────────────────────── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="bg-[#fbfbf9] border border-[#edeae1] rounded-3xl p-8 lg:p-12 shadow-sm text-center">
            <h2 className="text-2xl lg:text-3xl font-poppins font-bold text-[#0f2420] mb-4">
              Why Choose Madurai Best Tours and Travels?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
              <strong>Madurai Best Tours and Travels</strong> offers taxi services, airport transfers, tempo traveller rentals, local sightseeing and South India tour packages. We guarantee the best rates, well-maintained vehicles, and professional drivers to ensure your journey is safe and comfortable.
            </p>
          </div>
        </div>
      </section>

      {/* ── OUR VEHICLES ──────────────────────────────────── */}
      <section className="py-12 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-end justify-between mb-12">
            <SectionHeader
              tag="Our Vehicles"
              title={<>Premium <span className="text-[#1a3c34]">Fleet</span></>}
              center={false}
            />
            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              href="/vehicles"
              className="flex items-center gap-1.5 text-[#1a3c34] font-bold text-sm hover:gap-3 transition-all"
            >
              View All Vehicles <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Vertical Detailed Vehicle List */}
          <div className="flex flex-col gap-6 w-full pb-6">
            {vehicles.map((v, i) => (
              <motion.div
                key={v.name + i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-3xl overflow-hidden border border-[#1a3c34]/10 shadow-sm w-full flex flex-col md:flex-row h-auto hover:shadow-xl transition-all duration-300"
              >
                {/* Left: Vehicle Image */}
                <div className="bg-[#f5f0e8] flex flex-col items-center justify-center p-6 md:p-8 md:w-2/5 min-h-[300px]">
                  <img
                    src={getVehicleImage(v.image)}
                    alt={v.name}
                    loading="lazy"
                    className="w-full max-h-64 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                  />
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1 text-[11px] text-gray-600 font-semibold">
                      <Users className="w-3.5 h-3.5 text-[#d4951e]" />
                      {v.seats}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-gray-600 font-semibold">
                      <Wind className="w-3.5 h-3.5 text-[#d4951e]" />
                      {v.ac}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-gray-600 font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-[#d4951e]" />
                      Clean
                    </div>
                  </div>
                </div>

                {/* Right: Details */}
                <div className="p-6 md:p-8 flex flex-col justify-between text-left md:w-3/5 border-t md:border-t-0 md:border-l border-[#1a3c34]/10">
                  <div>
                    {/* Vehicle name */}
                    <div className="text-[#d4951e] font-bold text-sm mb-0.5">{v.seats}</div>
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
                        onClick={() => openBookingModal('vehicle', v.name)}
                        className="bg-[#0f2420] hover:bg-[#1a3c34] text-white font-bold py-2.5 px-6 rounded-xl transition-all text-sm tracking-wide cursor-pointer shadow-md"
                      >
                        {t('Book Now')}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR DESTINATIONS ──────────────────────────── */}
      <section className="py-12 lg:py-24 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeader
              tag="Explore the Beauty of South India"
              title="Explore Iconic Destinations"
              center={false}
            />
            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              href="/packages"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#d4951e] text-[#1a3c34] hover:bg-[#d4951e] hover:text-white font-bold text-sm rounded-full transition-all"
            >
              {t('Explore All')} <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2.5 mb-10 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: t('All Destinations') },
              { id: 'temple', label: t('Temples') },
              { id: 'hills', label: t('Hills') },
              { id: 'beaches', label: t('Beaches') },
              { id: 'heritage', label: t('Heritage') },
              { id: 'nature', label: t('Nature') }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setDestCategory(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer border ${destCategory === tab.id
                  ? 'bg-[#1a3c34] text-white border-[#1a3c34] shadow-md shadow-[rgba(26,60,52,0.2)]'
                  : 'bg-white text-gray-700 border-[#1a3c34]/10 hover:bg-[#1a3c34]/5'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {destinations
                .filter(dest => destCategory === 'all' || dest.category === destCategory)
                .map((dest, i) => (
                  <motion.div
                    key={dest.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35 }}
                    whileHover={{ y: -6 }}
                    className="dest-card group cursor-pointer"
                    onClick={() => window.location.href = '/packages'}
                  >
                    <div className="aspect-[3/4] relative rounded-3xl overflow-hidden border border-[#1a3c34]/5 shadow-sm">
                      <img src={dest.img} alt={dest.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-5 text-left z-10">
                        <h3 className="text-white font-poppins font-black text-lg leading-tight">{dest.name}</h3>
                        <span className="text-[10px] text-[#f5c842] font-semibold tracking-wider block mt-1">{dest.subtext}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── FEATURED PACKAGES ─────────────────────────────── */}
      <section className="py-12 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeader
              tag="Popular Tours"
              title={<>Featured Tour <span className="text-[#d4951e] font-dancing text-5xl normal-case font-bold">Packages</span></>}
              center={false}
            />
            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              href="/packages"
              className="inline-flex items-center gap-1.5 text-[#1a3c34] font-bold text-sm hover:gap-3 transition-all"
            >
              {t('View All Packages')} <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full pb-4">
            {packages.slice(0, 6).map((pkg, i) => (
              <motion.div
                key={pkg.id || pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="nature-card group border border-[#1a3c34]/10 rounded-3xl bg-white shadow-sm overflow-hidden hover:shadow-xl hover:border-[#1a3c34]/25 transition-all duration-300 flex flex-col w-full h-full animate-fade-in"
              >
                <div className="h-56 relative overflow-hidden bg-[#0f2420] w-full shrink-0">
                  <img
                    src={getPackageImage(pkg.image)}
                    alt={pkg.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Duration badge at top right */}
                  <div className="absolute top-3 right-3 bg-[#f0a93a] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg z-20">
                    {t(pkg.duration)}
                  </div>
                </div>
                <div className="p-5 text-left flex flex-col flex-grow w-full">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-poppins font-black text-[#0f2420] text-base line-clamp-1 flex-grow">{t(pkg.name)}</h3>
                    {pkg.rating && (
                      <div className="flex items-center gap-0.5 text-[10px] font-extrabold text-gray-500 shrink-0 mt-1">
                        <Star className="w-3 h-3 text-[#f5c842] fill-current" />
                        <span>{pkg.rating}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-emerald-950/60 text-xs line-clamp-2 mt-2 mb-4 leading-relaxed min-h-[32px]">{t(pkg.places)}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-[#1a3c34]/5 mt-auto">
                    <span className="text-[#0f2420] font-black text-lg">{pkg.price}</span>
                    <button
                      onClick={() => openBookingModal('package', pkg.name)}
                      className="bg-[#0f2420] hover:bg-[#1a3c34] text-white text-xs font-bold px-5 py-2 rounded-lg transition-all shadow-sm cursor-pointer"
                    >
                      {t('Book Now')}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY TRAVEL WITH US ────────────────────────────── */}
      <section className="py-12 lg:py-24 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <SectionHeader
            tag="Why Travel With Us?"
            title="One Land. Endless Experiences."
            subtitle="From mist-clad mountains to spiritual Coromandel shores — explore South India like never before."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <ShieldCheck className="w-6 h-6 text-[#d4951e]" />, title: 'Safe & Secure', desc: 'Your safety is our highest priority.' },
              { icon: <Clock className="w-6 h-6 text-[#d4951e]" />, title: 'On-Time Guarantee', desc: 'We value your time and ensure punctuality.' },
              { icon: <Wallet className="w-6 h-6 text-[#d4951e]" />, title: 'Transparent Pricing', desc: 'No hidden charges. What you see is what you pay.' },
              { icon: <PhoneCall className="w-6 h-6 text-[#d4951e]" />, title: '24/7 Customer Support', desc: 'We\'re here to assist you anytime, anywhere.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-5 border border-[#edeae1] shadow-sm flex items-center gap-4 text-left transition-all duration-300 hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-full bg-[#fcf8ee] border border-[#f5c842]/30 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-[#0f2420] text-sm mb-1">{t(item.title)}</h3>
                  <p className="text-gray-500 text-[11px] leading-snug">{t(item.desc)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="py-10 lg:py-20 bg-[#1a3c34] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-[#f5c842]" />
          <div className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full bg-[#f5c842]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            <AnimatedCounter end={5000} suffix="+" label="Happy Travelers" />
            <AnimatedCounter end={100} suffix="+" label="Tour Packages" />
            <AnimatedCounter end={50} suffix="+" label="Destinations" />
            <AnimatedCounter end={80} suffix="+" label="Luxury Vehicles" />
          </div>
        </div>
      </section>

      {/* ── UNIQUE EXPERIENCES ────────────────────────────── */}
      <section className="py-12 lg:py-24 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <SectionHeader
            tag="Unique Experiences"
            title={<>Live the South India <span className="text-[#d4951e] font-dancing text-5xl normal-case font-bold">Story</span></>}
            subtitle="Immerse yourself in the rich culture, heritage and natural beauty of South India."
          />

          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Temple Heritage Tours', desc: 'Explore ancient temples & rich culture', icon: '🛕', bg: MeenakshiBg },
              { title: 'Hill Station Escapes', desc: 'Breathe in nature & relax your soul', icon: '⛰️', bg: KodaikanalBg },
              { title: 'Coastal Beach Trips', desc: 'Feel the ocean breeze & unwind', icon: '🌊', bg: KanyakumariBg },
              { title: 'Wildlife & Nature Trails', desc: 'Get closer to nature & wildlife', icon: '🐘', bg: MunnarBg },
              { title: 'Cultural & Food Trails', desc: 'Experience traditions & local flavors', icon: '🍽️', bg: ThanjavurBg },
              { title: 'Airport Transfers', desc: 'Hassle-free & on-time transfers', icon: '✈️', bg: MaduraiAerialBg },
            ].map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative h-60 rounded-3xl overflow-hidden shadow-sm border border-[#1a3c34]/5 cursor-pointer w-[85vw] sm:w-[320px] md:w-auto flex-shrink-0 snap-center md:snap-align-none"
                onClick={() => window.location.href = '/packages'}
              >
                <img src={exp.bg} alt={exp.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Top-left icon badge */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-[#0f2420]/80 border border-white/10 flex items-center justify-center text-lg backdrop-blur-sm z-10">
                  {exp.icon}
                </div>

                {/* Bottom-left titles */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-left z-10">
                  <h3 className="text-white font-poppins font-bold text-base leading-tight mb-1">{t(exp.title)}</h3>
                  <p className="text-white/70 text-[11px] leading-relaxed">{t(exp.desc)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-[#0f2420] relative overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img src={MeenakshiBg} alt="" loading="lazy" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-[#0f2420]/90" />
        </div>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
          <div className="text-center mb-8">
            <span className="text-[#f5c842] text-xs font-bold uppercase tracking-widest block mb-2">{t('WHAT OUR TRAVELERS SAY')}</span>
            <h2 className="text-3xl lg:text-4xl font-poppins font-black text-white">
              {t('Stories from')}{' '}
              <span className="text-[#f5c842] font-dancing text-4xl lg:text-5xl normal-case font-bold">{t('Happy Travelers')}</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#d4951e] mx-auto mt-3" />
          </div>

          <div className="relative px-0 md:px-6">
            {/* Navigation Arrows (Only show if there are more than 3 reviews) */}
            {reviewsData.length > 3 && (
              <>
                <button
                  onClick={() => setReviewIndex(prev => (prev === 0 ? reviewsData.length - 3 : prev - 1))}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 hover:border-[#f5c842] bg-white/5 hover:bg-[#f5c842] hover:text-[#0f2420] text-white flex items-center justify-center transition-all z-20 cursor-pointer md:flex hidden"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setReviewIndex(prev => (prev >= reviewsData.length - 3 ? 0 : prev + 1))}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 hover:border-[#f5c842] bg-white/5 hover:bg-[#f5c842] hover:text-[#0f2420] text-white flex items-center justify-center transition-all z-20 cursor-pointer md:flex hidden"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Testimonials Grid */}
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-4 md:grid md:grid-cols-3 md:overflow-visible">
              {reviewsData.slice(reviewIndex, reviewIndex + 3).map((review, i) => (
                <motion.div
                  key={review.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-4 sm:p-5 flex flex-col justify-between w-[280px] sm:w-[320px] md:w-auto flex-shrink-0 snap-center md:snap-align-none hover:border-[#f5c842]/40 hover:bg-white/10 transition-all duration-300 shadow-lg"
                >
                  <div>
                    {/* Big & Clear Highlighted Image */}
                    <div className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden mb-4 border-2 border-white/20 shadow-md group bg-[#081412]">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        loading="eager"
                        style={{ objectPosition: review.position || 'center' }}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f2420]/30 via-transparent to-transparent opacity-40 pointer-events-none" />
                    </div>

                    {/* Short & Sweet Feedback Content */}
                    <p className="text-white text-center text-xs sm:text-[13px] font-medium leading-relaxed mb-3 px-1 min-h-[36px]">
                      "{t(review.text)}"
                    </p>

                    {/* Rating Stars */}
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(review.rating)].map((_, si) => (
                        <Star key={si} className="w-4 h-4 text-[#f5c842] fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="pt-3 border-t border-white/10 text-center mt-auto">
                    <div className="font-extrabold text-white text-xs tracking-wider font-poppins">{review.name}</div>
                    <div className="text-[#f5c842] text-[10px] uppercase font-bold tracking-widest mt-1.5">{t(review.role)}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          {reviewsData.length > 3 && (
            <div className="flex justify-center gap-2 mt-6">
              {[...Array(reviewsData.length - 2)].map((_, di) => (
                <button
                  key={di}
                  onClick={() => setReviewIndex(di)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${reviewIndex === di ? 'bg-[#f5c842] w-5' : 'bg-white/30'
                    }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <section className="py-10 lg:py-20 bg-[#1a3c34] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={CinematicSouthIndiaBg} alt="" className="w-full h-full object-cover" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <h2 className="text-3xl lg:text-5xl font-poppins font-black text-white mb-4">
            Ready to Start Your <span className="text-[#f5c842]">Journey?</span>
          </h2>
          <p className="text-white/70 text-base mb-8">Let's plan your perfect South India vacation together.</p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <a
              href="tel:6382513075"
              className="flex items-center justify-center w-full sm:w-auto gap-2 px-8 py-4 bg-[#d4951e] hover:bg-[#f0a93a] text-white font-bold rounded-full transition-all shadow-lg active:scale-95 text-xs uppercase tracking-wider"
            >
              <PhoneCall className="w-4.5 h-4.5" /> Get a Free Quote →
            </a>
            <a
              href="https://wa.me/916382513075"
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center w-full sm:w-auto gap-2 px-8 py-4 border border-white/20 hover:bg-white/10 text-white font-bold rounded-full transition-all text-xs uppercase tracking-wider backdrop-blur-sm"
            >
              <MessageCircle className="w-4.5 h-4.5 text-green-400" /> WhatsApp Us
            </a>
            <a
              href="https://www.instagram.com/maduraibesttourstravels?utm_source=qr&igsh=dXUzYjVpaXd3NTB6"
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center w-full sm:w-auto gap-2 px-8 py-4 border border-[#E1306C]/40 hover:bg-[#E1306C]/10 text-white font-bold rounded-full transition-all text-xs uppercase tracking-wider backdrop-blur-sm"
            >
              <svg className="w-4.5 h-4.5 text-[#E1306C]" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.8c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.8c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg> Instagram
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── RICH SEO TRAVEL GUIDE SECTION ────────────────── */}
      <section className="py-12 lg:py-20 bg-white border-t border-[#edeae1]">
        <div className="max-w-6xl mx-auto px-6 text-left">
          <div className="text-center mb-10">
            <span className="text-[#d4951e] text-xs font-bold uppercase tracking-widest block mb-2">{t('COMPREHENSIVE TRAVEL GUIDE')}</span>
            <h2 className="text-3xl lg:text-4xl font-poppins font-black text-[#0f2420]">
              {t('Your Ultimate Guide to Madurai Cab Services & South India Tours')}
            </h2>
            <div className="w-16 h-0.5 bg-[#d4951e] mx-auto mt-3" />
          </div>

          <div className="prose prose-sm max-w-none text-gray-600 space-y-6 leading-relaxed font-outfit">
            <p>
              Welcome to <strong>Madurai Best Tours and Travels</strong>, your premier travel partner and most trusted taxi service provider in South India. Based in the ancient temple city of Madurai, Tamil Nadu, we specialize in offering high-quality, safe, and highly reliable transportation solutions. Whether you require a local taxi service, outstation cab booking, airport transfers, or customized travel packages to cover popular tourist hotspots, our professional crew is dedicated to ensuring you travel in absolute comfort and safety.
            </p>

            <div className="grid md:grid-cols-2 gap-8 pt-4">
              <div>
                <h3 className="text-lg font-poppins font-bold text-[#0f2420] mb-2">
                  Premium Taxi Services & Cab Bookings in Madurai
                </h3>
                <p>
                  Getting around Madurai and its neighboring cities has never been easier. We offer an array of taxi options tailored to your needs. For local city commutes, our <strong>local sightseeing taxi</strong> is perfect for exploring historical monuments like the world-renowned Meenakshi Amman Temple and Thirumalai Nayakar Palace. If you are looking to visit locations outside the city limits, our <strong>outstation cab booking</strong> services provide seamless long-distance transport with options for one-way drops or round-trip journeys.
                </p>
                <p className="mt-2">
                  Additionally, we provide dedicated <strong>Madurai airport taxi services</strong>, offering punctual pick-ups and drops to ensure you never miss a flight. From corporate professionals requiring executive travel to families heading out on pilgrimage, our cabs are clean, fully air-conditioned, and backed by 24/7 client support.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-poppins font-bold text-[#0f2420] mb-2">
                  Diverse Fleet Options: Cabs to Large Tempo Travellers
                </h3>
                <p>
                  To accommodate group sizes of all numbers, we maintain a fleet of modern, well-maintained vehicles. For solo travelers, couples, or small groups of up to four, our sedan and hatchback models—such as the swift <strong>Swift Dzire</strong>—provide a compact and budget-friendly ride. For larger families seeking extra comfort and luggage space, the premium <strong>Toyota Innova</strong> and <strong>Innova Crysta</strong> are the vehicles of choice, offering smooth suspension and executive seating.
                </p>
                <p className="mt-2">
                  For tourist groups, corporate teams, or extended family retreats, we offer spacious multi-seater options. Renting a <strong>Tempo Traveller in Madurai</strong> (available in 12-seater and 18-seater configurations) ensures everyone travels together comfortably. For premium luxury group travel, our state-of-the-art <strong>Force Urbania</strong> coaches provide top-tier comfort with reclining seats and generous headroom.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="text-lg font-poppins font-bold text-[#0f2420] mb-3">
                Specially Curated South India Tour Packages
              </h3>
              <p>
                South India is rich with culture, heritage, architectural marvels, and breathtaking natural beauty. At Madurai Best Tours and Travels, we design customized itineraries that bring you closer to these iconic destinations:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                <li>
                  <strong>Madurai Local Tour:</strong> Immerse yourself in the spiritual vibe of Madurai. Visit the monumental Meenakshi Temple, Gandhi Museum, and witness the architectural beauty of Thirumalai Nayak Palace.
                </li>
                <li>
                  <strong>Spiritual Pilgrimage (Madurai to Rameswaram & Kanyakumari):</strong> Journey to the sacred island of Rameswaram, explore Dhanushkodi, and travel to the southern tip of India at Kanyakumari, where three oceans meet.
                </li>
                <li>
                  <strong>Hill Station Retreats (Kodaikanal & Ooty):</strong> Escape the heat of the plains with a custom trip to the lush green hills, lakes, and viewpoints of Kodaikanal or Ooty.
                </li>
                <li>
                  <strong>Nature & Backwater Tours (Munnar & Kerala):</strong> Explore the rolling tea gardens of Munnar, go on houseboats in Alleppey, and discover the wildlife sanctuaries of Kerala.
                </li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-6">
              <div>
                <h3 className="text-lg font-poppins font-bold text-[#0f2420] mb-2">
                  Expert Local Drivers at Your Service
                </h3>
                <p>
                  We believe that the quality of your driver defines the quality of your trip. That is why all of our drivers are highly experienced, background-verified, and exceptionally polite. Being locals of South India, they possess deep knowledge of all routes, shortcuts, and sightseeing spots, doubling as friendly guides. Furthermore, they are trained in safe, defensive driving techniques, ensuring a secure and stress-free journey for your family.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-poppins font-bold text-[#0f2420] mb-2">
                  Transparent Pricing & No Hidden Charges
                </h3>
                <p>
                  We are committed to building long-term trust with our travelers. Our billing system is completely transparent with no hidden commissions, extra driver fees, or surprise costs. We offer flexible rental plans, including per-kilometer outstation rates and all-inclusive daily rental packages. What we quote is exactly what you pay, ensuring peace of mind throughout your entire travel experience.
                </p>
              </div>
            </div>

            <p className="pt-4 text-center font-semibold text-[#d4951e]">
              Whether you are planning a weekend family pilgrimage, a corporate retreat, or a honeymoon in the hills, trust Madurai Best Tours and Travels to make it a memorable journey. Contact us today for a free customized quote!
            </p>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={modalData.isOpen}
        onClose={() => setModalData({ ...modalData, isOpen: false })}
        defaultVehicle={modalData.vehicle}
        defaultPackage={modalData.packageType}
      />
    </div>
  );
};

export default Home;
