const Lop = require("../models/lop.model")
const errorResponse = require('../response/errorResponse')
const successResponse = require('../response/successResponse')

class LopController{
  async getLop(req, res){
    const Lops= await Lop.find().populate("tkb");
    if (Lops.length==0){
      return res.status(404).json(new errorResponse(404, "Lops trống"));
    }
    return res.status(200).json(new successResponse(200, "Lấy Lop thành công", Lops));
  }
  
  async getLopByID (req, res){
    const lop= await Lop.findById(req.params.id).populate("tkb");
    if (!!lop){
      return res.status(200).json(new successResponse(200, `Lấy lớp _id: ${req.params.id} thành công`, lop));
    }
  
    return res.status(404).json(new errorResponse(404, `Không tìm thấy lớp có _id: ${req.params.id}`))
  }
  
  async createLop(req, res){
    let body = req.body;
    let a= await Lop.findOne({
      maLop: body.maLop
    })
    if (!!a){
      return res.status(400).json(new errorResponse(400, "Lớp đã tồn tại"));
    }
    
    a= await Lop.create(body);
    return res.status(201).json(new successResponse(201, "Tạo lớp thành công", a));
  }
  
  async deleteLop(req, res){
    let a= await Lop.findById(req.params.id);
    if (!!a){
      let r= await Lop.deleteOne({
        _id: req.params.id
      })
      return res.status(200).json(new successResponse(200, "Xóa thành công", r));
    }
    return res.status(404).json(new errorResponse(404, "Không tìm thấy Lop: "+ req.params.id))
  }
  
  
  async updateLop(req, res){
    let a= await Lop.findOneAndUpdate({_id: req.params.id}, req.body, {
      new: true
    });
    if (!!a){
      return res.status(200).json(new successResponse(200, "Sửa thành công", a));
    }
    return res.status(404).json(new errorResponse(404, "Không tìm thấy Lop: "+ req.params.id))
  }
}

module.exports = new LopController