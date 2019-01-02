import { IEntity } from 'renderer/entries/model';

export interface IActivity extends IEntity {
    title: string;
    date: string;
    secondsSpent: number;
    group: string;
}
