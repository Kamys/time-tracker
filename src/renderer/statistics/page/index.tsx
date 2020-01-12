import { Component } from 'react';
import * as React from 'react';
import { connect } from 'react-redux'
import { Doughnut } from 'react-chartjs-2';
import { Button, Grid } from 'semantic-ui-react';
import 'chartjs-plugin-labels';

import { IRootState } from 'common/types/domain';
import { getGroupTime } from 'renderer/statistics/utils';
import { formatSecond } from 'renderer/activity/utils';
import SelectRange from 'renderer/statistics/page/SelectRange';
import { getActivitiesByRang, getActivitiesRange } from 'renderer/statistics/selectors';
import { RangeModifier } from 'react-day-picker';
import { getActivities } from 'renderer/activity/selectors';

const chartColors = {
    backgroundColor: [
        '#EF476F',
        '#FFD166',
        '#06D6A0',
        '#118AB2',
        '#073B4C',
    ],
    hoverBackgroundColor: [
        '#EF476F',
        '#FFD166',
        '#06D6A0',
        '#118AB2',
        '#073B4C',
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
    range: RangeModifier;
}

export interface IProps {

}

class PageStatistics extends Component<IProps & injectProps, IState> {

    state: IState = {
        range: this.props.activitiesRange,
    }

    onSelectRange = (range: RangeModifier) => {
        this.setState({range})
    }

    onResetClick = () => {
        this.setState({
            range:  this.props.activitiesRange,
        })
    }

    render() {
        const {groups} = this.props;
        const {range} = this.state;
        // TODO: out range in store for selector
        const stateMock = {entries: {activity: this.props.activity}};
        const activity = getActivitiesByRang(stateMock as any, range);

        const data = {
            labels: groups.map(group => group.name),
            datasets: [{
                data: groups.map(group => getGroupTime(group, activity)),
                ...chartColors,
            }],
        };

        return (
            <div>
                <h2>Statistics</h2>
                <div className='container'>
                    <div>
                        <SelectRange range={range} onSelectRange={this.onSelectRange} />
                        <Button onClick={this.onResetClick} primary>Select all</Button>
                    </div>
                    <Doughnut options={options} data={data} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    groups: state.entries.group,
    activity: getActivities(state),
    activitiesRange: getActivitiesRange(state),
})

const dispatchToProps = (dispatch) => ({})

type injectProps = ReturnType<typeof mapStateToProps>;

export default connect<injectProps, IProps>(mapStateToProps, dispatchToProps)(PageStatistics);
