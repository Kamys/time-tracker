import electronStorage from './electronStorage';
import { STORAGE_KEY } from './constant';


const set = (data) => {
    return electronStorage.set(STORAGE_KEY.APP, data)
}

const get = () => {
    return electronStorage.get(STORAGE_KEY.APP);
}

export default {set, get}
