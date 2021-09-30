import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import StartRecipesBtn from '../components/StartRecipesBtn';
import { fetchDetails, fetchRecipes } from '../services/requests';
import '../styles/itemCard.css';

function RecipesDetails() {
  const [details, setDetails] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loadMessage, setLoadMessage] = useState(false);
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
  let idItem;

  if (path.includes('comidas')) {
    api = 'themealdb';
    api2 = 'thecocktaildb';
    thumb = 'strMealThumb';
    recipeThumb = 'strDrinkThumb';
    strRecipe = 'strDrink';
    title = 'strMeal';
    category = 'strCategory';
    idItem = 'idMeal';
  } else {
    api = 'thecocktaildb';
    api2 = 'themealdb';
    thumb = 'strDrinkThumb';
    recipeThumb = 'strMealThumb';
    strRecipe = 'strMeal';
    title = 'strDrink';
    category = 'strAlcoholic';
    idItem = 'idDrink';
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
  const player = details[0].strYoutube;
  let change;
  if (path.includes('comidas')) {
    change = player.replace('watch?v=', 'embed/');
  }

  const idUrl = details[0][idItem];

  return (
    <div>

      <div className="img-details">
        <img data-testid="recipe-photo" src={ details[0][thumb] } alt="img" />
      </div>
      <div className="head-details">
        <div>
          <h1 data-testid="recipe-title">
            {details[0][title]}
          </h1>
          <p data-testid="recipe-category">
            {details[0][category]}
          </p>
        </div>
        <div className="head-btns">
          <ShareButton setLoadMessage={ setLoadMessage } />
          <FavoriteButton />
          <p hidden={ !loadMessage }>Link copiado!</p>
        </div>
      </div>
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
      {path.includes('comidas')
      && (
        <div className="player-video" id="teste">
          <iframe
            data-testid="video"
            whidth="360"
            height="300"
            src={ change }
            frameBorder="0"
            title="Youtube Video Player"
          />
        </div>
      )}
      <div className="recomended">
        <h3>Recommended Recipes</h3>
        <div className="item-card-cont-details">
          {recipes.map((recipe, index) => (
            <div
              className="item-card-recomend"
              data-testid={ `${index}-recomendation-card` }
              key={ recipe[strRecipe] }
            >
              <p data-testid={ `${index}-recomendation-title` }>{recipe[strRecipe]}</p>
              <img src={ recipe[recipeThumb] } alt={ recipe[strRecipe] } />
            </div>
          ))}
        </div>
      </div>
      <div className="btn-start-div">
        <StartRecipesBtn idUrl={ idUrl } />
      </div>
    </div>
  );
}
export default RecipesDetails;
