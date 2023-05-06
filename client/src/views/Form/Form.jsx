import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from "./Form.module.css"
import NoImage from "../../images/simple_pokeball.gif"


const PokemonTypes = [
  "normal",
  "fighting",
  "flying",
  "ground",
  "poison",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
  "unknown",
  "shadow",
];

function PokemonForm() {
  
  const initialState={
    name: "",
    hp: "",
    attack:"",
    defense: "",
    height:"",
    weight: "",
    image: "",
    type:""
  }

  const [formValues, setFormValues] = useState(initialState);
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  const validaciones=(values)=>{
    const error={};
    const expRegularName=/^[a-zA-Z]+$/;

    //hp
    if(!values.hp){
      error.hp="el valor de hp es requerido"
    }
    else if(values.hp<1){
      error.hp="el valor no puede ser menor a 1"
    }
    else if(values.hp>100){
      error.hp="el valor no puede ser mayor a 100"
    }

    //name
    if(!values.name){
      error.name="el nombre no  puede estar vacio."
    }
    else if(!expRegularName.test(values.name)){
      error.name="el nombre no puede contener carácteres especiales."
    }

    //attack
    if(!values.attack){
      error.attack="El valor no puede estar vacio."
    }
    else if(values.attack<1){
      error.attack="el valor no puede ser menor a 1."
    }
    else if(values.attack>100){
      error.attack="el valor no puede ser mayor a 100."
    }

    //defense
    if(!values.defense){
      error.defense="El valor no puede estar vacio."
    }
    else if(values.defense<1){
      error.defense="el valor no puede ser menor a 1."
    }
    else if(values.defense>100){
      error.defense="el valor no puede ser mayor a 100."
    }

    //speed
    if(!values.speed){
      error.speed="El valor no puede estar vacio."
    }
    else if(values.speed<1){
      error.speed="el valor no puede ser menor a 1."
    }
    else if(values.speed>100){
      error.speed="el valor no puede ser mayor a 100."
    }
    //weight
    if(!values.weight){
      error.weight="El valor no puede estar vacio."
    }
    else if(values.weight<1){
      error.weight="el valor no puede ser menor a 1."
    }
    else if(values.weight>100){
      error.weight="el valor no puede ser mayor a 100."
    }

    //height
    if(!values.height){
      error.height="El valor no puede estar vacio."
    }
    else if(values.height<1){
      error.height="el valor no puede ser menor a 1."
    }
    else if(values.height>100){
      error.height="el valor no puede ser mayor a 100."
    }

    //types
    if (!values.type.length) {
      error.type = "Debes seleccionar al menos un tipo.";
    } 
  //img
  if(!values.image.length){
    values.image=NoImage
  }
    return error;
  }


  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
    }
  }, [error]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    const valor = validaciones({ ...formValues, [name]: value });
    setError(valor);
  };

  console.log(formValues)
  
 
  const handleTypeChange = (e) => {
    const temporalType = e.target.value;
    let valor;
    
    if (e.target.checked) {
      // Agrega el tipo seleccionado
      setFormValues({
        ...formValues,
        type: temporalType,
      });
      valor = validaciones({
        ...formValues,
        type: temporalType,
      });
    } else {
      // Quita el tipo deseleccionado
      setFormValues({
        ...formValues,
        type: "",
      });
      valor = validaciones({
        ...formValues,
        type: "",
      });
    }
  
    setError(valor);
  };

   const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(error).length > 0) {
      alert("Completa todos los campos correctamente!");
    } else {
      axios
        .post("http://localhost:3001/pokemons", formValues)
        .then((res) => alert("Pokemon has been created"))
        .catch((err) => alert(err));
    }
  };
  
  return (
    <div className={styles.containerss}>

       <form className={styles.formContainer} onSubmit={handleSubmit}>
       <div className={styles.divContainer}>
  <h1 className={styles.PoKreate}>Crea tu pokemon!</h1>
  <div className={styles.row}>
    <div className={styles.column}>
      <label htmlFor="name">Nombre:</label>
      <input type="text" name="name" onChange={handleChange} value={formValues.name} maxLength={15}/>
      <p className={styles.errors}>{error.name}</p>
    </div>
    <div className={styles.column}>
      <label htmlFor="attack">Ataque:</label>
      <input type="text" onChange={handleChange} name="attack" value={formValues.attack}/>
      <p className={styles.errors}>{error.attack}</p>
    </div>
  </div>
  <div className={styles.row}>
    <div className={styles.column}>
      <label htmlFor="defense">Defensa:</label>
      <input type="text" onChange={handleChange} name="defense" value={formValues.defense}/>
      <p className={styles.errors}>{error.defense}</p>
    </div>
    <div className={styles.column}>
      <label htmlFor="hp">Puntos de vida:</label>
      <input type="text" onChange={handleChange} name="hp" value={formValues.hp}/>
      <p className={styles.errors}>{error.hp}</p>
    </div>
  </div>
  <div className={styles.row}>
    <div className={styles.column}>
      <label htmlFor="speed">Velocidad:</label>
      <input type="text" onChange={handleChange} name="speed" value={formValues.speed}/>
      <p className={styles.errors}>{error.speed}</p>
    </div>
    <div className={styles.column}>
      <label htmlFor="height">Altura:</label>
      <input type="text" onChange={handleChange} name="height" value={formValues.height}/>
      <p className={styles.errors}>{error.height}</p>
    </div>
  </div>
  <div className={styles.row}>
    <div className={styles.column}>
      <label htmlFor="weight">Peso:</label>
      <input type="number" onChange={handleChange} name="weight" value={formValues.weight}/>
      <p className={styles.errors}>{error.weight}</p>
      <label htmlFor="image">Imagen:</label>
      <input type="text" name="image" onChange={handleChange} value={formValues.image} src={formValues.image? formValues.image: NoImage} />
      <p className={styles.errors}>{error.image}</p>
    </div>
  </div>
  <fieldset className={styles.types}>
        <legend>Tipos:</legend>
        <div>
        {PokemonTypes.map((type) => { 
          return (
            <label htmlFor={type} key={type}>
              <input type="checkbox" name="type" checked={formValues.type === type} value={type} onChange={handleTypeChange}/>
              {type}

            </label>
          )
         })}
        </div>
        <p className={styles.errors}>{error.type}</p>
      </fieldset>
</div>


      {/* submit button */}
      <button className={styles.btn} type="submit">Agregar Pokemon</button>
    </form>
    </div>
  );
}

export default PokemonForm


