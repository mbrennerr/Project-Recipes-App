import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import { fetchDetails, fetchRecipes } from '../services/requests';

const RecipesDetails = () => {
  const [details, setDetails] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const history = useHistory();
  const firstRender = useRef(true);

  const path = history.location.pathname;
  const id = path.match(/\d+/)[0];
  let api;
  let api2;
  let thumb;
  let recipeThumb;
  let title;
  let strRecipe;
  let category;

  if (path.includes('comidas')) {
    api = 'themealdb';
    api2 = 'thecocktaildb';
    thumb = 'strMealThumb';
    recipeThumb = 'strDrinkThumb';
    strRecipe = 'strDrink';
    title = 'strMeal';
    category = 'strCategory';
  } else {
    api = 'thecocktaildb';
    api2 = 'themealdb';
    thumb = 'strDrinkThumb';
    recipeThumb = 'strMealThumb';
    strRecipe = 'strMeal';
    title = 'strDrink';
    category = 'strAlcoholic';
  }

  const handleFecthDetail = async () => {
    const apiReturn = await fetchDetails(api, id);
    setDetails(apiReturn);
  };

  const handleFecthRecipes = async () => {
    const numberOfRecipes = 6;
    const apiReturn = await fetchRecipes(numberOfRecipes, api2);
    setRecipes(apiReturn);
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      handleFecthDetail();
      handleFecthRecipes();
    }
  });
  if (details.length === 0) return 'loading';
  return (
    <div>

      <div>
        <img data-testid="recipe-photo" src={ details[0][thumb] } alt="img" />
      </div>
      <div>
        <h1 data-testid="recipe-title">
          {details[0][title]}
        </h1>
      </div>
      <div>
        <ShareButton />
      </div>
      <div>
        <FavoriteButton />
      </div>
      <p data-testid="recipe-category">
        {details[0][category]}
      </p>
      <div>
        <h3>
          Ingredients
        </h3>
        <ul>
          {Object.keys(details[0])
            .filter((key) => key.includes('Ingredient'))
            .map((ingredient, index) => {
              const measure = details[0][`strMeasure${index + 1}`];
              let stringMeasure = `- ${measure}`;
              if (measure === null) {
                stringMeasure = '';
              }
              return details[0][ingredient] !== '' && details[0][ingredient] !== null ? (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${details[0][ingredient]} ${stringMeasure}`}
                </li>) : undefined;
            })}
        </ul>
      </div>
      <div>
        <h3>
          Instructions
        </h3>
        <p data-testid="instructions">
          {details[0].strInstructions}
        </p>
      </div>
      <div>
        <iframe
          data-testid="video"
          whidth="548"
          height="421"
          src={ details[0].strYoutube }
          frameBorder="0"
          title="Youtube Video Player"
        />
      </div>
      <div>
        <h3>Recommended Recipes</h3>
        {recipes.map((recipe, index) => (
          <div data-testid={ `${index}-recomendation-card` } key={ recipe[strRecipe] }>
            <p>{recipe[strRecipe]}</p>
            <img src={ recipe[recipeThumb] } alt={ recipe[strRecipe] } />
          </div>
        ))}
      </div>
      <button type="button" data-testid="start-recipe-btn">
        Iniciar Receita
      </button>

    </div>
  );
};
export default RecipesDetails;
