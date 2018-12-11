import { IGroup } from 'renderer/groups/model';
import { IActivity } from 'renderer/activity/model';

export enum EntriesType {
    activity = 'activity',
    group = 'group',
}

export interface IEntriesState {
    group: IGroup[],
    activity: IActivity[],
}
