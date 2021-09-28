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

  const handleFecthDetail = async () => {
    const { api, id } = history.location.info;
    const apiReturn = await fetchDetails(api, id);
    setDetails(apiReturn);
  };

  const handleFecthRecipes = async () => {
    const { api } = history.location.info;
    const numberOfRecipes = 6;
    const apiReturn = await fetchRecipes(numberOfRecipes, api);
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
        <img data-testid="recipe-photo" src={ details[0].strMealThumb } alt="img" />
      </div>
      <div>
        <h1 data-testid="recipe-title">
          {details[0].strMeal}
        </h1>
      </div>
      <div>
        <ShareButton />
      </div>
      <div>
        <FavoriteButton />
      </div>
      <p data-testid="recipe-category">
        {details[0].strCategory}
      </p>
      <div>
        <h3>
          Ingredients
        </h3>
        <ul>
          {Object.keys(details[0])
            .filter((key) => key.includes('Ingredient'))
            .map((ingredient, index) => (
              details[0][ingredient] !== '' ? (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${details[0][ingredient]} - ${details[0][`strMeasure${index + 1}`]}`}
                </li>) : undefined))}
        </ul>
      </div>
      <div>
        <h3>
          Instructions
        </h3>
        <p data-testid="instructions">
          Instructions Text
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
        {recipes.map((recipe) => (
          <div key={ recipe.strMeal }>
            <p>{recipe.strMeal}</p>
            <img src={ recipe.strMealThumb } alt={ recipe.strMeal } />
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
