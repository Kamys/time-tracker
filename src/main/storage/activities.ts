import electronStorage from './electronStorage';
import { STORAGE_KEY } from './constant';


const set = (activities) => {
    return electronStorage.set(STORAGE_KEY.ACTIVITIES, activities)
}

const get = () => {
    return electronStorage.get(STORAGE_KEY.ACTIVITIES);
}

export default {set, get}
