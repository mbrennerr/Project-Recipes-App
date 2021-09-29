import { SET_DRINK_LIST, SET_FOOD_LIST, SET_RECIPE_LIST } from '../actions';

const INITIAL_STATE = {
  recipeList: [],
  foodList: [],
  drinkList: [],
};

const recipes = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SET_RECIPE_LIST:
    return {
      ...state,
      recipeList: payload,
    };
  case SET_DRINK_LIST:
    return {
      ...state,
      drinkList: payload,
    };
  case SET_FOOD_LIST:
    return {
      ...state,
      foodList: payload,
    };
  default:
    return state;
  }
};

export default recipes;
