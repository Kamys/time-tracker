import { createActionCreator } from 'common/emitter/utils'

const createAsyncActions = createActionCreator('ELECTRON')

export const ActionsElectronStrings = {
  loadStore: createAsyncActions('LOAD_STORE'),
  loadActivity: createAsyncActions('LOAD_ACTIVITY'),
  addActivity: createAsyncActions('ADD_ACTIVITY')
}
