const activeWin = require('active-win');

let activities = [];
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

const startTrackActivities = (callback) => {
  setInterval(getCurrentActivities, intervalTime * 1000, callback);
}

module.exports = startTrackActivities;
