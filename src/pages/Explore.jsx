import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import '../styles/explore.css';

function Explore() {
  const enableSearch = (
    useSelector(({ functionsReducer }) => functionsReducer.enableSearch)
  );

  const history = useHistory();

  const handleExplore = ({ target }) => {
    const text = target.innerHTML;
    if (text === 'Explorar Comidas') {
      history.push('/explorar/comidas');
    }
    if (text === 'Explorar Bebidas') {
      history.push('/explorar/bebidas');
    }
  };

  return (
    <div>
      <Header />
      {enableSearch && <SearchBar />}
      <div className="explore-container">
        <button
          type="button"
          onClick={ handleExplore }
          className="explore-button"
          data-testid="explore-food"
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          onClick={ handleExplore }
          className="explore-button"
          data-testid="explore-drinks"
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
