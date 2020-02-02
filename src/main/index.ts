import * as loadDevTool from 'electron-load-devtool'
import { app, BrowserWindow, Menu, screen, Tray } from 'electron'

import trayIconPath from 'src/assets/icon.png'
import { isProduction } from 'common/constant'
import StorageFacade from './moduleStorage'
import { ObservableActivity } from './trackActivity'
import * as path from 'path'
import createWindowEmitter from 'main/createWindowEmitter'
import { ObserverRenderer } from 'main/ObserverRenderer'
import { Emitter } from 'common/emitter/type'
import { ActionsElectronStrings } from 'common/emitter/events'
console.log('Run main')
let win = null
let emitter: Emitter<typeof ActionsElectronStrings>
let tray
let forceQuit = false
const observableActivity = new ObservableActivity()

const destructionApp = () => {
  win = null
  observableActivity.destroy()
}

const createTray = () => {
  const trayIcon = path.join(__dirname, trayIconPath)

  tray = new Tray(trayIcon)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open',
      type: 'normal',
      click: () => win.show(),
    },
    {
      label: 'Exit',
      type: 'normal',
      click: () => {
        forceQuit = true
        app.quit()
      },
    },
  ])

  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
}

const recordActivity = () => {
  win.webContents.once('dom-ready', () => {
    observableActivity.subscribe(StorageFacade.observerActivity)
    const observerRenderer = new ObserverRenderer(emitter)
    observableActivity.subscribe(observerRenderer)
  })
}

const createWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({
    width: width - 500,
    height: height - 200,
    title: 'Time Tracker',
    center: true,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  emitter = createWindowEmitter(win)

  if (isProduction) {
    win.loadFile(path.join(__dirname, './index.html'))
  } else {
    win.loadURL('http://localhost:8000/')
  }

  win.on('closed', destructionApp)
  win.on('close', event => {
    if (win) {
      event.preventDefault()
      if (!forceQuit) {
        win.hide()
      } else {
        setTimeout(() => {
          win = null
          if (process.platform !== 'darwin') {
            app.quit()
          }
        })
      }
    }
  })

  loadDevTool(loadDevTool.REDUX_DEVTOOLS)
  loadDevTool(loadDevTool.REACT_DEVELOPER_TOOLS)
}

const createListeners = () => {
  emitter.handle('loadActivity', ({ resolve }) => {
    StorageFacade.activity.get().then(resolve)
  })

  emitter.handle('loadStore', async ({ resolve }) => {
    const loadingActivity = StorageFacade.activity.get()
    const loadingGroup = StorageFacade.group.get()

    const [activity, group] = await Promise.all([loadingActivity, loadingGroup])
    const store = {
      entries: {
        activity,
        group,
      },
    }
    resolve(store)
  })
}

app.on('ready', () => {
  createWindow()
  recordActivity()
  createTray()
  createListeners()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
