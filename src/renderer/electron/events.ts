import electron from './importElectron'
import { store as reduxStore } from 'renderer/store'
import { IActivity, IRootState } from 'common/types/domain'
import { ActionsElectronStrings } from 'common/emitter/events'
import emitter from 'src/common/emitter'

const { ipcRenderer } = electron

const rendererEmitter = emitter.createEmitter({
  on: (...args) => ipcRenderer.on(...args),
  send: (...args) => ipcRenderer.send(...args),
  actions: ActionsElectronStrings,
})

export const subscribeUpdateActivity = (cb: (activity: IActivity) => void) => {
  rendererEmitter.handle('addActivity', async ({ payload }) => {
    cb(payload)
  })
  return () => {}
}

export const loadStore = async () => {
  return rendererEmitter.handleSend('loadStore')
}

export const getActivities = () => {
  return rendererEmitter.handleSend('loadActivity')
}
