import React, { useCallback, useEffect, useMemo, useState } from 'react';
import GlassCard from './GlassCard';

const STOCK_SYMBOLS = [
  'RELIANCE',
  'HDFCBANK',
  'TCS',
  'INFY',
  'ICICIBANK',
  'SBIN',
  'ITC',
  'KOTAKBANK',
  'LT',
  'AXISBANK'
];

const NIFTY_CANDIDATES = ['NIFTYBEES', 'NIFTY50', '^NSEI', 'NIFTY'];
const BANK_NIFTY_CANDIDATES = ['BANKBEES', 'BANKNIFTY', '^NSEBANK'];
const REFRESH_MS = 30_000;
const REQUEST_TIMEOUT_MS = 12_000;

const API_BASE = import.meta.env.VITE_INDIAN_STOCK_API_BASE || '';

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const formatPrice = (value) => {
  if (!Number.isFinite(value)) return 'Loading...';
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const buildUrl = (path, params = {}) => {
  const query = new URLSearchParams(params);

  if (API_BASE) {
    const base = API_BASE.endsWith('/') ? API_BASE.slice(0, -1) : API_BASE;
    return `${base}${path}${query.toString() ? `?${query.toString()}` : ''}`;
  }

  const proxyQuery = new URLSearchParams({ path, ...params });
  return `/api/indian-stock?${proxyQuery.toString()}`;
};

const fetchJsonWithTimeout = async (url) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok || payload?.status === 'error') {
      throw new Error(payload?.message || 'Market data fetch failed');
    }

    return payload;
  } finally {
    clearTimeout(timeoutId);
  }
};

const fetchIndexFromCandidates = async (candidates) => {
  for (const symbol of candidates) {
    try {
      const payload = await fetchJsonWithTimeout(
        buildUrl('/stock', { symbol, res: 'num' })
      );

      const lastPrice = toNumber(payload?.data?.last_price);
      const change = toNumber(payload?.data?.change) || 0;
      const previousClose = toNumber(payload?.data?.previous_close);

      if (lastPrice !== null) {
        return {
          symbol: payload?.symbol || symbol,
          lastPrice,
          change,
          previousClose: previousClose ?? lastPrice - change
        };
      }
    } catch {
      // Try next symbol candidate.
    }
  }

  return null;
};

const Markets = () => {
  const [niftyPrice, setNiftyPrice] = useState(null);
  const [bankNiftyPrice, setBankNiftyPrice] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  const loadMarketData = useCallback(async () => {
    try {
      const [stockPayload, niftyData, bankNiftyData] = await Promise.all([
        fetchJsonWithTimeout(
          buildUrl('/stock/list', {
            symbols: STOCK_SYMBOLS.join(','),
            res: 'num'
          })
        ),
        fetchIndexFromCandidates(NIFTY_CANDIDATES),
        fetchIndexFromCandidates(BANK_NIFTY_CANDIDATES)
      ]);

      const stockList = Array.isArray(stockPayload?.stocks) ? stockPayload.stocks : [];

      const normalized = stockList
        .map((item, index) => {
          const price = toNumber(item?.last_price);
          const change = toNumber(item?.change);
          const previousClose = toNumber(item?.previous_close);

          if (price === null) return null;

          return {
            id: `${item?.symbol || 'STOCK'}-${index}`,
            symbol: item?.symbol || 'N/A',
            ltp: price,
            change: change ?? 0,
            prevClose: previousClose ?? price - (change ?? 0)
          };
        })
        .filter(Boolean);

      setStocks(normalized);
      setNiftyPrice(niftyData?.lastPrice ?? null);
      setBankNiftyPrice(bankNiftyData?.lastPrice ?? null);
      setLastUpdated(new Date().toLocaleTimeString('en-IN'));
      setError('');
    } catch {
      setError('Live market feed is temporarily delayed. Showing latest available values when possible.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMarketData();

    const interval = setInterval(() => {
      loadMarketData();
    }, REFRESH_MS);

    return () => {
      clearInterval(interval);
    };
  }, [loadMarketData]);

  const gainers = useMemo(() => [...stocks]
    .filter(s => s.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 5), [stocks]);

  const losers = useMemo(() => [...stocks]
    .filter(s => s.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 5), [stocks]);

  return (
    <div className="space-y-6 animate-fade-in">
      {error && (
        <GlassCard className="p-4 border-yellow-400/30 bg-yellow-500/5">
          <p className="text-sm text-yellow-200">{error}</p>
        </GlassCard>
      )}

      <div className="text-xs text-financio-muted">
        Data source: Indian Stock Market API (free public feed)
        {lastUpdated ? ` | Last updated: ${lastUpdated}` : ''}
      </div>
      
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
                {formatPrice(niftyPrice)}
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-financio-success/20 text-financio-success">
              ● Feed
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
                {formatPrice(bankNiftyPrice)}
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-financio-success/20 text-financio-success">
              ● Feed
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
                      ₹{formatPrice(item.ltp)}
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="2" className="py-4 text-center text-financio-muted">
                    {isLoading ? 'Loading...' : 'No gainers in current snapshot'}
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
                      ₹{formatPrice(item.ltp)}
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="2" className="py-4 text-center text-financio-muted">
                    {isLoading ? 'Loading...' : 'No losers in current snapshot'}
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
