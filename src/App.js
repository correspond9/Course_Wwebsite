import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Programs from './components/Programs';
import LegalPages from './components/LegalPages';

// High-Impact Home Page
const HomePage = ({ onStart }) => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 animate-in fade-in zoom-in duration-1000">
    <div className="relative">
      <div className="absolute -inset-20 bg-blue-600/20 blur-[120px] rounded-full"></div>
      <h1 className="relative text-8xl font-black text-white italic tracking-tighter leading-none mb-6">
        MASTER THE <br /> <span className="text-blue-500">MARKETS.</span>
      </h1>
    </div>
    <p className="max-w-2xl text-xl text-blue-100/60 font-medium leading-relaxed mb-12">
      From foundational literacy to institutional-grade algorithmic trading. 
      Join the elite 1% with Financio-Straddly's 12-level professional mastery track.
    </p>
    <button 
      onClick={onStart}
      className="premium-3d-card px-16 py-6 text-xl font-black text-white uppercase tracking-[0.4em] flex items-center justify-center"
      style={{ backgroundImage: `url('/3d_Blue_Button2.png')`, minHeight: 'auto' }}
    >
      Enter Academy
    </button>
  </div>
);

// Static Image Tab Component
const ImageTab = ({ src, title }) => (
  <div className="animate-in fade-in duration-700">
    <div className="mb-8">
      <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter">{title}</h1>
      <div className="h-1 w-20 bg-blue-500 mt-2"></div>
    </div>
    <div className="premium-card rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-black/20">
      <img src={src} alt={title} className="w-full h-auto object-contain block mx-auto" />
    </div>
  </div>
);

const UnderConstruction = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-10">
    <div className="premium-card bg-slate-900/40 backdrop-blur-xl border border-white/10 p-16 rounded-[3rem]">
      <h1 className="text-5xl font-black text-white italic uppercase mb-4 tracking-tighter">{title}</h1>
      <p className="text-blue-400 font-bold uppercase tracking-[0.3em] text-sm italic">Live Version Coming Soon</p>
    </div>
  </div>
);

const CheckoutPage = () => (
  <div className="max-w-4xl mx-auto py-20 px-6">
    <div className="premium-card bg-blue-900/20 backdrop-blur-xl border border-blue-500/30 p-16 rounded-[3rem] text-center">
      <h1 className="text-5xl font-black text-white italic uppercase mb-8 tracking-tighter">Checkout</h1>
      <p className="text-xl text-blue-200 font-bold mb-4 italic">Payment gateway integration in progress.</p>
      <p className="text-white/70 mb-8">Contact us for manual enrollment: <br/> <b>info@financio.pro | +91 89289 40525</b></p>
    </div>
  </div>
);

function App() {
  const [activePage, setActivePage] = useState('Home');

  const renderContent = () => {
    switch (activePage) {
      case 'Home': return <HomePage onStart={() => setActivePage('Courses')} />;
      case 'Courses': return <Programs onEnroll={() => setActivePage('Checkout')} />;
      case 'Live Markets': return <ImageTab src="/MARKETS.png" title="Market Dashboard" />;
      case 'Option Chain': return <ImageTab src="/OPTION_TAB.png" title="Live Option Chain" />;
      case 'Free Learning': return <UnderConstruction title="Free Learning" />;
      case 'Careers': return <UnderConstruction title="Careers" />;
      case 'Settings': return <UnderConstruction title="Account Settings" />;
      case 'Checkout': return <CheckoutPage />;
      case 'About': return <LegalPages type="about" />;
      case 'Contact': return <LegalPages type="contact" />;
      case 'Privacy': return <LegalPages type="privacy" />;
      case 'Terms': return <LegalPages type="terms" />;
      case 'Refund': return <LegalPages type="refund" />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-slate-900 overflow-x-hidden flex flex-col">
      <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: `url('/WAVE_BLUE_BG.jpg')`, backgroundSize: 'cover', zIndex: 0 }} />
      <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm pointer-events-none z-10" />

      {/* ENLARGED CLEAN HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 h-32 flex items-center px-12 bg-slate-900/60 backdrop-blur-2xl border-b border-white/5">
        <div className="flex items-center">
          {/* Huge Logo with Logo Bar Integrated */}
          <img src="/LOGO.png" alt="Financio Straddly" className="h-20 object-contain hover:scale-105 transition-transform" />
        </div>
      </header>

      <div className="relative z-20 flex flex-1 mt-32">
        <div className="w-72 fixed h-screen z-40 border-r border-white/5 bg-slate-900/40">
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
        </div>

        <main className="flex-1 ml-72 p-12 pb-40">
          {renderContent()}
        </main>
      </div>

      <footer className="relative z-30 ml-72 bg-black/80 backdrop-blur-md border-t border-white/5 p-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-white font-black italic tracking-tighter text-3xl uppercase">Financio - Straddly</h3>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mt-8">© 2025 Tradewithstraddly. All Rights Reserved.</p>
          </div>
          <div className="flex flex-wrap gap-8 justify-start md:justify-end">
            <div className="flex flex-col gap-3">
              <p className="text-blue-500 font-black text-[10px] uppercase tracking-widest mb-2">Legal Documents</p>
              {['About', 'Contact', 'Privacy', 'Terms', 'Refund'].map(item => (
                <button 
                  key={item} 
                  onClick={() => { setActivePage(item); window.scrollTo(0,0); }} 
                  className="text-white/50 hover:text-white text-[11px] font-black uppercase tracking-widest text-left transition-colors"
                >
                  {item === 'Refund' ? 'Refund Policy' : item === 'Terms' ? 'Terms & Conditions' : item === 'About' ? 'About Us' : item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;