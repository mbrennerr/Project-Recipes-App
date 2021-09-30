import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

function StartRecipesBtn({ idUrl }) {
  const history = useHistory();
  const path = history.location.pathname;
  const [recipeButtonText, setRecipeButtonText] = useState('Iniciar Receita');
  const handleClick = () => {
    setRecipeButtonText('Continuar Receita');
    if (path.includes('comidas')) {
      history.push(`/comidas/${idUrl}/in-progress`);
    }
    if (path.includes('bebidas')) {
      history.push(`/bebidas/${idUrl}/in-progress`);
    }
  };

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      onClick={ handleClick }
      className="btn-start"
    >
      { recipeButtonText }
    </button>
  );
}

StartRecipesBtn.propTypes = {
  idUrl: PropTypes.number.isRequired,
};

export default StartRecipesBtn;
