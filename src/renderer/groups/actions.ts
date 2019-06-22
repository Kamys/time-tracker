import { IGroup } from './model';
import { ActionsEntries } from 'renderer/entries/actions';

export const ActionsGroup = {
    create: (entity: IGroup) => ActionsEntries.create.REQUEST({entityName: 'group', entity}),
};

export type TypeActionsGroup = typeof ActionsGroup;
