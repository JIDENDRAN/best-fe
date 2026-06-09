import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShieldCheck, ThumbsUp, Heart, Award, Star, MapPin, ArrowRight, PhoneCall, MessageCircle, Car, Headset } from 'lucide-react';
import MeenakshiBg from '../assets/meenakshi_bg.png';
import ThirumalaiDesktop from '../assets/thirumalai_desktop.png';
import CinematicSouthIndiaBg from '../assets/cinematic_south_india.png';
import Logo from '../assets/logo.jpeg';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const About = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#f5c842]" />,
      title: t('Safety First'),
      desc: t('Your safety and comfort are our top priorities. We follow strict safety standards on every journey.'),
    },
    {
      icon: <ThumbsUp className="w-6 h-6 text-[#f5c842]" />,
      title: t('Customer Satisfaction'),
      desc: t('We go above and beyond to make sure every traveler has a smooth and memorable experience.'),
    },
    {
      icon: <Heart className="w-6 h-6 text-[#f5c842]" />,
      title: t('Passion for Travel'),
      desc: t('We love what we do and it shows in the care and quality we bring to every tour we plan.'),
    },
  ];

  const teamStats = [
    { icon: <Car className="w-7 h-7 text-[#d4951e]" />, count: '50+', name: 'Professional Drivers', desc: 'Skilled, verified & experienced' },
    { icon: <Headset className="w-7 h-7 text-[#d4951e]" />, count: '24/7', name: 'Customer Support', desc: 'Always here for you, anytime, anywhere' },
    { icon: <MapPin className="w-7 h-7 text-[#d4951e]" />, count: '10+', name: 'Travel Experts', desc: 'Local experts crafting the best experiences' },
    { icon: <Star className="w-7 h-7 text-[#d4951e]" />, count: '1000+', name: 'Happy Reviews', desc: 'Real stories from our valued travelers' },
  ];

  return (
    <div className="bg-[#f5f0e8] min-h-screen font-outfit">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative h-[45vh] lg:h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={CinematicSouthIndiaBg}
            alt="About Us — Madurai Best Tours & Travels"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,36,32,0.6)] via-[rgba(15,36,32,0.65)] to-[rgba(15,36,32,0.92)]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          {/* Cursive tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="w-8 h-px bg-[#d4951e]" />
            <span className="text-[#f5c842] font-dancing text-2xl italic">
              {t('Know More About Us')}
            </span>
            <span className="w-8 h-px bg-[#d4951e]" />
          </motion.div>

          <h1 className="text-4xl lg:text-7xl font-poppins font-black text-white mb-4 leading-tight">
            About <span className="text-[#f5c842]">Us</span>
          </h1>
          <p className="text-lg text-white/75 max-w-xl mx-auto leading-relaxed">
            {t('Your trusted travel partner in South India since 2015.')}
          </p>
        </motion.div>
      </section>

      {/* ── STORY SECTION ────────────────────────────────── */}
      <section className="py-12 lg:py-24 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: Story */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Section tag */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-px bg-[#d4951e]" />
                <span className="text-[#d4951e] text-xs font-bold uppercase tracking-widest">
                  {t('OUR STORY')}
                </span>
              </div>

              <h2 className="text-3xl lg:text-5xl font-poppins font-bold text-[#0f2420] mb-2 leading-tight">
                {t('A Journey of')}
                <br />
                <span className="text-[#d4951e] font-dancing text-4xl lg:text-5xl normal-case font-bold">
                  {t('10+ Years')}
                </span>
              </h2>
              <div className="h-1 w-14 bg-gradient-to-r from-[#d4951e] to-[#f5c842] rounded-full mt-4 mb-8" />

              <p className="text-gray-600 leading-relaxed text-base mb-5">
                {t('Founded with a passion to showcase the beauty, culture and heritage of South India, Madurai Best Tours & Travels has been crafting memorable travel experiences for thousands of happy travelers.')}
              </p>
              <p className="text-gray-600 leading-relaxed text-base mb-10">
                {t('From ancient temple towns to lush hill stations, and from golden beaches to peaceful backwaters — we take care of every detail so you can focus on making memories.')}
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {[
                  { icon: <Star className="w-5 h-5 text-[#d4951e]" />, val: '10+', label: t('Years of Experience') },
                  { icon: <span className="text-base">👥</span>, val: '5000+', label: t('Happy Travelers') },
                  { icon: <span className="text-base">✅</span>, val: '100%', label: t('Satisfaction') },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className="bg-white rounded-2xl p-3 sm:p-5 text-center shadow-sm border border-[#edeae1] hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-center mb-2">{stat.icon}</div>
                    <div className="text-2xl font-poppins font-black text-[#0f2420] mb-1">{stat.val}</div>
                    <div className="text-[10px] text-gray-500 font-semibold leading-tight uppercase tracking-wide">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Image with floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              {/* Decorative offset border */}
              <div className="absolute -top-3 -left-3 w-full h-full rounded-3xl border-2 border-[#d4951e]/25 z-0" />

              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={MeenakshiBg}
                  alt="Madurai — Meenakshi Temple"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2420]/40 to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-[rgba(212,149,30,0.2)] z-20"
              >
                <div className="w-10 h-10 bg-[rgba(212,149,30,0.1)] rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#d4951e]" />
                </div>
                <div>
                  <div className="font-bold text-[#0f2420] text-xs leading-tight">Proudly Serving</div>
                  <div className="font-black text-[#0f2420] text-sm">South India</div>
                  <div className="text-gray-400 text-[10px] font-semibold">Since 2015</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ──────────────────────────────────── */}
      <section className="py-12 lg:py-24 bg-[#0f2420] relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#f5c842] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#f5c842] translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#d4951e]" />
              <span className="text-[#f5c842] text-xs font-bold uppercase tracking-widest">
                {t('WHAT WE STAND FOR')}
              </span>
              <span className="w-8 h-px bg-[#d4951e]" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-poppins font-black text-white">
              {t('Core')} <span className="text-[#f5c842]">{t('Values')}</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#d4951e] to-[#f5c842] rounded-full mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-left hover:border-[#f5c842]/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#f5c842]/20 transition-all">
                  {v.icon}
                </div>
                <h3 className="text-lg font-poppins font-bold text-white mb-3">{v.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PEOPLE BEHIND YOUR JOURNEY ────────────────────── */}
      <section className="py-12 lg:py-24 bg-white border-y border-[#edeae1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-6 h-px bg-[#d4951e]" />
              <span className="text-[#d4951e] text-xs font-bold uppercase tracking-widest">{t('OUR TEAM')}</span>
              <span className="w-6 h-px bg-[#d4951e]" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-poppins font-bold text-[#0f2420] mt-2">
              {t('People Behind Your')}{' '}
              <span className="text-[#d4951e] font-dancing text-4xl lg:text-5xl normal-case font-bold">
                {t('Journey')}
              </span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#d4951e] to-[#f5c842] rounded-full mx-auto mt-4" />
          </div>

          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#edeae1] p-6 lg:p-12 relative overflow-hidden">
            {/* Soft decorative background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#f5c842]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0f2420]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-0 md:divide-x divide-[#edeae1] relative z-10">
              {teamStats.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center px-2 sm:px-4 py-2 md:py-0"
                >
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-[#fcf8ee] flex items-center justify-center mb-4 lg:mb-6 shadow-sm border border-[#f5c842]/20 text-[#d4951e]">
                    {item.icon}
                  </div>
                  <div className="text-3xl lg:text-5xl font-poppins font-black text-[#0f2420] mb-2 lg:mb-3 tracking-tight">
                    {item.count}
                  </div>
                  <h3 className="text-[10px] lg:text-sm font-bold text-[#d4951e] mb-1.5 lg:mb-2 uppercase tracking-widest">{t(item.name)}</h3>
                  <p className="text-gray-500 text-[10px] lg:text-xs leading-relaxed max-w-[200px]">{t(item.desc)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-[#f5f0e8]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0f2420] rounded-3xl p-6 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-8 relative overflow-hidden"
          >
            {/* Decorative bg circles */}
            <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-[#f5c842]/5 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-52 h-52 rounded-full bg-[#d4951e]/5 pointer-events-none" />

            <div className="relative z-10 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#d4951e]/15 border border-[#d4951e]/25 flex items-center justify-center shrink-0">
                <span className="text-2xl">🚀</span>
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-poppins font-black text-white leading-tight">
                  {t('Ready to Explore')}{' '}
                  <span className="text-[#f5c842]">{t('South India?')}</span>
                </h3>
                <p className="text-white/60 text-sm mt-1">
                  {t('Let us take care of everything while you enjoy the journey.')}
                </p>
              </div>
            </div>

            <a
              href="tel:6382513075"
              className="relative z-10 flex items-center gap-2.5 bg-[#d4951e] hover:bg-[#f0a93a] text-white font-extrabold px-7 py-3.5 rounded-full transition-all shadow-lg hover:shadow-xl active:scale-95 text-sm whitespace-nowrap"
            >
              {t('Plan Your Journey Today')} <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;
