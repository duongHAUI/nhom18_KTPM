const express = require('express')

const router= express.Router();

const TKBController = require('../controllers/tkb.controller')

router.get("/",TKBController.getTkb)
router.post("/",TKBController.createTkb)


router.delete("/:id",TKBController.deleteTkb)
router.patch("/:id",TKBController.updateTkb)


module.exports= router;