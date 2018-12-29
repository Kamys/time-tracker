import { createReducer } from 'redux-act';

import { findReplace } from 'main/utils';

import { ActionsEntries } from './actions';
import { mergeArray } from './utils';
import { EntriesType, IEntriesState } from './model';

const initialState: IEntriesState = {
    group: [],
    activity: [],
};

const reducer = createReducer({}, initialState);

const changeEntity = (state: IEntriesState, entityName: EntriesType,  replacement) => ({
    ...state,
    [entityName]: replacement(state[entityName]),
})

reducer.on(ActionsEntries.create.REQUEST, (state, payload) => ({
    ...state,
    [payload.entityName]: mergeArray(state[payload.entityName] || [], payload.entity)
}));

reducer.on(ActionsEntries.loading.SUCCESS, (state, payload) => ({
    ...state,
    [payload.entityName]: payload.entity
}));

reducer.on(ActionsEntries.change.REQUEST, (state, payload) => {
    const {id, entityName, ...newProps} = payload;
    const predicate = entity => entity.id === id;
    const replacement = entity => ({
        ...entity,
        ...newProps,
    })
    const notFound = () => console.log(`Failed find ${entityName} with id = ${id}`)

    return changeEntity(state, entityName, entries => {
        return findReplace(entries, predicate, replacement, notFound)
    })
});

export default reducer;
