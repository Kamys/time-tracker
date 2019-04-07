import electron from './importElectron';

const {ipcRenderer} = electron;

export const subscribeCloseApp = () => {
    ipcRenderer.on('close-app-request', () => {
        ipcRenderer.send('close-app');
    });
};

export const saveStore = (store, props) => {
    ipcRenderer.send('save-store', props);
};

export const loadStore = async () => {
    ipcRenderer.send('load-store-request');
    const loadStorePromise = new Promise(resolve => {
        ipcRenderer.on('load-store', (event, store) => {
            resolve(store);
        });
    });
    return await loadStorePromise;
};

export const getActivities = () => {
    return new Promise((resolve => {
        ipcRenderer.send('get-activities-request');
        ipcRenderer.on('get-activities-success', (event, activities) => {
            resolve(activities);
        });
    }));
};