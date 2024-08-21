import { Outlet } from "react-router-dom";
import style from "./AccueilLayout.module.css"
const AccueilLayout=()=>{
    return(
        <div className={style.accueilLayout}>
            <Outlet />
        </div>
    )
  }
  export default AccueilLayout;