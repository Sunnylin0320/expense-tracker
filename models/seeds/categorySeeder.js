if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Category = require("../category");
const categoryList = require("../category.json");
const User = require("../user");
const db = require("../../config/mongoose");

db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
});