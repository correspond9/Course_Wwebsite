import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import YahooFinance from 'yahoo-finance2'

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] })

const normalizeTicker = (symbol) => {
  const clean = String(symbol || '').trim().toUpperCase()
  if (!clean) return null
  if (clean.startsWith('^')) return clean
  if (clean.endsWith('.NS') || clean.endsWith('.BO')) return clean
  return `${clean}.NS`
}

const mapQuote = (quote, requestedTicker) => {
  const ticker = quote?.symbol || requestedTicker
  const isBSE = ticker.endsWith('.BO')
  const symbol = ticker.replace(/\.(NS|BO)$/i, '')

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
  }
}

const localMarketProxy = () => ({
  name: 'local-market-proxy',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (!req.url?.startsWith('/api/indian-stock')) return next()

      try {
        const url = new URL(req.url, 'http://localhost:5173')
        const path = url.searchParams.get('path') || '/stock'
        const symbols = url.searchParams.get('symbols')
        const symbol = url.searchParams.get('symbol')

        let payload = { status: 'error', message: 'Unsupported path' }

        if (path === '/stock' && symbol) {
          const ticker = normalizeTicker(symbol)
          const quote = await yahooFinance.quote(ticker)
          const stock = mapQuote(quote, ticker)
          payload = {
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
          }
        }

        if (path === '/stock/list' && symbols) {
          const tickers = symbols
            .split(',')
            .map((item) => normalizeTicker(item))
            .filter(Boolean)

          const quotes = await Promise.all(
            tickers.map(async (ticker) => {
              try {
                const quote = await yahooFinance.quote(ticker)
                return mapQuote(quote, ticker)
              } catch {
                return null
              }
            })
          )

          const stocks = quotes.filter(Boolean)
          payload = {
            status: 'success',
            response_format: 'numeric_only',
            count: stocks.length,
            stocks,
            timestamp: new Date().toISOString()
          }
        }

        res.statusCode = payload.status === 'success' ? 200 : 400
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(JSON.stringify(payload))
      } catch (error) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(JSON.stringify({ status: 'error', message: error.message || 'Proxy error' }))
      }
    })
  }
})

export default defineConfig({
  plugins: [react(), localMarketProxy()],
})
