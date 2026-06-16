import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';

import Sidebar from './components/Sidebar';
import Markets from './components/Markets';
import CommandCenter from './components/CommandCenter';
import Programs from './components/Programs';
import Dashboard from './components/Dashboard';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import RefundPolicy from './components/RefundPolicy';
import Home from './components/Home';

function App() {
  const [activePage, setActivePage] = useState('Home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'Home': return <Home setActivePage={setActivePage} />;
      case 'Command Center': return <CommandCenter />;
      case 'Live Markets': return <Markets />;
      case 'Academy': return <Programs />;
      case 'Dashboard': return <Dashboard setActivePage={setActivePage} />;
      case 'About Us': return <AboutUs />;
      case 'Contact Us': return <ContactUs />;
      case 'Terms': return <Terms />;
      case 'Privacy': return <Privacy />;
      case 'Refund': return <RefundPolicy />;
      default: return <Markets />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen text-white">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="lg:hidden sticky top-0 z-30 px-4 py-3 bg-slate-950/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between">
          <div>
            <p className="text-base font-black tracking-wide">FINANCIO</p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-300">By Great Ventures</p>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="h-10 w-10 rounded-xl bg-white/10 border border-white/15 text-xl"
            aria-label="Open navigation"
          >
            ☰
          </button>
        </div>

        <div className="lg:ml-72 px-4 py-6 md:px-8 md:py-8 lg:p-10">
          {renderPage()}
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
