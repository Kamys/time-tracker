import storageNedb from './storageNedb';
import { STORAGE_KEY } from './constant';

const set = (date, data) => {
    return storageNedb.update(date, data);
};

const get = (key: STORAGE_KEY) => {
    return storageNedb.get(1);
};

export default {
    get,
    set,
};
