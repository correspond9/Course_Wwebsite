import React from 'react';

const RevenueChart = () => {
  return (
    <div className="bg-white/30 backdrop-blur-2xl border border-white/40 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden animate-shine">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Revenue Analytics (₹)</h2>
        <span className="text-sm font-bold text-blue-900 bg-white/50 px-3 py-1 rounded-full">+12.5% vs Last Month</span>
      </div>

      {/* Simplified SVG Chart */}
      <div className="h-64 w-full flex items-end justify-between gap-2 px-4">
        {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
            <div 
              style={{ height: `${height}%` }}
              className="w-full bg-blue-700/60 border-t-2 border-white/50 rounded-t-xl transition-all duration-500 group-hover:bg-blue-800"
            />
            <span className="text-[10px] font-bold text-slate-800 uppercase tracking-tighter">Day {i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;