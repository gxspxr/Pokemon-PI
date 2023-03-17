import { GET_POKEMONS, GET_TYPES, FILTER_BY_TYPE, GET_POKEMON, FILTER_NAME, DAMAGE, ORDER } from "./actions";

const initialState = {
  pokemons: [],
  types: [],
  originalPokemons: [],
  pokemon:{},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        originalPokemons: action.payload
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload
      };
    case FILTER_BY_TYPE:
      return {
        ...state,
        pokemons: action.payload
      };
      case GET_POKEMON:
      return {
        ...state, pokemon:{...state.pokemon, ...action.payload}
      };
      case FILTER_NAME:
      return {
        ...state,
        pokemons: action.payload
      };
      case ORDER:
        var pokeOrder;
      action.payload === "asc"
        ? (pokeOrder = state.pokemons.sort((a, b) =>
            a.name.localeCompare(b.name)
          ))
        : (pokeOrder = state.pokemons.sort((a, b) =>
            b.name.localeCompare(a.name)
          ));
      return {
        ...state,
        pokemons: pokeOrder,
      };
      case DAMAGE:
        var orderDamage;
      if (action.payload === "max") {
        orderDamage = state.pokemons.sort((a, b) => b.attack - a.attack);
      }
      if (action.payload === "min") {
        orderDamage = state.pokemons.sort((a, b) => a.attack - b.attack);
      }
      console.log(action.payload);
      return {
        ...state,
        pokemons: orderDamage,
      };

    default:
      return { ...state };
  }
}

export default rootReducer;