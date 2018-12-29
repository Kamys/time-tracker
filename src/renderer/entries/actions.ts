import { createActionCreator } from 'renderer/store/utils';
import { EntriesType } from 'renderer/entries/model';

const createAsyncActions = createActionCreator('ENTRIES');

export const ActionsEntries = {
    loading: createAsyncActions<{ entityName: EntriesType}, {entityName: EntriesType, entity: object }>('LOADING'),
    create: createAsyncActions<{ entityName: EntriesType, entity: object }>('CREATE'),
    remove: createAsyncActions('REMOVE'),
    change: createAsyncActions<{id: string, entityName: EntriesType}>('UPDATE'),
}

export type TypeActionsEntries = typeof ActionsEntries;
