const express = require("express");
const router = express.Router();
const home = require("./modules/home");
const records = require("./modules/records");
const users = require("./modules/users");
const { authenticator } = require("../middleware/auth");

router.use("/records", authenticator, records);

router.use("/", authenticator, home);
router.use("/users", users);

// 匯出路由器
module.exports = router;
