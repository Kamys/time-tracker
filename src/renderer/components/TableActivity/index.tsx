import * as React from 'react';
import { Component } from 'react';
import { Table } from 'semantic-ui-react'
import { formatSecond, groupActivities } from 'renderer/components/TableActivity/utils';


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
