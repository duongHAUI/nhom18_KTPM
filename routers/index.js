const accountRouter= require('./account.router')
const tkbRouter= require('./tkb.router')
const lopRouter= require('./lop.router')
const adminRouter= require('./admin.router')
const Admin = require('../models/admin.models')
const { response } = require('express')

const auth= require('../middleware/auth')
const asyncMiddelware= require('../middleware/async.middelware')
const jwt= require('jsonwebtoken');
module.exports=(app)=>{
  app.use("/api/accounts", accountRouter);
  app.use("/api/tkbs", tkbRouter);
  app.use("/api/lops", lopRouter);
  app.use("/api/admins", adminRouter)


  app.get("/", asyncMiddelware(auth), (req,res)=>{
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
      let payload = {username: ad.username}
      const accessToken = jwt.sign(payload, "123", {
        expiresIn: "1m",
      });
      res.cookie('token', "Bearer "+ accessToken, {expiresIn: new Date(Date.now()+ 60000)})
      res.render("home");
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

