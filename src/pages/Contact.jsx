import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageCircle, Clock, Headset, ShieldCheck, ArrowRight, Calendar, Car as CarIcon } from 'lucide-react';
import API_BASE_URL from '../apiConfig';
import CinematicSouthIndiaBg from '../assets/cinematic_south_india.png';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSuccess(true);
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else alert(t('Failed to send message. Please call us instead.'));
    } catch {
      alert(t('Connection error. Please try calling or WhatsApp.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls = 'w-full px-5 py-3.5 rounded-xl bg-transparent border border-gray-200 focus:outline-none focus:border-[#0f2420] focus:ring-1 focus:ring-[#0f2420] transition-all text-gray-800 font-medium placeholder:text-gray-400';

  return (
    <div className="bg-[#f5f0e8] min-h-screen font-outfit">

      {/* ── PAGE HERO ─────────────────────────────────────── */}
      <section className="relative min-h-[400px] lg:min-h-[600px] lg:h-[75vh] flex items-center pt-16 lg:pt-24 pb-10 lg:pb-16 overflow-hidden bg-[#0f2420]">
        <div className="absolute inset-0">
          <img src={CinematicSouthIndiaBg} alt="Contact Hero" className="w-full h-full object-cover opacity-40 object-right" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f2420] via-[#0f2420]/80 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="text-[#d4951e] font-dancing text-2xl lg:text-3xl mb-2">Get In Touch</div>
            <h1 className="text-4xl lg:text-6xl font-poppins font-black text-white mb-6 leading-tight">
              Let's Plan Your <br/>
              <span className="text-[#d4951e]">Perfect Journey</span>
            </h1>
            <p className="text-white/80 text-lg mb-10 max-w-lg leading-relaxed">
              Have questions about tours, vehicle booking, or custom travel packages? We're here to help.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <a href="tel:6382513075" className="flex items-center gap-2 bg-transparent border border-[#d4951e] text-[#d4951e] hover:bg-[#d4951e] hover:text-white font-bold px-8 py-3.5 rounded-xl transition-all">
                <Phone className="w-5 h-5" /> Call Now
              </a>
              <a href="https://wa.me/916382513075" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 border border-transparent bg-[#25D366] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#1ebd5a] transition-all">
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                { icon: <Headset className="w-4 h-4" />, text: "Instant Support" },
                { icon: <Clock className="w-4 h-4" />, text: "24/7 Assistance" },
                { icon: <CarIcon className="w-4 h-4" />, text: "Custom Packages" },
                { icon: <ShieldCheck className="w-4 h-4" />, text: "Trusted Service" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 border border-white/20 rounded-lg px-4 py-2 text-white/80 text-xs font-semibold backdrop-blur-sm">
                  <span className="text-[#d4951e]">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-gray-500 font-medium">
        Home &gt; <span className="text-[#0f2420] font-bold">Contact Us</span>
      </div>

      {/* ── WE'D LOVE TO HEAR FROM YOU ───────────────────────────── */}
      <section className="py-10 lg:py-12 pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#d4951e]" />
              <span className="text-[#d4951e] text-xs font-bold uppercase tracking-widest">GET IN TOUCH</span>
              <span className="w-8 h-px bg-[#d4951e]" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-poppins font-black text-[#0f2420] mb-4">
              We'd Love to Hear From You
            </h2>
            <p className="text-gray-600">
              Reach out to us for bookings, inquiries, or customized travel plans.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            
            {/* Left: Contact Details */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-[#0f2420] rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden"
            >
              {/* Decorative faint pattern/circles */}
              <div className="absolute -right-20 -top-20 w-64 h-64 border border-white/5 rounded-full" />
              <div className="absolute right-0 bottom-0 w-40 h-40 border border-[#d4951e]/10 rounded-full translate-x-1/3 translate-y-1/3" />
              
              <h3 className="text-[#d4951e] font-bold tracking-wide mb-8">CONTACT DETAILS</h3>
              
              <div className="space-y-8 relative z-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 text-[#d4951e]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#d4951e] mb-1">Address</h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      154/155 Krishna Nagar, Sakkudi Bus Stop,<br/>
                      Manalur Post, Manalur, Madurai,<br/>
                      Tamil Nadu 630611
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 text-[#d4951e]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#d4951e] mb-1">Phone</h4>
                    <p className="text-white/80 text-sm">
                      <a href="tel:+916382513075" className="hover:text-[#f5c842] transition-colors">+91 63825 13075</a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 text-[#d4951e]">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#d4951e] mb-1">WhatsApp</h4>
                    <p className="text-white/80 text-sm">
                      <a href="https://wa.me/916382513075" target="_blank" rel="noreferrer" className="hover:text-[#f5c842] transition-colors">+91 63825 13075</a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 text-[#d4951e]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#d4951e] mb-1">Email</h4>
                    <p className="text-white/80 text-sm">
                      <a href="mailto:maduraibesttoursandtravels01@gmail.com" className="hover:text-[#f5c842] transition-colors">maduraibesttoursandtravels01@gmail.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 text-[#d4951e]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#d4951e] mb-1">Working Hours</h4>
                    <p className="text-white/80 text-sm">Mon - Sun : 24/7 Open</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-bold text-[#0f2420] mb-6 lg:mb-8 uppercase tracking-wide">
                SEND US A MESSAGE
              </h3>

              {isSuccess ? (
                <div className="py-12 text-center">
                  <div className="text-4xl lg:text-5xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold text-[#0f2420] mb-2">Message Sent!</h3>
                  <p className="text-gray-500">We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                      className={inputCls} placeholder="Your Name" required />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                      className={inputCls} placeholder="Phone Number" required />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                      className={inputCls} placeholder="Email Address" />
                    <input type="text" name="subject" value={formData.subject} onChange={handleInputChange}
                      className={inputCls} placeholder="Subject" />
                  </div>
                  <textarea name="message" value={formData.message} onChange={handleInputChange}
                    rows="6" className={`${inputCls} resize-none`}
                    placeholder="Your Message" required />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0f2420] hover:bg-[#1a3c34] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2.5 disabled:opacity-70"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="w-4 h-4 ml-1" />
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── MAP SECTION ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 mb-12 lg:mb-20 relative">
        <div className="w-full h-[400px] rounded-3xl overflow-hidden bg-gray-200 relative border border-gray-200">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125745.89736881774!2d78.04042125550269!3d9.917826702755255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0xdc955b7264f63933!2sMadurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Madurai Location Map"
          ></iframe>
          
          {/* Map Overlay Card */}
          <div className="absolute top-6 left-6 bg-white p-5 rounded-2xl shadow-lg border border-gray-100 flex items-start gap-4 max-w-sm">
            <div className="text-[#d4951e] mt-1">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#0f2420] text-sm mb-1">Our Office Location</h4>
              <p className="text-[#d4951e] text-xs font-semibold mb-1">Madurai Best Tours & Travels</p>
              <p className="text-gray-500 text-xs">Madurai, Tamil Nadu</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CONTACT US ───────────────────────────────── */}
      <section className="py-12 bg-white rounded-t-[2rem] lg:rounded-t-[3rem] border-t border-gray-100 pt-12 lg:pt-20 pb-12 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#d4951e]" />
              <span className="text-[#d4951e] text-xs font-bold uppercase tracking-widest">WHY CONTACT US</span>
              <span className="w-8 h-px bg-[#d4951e]" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-poppins font-black text-[#0f2420]">
              We're Here to Help You
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: <Headset className="w-6 h-6" />, title: "Quick Response", desc: "We reply to all inquiries as quickly as possible." },
              { icon: <CarIcon className="w-6 h-6" />, title: "Travel Experts", desc: "Get expert advice for your perfect trip." },
              { icon: <ShieldCheck className="w-6 h-6" />, title: "Custom Solutions", desc: "Tailored packages to match your needs and budget." },
              { icon: <ShieldCheck className="w-6 h-6" />, title: "Reliable & Trusted", desc: "Your journey is safe with our trusted service." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#f5f0e8] p-8 rounded-3xl text-center border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-[#0f2420] shadow-sm mb-6 border border-gray-100">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0f2420] mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────── */}
      <section className="bg-white pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#0f2420] rounded-3xl p-8 lg:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            {/* Background elements */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute left-0 bottom-0 w-64 h-64 bg-[#d4951e]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
            
            <div className="flex items-center gap-6 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#d4951e] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-poppins font-bold text-white mb-2">
                  Ready to Plan Your <span className="text-[#d4951e] font-dancing font-normal tracking-wide">Journey?</span>
                </h3>
                <p className="text-white/70 text-sm">
                  Contact us today and let's make your trip unforgettable.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 relative z-10 w-full md:w-auto">
              <a href="tel:6382513075" className="flex-1 md:flex-none text-center bg-[#d4951e] hover:bg-[#b57f18] text-white font-bold px-8 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2">
                Book Now <ArrowRight className="w-4 h-4" />
              </a>
              <a href="https://wa.me/916382513075" className="flex-1 md:flex-none text-center border border-white/20 hover:bg-white/5 text-white font-bold px-8 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                WhatsApp Us <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
