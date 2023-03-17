import React from "react";
import {Link} from "react-router-dom"
import styles from "./LandingPage.module.css"
export default function LandingPage(){
    return( 
        <div className={styles.bg}>
          <h1 className={styles.header}>Poke<span className={styles.headerWeb}>Web</span></h1>
          <h2 className={styles.me}>By <span className={styles.meName}>Gxspxr</span></h2>
          <div className={styles.content}>
          <Link to = "/home">
            <button className={styles.btn}>Catch ’Em All!</button>
          </Link> 
          </div>
        </div>
    )
}