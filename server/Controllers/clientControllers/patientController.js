const database = require("../../Config/mysql")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
exports.signup = (req, res)=>{
    console.log(req.body);
    bcrypt.hash(req.body.mdp, 5)
    .then((hash)=>{
        let insertPatientQuery ="INSERT INTO patient (nom_patient, prenom_patient, email_patient, tel_patient, mdp_patient, dateNaissance_patient, sexe_patient, ville_patient, adress_patient) VALUES(?,?,?,?,?,?,?,?,?)"
        database.query(
            insertPatientQuery,
            [req.body.nom, req.body.prenom, req.body.email, req.body.tel, hash, req.body.dateNaissance, req.body.sexe, req.body.ville, req.body.addresse],
            (error, result)=>{
                if (error){
                    res.status(401).json(error)
                }
                database.query(
                    "INSERT INTO carnet (id_patient) VALUES (?)",
                    [result.insertId],
                    (error, result)=>{
                        if (error){
                            res.status(401).json(error)
                        }
                        res.status(201).json({message:"creation du carnet et du compte patient"})
                    }
                )
            }
        )
    })
    .catch((error)=>{
        throw error
    })
}

exports.login = (req, res)=>{
    console.log(req.body);
    let selectPatientQuery = "SELECT * FROM patient WHERE  `email_patient` = ?"
    database.query(
        selectPatientQuery,
        [req.body.email],
        (error, result)=>{
            if(error){
                res.status(503).json(error)
            }

            if(result.length){
                bcrypt.compare(req.body.mdp, result[0].mdp_patient)
                .then((valid)=>{
                    if(valid){
                        let accessToken = jwt.sign(
                            {id_patient:result[0].id_patient},
                            "carnetMedical",
                            {expiresIn:"24h"}
                        )

                        res.status(200).json({accessToken, userName:`${result[0].prenom_patient} ${result[0].nom_patient}`})
                    }else{
                        res.status(401).json("password or email incorrect")
                    }
                })
                .catch((error)=>{
                    res.status(503).json(error)
                })
            }else{
                res.status(401).json("password or email incorrect")
            }
        })
}

exports.demande = (req, res)=>{
    let insertDemandeQuery = "INSERT INTO demande (id_patient, id_hopital) VALUES(?,?)"
    console.log(req.body);
    database.query(
        insertDemandeQuery,
        [req.id_patient, req.body.id_hopital],
        (error, result)=>{
            if(error){
                res.status(503).json(error)
            }
            res.status(201).json("demande enregistrer")
        }
    )
}

exports.getProfil = (req, res)=>{
    let selectProfilInfoQuery = "SELECT patient.id_patient, patient.nom_patient, patient.prenom_patient, patient.tel_patient, patient.sexe_patient, patient.adress_patient, patient.ville_patient, patient.dateNaissance_patient, carnet.* FROM patient JOIN carnet ON patient.id_patient = carnet.id_patient WHERE patient.id_patient = ?"
    database.query(
        selectProfilInfoQuery,
        [req.id_patient],
        (error, result)=>{
            if(error){
                res.status(503).json(error)
            }
            res.status(201).json(result)
        }
    )
}