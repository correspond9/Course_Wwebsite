import React, { useEffect, useState } from 'react';

const ContactUs = () => {
  const [contactInfo, setContactInfo] = useState({
    email: 'info@tradewithstraddly.com',
    phone: '+91 89289 40525',
    address: '1307, 13th Floor, Ozone Biz Center, Belasis Road, Mumbai 400008'
  });

  // Load from "Backend" (simulated via localStorage) on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('admin_contact_config');
    if (savedConfig) {
      setContactInfo(JSON.parse(savedConfig));
    }
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center pb-20 animate-fade-in-up">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
        <p className="text-slate-400 max-w-lg mx-auto">
          Have questions about our trading algorithms or academy programs? Our support team is ready to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Email Card */}
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-white/5 hover:border-blue-500/50 transition-all group text-center">
          <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto text-blue-400 group-hover:scale-110 transition-transform">
            ✉️
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Email Support</h3>
          <a href={`mailto:${contactInfo.email}`} className="text-slate-300 hover:text-white transition-colors break-words">
            {contactInfo.email}
          </a>
        </div>

        {/* Phone Card */}
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-white/5 hover:border-green-500/50 transition-all group text-center">
          <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto text-green-400 group-hover:scale-110 transition-transform">
            📞
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Phone</h3>
          <p className="text-sm text-slate-400 mb-1">Mon-Fri from 9am to 6pm</p>
          <a href={`tel:${contactInfo.phone}`} className="text-lg font-bold text-white hover:text-green-400 transition-colors">
            {contactInfo.phone}
          </a>
        </div>

        {/* Address Card */}
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-white/5 hover:border-purple-500/50 transition-all group text-center">
          <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto text-purple-400 group-hover:scale-110 transition-transform">
            🏢
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Offline Academic Classes</h3>
          <p className="text-slate-300 leading-relaxed px-4">
            {contactInfo.address}
          </p>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="w-full max-w-5xl mt-8 h-48 bg-slate-800 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden relative">
         <div className="absolute inset-0 bg-slate-900 opacity-50"></div>
         <p className="relative z-10 text-slate-500 font-mono text-sm">Google Maps API Integration Pending...</p>
      </div>
    </div>
  );
};

export default ContactUs;
