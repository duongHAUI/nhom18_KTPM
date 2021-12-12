const Admin= require('../models/admin.models')
const errorResponse = require('../response/errorResponse')
const successResponse = require('../response/successResponse')

class adminController{
  async login(req, res){
    const {username, password}= req.body;
    let admin= await Admin.findOne({
      username: username,
      password: password
    })
    if (!!admin){
      return res.status(200).json(new successResponse(200, "ADMIN đăng nhập thành công", admin));
    }
    return res.status(404).json(new errorResponse(404, "Sai TK hoặc MK ADMIN"));
  }
  
  async getAdmin(req, res){
    let admins= await Admin.find();
    if (admins.length==0){
      return res.status(404).json(new errorResponse(404, "Admin trống"));
    }
    return res.status(200).json(new successResponse(200, "Lấy Admins thành công", admins));
  }
  
  
  async createAdmin (req, res){
    let body = req.body;  
    let ac= await Admin.findOne({
      username: body.username
    })
  
    if(!ac){
      let a= await Admin.create(body);
      return res.status(201).json(new successResponse(201, "Tạo admin thành công", a));
    }
    return res.status(404).json(new errorResponse(404, "Tài khoản đã tồn tại"));
  }
  
  async deleteAdmin(req, res){
    let a= await Admin.findById(req.params.id);
    if (!!a){
      let r= await Admin.deleteOne({
        _id: req.params.id
      })
      return res.status(200).json(new successResponse(200, "Xóa thành công", r));
    }
    return res.status(404).json(new errorResponse(404, "Không tìm thấy Admin: "+ req.params.id))
  }
  
  
  async updateAdmin(req, res){
    let a= await Admin.findOneAndUpdate({_id: req.params.id}, req.body, {
      new: true
    });
    if (!!a){
      return res.status(200).json(new successResponse(200, "Sửa thành công", a));
    }
    return res.status(404).json(new errorResponse(404, "Không tìm thấy Admin: "+ req.params.id))
  }
}

module.exports = new adminController;