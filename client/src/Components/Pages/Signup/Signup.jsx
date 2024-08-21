import { useNavigate } from "react-router-dom";
import Button from "../../Button/Button";
import style from "./Signup.module.css";
import IconProfil from "../../IconProfil/IconProfil";
import { useState } from "react";
import axios from "axios"
const Signup=()=>{
    let navigate = useNavigate()
    let [inputNom, setNom] = useState("")
    let [inputPrenom, setPrenom] = useState("")
    let [inputEmail, setEmail] = useState("")
    let [inputPassword, setPassword] = useState("")
    let [inputTel, setTel] = useState("")
    let [inputVille, setVille] = useState("") 
    let [inputDate, setDate] = useState("")
    let [inputSex, setSex] = useState("")
    let [inputAdress, setAdress] = useState("")

   return(
        <div className={style.signup}>
            <h1>Inscription</h1>
            <section>
                 <IconProfil />
            </section>
            <form onSubmit={(e)=>{
                e.preventDefault()
                let infoSignup = {
                    nom:inputNom,
                    prenom:inputPrenom,
                    email:inputEmail,
                    tel:inputTel,
                    mdp:inputPassword,
                    dateNaissance:inputDate,
                    sexe:inputSex,
                    ville:inputVille,
                    addresse:inputAdress
                }
                axios.post(" http://192.168.137.112:5000/patient/signup", infoSignup)
                .then((res)=>{
                    console.log(res.data);
                })
                .catch((error)=>console.log(error))
                navigate("/login")
            }}>
                <div>
                    <input type="text" placeholder="Nom" required onInput={(e)=>setNom(e.target.value)}/>
                </div>
                <div>
                    <input type="text" placeholder="prenom" required onInput={(e)=>setPrenom(e.target.value)}/>
                </div>
                <div>
                    <input type="number" placeholder="Telephone"required onInput={(e)=>setTel(e.target.value)}/>
                </div>
                <div>
                    <input type="email" placeholder="Email" required onInput={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="date">Date de naissance</label>
                    <br />
                    <input type="date" required onChange={(e)=>setDate(e.target.value)}/>
                </div>
                <div>
                    <input type="password" required placeholder="Mot de passe" onInput={(e)=>setPassword(e.target.value)}/>
                </div>
                <div>
                    <br />
                    <select id="ville" required onChange={(e)=>setVille(e.target.value)}>
                        <option value="">Ville</option>
                        <option value="Lome">Lome</option>
                        <option value="Kara">Kara</option>
                    </select>
                </div>
                <div>
                    <input type="text" required placeholder="Adresse" onInput={(e)=>setAdress(e.target.value)}/>
                </div>

                <div>
                    <select id="sexe" required onChange={(e)=>setSex(e.target.value)}>
                        <option value="">Votre sexe</option>
                        <option value="masculin">Masculin</option>
                        <option value="feminin">Feminin</option>
                    </select>
                </div>
                
                <Button>
                    Valider
                </Button>
                
            </form>
        </div>
   )
}
export default Signup;