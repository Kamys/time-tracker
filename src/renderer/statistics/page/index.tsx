import { Component } from 'react';
import * as React from 'react';
import { connect } from 'react-redux'
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-labels';

import { IRootState } from 'renderer/store/rootReducer';
import { getGroupTime } from 'renderer/statistics/utils';
import { formatSecond } from 'renderer/activity/utils';

const chartColors = {
    backgroundColor: [
        '#d93d38',
        '#FFCE56',
        '#36A2EB'
    ],
    hoverBackgroundColor: [
        '#d93d38',
        '#FFCE56',
        '#36A2EB'
    ]
}

const options = {
    tooltips: {
        callbacks: {
            label: (tooltipItem, data) => {
                const second = data.datasets[0].data[tooltipItem.index]
                const label = data.labels[tooltipItem.index]
                return `${label}: ${formatSecond(second)}`;
            }
        }
    },
    plugins: {
        labels: {
            render: args => {
                return formatSecond(args.value)
            },
            fontSize: 15,
            fontStyle: 'bold',
            fontColor: '#fff',
            textShadow: true,
            overlap: true,
        }
    }
}

export interface IState {

}

export interface IProps {

}

class PageStatistics extends Component<IProps & injectProps, IState> {

    state: IState = {};

    render() {

        const {groups, activity} = this.props;

        const data = {
            labels: groups.map(group => group.name),
            datasets: [{
                data: groups.map(group => getGroupTime(group, activity)),
                ...chartColors,
            }],
        };

        return (
            <div>
                <h2>Doughnut Example</h2>
                <Doughnut options={options} data={data} />
            </div>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    groups: state.entries.group,
    activity: state.entries.activity,
})

const dispatchToProps = (dispatch) => ({})

type injectProps = ReturnType<typeof mapStateToProps>;

export default connect<injectProps, IProps>(mapStateToProps, dispatchToProps)(PageStatistics);
