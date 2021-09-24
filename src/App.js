import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Foods from './pages/Foods';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipesDone from './pages/RecipesDone';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreIngredients from './pages/ExploreIngredients';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/Comidas" component={ Foods } />
      <Route exact path="/Bebidas" component={ Drinks } />
      <Route exact path="/Explorar" component={ Explore } />
      <Route exact path="/Perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ RecipesDone } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route path="/explorar/comidas/ingredientes" component={ ExploreIngredients } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route path="/explorar/bebidas/ingredientes" component={ ExploreIngredients } />
    </Switch>
  );
}

export default App;
