const accountRouter= require('./account.router')
const tkbRouter= require('./tkb.router')
const lopRouter= require('./lop.router')
const adminRouter= require('./admin.router')
module.exports=(app)=>{
  app.use("/api/accounts", accountRouter);
  app.use("/api/tkbs", tkbRouter);
  app.use("/api/lops", lopRouter);
  app.use("/api/admins", adminRouter)
}
