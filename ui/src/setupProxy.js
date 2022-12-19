const { createProxyMiddleware } = require('http-proxy-middleware')

const backendProxy = createProxyMiddleware({
    target: 'http://127.0.0.1:8000',
    changeOrigin: true
})

module.exports = (app) => {
    app.use(
        '/api', backendProxy
    )
    app.use(
        '/backend/static', backendProxy
    )
    app.use(
        '/backend/media', backendProxy
    )
}