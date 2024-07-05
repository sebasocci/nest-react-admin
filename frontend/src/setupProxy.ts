const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying request:', req.url);
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log('Received response from target:', proxyRes.statusCode);
      },
    })
  );
};
