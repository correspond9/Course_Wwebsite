const UPSTREAM_BASE = 'http://65.0.104.9';
const ALLOWED_PATHS = new Set(['/stock', '/stock/list', '/search', '/symbols', '/']);
const YahooFinance = require('yahoo-finance2').default;
const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 's-maxage=20, stale-while-revalidate=40',
  'Content-Type': 'application/json; charset=utf-8'
};

const send = (res, statusCode, payload) => {
  res.statusCode = statusCode;

  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  res.end(JSON.stringify(payload));
};

const getSingleValue = (value) => {
  if (Array.isArray(value)) return value[0];
  return value;
};

const normalizeTicker = (symbol) => {
  if (!symbol) return null;
  const clean = String(symbol).trim().toUpperCase();
  if (!clean) return null;
  if (clean.startsWith('^')) return clean;
  if (clean.endsWith('.NS') || clean.endsWith('.BO')) return clean;
  return `${clean}.NS`;
};

const buildStockObject = (quote, requestedTicker) => {
  const ticker = quote?.symbol || requestedTicker;
  const isBSE = ticker.endsWith('.BO');
  const symbol = ticker.replace(/\.(NS|BO)$/i, '');

  return {
    symbol,
    exchange: isBSE ? 'BSE' : 'NSE',
    ticker,
    company_name: quote?.longName || quote?.shortName || symbol,
    last_price: quote?.regularMarketPrice ?? null,
    change: quote?.regularMarketChange ?? 0,
    percent_change: quote?.regularMarketChangePercent ?? 0,
    previous_close: quote?.regularMarketPreviousClose ?? null,
    open: quote?.regularMarketOpen ?? null,
    day_high: quote?.regularMarketDayHigh ?? null,
    day_low: quote?.regularMarketDayLow ?? null,
    year_high: quote?.fiftyTwoWeekHigh ?? null,
    year_low: quote?.fiftyTwoWeekLow ?? null,
    volume: quote?.regularMarketVolume ?? null,
    market_cap: quote?.marketCap ?? null,
    pe_ratio: quote?.trailingPE ?? null,
    sector: quote?.sector || null,
    currency: quote?.currency || 'INR'
  };
};

const fallbackStock = async (symbol) => {
  const ticker = normalizeTicker(symbol);
  if (!ticker) {
    return {
      status: 'error',
      message: 'Please provide a stock symbol using ?symbol=STOCKNAME'
    };
  }

  const quote = await yahooFinance.quote(ticker);
  const stock = buildStockObject(quote, ticker);

  return {
    status: 'success',
    symbol: stock.symbol,
    exchange: stock.exchange,
    ticker: stock.ticker,
    response_format: 'numeric_only',
    data: {
      company_name: stock.company_name,
      last_price: stock.last_price,
      change: stock.change,
      percent_change: stock.percent_change,
      previous_close: stock.previous_close,
      open: stock.open,
      day_high: stock.day_high,
      day_low: stock.day_low,
      year_high: stock.year_high,
      year_low: stock.year_low,
      volume: stock.volume,
      market_cap: stock.market_cap,
      pe_ratio: stock.pe_ratio,
      sector: stock.sector,
      currency: stock.currency,
      timestamp: new Date().toISOString()
    }
  };
};

const fallbackStockList = async (symbolsParam) => {
  if (!symbolsParam) {
    return {
      status: 'error',
      message: 'Please provide symbols using ?symbols=SYMBOL1,SYMBOL2'
    };
  }

  const tickers = String(symbolsParam)
    .split(',')
    .map((part) => normalizeTicker(part))
    .filter(Boolean);

  if (!tickers.length) {
    return {
      status: 'error',
      message: 'No valid symbols provided'
    };
  }

  const quotes = await Promise.all(
    tickers.map(async (ticker) => {
      try {
        const quote = await yahooFinance.quote(ticker);
        return buildStockObject(quote, ticker);
      } catch {
        return null;
      }
    })
  );

  const stocks = quotes.filter(Boolean);

  if (!stocks.length) {
    return {
      status: 'error',
      message: 'No data found for requested symbols'
    };
  }

  return {
    status: 'success',
    response_format: 'numeric_only',
    count: stocks.length,
    stocks,
    timestamp: new Date().toISOString()
  };
};

const fallbackPayload = async (path, params) => {
  if (path === '/stock') {
    return fallbackStock(getSingleValue(params.symbol));
  }

  if (path === '/stock/list') {
    return fallbackStockList(getSingleValue(params.symbols));
  }

  return {
    status: 'error',
    message: 'Upstream unavailable and no fallback for this path'
  };
};

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    Object.entries(CORS_HEADERS).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    res.end();
    return;
  }

  if (req.method !== 'GET') {
    send(res, 405, { status: 'error', message: 'Method not allowed' });
    return;
  }

  const { path: incomingPath = '/stock', ...params } = req.query || {};
  const path = getSingleValue(incomingPath);

  if (!ALLOWED_PATHS.has(path)) {
    send(res, 400, {
      status: 'error',
      message: 'Unsupported upstream path',
      allowed_paths: Array.from(ALLOWED_PATHS)
    });
    return;
  }

  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((singleValue) => {
        if (singleValue !== undefined && singleValue !== null && singleValue !== '') {
          query.append(key, singleValue);
        }
      });
      return;
    }

    if (value !== undefined && value !== null && value !== '') {
      query.set(key, value);
    }
  });

  const upstreamUrl = `${UPSTREAM_BASE}${path}${query.toString() ? `?${query.toString()}` : ''}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const upstreamResponse = await fetch(upstreamUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Financio-Market-Proxy/1.0'
      }
    });

    clearTimeout(timeoutId);

    const bodyText = await upstreamResponse.text();
    let payload;

    try {
      payload = JSON.parse(bodyText);
    } catch {
      payload = { status: 'error', message: 'Invalid upstream JSON', raw: bodyText };
    }

    send(res, upstreamResponse.ok ? 200 : upstreamResponse.status, payload);
  } catch (error) {
    try {
      const payload = await fallbackPayload(path, params);
      const statusCode = payload?.status === 'success' ? 200 : 503;
      send(res, statusCode, payload);
    } catch (fallbackError) {
      const isTimeout = error && error.name === 'AbortError';
      send(res, 504, {
        status: 'error',
        message: isTimeout ? 'Upstream timeout' : 'Unable to reach upstream market feed',
        fallback_message: fallbackError?.message || 'Fallback feed failed'
      });
    }
  }
};
