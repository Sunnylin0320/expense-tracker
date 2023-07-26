if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Category = require("../category");
const categoryList = require("../../data/category.json").results;
const db = require("../../config/mongoose");




db.once("open", () => {
  Promise.all(
    categoryList.map((categoryList) => {
      return Category.create({
        name: categoryList.name,
        icon: categoryList.icon,
      });
    })
  ).then(() => {
    console.log("categoryList done");
    process.exit();
  });
});