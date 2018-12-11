const activeWin = require('active-win');
const moment = require('moment');

let activities = [];
let interval = null;
const intervalTime = 1;

const updateActivity = (newActivity, activities) => {
  return [
    {
      date: moment().format('D.MM.GGGG'),
      title: newActivity.title,
      secondsSpent: intervalTime,
    },
    ...activities,
  ]
}

const getCurrentActivities = async (callback) => {
  const newActivity = await activeWin();
  activities = updateActivity(newActivity, activities);
  callback(activities);
}

const subscribe = (callback) => {
  if (interval) {
    destruction();
  }
  interval = setInterval(getCurrentActivities, intervalTime * 1000, callback);
}

const setActivities = (newActivities) => {
  activities = newActivities;
}

const getActivities = () => {
  return activities;
}

const destruction = () => {
  clearInterval(interval)
}

module.exports = {
  setActivities,
  subscribe,
  getActivities,
  destruction,
};
