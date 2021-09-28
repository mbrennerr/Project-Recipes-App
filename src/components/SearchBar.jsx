import React, { useState } from 'react';
import { fetchSearch } from '../services/requests';
import '../styles/search.css';
import { useHistory } from "react-router";

const SearchBar = () => {
  const history = useHistory();
  const initialState = {
    search: '',
    searchCategory: '',
  }
  const [state, setState] = useState(initialState);

  const handleChange = ({ target: { name, value } }) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleClick = async () => {
    const path = history.location.pathname;
    let api;
    const query = state.search;
    const endpoint = state.searchCategory;
    if(path === '/bebidas') {
      api = 'thecocktaildb';
    } else {
      api = 'themealdb';
    }
    if (query.length > 1 && endpoint === "firstLetter") {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    } else if (query !== '' && endpoint !== '') {
      const results = await fetchSearch(query, endpoint, api);
      console.log(results);
    }
    const radioButtons = document.getElementsByName('searchCategory');
    radioButtons.forEach(radio => {
      radio.checked = false;
    });
    setState(initialState);
  }

  return (
    <div className="search-bar">
      <div>
        <input
          placeholder="Busque por uma receita"
          onChange={ handleChange }
          value={ state.search }
          name="search"
          data-testid="search-input"
          type="text"
          className="input-search"
        />
      </div>
      <div>
        <label htmlFor="ingredient-search">
          <input
            onChange={ handleChange }
            value="ingredient"
            name="searchCategory"
            id="ingredient-search"
            data-testid="ingredient-search-radio"
            type="radio"
          />
          Ingrediente
        </label>
        <label htmlFor="name-search">
          <input
            onChange={ handleChange }
            value="name"
            name="searchCategory"
            id="name-search"
            data-testid="name-search-radio"
            type="radio"
          />
          Nome
        </label>
        <label htmlFor="first-letter-search">
          <input
            onChange={ handleChange }
            value="firstLetter"
            name="searchCategory"
            id="first-letter-search"
            data-testid="first-letter-search-radio"
            type="radio"
          />
          Primeira letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={handleClick}
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
