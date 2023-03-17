import React from 'react';
import styles from "./Cards.module.css"
import noImg from '../../images/simple_pokeball.gif'
import {Link} from 'react-router-dom'

const PokemonCard = ({ name, image, id, type }) => {

  return (
    <div className={styles.card}>
    <Link to={`/detail/${id}`} style={{textDecoration:"none", color:"black"}}>
      <h2 className={styles.name}>{name}</h2>
      <img className={styles.imgCont} src={image ? image : noImg} alt="img not found" width="200px" height="250vh"/>
      <div className={styles.infoContainer}>
        <div className={styles.idContainer} ><p className={styles.id}>ID: {id}</p></div>
        <div className={styles.typeContainer}> <p className={styles.type}>Type:{type}</p></div>
      </div>
    </Link>
  </div>
  );
};
export default PokemonCard


