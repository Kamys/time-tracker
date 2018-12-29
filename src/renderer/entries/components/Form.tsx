import { Component } from 'react';
import * as React from 'react';
import { connect } from 'react-redux'

import { IRootState } from 'renderer/store/rootReducer';
import { EntriesType } from 'renderer/entries/model';
import { useEntries } from 'renderer/entries/utils';

export interface IState {

}

export interface IProps {
    entityName: EntriesType,
    entityId: string,
}

class Form extends Component<IProps & injectProps, IState> {

    state: IState = {};

    render() {
        const {entity, onChange, onCreate, children} = this.props;

        return React.cloneElement(children as any, {entity, onChange, onCreate});
    }
}

const mapStateToProps = (state: IRootState, props: IProps) => {
    return useEntries(state, props.entityName, props.entityId);
}

const dispatchToProps = (dispatch, props: IProps) => ({})

type injectProps = ReturnType<typeof mapStateToProps>;

export default connect<injectProps, IProps>(mapStateToProps, dispatchToProps)(Form)
