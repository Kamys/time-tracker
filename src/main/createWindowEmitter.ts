import { BrowserWindow, ipcMain } from 'electron'
import emitter from 'src/common/emitter'
import { ActionsElectronStrings } from 'common/emitter/events'

const createWindowEmitter = (window: BrowserWindow) => {

    return emitter.createEmitter({
        on: (...args) => ipcMain.on(...args),
        send: (...args) => window.webContents.send(...args),
        actions: ActionsElectronStrings,
    })
}

export default createWindowEmitter
