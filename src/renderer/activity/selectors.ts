import { IRootState } from 'common/types/domain';

export const getActivities = (state: IRootState) => {
    return state.entries.activity;
}
