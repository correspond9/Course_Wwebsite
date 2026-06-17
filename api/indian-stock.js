const UPSTREAM_BASE = 'http://65.0.104.9';
const ALLOWED_PATHS = new Set(['/stock', '/stock/list', '/search', '/symbols', '/']);

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

  const { path = '/stock', ...params } = req.query || {};

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
    const isTimeout = error && error.name === 'AbortError';
    send(res, 504, {
      status: 'error',
      message: isTimeout ? 'Upstream timeout' : 'Unable to reach upstream market feed'
    });
  }
};
