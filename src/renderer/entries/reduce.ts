import { createReducer } from 'redux-act';

import { ActionsEntries } from './actions';
import { mergeArray } from './utils';

const initialState = {
    groups: [],
};

const reducer = createReducer({}, initialState);

reducer.on(ActionsEntries.create.REQUEST, (state, action) => ({
    ...state,
    [action.entryName]: mergeArray(state[action.entryName] || [], action.entry)
}));

export default reducer;
