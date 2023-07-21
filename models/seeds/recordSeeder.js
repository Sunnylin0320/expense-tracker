if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Record = require("../record");
const User = require("../user");
const Category = require("../category");
const db = require("../../config/mongoose");
const recordList = require("../../data/record.json");
const bcrypt = require("bcryptjs");

db.once("open", () => {
  recordList.records.forEach(record => {
    Record.create(record)
  })
  console.log("done");
});