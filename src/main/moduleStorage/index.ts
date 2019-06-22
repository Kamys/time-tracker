import storageNedb from './storageNedb';
import {getToday} from '../utils';

const set = (data: any) => {
    return storageNedb.update(data, getToday());
};

const get = () => {
    return storageNedb.get(getToday());
};

export default {
    get,
    set,
};
