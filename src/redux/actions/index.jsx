export const LOGIN = 'LOGIN';
export const ENABLE_DISABLE_SEARCH_BAR = 'ENABLE_DISABLE_SEARCH_BAR';
export const ENABLE_BUTTON = 'ENABLE_BUTTON';
export const DISABLE_BUTTON = 'DISABLE_BUTTON';

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
