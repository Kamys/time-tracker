import storageNedb from './storageNedb';
import { STORAGE_KEY } from './constant';

const set = (key: STORAGE_KEY, data) => {
    return storageNedb.set(data);
};

const get = (key: STORAGE_KEY) => {
    return storageNedb.get(1);
};

export default {
    get,
    set,
};
