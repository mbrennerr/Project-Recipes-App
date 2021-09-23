import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import { fetchCategories, fetchRecipes, fetchRecipesByCategory } from '../services/requests';

function Drinks() {
  const enableSearch = (
    useSelector(({ functionsReducer }) => functionsReducer.enableSearch)
  );

  const [drinksList, setDrinksList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  const handleDrinksList = async () => {
    const limit = 12;
    const newDrinksList = await fetchRecipes(limit, 'thecocktaildb');
    setDrinksList(newDrinksList);
  };

  const handleCategoriesList = async () => {
    const newCategoriesList = await fetchCategories('thecocktaildb');
    setCategoriesList(newCategoriesList);
  };

  const handleFetchByCategory = async ({ target }) => {
    const category = target.innerHTML;
    const recipeList = await fetchRecipesByCategory('thecocktaildb', category);
    setDrinksList(recipeList);
  };

  useEffect(() => {
    handleDrinksList();
    handleCategoriesList();
  }, []);

  return (
    <div>
      <Header />
      {enableSearch && <SearchBar />}
      {categoriesList.length > 0 ? (categoriesList.map(({ strCategory }) => (<button type="button" key={ strCategory } onClick={ handleFetchByCategory } data-testid={ `${strCategory}-category-filter` }>{strCategory}</button>))) : <p>loading</p>}
        {/* {categoriesList.map(({ strCategory }) => (<button type="button" key={ strCategory } onClick={ handleFetchByCategory } data-testid={ `${strCategory}-category-filter` }>{strCategory}</button>))} */}
      <div className="item-card-container">
        {drinksList.map(({ idDrink, strDrink, strDrinkThumb }, index) => (<RecipeCard
          key={ idDrink }
          id={ index }
          name={ strDrink }
          path={ `comidas/${idDrink}` }
          thumb={ strDrinkThumb }
        />))}
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
