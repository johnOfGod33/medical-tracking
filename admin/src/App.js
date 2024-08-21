import {BrowserRouter, Routes, Route} from "react-router-dom"
import React from 'react'
import Signup from "./Components/Pages/Accueil/Accueil"
import Login from './Components/Pages/Login/Login'
import Accueil from './Components/Pages/Accueil/Accueil'
import ProfilLayout from "./Components/Layouts/ProfilLayout/ProfilLayout"
import AccueilLayout from "./Components/Layouts/AccueilLayout/AccueilLayout"
import DemandeList from './Components/Pages/DemandeList/DemandeList'
import DocteurLogin from './Components/Pages/DocteurLogin/DocteurLogin'
import Consultation from './Components/Pages/Consultation/Consultation'
import FicheConsultation from "./Components/Pages/FicheConsultation/FicheConsultation"
import AddDocteur from "./Components/Pages/AddDocteur/AddDocteur"
import ProtectetedRoute from "./Components/ProtectedRoute/ProtectedRoute"
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<AccueilLayout />} >
          <Route index element={<Accueil />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route element={<ProtectetedRoute />}>
          <Route path="/demandeList" element={<ProfilLayout />} >
            <Route index element={<DemandeList />} />
            <Route path= "docteurLogin" element={<DocteurLogin />} />
            <Route path='consultation' element={<Consultation />} />
            <Route path='ficheConsultation' element={<FicheConsultation />} />
            <Route path='addDocteur' element={<AddDocteur />} />          
          </Route>
        </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App