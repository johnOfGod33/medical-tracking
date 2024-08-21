const carnetCtrl = require("../../Controllers/clientControllers/carnetControllers")
const express = require("express")
const verifyJwtPatient = require("../../middlewares/verifyJwtPatient")
const verifyJwt = require("../../middlewares/verifyJwt")
const router = express.Router()

router.post("/updateCarnet", verifyJwt, carnetCtrl.updateCarnet)
router.post("/consultations", carnetCtrl.getAllConsultation)
router.get("/permissionAccorde", verifyJwtPatient, carnetCtrl.accordePermission)
router.get("/permissionRefuse", verifyJwtPatient, carnetCtrl.refusePermission)
router.get('/analyses', carnetCtrl.getAnalyse)
router.get('/prescriptions', carnetCtrl.getPrescription)
module.exports = router