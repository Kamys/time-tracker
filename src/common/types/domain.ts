export interface IEntity {
    id: string;
}

export interface IActivity extends IEntity {
    title: string;
    date: string;
    secondsSpent: number;
    group: string;
    lastUpdate: number;
}

export interface IGroup extends IEntity {
    name: string;
    description: string;
    image: string;
    /**
     * Regular expressions used for match group with activities
     */
    regExp: string;
}

export interface IEntriesState {
    group: IGroup[];
    activity: IActivity[];
}

export type EntriesType = keyof IEntriesState;

export interface IRootState {
    entries: IEntriesState;
}
