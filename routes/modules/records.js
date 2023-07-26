const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");

// 首頁篩選  
router.get("/filter", async (req, res) => {
  const categories = await Category.find().lean();
  // 當選擇 Category or date為空白時，{ $ne: '' } 使後面 $match 不出錯。因為{ $ne: '' } 表示找出不等於空值的所有資料
  const inputCategory = req.query.category ? req.query.category : { $ne: "" };
  const inputDate = req.query.month ? req.query.month : { $ne: "" };
  const categoryData = {};
  const userId = req.user._id;
  const filteredData = await Record.aggregate([
    {
      $project: {
        userId: 1,
        name: 1,
        amount: 1,
        category: 1,
        date: { $substr: ["$date", 0, 7] },
        day: { $substr: ["$date", 7, 9] },
      },
    },
    { $match: { category: inputCategory, date: inputDate, userId } },
  ]);
  // 產出 category icon 對應名字一物件，res.render中使用渲染出icon
  categories.forEach(
    (category) => (categoryData[category.name] = category.icon)
  );

  async function getFilterData() {
    try {
      if (!filteredData) return res.redirect("/");
      const records = filteredData; // home.js使用records
      const date = [];
      const rawRecords = await Record.find().lean();
      let totalAmount = 0;
      // 在篩選欄顯示 db 中有的月份
      for (let i = 0; i < rawRecords.length; i++) {
        if (!date.includes(rawRecords[i].date.slice(0, 7))) {
          date.push(rawRecords[i].date.slice(0, 7));
        }
      }
      // 顯示篩選資料 icon/totalAmount
      for (let i = 0; i < records.length; i++) {
        records[i].category = categoryData[records[i].category];
        totalAmount = totalAmount + records[i].amount;
      }

      res.render("index", {
        records,
        categories,
        inputCategory,
        totalAmount,
        date,
        inputDate,
      });
    } catch (error) {
      console.error(error);
    }
  }

  getFilterData();
});





//new樣板路由
router.get("/new", (req, res) => {
  return res.render("new");
});

router.post("/", async (req, res) => {
  const userId = req.user._id;
  const { name, date, category, amount } = req.body;
  const categoryData = await Category.findOne({ name: category })
    .lean()
    .catch((error) => console.log(error));
  return Record.create({
    name,
    date,
    category,
    amount,
    userId,
    categoryId: categoryData._id,
  })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});



router.get("/:id/edit", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  return Record.findById({ _id, userId })
    .lean()
    .then((record) => res.render("edit", { record }))
    .catch((error) => console.log(error));
});


router.put("/:id", async (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  const { name, date, category, amount } = req.body;
  const categoryData = await Category.findOne({ name: category })
    .lean()
    .catch((error) => console.log(error));
  return (
    Record.findOneAndUpdate(
      { _id, userId },
      { name, date, category, amount, userId, categoryId: categoryData._id },
      {
        new: true,
      }
    )
      .then(() => res.redirect("/"))
      .catch((error) => console.log(error))
  );
});



router.delete("/:id", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  return Record.findByIdAndDelete({ _id, userId })
    .then((record) => record.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;
