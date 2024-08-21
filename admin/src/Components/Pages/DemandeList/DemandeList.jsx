import {useNavigate, Navigate} from "react-router-dom"
import { useEffect } from 'react'
import { useState } from 'react'
import React from 'react'
import style from "./DemandeList.module.css"
import IconProfil from '../../IconProfil/IconProfil'
import Button from '../../Button/Button'
import axios from 'axios'
import UseHopitalContextProvider from "../../Context/UseHopitalContextProvider"

const DemandeList = () => {
    let {setInfoPatient} = UseHopitalContextProvider()
    let navigate = useNavigate()
    let [patientList, setPatientList] = useState(null)
    useEffect(()=>{
        axios.get(" http://192.168.137.112:5000/hopital/getDemandeList", { headers : {authorization : `BEARER ${localStorage.getItem("token")}`}})
        .then((res)=>{
            setPatientList(res.data)
        })
        .catch((error)=>console.log(error))
    },[])
    
    console.log(patientList);

    let showPatientList = patientList && (patientList.map((patient, indice)=>{
        return(
            <section key={indice}>
                <IconProfil />
                <h2> {patient.nom_patient} {patient.prenom_patient} </h2>
                <aside>
                    <ul>
                        <li> {/* <img src={tel} alt='telephone'/> */} Telephone: {patient.tel_patient} </li>
                        <li> {/* <img src={mail} alt="email" /> */}Email: {patient.email_patient} </li>
                        <li> {/* <img src={ville} alt="localisation" /> */} Ville: {patient.ville_patient} </li>
                    </ul>
                </aside>
                <aside>
                    <h3>Etat : En attente</h3>
                    <Button handleClick={()=>{
                        navigate(`/demandeList/docteurLogin`)
                        setInfoPatient((prevState)=>{
                            return {...prevState, idPatient: patient.id_patient}
                        })
                        localStorage.setItem("idPatient", patient.id_patient)
                        }}>
                        Accepte
                    </Button>
                </aside>
            </section>
        )
    }))

  return localStorage.getItem("token") ? (
    <div className={style.demandeList}>
        <div className={style.titre}>
            <h1>Liste des demandes</h1>
        </div>
        {
            showPatientList
        }
    </div>
  ):
  <Navigate to={"/login"}/>
}

export default DemandeList