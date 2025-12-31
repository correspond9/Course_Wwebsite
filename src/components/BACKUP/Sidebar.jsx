import React from 'react';

const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { name: 'Command Center', icon: '📊' },
    { name: 'Live Markets', icon: '📈' },
    { name: 'Academy', icon: '🎓' },
    { name: 'Dashboard', icon: '⚡' },
    // New Menu Items
    { name: 'About Us', icon: 'ℹ️' },
    { name: 'Contact Us', icon: '📞' },
  ];

  return (
    <div className="h-full w-64 bg-slate-900 border-r border-slate-800 flex flex-col font-sans">
      {/* Brand Header */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">
          F
        </div>
        <div>
          <h1 className="font-bold text-white tracking-wider text-sm">FINANCIO</h1>
          <span className="text-[10px] text-cyan-400 font-medium tracking-widest block opacity-80">TERMINAL V2.0</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActivePage(item.name)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activePage === item.name
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 transform scale-105' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800' 
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg opacity-80">
                {item.icon}
              </span>
              {item.name}
            </div>
            {activePage === item.name && (
              <span className="w-1.5 h-1.5 bg-white rounded-full shadow shadow-white/50 animate-pulse"></span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer Status */}
      <div className="p-4 mt-auto">
        <div className="bg-slate-800 rounded-lg p-3 flex items-center gap-3 border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">System Stable</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
