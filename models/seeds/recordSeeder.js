const bcrypt = require("bcryptjs");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Record = require("../record");
const User = require("../user");
const Category = require("../category");
const recordList = require("../../data/record.json").results;
const db = require("../../config/mongoose");

const SEED_USER = {
  name: "root",
  email: "root@example.com",
  password: "12345678",
};

db.once("open", async () => {
  try {
    // 轉換 category 值為對應的 ObjectID
    for (const item of recordList) {
      const category = await Category.findOne({ name: item.category }).lean();
      if (category) {
        item.category = category._id;
      } else {
        // 如果找不到 category 記錄，則建立新的 category 記錄並返回對應的 ObjectID
        const newCategory = await Category.create({ name: item.category });
        item.category = newCategory._id;
      }
    }

    // 新增測試帳號到 User
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(SEED_USER.password, salt);

    const user = await User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash,
    });

    // 將搭配的 category 和 userId 的資料新增到 Record
    const recordPromises = recordList.map((record) => {
      return Record.create({
        name: record.name,
        date: record.date,
        amount: record.amount,
        userId: user._id,
        categoryId: record.category,
      });
    });

    await Promise.all(recordPromises);

    console.log("done.");
    process.exit();
  } catch (error) {
    console.error(`播種過程中發生錯誤：${error}`);
    process.exit(1); // 以非零狀態碼退出，表示發生錯誤
  }
});
