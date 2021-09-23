import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ItemCard({ name, thumb, path }) {
  return (
    <div>
      <Link to={ path }>
        <h3>{ name }</h3>
        <img src={ thumb } alt={ name } />
      </Link>
    </div>
  );
}

ItemCard.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default ItemCard;
