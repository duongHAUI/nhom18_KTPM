const accountRouter= require('./account.router')
const tkbRouter= require('./tkb.router')
const lopRouter= require('./lop.router')
const adminRouter= require('./admin.router')
const Admin = require('../models/admin.models')
const { response } = require('express')
module.exports=(app)=>{
  app.use("/api/accounts", accountRouter);
  app.use("/api/tkbs", tkbRouter);
  app.use("/api/lops", lopRouter);
  app.use("/api/admins", adminRouter)

  app.get("/",(req,res)=>{
    res.render('home')
  })

  app.get("/login", (req, res)=>{
    res.render('login');
  });
  app.post("/login", async (req, res)=>{
    let {username, password} = req.body;
    let ad=await Admin.findOne({
      username, password
    })

    if(ad){
      res.send(ad);
    }else {
      res.send("SAI TÀI KHOẢN HOẶC MẬT KHẨU")
    }
  });
  
  app.post("/register", async (req, res)=>{
    let {username, password} = req.body;
    let newAdmin={
      username,
      password
    }
    let ad= await Admin.create(newAdmin);
    res.send(ad);
  })

  app.get("/admins", async (req, res)=>{
    let a=await Admin.find();
    res.send(a);
  })


}

