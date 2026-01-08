import React, { useState, useEffect } from 'react';
import GlassCard from './GlassCard';

export default function CommandCenter() {

  const [activeTab, setActiveTab] = useState("api");

  // ========================= API CONFIG =========================
  const [clientId, setClientId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");

  useEffect(() => {
    setClientId(localStorage.getItem("dhan_client_id") || "");
    setAccessToken(localStorage.getItem("dhan_access_token") || "");
    setApiKey(localStorage.getItem("dhan_api_key") || "");
    setSecretKey(localStorage.getItem("dhan_api_secret") || "");
  }, []);

  const saveApi = () => {
    localStorage.setItem("dhan_client_id", clientId.trim());
    localStorage.setItem("dhan_access_token", accessToken.trim());
    localStorage.setItem("dhan_api_key", apiKey.trim());
    localStorage.setItem("dhan_api_secret", secretKey.trim());
    alert("API Credentials Saved Successfully");
  };

  // ========================= CONTACT CONFIG =========================
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setEmail(localStorage.getItem("public_email") || "info@financio.pro");
    setPhone(localStorage.getItem("support_phone") || "+91 89289 40525");
    setAddress(localStorage.getItem("office_address") || "1307 Ozone Biz Center, Belasis Road, Mumbai 400008");
  }, []);

  const saveContact = () => {
    localStorage.setItem("public_email", email.trim());
    localStorage.setItem("support_phone", phone.trim());
    localStorage.setItem("office_address", address.trim());
    alert("Contact Info Updated Successfully");
  };

  // ========================= LEGAL CONFIG =========================
  const [terms, setTerms] = useState("");
  const [privacy, setPrivacy] = useState("");

  useEffect(() => {
    setTerms(localStorage.getItem("legal_terms") || "");
    setPrivacy(localStorage.getItem("legal_privacy") || "");
  }, []);

  const saveLegal = () => {
    localStorage.setItem("legal_terms", terms);
    localStorage.setItem("legal_privacy", privacy);
    alert("Legal Pages Updated Successfully");
  };

  return (
    <div className="space-y-8 animate-fade-in">

      <GlassCard className="p-8">
        <h1 className="text-3xl font-bold text-white mb-2">Command Center</h1>
        <p className="text-white/70 text-sm">
          System Administration & Content Management
        </p>
      </GlassCard>

      {/* TABS */}
      <div className="flex gap-6 border-b border-white/10">
        {[
          { id: "api", label: "API Config" },
          { id: "contact", label: "Contact Info" },
          { id: "legal", label: "Legal Pages" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-semibold ${
              activeTab === tab.id
                ? "text-white border-b-2 border-financio-primary"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ========================= API TAB ========================= */}
      {activeTab === "api" && (
        <GlassCard className="p-10">
          <h2 className="text-xl font-bold text-white mb-6">
            DhanHQ API Connection
          </h2>

          <div className="space-y-5">
            <div>
              <label className="text-sm text-gray-300">Client ID</label>
              <input
                value={clientId}
                onChange={e => setClientId(e.target.value)}
                className="w-full mt-1 p-3 bg-black/40 border border-white/20 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Access Token</label>
              <input
                value={accessToken}
                onChange={e => setAccessToken(e.target.value)}
                className="w-full mt-1 p-3 bg-black/40 border border-white/20 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">API Key</label>
              <input
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                className="w-full mt-1 p-3 bg-black/40 border border-white/20 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Secret Key</label>
              <input
                value={secretKey}
                onChange={e => setSecretKey(e.target.value)}
                className="w-full mt-1 p-3 bg-black/40 border border-white/20 rounded-lg text-white"
              />
            </div>

            <button
              onClick={saveApi}
              className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-bold"
            >
              Save API Keys
            </button>
          </div>
        </GlassCard>
      )}

      {/* ========================= CONTACT TAB ========================= */}
      {activeTab === "contact" && (
        <GlassCard className="p-10">
          <h2 className="text-xl font-bold text-white mb-6">
            Edit Contact Details
          </h2>

          <div className="space-y-5">
            <div>
              <label className="text-sm text-gray-300">Public Email</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full mt-1 p-3 bg-black/40 border border-white/20 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Support Phone</label>
              <input
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full mt-1 p-3 bg-black/40 border border-white/20 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Office Address</label>
              <textarea
                value={address}
                onChange={e => setAddress(e.target.value)}
                rows={4}
                className="w-full mt-1 p-3 bg-black/40 border border-white/20 rounded-lg text-white"
              />
            </div>

            <button
              onClick={saveContact}
              className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold"
            >
              Update Contact Info
            </button>
          </div>
        </GlassCard>
      )}

      {/* ========================= LEGAL TAB ========================= */}
      {activeTab === "legal" && (
        <GlassCard className="p-10">
          <h2 className="text-xl font-bold text-white mb-6">
            Legal Page Content
          </h2>

          <div className="space-y-5">
            <div>
              <label className="text-sm text-gray-300">Terms & Conditions</label>
              <textarea
                value={terms}
                onChange={e => setTerms(e.target.value)}
                rows={6}
                className="w-full mt-1 p-3 bg-black/40 border border-white/20 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Privacy Policy</label>
              <textarea
                value={privacy}
                onChange={e => setPrivacy(e.target.value)}
                rows={6}
                className="w-full mt-1 p-3 bg-black/40 border border-white/20 rounded-lg text-white"
              />
            </div>

            <button
              onClick={saveLegal}
              className="mt-4 px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-bold"
            >
              Update Legal Pages
            </button>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
