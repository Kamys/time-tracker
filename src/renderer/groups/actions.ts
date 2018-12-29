import { IGroup } from './model';
import { ActionsEntries } from 'renderer/entries/actions';
import { EntriesType } from 'renderer/entries/model';

export const ActionsGroup = {
    create: (entity: IGroup) => ActionsEntries.create.REQUEST({entityName: 'group', entity})
}

export type TypeActionsGroup = typeof ActionsGroup;
