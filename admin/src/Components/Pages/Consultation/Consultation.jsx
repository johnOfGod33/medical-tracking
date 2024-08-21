import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FicheConsultation from '../FicheConsultation/FicheConsultation'
import React from 'react'
import style from "./Consultation.module.css"
import InfoProfil from "../../InfoProfil/InfoProfil"
import Carnet from "../../Carnet/Carnet"
import Button from '../../Button/Button'
import axios from 'axios'
import UseHopitalContextProvider from '../../Context/UseHopitalContextProvider'
const Consultation = () => {
  let {idPatient} = UseHopitalContextProvider()
  let navigate = useNavigate()
  let [patientInfo, setInfo] = useState(null)
  useEffect(()=>{
    axios.post("http://localhost:5000/hopital/getPatientInfo", {idPatient: localStorage.getItem("idPatient")})
    .then((res)=>{
      setInfo(res.data)
    })
    .catch((error)=> console.log(error))
  }, [])

  console.log(patientInfo);
  console.log(idPatient);
  patientInfo &&  axios.post(" http://192.168.137.112:5000/carnet/consultations", {id_carnet: patientInfo[0].id_carnet})
    .then((res)=>{
      console.log(res.data);
    })
    .catch((error)=>console.log(error))
  return (
    <div className={style.consultation}>
        <section className={style.infoPatient}>
        <div className={style.titre}>
          <h1>Consultation</h1>
        </div>
          <InfoProfil profilInfo={patientInfo}/>
          <Carnet profilInfo={patientInfo}/>
          <Button handleClick={()=>{navigate("/demandeList/ficheConsultation")}}>
            Remplir la fiche de consultation
          </Button>
        </section>
    </div>
  )
}

export default Consultation