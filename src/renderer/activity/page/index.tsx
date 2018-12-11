import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'

import './index.css'
import { IRootState } from 'renderer/store/rootReducer';
import TableActivity from 'renderer/components/TableActivity';
import { GlobalAction } from 'renderer/store/globalActions';
import { groupActivities } from 'renderer/activity/utils';
import { EntriesType } from 'renderer/entries/model';

interface IState {

}

interface IProps {

}

class Groups extends Component<IProps & injectProps, IState> {

    state: IState = {};

    componentDidMount() {
        GlobalAction.entries.loading.REQUEST({entryName: EntriesType.activity})
    }

    render() {
        const {activities} = this.props;
        return (
            <TableActivity activities={groupActivities(activities)} />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    activities: state.entries.activity,
})

type injectProps = ReturnType<typeof mapStateToProps>;

const dispatchToProps = (dispatch) => ({})

export default connect<injectProps, IProps>(mapStateToProps, dispatchToProps)(Groups)
