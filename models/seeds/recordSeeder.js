if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Record = require("../record");
const User = require("../user");
const db = require("../../config/mongoose");
const recordList = require("../../record.json");

db.once("open", () => {
  for (let i = 0; i < 10; i++) {
    Record.create({ name: "name-" + i });
  }
  console.log("done");
});