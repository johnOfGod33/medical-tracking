const database = require("../../Config/mysql")
exports.getAllDocteur = (req, res) =>{
    console.log(req.id_hopital);
    let getALlDocteurQuery = "SELECT docteur.* FROM intervenants JOIN hopital ON intervenants.id_hopital = hopital.id_hopital JOIN docteur ON intervenants.id_docteur = docteur.id_docteur WHERE hopital.id_hopital = ?"
    database.query(
        getALlDocteurQuery,
        [req.id_hopital],
        (error, result)=>{
            if(error){
                res.status(503).json(error)
            }
            res.status(201).json(result)
        }
    )
}
exports.addDocteur = (req, res) =>{
    console.log(req.body);
    let insertDocteurQuery = "INSERT INTO docteur (nom_docteur, prenom_docteur, email_docteur, mdp_docteur, tel_docteur, ville_docteur) VALUES(?,?,?,?,?,?)"
    database.query(
        insertDocteurQuery,
        [req.body.nom, req.body.prenom, req.body.email, req.body.mdp, req.body.tel, req.body.ville],
        (error, result)=>{
            if(error){
                res.status(503).json(error)
            }
            let insertIntervenantsQuery = "INSERT INTO intervenants (id_hopital, id_docteur) VALUES(?,?)"
            database.query(  //insertion dans table association intervenants
                insertIntervenantsQuery,
                [req.id_hopital, result.insertId],
                (error, result)=>{
                    if(error){
                        res.status(401).json(error)
                    }
                    res.status(201).json(result)
                }
            )
        }
    )

}

exports.getDocteurName = (req, res)=>{
    let selectDocteurName = "SELECT nom_docteur, prenom_docteur FROM docteur WHERE id_docteur = ?"
    database.query(
        selectDocteurName,
        [req.body.idDocteur],
        (error, result)=>{
            if(error){
                res.status(503).json(error)
            }

            res.status(201).json(result)
        }
    )
}