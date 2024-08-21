import style from './Button.module.css'
const Button = ({children, handleClick})=>{
    return(
        <>
            <button onClick={handleClick} className={style.button}>
                {
                    children
                }
            </button>
        </>
    )
}

export default Button