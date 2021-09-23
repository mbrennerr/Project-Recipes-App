import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Explore() {
  const enableSearch = (
    useSelector(({ functionsReducer }) => functionsReducer.enableSearch)
  );
  return (
    <div>
      <Header />
      {enableSearch && <SearchBar />}
      <div className="explore-container">
        <Link
          to="/explorar/comidas"
          className="explore-button"
          data-testid="explore-food"
        >
          Explorar Comidas
        </Link>
        <Link
          to="/explorar/bebidas"
          className="explore-button"
          data-testid="explore-drinks"
        >
          Explorar Bebidas
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
