import React, { useEffect } from 'react'
import styles from "./Detail.module.css"
import  {useDispatch, useSelector}  from 'react-redux'
import { getPokemon } from '../../redux/actions'
import { useParams } from 'react-router-dom'
import noImage from '../../images/simple_pokeball.gif'
import { Link } from 'react-router-dom'

const Detail = () => {
  const dispatch= useDispatch()
  const pokemon=useSelector(state=>state.pokemon)
  const {id}=useParams()
  const infoPokemon=pokemon


  useEffect(()=>{
    dispatch(getPokemon(id))
  },[dispatch])

  console.log(infoPokemon)
  if(infoPokemon){return (
    <div className={styles.mainContainer}>
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          className={styles.img1}
          src={infoPokemon.image ? infoPokemon.image : noImage}
          alt="something"
        />
      </div>
      <div className={styles.textContainer}>
        <h1>{infoPokemon.name}</h1>
        <div className={styles.details}>
          <h4>Id: {infoPokemon.pokemonId}</h4>
          <h4>Hp: {infoPokemon.hp}</h4>
          <h4>Attack: {infoPokemon.attack}</h4>
          <h4>Defense: {infoPokemon.defense}</h4>
          <h4>Speed: {infoPokemon.speed}</h4>
          <h4>Height: {infoPokemon.height}</h4>
          <h4>Weight: {infoPokemon.weight}</h4>
        </div>
      </div>
      <Link to="/home">
        <button className={styles.button}>Close</button>
      </Link>
    </div>
  </div>
  );}
}

export default Detail
