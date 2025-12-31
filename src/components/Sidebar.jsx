import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

export default function Sidebar({ activePage, setActivePage }) {
  const { user, isAdmin, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const menuItems = [
    { name: 'Command Center', icon: '⚡', adminOnly: true },
    { name: 'Live Markets', icon: '📊', adminOnly: false },
    { name: 'Academy', icon: '🎓', adminOnly: false },
    { name: 'Dashboard', icon: '📈', adminOnly: false },
    { name: 'About Us', icon: 'ℹ️', adminOnly: false },
    { name: 'Contact Us', icon: '📞', adminOnly: false }
  ];

  const visibleItems = menuItems.filter(item => !item.adminOnly || isAdmin);

  return (
    <>
      <div className="fixed left-0 top-0 h-screen w-72 flex flex-col z-50 border-r border-white/10 shadow-2xl bg-[#0f172a]/60 backdrop-blur-xl">
        
        {/* LOGO SECTION */}
        <div className="p-8 border-b border-white/10 flex items-center">
          <img 
            src="/LOGO.png" 
            alt="Financio" 
            className="h-15 w-auto object-contain" // Adjusted height for perfect fit
          />
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
          {visibleItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActivePage(item.name)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                activePage === item.name
                  ? 'bg-financio-primary text-white shadow-lg shadow-blue-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={`text-xl transition-transform duration-200 ${activePage === item.name ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="p-6 border-t border-white/10 bg-black/20">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-financio-primary flex items-center justify-center text-white font-bold shadow-inner">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <button 
                  onClick={logout}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setShowLoginModal(true)}
              className="w-full py-3 bg-financio-primary hover:bg-blue-600 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-900/20"
            >
              Login
            </button>
          )}
        </div>

        {/* Footer Links */}
        <div className="px-6 pb-6 pt-4 flex gap-4 text-xs text-gray-500 bg-black/20">
          <button 
            onClick={() => setActivePage('Terms')}
            className="hover:text-white transition-colors"
          >
            Terms
          </button>
          <span>•</span>
          <button 
            onClick={() => setActivePage('Privacy')}
            className="hover:text-white transition-colors"
          >
            Privacy
          </button>
        </div>
      </div>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  );
}
