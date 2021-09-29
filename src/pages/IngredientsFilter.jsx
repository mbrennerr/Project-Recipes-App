import React, { useEffect, useState, useRef } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { fetchIngredientsFilter } from '../services/requests';

const IngredientsFilter = () => {
  const [recipeList, setRecipeList] = useState([]);
  const firstRender = useRef(true);
  const { pathname } = window.location;
  const ingredient = pathname.substring(pathname.lastIndexOf('/') + 1);
  const limit = 12;
  //  Uso do substring na página: https://stackoverflow.com/questions/60185581/reactjs-get-url-pathname-id

  let api;
  let apiKey;
  let pathVar;
  if (pathname.includes('comidas')) {
    api = 'themealdb';
    apiKey = 'Meal';
    pathVar = 'comidas';
  } else {
    api = 'thecocktaildb';
    apiKey = 'Drink';
    pathVar = 'bebidas';
  }

  const handleRecipeList = async () => {
    const newRecList = await fetchIngredientsFilter(limit, api, ingredient);
    console.log(30);
    setRecipeList(newRecList);
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      handleRecipeList();
    }
  });
  if (recipeList.length === 0) return 'loading';

  return (
    <div>
      {console.log('filter')}
      <Header />
      <div className="item-card-container">
        {recipeList.map((recipe, index) => (<RecipeCard
          key={ recipe[`id${apiKey}`] }
          id={ index }
          name={ recipe[`str${apiKey}`] }
          path={ `${pathVar}/${recipe[`id${apiKey}`]}` }
          thumb={ recipe[`str${apiKey}Thumb`] }
        />))}
      </div>
      <Footer />
    </div>
  );
};

export default IngredientsFilter;
