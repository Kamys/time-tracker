import * as moment from 'moment'
import * as _ from 'lodash';

export const formatSecond = second => {
    return moment()
        .startOf('day')
        .seconds(second)
        .format('H:mm:ss');
}

const concatActivities = activities => {
    return activities.reduce((result, activity) => {
        return {...result, secondsSpent: result.secondsSpent + activity.secondsSpent}
    })
}

//TODO: rewrite it on lodash/fp
export const groupActivities = activities => {
    const group = _.groupBy(activities, 'title');
    let transform = Object.entries(group).reduce((result, [key, groupActivities]) => {
        return {...result, [key]: concatActivities(groupActivities)}
    }, {});
    return _.values(transform)
}
