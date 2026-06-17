import React, { useEffect, useState } from 'react';
import GlassCard from './GlassCard';

export default function ContactUs() {
  const [contact, setContact] = useState({
    email: 'info@financio.pro',
    phone: '+91 89289 40525',
    address: '1307 Ozone Biz Center, Belasis Road, Mumbai 400008'
  });

  const loadContactConfig = () => {
    const email = localStorage.getItem('public_email');
    const phone = localStorage.getItem('support_phone');
    const address = localStorage.getItem('office_address');

    // Backward compatibility for older saved object format.
    const legacy = localStorage.getItem('admin_contact_config');

    if (email || phone || address) {
      setContact({
        email: email || 'info@financio.pro',
        phone: phone || '+91 89289 40525',
        address: address || '1307 Ozone Biz Center, Belasis Road, Mumbai 400008'
      });
      return;
    }

    if (legacy) {
      try {
        const parsed = JSON.parse(legacy);
        setContact({
          email: parsed.email || 'info@financio.pro',
          phone: parsed.phone || '+91 89289 40525',
          address: parsed.address || '1307 Ozone Biz Center, Belasis Road, Mumbai 400008'
        });
      } catch {
        console.warn('Invalid contact config');
      }
    }
  };

  useEffect(() => {
    loadContactConfig();

    const onStorageUpdate = () => loadContactConfig();
    window.addEventListener('storage', onStorageUpdate);

    return () => {
      window.removeEventListener('storage', onStorageUpdate);
    };
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
