import * as React from 'react';
import {useEffect} from 'react';
import { connect } from 'react-redux';

import { IRootState } from 'renderer/store/rootReducer';
import TableActivity from 'renderer/components/TableActivity';
import { GlobalAction } from 'renderer/store/globalActions';

import './index.css';

const mapStateToProps = (state: IRootState) => ({
    activities: state.entries.activity,
});

type injectProps = ReturnType<typeof mapStateToProps>;

interface IProps extends injectProps {

}

const Activity = (props: IProps) => {
    useEffect(() => {
        // GlobalAction.entries.loading.REQUEST({entityName: 'activity'});
    });

    const {activities} = props;

    return (
        <TableActivity activities={activities} />
    );
};

export default connect<injectProps, IProps>(mapStateToProps, null)(Activity);
