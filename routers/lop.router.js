const express = require('express')

const router= express.Router();

const lopController = require('../controllers/lop.controller')

router.get("/",lopController.getLop)
router.post("/",lopController.createLop)

router.get("/:id",lopController.getLopByID)
router.delete("/:id",lopController.deleteLop)
router.patch("/:id",lopController.updateLop)

module.exports= router;