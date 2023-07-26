const express = require("express");
const router = express.Router();
const Record = require("../../models/record");

//拿到所有的資料
router.get("/", (req, res) => {
  const userId = req.user._id;
  Record.find({ userId })
    .lean()
    .sort({ date: "asc" })
    .then((records) => res.render("index", { records }))
    .catch((error) => console.error(error));
});

// 匯出路由模組
module.exports = router;

