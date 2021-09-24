import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchRandomDrink } from '../services/randomsRequests';

function ExploreDrinks() {
  const [randomDrinkId, setRandomDrinkId] = useState(0);

  useEffect(() => {
    fetchRandomDrink()
      .then((response) => setRandomDrinkId(response.drinks[0].idDrink));
  });

  return (
    <div>
      <Header />
      <div className="explore-container">
        <Link
          to="/explorar/bebidas/ingredientes"
          data-testid="explore-by-ingredient"
          className="explore-button"
        >
          Por Ingredientes
        </Link>
        <Link
          to={ `/bebidas/${randomDrinkId}` }
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

export default ExploreDrinks;
