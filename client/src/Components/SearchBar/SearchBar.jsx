import React from 'react';
import { useDispatch} from 'react-redux'
import { getPokemonsByName, getAllPokemon } from '../../redux/actions'
import styles from './SearchBar.module.css'
  const SearcBar = () => {
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleChange = (event) => {
      if(event.target.value===""){
        dispatch(getAllPokemon())
      }
      setSearchTerm(event.target.value);
    };

    const dispatch = useDispatch();
    const handleSearch = () => {
      dispatch(getPokemonsByName(searchTerm));
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        if(searchTerm.length!==0){
          handleSearch();
        }
        else dispatch((getAllPokemon()));
      }
    };

  return (
    <div>
       <input
        className={styles.input}
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  )
}

export default SearcBar