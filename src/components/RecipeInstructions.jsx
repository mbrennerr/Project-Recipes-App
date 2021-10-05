import React from 'react';

const RecipeInstructions = ({ instructions }) => (
  <div>
    <h3>
      Instructions
    </h3>
    <p data-testid="instructions">
      {instructions}
    </p>
  </div>
);

export default RecipeInstructions;
