import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import FavoriteButton from '../components/FavoriteButton';
import { fetchDetails } from '../services/requests';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const favoritesRecipes = JSON
    .parse(localStorage.getItem('favoriteRecipes'));
  const [loadMessage, setLoadMessage] = useState(false);
  const history = useHistory();

  const orig = window.location.origin;

  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    if (favoritesRecipes) setFavorites(favoritesRecipes);
  }, []);

  const handleFilter = ({ target }) => {
    const category = target.innerHTML;
    if (category !== 'All') {
      const foods = category === 'Food' ? favorites
        .filter((favorite) => favorite.type === 'comida') : favorites;
      setFavorites(foods);
      const drinks = category === 'Drinks' ? favorites
        .filter((favorite) => favorite.type === 'bebida') : favorites;
      setFavorites(drinks);
    } else {
      setFavorites(favoritesRecipes);
    }
  };

  const changeMessage = (index) => {
    console.log(index);
    const time = 2000;
    setLoadMessage(true);
    setTimeout(() => {
      setLoadMessage(false);
    }, time);
  };

  const path = history.location.pathname;
  let api;

  if (path.includes('comidas')) {
    api = 'themealdb';
  } else {
    api = 'thecocktaildb';
  }

  const handleFecthDetail = async (id) => {
    const apiReturn = await fetchDetails(api, id);
    return apiReturn;
  };
  return (
    <div>
      <Header />
      <div>
        <button type="button" onClick={ handleFilter }>Food</button>
        <button type="button" onClick={ handleFilter }>Drinks</button>
        <button type="button" onClick={ handleFilter }>All</button>
      </div>
      {favorites
        .map(({ image, name, category, id, type }, index) => (
          <div
            key={ index }
          >
            <div>
              <img src={ image } alt="imagem" />
            </div>
            <div>
              <span>{ category }</span>
              <h3>{ name }</h3>
              <div className="head-btns">
                <input
                  type="image"
                  className="share-btn"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => {
                    (copy(`${orig}/${type}s/${id}`));
                    changeMessage(index);
                  } }
                  src={ shareIcon }
                  alt="share"
                />
                <FavoriteButton details={ handleFecthDetail(id) } />
                <p hidden={ !loadMessage }>Link copiado!</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default FavoriteRecipes;
