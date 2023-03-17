import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemon, getFilterType, getTypes, orderDamage, orderPokemon } from "../../redux/actions";
import styles from "./filters.module.css";

export default function Filters() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [filtersApplied, setFiltersApplied] = useState(false);
  //filtro por pokemon
  const [selectedOption, setSelectedOption] = useState('todos');
  //orden alfabetico
  const [selectedOrder, setSelectedOrder] = useState('todos');
  //orden por ataque
  const [selectedDamage, setSelectedDamage] = useState('todos');

  function orderHandler(e){
    dispatch(orderPokemon(e.target.value));
    setSelectedOrder(e.target.value);
  }

  function damageHandler(e) {
    if (e.target.value === "todos") {
      setSelectedDamage("todos");
      return;
    }
    dispatch(orderDamage(e.target.value));
    setSelectedDamage(e.target.value);
  }

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getAllPokemon());
  }, [dispatch]);

  function handleFilter(e) {
    const value = e.target.value;
    if (value === "todos") {
      dispatch(getAllPokemon());
      setFiltersApplied(false);
    } else if (value === "type") {
      setFiltersApplied(true);
    } else {
      dispatch(getFilterType(value));
      setFiltersApplied(true);
    }
    setSelectedOption(value);
  }

  function clearFilters() {
    dispatch(getAllPokemon());
    setFiltersApplied(false);
    setSelectedOption('todos');
    setSelectedOrder('todos');
    setSelectedDamage('todos');
    const typeSelector = document.querySelector("select:nth-child(2)");
    if (typeSelector) {
      typeSelector.value = "todos";
    }
  }

  return (
    <div className={styles.containerFilter}>
    <h2>Filtros</h2>
      <button className={styles.clear} onClick={clearFilters}>
        Limpiar filtros
      </button>
    <div className={styles.selects}>
     <label>Orden alfabetico</label>
     <select onChange={orderHandler} value={selectedOrder}>
  <option value="todos">Opciones</option>
  <option value="asc">A-Z</option>
  <option value="desc">Z-A</option>
</select>

<label>Ordenar por ataque</label>
<select onChange={damageHandler} value={selectedDamage}>
  <option value="todos">Opciones</option>
  <option value="max">Max Damage</option>
  <option value="min">Min Damage</option>
</select>

      <div style={{fontSize:"15px", display:"flex", flexDirection:"row", paddingTop:"5px"}}>Filtrar por tipos</div>
      <select onChange={handleFilter} value={selectedOption}>
        <option value="todos">Todos</option>
        {state.types.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  </div>
  );
}