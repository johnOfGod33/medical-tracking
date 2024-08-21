import React from 'react'
import { useContext } from 'react'
import { HopitalContext } from './HopitalContext'
const UseHopitalContextProvider = () => {
  return useContext(HopitalContext)
}

export default UseHopitalContextProvider