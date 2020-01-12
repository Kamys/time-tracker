import { createReducer } from 'redux-act'

import { findReplace } from 'common/utils'

import { ActionsEntries } from './actions'
import { mergeArray, removeItem } from './utils'
import { EntriesType, IEntity, IEntriesState } from 'common/types/domain'

const initialState: IEntriesState = {
  group: [],
  activity: [],
}

const reducer = createReducer({}, initialState)

type TypeReplacement = (item: IEntity[]) => IEntity[]
const changeEntity = (
  state: IEntriesState,
  entityName: EntriesType,
  replacement: TypeReplacement,
) => ({
  ...state,
  [entityName]: replacement(state[entityName]),
})

reducer.on(ActionsEntries.create.REQUEST, (state, payload) => ({
  ...state,
  [payload.entityName]: mergeArray(
    state[payload.entityName] || [],
    payload.entity,
  ),
}))

reducer.on(ActionsEntries.loading.SUCCESS, (state, payload) => ({
  ...state,
  [payload.entityName]: payload.entity,
}))

reducer.on(ActionsEntries.change.REQUEST, (state, payload) => {
  const { id, entityName, ...newProps } = payload
  const predicate = entity => entity.id === id
  const replacement = entity => ({
    ...entity,
    ...newProps,
  })
  const notFound = () =>
    console.log(`Failed find ${entityName} with id = ${id}`)

  return changeEntity(state, entityName, entries => {
    return findReplace(entries, predicate, replacement, notFound)
  })
})

reducer.on(ActionsEntries.remove.REQUEST, (state, payload) => {
  const { entityId, entityName } = payload

  return changeEntity(state, entityName, entries => {
    return removeItem(entries, entity => entity.id === entityId)
  })
})

export default reducer
