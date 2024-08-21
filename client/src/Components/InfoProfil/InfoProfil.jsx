import React from 'react'
import style from "./InfoProfil.module.css"
import Button from '../Button/Button'
import { useEffect, useState } from 'react'
import axios from 'axios'
const InfoProfil = ({profilInfo}) => {
   
      let showPatient = profilInfo &&  profilInfo.map((profil, indice)=>{
        return(
            <ul key={indice}>
                <li>
                    Non: {profil.nom_patient}
                </li>
                <li>
                    Prenom: {profil.prenom_patient}
                </li>
                <li>
                    Telephone: {profil.tel_patient}
                </li>
                <li>
                    Date de naissance: {profil.dateNaissance_patient.split("T")[0]} 
                </li>
                <li>
                    Addresse: {profil.adress_patient}
                </li>
                <li>
                    Ville de residence: {profil.ville_patient}
                </li>
        </ul>
        )
    })
  return (
    <div className={style.info}>
      
        <h1>Information Personelles</h1>
        {
           showPatient
        }
        <section>
        <Button>
            Modifier les informations
        </Button>
        </section>
    </div>
  )
}

export default InfoProfil