import { useNavigate } from "react-router-dom";
import Button from "../../Button/Button";
import style from "./Accueil.module.css"
const Accueil=()=>{
    let navigate = useNavigate()
    return(
      <div className={style.accueil}>
            <h1> Health Tracker </h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum aspernatur nam deserunt pariatur, quibusdam delectus alias iste sit cumque non?
            </p>
            <section>
                <Button handleClick={()=>{navigate("/signup")}}>
                    Inscription
                </Button>
                <Button handleClick={()=>{navigate("/login")}}>
                    Connexion
                </Button>
            </section>
      </div>
    )
  }
  export default Accueil;