import React, { useEffect, useState } from 'react';
import dhanSocket from '../services/DhanSocket';
import GlassCard from './GlassCard';

// Base watchlist universe
const WATCHLIST = [
  { id: '13', symbol: 'NIFTY', name: 'NSE Nifty 50', prevClose: 0 },
  { id: '25', symbol: 'BANKNIFTY', name: 'NSE Bank Nifty', prevClose: 0 },
  { id: '2885', symbol: 'RELIANCE', prevClose: 1565.00 },
  { id: '1333', symbol: 'HDFCBANK', prevClose: 985.00 },
  { id: '11536', symbol: 'TCS', prevClose: 3200.00 },
  { id: '1594', symbol: 'INFY', prevClose: 1480.00 },
  { id: '4963', symbol: 'ICICIBANK', prevClose: 1340.00 },
  { id: '3045', symbol: 'SBIN', prevClose: 975.00 },
  { id: '1660', symbol: 'ITC', prevClose: 405.00 },
  { id: '1922', symbol: 'KOTAKBANK', prevClose: 2190.00 },
  { id: '11483', symbol: 'LT', prevClose: 4070.00 },
  { id: '5900', symbol: 'AXISBANK', prevClose: 1265.00 }
];

const Markets = () => {
  const [niftyPrice, setNiftyPrice] = useState(0);
  const [bankNiftyPrice, setBankNiftyPrice] = useState(0);
  const [livePrices, setLivePrices] = useState({});
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    dhanSocket.connect();

    const unsub = dhanSocket.onPriceUpdate((id, price) => {
      if (!price || price <= 0) return;

      if (id === '13') {
        setNiftyPrice(price.toFixed(2));
        return;
      }

      if (id === '25') {
        setBankNiftyPrice(price.toFixed(2));
        return;
      }

      setLivePrices(prev => ({ ...prev, [id]: price }));
    });

    // Force hourly refresh to recalc top 5 lists
    const hourlyRefresh = setInterval(() => {
      setRefreshTick(prev => prev + 1);
    }, 60 * 60 * 1000);

    return () => {
      unsub();
      clearInterval(hourlyRefresh);
    };
  }, []);

  const getStockData = (stock) => {
    const current = livePrices[stock.id] || stock.prevClose;
    const change = current - stock.prevClose;

    return {
      ...stock,
      ltp: typeof current === 'number' ? current.toFixed(2) : current,
      change,
      isPositive: change >= 0
    };
  };

  const allProcessed = WATCHLIST.filter(s => s.id !== '13' && s.id !== '25')
    .map(getStockData);

  const gainers = [...allProcessed]
    .filter(s => s.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 5);

  const losers = [...allProcessed]
    .filter(s => s.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* ===== INDICES SECTION ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* NIFTY */}
        <GlassCard className="p-6">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-financio-muted text-sm font-bold uppercase tracking-wider">
                NSE Nifty 50
              </h3>
              <div className="text-4xl font-bold text-white mt-2 font-mono">
                {niftyPrice || "Loading..."}
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-financio-success/20 text-financio-success">
              ● Live
            </span>
          </div>
        </GlassCard>

        {/* BANK NIFTY */}
        <GlassCard className="p-6">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-financio-muted text-sm font-bold uppercase tracking-wider">
                NSE Bank Nifty
              </h3>
              <div className="text-4xl font-bold text-white mt-2 font-mono">
                {bankNiftyPrice || "Loading..."}
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-financio-success/20 text-financio-success">
              ● Live
            </span>
          </div>
        </GlassCard>

      </div>

      {/* ===== GAINERS & LOSERS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* GAINERS */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-bold text-white mb-4">Top Gainers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-financio-muted border-b border-white/10">
                  <th className="py-3 font-medium">Symbol</th>
                  <th className="py-3 font-medium text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {gainers.length > 0 ? gainers.map(item => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 font-medium text-white">{item.symbol}</td>
                    <td className="py-3 text-right font-mono text-financio-success">
                      ₹{item.ltp}
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="2" className="py-4 text-center text-financio-muted">
                    Loading...
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* LOSERS */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-bold text-white mb-4">Top Losers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-financio-muted border-b border-white/10">
                  <th className="py-3 font-medium">Symbol</th>
                  <th className="py-3 font-medium text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {losers.length > 0 ? losers.map(item => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 font-medium text-white">{item.symbol}</td>
                    <td className="py-3 text-right font-mono text-financio-danger">
                      ₹{item.ltp}
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="2" className="py-4 text-center text-financio-muted">
                    Loading...
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>

      </div>

      {/* ===== DISCLAIMER ===== */}
      <GlassCard className="p-6 border-yellow-400/30 bg-yellow-500/5">
        <p className="text-sm text-yellow-200 leading-relaxed">
          <strong className="text-yellow-300">Disclaimer:</strong> Financio is an educational platform. 
          We do not provide trading tips, advisory services, buy/sell recommendations, signal calls, or 
          any Telegram/WhatsApp trading groups. Users are solely responsible for their trading and 
          investment decisions.
        </p>
      </GlassCard>

    </div>
  );
};

export default Markets;
