import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ItemCard from '../components/ItemCard';
import { fetchDrinks } from '../services/requests';

function Drinks() {
  const enableSearch = (
    useSelector(({ functionsReducer }) => functionsReducer.enableSearch)
  );

  const [drinksList, setDrinksList] = useState([]);

  const handleDrinksList = async () => {
    const limit = 12;
    const newDrinksList = await fetchDrinks(limit);
    setDrinksList(newDrinksList);
  };

  useEffect(() => {
    handleDrinksList();
  }, []);

  return (
    <div>
      <Header />
      {enableSearch && <SearchBar />}
      <div className="item-card-container">
        {drinksList.map(({ idDrink, strDrink, strDrinkThumb }, index) => (<ItemCard
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
