import { useNavigate, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import React from 'react'
import style from './Profil.module.css'
import Button from "../../Button/Button"
import InfoProfil from '../../InfoProfil/InfoProfil'
import Carnet from '../../Carnet/Carnet'

import axios from "axios"
const Profil = () => {
  let navigate = useNavigate()
  let [patientInfo, setInfo] = useState(null)
  useEffect(()=>{
      axios.get(" http://192.168.137.112:5000/patient/profil", { headers : {authorization : `BEARER ${localStorage.getItem("token")}`}})
      .then((res)=>{
        setInfo(res.data)
      })
      .catch((error)=> console.log(error))
    }, [])
    console.log(patientInfo);
  return (
    <div className={style.profilPage}>
        <div className={style.titre}>
          <h1>Profil</h1>
        </div>

        <InfoProfil profilInfo={patientInfo} />

        <Carnet profilInfo={patientInfo} />
    </div>
  )
}

export default Profil