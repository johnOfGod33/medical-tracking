import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import style from "./ProfilLayout.module.css"
import {NavLink} from "react-router-dom"
import axios from 'axios'
import health from "../../../Assets/icon/iconLogo.png"
const ProfilLayout = () => {
    let [nomHopital, setNom] = useState(null)
   /*  useEffect(()=>{
        axios.get("http://localhost:5000/hopital/getHopitalName", { headers : {authorization : `BEARER ${localStorage.getItem("token")}`}})
        .then((res)=>{
          console.log(res.data);
          setNom(res.data)
          console.log(nomHopital);
        })
        .catch((error)=> console.log(error))
      }, []) */
      useEffect(()=>{
        setNom(localStorage.getItem("nomHopital"))
      },[])
      let showNomHopital = nomHopital && (
        <h1> {nomHopital} </h1>
      )
  return (
    <>
        <header className={style.header}>
            <section className={style.logo}>
               <img src={health}/> <span>HealthTracker</span>
            </section>
            <section className={style.profil}>
                {
                    showNomHopital
                }
            </section>
            <menu>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/demandeList/addDocteur">
                                Ajouter des docteurs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/demandeList">
                                Liste des demandes
                            </NavLink>
                        </li>
                        
                    </ul>
                </nav>
            </menu>
            
            
        </header>
        <section>
            <Outlet />
        </section>
    </>
  )
}

export default ProfilLayout