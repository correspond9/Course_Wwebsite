import React, { useEffect, useState } from 'react';
import GlassCard from './GlassCard';

const ContactUs = () => {
  const [contactInfo, setContactInfo] = useState({
    email: 'info@tradewithstraddly.com',
    phone: '+91 89289 40525',
    address: '1307, 13th Floor, Ozone Biz Center, Belasis Road, Mumbai 400008'
  });

  useEffect(() => {
    const savedConfig = localStorage.getItem('admin_contact_config');
    if (savedConfig) {
      setContactInfo(JSON.parse(savedConfig));
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in h-[600px]">
      
      {/* LEFT: Contact Info */}
      <GlassCard className="p-10 flex flex-col justify-center h-full bg-slate-800/80">
        <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
        <p className="text-financio-muted mb-10 text-lg">
          Have questions about our trading algorithms or academy programs? Our support team is ready to assist you.
        </p>

        <div className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center text-2xl">📧</div>
            <div>
              <p className="text-xs text-financio-muted uppercase font-bold tracking-wider">Email Us</p>
              <p className="text-white font-mono text-lg">{contactInfo.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center text-2xl">📞</div>
            <div>
              <p className="text-xs text-financio-muted uppercase font-bold tracking-wider">Call Us</p>
              <p className="text-white font-mono text-lg">{contactInfo.phone}</p>
              <p className="text-xs text-financio-success mt-1">● Mon-Fri from 9am to 6pm</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center text-2xl">📍</div>
            <div>
              <p className="text-xs text-financio-muted uppercase font-bold tracking-wider">Visit Us</p>
              <p className="text-white max-w-xs">{contactInfo.address}</p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* RIGHT: Google Map (Color Restored) */}
      <GlassCard className="h-full p-0 overflow-hidden relative border-none bg-slate-700">
        <iframe 
          src={`https://maps.google.com/maps?q=${encodeURIComponent(contactInfo.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location"
          className="absolute inset-0"
        ></iframe>
        
        <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 pointer-events-none">
          <p className="text-white text-xs font-bold">📍 Mumbai HQ</p>
        </div>
      </GlassCard>

    </div>
  );
};

export default ContactUs;
