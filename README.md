# Financio Website

Vite + React frontend for Financio.

## Live Markets Integration (Free API)

The Live Markets page is integrated with the open-source API from:

https://github.com/0xramm/Indian-Stock-Market-API

### What is integrated

1. Top Gainers and Top Losers are fetched from `/stock/list?symbols=...&res=num`.
2. Nifty and Bank Nifty cards use best-available symbol candidates and fallback order.
3. Data auto-refresh runs every 30 seconds.
4. Timeout and error handling are included, so temporary upstream delays do not break the page.

## Production-safe API routing

Because the upstream free API is HTTP (`http://65.0.104.9`) and production site is HTTPS, this project uses a Vercel serverless proxy:

1. Serverless function: `api/indian-stock.js`
2. Public route: `/api/indian-stock`
3. Markets frontend calls this route by default.

This avoids browser mixed-content blocking on HTTPS.

## Environment variable (optional override)

If you want to bypass proxy in specific environments:

`VITE_INDIAN_STOCK_API_BASE`

Example:

`VITE_INDIAN_STOCK_API_BASE=http://65.0.104.9`

Note: use this only in HTTP-safe/local scenarios. On HTTPS production, proxy route is recommended.

## Run locally

1. Install dependencies:
	`npm install`
2. Start dev server:
	`npm run dev`
3. Open shown local URL and go to Live Markets page.

## Deploy (Vercel + GitHub)

1. Push to `main`.
2. Vercel auto-deploys.
3. Live Markets will fetch via `/api/indian-stock` automatically.

## Upstream API limits and behavior

As per upstream docs:

1. Free and no API key.
2. Suggested limit ~60 requests per minute.
3. Market close/holidays can return last available data.

This app already keeps request frequency low with batched requests and 30-second refresh.
