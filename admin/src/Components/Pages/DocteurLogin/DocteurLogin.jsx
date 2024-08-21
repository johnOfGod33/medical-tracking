import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import style from "./DocteurList.module.css"
import axios from "axios"
import UseHopitalContextProvider from "../../Context/UseHopitalContextProvider"
const DocteurLogin = () => {
    let {setIdDocteur} = UseHopitalContextProvider()
    let [docteurList, setList] = useState(null)
    useEffect(()=>{
      axios.get(" http://192.168.137.112:5000/docteur/getAllDocteur", { headers : {authorization : `BEARER ${localStorage.getItem("token")}`}})
      .then((res)=>{
        console.log(res.data);
        setList(res.data)
      })
      .catch((error)=> console.log(error))
    }, [])
    console.log(docteurList);
    let showdocteur = docteurList && docteurList.map((docteur, indice)=>{
      return(
        <option key={indice} value={docteur.id_docteur} > {`${docteur.nom_docteur} ${docteur.prenom_docteur}`} </option>
      )
    })
    let navigate = useNavigate()
    let {infoPatient} = UseHopitalContextProvider()
  return (
    <div className={style.docteurList}>
        <h1>Bienvenu Docteur, Veuillez choisir votre compte et vous connecter pour traite le partient {infoPatient.idPatient}</h1>
        <select onChange={(e)=>{
          setIdDocteur(e.target.value)
          localStorage.setItem("idDocteur",e.target.value)
          navigate(`/demandeList/consultation`)
          }}>
            <option value=""></option>
            {
              showdocteur
            }
        </select>
    </div>
  )
}

export default DocteurLogin