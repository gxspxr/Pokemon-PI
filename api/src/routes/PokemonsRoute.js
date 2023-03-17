const { Router } = require('express');
const axios =require ('axios')
const router = Router();
const {Pokemon}=require('../db')
const { getAllInfo, getPokemonByID} = require('./controllers');

//All Pokemons
router.get('/', async (req, res) => {
  try {
    const name = req.query.name;
    const created = req.query.created;

    let pokeTotal = await getAllInfo();
    if (created === 'true') {
      pokeTotal = await Pokemon.findAll();
    } else if (created === 'false') {
      pokeTotal = pokeTotal.filter(pokemon => pokemon.pokemonId);
    }

    
      res.status(200).send(pokeTotal);
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
})

  //Buscar Pokemons por id
  router.get('/:id', async (req, res) => {
    try {
      const pokemonId = req.params.id;
      const pokemon = await getPokemonByID(pokemonId);
      if(!pokemon){
        return res.status(404).send('Pokemon not found');
      }
      res.status(200).send(pokemon)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error al buscar el Pokémon' });
    }
  });

  //buscar Pokemons por nombre
  router.get('/name/:name', async (req, res) => {
    try {
      const name = req.params.name;
      const pokeName = await getAllInfo();
      //Uso /^[a-zA-Z]+$/ para verificar si la cadena de texto tiene solo caracteres alfabeticos 
      if (!/^[a-zA-Z]+$/.test(name)) {
        return res.status(400).send('El nombre del pokemon solo puede contener letras');
      }
      //si "name" no es nulo, filtra la lista de pokemons por el objeto "name"
      if (name) {
        let pokeNames = pokeName.filter((e) => e.name.toLowerCase().includes(name.toLowerCase())
        );

        if(!name){
          return res.status(400).send("Pokemon not found")
        }
        
        // Si no se encontraron pokemons, devuelve un error
        if (pokeNames.length === 0) {
          return res.status(404).send('Pokemon not found');
        }
        res.status(200).send(pokeNames);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });


  //crear pokemon
  router.post('/', async (req, res) => {
    try {
      const response = await axios.get("http://localhost:3001/pokemons");
      //funcion para sumarle al pokemon creado, el ultimo id + 1
      let lastPokemonId;

      lastPokemonId = response.data[response.data.length - 1].pokemonId;

      const id = lastPokemonId + 1;

      const {name, hp, attack, defense, speed, height, weight, image, type} = req.body;
  
      const existingPokemon = await Pokemon.findOne({ where: { name } });
  
      if (existingPokemon) {
        return res.status(409).send('El Pokemon ya existe');
      }
  
      const pokemon= await Pokemon.create({
        pokemonId: id,
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        type,
        image
      });
  
      if (!pokemon) {
        return res.send({ message: "Not created" });
      }
  
      return res.status(201).send("Pokemon creado exitosamente");
    } catch (error) {
      console.error(error.message);
      return res.status(404).send("Error en alguno de los datos enviados");
    }
  });

  router.delete("/:id", async (req,res)=>{
    try {
        const pokemonId=req.params.id

        const deletedPokemon= await Pokemon.destroy({
          where:{
            pokemonId:  pokemonId
          }
        })

        if(deletedPokemon===0){
          res.status(404).send("Error al encontrar el pokemon")
        }

       return res.status(200).send(`El pokemon ${pokemonId} se elimino con exito`)
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("internal server error")
    }
  })

  router.put("/:id", async (req,res)=>{
    try {
     const pokemonId= req.params.id

    const upPokemon= await Pokemon.update({
     name: "",

 }, {
     where: {
         pokemonId: pokemonId,
         name: "",
     }
 });
    if(upPokemon===0){
     res.status(400).send("error al encontrar el pokemon")
    }
    return res.status(200).send(`El pokemon ${pokemonId} se actualizó con exito`)
    } catch (error) {
     console.error(error)
     return res.status(400).send("internal server error")
    }
 })
  


  module.exports = router;