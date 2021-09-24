import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import { fetchDetails } from '../services/requests';

const RecipesDetails = (props) => {
  const [details, setDetails] = useState([]);
  const history = useHistory();

  const handleFecthDetail = async () => {
    const { api, id } = history.location.info;
    console.log(api, id);
    const apiReturn = await fetchDetails(api, id);
    setDetails(apiReturn);
    console.log(details, props);
  };

  useEffect(() => {
    handleFecthDetail();
  }, []);
  return (
    <div>

      <div>
        <img data-testid="recipe-photo" src="" alt="" />
        Image
      </div>
      <div>
        <h1 data-testid="recipe-title">
          title
        </h1>
      </div>
      <div>
        <ShareButton />
      </div>
      <div>
        <FavoriteButton />
      </div>
      <p data-testid="recipe-category">
        Category
      </p>
      <div>
        <h3>
          Ingredients
        </h3>
        <p>ingredientsTex</p>
      </div>
      <div>
        <h3>
          Instructions
        </h3>
        <p data-testid="instructions">
          Instructions Text
        </p>
      </div>
      <div>
        <iframe
          data-testid="video"
          whidth="548"
          height="421"
          src=""
          frameBorder="0"
          title="Youtube Video Player"
        />
      </div>
      <div>
        <h3>Recommended Recipes</h3>
      </div>
      <button type="button" data-testid="start-recipe-btn">
        Iniciar Receita
      </button>

    </div>
  );
};
export default RecipesDetails;
