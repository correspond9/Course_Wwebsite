import React from 'react';

const Header = () => {
  return (
    <header className="px-10 py-5 flex justify-between items-center">
      <div>
        <h2 className="text-slate-900 font-black text-xl tracking-tight leading-none">FINANCIO Overview</h2>
        <p className="text-blue-900/60 text-[10px] font-black uppercase tracking-widest mt-1">Premium Management</p>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative bg-white/40 p-3 rounded-2xl border border-white/50 cursor-pointer hover:scale-110 transition-all shadow-md">
          <span className="text-xl">🔔</span>
          <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
        </div>
        <div className="flex items-center gap-4 bg-blue-900 pr-6 pl-2 py-2 rounded-full shadow-2xl">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-900 text-sm font-black shadow-inner">A</div>
          <span className="text-white font-black text-sm tracking-tight">Admin Account</span>
        </div>
      </div>
    </header>
  );
};

export default Header;