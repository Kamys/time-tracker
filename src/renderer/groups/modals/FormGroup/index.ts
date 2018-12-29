import connectModal from 'redux-modal/lib/connectModal';
import { connect } from 'react-redux'
import * as uniqid from 'uniqid';

import { IRootState } from 'renderer/store/rootReducer';
import { EntriesType } from 'renderer/entries/model';
import { useEntries } from 'renderer/entries/utils';
import { imageWork } from 'renderer/groups/constants';
import { ModalName } from 'renderer/modals/constants';

import view from './view'
import { GlobalAction } from 'renderer/store/globalActions';

interface IProps {
    entityName: EntriesType,
    entityId: string,
    mode: 'Edit' | 'Create',
}

const mapStateToProps = (state: IRootState, props: IProps) => {
    const {mode, entityName, entityId} = props;
    const {entity, onChange, onCreate} = useEntries(state, entityName, entityId)

    const onEditGroup = (newEntity) => {
        onChange(entityId, newEntity);
        GlobalAction.hideModal(ModalName.FormGroup);
    };

    if (mode === 'Edit') {
        return ({
            entity,
            onSubmit: onEditGroup,
            actionName: mode,
        });
    }

    const onCreateGroup = (newEntity) => {
        onCreate({
            id: uniqid(),
            image: imageWork,
            ...newEntity
        })
        GlobalAction.hideModal(ModalName.FormGroup);
    };

    return ({
        entity: null,
        onSubmit: onCreateGroup,
        actionName: mode,
    });
}

const dispatchToProps = (dispatch) => ({})

type injectProps = ReturnType<typeof mapStateToProps>;

export default connectModal({name: ModalName.FormGroup})(
    connect<injectProps, IProps>(mapStateToProps, dispatchToProps)((view))
)
