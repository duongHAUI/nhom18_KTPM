const mongoose= require('mongoose');

const accountSchema = mongoose.Schema({
  maSV: String,
  password: String,
  hoTen: String,
  diemTL: String,
  namSinh: String,
  gioiTinh: String,
  lop: {
    type: mongoose.Types.ObjectId,
    ref: "lop"
  },
  xepHang: String, 
  queQuan: String,
  sdt: String
}, {
  versionKey: false
})
module.exports= mongoose.model('student', accountSchema);