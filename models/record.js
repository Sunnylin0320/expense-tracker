const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const recordSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true, // 這是個必填欄位
  },
  category: {
    type: String,
    enum: ["家居物業", "交通出行", "休閒娛樂", "餐飲食品", "其他"],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    min: 0,
    required: true,
  },
});
module.exports = mongoose.model("Record", recordSchema);
