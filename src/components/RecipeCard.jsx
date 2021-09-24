import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard({ id, name, path, thumb, recipeId, api }) {
  return (
    <div data-testid={ `${id}-recipe-card` } className="item-card">
      <Link
        to={ {
          pathname: path,
          info: {
            id: recipeId,
            api,
          },
        } }
      >
        <h2 data-testid={ `${id}-card-name` }>{ name }</h2>
        <img src={ thumb } alt={ name } data-testid={ `${id}-card-img` } />
      </Link>
    </div>
  );
}

RecipeCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
  api: PropTypes.string.isRequired,
};

export default RecipeCard;
