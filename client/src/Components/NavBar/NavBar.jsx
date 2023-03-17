import React from "react";
import {Link} from "react-router-dom"
import styles from "./NavBar.module.css"
import pikachuGif from "../../images/pikachu pi.gif"

const NavBar=()=>{
    return(
        <div className={styles.mainContainer}>
        <img  src={pikachuGif} className={styles.pikachu} alt="pikachugif"/>
        <div className={styles.container}>
        <Link to="/home" className={styles.link}>Inicio</Link>
        <Link to="/Form" className={styles.form}>Crea tu pokemon</Link>
        </div>
      </div>
    )
}

export default NavBar