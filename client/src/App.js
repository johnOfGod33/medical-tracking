import {BrowserRouter, Routes, Route} from "react-router-dom"
import Accueil from "./Components/Pages/Accueil/Accueil";
import AccueilLayout from "./Components/Layout/AccueilLayout/AccueilLayout";
import Signup from "./Components/Pages/Signup/Signup";
import Login from "./Components/Pages/Login/Login";
import ProfilLayout from "./Components/Layout/ProfilLayout/ProfilLayout";
import Profil from "./Components/Pages/Profil/Profil";
import HopitalList from "./Components/Pages/HopitalList/HopitalList";
import ProtectetedRoute from "./Components/ProtectedRoute/ProtectetedRoute";
const App=()=>{
  return(
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<AccueilLayout />} >
            <Route index element={<Accueil />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route element={<ProtectetedRoute />}>
            <Route path="/profil" element={<ProfilLayout />} >
              <Route index element={<Profil />} />
              <Route path="hopitalList" element={<HopitalList />} />
            </Route>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;