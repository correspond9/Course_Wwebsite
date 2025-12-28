import React, { useState } from 'react';
import GlassCard from './GlassCard';

const BrandingPage = () => {
  const [logo, setLogo] = useState(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-8 pb-10">
      <header>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Brand Identity</h1>
        <p className="text-blue-900 font-bold opacity-70">Customize how your students see your brand in India.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Logo Upload Section */}
        <GlassCard className="flex flex-col animate-shine">
          <h2 className="text-xl font-black text-slate-900 mb-6">Company Logo</h2>
          <div className="flex flex-col items-center justify-center border-4 border-dashed border-blue-900/20 rounded-[2rem] p-12 hover:border-blue-900/40 transition-all cursor-pointer bg-white/10">
            {logo ? (
              <img src={logo} alt="Preview" className="h-32 mb-4 object-contain" />
            ) : (
              <div className="text-blue-900 text-6xl mb-4 font-thin">+</div>
            )}
            <input 
              type="file" 
              className="hidden" 
              id="logo-upload" 
              onChange={handleLogoChange} 
            />
            <label htmlFor="logo-upload" className="text-blue-900 font-black uppercase tracking-widest text-sm cursor-pointer">
              {logo ? "Replace Logo" : "Upload Brand Assets"}
            </label>
            <p className="text-blue-900/50 text-xs mt-2 font-bold">Recommended: SVG or PNG (Transparent)</p>
          </div>
        </GlassCard>

        {/* Brand Settings Section */}
        <GlassCard className="animate-shine">
          <h2 className="text-xl font-black text-slate-900 mb-6">Visual Style</h2>
          <div className="space-y-6">
            <div>
              <label className="text-blue-900 font-black text-xs uppercase tracking-widest block mb-2">Business Name</label>
              <input 
                type="text" 
                className="w-full bg-white/40 border-2 border-white/50 rounded-2xl p-4 text-slate-900 font-bold outline-none focus:ring-4 ring-blue-500/20 transition-all" 
                placeholder="e.g. FreshCourse Academy" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-blue-900 font-black text-xs uppercase tracking-widest block mb-2">Primary Color</label>
                <div className="flex items-center gap-3 bg-white/40 p-2 rounded-2xl border-2 border-white/50">
                  <input type="color" className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-none" defaultValue="#1d4ed8" />
                  <span className="text-slate-900 font-bold text-sm">#1D4ED8</span>
                </div>
              </div>
              <div>
                <label className="text-blue-900 font-black text-xs uppercase tracking-widest block mb-2">Accent Color</label>
                <div className="flex items-center gap-3 bg-white/40 p-2 rounded-2xl border-2 border-white/50">
                  <input type="color" className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-none" defaultValue="#60a5fa" />
                  <span className="text-slate-900 font-bold text-sm">#60A5FA</span>
                </div>
              </div>
            </div>

            <button className="w-full py-5 bg-blue-900 text-white font-black rounded-[1.5rem] shadow-xl hover:bg-blue-800 transform active:scale-95 transition-all uppercase tracking-widest mt-4">
              Update Brand Profile
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default BrandingPage;