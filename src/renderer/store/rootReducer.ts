import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as modal } from 'redux-modal'

const appReducers = combineReducers({
    router: routerReducer,
    modal,
});

export default appReducers;
