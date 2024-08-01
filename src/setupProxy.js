const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * This configuration is for the http-proxy-middleware that is part of Create
 * React App. Is is documented at:
 * https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually
 *
 * This configuration proxies requests to the SpringBoot
 * backend. It proxies /api for API AJAX requests and /s/ for short URLs.
 */
module.exports = function (app) {
  app.use(
    ['/api/*', '/s/*', '/login/*', '/oauth2/*'],
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
      logLevel: 'debug',
      secure: false,
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('X-Forwarded-Host', req.get('Host'));
        proxyReq.setHeader('X-Forwarded-Proto', req.protocol);
      },
    }),
  );
};
