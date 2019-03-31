import electronStorage from './electronStorage';
import { STORAGE_KEY } from './constant';


const set = (key: STORAGE_KEY, data) => {
    return electronStorage.set(key, data)
}

const get = (key: STORAGE_KEY) => {
    return electronStorage.get(key);
}

export default {
    get,
    set,
}
