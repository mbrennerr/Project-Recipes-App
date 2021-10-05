import React from 'react';

const RecipeImage = ({ thumb }) => (
  <div className="img-details">
    <img data-testid="recipe-photo" src={ thumb } alt="img" />
  </div>
);

export default RecipeImage;
