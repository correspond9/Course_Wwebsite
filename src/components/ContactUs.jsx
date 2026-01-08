import React, { useEffect, useState } from 'react';
import GlassCard from './GlassCard';

export default function ContactUs() {
  const [contact, setContact] = useState({
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('admin_contact_config');
    if (saved) {
      try {
        setContact(JSON.parse(saved));
      } catch {
        console.warn('Invalid contact config');
      }
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <GlassCard className="p-10 space-y-8">
        <h1 className="text-3xl font-bold text-white">Contact Us</h1>

        <div className="space-y-4 text-white/90">
          <p>
            <span className="font-semibold">Email:</span>{' '}
            <span className="text-white">{contact.email || '—'}</span>
          </p>

          <p>
            <span className="font-semibold">Phone:</span>{' '}
            <span className="text-white">{contact.phone || '—'}</span>
          </p>

          <p>
            <span className="font-semibold">Address:</span><br />
            <span className="text-white whitespace-pre-line">
              {contact.address || '—'}
            </span>
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
