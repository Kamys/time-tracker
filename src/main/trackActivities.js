const activeWin = require('active-win');

let activities = [];
let interval = null;
const intervalTime = 1;

const updateActivity = (newActivity, activities) => {
  const currentActivity = activities.find(activity => activity.title === newActivity.title);

  if (currentActivity) {
    return [
      {
        ...currentActivity,
        time: currentActivity.time + intervalTime,
      },
      ...activities.filter(activity => activity.title !== newActivity.title),
    ]
  } else {
    return [
      ...activities,
      {
        title: newActivity.title,
        time: intervalTime,
      }
    ]
  }
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
