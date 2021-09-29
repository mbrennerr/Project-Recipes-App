export const LOGIN = 'LOGIN';
export const ENABLE_DISABLE_SEARCH_BAR = 'ENABLE_DISABLE_SEARCH_BAR';
export const ENABLE_BUTTON = 'ENABLE_BUTTON';
export const DISABLE_BUTTON = 'DISABLE_BUTTON';
export const SET_RECIPE_LIST = 'SET_RECIPE_LIST';
export const SET_DRINK_LIST = 'SET_DRINK_LIST';
export const SET_FOOD_LIST = 'SET_FOOD_LIST';

export const setUserEmail = (email) => ({
  type: LOGIN, email,
});

export const enableSearchBar = (change) => ({
  type: ENABLE_DISABLE_SEARCH_BAR, change,
});

export const enableButton = (change) => ({
  type: ENABLE_BUTTON, change,
});

export const disableButton = () => ({
  type: DISABLE_BUTTON,
});

export const setRecipeList = (payload) => ({
  type: SET_RECIPE_LIST,
  payload,
});

export const setFoodList = (payload) => ({
  type: SET_FOOD_LIST,
  payload,
});

export const setDrinkList = (payload) => ({
  type: SET_DRINK_LIST,
  payload,
});
