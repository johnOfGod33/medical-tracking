const docteurCtrl = require('../../Controllers/adminContrllers/docteurController')
const express = require("express")
const verifyJwt = require('../../middlewares/verifyJwt')
const router = express.Router()

router.get("/getAllDocteur",verifyJwt, docteurCtrl.getAllDocteur)
router.post("/addDocteur", verifyJwt, docteurCtrl.addDocteur)
router.post("/getDocteurName", docteurCtrl.getDocteurName)

module.exports = router