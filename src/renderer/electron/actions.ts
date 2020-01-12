import { createActionCreator } from 'renderer/store/utils'
import { IRootState } from 'common/types/domain'

const createAsyncActions = createActionCreator('ELECTRON')

export const ActionsElectron = {
  loadingStore: createAsyncActions<void, { store: IRootState }>(
    'LOADING_STORE',
  ),
}

export type TypeActionsElectron = typeof ActionsElectron
