if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// 載入 express 並建構應用程式伺服器
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const Record = require("./models/record");
const bodyParser = require("body-parser");

require("./config/mongoose");

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));


// 設定首頁路由
app.get("/", (req, res) => {
  Record.find()
    .lean()
    .then((records) => res.render("index", { records }))
    .catch((error) => console.error(error));
});

app.get("/records/new", (req, res) => {
  return res.render("new");
});

// set create record route- post created data
app.post("/records", (req, res) => {
  return Record.create(req.body)
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

app.get("/records/:id/edit", (req, res) => {
  const id = req.params.id;
  return Record.findById(id)
    .lean()
    .then((record) => res.render("edit", { record }))
    .catch((error) => console.log(error));
});


app.post("/records/:id/edit", (req, res) => {
  const id = req.params.id;
  return Record.findById(id)
    .then((record) => {
      record.name = name;
      return record.save();
    })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});




app.post("/records/:id/delete", (req, res) => {
  const id = req.params.id;
  return Record.findById(id)
    .then((record) => record.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

// 設定 port 3000
app.listen(3000, () => {
  console.log("App is running on http://localhost:3000");
});
