import React from 'react'
import { useState } from 'react';
import {HopitalContext} from "./HopitalContext"


const HopitalContextProvider = ({children}) => {
    let [infoPatient, setInfoPatient] = useState()
    let [idDocteur, setIdDocteur] = useState()
    
  return <HopitalContext.Provider value={{infoPatient, setInfoPatient, idDocteur, setIdDocteur}}>
    {children}
  </HopitalContext.Provider>
}

export default HopitalContextProvider