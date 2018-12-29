import { IGroup } from 'renderer/groups/model';
import { IActivity } from 'renderer/activity/model';

export interface IEntriesState {
    group: IGroup[],
    activity: IActivity[],
}

export type EntriesType = keyof IEntriesState;
