import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Drinks, Explore, FavoriteRecipes,
  Foods, Login, Profile, RecipesDone, ExploreFoods,
  ExploreDrinks, ExploreIngredients, NotFound } from './pages';
import ExploreFoodsArea from './pages/ExploreFoodsArea';

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
      <Route path="/explorar/comidas/area" component={ ExploreFoodsArea } />
      <Route path="/explorar/bebidas/area" component={ NotFound } />
      <Route path="/explorar/comidas/ingredientes" component={ ExploreIngredients } />
      <Route path="/explorar/bebidas/ingredientes" component={ ExploreIngredients } />
      <Route path="/explorar/comidas" component={ ExploreFoods } />
      <Route path="/explorar/bebidas" component={ ExploreDrinks } />
    </Switch>
  );
}

export default App;
