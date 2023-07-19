if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// 載入 express 並建構應用程式伺服器
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

require("./config/mongoose");

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

// 設定首頁路由
app.get("/", (req, res) => {
  res.render("index");
});

// 設定 port 3000
app.listen(3000, () => {
  console.log("App is running on http://localhost:3000");
});
