const express= require('express')
const router= express.Router();

const accountController = require('../controllers/account.controller')

router.get("/",accountController.getAccount)
router.post("/",accountController.createAccount)

router.delete("/:id",accountController.deleteAccount)
router.delete("/:id",accountController.updateAccount)

router.post("/login",accountController.login);  
router.get("/lop/:id",accountController.getAllAccountOfClass)

module.exports= router;  