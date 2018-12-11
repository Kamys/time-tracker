import * as React from 'react';
import { Component } from 'react';
import { Table } from 'semantic-ui-react'
import * as moment from 'moment'
import * as _ from 'lodash';

const {ipcRenderer} = (window as any).require('electron');

interface IActivity {
    title: string;
    date: string;
    secondsSpent: number;
    group: string;
}

interface IState {
    activities: IActivity[]
}

interface IProps {

}

const formatSecond = second => {
    return moment()
        .startOf('day')
        .seconds(second)
        .format('H:mm:ss');
}

const concatActivities = activities => {
    return activities.reduce((result, activity) => {
        return {...result, secondsSpent: result.secondsSpent + activity.secondsSpent}
    })
}

//TODO: rewrite it on lodash/fp
const groupActivities = activities => {
    console.log('groupActivities: ', activities);
    const group = _.groupBy(activities, 'title');
    let transform = Object.entries(group).reduce((result, [key, groupActivities]) => {
        let concatActivities1 = concatActivities(groupActivities);
        console.log('concatActivities1: ', concatActivities1);
        return {...result, [key]: concatActivities1}
    }, {});
    console.log('transform: ', transform);
    return _.values(transform)
}


class TableActivity extends Component<IProps, IState> {

    state: IState = {
        activities: [],
    };

    componentDidMount() {
        ipcRenderer.send('dom-ready');
        ipcRenderer.on('update-activities', (event, activities) => {
            this.setState({
                activities: groupActivities(activities),
            })
        });
    }

    render() {
        const {activities} = this.state;

        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Time</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Group</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        activities.map(({title, secondsSpent, group, date}) => (
                            <Table.Row key={title}>
                                <Table.Cell>{title}</Table.Cell>
                                <Table.Cell>{formatSecond(secondsSpent)}</Table.Cell>
                                <Table.Cell>{date}</Table.Cell>
                                <Table.Cell>{group}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        );
    }
}

export default TableActivity;
