import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Markets from './components/Markets';
import CommandCenter from './components/CommandCenter';

// Content Components
import Programs from './components/Programs';
import Dashboard from './components/Dashboard';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Terms from './components/Terms';
import Privacy from './components/Privacy';

function App() {
  const [activePage, setActivePage] = useState('Live Markets');

  return (
    <AuthProvider>
      <div className="flex min-h-screen text-financio-text selection:bg-financio-primary selection:text-white">
        
        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        <div className="flex-1 ml-72 p-10 transition-all duration-300">
          <div className="max-w-7xl mx-auto space-y-8">
            
            <header className="animate-fade-in">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                {activePage}<span className="text-financio-primary">.</span>
              </h1>
            </header>

            <main className="animate-fade-in">
              {activePage === 'Command Center' && <CommandCenter />}
              {activePage === 'Live Markets' && <Markets />}
              {activePage === 'Academy' && <Programs />}
              {/* Pass setActivePage to Dashboard so it can link to Command Center */}
              {activePage === 'Dashboard' && <Dashboard setActivePage={setActivePage} />}
              {activePage === 'About Us' && <AboutUs />}
              {activePage === 'Contact Us' && <ContactUs />}
              {activePage === 'Terms' && <Terms />}
              {activePage === 'Privacy' && <Privacy />}
            </main>
            
          </div>
        </div>

      </div>
    </AuthProvider>
  );
}

export default App;
