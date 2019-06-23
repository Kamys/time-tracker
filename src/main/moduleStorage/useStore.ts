import { IDictionary } from 'src/common/type';
import storeAdapter, { IStore } from './storeAdapter';

type StoreNames = 'activity' | 'group';

const storeCache = {};

const mapAdapter: IDictionary<(name: StoreNames) => IStore> = {
    activity: storeAdapter.createActivityAdapter,
    group: storeAdapter.createDefaultAdapter,
};

const useStore = (name: StoreNames): IStore => {
    const store = storeCache[name];
    if (store) {
        return store;
    }
    const createAdapter = mapAdapter[name];
    const newStore = createAdapter(name);
    storeCache[name] = newStore;
    return newStore;
};

export default useStore;