import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemon} from "../../redux/actions";
import { Link } from "react-router-dom";
import styles from "./Home.module.css"
import Filters from "../../Components/Filters/filters";
import PokemonCard from "../../Components/Cards/Cards";
import Paginado from "../../Components/Paginado/Paginado";
import SearchBar from "../../Components/SearchBar/SearchBar";
import LoadingGif from "../../images/load.gif"
import { BsLinkedin } from "react-icons/bs";
import {BsGithub} from "react-icons/bs"

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state);
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);

  // Calcula los índices del primer y último pokemon a mostrar
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  // Calcula el número máximo de paginas
  const max = Math.ceil(allPokemons?.pokemons.length / perPage);

  // Obtiene el array de pokemons a mostrar en la pagina actual
  const pokemonsToShow = allPokemons?.pokemons.slice(startIndex, endIndex);

  useEffect(() => {
    dispatch(getAllPokemon());
    console.log("useEffect del home**********")
  }, [dispatch]);

  return (
    <div className={styles.body}>
      <div className={styles.searchContainer}>
        <h1>
          <span className={styles.poke}>Poke</span>
          <span className={styles.web}>Web</span>
        </h1>
        <p className={styles.searchName}>Buscar Pokemon por nombre</p>
        <SearchBar/>
      </div>
      <aside className={styles.filterContainer}>
        <Filters />
      </aside>
      <main className={styles.container}>
      <section className={styles.pokemonContainer}>
  {pokemonsToShow.length ? (
    pokemonsToShow.map((pokemon, index) => (
      <PokemonCard
        key={index}
        name={pokemon.name}
        image={pokemon.image}
        id={pokemon.id}
        type={pokemon.type}
      />
    ))
  ) : (
    <img className={styles.Loading} src={LoadingGif} alt="something" />
  )}
</section>
      </main>
      <footer className={styles.footer}>
        <Paginado page={page} setPage={setPage} max={max} />
      </footer>
      <footer className={styles.footer2}>
      <h3>All rights reserved © 2023 </h3>
      <p className={styles.yo} > <a className={styles.linked} href="https://github.com/gxspxr"><BsGithub/></a> <a className={styles.linked} href="https://www.linkedin.com/in/gaspar-serna-8a0945215/"><BsLinkedin/></a> Gaspar Serna</p>
      </footer>
    </div>
  );
}