const database = require("../../Config/mysql");

exports.updateCarnet = (req, res)=>{
    console.log(req.body, req.id_hopital);
    //selectioner le bon carnet
    let selectSpecificCarnetQuery = "SELECT id_carnet FROM carnet WHERE id_patient = ?"
    database.query(
        selectSpecificCarnetQuery,
        [req.body.idPatient],
        (error, result)=>{
            if(error){
                res.status(503).json(error)
            }
            console.log(result);
            //etape 1 : update le carnet et la demande
            let updateDemandQuery = "UPDATE demande set etat_demande = 1 WHERE id_hopital = ? AND id_patient = ?"
            database.query(
                updateDemandQuery,
                [req.id_hopital, req.body.idPatient], 
                (error, result)=>{
                    if(error){
                        res.status(400).json(error)
                    }
                }
            )
            let updateCarnetQuery = "UPDATE carnet SET poids_carnet=?, taille_carnet =?, intolerence_carnet = ?, maladies_carnet = ?, etatsante_carnet= ?, groupesanguin_carnet= ? WHERE id_carnet = ?"
            database.query(
                updateCarnetQuery,
                [req.body.poids,req.body.taille, req.body.intolerence, req.body.maladies, req.body.etatSante, req.body.groupeSanguin, result[0].id_carnet],
                (error, result)=>{
                    if(error){
                        res.status(400).json(error)
                    }
                }
            )

            //etape 2 inserer les info de consultation avec id_carnet
            let insertConsultationQuery = "INSERT INTO consultation (id_carnet, id_docteur, id_hopital, temperature_consultation, tension_consultation, symptome_consultation) VALUES(?,?,?,?,?,?)"
            database.query(
                insertConsultationQuery,
                [result[0].id_carnet, req.body.idDocteur, req.id_hopital, req.body.temperature, req.body.tension, req.body.symptome],
                (error, result)=>{
                    if(error){
                        res.status(400).json(error)
                    }
                    //analyse
                    for(let i=0; i<req.body.nomAnalyse.length; i++){
                        let insertAnlayseQuery = "INSERT INTO analyse (id_consultation, nom_analyse, resultat_analyse) VALUES(?,?,?)"
                        database.query(
                            insertAnlayseQuery,
                            [result.insertId, req.body.nomAnalyse[i],req.body.resultatAnalyse[i]],
                            (error, result)=>{
                                if(error){
                                    res.status(401).json(error)
                                }
                            }
                        )
                    }

                    //prescription

                    for(let i=0; i<req.body.nomProduit.length; i++){
                        let insertPrescriptionQuery = "INSERT INTO prescription (id_consultation, nomproduit_prescription, dosage_prescription) VALUES(?,?,?)"
                        database.query(
                            insertPrescriptionQuery,
                            [result.insertId, req.body.nomProduit[i], req.body.dosage[i]],
                            (error, result)=>{
                                if(error){
                                    res.status(401).json(error)
                                }
                            }
                            )
                        }
                    }
            )
            res.status(201).json("tout esr reussi")
        }
    )
}

exports.getAllConsultation = (req, res)=>{
    let selectConsultationsQuery = "SELECT consultation.*, hopital.nom_hopital, docteur.nom_docteur, docteur.prenom_docteur FROM consultation JOIN hopital ON consultation.id_hopital = hopital.id_hopital JOIN docteur ON consultation.id_docteur = docteur.id_docteur WHERE id_carnet = ?"
    database.query(
        selectConsultationsQuery,
        [req.body.id_carnet],
        (error, result)=>{
            if(error){
                res.status(503).json(error)
            }
              const consultations = result
            for(let i=0;i<consultations.length; i++){
                //analyse
                consultations[i]["analyses"] = []
                consultations[i]["prescriptions"] = []
                database.query(
                    "SELECT nom_analyse, resultat_analyse FROM analyse WHERE id_consultation = ?",
                    [consultations[i].id_consultation],
                    (error, result1)=>{
                        if(error){
                            res.status(400).json(error)
                        }
                        consultations[i].analyses = [...consultations[i].analyses, result1]
                         //prescription
                        database.query(
                            "SELECT nomproduit_prescription, dosage_prescription FROM prescription WHERE id_consultation = ?",
                            [consultations[i].id_consultation],
                            (error, result2)=>{
                                if(error){
                                    res.status(400).json(error)
                                }
                                consultations[i].prescriptions = [...consultations[i].prescriptions, result2]
                                
                            }
                        )
                    }
                )
               
            }
            res.status(201).json(consultations)
        }
    )
}

exports.accordePermission = (req, res)=>{
    let updatePermissionQuery = "UPDATE carnet set permission_carnet = 1 WHERE id_patient = ?"
    database.query(
        updatePermissionQuery,
        [req.id_patient],
        (error, result)=>{
            if(error){
                res.status(503).json(error)
            }
            res.status(201).json("permission accorde")
        }
    )
}

exports.refusePermission = (req, res)=>{
    let updatePermissionQuery = "UPDATE carnet set permission_carnet = 0 WHERE id_patient = ?"
    database.query(
        updatePermissionQuery,
        [req.id_patient],
        (error, result)=>{
            if(error){
                res.status(503).json(error)
            }
            res.status(201).json("permission refuse")
        }
    )
}


exports.getAnalyse = (req, res)=>{
    let selectAnalyseQuery = "SELECT * FROM analyse "
    database.query(
        selectAnalyseQuery,
        (error, result)=>{
            if(error){
                res.status(503).json(error)
            }
            res.status(201).json(result)
        }
    )
}

exports.getPrescription = (req, res)=>{
    let selectPrescriptionQuery = "SELECT * FROM prescription "
    database.query(
        selectPrescriptionQuery,
        (error, result)=>{
            if(error){
                res.status(503).json(error)
            }
            res.status(201).json(result)
        }
    )
}