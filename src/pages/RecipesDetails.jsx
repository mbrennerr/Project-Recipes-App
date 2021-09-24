import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
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
    <article>

      <img
        data-testid="recipe-photo"
        src=""
        alt=""
      />

      <h1 data-testid="recipe-title">
        titulo
      </h1>

      <button data-testid="share-btn" type="button">
        Compartilhar
      </button>

      <button type="button" data-testid="favorite-btn">
        Favoritos
      </button>

      <p data-testid="recipe-category">
        Ctegoria
      </p>

      <h3>
        Ingredients
      </h3>

      <h3>
        Instructions
      </h3>
      <p data-testid="instructions">
        Texto
      </p>
      <div
        data-testid="video"
      >
        <div>
          <button type="button">
            Play
          </button>
        </div>
      </div>

      <div>
        CARD
      </div>

      <button type="button" data-testid="start-recipe-btn">
        Iniciar Receita
      </button>

    </article>
  );
};

RecipesDetails.propTypes = {

};

export default RecipesDetails;
