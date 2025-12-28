import React from 'react';

const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { id: 'Home', icon: '🏠', label: 'Home' },
    { id: 'Courses', icon: '🎓', label: 'Academy Hub' },
    { id: 'Live Markets', icon: '📊', label: 'Live Markets' },
    { id: 'Option Chain', icon: '⛓️', label: 'Option Chain' },
    { id: 'Free Learning', icon: '📖', label: 'Free Learning' },
    { id: 'Careers', icon: '💼', label: 'Careers' },
    { id: 'About', icon: 'ℹ️', label: 'About Us' },
    { id: 'Contact', icon: '📞', label: 'Contact Us' },
    { id: 'Settings', icon: '⚙️', label: 'Settings' },
  ];

  return (
    <div className="h-full p-6 flex flex-col space-y-1 overflow-y-auto custom-scrollbar pb-32">
      <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-6 px-4">Navigation</p>
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => { setActivePage(item.id); window.scrollTo(0,0); }}
          className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
            activePage === item.id 
            ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40' 
            : 'text-white/40 hover:bg-white/5 hover:text-white'
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;