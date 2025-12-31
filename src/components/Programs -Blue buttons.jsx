import React, { useState } from 'react';

const Programs = ({ onEnroll }) => {
  const [isOffline, setIsOffline] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const majorPrograms = [
    { id: "starter", title: "Foundation Investor", subtitle: "Levels 0 - 2", basePrice: 45000, details: ["L0: Market Foundations", "L1: Wealth Planning", "L2: Trading Basics"] },
    { id: "pro", title: "Professional Trader", subtitle: "Levels 0 - 9", basePrice: 95000, details: ["Includes Foundation", "L3: Technical Analysis", "L5: Options", "L8: Risk Management"] },
    { id: "elite", title: "Elite Master", subtitle: "Levels 0 - 12+", basePrice: 180000, details: ["Includes Pro", "L6: Algo Trading", "L11: CFA/FRM Prep", "L12: Market Immersion"] }
  ];

  const getPrice = (base) => isOffline ? Math.round(base * 1.15) : base;
  const imagePath = process.env.PUBLIC_URL + '/3d_Blue_Button2.png';

  if (selectedProgram) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 p-6">
        <button onClick={() => setSelectedProgram(null)} className="text-blue-400 font-black text-xs uppercase tracking-[0.3em] mb-10 hover:text-white transition-all">← Back to Hub</button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-8">
            <h1 className="text-7xl font-black text-white tracking-tighter leading-none italic">{selectedProgram.title}</h1>
            <div className="space-y-4 pt-6">
              {selectedProgram.details.map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 p-6 rounded-3xl border border-white/10 text-white font-bold">
                  <span className="text-blue-500 italic opacity-50">0{i+1}</span> {item}
                </div>
              ))}
            </div>
          </div>

          <div className="premium-card bg-blue-600/10 border border-blue-500/40 rounded-[3rem] p-12 h-fit sticky top-10 flex flex-col items-center text-center">
              <p className="text-blue-400 font-black uppercase tracking-widest text-xs mb-2">Total Investment</p>
              <div className="text-7xl font-black text-white mb-10 italic">
                ₹{getPrice(selectedProgram.basePrice).toLocaleString('en-IN')}
              </div>
              <button 
                onClick={onEnroll}
                className="premium-3d-card w-full p-8 flex items-center justify-center text-xl font-black text-white uppercase tracking-widest"
                style={{ backgroundImage: `url(${imagePath})` }}
              >
                Enroll Now
              </button>
              <p className="mt-6 text-white/40 text-xs font-bold uppercase tracking-tighter">Secure Enrollment Portal</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 py-10 px-4">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-6xl font-black text-white tracking-tighter italic uppercase leading-none">Academy Hub</h1>
          <p className="text-blue-400 font-bold tracking-[0.2em] uppercase text-sm mt-2">Professional Mastery Curriculum</p>
        </div>
        
        <div className="bg-white/5 p-2 rounded-2xl border border-white/10 flex items-center gap-4">
          <span className={`text-xs font-black uppercase tracking-widest ${!isOffline ? 'text-blue-400' : 'text-white/30'}`}>Online</span>
          <button onClick={() => setIsOffline(!isOffline)} className="w-14 h-7 bg-blue-600 rounded-full relative transition-all">
            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${isOffline ? 'left-8' : 'left-1'}`} />
          </button>
          <span className={`text-xs font-black uppercase tracking-widest ${isOffline ? 'text-blue-400' : 'text-white/30'}`}>Offline</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {majorPrograms.map((prog) => (
          <div 
            key={prog.id} 
            onClick={() => setSelectedProgram(prog)}
            className="premium-3d-card p-10 min-h-[400px] justify-between"
            style={{ backgroundImage: `url(${imagePath})` }}
          >
            <div className="relative z-20">
              <p className="text-white/60 font-black text-xs uppercase tracking-widest mb-2">{prog.subtitle}</p>
              <h3 className="text-4xl font-black text-white leading-tight italic uppercase">{prog.title}</h3>
            </div>
            
            <div className="relative z-20 pt-10">
              <div className="text-3xl font-black text-white italic">₹{getPrice(prog.basePrice).toLocaleString('en-IN')}</div>
              <p className="text-white/50 text-[10px] font-bold uppercase mt-1 tracking-widest">Click to view details</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programs;