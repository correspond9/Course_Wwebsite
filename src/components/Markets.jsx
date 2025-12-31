import React, { useEffect, useState } from 'react';
import dhanSocket from '../services/DhanSocket';
import GlassCard from './GlassCard';

// Base prices (Same as Checkpoint v0.5)
const WATCHLIST = [
  { id: '2885', symbol: 'RELIANCE', name: 'Reliance Industries', prevClose: 1565.00 },
  { id: '1333', symbol: 'HDFCBANK', name: 'HDFC Bank', prevClose: 985.00 },
  { id: '11536', symbol: 'TCS', name: 'Tata Consultancy Svc', prevClose: 3200.00 },
  { id: '1594', symbol: 'INFY', name: 'Infosys', prevClose: 1480.00 },
  { id: '4963', symbol: 'ICICIBANK', name: 'ICICI Bank', prevClose: 1340.00 },
  { id: '3045', symbol: 'SBIN', name: 'State Bank of India', prevClose: 975.00 },
  { id: '1660', symbol: 'ITC', name: 'ITC Limited', prevClose: 405.00 },
  { id: '1922', symbol: 'KOTAKBANK', name: 'Kotak Mahindra', prevClose: 2190.00 },
  { id: '11483', symbol: 'LT', name: 'Larsen & Toubro', prevClose: 4070.00 },
  { id: '5900', symbol: 'AXISBANK', name: 'Axis Bank', prevClose: 1265.00 }
];

const Markets = () => {
  const [niftyPrice, setNiftyPrice] = useState(0);
  const [bankNiftyPrice, setBankNiftyPrice] = useState(0);
  const [livePrices, setLivePrices] = useState({});

  useEffect(() => {
    dhanSocket.connect();
    const unsubPrice = dhanSocket.onPriceUpdate((id, price) => {
      // Indices
      if (id === '13') setNiftyPrice(price.toFixed(2));
      else if (id === '25') setBankNiftyPrice(price.toFixed(2));
      // Stocks
      else {
        setLivePrices(prev => ({ ...prev, [id]: price }));
      }
    });
    return () => { unsubPrice(); };
  }, []);

  const getStockData = (stock) => {
    const currentPrice = livePrices[stock.id] || stock.prevClose;
    const change = currentPrice - stock.prevClose;
    const percentChange = ((change / stock.prevClose) * 100).toFixed(2);
    
    return {
      ...stock,
      ltp: typeof currentPrice === 'number' ? currentPrice.toFixed(2) : currentPrice,
      changeVal: change,
      percentChange: percentChange,
      isPositive: change >= 0
    };
  };

  const processedStocks = WATCHLIST.map(getStockData);
  const gainers = processedStocks.filter(s => s.isPositive).sort((a,b) => b.changeVal - a.changeVal).slice(0, 5);
  const losers = processedStocks.filter(s => !s.isPositive).sort((a,b) => a.changeVal - b.changeVal).slice(0, 5);

  return (
    <div className="space-y-6">
      
      {/* 1. INDICES SECTION (Only Nifty & Bank Nifty) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-financio-muted text-sm font-bold uppercase tracking-wider">NSE Nifty 50</h3>
              <div className="text-4xl font-bold text-white mt-2 font-mono">
                {niftyPrice || "Loading..."}
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-financio-success/20 text-financio-success">
                ● Live
              </span>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-financio-muted text-sm font-bold uppercase tracking-wider">NSE Bank Nifty</h3>
              <div className="text-4xl font-bold text-white mt-2 font-mono">
                {bankNiftyPrice || "Loading..."}
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-financio-success/20 text-financio-success">
                ● Live
              </span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* 2. MARKET TABLES SECTION (Gainers & Losers only) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* TOP GAINERS */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            Top Gainers
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-financio-muted border-b border-white/10">
                  <th className="py-3 font-medium">Symbol</th>
                  <th className="py-3 font-medium text-right">Price</th>
                  <th className="py-3 font-medium text-right">% Chg</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {gainers.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 font-medium text-white">{item.symbol}</td>
                    <td className="py-3 text-right font-mono text-financio-muted">₹{item.ltp}</td>
                    <td className="py-3 text-right font-mono text-financio-success font-bold">
                      +{item.percentChange}%
                    </td>
                  </tr>
                ))}
                {gainers.length === 0 && <tr><td colSpan="3" className="py-4 text-center text-financio-muted">Loading...</td></tr>}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* TOP LOSERS */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            Top Losers
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-financio-muted border-b border-white/10">
                  <th className="py-3 font-medium">Symbol</th>
                  <th className="py-3 font-medium text-right">Price</th>
                  <th className="py-3 font-medium text-right">% Chg</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {losers.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 font-medium text-white">{item.symbol}</td>
                    <td className="py-3 text-right font-mono text-financio-muted">₹{item.ltp}</td>
                    <td className="py-3 text-right font-mono text-financio-danger font-bold">
                      {item.percentChange}%
                    </td>
                  </tr>
                ))}
                {losers.length === 0 && <tr><td colSpan="3" className="py-4 text-center text-financio-muted">No losers.</td></tr>}
              </tbody>
            </table>
          </div>
        </GlassCard>

      </div>
    </div>
  );
};

export default Markets;
