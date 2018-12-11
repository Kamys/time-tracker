import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as modal } from 'redux-modal'

import entries from 'renderer/entries/reduce'
import { IEntriesState } from 'renderer/entries/model';

export interface IRootState {
    entries: IEntriesState;
}

const appReducers = combineReducers({
    router: routerReducer,
    modal,
    entries,
});

export default appReducers;
