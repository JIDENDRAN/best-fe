import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, MessageCircle, Navigation, CheckCircle, ChevronDown, Calendar, Users, ShieldCheck } from 'lucide-react';
import BookingModal from './BookingModal';
import { useState } from 'react';

const SEOLandingPage = ({ 
  title, 
  heroSubtitle, 
  heroBg, 
  sections, 
  faqs 
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#f5f0e8] min-h-screen font-outfit text-left">
      {faqs && faqs.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })}
        </script>
      )}
      {/* ── HERO SECTION ─────────────────────────────────── */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex flex-col justify-center overflow-hidden bg-[#0f2420] pt-24 pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f2420] via-[#0f2420]/80 to-[#0f2420]/40" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-6 animate-fade-in">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-poppins font-black text-white leading-tight mb-6">
                {title}
              </h1>
              <p className="text-white/80 text-lg lg:text-xl max-w-2xl mb-8 leading-relaxed">
                {heroSubtitle}
              </p>
              
              <div className="w-24 h-1 bg-[#d4951e] mb-10 rounded-full" />

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-2.5 px-8 py-4 bg-[#d4951e] hover:bg-[#f0a93a] text-white font-bold rounded-full transition-all text-sm uppercase tracking-wider shadow-xl shadow-[#d4951e]/20"
                >
                  <Navigation className="w-5 h-5" /> Book Your Ride Now
                </button>
                <a 
                  href="tel:6382513075" 
                  className="flex items-center gap-2.5 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all text-sm uppercase tracking-wider backdrop-blur-md"
                >
                  <PhoneCall className="w-5 h-5" /> Call +91 63825 13075
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTENT SECTIONS ─────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Main Content */}
          <div className="lg:col-span-8 space-y-12">
            {sections.map((section, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="prose prose-lg max-w-none text-gray-700 font-outfit"
              >
                <h2 className="text-2xl lg:text-3xl font-poppins font-bold text-[#0f2420] mb-6">
                  {section.heading}
                </h2>
                <div 
                  className="leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: section.content }} 
                />
              </motion.div>
            ))}

            {/* FAQs */}
            {faqs && faqs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-16 pt-12 border-t border-gray-200"
              >
                <h2 className="text-2xl lg:text-3xl font-poppins font-bold text-[#0f2420] mb-8">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <details key={idx} className="group bg-[#fbfbf9] border border-[#edeae1] rounded-2xl overflow-hidden cursor-pointer">
                      <summary className="flex items-center justify-between font-bold text-[#0f2420] p-6 select-none">
                        {faq.q}
                        <ChevronDown className="w-5 h-5 text-[#d4951e] transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-[#edeae1]/50 pt-4">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28">
              {/* Trust Card */}
              <div className="bg-[#fbfbf9] border border-[#edeae1] rounded-3xl p-8 shadow-sm mb-8">
                <h3 className="font-poppins font-bold text-[#0f2420] text-xl mb-6">Why Choose Us?</h3>
                <ul className="space-y-4">
                  {[
                    "Experienced & Professional Drivers",
                    "Well-Maintained Premium Vehicles",
                    "Transparent Pricing, No Hidden Fees",
                    "24/7 Customer Support & Booking",
                    "Safe & Comfortable Journeys"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#25d366] shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Contact Card */}
              <div className="bg-[#0f2420] rounded-3xl p-8 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4951e]/20 rounded-bl-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#25d366]/20 rounded-tr-full blur-2xl" />
                
                <h3 className="font-poppins font-bold text-xl mb-2 relative z-10">Need Help Booking?</h3>
                <p className="text-white/70 text-sm mb-8 relative z-10">Our travel experts are available 24/7 to assist you.</p>
                
                <div className="flex flex-col gap-4 relative z-10">
                  <a href="tel:6382513075" className="bg-white text-[#0f2420] hover:bg-gray-100 font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <PhoneCall className="w-5 h-5 text-[#d4951e]" /> +91 63825 13075
                  </a>
                  <a href="https://wa.me/916382513075" target="_blank" rel="noreferrer" className="bg-[#25d366] text-white hover:bg-[#20b858] font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <MessageCircle className="w-5 h-5" /> WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {modalOpen && (
        <BookingModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default SEOLandingPage;
