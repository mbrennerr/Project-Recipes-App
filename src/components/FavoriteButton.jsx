import React, { useEffect, useState } from 'react';
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
    type,
    area,
    category,
    alcoholicOrNot: alcool,
    name,
    image: img,
  };

  useEffect(() => {
    if (localStorage.favoriteRecipes) {
      const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const isFavorite = recipes.some((element) => element.id === id);
      if (isFavorite) {
        setImage(blackHeartIcon);
      }
    }
  }, [id]);

  const handleFavorite = () => {
    if (image === blackHeartIcon) {
      setImage(whiteHeartIcon);
      const favItem = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const favFiltered = favItem.filter((element) => element.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favFiltered));
      localStorage.setItem('img', whiteHeartIcon);
    } if (image === whiteHeartIcon) {
      setImage(blackHeartIcon);
      localStorage.setItem('img', blackHeartIcon);
      if (!localStorage.getItem('favoriteRecipes')) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([favorite]));
      } else {
        const exist = JSON.parse(localStorage.getItem('favoriteRecipes'));
        const arr = [...exist, favorite];
        localStorage.setItem('favoriteRecipes', JSON.stringify(arr));
      }
    }
  };

  return (
    <input
      type="image"
      data-testid="favorite-btn"
      onClick={ handleFavorite }
      src={ image }
      alt="favorite"
    />
  );
}

export default FavoriteButton;
