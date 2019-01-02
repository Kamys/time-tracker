import { createSelector } from 'reselect';
import * as moment from 'moment';

import { IRootState } from 'renderer/store/rootReducer';
import { ACTIVITY_DATE_FORMAT } from 'src/common/activity/constants';
import { IActivity } from 'renderer/activity/model';
import { getActivities } from 'renderer/activity/selectors';

import { dateUtils } from 'react-day-picker/utils';
import { RangeModifier } from 'react-day-picker';

export const getActivitiesByRang = (state: IRootState, range: RangeModifier) => createSelector(
    getActivities,
    (activities: IActivity[]) => {
        return activities.filter(activity => {
            const groupActivity = moment(activity.date, ACTIVITY_DATE_FORMAT);
            return dateUtils.isDayInRange(groupActivity.toDate(), range);
        })
    },
)(state)

export const getActivitiesRange = createSelector(
    getActivities,
    (activities: IActivity[]) => {
        const allDate = activities.map(activity => moment(activity.date, ACTIVITY_DATE_FORMAT));
        const maxDate = moment.max(allDate)
        const mixDate = moment.min(allDate)
        return {
            from: mixDate.toDate(),
            to: maxDate.toDate(),
        }
    },
)
