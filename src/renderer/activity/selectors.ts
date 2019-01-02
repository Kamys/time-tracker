import { IRootState } from 'renderer/store/rootReducer';

export const getActivities = (state: IRootState) => {
    return state.entries.activity;
}
