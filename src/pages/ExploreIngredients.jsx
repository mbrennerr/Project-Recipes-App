import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import { fetchIngredients } from '../services/requests';

function ExploreIngredients() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const { pathname } = window.location;

  const handleIngredientsFoodList = async () => {
    const limit = 12;
    const IngredientsList = await fetchIngredients(limit, 'themealdb');
    setIngredientsList(IngredientsList);
  };

  const handleIngredientsDrinkList = async () => {
    const limit = 12;
    const IngredientsList = await fetchIngredients(limit, 'thecocktaildb');
    setIngredientsList(IngredientsList);
  };

  useEffect(() => {
    if (pathname === '/explorar/comidas/ingredientes') {
      handleIngredientsFoodList();
    } else {
      handleIngredientsDrinkList();
    }
  }, [pathname]);

  if (pathname === '/explorar/comidas/ingredientes') {
    return (
      <div>
        <Header />
        <div className="item-card-container">
          {ingredientsList.map(({ strIngredient }, index) => (<IngredientCard
            key={ strIngredient }
            id={ index }
            name={ strIngredient }
            path={ `ingredientes/${strIngredient}` }
            thumb={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
          />))}
        </div>
        <Footer />
      </div>
    );
  } return (
    <div>
      <Header />
      <div className="item-card-container">
        {ingredientsList.map(({ strIngredient1 }, index) => (<IngredientCard
          key={ strIngredient1 }
          id={ index }
          name={ strIngredient1 }
          path={ `ingredientes/${strIngredient1}` }
          thumb={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
        />))}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreIngredients;
