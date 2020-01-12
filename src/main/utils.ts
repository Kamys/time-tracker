import * as moment from 'moment';
import {ACTIVITY_DATE_FORMAT} from 'common/activity/constants';

export const getToday = () => {
    return moment().format(ACTIVITY_DATE_FORMAT);
};
