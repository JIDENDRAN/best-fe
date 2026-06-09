import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  Package,
  MapPin,
  CalendarCheck,
  Edit,
  Trash2,
  LogOut,
  CheckCircle,
  Clock,
  Trash,
  MessageSquare,
  Settings,
  UserPlus,
  X,
  Plus,
  ChevronRight,
  Phone,
  Mail,
  User,
  Lock,
  Compass,
  Sparkles,
  Info
} from 'lucide-react';
import { getVehicleImage } from '../../utils/imageImports';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../apiConfig.js';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [toast, setToast] = useState(null);

  // Authenticate
  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (!loggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // State Management
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);
  const [packages, setPackages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [settings, setSettings] = useState({ name: '', phone: '', whatsapp: '', password: '' });
  const [whatsappStatus, setWhatsappStatus] = useState({ isConnected: false, qrCode: null });
  const [loadingWhatsapp, setLoadingWhatsapp] = useState(false);

  const [loading, setLoading] = useState(true);

  // Modal forms states
  const [carModal, setCarModal] = useState({ isOpen: false, isEdit: false, data: null });
  const [pkgModal, setPkgModal] = useState({ isOpen: false, isEdit: false, data: null });
  const [newAdmin, setNewAdmin] = useState({ name: '', phone: '', whatsapp: '', password: '' });

  // Pre-defined values for assets mapping
  const availableCarImages = [
    'sedan_cab-removebg-preview.png',
    'toyota_etios-removebg-preview.png',
    'innova_crysta-removebg-preview.png',
    'suv-removebg-preview.png',
    'tempo_traveller-removebg-preview.png'
  ];

  const availableBgs = [
    'kanyakumari_bg.png',
    'thirumalai_mahal_bg.png',
    'kodaikanal_bg.png',
    'munnar_bg.png',
    'rameswaram_bg.png'
  ];

  const availablePkgImages = [
    'meenakshi_bg.png',
    'rameswaram_bg.png',
    'kodaikanal_bg.png',
    'ooty_bg.png'
  ];

  // Fetch functions
  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`);
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading bookings.', 'error');
    }
  };

  const fetchCars = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/cars`);
      if (res.ok) {
        const data = await res.json();
        setCars(data);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading vehicles.', 'error');
    }
  };

  const fetchPackages = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/packages`);
      if (res.ok) {
        const data = await res.json();
        setPackages(data);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading packages.', 'error');
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/contacts`);
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading contact messages.', 'error');
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/settings`);
      if (res.ok) {
        const data = await res.json();
        if (data) setSettings(data);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading system settings.', 'error');
    }
  };

  const fetchWhatsappStatus = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/whatsapp-status`);
      if (res.ok) {
        const data = await res.json();
        setWhatsappStatus(data);
      }
    } catch (err) {
      console.error('Error loading WhatsApp status:', err);
    }
  };

  const handleWhatsappReconnect = async () => {
    setLoadingWhatsapp(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/whatsapp-reconnect`, {
        method: 'POST'
      });
      if (res.ok) {
        showToast('Reconnection sequence triggered.');
        await fetchWhatsappStatus();
      } else {
        showToast('Failed to trigger reconnect.', 'error');
      }
    } catch (err) {
      showToast('Connection error.', 'error');
    } finally {
      setLoadingWhatsapp(false);
    }
  };

  // Load all based on active tab
  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      if (activeTab === 'bookings') await fetchBookings();
      if (activeTab === 'cars') await fetchCars();
      if (activeTab === 'packages') await fetchPackages();
      if (activeTab === 'contacts') await fetchContacts();
      if (activeTab === 'settings') await fetchSettings();
      setLoading(false);
    };
    loadData();
  }, [activeTab]);

  useEffect(() => {
    let interval;
    if (activeTab === 'settings') {
      fetchWhatsappStatus();
      interval = setInterval(fetchWhatsappStatus, 5000);
    }
    return () => clearInterval(interval);
  }, [activeTab]);

  // Logout - redirects to home page "/"
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUser');
    navigate('/');
  };

  // Bookings Handlers
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
        showToast(`Booking status updated to ${newStatus}.`);
      } else {
        showToast('Failed to update booking status.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setBookings(bookings.filter(b => b.id !== id));
        showToast('Booking deleted successfully.');
      } else {
        showToast('Failed to delete booking.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  // Cars (Fleet) CRUD
  const handleOpenCarModal = (isEdit = false, data = null) => {
    setCarModal({
      isOpen: true,
      isEdit,
      data: data ? { ...data } : { name: '', seats: '4 Seater', ac: 'AC', price: '₹12/km', desc: '', image: availableCarImages[0], bgImage: availableBgs[0] }
    });
  };

  const handleCarSubmit = async (e) => {
    e.preventDefault();
    const { isEdit, data } = carModal;
    const url = isEdit ? `${API_BASE_URL}/api/cars/${data.id}` : `${API_BASE_URL}/api/cars`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        showToast(isEdit ? 'Vehicle updated successfully.' : 'Vehicle added successfully.');
        setCarModal({ isOpen: false, isEdit: false, data: null });
        fetchCars();
      } else {
        showToast('Failed to save vehicle details.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error saving vehicle details.', 'error');
    }
  };

  const handleDeleteCar = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/cars/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setCars(cars.filter(c => c.id !== id));
        showToast('Vehicle removed from fleet.');
      } else {
        showToast('Failed to delete vehicle.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  // Packages CRUD
  const handleOpenPkgModal = (isEdit = false, data = null) => {
    setPkgModal({
      isOpen: true,
      isEdit,
      data: data ? { ...data } : { name: '', duration: '', places: '', price: '', image: availablePkgImages[0] }
    });
  };

  const handlePkgSubmit = async (e) => {
    e.preventDefault();
    const { isEdit, data } = pkgModal;
    const url = isEdit ? `${API_BASE_URL}/api/packages/${data.id}` : `${API_BASE_URL}/api/packages`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        showToast(isEdit ? 'Package updated successfully.' : 'Package added successfully.');
        setPkgModal({ isOpen: false, isEdit: false, data: null });
        fetchPackages();
      } else {
        showToast('Failed to save package.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error saving package.', 'error');
    }
  };

  const handleDeletePackage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/packages/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setPackages(packages.filter(p => p.id !== id));
        showToast('Package deleted successfully.');
      } else {
        showToast('Failed to delete package.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  // Contact Us message delete
  const handleDeleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setContacts(contacts.filter(c => c.id !== id));
        showToast('Message deleted successfully.');
      } else {
        showToast('Failed to delete message.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  // Settings Handlers
  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (response.ok) {
        showToast('Admin settings saved successfully.');
      } else {
        showToast('Failed to save admin settings.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  // Add Admin Handler
  const handleAddAdminSubmit = async (e) => {
    e.preventDefault();
    if (!newAdmin.name || !newAdmin.password) {
      showToast('Name and password are required.', 'error');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAdmin)
      });
      if (response.ok) {
        showToast('Additional administrator registered successfully.');
        setNewAdmin({ name: '', phone: '', whatsapp: '', password: '' });
      } else {
        showToast('Failed to register new administrator.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-gray-800 flex flex-col md:flex-row font-outfit">

      {/* Sidebar navigation */}
      <div className="w-full md:w-64 bg-[#1a3c34] flex flex-col border-r border-[#1a3c34] shadow-2xl z-20">
        <div className="p-6 flex items-center gap-3 border-b border-[#2d5a4e]">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md p-1">
            <img src="/logo.jpeg" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight text-white font-poppins">Madurai Best</h2>
            <p className="text-xs text-[#d4951e] font-medium tracking-wide">Control Center</p>
          </div>
        </div>

        <nav className="flex-grow py-6">
          <ul className="space-y-2 px-4">
            <li>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium ${activeTab === 'bookings'
                  ? 'bg-[#d4951e] text-white font-bold shadow-md'
                  : 'text-[#a3b8b1] hover:text-white hover:bg-[#2d5a4e]'
                  }`}
              >
                <CalendarCheck className="w-5 h-5" /> Manage Bookings
              </button>
            </li>

            <li>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium ${activeTab === 'contacts'
                  ? 'bg-[#d4951e] text-white font-bold shadow-md'
                  : 'text-[#a3b8b1] hover:text-white hover:bg-[#2d5a4e]'
                  }`}
              >
                <MessageSquare className="w-5 h-5" /> Contact Queries
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium ${activeTab === 'settings'
                  ? 'bg-[#d4951e] text-white font-bold shadow-md'
                  : 'text-[#a3b8b1] hover:text-white hover:bg-[#2d5a4e]'
                  }`}
              >
                <Settings className="w-5 h-5" /> Admin Settings
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('add-admin')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium ${activeTab === 'add-admin'
                  ? 'bg-[#d4951e] text-white font-bold shadow-md'
                  : 'text-[#a3b8b1] hover:text-white hover:bg-[#2d5a4e]'
                  }`}
              >
                <UserPlus className="w-5 h-5" /> Add Administrator
              </button>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-[#2d5a4e]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-red-500/10 text-red-300 hover:bg-red-500 hover:text-white rounded-xl transition-all font-bold text-sm shadow-sm"
          >
            <LogOut className="w-4 h-4" /> Logout Admin
          </button>
        </div>
      </div>

      {/* Toast notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl font-bold flex items-center gap-3 ${toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
              }`}
          >
            {toast.type === 'error' ? <Trash2 className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main dashboard content view */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f5f0e8] text-gray-800">

        <header className="bg-white border-b border-[#edeae1] px-6 py-4 md:px-8 flex justify-between items-center shadow-sm relative z-10">
          <h1 className="text-xl md:text-2xl font-bold text-[#1a3c34] uppercase tracking-wider flex items-center gap-2 font-poppins">
            <span className="text-[#d4951e]">●</span> {activeTab.replace('-', ' ')}
          </h1>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="block text-sm font-semibold text-[#1a3c34]">Superadmin Panel</span>
              <span className="block text-xs text-[#d4951e] font-medium tracking-wide">Madurai Best Tours and Travels</span>
            </div>
            <div className="w-10 h-10 bg-[#1a3c34] text-[#d4951e] rounded-full font-bold flex items-center justify-center text-lg shadow-sm border border-[#edeae1]">
              SA
            </div>
          </div>
        </header>

        <main className="flex-grow p-6 md:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">

            {/* BOOKINGS VIEW */}
            {activeTab === 'bookings' && (
              <motion.div key="bookings" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="bg-white rounded-3xl border border-[#edeae1] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">

                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500 font-medium">
                      <div className="w-10 h-10 border-4 border-[#d4951e] border-t-transparent rounded-full animate-spin mb-4"></div>
                      Loading bookings from database...
                    </div>
                  ) : bookings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                      <CalendarCheck className="w-16 h-16 mb-4 text-gray-300" />
                      <p className="text-lg font-bold text-gray-800">No Bookings Found</p>
                      <p className="text-sm text-gray-500 mt-1">Bookings submitted from the site show up automatically.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                          <tr className="bg-[#f7f5f0] border-b border-[#edeae1] text-gray-500 text-xs uppercase tracking-wider font-bold">
                            <th className="px-6 py-4">Booking ID</th>
                            <th className="px-6 py-4">Customer Details</th>
                            <th className="px-6 py-4">Route (Start → End)</th>
                            <th className="px-6 py-4">Date & Time</th>
                            <th className="px-6 py-4">Vehicle / Package</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#edeae1] text-sm">
                          {bookings.map(booking => (
                            <tr key={booking.id} className="hover:bg-[#f7f5f0]/50 transition-colors">
                              <td className="px-6 py-4 font-mono font-bold text-xs text-[#1a3c34]">
                                BKG-{String(booking.id).padStart(4, '0')}
                              </td>
                              <td className="px-6 py-4">
                                <div className="font-bold text-gray-800">{booking.name}</div>
                                <div className="text-xs text-gray-500 font-medium">{booking.phone}</div>
                              </td>
                              <td className="px-6 py-4 max-w-[260px]">
                                <div className="text-xs truncate text-gray-700 font-medium" title={booking.fromLocation}>
                                  <span className="text-[#1a3c34] mr-1.5 font-bold">●</span>{booking.fromLocation}
                                </div>
                                <div className="text-xs truncate text-gray-700 mt-1.5 font-medium" title={booking.toLocation}>
                                  <span className="text-[#d4951e] mr-1.5 font-bold">●</span>{booking.toLocation}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="font-semibold text-gray-800">{booking.date}</div>
                                <div className="text-xs text-gray-500 font-medium">{booking.time || 'Not specified'}</div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="font-semibold text-[#1a3c34]">{booking.vehicle || 'Not Selected'}</div>
                                <div className="text-xs text-gray-500 italic">{booking.packageType || 'Custom Trip'}</div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${booking.status === 'Approved'
                                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                  : booking.status === 'Completed'
                                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                    : 'bg-amber-100 text-amber-700 border border-amber-200'
                                  }`}>
                                  {booking.status || 'Pending'}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex gap-2 justify-end">
                                  <select
                                    value={booking.status || 'Pending'}
                                    onChange={(e) => handleStatusUpdate(booking.id, e.target.value)}
                                    className="bg-gray-50 text-gray-700 hover:bg-gray-100 font-medium text-xs px-2 py-1.5 rounded-lg border border-gray-200 outline-none transition-all shadow-sm focus:ring-1 focus:ring-[#1a3c34] cursor-pointer"
                                  >
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Completed">Completed</option>
                                  </select>
                                  <button
                                    onClick={() => handleDeleteBooking(booking.id)}
                                    className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-lg border border-red-100 transition-all shadow-sm"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </motion.div>
            )}



            {/* CONTACT MESSAGES VIEW */}
            {activeTab === 'contacts' && (
              <motion.div key="contacts" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="bg-white rounded-3xl border border-[#edeae1] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
                  {loading ? (
                    <div className="text-center py-20">
                      <div className="w-10 h-10 border-4 border-[#d4951e] border-t-transparent rounded-full animate-spin mx-auto" />
                    </div>
                  ) : contacts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                      <MessageSquare className="w-16 h-16 mb-4 text-gray-300" />
                      <p className="text-lg font-bold text-gray-800">No Message Queries</p>
                      <p className="text-sm text-gray-500 mt-1">Queries from customer Contact Us form show here.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-[#edeae1]">
                      {contacts.map(c => (
                        <div key={c.id} className="p-6 hover:bg-[#f7f5f0]/50 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div className="space-y-2 w-full max-w-3xl">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="font-bold text-gray-800 text-lg">{c.name}</span>
                              <span className="text-xs text-[#1a3c34] bg-[#1a3c34]/5 px-2.5 py-1 rounded-md border border-[#1a3c34]/10 font-bold">
                                {new Date(c.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-gray-500 text-sm font-medium">
                              <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-[#d4951e]" /> {c.phone}</span>
                              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-[#d4951e]" /> {c.email}</span>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed pt-2 bg-[#f7f5f0] p-4 rounded-xl border border-[#edeae1] mt-3">
                              {c.message}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteContact(c.id)}
                            className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-3 rounded-xl border border-red-100 transition-all self-end md:self-auto cursor-pointer shadow-sm"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* SETTINGS VIEW */}
            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Settings form card */}
                  <div className="bg-white rounded-3xl border border-[#edeae1] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8">
                    <h3 className="text-xl font-bold text-[#1a3c34] mb-6 pb-3 border-b border-[#edeae1] flex items-center gap-2 font-poppins">
                      <Settings className="w-5 h-5 text-[#d4951e]" /> Superadmin Profile Configurations
                    </h3>

                    <form onSubmit={handleSettingsSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-gray-500 text-xs font-bold uppercase tracking-wider pl-1">Superadmin Username</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            value={settings.name}
                            onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                            className="w-full bg-[#f7f5f0] border border-[#edeae1] text-gray-800 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-[#d4951e] focus:ring-1 focus:ring-[#d4951e] transition-all text-sm font-semibold"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-gray-500 text-xs font-bold uppercase tracking-wider pl-1">Contact Phone</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                              type="text"
                              value={settings.phone}
                              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                              className="w-full bg-[#f7f5f0] border border-[#edeae1] text-gray-800 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-[#d4951e] focus:ring-1 focus:ring-[#d4951e] transition-all text-sm font-semibold"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-gray-500 text-xs font-bold uppercase tracking-wider pl-1">WhatsApp Dispatch Number</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">WA</span>
                            <input
                              type="text"
                              value={settings.whatsapp}
                              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                              className="w-full bg-[#f7f5f0] border border-[#edeae1] text-gray-800 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-[#d4951e] focus:ring-1 focus:ring-[#d4951e] transition-all text-sm font-semibold"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-gray-500 text-xs font-bold uppercase tracking-wider pl-1">Change Security Passcode</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="password"
                            value={settings.password}
                            onChange={(e) => setSettings({ ...settings, password: e.target.value })}
                            className="w-full bg-[#f7f5f0] border border-[#edeae1] text-gray-800 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-[#d4951e] focus:ring-1 focus:ring-[#d4951e] transition-all text-sm font-mono tracking-widest font-bold"
                            placeholder="••••••••"
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#1a3c34] hover:bg-[#2d5a4e] text-white font-bold py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer font-poppins text-sm uppercase tracking-wider"
                      >
                        Save Configuration Settings
                      </button>
                    </form>
                  </div>

                  {/* WhatsApp Bot Connection Manager Card */}
                  <div className="bg-white rounded-3xl border border-[#edeae1] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#1a3c34] mb-6 pb-3 border-b border-[#edeae1] flex items-center gap-2 font-poppins">
                        <span className="text-[#d4951e]">⚡</span> WhatsApp Notification Bot Status
                      </h3>

                      <div className="bg-[#f7f5f0] rounded-2xl p-5 border border-[#edeae1] flex items-center justify-between mb-6 shadow-sm">
                        <div>
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Bot Status</p>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${whatsappStatus.isConnected
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                            : 'bg-red-100 text-red-700 border border-red-200'
                            }`}>
                            <span className={`w-2 h-2 rounded-full ${whatsappStatus.isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
                            {whatsappStatus.isConnected ? 'CONNECTED' : 'DISCONNECTED'}
                          </span>
                        </div>
                        <button
                          onClick={handleWhatsappReconnect}
                          disabled={loadingWhatsapp}
                          className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                        >
                          {loadingWhatsapp ? 'Reconnecting...' : 'Reconnect Bot'}
                        </button>
                      </div>

                      {!whatsappStatus.isConnected && (
                        <div className="text-center p-6 bg-[#f7f5f0] border border-[#edeae1] rounded-2xl">
                          <p className="text-sm text-gray-800 font-bold mb-4">Scan QR code using WhatsApp Link a Device:</p>
                          {whatsappStatus.qrCode ? (
                            <div className="bg-white p-3 rounded-2xl inline-block shadow-md">
                              <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(whatsappStatus.qrCode)}`}
                                alt="WhatsApp QR Code"
                                className="w-48 h-48 block mx-auto"
                              />
                            </div>
                          ) : (
                            <div className="py-8 flex flex-col items-center justify-center text-gray-500">
                              <div className="w-8 h-8 border-4 border-[#d4951e] border-t-transparent rounded-full animate-spin mb-3"></div>
                              <p className="text-xs font-medium">Waiting for server to generate QR code...</p>
                            </div>
                          )}
                          <p className="text-xs text-gray-500 mt-4 font-medium leading-relaxed">
                            Open WhatsApp on your phone → Tap Menu or Settings → Linked Devices → Link a Device.
                          </p>
                        </div>
                      )}

                      {whatsappStatus.isConnected && (
                        <div className="text-center p-8 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700">
                          <p className="text-sm font-bold">Bot is active and ready to dispatch booking and contact alerts to admin.</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 text-xs text-gray-400 font-medium">
                      <p>Note: Session credentials are stored securely in SQLite and persist across restarts.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ADD ADMIN VIEW */}
            {activeTab === 'add-admin' && (
              <motion.div key="add-admin" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="max-w-2xl bg-white rounded-3xl border border-[#edeae1] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8">
                  <h3 className="text-xl font-bold text-[#1a3c34] mb-6 pb-3 border-b border-[#edeae1] flex items-center gap-2 font-poppins">
                    <UserPlus className="w-5 h-5 text-[#d4951e]" /> Create Administrator Account
                  </h3>

                  <form onSubmit={handleAddAdminSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-gray-500 text-xs font-bold uppercase tracking-wider pl-1">Account ID / Username</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={newAdmin.name}
                          onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                          className="w-full bg-[#f7f5f0] border border-[#edeae1] text-gray-800 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-[#d4951e] focus:ring-1 focus:ring-[#d4951e] transition-all text-sm font-semibold"
                          placeholder="e.g. Subadmin2"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-gray-500 text-xs font-bold uppercase tracking-wider pl-1">Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            value={newAdmin.phone}
                            onChange={(e) => setNewAdmin({ ...newAdmin, phone: e.target.value })}
                            className="w-full bg-[#f7f5f0] border border-[#edeae1] text-gray-800 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-[#d4951e] focus:ring-1 focus:ring-[#d4951e] transition-all text-sm font-semibold"
                            placeholder="Enter phone number"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-gray-500 text-xs font-bold uppercase tracking-wider pl-1">WhatsApp Number</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">WA</span>
                          <input
                            type="text"
                            value={newAdmin.whatsapp}
                            onChange={(e) => setNewAdmin({ ...newAdmin, whatsapp: e.target.value })}
                            className="w-full bg-[#f7f5f0] border border-[#edeae1] text-gray-800 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-[#d4951e] focus:ring-1 focus:ring-[#d4951e] transition-all text-sm font-semibold"
                            placeholder="Enter WhatsApp alert recipient number"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-gray-500 text-xs font-bold uppercase tracking-wider pl-1">Security Passcode</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="password"
                          value={newAdmin.password}
                          onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                          className="w-full bg-[#f7f5f0] border border-[#edeae1] text-gray-800 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-[#d4951e] focus:ring-1 focus:ring-[#d4951e] transition-all text-sm font-semibold"
                          placeholder="Create passcode"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#1a3c34] hover:bg-[#2d5a4e] text-white font-bold py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer font-poppins text-sm uppercase tracking-wider"
                    >
                      Register Admin Account
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>



    </div>
  );
};

export default AdminDashboard;
