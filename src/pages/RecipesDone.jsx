import React, { useEffect, useState } from 'react';
import DoneCards from '../components/DoneCards';
import Header from '../components/Header';
import '../styles/doneRecipes.css';

function RecipesDone() {
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [doneRecipes, setDoneRecipes] = useState(recipes);
  const [filters, setFilters] = useState('all');

  useEffect(() => {
    if (filters === 'all') {
      setDoneRecipes(recipes);
      console.log('all');
    } else {
      setDoneRecipes(recipes.filter((done) => done.type === filters));
      console.log('others');
    }
  }, [filters]);

  const handleClick = ({ target }) => {
    const text = target.innerHTML;
    if (text === 'All') {
      setFilters('all');
    } else if (text === 'Foods') {
      setFilters('comida');
    } else if (text === 'Drinks') {
      setFilters('bebida');
    }
  };

  return (
    <div>
      <Header />
      <div>
        <div className="btns-filter">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ handleClick }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ handleClick }
          >
            Foods
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ handleClick }
          >
            Drinks
          </button>
        </div>
        {doneRecipes
          ? <DoneCards doneRecipes={ doneRecipes } /> : 'Nenhuma receita concluída'}
      </div>
    </div>
  );
}

export default RecipesDone;
