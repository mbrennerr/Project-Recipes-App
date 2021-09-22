import { ENABLE_DISABLE_SEARCH_BAR, ENABLE_BUTTON } from '../actions';

const initialState = {
  enableSearch: false,
  enableButton: false,
};

const functionsReducer = (state = initialState, { type, change }) => {
  switch (type) {
  case ENABLE_DISABLE_SEARCH_BAR:
    return { ...state, enableSearch: !state.enableSearch };
  case ENABLE_BUTTON:
    return { ...state, enableButton: change };
  default:
    return state;
  }
};

export default functionsReducer;
