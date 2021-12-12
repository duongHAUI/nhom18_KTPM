const express= require('express')
const router= express.Router();
const adminController= require('../controllers/admin.controller')


router.get("/",adminController.getAdmin)
router.post("/",adminController.createAdmin)
router.post("/login",adminController.login);
router.delete("/:id",adminController.deleteAdmin)
router.patch("/:id",adminController.updateAdmin)

module.exports= router;