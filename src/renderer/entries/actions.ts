import { createActionCreator } from 'renderer/store/utils';


const createAsyncActions = createActionCreator('ENTRIES');

export const ActionsEntries = {
    loading: createAsyncActions('LOADING'),
    create: createAsyncActions<{ entryName: string, entry: object }>('CREATE'),
    remove: createAsyncActions('REMOVE'),
    update: createAsyncActions('UPDATE'),
}

export type TypeActionsEntries = typeof ActionsEntries;
