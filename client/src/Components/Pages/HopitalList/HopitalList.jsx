import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import style from "./Hopital.module.css"
import HopitalCard from '../../HopitalCard/HopitalCard'
import Button from '../../Button/Button'


const HopitalList = () => {
  let navigate = useNavigate()
  return (
    <div className={style.hopitalPage}>
        <div className={style.titre}>
          <h1>Liste des Hopitaux</h1>
        </div>
           
        <HopitalCard />
    </div>
  )
}

export default HopitalList