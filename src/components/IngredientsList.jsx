import React from 'react';
import PropTypes from 'prop-types';

const IngredientsList = ({ testid, list, progress }) => {
  console.log(progress);
  return (
    <div>
      <h3>Ingredients</h3>
      {list.map((item, index) => {
        if (item) {
          return (
            <div key={ index } data-testid={ `${index}-${testid}` }>
              {item}
            </div>);
        }
        return <div key={ index } hidden />;
      })}
    </div>
  );
};

IngredientsList.propTypes = {
  testid: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  progress: PropTypes.bool.isRequired,
};

export default IngredientsList;
