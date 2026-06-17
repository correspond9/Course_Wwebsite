import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

export default function Sidebar({ activePage, setActivePage, sidebarOpen, setSidebarOpen }) {
  const { user, isAdmin, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const menuItems = [
    { name: 'Home' },
    { name: 'Command Center', adminOnly: true },
    { name: 'Live Markets' },
    { name: 'Academy' },
    { name: 'Dashboard' },
    { name: 'About Us' },
    { name: 'Contact Us' }
  ];

  const handlePageChange = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  return (
    <>
      {sidebarOpen && (
        <button
          className="lg:hidden fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation"
        />
      )}

      <div
        className={`fixed left-0 top-0 z-40 h-screen w-64 bg-[#0b1228]/95 backdrop-blur-xl border-r border-white/10 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-lg font-black tracking-wide text-white">FINANCIO</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-blue-200 mt-1">By Great Ventures</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden h-9 w-9 rounded-lg bg-white/10 border border-white/10"
              aria-label="Close navigation"
            >
              ✕
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-300 leading-relaxed">
            Financio is the brand name. Great Ventures is the registered firm for legal and payment operations.
          </p>
        </div>

        <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
          {menuItems
            .filter(i => !i.adminOnly || isAdmin)
            .map(item => (
              <button
                key={item.name}
                onClick={() => handlePageChange(item.name)}
                className={`w-full px-4 py-3 rounded-lg text-left ${
                  activePage === item.name
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-900/40'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </button>
            ))}
        </nav>

        <div className="p-3 border-t border-white/10">
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

        <div className="p-3 text-xs text-gray-400 flex gap-3 border-t border-white/10">
          <button onClick={() => handlePageChange('Terms')}>Terms</button>
          <button onClick={() => handlePageChange('Privacy')}>Privacy</button>
          <button onClick={() => handlePageChange('Refund')}>Refund</button>
        </div>
      </div>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  );
}
