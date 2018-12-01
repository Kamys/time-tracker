import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const appReducers = combineReducers({
  router: routerReducer,
});

export default appReducers;
