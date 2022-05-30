const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/login", {
      target: "https://exercise.smtapps.net/api",
      changeOrigin: true,
    })
  );
};
