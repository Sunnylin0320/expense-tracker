if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Category = require('../category')
const categoryList = require('../../data/category.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  Category.create(categoryList)
    .then(() => {
      console.log('done!')
      process.exit()
    })
    .catch(error => console.error(error))
})
