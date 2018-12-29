import { IRootState } from 'renderer/store/rootReducer';
import { IEntriesState } from 'renderer/entries/model';

const getEntity = (state: IRootState, name: keyof IEntriesState) => {
    return state.entries[name]
}
