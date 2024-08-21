import React from 'react'
import Button from '../../Button/Button'
import { useNavigate } from 'react-router-dom'
import style from "./Login.module.css"
import IconProfil from '../../IconProfil/IconProfil'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {
  let navigate = useNavigate()
  let [inputEmail, setEmail] = useState("")
  let [inputPassword, setPassword] = useState("")
  return (
    <div className={style.login}>
        <h1>Connexion</h1>
        <IconProfil />
        <form onSubmit={(e)=>{
          e.preventDefault()
          let infoLogin = {
              email:inputEmail,
              mdp:inputPassword,
          }
          console.log(infoLogin);
          axios.post("http://192.168.137.112:5000/patient/login", infoLogin)
          .then((res)=>{
              console.log(res.data);
              localStorage.setItem("token", res.data.accessToken)
              localStorage.setItem("userName", res.data.userName)
              navigate("/profil")
          })
          .catch((error)=>console.log(error))
          }
        }>
            <div>
                <input type="email" placeholder="Email" onInput={(e)=>setEmail(e.target.value)} />
            </div>
            <div>
                <input type="password" placeholder='Mot de passe' onInput={(e)=>setPassword(e.target.value)}/>
            </div>
            <Button>
                Connexion
            </Button>
        </form>
    </div>
  )
}

export default Login