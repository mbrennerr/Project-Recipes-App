import React from 'react';

const IngredientsList = ({ testid, list, progress }) => (
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

export default IngredientsList;
