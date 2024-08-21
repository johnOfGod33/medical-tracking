import React from 'react'
import Button from "../../Button/Button"
import style from "./AddDocteur.module.css"
import { useState } from 'react'
import axios from "axios"
const AddDocteur = () => {
    let [inputNom, setNom] = useState("")
    let [inputPrenom, setPrenom] = useState("")
    let [inputEmail, setEmail] = useState("")
    let [inputPassword, setPassword] = useState("")
    let [inputTel, setTel] = useState("")
    let [inputVille, setVille] = useState("")
  return (
    <div className={style.addDocteur}>
        <h1>Ajouter un docteur</h1>
        <form action="" onSubmit={(e)=>{
          e.preventDefault()
          let infoDocteur = {
            nom : inputNom,
            prenom: inputPrenom,
            email: inputEmail,
            mdp: inputPassword,
            tel: inputTel,
            ville: inputVille
          }
          console.log(infoDocteur);
          axios.post("http://localhost:5000/docteur/addDocteur", infoDocteur, { headers : {authorization : `BEARER ${localStorage.getItem("token")}`}})
          .then((res)=>{
            console.log(res.data);
        })
        .catch((error)=>console.log(error))
        }}>
            <div>
                <input type="text" placeholder='Nom' onInput={(e)=>setNom(e.target.value)}/>
            </div>
            <div>
                <input type="text" placeholder='Prenom'onInput={(e)=>setPrenom(e.target.value)} />
            </div>
            <div>
                <input type="email" placeholder='Email' onInput={(e)=>setEmail(e.target.value)} />
            </div>
            <div>
                <input type="number" placeholder='Tel' onInput={(e)=>setTel(e.target.value)} />
            </div>
            <div>
                <input type="password" placeholder='Mot de passe' onInput={(e)=>setPassword(e.target.value)} />
            </div>
            <div>
                <input type="text" placeholder='Ville' onInput={(e)=>setVille(e.target.value)}  />
            </div>
            <div>
            <Button>
                Valider
            </Button>
            </div>
        </form>
    </div>
  )
}

export default AddDocteur