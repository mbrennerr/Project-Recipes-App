import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchRandomFood } from '../services/randomsRequests';

function ExploreFoods() {
  const [randomFoodId, setRandomFoodId] = useState(0);

  useEffect(() => {
    fetchRandomFood()
      .then((response) => setRandomFoodId(response.meals[0].idMeal));
  }, []);

  return (
    <div>
      <Header />
      <div className="explore-container">
        <Link
          to="/explorar/comidas/ingredientes"
          data-testid="explore-by-ingredient"
          className="explore-button"
        >
          Por Ingredientes
        </Link>
        <Link
          to="/explorar/comidas/area"
          data-testid="explore-by-area"
          className="explore-button"
        >
          Por Local de Origem
        </Link>
        <Link
          to={ `/comidas/${randomFoodId}` }
          data-testid="explore-surprise"
          className="explore-button"
        >
          Me Surpreenda!
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
