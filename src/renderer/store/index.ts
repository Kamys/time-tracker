import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const history         = createBrowserHistory();
const sagaMiddleware  = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(routeMiddleware, sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export {store, history};
