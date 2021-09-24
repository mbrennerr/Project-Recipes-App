import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import {
  fetchCategories,
  fetchRecipes,
  fetchRecipesByCategory,
} from '../services/requests';

const Foods = () => {
  const enableSearch = (
    useSelector(({ functionsReducer }) => functionsReducer.enableSearch)
  );

  const [foodsList, setFoodsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([{ strCategory: 'All' }]);
  const [filterCategory, setFilterCategory] = useState('');
  const firstRender = useRef(true);

  const handleFoodsList = async () => {
    const limit = 12;
    const newFoodsList = await fetchRecipes(limit, 'themealdb');
    setFoodsList(newFoodsList);
  };

  const handleCategoriesList = async () => {
    const newCategoriesList = await fetchCategories('themealdb');
    setCategoriesList(categoriesList.concat(newCategoriesList));
  };

  const handleFetchByCategory = async (category) => {
    const recipeList = await fetchRecipesByCategory('themealdb', category);
    setFoodsList(recipeList);
  };

  const handleFilter = ({ target }) => {
    const category = target.innerHTML;
    if (category === 'All') {
      handleFoodsList();
    } else if (filterCategory !== category) {
      handleFetchByCategory(category);
      setFilterCategory(category);
    } else {
      setFilterCategory('');
      handleFoodsList();
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      handleFoodsList();
      handleCategoriesList();
    }
  });

  return (
    <div>
      <Header />
      {enableSearch && <SearchBar />}
      {categoriesList.length > 1 ? (
        categoriesList.map(({ strCategory }) => (
          <button
            type="button"
            key={ strCategory }
            onClick={ handleFilter }
            data-testid={ `${strCategory}-category-filter` }
          >
            {strCategory}
          </button>)))
        : <p>loading</p>}
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
