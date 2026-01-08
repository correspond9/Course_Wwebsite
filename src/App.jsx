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

function App() {
  const [activePage, setActivePage] = useState('Live Markets');

  const renderPage = () => {
    switch (activePage) {
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
      <div className="flex min-h-screen text-white">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <div className="flex-1 ml-72 p-10">
          {renderPage()}
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
