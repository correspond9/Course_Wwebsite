import React from 'react';

const AboutUs = () => {
  return (
    <div className="h-full overflow-y-auto pb-20 animate-fade-in-up">
      {/* Hero Section */}
      <div className="relative h-64 rounded-2xl overflow-hidden mb-8 border border-white/5 shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2070&auto=format&fit=crop" 
          alt="Prop Trading Desk" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent flex items-end p-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Empowering Traders. Redefining Markets.</h1>
            <p className="text-cyan-400 font-mono tracking-wider">MUMBAI, INDIA</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6 text-slate-300 leading-relaxed">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-4">Who We Are</h2>
            <p className="mb-4">
              Welcome to Financio, a premier destination for aspiring and professional traders seeking to master the complexities of the financial markets. Founded with a vision to democratize institutional-grade trading knowledge, we bridge the critical gap between theoretical finance and practical, live-market execution.
            </p>
            <p className="mb-4">
              In an era where algorithmic trading and high-frequency systems dominate, the retail trader often feels left behind. Financio exists to level the playing field. We provide a robust ecosystem that combines state-of-the-art technical analysis tools with deep fundamental research, ensuring our members aren't just participating in the market—they are understanding it.
            </p>
            <p>
              Our curriculum and terminal are designed by veterans who have navigated multiple market cycles. From deciphering candlestick psychology to engineering complex options spreads, our mission is to transform novices into disciplined, profitable risk managers. We believe that consistency is not a product of luck, but the result of rigorous preparation and superior technology.
            </p>
          </div>

          {/* Partnership Badge */}
          <div className="bg-gradient-to-r from-blue-900/40 to-slate-800 p-6 rounded-xl border border-blue-500/30 flex items-center gap-4">
            <div className="p-3 bg-blue-600/20 rounded-full text-2xl">🤝</div>
            <div>
              <h3 className="text-white font-bold text-lg">Strategic Partnership</h3>
              <p className="text-blue-200 text-sm">
                Partnered with <span className="font-bold text-white">Straddly</span> to provide innovative derivatives trading solutions for traders of all levels.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Images / Stats */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5 h-64 overflow-hidden relative group">
             <img 
              src="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=2070&auto=format&fit=crop" 
              alt="Data Analysis" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-black/60 px-4 py-2 rounded border border-white/10 backdrop-blur-md text-white font-bold">Data Driven</span>
            </div>
          </div>
          
          <div className="bg-slate-800/50 p-6 rounded-xl border border-white/5 text-center">
            <h4 className="text-slate-400 text-sm uppercase tracking-widest mb-2">Community Members</h4>
            <div className="text-4xl font-black text-white">12,500+</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
