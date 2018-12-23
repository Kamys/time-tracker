const {ipcRenderer} = (window as any).require('electron');

export const sendDomReady = () => {
    ipcRenderer.send('dom-ready');
}

export const subscribeUpdateActivities = (callback) => {
    ipcRenderer.on('update-activities', callback);
}
