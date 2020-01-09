import electron from './importElectron';
import { store as reduxStore } from 'renderer/store';
import { IRootState } from 'renderer/store/rootReducer';

const { ipcRenderer } = electron;

export const subscribeCloseApp = () => {
    ipcRenderer.on('close-app-request', () => {
        saveStore(reduxStore.getState());
        ipcRenderer.send('close-app');
    });
};

export const saveStore = (store: IRootState) => {
    ipcRenderer.send('save-store', store);
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
        console.log('web send get-activities-request');
        ipcRenderer.on('get-activities-success', (event, activities) => {
            resolve(activities);
        });
    }));
};
