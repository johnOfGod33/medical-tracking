import { useNavigate } from "react-router-dom";
import Button from "../../Button/Button";
import style from "./Signup.module.css";
import IconProfil from "../../IconProfil/IconProfil";
import { useState } from "react";
const Signup=()=>{
    let navigate = useNavigate()
    let [inputNom, setNom] = useState("")
    let [inputPrenom, setPrenom] = useState("")
    let [inputEmail, setEmail] = useState("")
    let [inputPassword, setPassword] = useState("")
    let [inputTel, setTel] = useState("")
    let [inputPays, setPays] = useState("")
    let [inputVille, setVille] = useState("") 
    let [inputDate, setDate] = useState("")
    let [inputSex, setSex] = useState("")

   return(
        <div className={style.signup}>
            <h1>Inscription</h1>
            <section>
                 <IconProfil />
            </section>
            <form onSubmit={(e)=>{
                e.preventDefault()
                navigate("/login")
            }}>
                <div>
                    <input type="text" placeholder="Nom" />
                </div>
                <div>
                    <input type="text" placeholder="prenom" />
                </div>
                <div>
                    <input type="number" placeholder="Telephone" />
                </div>
                <div>
                    <input type="email" placeholder="Email" />
                </div>
                <div>
                    <label htmlFor="date">Date de naissance</label>
                    <br />
                    <input type="date"/>
                </div>
                <div>
                    <input type="password" placeholder="Mot de passe" />
                </div>
                <div>
                    <label htmlFor="pays">Pays</label>
                    <br />
                    <select id="pays">
                        <option value=""></option>
                        <option value="Togo">Togo</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="ville">Ville</label>
                    <br />
                    <select id="ville">
                        <option value=""></option>
                        <option value="Lome">Lome</option>
                    </select>
                </div>
                <div>
                    <input type="text" placeholder="Adresse"/>
                </div>

                <div>
                    <select id="sexe">
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