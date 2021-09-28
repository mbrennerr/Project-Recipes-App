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

function Drinks() {
  const enableSearch = (
    useSelector(({ functionsReducer }) => functionsReducer.enableSearch)
  );

  const [drinksList, setDrinksList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([{ strCategory: 'All' }]);
  const [filterCategory, setFilterCategory] = useState('');
  const firstRender = useRef(true);

  const handleDrinksList = async () => {
    const limit = 12;
    const newDrinksList = await fetchRecipes(limit, 'thecocktaildb');
    setDrinksList(newDrinksList);
  };

  const handleCategoriesList = async () => {
    const newCategoriesList = await fetchCategories('thecocktaildb', 'c');
    setCategoriesList([...categoriesList, ...newCategoriesList]);
  };

  const handleFetchByCategory = async (category) => {
    const recipeList = await fetchRecipesByCategory('thecocktaildb', category);
    setDrinksList(recipeList);
  };

  const handleFilter = ({ target }) => {
    const category = target.innerHTML;
    if (category === 'All') {
      handleDrinksList();
    } else if (filterCategory !== category) {
      handleFetchByCategory(category);
      setFilterCategory(category);
    } else {
      handleDrinksList();
      setFilterCategory('');
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      handleDrinksList();
      handleCategoriesList();
    }
  });

  return (
    <div>
      <Header />
      {enableSearch && <SearchBar />}
      <div className="category-list">
        {!enableSearch && (categoriesList.length > 1 ? (
          categoriesList.map(({ strCategory }) => (
            <button
              type="button"
              key={ strCategory }
              onClick={ handleFilter }
              data-testid={ `${strCategory}-category-filter` }
            >
              {strCategory}
            </button>)))
          : <p>loading</p>)}
      </div>
      <div className="item-card-container">
        {drinksList.map(({ idDrink, strDrink, strDrinkThumb }, index) => (<RecipeCard
          key={ idDrink }
          recipeId={ idDrink }
          id={ index }
          name={ strDrink }
          path={ `bebidas/${idDrink}` }
          api="thecocktaildb"
          thumb={ strDrinkThumb }
        />))}
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
