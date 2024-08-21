import React from 'react'
import style from "./Carnet.module.css"
import Button from "../Button/Button"
import { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios"
const Carnet = ({profilInfo}) => {
  let [consultationInfo, setConsultationInfo] = useState()
  let [showConsultationList, setShow] = useState(false)
  let [analyseList, setAnalyse] = useState()
  let [prescriptionList, setPrescription] = useState()
  let handleClick = ()=>{
    setShow(prevState=>!prevState)
  }

  useEffect(()=>{
    profilInfo && axios.post(" http://192.168.137.112:5000/carnet/consultations", {id_carnet: profilInfo[0].id_carnet})
      .then((res)=>{
        setConsultationInfo(res.data)
      })
      .catch((error)=>console.log(error))
  
      axios.get(" http://192.168.137.112:5000/carnet/analyses")
      .then((res)=>{
        setAnalyse(res.data)
      })
      .catch((error)=>console.log(error))
  
      axios.get(" http://192.168.137.112:5000/carnet/prescriptions")
      .then((res)=>{
        setPrescription(res.data)
      })
      .catch((error)=>console.log(error))
    },[profilInfo])
  
  let infoCarnet = profilInfo && profilInfo.map((profil, indice)=>{
    return <table key={indice}>
    <tbody>
      <tr>
        <td>Poids: {profil.poids_carnet} kg </td>
        <td>Taille: {profil.taille_carnet} cm </td>
      </tr>
      <tr>
        <td colSpan={2}>
          <p>
            intolerance : {profil.intolerence_carnet}
          </p>
        </td>
      </tr>
      <tr>
        <td colSpan={2}>
          <p>
            maladies : {profil.maladies_carnet}
          </p>
        </td>
      </tr>
      <tr>
        <td colSpan={2}>
          <p>
            Etat de sante : {profil.etatsante_carnet}
          </p>
        </td>
      </tr>
      <tr>
        <td colSpan={2}>
          <p>
            Groupe Sanguin : {profil.groupesanguin_carnet}
          </p>
        </td>
      </tr>
      <tr>
        <td colSpan={2}>
          <p>
            Personne à prevenir : {profil.contacturgence_carnet} 
          </p>
        </td>
      </tr>
      
    </tbody>
  </table>
  })
    
  
  let showConsultation = showConsultationList && consultationInfo && consultationInfo.map((consultation, indice)=>{
    return <section className={style.consultation} key={indice}>
    <h2>Liste des consultations</h2>
    <section>
        <h3>Consulutation  N°{consultation.id_consultation} </h3>
        <div>
          <ul>
            <li>
               <span>Date de la consultation:</span> {consultation.date_consultation.split("T")[0]}
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <span>Nom du docteur: </span> {consultation.nom_docteur} {consultation.prenom_docteur}
            </li>
            <li>
              <span>Nom de l'hopital: </span> {consultation.nom_hopital}
            </li>
          </ul>
        </div>
        <div className={style.consultation_symptome}>
          <p>
            <span>Symptome:</span>
            {consultation.symptome_consultation}
          </p>
        </div>
        <div className={style.consultation_prescription}>
          <h4>Presciptions</h4>
          {
            prescriptionList && prescriptionList.map((prescription, indice)=>{

              return prescription.id_consultation===consultation.id_consultation &&  <section key={indice}>
                  <article>Nom du produit : {prescription.nomproduit_prescription} </article>
                  <aside>Dosage : {prescription.dosage_prescription} </aside>
                </section>
            })
          }
          
        </div>
        <div className={style.consultation_analyse}>
          <h4>Analyse</h4>
          {
            analyseList && analyseList.map((analyse, indice)=>{

              return analyse.id_consultation===consultation.id_consultation &&  <section key={indice}>
                  <article>Nom analyse : {analyse.nom_analyse} </article>
                  <aside>Resultat : {analyse.resultat_analyse} </aside>
                </section>
            })
          }
        </div>
    </section>
  </section>
  })
  return (
    <div className={style.carnet}>
      <div className={style.titre}>
        <h1>Carnet</h1>
      </div>
      <section className={style.infoCarnet}>
        <h2>Information du Carnet</h2>
        {
          infoCarnet
        }
      </section>
      {
        profilInfo && profilInfo[0].permission_carnet===1 ? (showConsultationList ? (
          <Button handleClick={handleClick}>
            Femer
          </Button>
        ) : 
        (
          <Button handleClick={handleClick}>
            Afficher la liste des consultations
          </Button>
        )): null

      }
      {
        showConsultation
      }
    </div>
  )
}

export default Carnet