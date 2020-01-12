import { createSelector } from 'reselect'
import { find } from 'lodash/fp'

import { EntriesType, IRootState } from 'common/types/domain'

export const getEntries = (state: IRootState, name: EntriesType) =>
  state.entries[name]

export const getEntity = (
  state: IRootState,
  name: EntriesType,
  entityId: string,
) =>
  createSelector(() => getEntries(state, name), find({ id: entityId }))(state)
