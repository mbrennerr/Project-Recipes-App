import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';

function StartRecipesBtn() {
  const history = useHistory();
  const path = history.location.pathname;
  const [recipeButtonText, setRecipeButtonText] = useState('Iniciar Receita');
  const firstRender = useRef(true);

  const { id } = useParams();

  const handleClick = () => {
    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (path.includes('comidas') && !progress.meals[id]) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {
          ...progress.cocktails,
        },
        meals: {
          ...progress.meals,
          [id]: [],
        },
      }));
    } else if (path.includes('bebidas') && !progress.cocktails[id]) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {
          ...progress.cocktails,
          [id]: [],
        },
        meals: {
          ...progress.meals,
        },
      }));
    }
    history.push(`${id}/in-progress`);
  };

  const handleButtonText = () => {
    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (progress) {
      if ((progress.meals[id] || progress.cocktails[id])
       && (progress.meals[id] !== progress.cocktails[id])) {
        setRecipeButtonText('Continuar Receita');
      }
    } else if (path.includes('comidas')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: { [id]: [] },
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: { [id]: [] },
        meals: {},
      }));
    }
  };

  useEffect(() => {
    if (firstRender.current) handleButtonText();
    else firstRender.current = false;
  });

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      onClick={ handleClick }
      className="btn-start"
    >
      {recipeButtonText}
    </button>
  );
}

export default StartRecipesBtn;
