const { response } = require("express")
const Account = require("../models/account.model")
const Lop = require("../models/lop.model")
const errorResponse = require('../response/errorResponse')
const successResponse = require('../response/successResponse')

class AccountController{
  async login (req, res){
    let {maSV, password}= req.body;
    let acc= await Account.findOne({
      maSV: maSV,
      password: password
    });
    if (!!acc){
      return res.status(200).json(new successResponse(200, "Đăng nhập thành công", acc));
    }
    return res.status(404).json(new errorResponse(404, "Sai TK hoặc MK"));
  }
  
  async getAllAccountOfClass(req, res){
    const accounts= await Account.find({
      "lop": req.params.id
    })
    if (accounts.length==0){
      return res.status(404).json(new errorResponse(404, "Danh sách lớp trống"));
    }
    return res.status(200).json(new successResponse(200, `Lấy danh sách lớp ${req.params.id} thành công`, accounts));
  }
  
  async getAccount(req, res){
    const accounts= await Account.find().populate({
      path: "lop",
      populate: {
        path: "tkb"
      }
    });
    if (accounts.length==0){
      return res.status(404).json(new errorResponse(404, "Accounts trống"));
    }
    return res.status(200).json(new successResponse(200, "Lấy account thành công", accounts));
  }
  
  async createAccount (req, res){
    let body = req.body;
    let a= await Account.findOne({
      maSV: body.maSV
    })
    if (!!a){
      return res.status(400).json(new errorResponse(400, "Tài khoản đã tồn tại"));
    }
    
    let lop= await Lop.findOne({
      _id: body.lop
    })
    await Lop.findOneAndUpdate({
      _id: lop._id
    },
    {
      soSV: +lop.soSV+1
    })
  
    let acc= await Account.create(body);
    return res.status(201).json(new successResponse(201, "Tạo tk thành công", acc));
  }
  
  async deleteAccount(req, res){
    let a= await Account.findById(req.params.id);
    if (!!a){
      let lop= await Lop.findOne({
        _id: a.lop
      })
      await Lop.findOneAndUpdate({
        _id: lop._id
      },
      {
        soSV: +lop.soSV-1
      })
      let r= await Account.deleteOne({
        _id: req.params.id
      })
      return res.status(200).json(new successResponse(200, "Xóa thành công", r));
    }
    return res.status(404).json(new errorResponse(404, "Không tìm thấy account: "+ req.params.id))
  }
  
  
  async updateAccount(req, res){
    if (!!req.body.tenLop){
      let lop= await Lop.findOne({
        tenLop: req.body.tenLop
      })
      if (!!lop){
        let b= req.body;
        b.lop= lop._id;
        let a= await Account.findOneAndUpdate({_id: req.params.id}, b).populate('lop');
        if(!!a){
          let lop1= await Lop.findOne({
            tenLop: a?.lop?.tenLop
          })
          if(!!lop1 && req.body.tenLop!==a?.lop?.tenLop){
            await Lop.findOneAndUpdate({
              _id: lop._id
            },
            {
              soSV: +lop.soSV+1
            })
    
            await Lop.findOneAndUpdate({
              _id: lop1._id
            },    
            {
              soSV: +lop1.soSV-1
            })
          } 
          return res.status(200).json(new successResponse(200, "Sửa thành công", a));
        }else {
          return res.status(200).json(new errorResponse(404, "Không tìm thây account: "+ req.params.id))
        }
      }else {
        return res.status(404).json(new errorResponse(404, "Tên lớp không tồn tại"));
      }
    }else {
      let a= await Account.findOneAndUpdate({_id: req.params.id}, req.body).populate('lop');
      if(!!a){
        return res.status(200).json(new successResponse(200, "Sửa thành công", a));
      }else {
        return res.status(200).json(new errorResponse(404, `Không tìm thấy Account: ${req.params.id}`));
      }
    }
  }
  
}

module.exports = new AccountController;

// thêm acc thì số lượng của lớp tăng lên