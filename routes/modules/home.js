const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// 設定首頁路由

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().lean()
    const categoryData = {}
    categories.forEach(
      category => (categoryData[category.name] = category.icon)
    )

    const selectedCategory = req.query.category
    const userId = req.user._id
    const filter = { userId }
    // 如果篩選類別不是 "all"，則設定 filter 物件以便在資料庫中進行篩選。
    if (selectedCategory && selectedCategory !== 'all') {
      filter.category = selectedCategory
    }

    const records = await Record.find(filter).lean().sort({ date: 'asc' })
    let totalAmount = 0
    records.forEach(record => {
      record.category = categoryData[record.category]
      totalAmount += record.amount
    })

    return res.render('index', {
      records,
      totalAmount,
      categories,
      selectedCategory
    })
  } catch (err) {
    console.log('err')
  }
})

// 匯出路由模組
module.exports = router
