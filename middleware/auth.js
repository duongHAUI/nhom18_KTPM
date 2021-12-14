const jwt = require("jsonwebtoken");

const Admin = require("../models/admin.models");

module.exports = async (req, res, next) => {
  const authorization = req.cookies.token;
  console.log(authorization);
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.render('login')
  }

  const token = authorization.substring(7);

  const decode = jwt.verify(token, "123");

  const admin = await Admin.findOne({
    username: decode.username
  });

  if (!admin) {
    res.send("không tồn tại tài khoản với token này");
  }

  req.admin = admin;
  next();
};