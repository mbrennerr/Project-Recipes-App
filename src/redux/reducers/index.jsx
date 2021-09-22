import { combineReducers } from 'redux';
import user from './userReducer';
import functionsReducer from './functionsReducer';

const rootReducer = combineReducers({ user, functionsReducer });

export default rootReducer;
