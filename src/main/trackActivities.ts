import * as moment from 'moment';

import * as activeWin from 'active-win/lib/linux';
import { IActivity } from 'renderer/activity/model';
import { findReplace } from 'main/utils';

let activities: IActivity[] = [];
let interval = null;
const intervalTime = 1;

const updateActivity = (activities: IActivity[], newActivity: IActivity): IActivity[] => {
    const todayDate = moment().format('D.MM.GGGG');

    const isNewActivity = (activity: IActivity) => {
        return activity.date === todayDate && newActivity.title === activity.title
    }

    const notFound = (oldActivities) => [
        {
            date: todayDate,
            title: newActivity.title,
            secondsSpent: intervalTime,
            group: '',
        },
        ...oldActivities,
    ];

    const replacement = (oldActivity) => ({
        ...oldActivity,
        secondsSpent: oldActivity.secondsSpent + intervalTime,
    });

    return findReplace(activities, isNewActivity, replacement, notFound)
}

const getCurrentActivities = async (callback) => {
    const newActivity = await activeWin();
    activities = updateActivity(activities, newActivity);
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

export default {
    setActivities,
    subscribe,
    getActivities,
    destruction,
};
