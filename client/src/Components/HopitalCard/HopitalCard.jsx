import { useState, useEffect,useRef } from 'react'
import React from 'react'
import style from "./HopitalCard.module.css"
import axios from 'axios'
import tel from "../../Assets/icon/tel.png"
import mail from "../../Assets/icon/mail.png"
import ville from "../../Assets/icon/localisation.png"
import Button from "../Button/Button"

const HopitalCard = () => {
    let [hopitalList, setHopitalList] = useState(null)
    let [showButton, setButton] = useState(false)
    useEffect(()=>{
        axios.get(" http://192.168.137.112:5000/hopital/getAllHopital", { headers : {authorization : `BEARER ${localStorage.getItem("token")}`}})
        .then((res)=>{
            setHopitalList(res.data)
            console.log(hopitalList);
        })
        .catch((error)=>console.log(error))
    }, [])
    
    let showHopitalList = (liste)=>{
        return liste.map((hopital, indice)=>{
            return (
                <section key={indice}>
                    <div className={style.nomH}>
                        <h2>{hopital.nom_hopital}</h2>
                    </div>
                    <div>
                        <article>
                            <ul>
                                <li> <img src={tel} alt='telephone'/> {hopital.tel_hopital} </li>
                                <li> <img src={mail} alt="email" />{hopital.email_hopital} </li>
                                <li> <img src={ville} alt="localisation" /> {hopital.ville_hopital} </li>
                            </ul>
                        </article>
                        <aside>
                        {
                            showButton ? (
                                <Button handleClick={()=>{
                                    let id_hopital = {id_hopital: hopital.id_hopital}
                                    axios.post(" http://192.168.137.112:5000/patient/demande", id_hopital, { headers : {authorization : `BEARER ${localStorage.getItem("token")}`}})
                                    .then((res)=>{
                                        console.log(res.data);
                                        let newList = liste.filter(element=>element!==hopital)
                                        setHopitalList(newList)
                                        setButton(!showButton)
                                    })
                                    .catch((error)=> console.log(error))
                                }}>
                                    Confirmer
                                </Button>
                            ):
                            (
                                <Button handleClick={()=>{
                                    setButton(!showButton)
                                }}>
                                    Soumettre la Consultaion
                                </Button>
                            )
                        }
                        

                        
                        </aside>
                    </div>
                </section>
            )
        })
    } 
  return (
    <>
        <section className={style.hopitalList}>
            {
               hopitalList && showHopitalList(hopitalList)
            }
        </section>
    </>

  )
}

export default HopitalCard