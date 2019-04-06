import storageNedb from './storageNedb';
import { STORAGE_KEY } from './constant';
import {getToday} from '../utils';

const set = (data) => {
    return storageNedb.update(getToday(), data);
};

const get = (key: STORAGE_KEY) => {
    return storageNedb.get(getToday());
};

export default {
    get,
    set,
};
