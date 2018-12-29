import { Component } from 'react';
import * as React from 'react';
import { connect } from 'react-redux'

import { IRootState } from 'renderer/store/rootReducer';
import { GlobalAction } from 'renderer/store/globalActions';
import { EntriesType } from 'renderer/entries/model';

export interface IState {

}

export interface IProps {
    entityName: EntriesType,
}

class Form extends Component<IProps & injectProps, IState> {

    state: IState = {};

    render() {
        const {entity, entityName, children} = this.props;

        const onChange = (id: string, newParams) => {
            GlobalAction.entries.change.REQUEST({entityName, id, ...newParams})
        }

        const onCreate = (newEntity) => {
            GlobalAction.entries.create.REQUEST({entityName, entity: newEntity})
        }

        return React.cloneElement(children as any, {entity, onChange, onCreate});
    }
}

const mapStateToProps = (state: IRootState, props: IProps) => ({
    entity: state.entries[props.entityName],
})

const dispatchToProps = (dispatch, props: IProps) => ({})

type injectProps = ReturnType<typeof mapStateToProps>;

export default connect<injectProps, IProps>(mapStateToProps, dispatchToProps)(Form)
