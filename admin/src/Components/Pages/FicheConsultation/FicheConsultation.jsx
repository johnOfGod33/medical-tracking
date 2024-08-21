import React from 'react'
import style from './FicheConsultation.module.css'
import Button from "../../Button/Button"
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import UseHopitalContextProvider from "../../Context/UseHopitalContextProvider"
import axios from 'axios'
const FicheConsultation = () => {
  let navigate = useNavigate()
  let {idPatient, idDocteur} = UseHopitalContextProvider()
  let [inputPoids, setPoids] = useState()
  let [inputTaille, setTaille] = useState()
  let [inputGs, setGs] = useState()
  let [inputEtatSante, setEtat] = useState()
  let [inputSymptome, setSymptome] = useState()
  let [inputIntolerance, setIntolerance] = useState()
  let [inputTemperature, setTemperature] = useState()
  let [inputTension, setTension] = useState()
  let [inputMaladies, setMaladies] = useState()
  let [inputPrescriptionNomList, setPrescriptionNomList] = useState([])
  let [inputPrescriptionDosageList, setPrescriptionDosageList] = useState([])
  let [inputAnalyseNomList, setAnalyseNomList] = useState([])
  let [inputAnalyseResultatList, setAnalyseResultatList] = useState([])
  let [nbrePrescriptionForm, setNbrePrescriptionForm] = useState(["prescription"])
  let [nbreAnalyseForm, setNbreAnalyseForm] = useState(["analyse"])
  let analyse = nbreAnalyseForm.map((element, indice)=>{
    return <tr key={indice}>
    <td>
      <label htmlFor="analyse">Analyse:</label>
      <input type="text" id="analyse" onBlur={(e)=>{
        setAnalyseNomList([...inputAnalyseNomList, e.target.value])
      }} />
    </td>
    <td>
      <label htmlFor="resultat">Resultat:</label>
      <input type="text" id="resultat" onBlur={(e)=>{
         setAnalyseResultatList([...inputAnalyseResultatList, e.target.value])
      }} />
    </td>          
  </tr>
  })
  let prescription = nbrePrescriptionForm.map((element, indice)=>{
    return <tr key={indice}>
      <td>
        <label htmlFor="produit">Nom du produit:</label>
        <input type="text" id="produit" onBlur={(e)=>{
         setPrescriptionNomList([...inputPrescriptionNomList, e.target.value])
      }} />
      </td>
      <td>
        <label htmlFor="dosage">Dosage:</label>
        <input type="text" id="dosage" onBlur={(e)=>{
         setPrescriptionDosageList([...inputPrescriptionDosageList, e.target.value])
      }} />
      </td>
  </tr>
  })

  let [nomDocteur, setNomDocteur] = useState(null)
  useEffect(()=>{
    axios.post("http://localhost:5000/docteur/getDocteurName", {idDocteur: localStorage.getItem("idDocteur")})
    .then((res)=>{
      setNomDocteur(res.data)
    })
    .catch((error)=>console.log(error))
  }, [])
  return (
    <>
        <form className={style.fiche} onSubmit={(e)=>{
          e.preventDefault()
          let infoConsultation = {
            idDocteur: localStorage.getItem("idDocteur"),
            idPatient: localStorage.getItem("idPatient"),
            poids: Number(inputPoids),
            taille: Number(inputTaille),
            temperature:inputTemperature,
            tension:inputTension,
            groupeSanguin: inputGs,
            etatSante: inputEtatSante,
            symptome: inputSymptome,
            intolerence: inputIntolerance,
            maladies: inputMaladies,
            nomProduit: inputPrescriptionNomList,
            dosage: inputPrescriptionDosageList,
            nomAnalyse: inputAnalyseNomList,
            resultatAnalyse: inputAnalyseResultatList
          }
          console.log(infoConsultation);
          axios.post("http://localhost:5000/carnet/updateCarnet", infoConsultation, {headers : {authorization: `BEARER ${localStorage.getItem("token")}`}})
          .then((res)=>{
            console.log(res.data);
          })
          .catch((error)=>{
            console.log(error);
          })
          localStorage.removeItem("idDocteur")
          localStorage.removeItem("idPatient")
          localStorage.removeItem("userName")
          navigate("/demandeList")
          
        }}>
          <h1>Fiche de consultation</h1>
          <section>
            {
              nomDocteur && <h5>NOM DU DOCTEUR : Dr {nomDocteur[0].nom_docteur} {nomDocteur[0].prenom_docteur}  </h5>
            }
            <table>
                <tbody>
                    <tr>
                      <td>
                        <label htmlFor="poids">Poids:</label>
                        <input type="text" id='poids' onInput={(e)=> setPoids(e.target.value)} />
                      </td>
                      <td>
                        <label htmlFor="taille">Taille:</label>
                        <input type="text" id="taille" onInput={(e)=> setTaille(e.target.value)} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="temperature">Tempearture:</label>
                        <input type="text" id="temperature"onInput={(e)=> setTemperature(e.target.value)} />
                      </td>
                      <td>
                        <label htmlFor="tension">Tension: </label>
                        <input type="text"  id="tension" onInput={(e)=> setTension(e.target.value)}/>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <label htmlFor="groupeSanguin">Groupe sanguin:</label>
                        <input type="text" id="groupeSanguin" onInput={(e)=> setGs(e.target.value)}/>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <label htmlFor="etatSante">Etat de santé:</label>
                        <input type="text" id='etatSante' onInput={(e)=> setEtat(e.target.value)}/>
                      </td>
                    </tr>
                </tbody>
            </table>
          </section>
          <section>
            <label htmlFor="symptome">Symptome:</label>
            <br />
            <textarea name="" id="" cols="30" rows="10" onChange={(e)=> setSymptome(e.target.value)}></textarea>
          </section>
          <section>
            <label htmlFor="intolerance">Intolerances:</label>
            <br />
            <textarea name="" id="" cols="30" rows="10" onChange={(e)=> setIntolerance(e.target.value)}></textarea>
          </section>
          <section>
            <label htmlFor="maladies">maladies recurent:</label>
            <br />
            <textarea name="" id="" cols="30" rows="10" onChange={(e)=> setMaladies(e.target.value)}></textarea>
          </section>
          <section>
            <h4>Prescription</h4>
            <table>
              <tbody>
                {
                 prescription
                }
              </tbody>
            </table>
            <Button type={"button"} handleClick={()=>{
              let newList = [...nbrePrescriptionForm, "prescription"]
              setNbrePrescriptionForm(newList)
            }}>
              Ajouter plus
            </Button>
          </section>
          <section>
            <h4>Analyse</h4>
            <table>
              <tbody>
                {
                  analyse
                }
              </tbody>
            </table>
            <Button type={"button"} handleClick={()=>{
              let newList = [...nbreAnalyseForm, "analyse"]
              setNbreAnalyseForm(newList)
            }}>
              Ajouter plus
            </Button>
          </section>
            <Button type={"submit"}>
              Valider
            </Button>
          
        </form>
    </>
  )
}

export default FicheConsultation