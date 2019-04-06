import * as moment from 'moment';
import * as activeWin from 'active-win/lib/linux';

import {ACTIVITY_DATE_FORMAT} from 'src/common/activity/constants';
import {IActivity} from 'renderer/activity/model';
import {findReplace} from 'main/utils';

let activities: IActivity[] = [];
let interval = null;
const intervalTime = 1;

const updateActivity = (oldActivities: IActivity[], newActivity): IActivity[] => {
    const today = moment();
    const todayDate = today.format(ACTIVITY_DATE_FORMAT);

    const isNewActivity = (activity: IActivity) => {
        return activity.date === todayDate && newActivity.title === activity.title;
    };

    const notFound = oldActivities => [
        {
            date: todayDate,
            title: newActivity.title,
            secondsSpent: intervalTime,
            group: '',
            lastUpdate: today.valueOf(),
        },
        ...oldActivities,
    ];

    const replacement = oldActivity => ({
        ...oldActivity,
        secondsSpent: oldActivity.secondsSpent + intervalTime,
        lastUpdate: today.valueOf(),
    });

    return findReplace(oldActivities, isNewActivity, replacement, notFound);
};

const getCurrentActivities = async () => {
    const newActivity = await activeWin();
    activities = updateActivity(activities, newActivity);
};

const startRecordActivities = () => {
    if (interval) {
        destruction();
    }
    interval = setInterval(getCurrentActivities, intervalTime * 1000);
};

const setActivities = newActivities => {
    activities = newActivities;
};

const getActivities = () => {
    return activities;
};

const destruction = () => {
    clearInterval(interval);
};

export default {
    setActivities,
    getActivities,
    destruction,
    startRecordActivities,
};
