const express = require("express");
const router = express.Router();
const Record = require("../../models/record");

router.get("/", (req, res) => {
  Record.find()
    .lean()
    .sort({ date: "asc" })
    .then((records) => res.render("index", { records }))
    .catch((error) => console.error(error));
});

// 匯出路由模組
module.exports = router;
