const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

    const filter0 = function (pathname, req) {
        return pathname.match('/login') && req.method === 'POST';
    };

    app.use(
        createProxyMiddleware(filter0,
            {
                target: 'http://127.0.0.1:8081',
                changeOrigin: true,
                pathRewrite: {
                }
            },
        )
    );

    const filter = function (pathname, req) {
        return pathname.match('/register') && req.method === 'POST';
    };

    app.use(
        createProxyMiddleware(filter,
            {
                target: 'http://127.0.0.1:8081',
                changeOrigin: true,
                pathRewrite: {
                }
            },)
    );
    const filter2 = function (pathname, req) {
        return pathname.match('/getgoods') && req.method === 'GET';
    };

    app.use(
        createProxyMiddleware(filter2,
            {
                target: 'http://127.0.0.1:8081',
                changeOrigin: true,
                pathRewrite: {
                }
            },)
    )
    app.use(
        createProxyMiddleware('/admin',
            {
                target: 'http://127.0.0.1:8081',
                changeOrigin: true,
                pathRewrite: {
                }
            },))
    app.use(
        createProxyMiddleware('/order',
            {
                target: 'http://127.0.0.1:8081',
                changeOrigin: true,
                pathRewrite: {
                }
            },)
    )
};