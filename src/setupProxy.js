const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/npmsAPI",
    createProxyMiddleware({
      target: "http://ncpms.rda.go.kr/npmsAPI",
      changeOrigin: true,
      pathRewrite: {
        "^/npmsAPI": "", // 요청에서 /npmsAPI를 제거하여 대상 주소에 전달합니다.
      },
    })
  );
};
