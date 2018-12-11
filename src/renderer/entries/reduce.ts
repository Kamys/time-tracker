import { createReducer } from 'redux-act';

import { ActionsEntries } from './actions';
import { mergeArray } from './utils';
import { IEntriesState } from './model';

const initialState: IEntriesState = {
    group: [],
    activity: [],
};

const reducer = createReducer({}, initialState);

reducer.on(ActionsEntries.create.REQUEST, (state, action) => ({
    ...state,
    [action.entryName]: mergeArray(state[action.entryName] || [], action.entry)
}));

reducer.on(ActionsEntries.loading.SUCCESS, (state, action) => ({
    ...state,
    [action.entryName]: action.entry
}));

export default reducer;
