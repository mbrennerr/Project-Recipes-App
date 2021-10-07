import React, { useEffect, useState } from 'react';
import SmallRecipeCard from '../components/SmallRecipeCard';
import Header from '../components/Header';
import '../styles/doneRecipes.css';
import Filters from '../components/Filters';

function RecipesDone() {
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [doneRecipes, setDoneRecipes] = useState(recipes);
  const [filters, setFilters] = useState('all');

  useEffect(() => {
    if (filters === 'all') {
      setDoneRecipes(recipes);
    } else {
      setDoneRecipes(recipes.filter((done) => done.type === filters));
    }
  }, [filters]);

  return (
    <div>
      <Header />
      <div>
        <Filters setFilters={ setFilters } />
        {doneRecipes ? (
          <SmallRecipeCard
            isFavoritePage={ false }
            recipes={ doneRecipes }
          />)
          : 'Nenhuma receita concluída'}
      </div>
    </div>
  );
}

export default RecipesDone;
