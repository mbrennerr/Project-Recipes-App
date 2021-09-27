import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { fetchIngredientsFilter } from '../services/requests';

const IngredientsFilter = () => {
  const [recipeList, setRecipeList] = useState([]);
  const { pathname } = window.location;
  const ingredient = pathname.substring(pathname.lastIndexOf('/') + 1);
  const limit = 12;
  //  Uso do substring na página: https://stackoverflow.com/questions/60185581/reactjs-get-url-pathname-id

  useEffect(() => {
    const handleFoodIngredientFilter = async () => {
      const newRecList = await fetchIngredientsFilter(limit, 'themealdb', ingredient);
      setRecipeList(newRecList);
    };

    const handleDrinkIngredientFilter = async () => {
      const newRecList = await fetchIngredientsFilter(limit, 'thecocktaildb', ingredient);
      setRecipeList(newRecList);
    };

    if (pathname.includes('/explorar/comidas')) {
      handleFoodIngredientFilter();
    } else {
      handleDrinkIngredientFilter();
    }
  }, [ingredient, pathname]);

  if (pathname.includes('/explorar/comidas')) {
    return (
      <div>
        <Header />
        <div className="item-card-container">
          {recipeList.map(({ idMeal, strMeal, strMealThumb }, index) => (<RecipeCard
            key={ idMeal }
            id={ index }
            name={ strMeal }
            path={ `comidas/${idMeal}` }
            thumb={ strMealThumb }
          />))}
        </div>
        <Footer />
      </div>
    );
  } return (
    <div>
      <Header />
      <div className="item-card-container">
        {recipeList.map(({ idDrink, strDrink, strDrinkThumb }, index) => (<RecipeCard
          key={ idDrink }
          id={ index }
          name={ strDrink }
          path={ `bebidas/${idDrink}` }
          thumb={ strDrinkThumb }
        />))}
      </div>
      <Footer />
    </div>
  );
};

export default IngredientsFilter;
