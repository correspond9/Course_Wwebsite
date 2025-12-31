import React, { useState, useEffect } from 'react';
import GlassCard from './GlassCard';

const CommandCenter = () => {
  const [activeTab, setActiveTab] = useState('API Config');

  // --- TAB 1: API CONFIGURATION ---
  const [clientId, setClientId] = useState('');
  const [accessToken, setAccessToken] = useState('');

  // --- TAB 2: CONTACT INFO ---
  const [contactConfig, setContactConfig] = useState({
    email: '', phone: '', address: ''
  });

  // --- TAB 3: LEGAL PAGES ---
  const [legalConfig, setLegalConfig] = useState({
    terms: '', privacy: ''
  });

  // --- LOAD DATA ON MOUNT ---
  useEffect(() => {
    // Load API Keys individually to match DhanSocket.js
    const savedClient = localStorage.getItem('dhan_client_id');
    const savedToken = localStorage.getItem('dhan_access_token');
    if (savedClient) setClientId(savedClient);
    if (savedToken) setAccessToken(savedToken);

    // Load Contact
    const savedContact = localStorage.getItem('admin_contact_config');
    if (savedContact) setContactConfig(JSON.parse(savedContact));

    // Load Legal
    const savedTerms = localStorage.getItem('legal_terms');
    const savedPrivacy = localStorage.getItem('legal_privacy');
    setLegalConfig({
      terms: savedTerms || '',
      privacy: savedPrivacy || ''
    });
  }, []);

  // --- SAVE HANDLERS ---
  const saveApiConfig = () => {
    // CORRECTED: Saving as individual strings to match DhanSocket.js logic
    localStorage.setItem('dhan_client_id', clientId);
    localStorage.setItem('dhan_access_token', accessToken);
    
    alert('API Configuration Saved! Please refresh the page to reconnect.');
  };

  const saveContact = () => {
    localStorage.setItem('admin_contact_config', JSON.stringify(contactConfig));
    alert('Contact Info Updated!');
  };

  const saveLegal = () => {
    localStorage.setItem('legal_terms', legalConfig.terms);
    localStorage.setItem('legal_privacy', legalConfig.privacy);
    alert('Legal Pages Updated!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* HEADER */}
      <GlassCard className="p-8 border-l-4 border-financio-primary bg-financio-primary/10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Command Center</h1>
            <p className="text-financio-muted mt-1">System Administration & Content Management</p>
          </div>
          <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded border border-red-500/30">
            ADMIN ACCESS ONLY
          </span>
        </div>
      </GlassCard>

      {/* TABS */}
      <div className="flex gap-4 border-b border-white/10 pb-1 overflow-x-auto">
        {['API Config', 'Contact Info', 'Legal Pages'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === tab 
                ? 'border-financio-primary text-financio-primary' 
                : 'border-transparent text-financio-muted hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* --- TAB 1: API CONFIGURATION --- */}
      {activeTab === 'API Config' && (
        <GlassCard className="p-8">
          <h2 className="text-xl font-bold text-white mb-6">DhanHQ API Connection</h2>
          <p className="text-sm text-financio-muted mb-6">
            Enter your DhanHQ credentials below. These are stored securely in your browser's LocalStorage.
          </p>
          
          <div className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-xs text-financio-muted uppercase mb-1">Client ID</label>
              <input 
                type="text"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-financio-primary focus:outline-none font-mono"
                placeholder="Ex: 100045892"
              />
            </div>

            <div>
              <label className="block text-xs text-financio-muted uppercase mb-1">Access Token</label>
              <input 
                type="password"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-financio-primary focus:outline-none font-mono"
                placeholder="Paste your long JWT token here..."
              />
            </div>

            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-xs text-yellow-200">
                <strong>⚠️ Security Note:</strong> This token allows trading access. Ensure you are on a secure private network.
              </p>
            </div>

            <button 
              onClick={saveApiConfig}
              className="px-6 py-3 bg-financio-success hover:bg-emerald-600 text-white font-bold rounded shadow-lg shadow-emerald-900/20 transition-all"
            >
              Save API Keys
            </button>
          </div>
        </GlassCard>
      )}

      {/* --- TAB 2: CONTACT INFO --- */}
      {activeTab === 'Contact Info' && (
        <GlassCard className="p-8">
          <h2 className="text-xl font-bold text-white mb-6">Edit Contact Details</h2>
          <div className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-xs text-financio-muted uppercase mb-1">Public Email</label>
              <input 
                value={contactConfig.email}
                onChange={(e) => setContactConfig({...contactConfig, email: e.target.value})}
                className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-financio-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-financio-muted uppercase mb-1">Support Phone</label>
              <input 
                value={contactConfig.phone}
                onChange={(e) => setContactConfig({...contactConfig, phone: e.target.value})}
                className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-financio-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-financio-muted uppercase mb-1">Physical Address</label>
              <textarea 
                value={contactConfig.address}
                onChange={(e) => setContactConfig({...contactConfig, address: e.target.value})}
                className="w-full bg-black/40 border border-white/10 rounded p-3 text-white h-24 focus:border-financio-primary focus:outline-none"
              />
            </div>
            <button 
              onClick={saveContact}
              className="px-6 py-2 bg-financio-primary text-white font-bold rounded hover:bg-blue-600 transition-colors"
            >
              Update Contact Info
            </button>
          </div>
        </GlassCard>
      )}

      {/* --- TAB 3: LEGAL PAGES --- */}
      {activeTab === 'Legal Pages' && (
        <GlassCard className="p-8">
          <h2 className="text-xl font-bold text-white mb-6">Legal Content Management</h2>
          <p className="text-xs text-financio-muted mb-4">Supports Markdown-like text formatting.</p>
          
          <div className="space-y-8">
            <div>
              <label className="block text-xs text-financio-muted uppercase mb-2">Terms & Conditions Content</label>
              <textarea 
                value={legalConfig.terms}
                onChange={(e) => setLegalConfig({...legalConfig, terms: e.target.value})}
                className="w-full bg-black/40 border border-white/10 rounded p-4 text-white font-mono text-sm h-64 focus:border-financio-primary focus:outline-none leading-relaxed"
                placeholder="Paste Terms content here..."
              />
            </div>

            <div>
              <label className="block text-xs text-financio-muted uppercase mb-2">Privacy Policy Content</label>
              <textarea 
                value={legalConfig.privacy}
                onChange={(e) => setLegalConfig({...legalConfig, privacy: e.target.value})}
                className="w-full bg-black/40 border border-white/10 rounded p-4 text-white font-mono text-sm h-64 focus:border-financio-primary focus:outline-none leading-relaxed"
                placeholder="Paste Privacy content here..."
              />
            </div>

            <button 
              onClick={saveLegal}
              className="px-6 py-3 bg-purple-600 text-white font-bold rounded hover:bg-purple-700 transition-colors"
            >
              Update Legal Pages
            </button>
          </div>
        </GlassCard>
      )}

    </div>
  );
};

export default CommandCenter;
