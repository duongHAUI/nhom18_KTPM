const mongoose = require('mongoose');

const tkbSchema= mongoose.Schema({
  thu2: String,
  thu3: String,
  thu4: String,
  thu5: String,
  thu6: String,
  thu7: String,
  chuNhat: String
}, {
  versionKey: false
})

module.exports= mongoose.model('tkb', tkbSchema);