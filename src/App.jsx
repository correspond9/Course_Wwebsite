import React, { useCallback, useEffect, useState } from 'react';
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

const PAGE_TO_PATH = {
  Home: '/',
  'Command Center': '/command-center',
  'Live Markets': '/live-markets',
  Academy: '/academy',
  Dashboard: '/dashboard',
  'About Us': '/about-us',
  'Contact Us': '/contact-us',
  Terms: '/terms',
  Privacy: '/privacy',
  Refund: '/refund'
};

const PATH_TO_PAGE = Object.entries(PAGE_TO_PATH).reduce((acc, [page, path]) => {
  acc[path] = page;
  return acc;
}, {});

const normalizePath = (path) => {
  if (!path) return '/';
  const cleaned = path.toLowerCase().replace(/\/+$/, '');
  return cleaned === '' ? '/' : cleaned;
};

const getPageFromPath = (path) => {
  const normalized = normalizePath(path);
  return PATH_TO_PAGE[normalized] || 'Home';
};

function App() {
  const [activePage, setActivePage] = useState(() => {
    if (typeof window === 'undefined') return 'Home';
    return getPageFromPath(window.location.pathname);
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigateToPage = useCallback((page, options = {}) => {
    const { replace = false } = options;
    const validPage = PAGE_TO_PATH[page] ? page : 'Home';
    const targetPath = PAGE_TO_PATH[validPage];

    setActivePage(validPage);

    if (typeof window === 'undefined') return;

    if (normalizePath(window.location.pathname) !== targetPath) {
      const method = replace ? 'replaceState' : 'pushState';
      window.history[method]({}, '', targetPath);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setActivePage(getPageFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'Home': return <Home setActivePage={navigateToPage} />;
      case 'Command Center': return <CommandCenter />;
      case 'Live Markets': return <Markets />;
      case 'Academy': return <Programs />;
      case 'Dashboard': return <Dashboard setActivePage={navigateToPage} />;
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
          setActivePage={navigateToPage}
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

        <div className="lg:ml-64 px-4 py-6 md:px-7 md:py-7 lg:px-8 lg:py-8">
          {renderPage()}
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
