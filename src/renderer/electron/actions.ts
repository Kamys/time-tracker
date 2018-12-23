import { createActionCreator } from 'renderer/store/utils';
import { IRootState } from 'renderer/store/rootReducer';


const createAsyncActions = createActionCreator('ELECTRON');

export const ActionsElectron = {
    loadingStore: createAsyncActions<void, { store: IRootState}>('LOADING_STORE'),
}

export type TypeActionsElectron = typeof ActionsElectron;
