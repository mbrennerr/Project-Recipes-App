import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import FavoriteButton from '../components/FavoriteButton';
import IngredientsList from '../components/IngredientsList';
import RecipeHead from '../components/RecipeHead';
import RecipeImage from '../components/RecipeImage';
import RecipeInstructions from '../components/RecipeInstructions';
import ShareButton from '../components/ShareButton';
import { fetchDetails } from '../services/requests';
import handleIngredientsList from '../utils/handleIngredientsList';

function RecipesInProgress() {
  const [details, setDetails] = useState([]);
  const [loadMessage, setLoadMessage] = useState(false);
  const history = useHistory();
  const firstRender = useRef(true);

  const path = history.location.pathname;
  const id = path.match(/\d+/)[0];
  let api;
  let thumb;
  let title;
  let category;

  if (path.includes('comidas')) {
    api = 'themealdb';
    thumb = 'strMealThumb';
    title = 'strMeal';
    category = 'strCategory';
  } else {
    api = 'thecocktaildb';
    thumb = 'strDrinkThumb';
    title = 'strDrink';
    category = 'strAlcoholic';
  }

  const handleFecthDetails = async () => {
    const apiReturn = await fetchDetails(api, id);
    setDetails(apiReturn);
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      handleFecthDetails();
    }
  });

  if (details.length === 0) return 'loading';
  const listOfIngredients = handleIngredientsList(details[0]);

  return (
    <div>
      <RecipeImage thumb={ details[0][thumb] } />
      <div className="head-details">
        <RecipeHead title={ details[0][title] } category={ details[0][category] } />
        <div className="head-btns">
          <ShareButton setLoadMessage={ setLoadMessage } />
          <FavoriteButton details={ details[0] } />
          <p hidden={ !loadMessage }>Link copiado!</p>
        </div>
      </div>
      <IngredientsList progress testid="ingredient-step" list={ listOfIngredients } />
      <RecipeInstructions instructions={ details[0].strInstructions } />
      <button
        className="btn-start"
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar receita
      </button>
    </div>
  );
}

export default RecipesInProgress;
