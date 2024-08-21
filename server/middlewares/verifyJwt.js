const jwt = require("jsonwebtoken")

module.exports = (req, res, next)=>{
    try{
        let token = req.headers["authorization"].split(" ")[1]
        let verifyToken = jwt.verify(token, "hopitalSystem")
        req.id_hopital = verifyToken.id_hopital
        next()
    }
    catch(error){
        res.status(403).json(error)
    }
}