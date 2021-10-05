import React from 'react';

const RecipeHead = ({ title, category }) => (
  <div>
    <h1 data-testid="recipe-title">
      {title}
    </h1>
    <p data-testid="recipe-category">
      {category}
    </p>
  </div>
);

export default RecipeHead;
