import React, { useState } from 'react';
import { useLocation } from 'react-router';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton(details) {
  const [image, setImage] = useState(whiteHeartIcon);
  const location = useLocation();
  const path = location.pathname;

  let id;
  let name;
  let img;
  let alcool;
  let area;
  let type;
  let category;

  if (path.includes('comidas')) {
    id = details.details.idMeal;
    name = details.details.strMeal;
    img = details.details.strMealThumb;
    alcool = '';
    area = details.details.strArea;
    type = 'comida';
    category = details.details.strCategory;
  } else {
    id = details.details.idDrink;
    name = details.details.strDrink;
    img = details.details.strDrinkThumb;
    alcool = details.details.strAlcoholic;
    area = '';
    type = 'bebida';
    category = details.details.strCategory;
  }

  const favorite = {
    id,
    name,
    category,
    alcool,
    img,
    type,
    area,
  };

  const arr = [];

  const handleFavorite = () => {
    if (image === blackHeartIcon) {
      setImage(whiteHeartIcon);
    } if (image === whiteHeartIcon) {
      setImage(blackHeartIcon);
      if (!localStorage.getItem('favoriteRecipe')) {
        localStorage.setItem('favoriteRecipe', JSON.stringify(favorite));
      } else {
        const exist = JSON.parse(localStorage.getItem('favoriteRecipe'));
        console.log(exist, 'exist');
        arr.push(exist, favorite);
        // arr.push(favorite);
        console.log(arr, 'arr');
        // localStorage.setItem('favoriteRecipe', JSON.stringify(arr));
      }
    }
  };

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ handleFavorite }
    >
      <img src={ image } alt="share" />
    </button>
  );
}

export default FavoriteButton;
