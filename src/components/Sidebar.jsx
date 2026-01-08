import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

export default function Sidebar({ activePage, setActivePage }) {
  const { user, isAdmin, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const menuItems = [
    { name: 'Command Center', adminOnly: true },
    { name: 'Live Markets' },
    { name: 'Academy' },
    { name: 'Dashboard' },
    { name: 'About Us' },
    { name: 'Contact Us' }
  ];

  return (
    <>
      <div className="fixed left-0 top-0 h-screen w-72 bg-[#0f172a]/70 backdrop-blur-xl border-r border-white/10 flex flex-col">

        <div className="p-6 border-b border-white/10">
          <img src="/LOGO.png" alt="Financio" className="h-15" />
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems
            .filter(i => !i.adminOnly || isAdmin)
            .map(item => (
              <button
                key={item.name}
                onClick={() => setActivePage(item.name)}
                className={`w-full px-4 py-3 rounded-lg text-left ${
                  activePage === item.name
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </button>
            ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          {user ? (
            <>
              <p className="text-sm text-white">{user.name}</p>
              <button onClick={logout} className="text-xs text-red-400 mt-1">
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="w-full py-2 bg-blue-600 rounded-lg font-bold"
            >
              Login
            </button>
          )}
        </div>

        <div className="p-4 text-xs text-gray-400 flex gap-3">
          <button onClick={() => setActivePage('Terms')}>Terms</button>
          <button onClick={() => setActivePage('Privacy')}>Privacy</button>
          <button onClick={() => setActivePage('Refund')}>Refund</button>
        </div>
      </div>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  );
}
