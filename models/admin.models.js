const mongoose = require('mongoose')
const adminSchema= mongoose.Schema({
  username: String,
  password: String
}, {
  versionKey: false
});
module.exports= mongoose.model("admin", adminSchema);
