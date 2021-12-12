const mongoose = require('mongoose')

const lopSchema= mongoose.Schema({
  maLop: String,
  tenLop: String,
  gvcn: String,
  soSV: String,
  tkb: {
    type: mongoose.Types.ObjectId,
    ref: "tkb"
  }
}, {
  versionKey: false
})

module.exports= mongoose.model('lop', lopSchema);