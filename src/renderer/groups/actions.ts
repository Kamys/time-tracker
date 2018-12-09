import { IGroup } from './model';
import { ENTRY_NAME_GROUP } from 'renderer/groups/constants';
import { ActionsEntries } from 'renderer/entries/actions';

export const ActionsGroup = {
    create: (entry: IGroup) => ActionsEntries.create.REQUEST({entryName: ENTRY_NAME_GROUP, entry})
}

export type TypeActionsGroup = typeof ActionsGroup;
