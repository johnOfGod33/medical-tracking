const hopitalCtrl = require("../../Controllers/adminContrllers/hopitalController")
const verifyJwt = require('../../middlewares/verifyJwt')
const verifyJwtPatient = require("../../middlewares/verifyJwtPatient")
const express = require("express")
const router = express.Router()

router.post("/login", hopitalCtrl.login)
router.get("/getAllHopital",verifyJwtPatient, hopitalCtrl.getALLHopital)
router.get("/getDemandeList", verifyJwt, hopitalCtrl.getDemandeList)
router.post("/getPatientInfo", hopitalCtrl.getPatientInfo)

module.exports = router