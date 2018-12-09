import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as modal } from 'redux-modal'

import entries from 'renderer/entries/reduce'
import { IGroup } from 'renderer/groups/model';

export interface IRootState {
    entries: {
        groups: IGroup[],
    }
}

const appReducers = combineReducers({
    router: routerReducer,
    modal,
    entries,
});

export default appReducers;
