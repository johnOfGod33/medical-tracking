const database = require("../../Config/mysql")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
exports.login = (req, res)=>{
    let selectHopitalQuery = "SELECT * FROM hopital WHERE  `email_hopital` = ?"
    database.query(
        selectHopitalQuery,
        [req.body.email],
        (error, result)=>{
            if(error){
                res.status(503).json(error)
            }
            /* if(result.length){
                bcrypt.compare(req.body.mdp, result[0].mdp_hopital)
                .then((valid)=>{
                    if(valid){
                        let accessToken = jwt.sign(
                            {id_hopital:result[0].id_hopital},
                            "hopitalSystem",
                            {expiresIn:"24h"}
                        )
                        res.status(200).json({accessToken})
                    }else{
                        res.status(401).json("password or email incorrect")
                    }
                })
                .catch((error)=>{
                    res.status(503).json(error)
                })
            }else{
                res.status(401).json("error")
            } */
            if(result.length){
                if(req.body.mdp===result[0].mdp_hopital){
                    let accessToken = jwt.sign(
                        {id_hopital:result[0].id_hopital},
                        "hopitalSystem",
                        {expiresIn:"24h"}
                    )
                    res.status(200).json({accessToken, nom_hopital:result[0].nom_hopital})
                }else{
                    res.status(503).json(error)
                }
            }else{
                res.status(401).json("error")
            }
        })
}

exports.getALLHopital = (req, res)=>{
    let getAllHopitalQuery = "SELECT * FROM hopital WHERE id_hopital NOT IN (SELECT hopital.id_hopital FROM hopital JOIN demande ON hopital.id_hopital = demande.id_hopital WHERE demande.etat_demande = 0 AND demande.id_patient = ?)"
    database.query(
        getAllHopitalQuery,
        [req.id_patient],
        (error, result)=>{
            if(error){
                res.status(503).json(error)
            }
            res.status(201).json(result)
        }
    )
}

exports.getDemandeList = (req, res)=>{
    let selectDemandeListQuery = "SELECT patient.* FROM demande JOIN hopital ON demande.id_hopital = hopital.id_hopital JOIN patient ON demande.id_patient = patient.id_patient WHERE hopital.id_hopital = ? AND demande.etat_demande = 0"
    database.query(
        selectDemandeListQuery,
        [req.id_hopital],
        (error, result)=>{
            if(error){
                res.status(503).json(error)
            }
            res.status(201).json(result)
        }
    )
}

exports.getPatientInfo = (req, res)=>{
    console.log(req.body);
    let selectGetPatientInfoQuery = "SELECT patient.id_patient, patient.nom_patient, patient.prenom_patient, patient.tel_patient, patient.sexe_patient, patient.adress_patient, patient.ville_patient, patient.dateNaissance_patient, carnet.* FROM patient JOIN carnet ON patient.id_patient = carnet.id_patient WHERE patient.id_patient = ?"
    database.query(
        selectGetPatientInfoQuery,
        [req.body.idPatient],
        (error, result)=>{
            if(error){
                res.status(503).json(error)
            }
            res.status(201).json(result)
        }
    )
}