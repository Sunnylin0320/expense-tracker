const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const User = require('../user')
const Category = require('../category') // 引入類別模型
const recordList = require('../../data/record.json')
const db = require('../../config/mongoose')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash =>
      User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash
      })
    )
    .then(user => {
      const userId = user._id
      return Promise.all(
        recordList.map(recordItem => {
          // 先查找對應的類別
          return Category.findOne({ name: recordItem.category }).then(
            category => {
              if (!category) {
                throw new Error(`找不到類別: ${recordItem.category}`)
              }
              return Record.create({
                name: recordItem.name,
                category: category.name,
                categoryId: category._id, // 使用 categoryId 來建立關聯
                date: recordItem.date,
                amount: recordItem.amount,
                userId
              })
            }
          )
        })
      )
    })
    .then(() => {
      console.log('done!')
      process.exit()
    })
    .catch(err => console.error(err))
})
