import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const getAllPokemon = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/pokemons");
    const pokemons =  apiData.data?.map((pokemon) => {
      return {
        id: pokemon.pokemonId,
        name: pokemon.name,
        image: pokemon.image,
        type:pokemon.type,
        attack:pokemon.attack,
        hp:pokemon.hp,
        defense:pokemon.defense,
        speed:pokemon.speed,
        weight:pokemon.weight,
        height:pokemon.height
      };
    });
    dispatch({ type: GET_POKEMONS, payload: pokemons });
  };
};

export const GET_POKEMON="GET_POKEMON"
export const getPokemon=(id)=>{
  return async function(dispatch){
    const apiData = await axios.get(`http://localhost:3001/pokemons/${id}`);
     return dispatch({type:GET_POKEMON, payload:apiData.data})
  }
}

export const GET_TYPES="GET_TYPES"
export const getTypes =()=>{
  return async function(dispatch){
    const apiDataTypes = await axios.get("http://localhost:3001/types");
    const types=apiDataTypes.data

    dispatch({type: GET_TYPES, payload :types})
  }
}

export const SET_FILTERED_POKEMONS = "SET_FILTERED_POKEMONS";
export const setFilteredPokemons = (filteredPokemons) => ({
  type: SET_FILTERED_POKEMONS,
  payload: filteredPokemons
});

export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const getFilterType = (type) => (dispatch, getState) => {
  const { originalPokemons } = getState();

  const filteredPokemons = originalPokemons.filter((pokemon) =>
    pokemon.type.includes(type) || pokemon.type.includes(type.split(" ")[0]) || pokemon.type.includes(type.split(" ")[1])
  );
  
  dispatch({ type: FILTER_BY_TYPE, payload: filteredPokemons });
};


export const FILTER_NAME="FILTER_NAME"
export const getPokemonsByName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/pokemons/name/${name}`);
      const apiDataTypes = response.data;
      dispatch({ type: FILTER_NAME, payload: apiDataTypes });
    } catch (error) {
      console.log(error);
      alert(("Pokemon Not found"))
    }
  };
};

export const ORDER="ORDER"
export const orderPokemon=(order)=>{
  return{
    type: ORDER,
    payload:order
  }
}

export const DAMAGE="DAMAGE"
export const orderDamage=(damage)=>{
  return{
    type:DAMAGE,
    payload:damage
  }
}

export const CLEAR_POKEMON="CLEAR_POKEMON"
export const clearPokemon=()=>{
  return{
    type:CLEAR_POKEMON
  }
}
