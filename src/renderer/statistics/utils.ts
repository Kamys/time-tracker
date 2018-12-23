import { IGroup } from 'renderer/groups/model';
import { IActivity } from 'renderer/activity/model';

export const getGroupTime = (group: IGroup, activity: IActivity[]) => {
    const regExp = new RegExp(group.regExp)
    const groupActivities = activity.filter(item => regExp.test(item.title))
    return groupActivities
        .map(item => item.secondsSpent)
        .reduce(((sum, time) => sum + time), 0)
}
