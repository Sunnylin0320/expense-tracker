if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// 載入 express 並建構應用程式伺服器
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const session = require("express-session");
const routes = require("./routes");
const usePassport = require("./config/passport");
const bodyParser = require("body-parser");
const methodOverride = require("method-override"); 
const flash = require("connect-flash");
const port = process.env.PORT;


require("./config/mongoose");

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
usePassport(app);
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});


app.use(routes);


app.listen(port, () => {
  console.log(`The App is running on http://localhost:${port}`);
});