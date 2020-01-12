import { IGroup } from 'common/types/domain';
import { ActionsEntries } from 'renderer/entries/actions';

export const ActionsGroup = {
    create: (entity: IGroup) => ActionsEntries.create.REQUEST({entityName: 'group', entity}),
};

export type TypeActionsGroup = typeof ActionsGroup;
