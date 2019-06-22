import createStore, { IStore } from './createStore';

const storeCache = {};

type StoreNames = 'activity' | 'group';

const useStore = (name: StoreNames): IStore => {
    const store = storeCache[name];
    if (store) {
        return store;
    }
    const newStore = createStore(name);
    storeCache[name] = newStore;
    return newStore;
};

export default useStore;