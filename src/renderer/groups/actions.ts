import { IGroup } from './model';
import { ActionsEntries } from 'renderer/entries/actions';
import { EntriesType } from 'renderer/entries/model';

export const ActionsGroup = {
    create: (entry: IGroup) => ActionsEntries.create.REQUEST({entryName: EntriesType.group, entry})
}

export type TypeActionsGroup = typeof ActionsGroup;
