import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router';

function StartRecipesBtn({ idUrl }) {
  const history = useHistory();
  const path = history.location.pathname;
  const [recipeButtonText, setRecipeButtonText] = useState('Iniciar Receita');

  const { id } = useParams();
  const continueRecipe = 'Continuar Receita';

  const doing = {
    id,
  };

  useEffect(() => {
    if (localStorage.inProgress) {
      const recipes = JSON.parse(localStorage.getItem('inProgress'));
      const isInProgress = recipes.some((element) => element.id === id);
      console.log(isInProgress, 'isInProgress');
      if (isInProgress) {
        setRecipeButtonText(continueRecipe);
      }
    }
  }, [id]);

  const handleClick = () => {
    setRecipeButtonText(continueRecipe);
    if (!localStorage.getItem('inProgress')) {
      localStorage.setItem('inProgress', JSON.stringify([doing]));
    } else {
      const exist = JSON.parse(localStorage.getItem('inProgress'));
      const arr = [...exist, doing];
      localStorage.setItem('inProgress', JSON.stringify(arr));
    }
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
