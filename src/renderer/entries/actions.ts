import { createActionCreator } from 'renderer/store/utils';
import { EntriesType } from 'renderer/entries/model';


const createAsyncActions = createActionCreator('ENTRIES');

export const ActionsEntries = {
    loading: createAsyncActions<{ entryName: EntriesType}, {entryName: EntriesType, entry: object }>('LOADING'),
    create: createAsyncActions<{ entryName: EntriesType, entry: object }>('CREATE'),
    remove: createAsyncActions('REMOVE'),
    update: createAsyncActions('UPDATE'),
}

export type TypeActionsEntries = typeof ActionsEntries;
