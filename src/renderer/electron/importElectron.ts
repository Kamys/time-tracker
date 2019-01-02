import * as Electron from 'electron';
import RendererInterface = Electron.RendererInterface;

const isElectron = !!(window as any).require

const electronMock: any = {
    ipcRenderer: {
        on: () => {},
        send: () => {},
    }
}

const importElectron = (): RendererInterface => {
    if (isElectron) {
        return (window as any).require('electron')
    } else {
        return electronMock;
    }
}

export default importElectron()
