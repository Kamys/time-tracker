import { createActionCreator } from 'renderer/store/utils'
import { IRootState } from 'common/types/domain'

const createAsyncActions = createActionCreator('ELECTRON')

export const ActionsElectron = {
  loadStore: createAsyncActions<void, { store: IRootState }>(
    'LOAD_STORE',
  ),
  loadActivity: createAsyncActions('LOAD_ACTIVITY'),
  closeApp: createAsyncActions('CLOSE_APP'),
  saveStore: createAsyncActions('SAVE_STORE')
}

export type TypeActionsElectron = typeof ActionsElectron
