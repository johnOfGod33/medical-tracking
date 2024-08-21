import style from './Button.module.css'
const Button = ({children, handleClick, type})=>{
    return(
        <>
            <button type={type} onClick={handleClick} className={style.button}>
                {
                    children
                }
            </button>
        </>
    )
}

export default Button