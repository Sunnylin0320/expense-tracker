const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");

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
