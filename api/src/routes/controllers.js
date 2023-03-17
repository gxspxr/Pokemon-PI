const axios= require('axios');
const {Pokemon, Type}=require("../db")

const UrlIndex = async (url) => {
  const urlResponse = await axios.get(url);
  return urlResponse.data;
};

const getAllPokemons = async () => {
  try {
    const apiData = await UrlIndex("https://pokeapi.co/api/v2/pokemon?limit=150");
    const apiPokemons = await apiData.results.map((pokemon) => {
      const obj = {
        name: pokemon?.name,
        url: pokemon.url,
      };
      return obj;
    });
    const pokemonHandler = async () => {
      const pokemon = apiPokemons?.map(async (res) => {
        const urlInfo = await UrlIndex(res.url);
        const pokemonData = {
          pokemonId:urlInfo.id,
          name: urlInfo.name,
          hp: urlInfo.stats[0].base_stat,
          speed: urlInfo.stats[5].base_stat,
          attack: urlInfo.stats[1].base_stat,
          defense: urlInfo.stats[2].base_stat,
          weight: urlInfo.weight,
          height: urlInfo.height,
          image:  urlInfo.sprites.other['official-artwork'].front_default,
          type: urlInfo.types.map((t) => t.type.name).join("/"),
        };
        return pokemonData;
      });
      const pokemonData = await Promise.all(pokemon);
      return pokemonData;
    };
    const data = await pokemonHandler();

    return data
  } catch (error) {
    console.error(error);
  }
};


  const getPokemonByID = async (pokemonId) => {
    try {
      const pokemonFromDB = await Pokemon.findByPk(pokemonId);
      if (pokemonFromDB) {
        // Si se encontró el Pokémon en la base de datos, devolverlo
        return pokemonFromDB.toJSON();
      } else {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const type= res.data.types.map((e)=>e.type.name)
        const pokemon = {
          pokemonId:res.data.id,
          name: res.data.name,
          hp: res.data.stats[0].base_stat,
          speed: res.data.stats[5].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          weight: res.data.weight,
          height: res.data.height,
          image:  res.data.sprites.versions['generation-v']['black-white'].animated.front_default,
          type: type.join("/")
        };
        return pokemon;
      }
    } catch (error) {
      console.log(error);
    }
  };
  
const getDbInfo = async () => {
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
};

 const getAllInfo = async () => {
    const apiData = await getAllPokemons();
    const dbInfo = await getDbInfo();
    const allInfo = apiData?.concat(dbInfo);
    console.log(allInfo)
    return allInfo;
};

const getTypes =async()=>{
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/type');
    const types = response.data.results.map(type => type.name);
    return types;
  } catch (error) {
    throw new Error('Error al obtener tipos de Pokemon desde la API.');
  }
}

module.exports = {
    getAllPokemons,
    getDbInfo,
    getAllInfo,
    getPokemonByID,
    getTypes,
}