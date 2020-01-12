import connectModal from 'redux-modal/lib/connectModal'
import { connect } from 'react-redux'
import * as uniqid from 'uniqid'

import { EntriesType, IRootState } from 'common/types/domain'
import { useEntries } from 'renderer/entries/utils'
import { imageWork } from 'renderer/groups/constants'
import { ModalName } from 'renderer/modals/constants'
import { GlobalAction } from 'renderer/store/globalActions'
import { IFormProps } from 'renderer/modals/model'

import view from './view'

interface IProps {
  entityName: EntriesType
  entityId: string
  mode: 'Edit' | 'Create'
}

const mapStateToProps = (state: IRootState, props: IProps): IFormProps => {
  const { mode, entityName, entityId } = props
  const { entity, onChange, onCreate, onRemove } = useEntries(
    state,
    entityName,
    entityId,
  )

  if (mode === 'Edit') {
    const onEditGroup = newEntity => {
      onChange(entityId, newEntity)
      GlobalAction.hideModal(ModalName.FormGroup)
    }

    const onRemoveGroup = () => {
      onRemove()
      GlobalAction.hideModal(ModalName.FormGroup)
    }

    return {
      entity,
      header: 'Edit group',
      actions: [
        {
          title: 'Remove',
          onClick: onRemoveGroup,
        },
        {
          title: 'Save',
          onClick: onEditGroup,
        },
      ],
    }
  }

  const onCreateGroup = newEntity => {
    onCreate({
      id: uniqid(),
      image: imageWork,
      ...newEntity,
    })
    GlobalAction.hideModal(ModalName.FormGroup)
  }

  return {
    entity: null,
    header: 'Create group',
    actions: [
      {
        title: 'Create',
        onClick: onCreateGroup,
      },
    ],
  }
}

const dispatchToProps = dispatch => ({})

type injectProps = ReturnType<typeof mapStateToProps>

export default connectModal({ name: ModalName.FormGroup })(
  connect<injectProps, IProps>(mapStateToProps, dispatchToProps)(view),
)
