const jwt = require("jsonwebtoken")

module.exports = (req, res, next)=>{
    try{
        let token = req.headers["authorization"].split(" ")[1]
        let verifyToken = jwt.verify(token, "carnetMedical")
        req.id_patient = verifyToken.id_patient
        next()
    }
    catch(error){
        res.status(403).json(error)
    }
}