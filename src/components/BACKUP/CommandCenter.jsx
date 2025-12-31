import React, { useState, useEffect } from 'react';

const CommandCenter = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('contact'); // 'contact' or 'api'
  
  // Contact Config State
  const [contactConfig, setContactConfig] = useState({
    email: 'info@tradewithstraddly.com',
    phone: '+91 89289 40525',
    address: '1307, 13th Floor, Ozone Biz Center, Belasis Road, Mumbai 400008'
  });

  // API Config State (Moved from Settings.jsx)
  const [apiConfig, setApiConfig] = useState({
    clientId: '',
    apiKey: '',
    apiSecret: '',
    accessToken: ''
  });
  
  const [status, setStatus] = useState('');

  // Load saved configs
  useEffect(() => {
    const savedContact = localStorage.getItem('admin_contact_config');
    if (savedContact) setContactConfig(JSON.parse(savedContact));

    const savedApi = localStorage.getItem('dhan_credentials');
    if (savedApi) setApiConfig(JSON.parse(savedApi));
  }, []);

  const handleSaveContact = () => {
    localStorage.setItem('admin_contact_config', JSON.stringify(contactConfig));
    setStatus('Contact info updated successfully.');
    setTimeout(() => setStatus(''), 3000);
  };

  const handleSaveApi = () => {
    localStorage.setItem('dhan_credentials', JSON.stringify(apiConfig));
    setStatus('API Credentials saved securely.');
    setTimeout(() => setStatus(''), 3000);
  };

  // Simulation of Admin Login
  if (!isAdmin) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="bg-slate-800 p-8 rounded-xl border border-red-500/30 text-center max-w-md w-full">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-white mb-2">Restricted Access</h2>
          <p className="text-slate-400 mb-6">This module is for System Administrators only.</p>
          <button 
            onClick={() => setIsAdmin(true)}
            className="w-full py-2 bg-red-600 hover:bg-red-500 text-white rounded font-bold transition-colors"
          >
            Simulate Admin Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-fade-in-up">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Command Center</h1>
          <p className="text-slate-400">System Configuration & Content Management</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 px-3 py-1 rounded text-red-400 text-xs font-bold uppercase">
          Admin Mode Active
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-white/10 pb-1">
        <button 
          onClick={() => setActiveTab('contact')}
          className={`pb-2 px-4 text-sm font-bold uppercase tracking-wide transition-colors ${
            activeTab === 'contact' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-500 hover:text-white'
          }`}
        >
          Contact Info
        </button>
        <button 
          onClick={() => setActiveTab('api')}
          className={`pb-2 px-4 text-sm font-bold uppercase tracking-wide transition-colors ${
            activeTab === 'api' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-500 hover:text-white'
          }`}
        >
          API Configuration
        </button>
      </div>

      {/* TAB CONTENT: CONTACT */}
      {activeTab === 'contact' && (
        <div className="bg-slate-800 rounded-xl border border-white/10 p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-blue-400">📞</span> Public Contact Details
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Support Email</label>
              <input 
                type="text" 
                value={contactConfig.email}
                onChange={(e) => setContactConfig({...contactConfig, email: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Support Phone</label>
              <input 
                type="text" 
                value={contactConfig.phone}
                onChange={(e) => setContactConfig({...contactConfig, phone: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Office Address</label>
              <textarea 
                rows="3"
                value={contactConfig.address}
                onChange={(e) => setContactConfig({...contactConfig, address: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-white/5 gap-4">
              <span className="text-green-400 text-sm font-medium">{status}</span>
              <button 
                onClick={handleSaveContact}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold shadow-lg shadow-blue-900/30"
              >
                Update Contact Page
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: API CONFIG (From Settings.jsx) */}
      {activeTab === 'api' && (
        <div className="bg-slate-800 rounded-xl border border-white/10 p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-cyan-400">🔌</span> Dhan API Connections
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-slate-400 text-xs font-bold uppercase">Client ID</label>
              <input
                type="text"
                value={apiConfig.clientId}
                onChange={(e) => setApiConfig({ ...apiConfig, clientId: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-cyan-500 focus:outline-none"
                placeholder="Enter Client ID"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 text-xs font-bold uppercase">API Key</label>
              <input
                type="password"
                value={apiConfig.apiKey}
                onChange={(e) => setApiConfig({ ...apiConfig, apiKey: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-cyan-500 focus:outline-none"
                placeholder="••••••••••••"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 text-xs font-bold uppercase">API Secret</label>
              <input
                type="password"
                value={apiConfig.apiSecret}
                onChange={(e) => setApiConfig({ ...apiConfig, apiSecret: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-cyan-500 focus:outline-none"
                placeholder="••••••••••••"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-slate-400 text-xs font-bold uppercase">Access Token</label>
              <input
                type="password"
                value={apiConfig.accessToken}
                onChange={(e) => setApiConfig({ ...apiConfig, accessToken: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-cyan-500 focus:outline-none font-mono text-xs"
                placeholder="JWT Token"
              />
            </div>
          </div>

          <div className="flex items-center justify-end pt-6 mt-6 border-t border-white/5 gap-4">
             <span className="text-green-400 text-sm font-medium">{status}</span>
             <button
              onClick={handleSaveApi}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded font-bold shadow-lg shadow-cyan-500/20"
            >
              Save API Config
            </button>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded text-yellow-200/80 text-xs">
             <strong>Security Note:</strong> Credentials are stored locally in your browser. Clearing cache will remove them.
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandCenter;
