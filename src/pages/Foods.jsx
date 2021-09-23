import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import { fetchCategories, fetchRecipes, fetchRecipesByCategory } from '../services/requests';

const Foods = () => {
  const enableSearch = (
    useSelector(({ functionsReducer }) => functionsReducer.enableSearch)
  );

  const [foodsList, setFoodsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  const handleFoodsList = async () => {
    const limit = 12;
    const newFoodsList = await fetchRecipes(limit, 'themealdb');
    setFoodsList(newFoodsList);
  };

  const handleCategoriesList = async () => {
    const newCategoriesList = await fetchCategories('themealdb');
    setCategoriesList(newCategoriesList);
  };

  const handleFetchByCategory = async ({ target }) => {
    const category = target.innerHTML;
    const recipeList = await fetchRecipesByCategory('themealdb', category);
    setFoodsList(recipeList);
  };

  useEffect(() => {
    handleFoodsList();
    handleCategoriesList();
  }, []);

  return (
    <div>
      <Header />
      {enableSearch && <SearchBar />}
      {categoriesList.length > 0 ? (categoriesList.map(({ strCategory }) => (<button type="button" key={ strCategory } onClick={ handleFetchByCategory } data-testid={ `${strCategory}-category-filter` }>{strCategory}</button>))) : <p>loading</p>}
      <div className="item-card-container">
        {foodsList.map(({ idMeal, strMeal, strMealThumb }, index) => (<RecipeCard
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
};

export default Foods;
