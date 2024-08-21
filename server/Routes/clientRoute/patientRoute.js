const patientCtrl = require("../../Controllers/clientControllers/patientController")
const express = require("express")
const verifyJwtPatient = require("../../middlewares/verifyJwtPatient")
const router = express.Router()

router.post("/signup", patientCtrl.signup)
router.post("/login", patientCtrl.login)
router.post("/demande", verifyJwtPatient, patientCtrl.demande)
router.get("/profil", verifyJwtPatient, patientCtrl.getProfil)

module.exports = router