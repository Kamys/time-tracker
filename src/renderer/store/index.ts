import createHistory from "history/createBrowserHistory";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "react-router-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import {saveStore} from "renderer/electron/events";

const history         = createHistory();
const sagaMiddleware  = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(routeMiddleware, sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

setInterval(() => {
    saveStore(store.getState())
}, 5 * 1000)

export {store, history};
