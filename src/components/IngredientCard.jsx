import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function IngredientCard({ id, name, path, thumb }) {
  const dispatch = useDispatch();
  const ingredient = pathname.substring(pathname.lastIndexOf('/') + 1);
  let api;
  if (pathname.includes('comidas')) {
    api = 'themealdb';
  } else {
    api = 'thecocktaildb';
  }

  const handleClick = () => {
    const newRecList = await fetchIngredientsFilter(12, api, ingredient);
    // setRecipeList(newRecList);
    // if(pathname.includes('comidas')) {

    // } else {

    // }
  }
  return (
    <div data-testid={ `${id}-ingredient-card` } className="item-card">
      <Link to={ path }>
        {console.log(path, 'ingrecard')}
        <h2 data-testid={ `${id}-card-name` }>{ name }</h2>
        <img src={ thumb } alt={ name } data-testid={ `${id}-card-img` } />
      </Link>
    </div>
  );
}

IngredientCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default IngredientCard;
