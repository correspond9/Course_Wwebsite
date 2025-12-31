import React, { useState, useEffect } from 'react';
import dhanSocket from '../services/DhanSocket';

const LivePriceCard = ({ symbol, securityId }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    console.log(`🎯 Card ${symbol} (ID: ${securityId}) started`);
    
    dhanSocket.connect();
    
    const unsubscribe = dhanSocket.onPriceUpdate((data) => {
      console.log(`📨 Card ${symbol} checking ID "${data.securityId}" vs "${securityId}"`);
      
      if (data.securityId === securityId) {
        console.log(`✅ ${symbol} LIVE! ₹${data.lp}`);
        setPrice(data.lp);
      }
    });
    
    // Poll cache every 2 seconds
    const interval = setInterval(() => {
      const cachedPrice = dhanSocket.priceCache.get(securityId);
      if (cachedPrice && cachedPrice > 100) {
        setPrice(cachedPrice);
      }
    }, 2000);
    
    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [securityId, symbol]);

  return (
    <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all h-48 flex flex-col justify-center items-center text-center">
      <div className="text-slate-600 font-bold text-sm uppercase tracking-wider mb-4">{symbol}</div>
      <div className="text-3xl font-black text-slate-900 mb-4">
        ₹{price > 0 ? price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
      </div>
      <div className={`px-3 py-1 rounded-full text-xs font-black uppercase shadow-sm ${
        price > 100 
          ? 'bg-emerald-100 text-emerald-700 shadow-emerald-200 animate-pulse' 
          : 'bg-slate-200 text-slate-500'
      }`}>
        {price > 100 ? 'LIVE' : 'Waiting'}
      </div>
      <div className="text-xs text-slate-400 mt-2 font-mono">ID: {securityId}</div>
    </div>
  );
};

export default LivePriceCard;
