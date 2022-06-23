const express = require("express");
const app = express();
const history = require("connect-history-api-fallback");

// 配置
app.use(require("./module/plugin/cors"));
app.use(require("./module/plugin/session"));
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(history());

// 配置子路由
app.use("/login", require("./router/login"));
app.use("/goods", require("./router/goods"));
app.use("/role", require("./router/roles"));

// 数据库
require("./mongodb/mongoose");

app.listen("8080", () => {
  console.log("8080端口启动");
});
