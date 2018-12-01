const electronStorage = require('./electronStorage');
const {STORAGE_KEY} = require('./constant');

const set = (activities) => {
  return electronStorage.set(STORAGE_KEY.ACTIVITIES, activities)
}

const get = () => {
  return electronStorage.get(STORAGE_KEY.ACTIVITIES);
}

module.exports = {set, get}
