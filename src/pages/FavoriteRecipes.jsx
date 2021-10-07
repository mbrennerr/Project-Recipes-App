import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FavoriteButton from '../components/FavoriteButton';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const favoritesRecipes = JSON
    .parse(localStorage.getItem('favoriteRecipes'));

  const [loadMessage, setLoadMessage] = useState(false);
  const [favorites, setFavorites] = useState(favoritesRecipes);
  const [filters, setFilters] = useState('all');

  const orig = window.location.origin;

  useEffect(() => {
    if (filters === 'all') {
      setFavorites(favoritesRecipes);
    } else {
      setFavorites(favoritesRecipes.filter((done) => done.type === filters));
    }
  }, [filters]);

  const handleClick = ({ target }) => {
    const text = target.innerHTML;
    if (text === 'All') {
      setFilters('all');
    } else if (text === 'Foods') {
      setFilters('comida');
    } else if (text === 'Drinks') {
      setFilters('bebida');
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

  const reloadFavorites = () => {
    setFavorites(JSON
      .parse(localStorage.getItem('favoriteRecipes')));
  };

  if (!favorites) {
    return (
      <div>
        <Header />
        <p>Opa, nenhuma receita favoritada!</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ handleClick }
        >
          Foods
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ handleClick }
        >
          Drinks
        </button>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ handleClick }
        >
          All
        </button>
      </div>
      {favorites
        .map((favorite, index) => (
          <div
            key={ index }
          >
            <div>
              <Link to={ `/${favorite.type}s/${favorite.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ favorite.image }
                  alt="imagem"
                />
              </Link>
            </div>
            <div>
              <span data-testid={ `${index}-horizontal-top-text` }>
                { `${favorite.alcoholicOrNot ? favorite.alcoholicOrNot
                  : favorite.area} - ${favorite.category}` }
              </span>
              <Link to={ `/${favorite.type}s/${favorite.id}` }>
                <h3 data-testid={ `${index}-horizontal-name` }>{ favorite.name }</h3>
              </Link>
              <div className="head-btns">
                <input
                  type="image"
                  className="share-btn"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => {
                    (copy(`${orig}/${favorite.type}s/${favorite.id}`));
                    changeMessage(index);
                  } }
                  src={ shareIcon }
                  alt="share"
                />
                <FavoriteButton
                  handleReload={ reloadFavorites }
                  testid={ `${index}-horizontal-favorite-btn` }
                  isFavoritePage
                  details={ favorite }
                />
                <p hidden={ !loadMessage }>Link copiado!</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default FavoriteRecipes;
