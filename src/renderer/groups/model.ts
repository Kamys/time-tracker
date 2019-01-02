import { IEntity } from 'renderer/entries/model';

export interface IGroup extends IEntity{
    name: string;
    description: string;
    image: string;
    /**
     * Regular expressions used for match group with activities
     */
    regExp: string;
}
