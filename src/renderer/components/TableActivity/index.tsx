import { Component } from 'react';
import * as React from 'react';
import { Table } from 'semantic-ui-react'
const { ipcRenderer } = (window as any).require('electron');

interface IActivity {
    title: string;
    time: number;
    group: string;
}

export interface IState {
    activities: IActivity[]
}

export interface IProps {

}

class TableActivity extends Component<IProps, IState> {

    state: IState = {
        activities: [],
    };

    componentDidMount() {
        ipcRenderer.send('dom-ready');
        ipcRenderer.on ('update-activities', (event, activities) => {
            console.log('activities: ', activities);
            this.setState({
                activities,
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
                        <Table.HeaderCell>Group</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        activities.map(({title, time, group}) => (
                            <Table.Row key={title}>
                                <Table.Cell>{title}</Table.Cell>
                                <Table.Cell>{time}</Table.Cell>
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
