const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    pokemonId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false
    }
  },{
    createdAt: false,
    updatedAt: false,
  });
};


//BD pokemons
// ID. *
// Nombre. *
// Imagen. *
// Vida. *
// Ataque. *
// Defensa. *
// Velocidad.
// Altura.
// Peso.