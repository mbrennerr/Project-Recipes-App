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
    if (path.includes('comidas')) {
      if (progress) {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          cocktails: {
            ...progress.cocktails,
          },
          meals: {
            ...progress.meals,
            [id]: [],
          },
        }));
      } else {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          cocktails: {},
          meals: { [id]: [] },
        }));
      }
    } else if (path.includes('bebidas')) {
      if (progress) {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          cocktails: {
            ...progress.cocktails,
            [id]: [],
          },
          meals: {
            ...progress.meals,
          },
        }));
      } else {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          cocktails: { [id]: [] },
          meals: {},
        }));
      }
    }
    history.push(`${id}/in-progress`);
  };

  let key;
  if(path.includes('comidas')) {
    key = 'meals';
  } else {
    key = 'cocktails'
  }

  const handleButtonText = () => {
    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (progress && progress[key][id]) {
      setRecipeButtonText('Continuar Receita');
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
