import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../styles/doneRecipes.css';

const copy = require('clipboard-copy');

function RecipesDone() {
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [doneRecipes, setDoneRecipes] = useState(recipes);
  const [filters, setFilters] = useState('all');
  const [message, setMessage] = useState();
  const history = useHistory();

  useEffect(() => {
    if (filters === 'all') {
      setDoneRecipes(recipes);
    } else {
      setDoneRecipes(recipes.filter((done) => done.type === filters));
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
    setMessage(true);
    setTimeout(() => {
      setMessage(false);
    }, time);
  };

  const changeRoute = (type, id) => {
    history.push(`/${type}s/${id}`);
  };

  const orig = window.location.origin;

  return (
    <div>
      <Header />
      <div>
        <div className="btns-filter">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ handleClick }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ handleClick }
          >
            Foods
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ handleClick }
          >
            Drinks
          </button>
        </div>
        {doneRecipes ? doneRecipes
          .map(({ id, area, type, category, doneDate, image, name, tags, alcoholicOrNot }, index) => (
            <div key={ index } className="doneRecipe">
              <div>
                <Link to={ `/${type}s/${id}` }>
                  <img
                    src={ image }
                    alt={ name }
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
              </div>
              <div className="items-list">
                <div className="head-done">
                  <div
                    data-testid={ `${index}-horizontal-top-text` }
                    className="top-text"
                  >
                    {type === 'comida'
                      ? <p>{`${area} - ${category}`}</p> : <p>{alcoholicOrNot}</p>}
                  </div>
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
                </div>
                <span hidden={ !message }> Link copiado! </span>
                <button
                  onClick={ () => changeRoute(type, id) }
                  type="button"
                  className="title-btn"
                >
                  <p
                    className="title"
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {name}

                  </p>
                </button>
                <p data-testid={ `${index}-horizontal-done-date` }>
                  {`Feito em: ${doneDate}`}
                </p>
                <div className="tags">
                  {tags[0] ? tags[0].split(',').slice(0, 2).map((item, i) => (
                    <p key={ i } data-testid={ `${i}-${item}-horizontal-tag` }>
                      {item}
                    </p>
                  )) : ''}
                </div>
              </div>
            </div>
          )) : 'loading'}
      </div>
    </div>
  );
}

export default RecipesDone;
