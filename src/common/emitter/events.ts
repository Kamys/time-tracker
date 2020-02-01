import { createActionCreator } from 'common/emitter/utils'

const createAsyncActions = createActionCreator('ELECTRON')

export const ActionsElectronStrings = {
  loadStore: createAsyncActions('LOAD_STORE'),
  loadActivity: createAsyncActions('LOAD_ACTIVITY'),
  closeApp: createAsyncActions('CLOSE_APP'),
  saveStore: createAsyncActions('SAVE_STORE'),
  addActivity: createAsyncActions('ADD_ACTIVITY')
}
