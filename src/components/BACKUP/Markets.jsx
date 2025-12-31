import React, { useState, useEffect } from 'react';
import GlassCard from './GlassCard';

const Markets = () => {
  // Mock Data Simulation
  const [niftyPrice, setNiftyPrice] = useState(24000.00);
  const [bankNiftyPrice, setBankNiftyPrice] = useState(51200.00);

  useEffect(() => {
    const interval = setInterval(() => {
      setNiftyPrice(prev => prev + (Math.random() - 0.5) * 10);
      setBankNiftyPrice(prev => prev + (Math.random() - 0.5) * 20);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-fade-in-up space-y-8">
      
      {/* Page Title */}
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase drop-shadow-lg">
          Live Markets
        </h1>
        <p className="text-cyan-400 font-mono text-sm tracking-widest">
          Markets Closed - Real-time Simulation Active
        </p>
      </div>

      {/* Row 1: Main Indices (2 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* NIFTY 50 */}
        <GlassCard className="p-6 relative overflow-hidden group hover:border-cyan-500/50 transition-all duration-500">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
          </div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">NIFTY 50</h3>
          <div className="text-3xl font-bold text-white mb-2">₹{niftyPrice.toFixed(2)}</div>
          <div className="flex justify-between items-end">
             <span className="text-xs text-gray-500">Vol: 12.4M</span>
             <span className="text-green-400 font-bold text-sm bg-green-500/10 px-2 py-1 rounded">+36 (0.15%)</span>
          </div>
        </GlassCard>

        {/* BANKNIFTY */}
        <GlassCard className="p-6 relative overflow-hidden group hover:border-cyan-500/50 transition-all duration-500">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">BANKNIFTY</h3>
          <div className="text-3xl font-bold text-white mb-2">₹{bankNiftyPrice.toFixed(2)}</div>
          <div className="flex justify-between items-end">
             <span className="text-xs text-gray-500">Vol: 8.2M</span>
             <span className="text-green-400 font-bold text-sm bg-green-500/10 px-2 py-1 rounded">+9 (0.05%)</span>
          </div>
        </GlassCard>
      </div>

      {/* Row 2: Secondary Cards (Fixing the wide cards by using the same grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Top Gainers Placeholder */}
        <GlassCard className="p-6 h-40 flex flex-col justify-center group hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3 mb-2 text-gray-400 group-hover:text-cyan-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                <span className="text-xs font-bold uppercase tracking-wider">Top Gainers</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">Coming Soon</h3>
            <p className="text-xs text-gray-500">Live top 5 gainers will appear here</p>
        </GlassCard>

        {/* Top Losers Placeholder */}
        <GlassCard className="p-6 h-40 flex flex-col justify-center group hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3 mb-2 text-gray-400 group-hover:text-red-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
                <span className="text-xs font-bold uppercase tracking-wider">Top Losers</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">Coming Soon</h3>
            <p className="text-xs text-gray-500">Live top 5 losers will appear here</p>
        </GlassCard>

      </div>
    </div>
  );
};

export default Markets;
