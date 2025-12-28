import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Programs from './components/Programs';

function App() {
  const [activePage, setActivePage] = useState('Dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard': return <Dashboard />;
      case 'Courses': return <Programs />;
      default: return <Dashboard />;
    }
  };

  return (
    /* z-index: 0 for the whole app container */
    <div className="min-h-screen w-full relative bg-slate-900 overflow-x-hidden">
      
      {/* BACKGROUND: Locked at z-[-10] (Way in the back) */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ 
          backgroundImage: `url('/WAVE_BLUE_BG.jpg')`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          zIndex: -10 
        }}
      />

      {/* CONTENT: Locked at z-10 (In the front) */}
      <div className="relative z-10 flex">
        <div className="w-64 fixed h-screen z-50">
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
        </div>

        <div className="flex-1 ml-64 min-h-screen flex flex-col relative z-10">
          <Header />
          <main className="p-6 relative z-20">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;