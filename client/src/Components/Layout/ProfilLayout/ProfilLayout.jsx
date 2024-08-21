import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import style from "./ProfilLayout.module.css"
import IconProfil from "../../IconProfil/IconProfil";
import axios from 'axios';
import { useEffect } from 'react';
import health from "../../../Assets/icon/iconlogo.png"
import Button from '../../Button/Button';
import { useNavigate, NavLink } from 'react-router-dom';


const ProfilLayout = () => {
    let navigate = useNavigate()
  return (
    <>
        <header className={style.header}>
            <section className={style.profil}>
                <IconProfil />
                <aside>
                    {
                        localStorage.getItem("userName")
                    }
                </aside>
            </section>
            <menu>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/profil/hopitalList">
                                Demande de Consultation
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/profil">
                                Information personnelle
                            </NavLink>
                        </li>
                       
                    </ul>
                </nav>
            </menu>
            <section className={style.logo}>
               <img src={health}/> <span>HealthTracker</span>
            </section>
        </header>
        <section>
            <Outlet />
        </section>
    </>
  )
}

export default ProfilLayout